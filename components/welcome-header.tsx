// Welcome header component
interface WelcomeHeaderProps {
  text: string
}

export function WelcomeHeader({ text }: WelcomeHeaderProps) {
  return <h1 className="wellcome-text">{text}</h1>
}
