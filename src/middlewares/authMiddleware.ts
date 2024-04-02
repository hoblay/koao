import { default as def } from 'next-auth/middleware';



export const config = {
  matcher: [
    "/class/:path*"
  ]
}