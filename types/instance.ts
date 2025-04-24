export interface Instance {
  name: string
  state: string
}

export interface InstanceState {
  instance?: {
    state: string
  }
}
