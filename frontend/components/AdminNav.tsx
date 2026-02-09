"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AdminNav() {
  const pathname = usePathname()

  const linkClass = (path: string) =>
    `rounded px-4 py-2 ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`

  return (
    <nav className="flex gap-3 border-b bg-white p-4">
      <Link href="/admin/dashboard" className={linkClass("/admin/dashboard")}>
        Dashboard
      </Link>

      <Link href="/admin/events" className={linkClass("/admin/events")}>
        Events
      </Link>

      <Link href="/admin/manual" className={linkClass("/admin/manual")}>
        Manual Entry
      </Link>

      <Link href="/admin/qr" className={linkClass("/admin/qr")}>
        QR Scan
      </Link>
    </nav>
  )
}