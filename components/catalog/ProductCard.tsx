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
    <div onClick={onClick} className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg bg-gray-800 dark:bg-gray-900 shadow-md hover:shadow-xl transition-shadow h-full border border-gray-700">
        {/* Imagen del producto */}
        <div className="relative aspect-square overflow-hidden bg-gray-700 dark:bg-gray-800">
          <Image
            src={product.thumbnail}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            priority={false}
          />
        </div>

        {/* Información del producto */}
        <div className="p-3 md:p-4 flex flex-col h-full">
          <div className="mb-2">
            <span className="inline-block bg-red-600 dark:bg-red-700 text-white text-xs font-semibold px-2 md:px-3 py-1 rounded-full">
              {product.categoryName}
            </span>
          </div>

          <h3 className="font-bold text-base md:text-lg mb-3 line-clamp-2 group-hover:text-red-400 transition-colors text-white flex-grow">
            {product.name}
          </h3>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-red-600 dark:text-red-400">
              ${product.price.toLocaleString()}
            </span>
            <button className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white px-3 py-2 rounded text-sm font-semibold transition-colors shadow-md hover:shadow-lg">
              Ver más
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
