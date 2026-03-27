// Strapi data formatters for client-side use
// Move formatting logic here to avoid server action serialization issues

import type {
  StrapiProductsResponse,
  StrapiCategoriesResponse,
  ProcessedProduct,
  ProcessedCategory,
  StrapiProduct,
  StrapiCategory,
} from "@/types/strapi";

/**
 * Procesa productos de Strapi a formato utilizable en componentes
 */
export function formatProducts(products: StrapiProduct[]): ProcessedProduct[] {
  return products.map((product) => {
    const thumbnailUrl =
      product.images && product.images.length > 0
        ? product.images[0].url
        : "/placeholder.jpg";

    const allImages = product.images
      ? product.images.map((img) => img.url)
      : [];

    return {
      id: product.id,
      documentId: product.documentId,
      name: product.name,
      categoryName: product.category?.name || "Sin categoría",
      price: product.price,
      description: product.description,
      thumbnail: thumbnailUrl,
      images: allImages,
    };
  });
}

/**
 * Procesa categorías de Strapi a formato utilizable
 */
export function formatCategories(
  categories: StrapiCategory[]
): ProcessedCategory[] {
  return categories.map((category) => ({
    id: category.id,
    documentId: category.documentId,
    name: category.name,
    uid: category.uid,
  }));
}

/**
 * Agrupa productos por categoría
 */
export function groupProductsByCategory(
  products: ProcessedProduct[]
): Record<string, ProcessedProduct[]> {
  return products.reduce((acc, product) => {
    const categoryName = product.categoryName;
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(product);
    return acc;
  }, {} as Record<string, ProcessedProduct[]>);
}

// Helper to extract data from response
export function extractProductsData(
  response: StrapiProductsResponse
): StrapiProduct[] {
  return response.data;
}

export function extractCategoriesData(
  response: StrapiCategoriesResponse
): StrapiCategory[] {
  return response.data;
}
