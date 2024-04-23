import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateStrongToken(length: number = 64): string {
  const alphabet: string =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token: string = "";
  for (let i = 0; i < length; i++) {
    const randomIndex: number = Math.floor(Math.random() * alphabet.length);
    token += alphabet.charAt(randomIndex);
  }
  return token;
}

export function handleCopy(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    toast.success("Copied to clipboard");
  });
}
