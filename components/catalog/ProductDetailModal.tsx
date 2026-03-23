"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ProcessedProduct } from "@/types/strapi";

interface ProductDetailModalProps {
  product: ProcessedProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal que muestra detalles completos del producto con galería de imágenes
 */
export function ProductDetailModal({
  product,
  isOpen,
  onClose,
}: ProductDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null;

  const images =
    product.images.length > 0 ? product.images : [product.thumbnail];
  const currentImage = images[currentImageIndex];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-[95vw] max-h-[95vh] p-0 overflow-hidden bg-gray-900 text-white border-gray-800">
        <DialogHeader className="px-6 pt-6 pb-0 sticky top-0 bg-gray-900 z-10">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl md:text-3xl font-bold text-white">
                {product.name}
              </DialogTitle>
              <p className="text-sm text-gray-400 mt-1">
                {product.categoryName}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="px-4 md:px-6 py-4 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-y-auto max-h-[calc(95vh-120px)]">
          {/* Galería de imágenes */}
          <div className="flex flex-col gap-4 order-1 lg:order-none">
            {/* Imagen principal */}
            <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-800">
              <Image
                src={currentImage}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />

              {/* Indicador de imagen actual */}
              {images.length > 1 && (
                <div className="absolute top-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                  {currentImageIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Controles de galería - Desktop y móvil */}
            {images.length > 1 && (
              <div className="flex items-center justify-center gap-2 md:gap-4">
                <button
                  onClick={handlePrevImage}
                  className="p-2 md:p-3 hover:bg-gray-800 rounded-full transition-colors text-gray-300 hover:text-white"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                </button>

                {/* Thumbnails - scroll horizontal en mobile */}
                <div className="flex gap-2 overflow-x-auto px-2 py-2 flex-1 max-w-xs md:max-w-none">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`flex-shrink-0 h-12 w-12 md:h-16 md:w-16 rounded overflow-hidden border-2 transition-all ${
                        idx === currentImageIndex
                          ? "border-red-600 ring-2 ring-red-500"
                          : "border-gray-600 hover:border-gray-400"
                      }`}
                      title={`Ver imagen ${idx + 1}`}
                    >
                      <Image
                        src={images[idx]}
                        alt={`${product.name} vista ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleNextImage}
                  className="p-2 md:p-3 hover:bg-gray-800 rounded-full transition-colors text-gray-300 hover:text-white"
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div className="flex flex-col justify-between order-2 lg:order-none">
            <div className="space-y-6">
              {/* Categoría y precio */}
              <div>
                <div className="mb-3">
                  <span className="inline-block bg-red-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                    {product.categoryName}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-2">
                  ${product.price.toLocaleString()}
                </h2>
                <p className="text-gray-400 text-sm">Precio en USD</p>
              </div>

              {/* Descripción */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-200">
                  Descripción
                </h3>
                <p className="text-gray-300 whitespace-pre-wrap text-sm md:text-base leading-relaxed">
                  {product.description}
                </p>
              </div>
              
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col gap-3 mt-8">
              <a
                href={`https://wa.me/573001234567?text=Hola,%20estoy%20interesado%20en%20${encodeURIComponent(
                  product.name
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 md:py-4 rounded-lg transition-colors text-center flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <span>💬</span> Contactar por WhatsApp
              </a>
              <button
                onClick={onClose}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 md:py-4 rounded-lg transition-colors text-sm md:text-base"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
