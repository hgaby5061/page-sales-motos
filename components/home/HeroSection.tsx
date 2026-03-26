"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/**
 * Componente de partículas para efectos visuales en hero
 */
export function HeroParticles({ quantity = 30 }: { quantity?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: quantity }).map((_, index) => (
        <div
          key={index}
          className="absolute h-2 w-2 rounded-full bg-red-500"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.1,
            animation: `floatParticle ${
              Math.random() * 10 + 10
            }s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Líneas de velocidad decorativas para hero
 */
export function SpeedLines() {
  return (
    <div className="absolute inset-0 opacity-20">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute h-0.5 w-full bg-white"
          style={{
            top: `${i * 5 + Math.random() * 5}%`,
            left: 0,
            transform: "rotate(-5deg)",
            opacity: Math.random() * 0.5 + 0.2,
            animation: `moveLines ${Math.random() * 3 + 2}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
}

interface HeroMotorcycleProps {
  isVisible: boolean;
  motorcycleY: any;
  motorcycleRotate: any;
}

/**
 * Moto roja animada del hero
 */
export function HeroMotorcycle({
  isVisible,
  motorcycleY,
  motorcycleRotate,
}: HeroMotorcycleProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 200, rotate: -5 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          exit={{ opacity: 0, x: 200 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: 1.2,
          }}
          style={{
            y: motorcycleY,
            rotate: motorcycleRotate,
          }}
        >
          <div className="relative mt-3 md:mt-10 h-[500px] w-[600px] lg:block">
            <Image
              src="/R.jpg?height=600&width=800"
              alt="Motocicleta deportiva roja"
              fill
              className="object-contain"
              priority
            />
            <div className="absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/30 blur-3xl" />
            <div className="absolute bottom-0 left-1/2 h-6 w-[80%] -translate-x-1/2 rounded-full bg-black/40 blur-md" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface HeroHeaderProps {
  onExplore: () => void;
}

/**
 * Encabezado y CTA del hero
 */
export function HeroHeader({ onExplore }: HeroHeaderProps) {
  return (
    <div className="max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <span className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          POTENCIA <span className="text-red-600">&</span> PASIÓN
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <span className="mb-8 max-w-xl text-xl text-gray-200 md:text-2xl block">
          Experimenta la adrenalina de conducir las motocicletas más exclusivas
          del mercado.
        </span>
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <button
            onClick={onExplore}
            className="rounded-lg bg-red-600 px-8 py-3 text-lg font-semibold text-white hover:bg-red-700 transition-colors hover:scale-105 active:scale-95"
          >
            Explorar Modelos
          </button>
        </div>
      </motion.div>
    </div>
  );
}
