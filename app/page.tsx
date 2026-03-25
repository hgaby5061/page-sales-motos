import { Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { HomeContainer } from "@/components/home/HomeContainer";
import {
  fetchProducts,
  fetchCategories,
  formatProducts,
  formatCategories,
} from "@/services/strapiService";
import type { ProcessedProduct, ProcessedCategory } from "@/types/strapi";

interface HomePageProps {
  products: ProcessedProduct[];
  categories: ProcessedCategory[];
}

async function getHomeData(): Promise<HomePageProps> {
  try {
    const [{ data: productsData }, { data: categoriesData }] =
      await Promise.all([fetchProducts(), fetchCategories()]);

    return {
      products: formatProducts(productsData),
      categories: formatCategories(categoriesData),
    };
  } catch (error) {
    console.error("Error fetching home data:", error);
    return {
      products: [],
      categories: [],
    };
  }
}

/**
 * Página principal - Server Component con SSR
 */
export default async function Home() {
  const data = await getHomeData();

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <ScrollIndicator />
      <Navbar />
      <Suspense
        fallback={
          <div className="py-20 text-center text-gray-500">
            Cargando home...
          </div>
        }
      >
        <HomeContainer products={data.products} categories={data.categories} />
      </Suspense>
    </main>
  );
}
