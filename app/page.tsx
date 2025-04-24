"use client"

import { useEffect, useState } from "react"
import { InstanceManager } from "@/components/instance-manager"
import type { LocationInfo } from "@/types/location"

export default function WhatsAppConnection() {
  const [locationInfo, setLocationInfo] = useState<LocationInfo>({
    name: "",
    id: "",
  })

  // Initialize data from DOM elements
  useEffect(() => {
    // In a real Next.js app, this would come from props or API
    // For demo purposes, we're simulating the original behavior
    const nameElement = document.getElementById("instancename")
    const idElement = document.getElementById("locationId")

    if (nameElement) {
      setLocationInfo((prev) => ({ ...prev, name: nameElement.innerText }))
    }

    if (idElement) {
      setLocationInfo((prev) => ({ ...prev, id: idElement.innerText }))
    }

    // For demo purposes, set some default values if not found
    if (!nameElement || !idElement) {
      setLocationInfo({
        name: "Demo Location",
        id: "demo123",
      })
    }
  }, [])

  return (
    <>
      {/* Hidden elements for data storage (simulating the original HTML) */}
      <div id="instancename" style={{ display: "none" }}>{`{{location.name}}`}</div>
      <div id="locationId" style={{ display: "none" }}>{`{{location.id}}`}</div>

      <div className="replacement-body">{locationInfo.name && <InstanceManager locationInfo={locationInfo} />}</div>
    </>
  )
}
