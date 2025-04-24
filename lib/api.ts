// API functions for WhatsApp instance management
import type { Instance, InstanceState } from "@/types/instance"

const API_KEY = "iUfxkHmsBpcPhXXGKyJd9lteUCHYCk0z"

/**
 * Parameters for creating a new WhatsApp instance
 */
interface InstanceCreationParams {
  instanceName: string
  location: {
    name: string
    id: string
    provider: string
  }
}

/**
 * Check if a WhatsApp instance exists
 * @param processedName The processed instance name
 * @returns Promise resolving to boolean indicating if instance exists
 */
export const checkInstanceExists = async (processedName: string): Promise<boolean> => {
  try {
    const response = await fetch(`https://whatsapp.homio.com.br/instance/connectionState/${processedName}`, {
      method: "GET",
      headers: {
        apikey: API_KEY,
      },
    })

    if (response.ok) {
      return true // Instance exists
    } else if (response.status === 404) {
      return false // Instance doesn't exist
    } else {
      throw new Error(`HTTP error: ${response.status}`)
    }
  } catch (error) {
    console.error(`Error checking instance ${processedName}:`, error)
    throw error
  }
}

/**
 * Get the state of a WhatsApp instance
 * @param name The instance name
 * @returns Promise resolving to the instance state
 */
export const getInstanceState = async (name: string): Promise<string> => {
  try {
    const response = await fetch(`https://whatsapp.homio.com.br/instance/connectionState/${name}`, {
      method: "GET",
      headers: {
        apikey: API_KEY,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }

    const stateData: InstanceState = await response.json()
    return stateData.instance?.state || "unknown"
  } catch (error) {
    console.error(`Error checking state for ${name}:`, error)
    return "error"
  }
}

/**
 * Create a new WhatsApp instance
 * @param params The instance creation parameters
 * @returns Promise resolving to the creation response
 */
export const createInstance = async (params: InstanceCreationParams): Promise<Response> => {
  const response = await fetch("https://api.homio.com.br/webhook/criar-instancia", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`)
  }

  return response
}

/**
 * Get QR code URL for a WhatsApp instance
 * @param processedName The processed instance name
 * @returns QR code URL string
 */
export const getQRCodeUrl = (processedName: string): string => {
  return `https://api.homio.com.br/webhook/getqrcode?instanceName=${processedName}`
}

/**
 * Fetch all instances for a location
 * @param processedBaseName The processed base name
 * @returns Promise resolving to array of instances
 */
export const fetchInstances = async (processedBaseName: string): Promise<Instance[]> => {
  const instancesToCheck = [processedBaseName, `${processedBaseName}2`, `${processedBaseName}3`]
  const instancesData: Instance[] = []

  for (const name of instancesToCheck) {
    try {
      const exists = await checkInstanceExists(name)
      if (exists) {
        const state = await getInstanceState(name)
        instancesData.push({ name, state })
      }
    } catch (error) {
      console.error(`Error processing instance ${name}:`, error)
    }
  }

  return instancesData
}
