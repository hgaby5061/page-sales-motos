import { Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { CatalogContainer } from "@/components/catalog/CatalogContainer";
import { fetchProducts, fetchCategories } from "@/services/strapiService";
import {
  formatProducts,
  formatCategories,
  extractProductsData,
  extractCategoriesData,
} from "@/lib/strapiFormatters";
import type { ProcessedProduct, ProcessedCategory } from "@/types/strapi";

interface CatalogPageProps {
  products: ProcessedProduct[];
  categories: ProcessedCategory[];
  error?: string;
}

async function getCatalogData(): Promise<CatalogPageProps> {
  try {
    const [productsResponse, categoriesResponse] = await Promise.all([
      fetchProducts(),
      fetchCategories(),
    ]);

    return {
      products: formatProducts(extractProductsData(productsResponse)),
      categories: formatCategories(extractCategoriesData(categoriesResponse)),
    };
  } catch (error) {
    console.error("Error fetching catalog data:", error);
    throw error;
  }
}
export const revalidate = 3600;

/**
 * Página de catálogo - Server Component con SSR + ISR
 */
export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: {
    category?: string;
  };
}) {
  const data = await getCatalogData();
  const activeCategory = (searchParams.category || "") as string;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Suspense
        fallback={
          <div className="container mx-auto px-4 py-12">
            Cargando catálogo...
          </div>
        }
      >
        <CatalogContainer {...data} activeCategory={activeCategory} />
      </Suspense>
    </main>
  );
}
