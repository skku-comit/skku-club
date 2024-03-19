'use client'

import { PropsWithChildren } from 'react'
import { DayPickerProvider } from 'react-day-picker'

export function ClientContext({ children }: PropsWithChildren) {
  return <DayPickerProvider initialProps={{}}>{children}</DayPickerProvider>
}
