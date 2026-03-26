"use client";

import Image from "next/image";
import type { ProcessedProduct } from "@/types/strapi";

interface ProductCardProps {
  product: ProcessedProduct;
  onClick?: () => void;
}

/**
 * Componente que muestra una tarjeta de producto
 * Responsable únicamente de la presentación visual
 */
export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div onClick={onClick} className="group cursor-pointer relative z-0">
      <div className="relative z-0 overflow-hidden rounded-2xl bg-gray-800 dark:bg-gray-900 shadow-md hover:shadow-xl transition-all duration-300 h-full border border-gray-700 flex flex-col">
        {/* Imagen del producto */}
        <div className="relative h-56 sm:h-64 md:aspect-square md:h-auto overflow-hidden bg-gray-700 dark:bg-gray-800 flex-shrink-0">
          <Image
            src={product.thumbnail}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority={false}
          />
          {/* Overlay + categoría encima de la imagen */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute top-3 left-3">
            <span className="inline-block bg-red-600/95 dark:bg-red-700/95 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg backdrop-blur-sm">
              {product.categoryName}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent md:hidden" />
        </div>

        {/* Información del producto */}
        <div className="p-3 md:p-4 flex flex-1 flex-col min-h-[120px]">
          <h3 className="font-bold text-base md:text-lg mb-3 line-clamp-2 group-hover:text-red-400 transition-colors text-white">
            {product.name}
          </h3>
          <span className="text-xl md:text-2xl font-bold text-red-600 dark:text-red-400 break-words">
            ${product.price.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
