"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { marked } from "marked";
import { CirclePlay, CircleStop, History, Loader2 } from "lucide-react";

import { useLocalStorage } from "./_hooks/useLocalStorage";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import PromptResponse from "./_components/prompt-response";
import { Separator } from "./_components/ui/separator";
import { cn } from "@/lib/utils";
import ModelSelector from "./_components/model-selector";

export default function Page() {
  const [prompt, setPrompt] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [bodyReader, setBodyReader] = useState();
  const outputRef = useRef();

  const [history, setHistory] = useLocalStorage("history", {});
  const [enableContext, setEnableContext] = useLocalStorage(
    "enableContext",
    false
  );
  const [selectedModel, setSelectedModel] = useState("");

  const historyKeys = useMemo(() => history ? Object.keys(history) : [], [history]);

  // const lastGeneratedPrompt = useMemo(
  //   () =>
  //     historyKeys?.length !== 0
  //       ? history[historyKeys[historyKeys.length - 1]]
  //       : null,
  //   [history, historyKeys]
  // );

  const stopGeneration = useCallback(async () => {
    await bodyReader?.cancel();
    setPrompt("");
  }, [bodyReader]);

  const generate = useCallback(async () => {
    try {
      setHistory((prev) => ({ ...prev, [prompt]: "" }));
      setIsPending(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_OLLAMA_API_URL}/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: selectedModel || process.env.NEXT_PUBLIC_OLLAMA_MODEL,
            prompt: enableContext
              ? `Using this data: ${historyKeys} \n to respond to this prompt: ${prompt}`
              : prompt,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setIsPending(false);

      const reader = response.body.getReader();
      setBodyReader(reader);

      const decoder = new TextDecoder();
      let done = false;

      setPrompt("");
      setIsRunning(true);

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value, { stream: true });
        const parsedValue = JSON.parse(chunkValue === "" ? null : chunkValue);
        setHistory((prev) => ({
          ...prev,
          [prompt]: prev[prompt] + (parsedValue?.response ?? ""),
        }));
      }

      setIsRunning(false);
    } catch (error) {
      console.error("Error fetching the streaming response:", error);
    }
  }, [prompt, history, enableContext, selectedModel]);

  // useEffect(() => {
  //   if (isRunning) outputRef?.current?.scrollIntoView();
  // }, [outputRef, isRunning, historyKeys]);

  return (
    <div className="m-4">
      <div className="flex flex-col gap-y-10">
        <div className="mb-14 gap-y-3 flex flex-col justify-center items-center">
          <div className="w-[100ch]">
            {historyKeys.map((key, index) => (
              <div
                ref={historyKeys.length - 1 === index ? outputRef : null}
                className="flex flex-col gap-y-3 my-3"
                key={key}
              >
                <PromptResponse
                  title={key}
                  response={marked(history[key])}
                  hasSpeech={!(historyKeys.length - 1 === index && isRunning)}
                />
                {historyKeys.length - 1 !== index && <Separator />}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-x-2 fixed bottom-0 justify-center items-center w-full my-2">
        <div className="py-1.5 pl-7 pr-3 w-[15rem]">
          <ModelSelector onModelSelect={setSelectedModel} />
        </div>
        <Input
          value={prompt}
          placeholder="Prompt here..."
          onChange={(e) => setPrompt(e?.target?.value)}
          className="py-1.5 pl-7 pr-20 w-[50rem]"
          disabled={isRunning || isPending}
        />
        {isPending ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : isRunning ? (
          <Button variant="outline" size="icon" onClick={stopGeneration}>
            <CircleStop />
          </Button>
        ) : (
          <Button
            variant="outline"
            size="icon"
            onClick={generate}
            disabled={!prompt?.length}
          >
            <CirclePlay />
          </Button>
        )}
        <Button
          variant="outline"
          size="icon"
          className={cn("", {
            "bg-green-700": !enableContext,
            "bg-red-700": enableContext,
          })}
          onClick={() => setEnableContext((prev) => !prev)}
          disabled={isRunning || isPending}
        >
          <History />
        </Button>
      </div>
    </div>
  );
}
