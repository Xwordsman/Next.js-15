'use client'

import Link from 'next/link'
import { translations, type Locale } from '@/locales'

interface HeaderProps {
  locale: Locale
}

export default function Header({ locale }: HeaderProps) {
  const t = translations[locale]
  
  const isEnglish = locale === 'en'
  const baseUrl = isEnglish ? '' : `/${locale}`

  const handleLanguageChange = (e: any) => {
    const newLocale = e.target.value as Locale
    
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname
      let newPath = ''
      
      if (newLocale === 'en') {
        newPath = currentPath.replace(/^\/zh-CN/, '') || '/'
      } else {
        newPath = currentPath.startsWith('/zh-CN') 
          ? currentPath 
          : `/zh-CN${currentPath === '/' ? '' : currentPath}`
      }
      
      window.location.href = newPath
    }
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href={baseUrl || '/'} className="text-xl font-bold text-gray-900">
              Logo
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href={baseUrl || '/'} 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {t.common.home}
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <select 
                className="bg-gray-100 border border-gray-300 rounded-md px-3 py-1 text-sm"
                value={locale}
                onChange={handleLanguageChange}
              >
                <option value="en">English</option>
                <option value="zh-CN">中文</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}