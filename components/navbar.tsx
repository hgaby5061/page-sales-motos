"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"

export function Navbar({ sections }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("Inicio")

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Determinar la sección activa basada en la posición de scroll
      const scrollPosition = window.scrollY + 100 // Offset para mejor detección

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.ref.current) {
          const element = section.ref.current
          if (element.offsetTop <= scrollPosition) {
            setActiveSection(section.name)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  const scrollToSection = (ref) => {
    setIsOpen(false)
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 80, // Offset para el navbar
        behavior: "smooth",
      })
    }
  }

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 py-2 shadow-lg backdrop-blur-sm" : "bg-transparent py-4"
      }`}
    >
      <div className="container flex items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold text-white">
          Moto<span className="text-red-600">Elite</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden space-x-8 lg:flex">
          {sections.map((section) => (
            <button
              key={section.name}
              onClick={() => scrollToSection(section.ref)}
              className={`text-sm font-medium transition-colors hover:text-red-400 ${
                activeSection === section.name ? "text-red-500" : "text-white"
              }`}
            >
              {section.name}
            </button>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button className="bg-red-600 hover:bg-red-700">Prueba de Manejo</Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="text-white lg:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="container overflow-hidden bg-black/95 px-4 lg:hidden"
          >
            <nav className="flex flex-col space-y-4 py-6">
              {sections.map((section) => (
                <button
                  key={section.name}
                  onClick={() => scrollToSection(section.ref)}
                  className={`text-left text-lg font-medium transition-colors hover:text-red-400 ${
                    activeSection === section.name ? "text-red-500" : "text-white"
                  }`}
                >
                  {section.name}
                </button>
              ))}
              <Button className="mt-2 bg-red-600 hover:bg-red-700">Prueba de Manejo</Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
