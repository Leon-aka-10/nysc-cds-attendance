"use client";
import { useState } from "react";

export default function ManualRegistration() {
  const [eventId, setEventId] = useState("");
  const [name, setName] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const register = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/admin/manual_attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ event_id: eventId, name, state_code: stateCode, phone })
    });
    const data = await res.json();
    setMessage(data.message || data.detail);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Manual Attendance Registration</h1>
      <input className="border p-2 mb-2 w-full" placeholder="Event ID" value={eventId} onChange={e=>setEventId(e.target.value)} />
      <input className="border p-2 mb-2 w-full" placeholder="Member Name" value={name} onChange={e=>setName(e.target.value)} />
      <input className="border p-2 mb-2 w-full" placeholder="State Code" value={stateCode} onChange={e=>setStateCode(e.target.value)} />
      <input className="border p-2 mb-2 w-full" placeholder="Phone (Optional)" value={phone} onChange={e=>setPhone(e.target.value)} />
      <button onClick={register} className="bg-green-600 text-white p-2 w-full rounded">Register</button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}