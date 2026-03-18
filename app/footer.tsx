import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-2xl font-bold">
              Moto<span className="text-red-500">Elite</span>
            </h3>
            <p className="mb-4 text-gray-400">
              Ofrecemos las mejores motocicletas del mercado con un servicio personalizado y de calidad.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 transition-colors hover:text-red-500">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 transition-colors hover:text-red-500">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 transition-colors hover:text-red-500">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 transition-colors hover:text-red-500">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 transition-colors hover:text-red-500">
                  Catálogo de Motos
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 transition-colors hover:text-red-500">
                  Financiamiento
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 transition-colors hover:text-red-500">
                  Servicio Técnico
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 transition-colors hover:text-red-500">
                  Eventos
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 transition-colors hover:text-red-500">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-red-500" />
                <span className="text-gray-400">Av. Libertador 1234, Ciudad Central</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-red-500" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-red-500" />
                <span className="text-gray-400">info@motoelite.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold">Suscríbete</h4>
            <p className="mb-4 text-gray-400">Recibe las últimas novedades y ofertas exclusivas.</p>
            <div className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Tu correo electrónico"
                className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
              />
              <Button className="bg-red-600 hover:bg-red-700">Suscribirse</Button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} MotoElite. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
