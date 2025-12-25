# Next.js 15 多语言开发框架

## 📋 框架概述

本文档描述了基于 Next.js 15 的多语言网站开发框架，采用 App Router + next-intl + TailwindCSS 的技术栈。

## 🎯 核心设计理念

- **一套代码支持所有语言**：通过 `[locale]` 动态路由 + next-intl 实现
- **默认语言无前缀**：英文访问 `/`，其他语言访问 `/zh-CN`
- **内容与逻辑分离**：页面逻辑写一次，内容通过 JSON 语言包配置
- **类型安全**：全面使用 TypeScript
- **现代化UI**：TailwindCSS + 响应式设计

## 🛠 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 15.x | React 框架 |
| React | 19.x | UI 库 |
| TypeScript | 5.x | 类型系统 |
| TailwindCSS | 3.x | 样式框架 |
| next-intl | 4.x | 国际化方案 |

## 📁 项目结构

```
my-nextjs-app/
├── app/                          # App Router 目录
│   ├── layout.tsx                # 根布局（导入全局CSS）
│   ├── globals.css               # 全局样式 + Tailwind
│   └── [locale]/                 # 🌍 所有语言统一目录
│       ├── layout.tsx            # 语言布局 + NextIntlClientProvider
│       ├── page.tsx              # 首页
│       ├── about/page.tsx        # 关于页
│       └── contact/page.tsx      # 联系页
├── components/                   # 可复用组件
│   ├── ui/                       # 基础 UI 组件
│   ├── layout/                   # 布局组件 (Header, Footer)
│   └── common/                   # 通用组件
├── i18n/                         # 🌍 next-intl 配置
│   ├── routing.ts                # 路由配置（语言列表、前缀策略）
│   └── request.ts                # 服务端请求配置
├── locales/                      # 🌍 多语言文件目录
│   ├── en.json                   # 英文语言包
│   └── zh-CN.json                # 中文语言包
├── public/                       # 静态资源
├── middleware.ts                 # next-intl 中间件
├── next.config.js                # Next.js 配置 + next-intl 插件
├── tailwind.config.js            # TailwindCSS 配置
├── tsconfig.json                 # TypeScript 配置
└── package.json                  # 项目依赖和脚本
```

## 🌍 多语言实现原理

### 1. 路由结构
- 英文（默认）：根路径 `/`、`/about`、`/contact`（无前缀）
- 中文：`/zh-CN`、`/zh-CN/about`、`/zh-CN/contact`
- 配置：`localePrefix: 'as-needed'`

### 2. 核心配置文件

**i18n/routing.ts** - 路由配置
```typescript
import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  locales: ['en', 'zh-CN'],
  defaultLocale: 'en',
  localePrefix: 'as-needed' // 默认语言无前缀
})

export type Locale = (typeof routing.locales)[number]

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)
```

**i18n/request.ts** - 服务端配置
```typescript
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }
  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default
  }
})
```

### 3. 语言包结构
```json
{
  "meta": { "title": "...", "description": "..." },
  "common": { "home": "首页", "about": "关于" },
  "pages": {
    "home": {
      "title": "你好世界",
      "subtitle": "欢迎信息"
    }
  },
  "footer": { "copyright": "..." }
}
```

### 4. 页面实现

**所有语言共用一套代码：**
```typescript
// app/[locale]/page.tsx
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return <MainContent />
}

function MainContent() {
  const t = useTranslations()
  return (
    <div>
      <h1>{t('pages.home.title')}</h1>
      <p>{t('pages.home.subtitle')}</p>
    </div>
  )
}
```

### 5. 组件中使用翻译

**服务端组件：**
```typescript
import { useTranslations } from 'next-intl'

export default function ServerComponent() {
  const t = useTranslations()
  return <h1>{t('pages.home.title')}</h1>
}
```

**客户端组件：**
```typescript
'use client'
import { useTranslations } from 'next-intl'

export default function ClientComponent() {
  const t = useTranslations()
  return <button>{t('common.submit')}</button>
}
```

### 6. 语言切换导航

```typescript
import { Link, usePathname } from '@/i18n/routing'

// 切换到中文，保持当前路径
<Link href={pathname} locale="zh-CN">中文</Link>

// 切换到英文
<Link href={pathname} locale="en">English</Link>
```

## ⚙️ 配置文件说明

### next.config.js
```javascript
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig = {
  // 其他配置
}

export default withNextIntl(nextConfig)
```

### middleware.ts
```typescript
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}
```

## 🔧 开发规范

### 添加新语言
1. 在 `locales/` 创建新语言文件（如 `ja.json`）
2. 在 `i18n/routing.ts` 添加语言代码：
   ```typescript
   locales: ['en', 'zh-CN', 'ja']
   ```

### 添加新页面
1. 在 `app/[locale]/` 下创建页面目录和 `page.tsx`
2. 在各语言包中添加对应翻译
3. 完成！所有语言自动支持

### 文件命名
- 组件：PascalCase（`UserProfile.tsx`）
- 页面：小写（`page.tsx`、`layout.tsx`）
- 语言包：语言代码（`en.json`、`zh-CN.json`）

## 🚀 部署配置

### 支持的语言
- `en`：英文（默认，无前缀）
- `zh-CN`：简体中文
- 可扩展其他语言

### 本地开发
```bash
npm run dev
# 访问 http://localhost:3000/        (英文)
# 访问 http://localhost:3000/zh-CN   (中文)
```

## 📚 相关文档

- [Next.js 15 官方文档](https://nextjs.org/docs)
- [next-intl 文档](https://next-intl-docs.vercel.app/)
- [TailwindCSS 文档](https://tailwindcss.com/docs)

---

**创建时间**：2025-11-23  
**更新时间**：2025-12-25  
**版本**：2.0 (next-intl)
