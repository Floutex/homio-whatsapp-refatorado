import type { Instance, InstanceState } from "@/types/instance"

const API_KEY = "iUfxkHmsBpcPhXXGKyJd9lteUCHYCk0z"

interface InstanceCreationParams {
  instanceName: string
  location: {
    name: string
    id: string
    provider: string
  }
}

export const checkInstanceExists = async (processedName: string): Promise<boolean> => {
  try {
    const response = await fetch(`https://whatsapp.homio.com.br/instance/connectionState/${processedName}`, {
      method: "GET",
      headers: {
        apikey: API_KEY,
      },
    })

    if (response.ok) {
      return true
    } else if (response.status === 404) {
      return false
    } else {
      throw new Error(`HTTP error: ${response.status}`)
    }
  } catch (error) {
    console.error(`Error checking instance ${processedName}:`, error)
    throw error
  }
}

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

export const getQRCodeUrl = (processedName: string): string => {
  return `https://api.homio.com.br/webhook/getqrcode?instanceName=${processedName}`
}

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
