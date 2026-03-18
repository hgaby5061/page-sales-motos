"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface AnimatedCardProps {
  title: string
  image: string
  description: string
  onClick?: () => void
  badge?: string
  price?: number
  specs?: {
    label: string
    value: string
  }[]
}

export function AnimatedCard({ title, image, description, onClick, badge, price, specs = [] }: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group relative h-full cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -10,
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative h-64 overflow-hidden">
        <motion.div
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.4 }}
          className="h-full w-full"
        >
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </motion.div>

        {/* Overlay con efecto de gradiente */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
          initial={{ opacity: 0.7 }}
          animate={{ opacity: isHovered ? 0.9 : 0.7 }}
          transition={{ duration: 0.3 }}
        />

        {/* Contenido superpuesto */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <motion.h3
            className="text-xl font-bold"
            animate={isHovered ? { y: -5 } : { y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {title}
          </motion.h3>
          {price && (
            <motion.p
              className="text-lg font-semibold text-red-400"
              animate={isHovered ? { y: -5 } : { y: 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
            >
              ${price.toLocaleString()}
            </motion.p>
          )}
        </div>
      </div>

      <div className="p-4">
        {badge && (
          <motion.div
            className="mb-2 inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800"
            whileHover={{ scale: 1.05 }}
          >
            {badge}
          </motion.div>
        )}

        <p className="line-clamp-2 text-gray-700">{description}</p>

        {specs.length > 0 && (
          <div className="mt-4 flex justify-between">
            {specs.map((spec, index) => (
              <p key={index} className="text-sm font-medium">
                {spec.value}
              </p>
            ))}
          </div>
        )}

        {/* Indicador de clic */}
        <motion.div
          className="absolute bottom-2 right-2 h-6 w-6 rounded-full bg-red-500 text-white opacity-0"
          animate={{
            opacity: isHovered ? 0.8 : 0,
            scale: isHovered ? [1, 1.1, 1] : 1,
          }}
          transition={{
            opacity: { duration: 0.2 },
            scale: { repeat: Number.POSITIVE_INFINITY, duration: 1.5 },
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
              clipRule="evenodd"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  )
}
