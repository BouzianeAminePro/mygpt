"use client";

import Image from "next/image";
import { useCallback } from "react";

import { ClipboardCopy, Volume2, VolumeX } from "lucide-react";
import ReactMarkdown from 'react-markdown';

import { Button } from "./ui/button";
import useSpeechSynthesis from "../_hooks/useSpeechSynthesis";
import { removeTags } from "../_helpers/removeTags";

export default function PromptResponse({ title, response, hasSpeech = true }) {
  const { speak, isSpeaking, cancelSpeech } = useSpeechSynthesis();
  const copyToClipboard = useCallback((text) => {
    navigator.clipboard.writeText(removeTags(text));
  }, []);

  const copyCodeToClipboard = useCallback((code) => {
    navigator.clipboard.writeText(code);
  }, []);

  return (
    <>
      <div className="prompt text-xl font-semibold ml-auto bg-slate-600 p-2.5 rounded-2xl dark:text-white text-white w-[50ch]">
        {title}
      </div>
      <div className="flex flex-row gap-x-3 items-center">
        <Image
          src="/img/logo.svg"
          alt="logo"
          width={40}
          height={40}
          priority={false}
          className="dark:invert"
        />
        <div className="flex flex-col gap-y-3">
          <div className="text-base p-5">
            <ReactMarkdown
              components={{
                code({ inline, className, children }) {
                  const codeString = String(children).replace(/\n$/, '');
                  return inline ? (
                    <code className={`break-words ${className}`}>{codeString}</code>
                  ) : (
                    <div className="relative w-fit overflow-hidden whitespace-pre-wrap break-words">
                      <pre
                        className="p-4 m-2.5 rounded-md dark:bg-gray-800 dark:text-white bg-slate-700 text-white border border-gray-300 shadow-md overflow-hidden whitespace-pre-wrap break-words relative"
                      >
                        {codeString}
                      </pre>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyCodeToClipboard(codeString)}
                        className="absolute right-0 top-0 text-white dark:text-white dark:border-gray-500 border-gray-300 w-10 h-10 m-[5px] focus:outline-none hover:bg-transparent hover:text-white"
                      >
                        <ClipboardCopy />
                      </Button>
                    </div>
                  );
                },
                paragraph({ children }) {
                  return <p>{children}</p>;
                },
              }}
            >
              {response}
            </ReactMarkdown>
          </div>
          <div className="flex flex-row gap-x-2">
            {hasSpeech &&
              (isSpeaking ? (
                <Button variant="outline" size="icon">
                  <VolumeX onClick={() => cancelSpeech()} />
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => speak(response)}
                >
                  <Volume2 />
                </Button>
              ))}
            <Button
              variant="outline"
              size="icon"
              onClick={() => copyToClipboard(response)}
            >
              <ClipboardCopy />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
