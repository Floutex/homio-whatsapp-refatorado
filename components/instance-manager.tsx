"use client"

// Instance manager component
import { useState, useEffect } from "react"
import type { Instance } from "@/types/instance"
import type { LocationInfo } from "@/types/location"
import {
  processInstanceName,
  getProviderIdForInstance,
  getInstanceLabelSuffix,
  getInstanceNameSuffix,
} from "@/lib/utils"
import { createInstance, getQRCodeUrl, fetchInstances, getInstanceState } from "@/lib/api"
import { WelcomeHeader } from "./welcome-header"
import { ConnectButton } from "./ui/connect-button"
import { LoadingMessage } from "./ui/loading-message"
import { InstanceStatus } from "./instance-status"
import { QRCodePopup } from "./qr-code-popup"

interface InstanceManagerProps {
  locationInfo: LocationInfo
}

export function InstanceManager({ locationInfo }: InstanceManagerProps) {
  const [instances, setInstances] = useState<Instance[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [showQRCode, setShowQRCode] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState("")

  // Process the base instance name
  const processedBaseName = processInstanceName(locationInfo.name)

  // Render QR code for an instance
  const renderQRCode = (processedName: string) => {
    console.log("Rendering QR Code for:", processedName)
    const url = getQRCodeUrl(processedName)
    setQrCodeUrl(url)
    setShowQRCode(true)
  }

  // Handle instance creation
  const handleCreateInstance = async (instanceNumber: number) => {
    setLoading(true)
    setMessage("Creating instance, please wait...")

    const nameSuffix = getInstanceNameSuffix(instanceNumber)
    const providerId = getProviderIdForInstance(instanceNumber)
    const fullInstanceName = `${processedBaseName}${nameSuffix}`

    try {
      await createInstance({
        instanceName: fullInstanceName,
        location: {
          name: locationInfo.name,
          id: locationInfo.id,
          provider: providerId,
        },
      })

      setMessage("Instance created successfully! Checking state...")

      // Wait 2 seconds before checking state
      setTimeout(async () => {
        try {
          const state = await getInstanceState(fullInstanceName)

          if (state !== "open") {
            // Render QR code if state is not open
            renderQRCode(fullInstanceName)
          } else {
            setMessage("Your account is already connected")
          }

          // Refresh instances list
          checkInstances()
        } catch (error) {
          console.error("Error checking instance state:", error)
          renderQRCode(fullInstanceName)
        } finally {
          setLoading(false)
        }
      }, 2000)
    } catch (error) {
      console.error("Error creating instance:", error)
      setMessage("Failed to create instance. Please try again.")
      setLoading(false)
    }
  }

  // Check all instances
  const checkInstances = async () => {
    const instancesData = await fetchInstances(processedBaseName)
    setInstances(instancesData)
  }

  // Check instances on component mount
  useEffect(() => {
    checkInstances()
  }, [])

  // Handle QR code popup close
  const handleQRCodeClose = () => {
    setShowQRCode(false)
    checkInstances()
  }

  return (
    <div className="container">
      {!showQRCode && (
        <>
          <WelcomeHeader text="Bem vindo ao WhatsApp by Homio" />

          {loading ? (
            <LoadingMessage message={message} />
          ) : (
            <>
              {/* Display instance creation buttons based on existing instances */}
              {instances.length === 0 && (
                <ConnectButton onClick={() => handleCreateInstance(1)} label="Conectar ao WhatsApp" />
              )}

              {instances.length === 1 && (
                <ConnectButton
                  onClick={() => handleCreateInstance(2)}
                  label={`Conectar ao WhatsApp ${getInstanceLabelSuffix(2)}`}
                />
              )}

              {instances.length === 2 && (
                <ConnectButton
                  onClick={() => handleCreateInstance(3)}
                  label={`Conectar ao WhatsApp ${getInstanceLabelSuffix(3)}`}
                />
              )}

              {instances.length >= 3 && (
                <p className="message">Você já possui três instâncias criadas. Não é possível criar mais instâncias.</p>
              )}

              {/* Display existing instances */}
              {instances.map((instance, index) => (
                <InstanceStatus key={index} name={instance.name} state={instance.state} onReconnect={renderQRCode} />
              ))}
            </>
          )}
        </>
      )}

      {/* QR Code Popup */}
      {showQRCode && <QRCodePopup qrCodeUrl={qrCodeUrl} onClose={handleQRCodeClose} />}
    </div>
  )
}
