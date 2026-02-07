"use client";
import { useEffect, useState } from "react";

export default function AttendanceHistory() {
  const [records, setRecords] = useState<any[]>([]);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/attendance/my_history", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res=>res.json())
      .then(setRecords);
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">My Attendance History</h1>
      <ul>
        {records.map(r => (
          <li key={r.attendance_number} className="border-b py-2">
            Event: {r.event_title} | Attendance: {r.attendance_number} | Cleared: {r.is_cleared ? "✅" : "❌"}
          </li>
        ))}
      </ul>
    </div>
  );
}
