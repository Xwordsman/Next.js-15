# Next.js 14 多语言开发框架

## 📋 框架概述

本文档描述了基于 Next.js 14 的多语言网站开发框架，采用 App Router + 国际化路由 + TailwindCSS 的技术栈。

## 🎯 核心设计理念

- **一个页面文件支持所有语言**：通过动态路由 `[locale]` 实现
- **内容与逻辑分离**：页面逻辑写一次，内容通过 JSON 语言包配置
- **类型安全**：全面使用 TypeScript
- **现代化UI**：TailwindCSS + 响应式设计

## 🛠 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 14.x | React 框架 |
| React | 18.x | UI 库 |
| TypeScript | 5.x | 类型系统 |
| TailwindCSS | 3.x | 样式框架 |
| PostCSS | 8.x | CSS 处理 |

## 📁 项目结构

```
my-nextjs-app/
├── app/                          # App Router 目录
│   ├── layout.tsx                # 根布局（必需）
│   ├── page.tsx                  # 🇺🇸 英文首页（根路径）
│   ├── about/page.tsx            # 🇺🇸 英文关于页
│   ├── contact/page.tsx          # 🇺🇸 英文联系页
│   ├── globals.css               # 全局样式 + Tailwind
│   ├── [locale]/                 # 🌍 其他语言动态路由
│   │   ├── layout.tsx            # 语言特定布局
│   │   ├── page.tsx              # 其他语言首页
│   │   ├── about/page.tsx        # 其他语言关于页
│   │   └── contact/page.tsx      # 其他语言联系页
│   ├── api/                      # API 路由
│   └── not-found.tsx             # 404 页面
├── components/                   # 可复用组件
│   ├── ui/                       # 基础 UI 组件
│   ├── layout/                   # 布局组件
│   └── common/                   # 通用组件
├── lib/                          # 工具函数和配置
├── hooks/                        # 自定义 Hooks
├── locales/                      # 🌍 多语言文件目录
│   ├── en.json                   # 英文语言包
│   ├── zh-CN.json                # 中文语言包
│   ├── ja.json                   # 日文语言包
│   └── index.ts                  # 语言包统一导出
├── types/                        # TypeScript 类型定义
├── styles/                       # 额外样式文件
├── public/                       # 静态资源
│   ├── images/                   # 图片资源
│   ├── icons/                    # 图标文件
│   └── favicon.ico               # 网站图标
├── middleware.ts                 # 路由中间件（处理语言重定向）
├── .eslintrc.json                # ESLint 代码规范配置
├── .gitignore                    # Git 忽略文件配置
├── README.md                     # 项目说明文档
├── next.config.js                # Next.js 配置
├── postcss.config.js             # PostCSS 配置（TailwindCSS 需要）
├── tailwind.config.js            # TailwindCSS 配置
├── tsconfig.json                 # TypeScript 配置
└── package.json                  # 项目依赖和脚本
```

## 🌍 多语言实现原理

### 1. 路由结构
- 英文（主站）：根路径 `/`、`/about`、`/contact`
- 其他语言：`/zh-CN/about`、`/ja/contact`
- 混合路由：英文在根目录，其他语言在 `[locale]` 目录

### 2. 语言包结构
```json
{
  "common": {
    "home": "首页",
    "about": "关于我们"
  },
  "pages": {
    "home": {
      "title": "欢迎访问",
      "description": "这是首页描述"
    }
  }
}
```

### 3. 页面实现

**英文页面（根路径）：**
```typescript
// app/page.tsx
export default function HomePage() {
  const t = useTranslation('en') // 固定使用英文
  
  return (
    <div>
      <h1>{t('pages.home.title')}</h1>
      <p>{t('pages.home.description')}</p>
    </div>
  )
}
```

**其他语言页面：**
```typescript
// app/[locale]/page.tsx
export default function HomePage({ params }: { params: { locale: string } }) {
  const t = useTranslation(params.locale)
  
  return (
    <div>
      <h1>{t('pages.home.title')}</h1>
      <p>{t('pages.home.description')}</p>
    </div>
  )
}
```

## ⚙️ 配置文件说明

### 必需的配置文件

| 文件 | 作用 | 是否必需 |
|------|------|----------|
| `.eslintrc.json` | 代码规范检查，保证代码质量 | ✅ 强烈推荐 |
| `.gitignore` | Git版本控制忽略文件 | ✅ 必需 |
| `postcss.config.js` | PostCSS配置，TailwindCSS依赖 | ✅ 必需 |
| `README.md` | 项目说明文档 | ✅ 推荐 |
| `next.config.js` | Next.js框架配置 | ⚠️ 按需 |

### 配置文件详解

**`.eslintrc.json`** - 代码规范
```json
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "prefer-const": "error",
    "no-unused-vars": "warn"
  }
}
```

**`.gitignore`** - 版本控制
```
# Dependencies
/node_modules
/.pnp
.pnp.js

# Production
/build
/.next/
/out/

# Environment variables
.env*.local

# IDE
.vscode/
.idea/
```

**`postcss.config.js`** - CSS处理
```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**`README.md`** - 项目文档
```markdown
# 项目名称

## 技术栈
- Next.js 14
- TailwindCSS
- TypeScript

## 开发命令
\`\`\`bash
npm run dev    # 开发环境
npm run build  # 构建生产版本
\`\`\`
```

## 🎨 样式系统

### TailwindCSS 配置
- 基础样式：`@tailwind base`
- 组件样式：`@tailwind components`
- 工具类：`@tailwind utilities`
- 自定义组件类：`@layer components`

### 响应式设计
- 移动优先：`sm:` `md:` `lg:` `xl:` `2xl:`
- 暗色模式支持：`dark:` 前缀

## 🔧 开发规范

### 文件命名
- 组件：PascalCase（`UserProfile.tsx`）
- 页面：小写（`page.tsx`、`layout.tsx`）
- 工具函数：camelCase（`formatDate.ts`）
- 常量：UPPER_CASE（`API_ENDPOINTS.ts`）

### 组件结构
- UI 组件：纯展示，无业务逻辑
- 布局组件：处理页面结构
- 业务组件：包含业务逻辑

### 多语言规范
- 所有用户可见文本必须通过翻译函数
- 翻译键使用点分隔：`pages.home.title`
- 语言包按功能模块组织

## 🚀 部署配置

### 支持的语言
- `en`：英文（主站，根路径）
- `zh-CN`：简体中文
- `ja`：日文
- 可扩展其他语言

### 环境变量
```env
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_SUPPORTED_LOCALES=en,zh-CN,ja
```

## 📝 开发流程

1. **创建页面**：英文页面在 `app/` 根目录，其他语言在 `app/[locale]/` 下
2. **添加翻译**：在各语言包中添加对应文本
3. **使用翻译**：在组件中使用 `t('key')` 获取文本
4. **样式开发**：使用 TailwindCSS 类名
5. **类型定义**：为组件和 API 添加 TypeScript 类型

## 🔍 调试和测试

### 本地开发
```bash
npm run dev
# 访问 http://localhost:3000/        (英文主站)
# 访问 http://localhost:3000/zh-CN   (中文)
# 访问 http://localhost:3000/ja      (日文)
```

### 语言切换测试
- 手动修改 URL 中的语言代码
- 使用语言切换组件
- 检查所有文本是否正确显示

## 📚 相关文档

- [Next.js 14 官方文档](https://nextjs.org/docs)
- [TailwindCSS 文档](https://tailwindcss.com/docs)
- [TypeScript 文档](https://www.typescriptlang.org/docs)

---

**创建时间**：2025-11-23  
**版本**：1.0  
**维护者**：开发团队
