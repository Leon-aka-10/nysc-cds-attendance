"use client";
import { useState } from "react";

export default function CheckIn() {
  const [result, setResult] = useState<any>(null);

  const submit = () => {
    navigator.geolocation.getCurrentPosition(async pos => {
      const payload = {
        eventCode: "CDS-XXXX",
        name: "John Doe",
        stateCode: "AB/24C/1234",
        phone: "08012345678",
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      };

      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/attendance/checkin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      setResult(await res.json());
    });
  };

  return (
    <div className="p-4">
      <button onClick={submit} className="bg-green-600 text-white p-3 rounded">
        Check In
      </button>

      {result && (
        <div className="mt-4">
          <p>Attendance No: {result.attendanceNumber}</p>
          <img src={`data:image/png;base64,${result.qrCode}`} />
        </div>
      )}
    </div>
  );
}