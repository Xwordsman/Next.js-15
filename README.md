# Next.js 15 Multilingual Template

A modern multilingual website template built with Next.js 15, React 19, TypeScript, and TailwindCSS.

## 🌍 Languages

- **English** (Main site): `/`, `/about`, `/contact`
- **简体中文**: `/zh-CN`, `/zh-CN/about`, `/zh-CN/contact`

## 🛠 Tech Stack

- **Next.js 15.4.8** - React framework with App Router
- **React 19** - Latest React with improved performance
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS framework
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
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # English homepage
│   └── [locale]/          # Other languages
├── components/            # Reusable components
├── locales/              # Language JSON files
├── lib/                  # Utilities
└── public/               # Static assets
```

## 🌐 Adding New Languages

1. Create language file in `locales/` (e.g., `ja.json`)
2. Add language to supported locales
3. Update middleware configuration

## 📝 SEO Features

- Server-side rendering
- Dynamic meta tags
- Multi-language sitemaps
- Structured data support

## ☁️ Deployment

This template is optimized for deployment on:
- Vercel
- Cloudflare Pages
- Any Node.js hosting platform

---

Built with ❤️ using Next.js 15
