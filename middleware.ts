import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing, {
  // 启用语言检测（首次访问根据浏览器语言）
  localeDetection: true
})

export const config = {
  matcher: [
    // 匹配所有路径，除了：
    // - api 路由
    // - _next 内部文件
    // - 静态文件（带扩展名的）
    '/((?!api|_next|.*\\..*).*)'
  ]
}