import { Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { CatalogContainer } from "@/components/catalog/CatalogContainer";
import {
  fetchProducts,
  fetchCategories,
  formatProducts,
  formatCategories,
} from "@/services/strapiService";
import type { ProcessedProduct, ProcessedCategory } from "@/types/strapi";

interface CatalogPageProps {
  products: ProcessedProduct[];
  categories: ProcessedCategory[];
  error?: string;
}

async function getCatalogData(): Promise<CatalogPageProps> {
  try {
    const [{ data: productsData }, { data: categoriesData }] =
      await Promise.all([fetchProducts(), fetchCategories()]);

    return {
      products: formatProducts(productsData),
      categories: formatCategories(categoriesData),
    };
  } catch (error) {
    console.error("Error fetching catalog data:", error);
    return {
      products: [],
      categories: [],
      error: "Error cargando catálogo desde Strapi",
    };
  }
}

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
