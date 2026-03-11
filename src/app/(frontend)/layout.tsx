import React from 'react'
import './styles.css'
import Navbar from '@/components/navbar/navbar'
import Footer from '@/components/footer/footer'
import ReduxProvider from '@/provider/reduxProvider'

export const metadata = {
  description: 'Perfume store',
  title: 'FayaKun Attar',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <main>
            <Navbar />
            {children}
            <Footer />
          </main>
        </ReduxProvider>
      </body>
    </html>
  )
}
