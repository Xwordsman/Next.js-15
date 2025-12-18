import { translations, type Locale } from '@/locales'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface HomePageProps {
  params: Promise<{ locale: Locale }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  const t = translations[locale]

  return (
    <>
      <Header locale={locale} />
      <main className="min-h-screen">
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t.pages.home.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {t.pages.home.subtitle}
            </p>
            <button className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
              {t.pages.home.cta}
            </button>
          </div>
        </section>

        <section className="py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                {locale === 'zh-CN' ? '关于这个模板' : 'About This Template'}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t.pages.home.description}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
