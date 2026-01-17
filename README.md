# TapOnce

> **NFC Smart Card Platform** - Digital business card solution for professionals in India

---

## 📚 Documentation

Before starting development, read these docs in order:

1. [**ARCHITECTURE.md**](./docs/ARCHITECTURE.md) - System overview, tech stack, folder structure
2. [**DEVELOPER_GUIDE.md**](./docs/DEVELOPER_GUIDE.md) - Setup instructions, workflows
3. [**DATABASE_SCHEMA.md**](./docs/DATABASE_SCHEMA.md) - Supabase tables & RLS policies
4. [**API_CONTRACTS.md**](./docs/API_CONTRACTS.md) - API endpoint definitions
5. [**TASK_ASSIGNMENTS.md**](./docs/TASK_ASSIGNMENTS.md) - Who owns what module
6. [**CODING_STANDARDS.md**](./docs/CODING_STANDARDS.md) - Code conventions

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev

# Open http://localhost:3000
```

---

## 👥 Team

| Developer | Modules |
|-----------|---------|
| Dev 1 | Admin Dashboard, Financial Dashboard |
| Dev 2 | Agent Dashboard, Landing Page |
| Dev 3 | Customer Dashboard, Public Tap View |

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **Hosting:** Vercel

---

## 📁 Project Structure

```
taponce/
├── docs/                 # 📚 Documentation
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js pages & API routes
│   │   ├── (public)/     # Public tap view (Dev 3)
│   │   ├── (marketing)/  # Landing page (Dev 2)
│   │   ├── admin/        # Admin dashboard (Dev 1)
│   │   ├── agent/        # Agent dashboard (Dev 2)
│   │   └── dashboard/    # Customer dashboard (Dev 3)
│   ├── components/       # UI components
│   ├── lib/              # Utilities & hooks
│   └── types/            # TypeScript types
└── ...
```

---

## 🔗 Links

- [Product Requirements Document](./ProductRequirementsDocument.txt)
- [Supabase Dashboard](https://supabase.com/dashboard) (TBD)
- [Vercel Dashboard](https://vercel.com/dashboard) (TBD)

---

**🤖 This project uses AI-assisted development. Each file contains context comments for AI continuity.**
