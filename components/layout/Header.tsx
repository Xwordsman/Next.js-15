'use client'

import { useTranslations } from 'next-intl'
import { Link, usePathname, type Locale } from '@/i18n/routing'

interface HeaderProps {
  locale: Locale
}

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations()
  const pathname = usePathname()

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
            <div className="flex gap-2">
              <Link
                href={pathname}
                locale="en"
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  locale === 'en' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                EN
              </Link>
              <Link
                href={pathname}
                locale="zh-CN"
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  locale === 'zh-CN' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                中文
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}