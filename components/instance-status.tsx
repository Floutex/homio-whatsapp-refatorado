"use client"

import { ConnectButton } from "./ui/connect-button"

interface InstanceStatusProps {
  name: string
  state: string
  onReconnect: (name: string) => void
}

export function InstanceStatus({ name, state, onReconnect }: InstanceStatusProps) {
  const isConnected = state === "open"

  return (
    <div className="instance-status">
      <h2>Instância: {name}</h2>
      <p>Estado: {isConnected ? "Conectado" : "Não conectado"}</p>

      {!isConnected && <ConnectButton className="reconect" onClick={() => onReconnect(name)} label="Reconectar" />}
    </div>
  )
}
