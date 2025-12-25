'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Link, usePathname, type Locale } from '@/i18n/routing'

interface HeaderProps {
  locale: Locale
}

const localeNames: Record<Locale, string> = {
  en: 'English',
  'zh-CN': '中文'
}

// 构建语言切换链接，英文无前缀
function getLocalePath(pathname: string, targetLocale: Locale): string {
  if (targetLocale === 'en') {
    return pathname || '/'
  }
  return `/${targetLocale}${pathname === '/' ? '' : pathname}`
}

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations()
  const pathname = usePathname()
  const router = useRouter()

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as Locale
    router.push(getLocalePath(pathname, newLocale))
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" locale={locale} className="text-xl font-bold text-gray-900">
              Logo
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/"
              locale={locale}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {t('common.home')}
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <select
              value={locale}
              onChange={handleLocaleChange}
              className="bg-gray-100 border border-gray-300 rounded-md px-3 py-1.5 text-sm cursor-pointer hover:bg-gray-200 transition-colors"
            >
              {Object.entries(localeNames).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  )
}