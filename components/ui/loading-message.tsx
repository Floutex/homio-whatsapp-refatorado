// Loading message component
interface LoadingMessageProps {
  message: string
}

export function LoadingMessage({ message }: LoadingMessageProps) {
  return <p className="loading-message">{message}</p>
}
