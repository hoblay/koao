import { default as def } from 'next-auth/middleware';



export const config = {
  matcher: [
    "/watch/:path*"
  ]
}