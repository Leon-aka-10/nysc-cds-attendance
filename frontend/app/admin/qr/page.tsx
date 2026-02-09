"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });

export default function QRScanner() {
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const handleScan = async (data: any) => {
    if (data) {
      setResult(data);

      const qrBase64 = await fetch(data)
        .then(res => res.blob())
        .then(blob => new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        }));

      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/admin/verify_qr", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ qr: qrBase64 })
      });

      const dataRes = await res.json();
      setMessage(dataRes.message || dataRes.detail);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">QR Code Scanner</h1>
      <QrReader
        onResult={(result, error) => {
          if (!!result) handleScan(result?.text);
          if (!!error) handleError(error);
        }}
        constraints={{ facingMode: 'environment' }}
        containerStyle={{ width: '100%' }}
      />
      {message && <p className="mt-4 font-semibold text-green-600">{message}</p>}
    </div>
  );
}