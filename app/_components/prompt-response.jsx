"use client";

import Image from "next/image";

import { Volume2, VolumeX } from "lucide-react";

import { Button } from "./ui/button";
import useSpeechSynthesis from "../_hooks/useSpeechSynthesis";

export default function PromptResponse({ title, response, hasSpeech = true }) {
  const { speak, isSpeaking, cancelSpeech } = useSpeechSynthesis();
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
          <div
            className="text-base"
            dangerouslySetInnerHTML={{ __html: response }}
          ></div>
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
          </div>
        </div>
    </>
  );
}
