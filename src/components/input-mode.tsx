"use client";
import { useEffect } from "react";
export function InputMode() {
  useEffect(() => {
    const keyboard = () => {
      document.documentElement.dataset.keyboard = "true";
    };
    const pointer = () => {
      delete document.documentElement.dataset.keyboard;
    };
    document.addEventListener("keydown", keyboard);
    document.addEventListener("pointerdown", pointer);
    return () => {
      document.removeEventListener("keydown", keyboard);
      document.removeEventListener("pointerdown", pointer);
    };
  }, []);
  return null;
}
