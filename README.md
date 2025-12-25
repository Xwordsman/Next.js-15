# Next.js 15 Multilingual Template

A modern multilingual website template built with Next.js 15, React 19, TypeScript, TailwindCSS, and next-intl.

## 🌍 Languages

- **English** (Main site): `/`, `/about`, `/contact`
- **简体中文**: `/zh-CN`, `/zh-CN/about`, `/zh-CN/contact`

## 🛠 Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with improved performance
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS framework
- **next-intl** - Internationalization for Next.js
- **Server-Side Rendering** - SEO optimized

## 🚀 Getting Started

### Development
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/                    # App Router
│   ├── layout.tsx         # Root layout (CSS import)
│   ├── globals.css        # Global styles + TailwindCSS
│   └── [locale]/          # All language pages (single codebase)
│       ├── layout.tsx     # Locale layout with NextIntlClientProvider
│       └── page.tsx       # Homepage
├── components/            # Reusable components
├── i18n/                  # next-intl configuration
│   ├── routing.ts         # Routing config (locales, prefix)
│   └── request.ts         # Server request config
├── locales/               # Language JSON files
│   ├── en.json
│   └── zh-CN.json
├── middleware.ts          # next-intl middleware
└── public/                # Static assets
```

## 🌐 Adding New Languages

1. Create language file in `locales/` (e.g., `ja.json`)
2. Add locale to `i18n/routing.ts`:
   ```ts
   locales: ['en', 'zh-CN', 'ja']
   ```
3. Done! The middleware handles routing automatically.

## 📝 Usage

### In Server Components
```tsx
import { useTranslations } from 'next-intl'

export default function Page() {
  const t = useTranslations()
  return <h1>{t('pages.home.title')}</h1>
}
```

### In Client Components
```tsx
'use client'
import { useTranslations } from 'next-intl'

export default function Button() {
  const t = useTranslations()
  return <button>{t('common.submit')}</button>
}
```

### Navigation with Locale
```tsx
import { Link } from '@/i18n/routing'

<Link href="/about" locale="zh-CN">关于我们</Link>
```

## ☁️ Deployment

This template is optimized for deployment on:
- Vercel
- Cloudflare Pages
- Any Node.js hosting platform

---

Built with ❤️ using Next.js 15 and next-intl
