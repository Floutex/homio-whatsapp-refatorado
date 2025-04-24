/**
 * Represents a WhatsApp instance with its name and connection state
 */
export interface Instance {
  name: string
  state: string
}

/**
 * Represents the state response from the WhatsApp API
 */
export interface InstanceState {
  instance?: {
    state: string
  }
}
