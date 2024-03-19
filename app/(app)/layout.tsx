import { PropsWithChildren } from 'react'

import { NavBar } from './navbar'

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-full">
      <NavBar />

      <main className="mt-[56px] flex min-h-[calc(100vh-58px)] w-full flex-row items-center justify-center bg-gray-100">
        <div className="lg:flex-1"></div>
        <div className="flex-[4]">{children}</div>
        <div className="lg:flex-1"></div>
      </main>
    </div>
  )
}
