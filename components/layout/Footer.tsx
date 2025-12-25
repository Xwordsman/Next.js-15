'use client'

import { useTranslations } from 'next-intl'
import { Link, type Locale } from '@/i18n/routing'

interface FooterProps {
  locale: Locale
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Our Website</h3>
            <p className="text-gray-300 mb-4">
              {t('footer.description')}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t('common.language')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" locale="en" className="text-gray-300 hover:text-white transition-colors">
                  English
                </Link>
              </li>
              <li>
                <Link href="/" locale="zh-CN" className="text-gray-300 hover:text-white transition-colors">
                  中文
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" locale={locale} className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" locale={locale} className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
