import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleepAsync = (durationMs = 200) => {
  return new Promise((resolve) => setTimeout(resolve, durationMs));
};
