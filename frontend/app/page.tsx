import Link from "next/link"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-3xl font-bold text-center">
        NYSC CDS Attendance System
      </h1>

      <p className="text-center text-gray-600 max-w-md">
        A digital attendance platform for NYSC CDS meetings.
        Check in securely using location verification and QR codes.
      </p>

      <div className="flex gap-4">
        <Link
          href="/checkin"
          className="rounded bg-green-600 px-6 py-3 text-white hover:bg-green-700"
        >
          Member Check-in
        </Link>

        <Link
          href="/admin/login"
          className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Admin Login
        </Link>
      </div>
    </main>
  )
}