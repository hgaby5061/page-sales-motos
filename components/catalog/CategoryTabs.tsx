"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/catalog/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { ProcessedProduct, ProcessedCategory } from "@/types/strapi";

interface CategoryTabsProps {
  products: ProcessedProduct[];
  categories: ProcessedCategory[];
  loading?: boolean;
  onProductSelect?: (product: ProcessedProduct) => void;
}

/**
 * Componente que organiza productos en tabs por categoría (Desktop)
 * Maneja la visualización de productos agrupados
 */
export function CategoryTabs({
  products,
  categories,
  loading = false,
  onProductSelect,
}: CategoryTabsProps) {
  // Agrupa productos por categoría
  const groupedProducts = categories.reduce((acc, category) => {
    acc[category.name] = products.filter(
      (p) => p.categoryName === category.name
    );
    return acc;
  }, {} as Record<string, ProcessedProduct[]>);

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-80 w-full rounded-lg bg-gray-800" />
        ))}
      </div>
    );
  }

  return (
    <Tabs defaultValue={categories[0]?.name || "all"} className="w-full">
      {/* Pestañas de categorías */}
      <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4 mb-8 bg-gray-800 dark:bg-gray-900">
        {categories.map((category) => (
          <TabsTrigger key={category.id} value={category.name}>
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Contenido de cada categoría */}
      {categories.map((category) => (
        <TabsContent key={category.id} value={category.name} className="mt-8">
          {groupedProducts[category.name] &&
          groupedProducts[category.name].length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedProducts[category.name].map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => onProductSelect?.(product)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">
                No hay productos en esta categoría
              </p>
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
