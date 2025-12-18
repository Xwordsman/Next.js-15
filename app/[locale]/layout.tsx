import type { Metadata } from 'next'
import { translations, type Locale } from '@/locales'
import '../globals.css'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const localeData = translations[locale]
  
  return {
    title: localeData.meta.title,
    description: localeData.meta.description,
  }
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params
  
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  )
}
