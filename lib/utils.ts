import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility functions for string processing and other helpers

/**
 * Process instance name to ensure consistent formatting
 * @param name The raw instance name
 * @returns Processed instance name
 */
export const processInstanceName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/['']s?/g, "") // Remove apostrophes and optional 's'
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except hyphens
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with '-'
}

/**
 * Get provider ID based on instance number
 * @param instanceNumber The instance number (1, 2, or 3)
 * @returns Provider ID string
 */
export const getProviderIdForInstance = (instanceNumber: number): string => {
  switch (instanceNumber) {
    case 1:
      return "67a4fa35ffae7881f31684f3" // First instance provider
    case 2:
      return "679d1e13fe8b77fa62001590" // Second instance provider
    case 3:
      return "67a39b0a1d291e601c80c311" // Third instance provider
    default:
      return "67a4fa35ffae7881f31684f3" // Default to first provider
  }
}

/**
 * Get suffix for instance button label
 * @param instanceNumber The instance number (1, 2, or 3)
 * @returns Label suffix string
 */
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

/**
 * Get numeric suffix for instance name
 * @param instanceNumber The instance number (1, 2, or 3)
 * @returns Name suffix string
 */
export const getInstanceNameSuffix = (instanceNumber: number): string => {
  return instanceNumber === 1 ? "" : instanceNumber.toString()
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
