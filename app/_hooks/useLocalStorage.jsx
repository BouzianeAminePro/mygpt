"use client";

import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  if (typeof window === "undefined") return [];

  const [storedValue, setStoredValue] = useState(() => {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    if (storedValue !== undefined) {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    }
  }, [storedValue]);

  return [storedValue, setStoredValue];
}
