import en from './en.json'
import zhCN from './zh-CN.json'

export const translations = {
  'en': en,
  'zh-CN': zhCN,
}

export const supportedLocales = ['en', 'zh-CN'] as const
export const defaultLocale = 'en'

export type Locale = typeof supportedLocales[number]