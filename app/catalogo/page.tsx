"use client";

import { Navbar } from "@/components/navbar";
import { CatalogContainer } from "@/components/catalog/CatalogContainer";

/**
 * Página de catálogo
 * Solo contiene navbar y container, delegando toda la lógica al container
 */
export default function CatalogoPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <CatalogContainer />
    </main>
  );
}
