"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/catalog/ProductCard";
import type { ProcessedProduct, ProcessedCategory } from "@/types/strapi";

interface HomeProductsSectionProps {
  products: ProcessedProduct[];
  categories: ProcessedCategory[];
  onProductSelect?: (product: ProcessedProduct) => void;
  isInView?: boolean;
}

/**
 * Sección que muestra 4 productos por categoría en el home
 */
export function HomeProductsSection({
  products,
  categories,
  onProductSelect,
  isInView = false,
}: HomeProductsSectionProps) {
  // Agrupar productos por categoría
  const groupedProducts = categories.reduce((acc, category) => {
    acc[category.name] = products
      .filter((p) => p.categoryName === category.name)
      .slice(0, 4); // Solo 4 primeros
    return acc;
  }, {} as Record<string, ProcessedProduct[]>);

  return (
    <section className="py-20 bg-gray-900 dark:bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <h2 className="text-center text-4xl font-bold sm:text-left sm:text-5xl text-white">
                Nuestra Colección
              </h2>
              <p className="mt-2 max-w-2xl text-gray-300">
                Descubre nuestra selección de motocicletas premium para cada
                tipo de piloto
              </p>
            </div>
          </div>
        </motion.div>

        {/* Mostrar categorías con sus productos */}
        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
          >
            <div className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl text-red-600 font-bold">
                  {category.name}
                </h3>
                <a
                  href={`/catalogo?category=${encodeURIComponent(
                    category.name
                  )}`}
                  className="text-red-600 font-semibold hover:text-red-700 transition-colors"
                >
                  Ver todos →
                </a>
              </div>

              {groupedProducts[category.name]?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {groupedProducts[category.name].map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onClick={() => onProductSelect?.(product)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Sin productos en esta categoría
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
