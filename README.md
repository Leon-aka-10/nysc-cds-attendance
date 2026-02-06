# NYSC CDS Attendance System

A **full-stack web-based attendance system** for NYSC members during CDS meetings.  
Features:

- Mobile-friendly **check-in with geolocation**
- **QR code generation** for attendance verification
- **Attendance history** for members
- Admin dashboard:
  - Event creation
  - Manual registration
  - QR code verification
  - Clearance management
- Offline/manual support for members without smartphones

---

## 🛠 Tech Stack

- **Frontend:** Next.js (React), Tailwind CSS, Vite-compatible
- **Backend:** FastAPI (Python)
- **Database:** PostgreSQL / SQLite
- **Geolocation:** HTML5 Geolocation API
- **QR Code:** `qrcode` (backend), `react-qr-reader` (frontend)
- **Hosting:** Vercel (frontend), Railway / Render (backend)

---

## 🚀 Quick Start (Local Development)

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/nysc-cds-attendance.git
cd nysc-cds-attendance
