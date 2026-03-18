import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "MotoElite - Motocicletas de Alta Gama",
  description:
    "Descubre nuestra exclusiva colección de motocicletas de alta gama para los amantes de la velocidad y la aventura.",
    generator: 'v0.app'
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
