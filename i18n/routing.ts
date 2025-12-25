import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  locales: ['en', 'zh-CN'],
  defaultLocale: 'en',
  localePrefix: 'as-needed' // 英文无前缀，其他语言有前缀
})

export type Locale = (typeof routing.locales)[number]

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
