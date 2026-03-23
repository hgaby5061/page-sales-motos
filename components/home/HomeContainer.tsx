"use client";

import { useState, useRef, useEffect } from "react";
import { useScroll, useTransform, useInView } from "framer-motion";
import {
  HeroParticles,
  SpeedLines,
  HeroMotorcycle,
  HeroHeader,
} from "@/components/home/HeroSection";
import { HomeProductsSection } from "@/components/home/HomeProductsSection";
import { useCatalogData } from "@/hooks/useCatalogData";
import { ProductDetailModal } from "@/components/catalog/ProductDetailModal";
import type { ProcessedProduct } from "@/types/strapi";
import { Footer } from "@/app/footer";

/**
 * Container principal del home
 * Orquesta todas las secciones: Hero, Productos
 */
export function HomeContainer() {
  const { data, loading } = useCatalogData();
  const [selectedProduct, setSelectedProduct] =
    useState<ProcessedProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Refs para scroll
  const catalogRef = useRef<HTMLDivElement>(null);

  // Estado para animación del hero
  const [showMotorcycle, setShowMotorcycle] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowMotorcycle(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll animations
  const { scrollY } = useScroll();
  const motorcycleY = useTransform(scrollY, [0, 500], [0, 150]);
  const motorcycleRotate = useTransform(scrollY, [0, 500], [0, 5]);

  // In-view animations
  const isCatalogInView = useInView(catalogRef as any, {
    once: true,
    amount: 0.1,
  });

  const handleExplore = () => {
    catalogRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleProductSelect = (product: ProcessedProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
        <HeroParticles quantity={30} />
        <SpeedLines />

        {/* Efecto de luz radial */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/20 blur-3xl" />

        <div className="container relative z-10 flex h-full flex-col items-start justify-center px-4 text-white">
          <div className="flex w-full flex-col items-start lg:flex-row lg:items-center lg:justify-between">
            <HeroHeader onExplore={handleExplore} />
            <HeroMotorcycle
              isVisible={showMotorcycle}
              motorcycleY={motorcycleY}
              motorcycleRotate={motorcycleRotate}
            />
          </div>
        </div>

        {/* Estilos de animaciones */}
        <style jsx global>{`
          @keyframes floatParticle {
            0% {
              transform: translateY(0) translateX(0);
            }
            25% {
              transform: translateY(-20px) translateX(10px);
            }
            50% {
              transform: translateY(0) translateX(20px);
            }
            75% {
              transform: translateY(20px) translateX(10px);
            }
            100% {
              transform: translateY(0) translateX(0);
            }
          }
          @keyframes moveLines {
            0% {
              transform: translateX(100%) rotate(-5deg);
            }
            100% {
              transform: translateX(-100%) rotate(-5deg);
            }
          }
        `}</style>
      </section>

      {/* Productos Section */}
      <div ref={catalogRef}>
        {data && !loading ? (
          <HomeProductsSection
            products={data.products}
            categories={data.categories}
            onProductSelect={handleProductSelect}
            isInView={isCatalogInView}
          />
        ) : (
          <div className="py-20 text-center text-gray-500">
            Cargando productos...
          </div>
        )}
      </div>

      {/* Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      <Footer />
    </>
  );
}
