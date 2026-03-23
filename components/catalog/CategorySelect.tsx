"use client";

import { useState } from "react";
import { ProductCard } from "@/components/catalog/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { ProcessedProduct, ProcessedCategory } from "@/types/strapi";

interface CategorySelectProps {
  products: ProcessedProduct[];
  categories: ProcessedCategory[];
  loading?: boolean;
  onProductSelect?: (product: ProcessedProduct) => void;
}

/**
 * Componente mobile-friendly con select para filtrar por categoría
 * Muestra todos los productos de la categoría seleccionada
 */
export function CategorySelect({
  products,
  categories,
  loading = false,
  onProductSelect,
}: CategorySelectProps) {
  const [selectedCategory, setSelectedCategory] = useState(
    categories[0]?.name || ""
  );

  const filteredProducts = products.filter(
    (p) => p.categoryName === selectedCategory
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 bg-gray-800 rounded-lg" />
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-80 w-full rounded-lg bg-gray-800" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Select de categorías */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-3">
          Filtrar por Categoría
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/50 transition-colors"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Grid de productos */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onProductSelect?.(product)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400">No hay productos en esta categoría</p>
        </div>
      )}
    </div>
  );
}
