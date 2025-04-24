"use client"

// Connect button component
interface ConnectButtonProps {
  onClick: () => void
  label: string
  className?: string
}

export function ConnectButton({ onClick, label, className = "" }: ConnectButtonProps) {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {label}
    </button>
  )
}
