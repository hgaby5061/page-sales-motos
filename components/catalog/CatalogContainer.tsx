"use client";

import { useState } from "react";
import { useCatalogData } from "@/hooks/useCatalogData";
import { CatalogHeader } from "@/components/catalog/CatalogHeader";
import { CategoryTabs } from "@/components/catalog/CategoryTabs";
import { CategorySelect } from "@/components/catalog/CategorySelect";
import { ProductDetailModal } from "@/components/catalog/ProductDetailModal";
import type { ProcessedProduct } from "@/types/strapi";

/**
 * Container principal del catálogo
 * Orquesta la lógica de carga de datos, estado modal y eventos
 * Mantiene separación de responsabilidades: lógica aquí, presentación en componentes
 */
export function CatalogContainer() {
  const { data, loading, error } = useCatalogData();
  const [selectedProduct, setSelectedProduct] =
    useState<ProcessedProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductSelect = (product: ProcessedProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Limpiar selección después de cerrar modal
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-black">
      <div className="container mx-auto px-3 md:px-4 py-8 md:py-12">
        {/* Encabezado */}
        <CatalogHeader
          title="Catálogo de Motocicletas"
          subtitle="Explora nuestras increíbles motos eléctricas y convencionales"
        />

        {/* Manejo de errores */}
        {error && (
          <div className="bg-red-950 border border-red-800 rounded-lg p-4 mb-8">
            <p className="text-red-200 font-semibold text-sm md:text-base">
              Error cargando catálogo
            </p>
            <p className="text-red-300 text-xs md:text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Contenido principal */}
        {data && data.products.length > 0 ? (
          <>
            {/* Desktop: Tabs */}
            <div className="hidden md:block">
              <CategoryTabs
                products={data.products}
                categories={data.categories}
                loading={loading}
                onProductSelect={handleProductSelect}
              />
            </div>

            {/* Mobile: Select */}
            <div className="md:hidden">
              <CategorySelect
                products={data.products}
                categories={data.categories}
                loading={loading}
                onProductSelect={handleProductSelect}
              />
            </div>
          </>
        ) : (
          !loading && (
            <div className="text-center py-20">
              <p className="text-lg md:text-xl text-gray-400">
                No hay productos disponibles en este momento
              </p>
            </div>
          )
        )}
      </div>

      {/* Modal de detalles del producto */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
