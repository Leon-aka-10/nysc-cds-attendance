import "./globals.css"
import { ReactNode } from "react"

export const metadata = {
  title: "NYSC CDS Attendance System",
  description: "Digital attendance system for NYSC CDS meetings"
}

export default function RootLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  )
}