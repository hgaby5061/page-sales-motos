"use client";

import { motion } from "framer-motion";

interface CatalogHeaderProps {
  title: string;
  subtitle?: string;
}

/**
 * Componente de encabezado para la sección de catálogo
 */
export function CatalogHeader({ title, subtitle }: CatalogHeaderProps) {
  return (
    <div className="mb-8 mt-4 md:mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          {title}
        </h1>
      </motion.div>
      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-base md:text-lg text-gray-300">{subtitle}</p>
        </motion.div>
      )}
    </div>
  );
}
