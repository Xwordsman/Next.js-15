import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: [
    // 匹配所有路径，除了：
    // - api 路由
    // - _next 内部文件
    // - 静态文件（带扩展名的）
    '/((?!api|_next|.*\\..*).*)'
  ]
}