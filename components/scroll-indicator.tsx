"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

export function ScrollIndicator() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Estado para controlar la visibilidad del indicador de scroll hacia abajo
  const [showScrollDown, setShowScrollDown] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      // Ocultar el indicador cuando se ha desplazado más del 90% de la primera pantalla
      if (window.scrollY > window.innerHeight * 0.1) {
        setShowScrollDown(false)
      } else {
        setShowScrollDown(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Barra de progreso de scroll - siempre visible */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-[101] h-1 origin-left bg-red-600"
        style={{ scaleX }}
      />

      {/* Indicador de scroll animado - solo visible en la primera pantalla */}
      <motion.div
        className="fixed bottom-10 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center"
        initial={{ opacity: 1, y: 0 }}
        animate={{
          opacity: showScrollDown ? 1 : 0,
          y: showScrollDown ? 0 : 20,
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.p
          className="mb-2 text-sm font-medium text-white"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
          }}
        >
          Descubre más
        </motion.p>
        <motion.div
          className="h-10 w-10 rounded-full border-2 border-white/50"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="mx-auto mt-2 h-2 w-2 rounded-full bg-white"
            animate={{
              y: [0, 4, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.5,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}
