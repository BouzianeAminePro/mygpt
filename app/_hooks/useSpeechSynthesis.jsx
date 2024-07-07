"use client";

import { useState } from "react";

export default function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = (text) => {
    const synthesis = new SpeechSynthesisUtterance(text);
    synthesis.onstart = () => {
      setIsSpeaking(true);
    };
    synthesis.onend = () => {
      setIsSpeaking(false);
    };
    synthesis.onerror = () => {
      setIsSpeaking(false);
    };
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(synthesis);
  };

  const cancelSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
    }
  };

  return { speak, isSpeaking, cancelSpeech };
}
