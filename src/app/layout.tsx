import { ReactNode } from 'react'
import './globals.css'

export const metadata = {
  title: 'Ypomoni',
  description: 'Interactive 3D experiences by Ypomoni',
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
