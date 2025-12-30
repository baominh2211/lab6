# Lab 6: Advanced Next.js Framework Architecture
## By Hoang Bao Minh | MSc. Tran Vinh Khiem

## 📋 Nội dung

### Student Exercises
1. **Exercise 1**: Dynamic Blog System (Pages Router + SSG)
2. **Exercise 2**: Dashboard with Hybrid Rendering (App Router)
3. **Exercise 3**: API Route & Middleware
4. **Exercise 4**: Image & Font Optimization

### Capstone Project
- **AI-Powered Knowledge Base** với RAG, Streaming UI, Server Actions

## 🚀 Cài đặt

```bash
npm install
npm run dev
```

Mở http://localhost:3000

## 📁 Cấu trúc

```
src/
├── app/                    # App Router
│   ├── layout.tsx         # Root layout + next/font
│   ├── page.tsx           # Homepage
│   ├── dashboard/         # Exercise 2
│   ├── knowledge-base/    # Capstone
│   ├── optimization/      # Exercise 4
│   ├── api-test/          # Exercise 3
│   └── api/chat/          # API Route Handler
├── pages/                  # Pages Router
│   ├── blog/              # Exercise 1 (SSG)
│   └── api/secret.ts      # Exercise 3
├── components/
│   └── ThemeToggle.tsx    # Client Component
├── data/
│   └── data.json          # Blog data
└── middleware.ts          # Exercise 3
```

## 🎯 Demo Routes

| Route | Exercise | Rendering |
|-------|----------|-----------|
| `/` | Home | Static |
| `/blog` | Exercise 1 | SSG + ISR |
| `/blog/[id]` | Exercise 1 | SSG + fallback |
| `/dashboard` | Exercise 2 | Server + Client Components |
| `/api-test` | Exercise 3 | API + Middleware |
| `/optimization` | Exercise 4 | next/image + next/font |
| `/knowledge-base` | Capstone | Server Actions + Streaming |

## 📚 Công nghệ

- Next.js 15 (App Router + Pages Router)
- React 19
- TypeScript
- Tailwind CSS
- Server Actions
- Middleware

---
Built by Hoang Bao Minh
