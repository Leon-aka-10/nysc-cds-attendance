"use client";
import { useState, useEffect } from "react";

export default function EventsPage() {
  const [title, setTitle] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [events, setEvents] = useState<any[]>([]);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const fetchEvents = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/events/list", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEvents(await res.json());
  };

  const createEvent = async () => {
    const payload = { title, latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
    await fetch(process.env.NEXT_PUBLIC_API_URL + "/events/create", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    });
    setTitle(""); setLatitude(""); setLongitude("");
    fetchEvents();
  };

  useEffect(() => { fetchEvents(); }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Admin Event Management</h1>
      
      <div className="mb-6 border p-4 rounded">
        <h2 className="font-semibold mb-2">Create New Event</h2>
        <input className="border p-2 mb-2 w-full" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <input className="border p-2 mb-2 w-full" placeholder="Latitude" value={latitude} onChange={e=>setLatitude(e.target.value)} />
        <input className="border p-2 mb-2 w-full" placeholder="Longitude" value={longitude} onChange={e=>setLongitude(e.target.value)} />
        <button onClick={createEvent} className="bg-green-600 text-white p-2 rounded">Create Event</button>
      </div>

      <div>
        <h2 className="font-semibold mb-2">Existing Events</h2>
        <ul>
          {events.map(ev => (
            <li key={ev.id} className="border-b py-2">
              {ev.title} - <strong>{ev.event_code}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}