"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
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
  if (!product) return null;

  const images =
    product.images.length > 0 ? product.images : [product.thumbnail];

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
          {/* Galería de imágenes - Fixed responsive carousel */}
          <div className="order-1 lg:order-none flex flex-col gap-4">
            <div className="w-full aspect-video lg:aspect-square max-h-[400px] overflow-hidden rounded-lg bg-gray-800">
              <Carousel
                opts={{ align: "start", loop: true }}
                className="w-full h-full"
              >
                <CarouselContent className="-ml-4 lg:-ml-0">
                  {images.map((imageUrl, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-4 lg:pl-0 md:basis-1/2 lg:basis-1/1"
                    >
                      <div className="relative h-full p-1">
                        <Image
                          src={imageUrl}
                          alt={`${product.name} - Imagen ${index + 1}`}
                          fill
                          className="object-cover rounded-lg"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={index === 0}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {images.length > 1 && (
                  <>
                    <CarouselPrevious className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 hover:bg-gray-700 absolute -left-2 top-1/2 -translate-y-1/2 z-20" />
                    <CarouselNext className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 hover:bg-gray-700 absolute -right-2 top-1/2 -translate-y-1/2 z-20" />
                  </>
                )}
              </Carousel>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-1">
                {images.map((imageUrl, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 cursor-pointer hover:scale-105 transition-all bg-gray-800 p-1"
                    style={{
                      borderColor: idx === 0 ? "#dc2626" : "#4b5563",
                    }}
                    onClick={() => {
                      /* Carousel handles navigation */
                    }}
                  >
                    <Image
                      src={imageUrl}
                      alt={`${product.name} thumb ${idx + 1}`}
                      fill
                      className="object-cover rounded"
                      sizes="64px"
                    />
                  </div>
                ))}
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
