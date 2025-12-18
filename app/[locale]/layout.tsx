import type { Metadata } from 'next'
import { translations, supportedLocales, type Locale } from '@/locales'
import '../globals.css'

export const runtime = 'edge'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const validLocale = supportedLocales.includes(locale as Locale) ? locale as Locale : 'en'
  const localeData = translations[validLocale]
  
  return {
    title: localeData.meta.title,
    description: localeData.meta.description,
  }
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params
  const validLocale = supportedLocales.includes(locale as Locale) ? locale as Locale : 'en'
  
  return (
    <html lang={validLocale}>
      <body>{children}</body>
    </html>
  )
}
