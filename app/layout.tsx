import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"
import { ThemeProvider } from "@/contexts/theme-context"
import { CartSidebar } from "@/components/cart-sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Little Joy Baby Care - Premium Baby Clothing & Toys",
  description:
    "Discover our curated collection of premium organic clothing and educational toys, designed with love for your little one's comfort and development.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="system" storageKey="little-joy-theme">
          <CartProvider>
            {children}
            <CartSidebar />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
