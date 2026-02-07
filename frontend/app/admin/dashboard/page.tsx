"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(process.env.NEXT_PUBLIC_API_URL + "/admin/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      {data && <p>{data.message}</p>}
    </div>
  );
}