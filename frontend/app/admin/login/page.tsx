"use client";
import { useState } from "react";
import { adminLogin } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const submit = async () => {
    const res = await adminLogin(email, password);
    localStorage.setItem("token", res.access_token);
    router.push("/admin/dashboard");
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4">Admin Login</h1>
      <input className="border p-2 w-full mb-2" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" className="border p-2 w-full mb-4" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={submit} className="bg-blue-600 text-white p-2 w-full rounded">
        Login
      </button>
    </div>
  );
}