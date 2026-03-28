import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { icons } from "lucide-react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "MoveUp - Motocicletas de Alta Gama",
  description:
    "Descubre nuestra exclusiva colección de motocicletas de alta gama para los amantes de la velocidad y la aventura.",
    generator: 'v0.app',
  icons:"icon.png"
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
