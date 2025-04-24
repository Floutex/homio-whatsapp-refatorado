import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const processInstanceName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/['']s?/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

export const getProviderIdForInstance = (instanceNumber: number): string => {
  switch (instanceNumber) {
    case 1:
      return "67a4fa35ffae7881f31684f3"
    case 2:
      return "679d1e13fe8b77fa62001590"
    case 3:
      return "67a39b0a1d291e601c80c311"
    default:
      return "67a4fa35ffae7881f31684f3"
  }
}

export const getInstanceLabelSuffix = (instanceNumber: number): string => {
  switch (instanceNumber) {
    case 1:
      return ""
    case 2:
      return "Segundo WhatsApp"
    case 3:
      return "Terceiro WhatsApp"
    default:
      return ""
  }
}

export const getInstanceNameSuffix = (instanceNumber: number): string => {
  return instanceNumber === 1 ? "" : instanceNumber.toString()
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
