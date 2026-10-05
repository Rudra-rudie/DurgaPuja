# 🌺 Sri Sri Sarbojanin Durga Puja - Festive Invitation Web App

A complete, full-stack Durga Puja digital invitation web application with dynamic CMS capabilities, audio synthesizer, day-wise schedule, online devotee RSVP booking, and personalized guest invitation routing. Converted from a Google Stitch design with pixel-perfect fidelity.

---

## 🚀 Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Design System**: Material 3 / Google Stitch theme with festive typography (`Playfair Display`, `Noto Serif`, `Plus Jakarta Sans`) and sacred symbols (`Material Symbols Outlined`).
- **Interactive Audio**: Authentic Web Audio API Dhaak drum rhythm synthesizer (*Dha - Tin - Tin - Ta*).
- **Backend**: Node.js + Express
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT token authentication with bcrypt password hashing

---

## 📁 Project Structure

```
d:\DurgaPuja\
├── client/                     # React + Vite Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # 11 Modular Section Components
│   │   │   ├── Header.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── WelcomeSection.jsx
│   │   │   ├── HeritageSection.jsx
│   │   │   ├── ScheduleSection.jsx
│   │   │   ├── DarshanGallerySection.jsx
│   │   │   ├── BhogDiningSection.jsx
│   │   │   ├── CulturalSection.jsx
│   │   │   ├── LocationSection.jsx
│   │   │   ├── RSVPSection.jsx
│   │   │   ├── DaanOfferingsSection.jsx
│   │   │   ├── FestiveGreetingSection.jsx
│   │   │   └── BottomNav.jsx
│   │   ├── utils/
│   │   │   └── dhaakAudio.js   # Web Audio Dhaak rhythm synthesizer
│   │   ├── api.js              # REST API client
│   │   ├── App.jsx             # Dynamic master application
│   │   └── main.jsx
│   ├── tailwind.config.js      # Exact Stitch design tokens
│   └── index.html
├── server/                     # Node.js + Express Backend
│   ├── prisma/
│   │   ├── schema.prisma       # 11 PostgreSQL Prisma models
│   │   └── seed.js             # 100% Stitch design database seed script
│   ├── src/
│   │   ├── middleware/         # JWT auth middleware
│   │   ├── routes/
│   │   │   ├── public.js       # Dynamic invitation content, RSVP, guest invites
│   │   │   ├── auth.js         # Admin authentication & password change
│   │   │   └── admin.js        # Content editing, file uploads, RSVP CSV export
│   │   ├── prisma.js           # Prisma client instance
│   │   └── index.js            # Express server entry point
│   ├── uploads/                # Media upload storage
│   └── package.json
└── stitch-design/              # Original Google Stitch export (HTML, MD, PNG)
```

---

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js (v18+ or v20+)
- PostgreSQL instance running

### 2. Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your PostgreSQL DATABASE_URL and JWT_SECRET
npx prisma db push
node prisma/seed.js
npm run dev # or npm start
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

### 4. Admin Credentials (Default Seed)
- **Username**: `admin`
- **Password**: `admin123`

---

## 🌟 Current Implementation Status

- [x] **Stage 1 – Analyze & Set Up**: Exact Google Stitch component conversion, fonts, and Web Audio API Dhaak player.
- [x] **Stage 2 – Make Content Dynamic**: PostgreSQL schema, Prisma ORM, seed script, Express REST API, and dynamic frontend integration.
- [ ] **Stage 3 – Admin Dashboard (`/admin`)**: Interactive content editor, photo manager, schedule manager, and RSVP CSV export.
- [ ] **Stage 4 – Personalized Guest Links & Sharing**: Unique URLs (e.g. `/invite/guest-name`) and WhatsApp 1-click share.
- [ ] **Stage 5 – Multilingual & PWA Optimizations**: Full Bengali/English/Hindi translations and audio toggle.
- [ ] **Stage 6 – Deployment**: Vercel frontend + Render/Railway backend deployment guides.
