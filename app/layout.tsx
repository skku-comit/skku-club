import './globals.css'

import { UserProvider } from '@auth0/nextjs-auth0/client'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { TrpcProvider } from './trpc-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '성균관대학교 동아리연합회',
  description: '성균관대학교 동아리연합회 공식 홈페이지입니다.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <UserProvider>
          <TrpcProvider>{children}</TrpcProvider>
        </UserProvider>
      </body>
    </html>
  )
}
