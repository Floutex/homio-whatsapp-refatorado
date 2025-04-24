"use client"

import Image from "next/image"
import { X } from "lucide-react"

interface QRCodePopupProps {
  qrCodeUrl: string
  onClose: () => void
}

export function QRCodePopup({ qrCodeUrl, onClose }: QRCodePopupProps) {
  return (
    <div className="popup">
      <Image src={qrCodeUrl || "/placeholder.svg"} alt="QR Code" width={400} height={400} className="qr-code" />
      <button className="popup-close-button" onClick={onClose}>
        <X size={20} />
      </button>
    </div>
  )
}
