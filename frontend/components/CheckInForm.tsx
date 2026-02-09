"use client"

import { useState } from "react"
import axios from "axios"
import QRCode from "react-qr-code"

interface CheckInResponse {
  attendance_number: string
  qr_data: string
}

export default function CheckInForm() {
  const [eventId, setEventId] = useState("")
  const [name, setName] = useState("")
  const [stateCode, setStateCode] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<CheckInResponse | null>(null)

  const handleCheckIn = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported on this device.")
      return
    }

    setLoading(true)
    setError("")

    navigator.geolocation.getCurrentPosition(
      async position => {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/attendance/checkin`,
            {
              event_code: eventId,
              name,
              state_code: stateCode,
              phone,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          )

          setResult(res.data)
        } catch (err: any) {
          setError(
            err?.response?.data?.detail ||
              "Check-in failed. Please try again."
          )
        } finally {
          setLoading(false)
        }
      },
      () => {
        setError("Location permission denied.")
        setLoading(false)
      }
    )
  }

  if (result) {
    return (
      <div className="space-y-4 text-center">
        <h2 className="text-xl font-semibold">
          Attendance Successful 🎉
        </h2>

        <p>
          Attendance Number:{" "}
          <strong>{result.attendance_number}</strong>
        </p>

        <div className="flex justify-center">
          <QRCode value={result.qr_data} size={180} />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md space-y-4 rounded bg-white p-6 shadow">
      <input
        placeholder="Event ID"
        className="w-full rounded border p-2"
        value={eventId}
        onChange={e => setEventId(e.target.value)}
      />

      <input
        placeholder="Full Name"
        className="w-full rounded border p-2"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="State Code"
        className="w-full rounded border p-2"
        value={stateCode}
        onChange={e => setStateCode(e.target.value)}
      />

      <input
        placeholder="Phone Number"
        className="w-full rounded border p-2"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <button
        onClick={handleCheckIn}
        disabled={loading}
        className="w-full rounded bg-green-600 py-2 text-white hover:bg-green-700"
      >
        {loading ? "Checking in..." : "Check In"}
      </button>
    </div>
  )
}