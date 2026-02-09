"use client"

import QRCode from "react-qr-code"

interface Props {
  value: string
}

export default function QRDisplay({ value }: Props) {
  return (
    <div className="flex flex-col items-center gap-3">
      <QRCode value={value} size={200} />
      <p className="text-sm text-gray-500">
        Present this QR code for verification
      </p>
    </div>
  )
}