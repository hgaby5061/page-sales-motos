"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Inicio");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determinar la sección activa basada en la ruta actual
      const path = window.location.pathname;
      if (path === "/catalogo") {
        setActiveSection("Catálogo");
      } else {
        setActiveSection("Inicio");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "bg-black/90 py-2 shadow-lg backdrop-blur-sm"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container flex items-center justify-between px-4">
        <Link href="/">
          <img src="/logo.png" alt="MoveUp" className="h-9 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden space-x-9 pb-3 lg:flex">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-red-400 ${
              activeSection === "Inicio" ? "text-red-500" : "text-white"
            }`}
          >
            Inicio
          </Link>
          <Link
            href="/catalogo"
            className={`text-sm font-medium transition-colors hover:text-red-400 ${
              activeSection === "Catálogo" ? "text-red-500" : "text-white"
            }`}
          >
            Catálogo
          </Link>
        </nav>

        <div className="hidden lg:block"></div>

        {/* Mobile Menu Button */}
        <button
          className="text-white lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
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
          >
            <div className="overflow-hidden bg-black/95">
              <div className="container px-4 lg:hidden">
                <nav className="flex flex-col space-y-4 py-6">
                  <Link
                    href="/"
                    className={`text-left text-lg font-medium transition-colors hover:text-red-400 ${
                      activeSection === "Inicio" ? "text-red-500" : "text-white"
                    }`}
                  >
                    Inicio
                  </Link>
                  <Link
                    href="/catalogo"
                    className={`text-left text-lg font-medium transition-colors hover:text-red-400 ${
                      activeSection === "Catálogo"
                        ? "text-red-500"
                        : "text-white"
                    }`}
                  >
                    Catálogo
                  </Link>
                </nav>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
