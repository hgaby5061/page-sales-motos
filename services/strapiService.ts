// Servicio para comunicación con API de Strapi
// Este módulo maneja todas las llamadas a la API

import type {
  StrapiProductsResponse,
  StrapiCategoriesResponse,
  ProcessedProduct,
  ProcessedCategory,
  StrapiProduct,
  StrapiCategory,
} from "@/types/strapi";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

if (!STRAPI_URL) {
  throw new Error("NEXT_PUBLIC_STRAPI_URL no configurada en .env.local");
}

const apiHeaders = {
  "Content-Type": "application/json",
};

/**
 * Obtiene todos los productos publicados de Strapi
 */
export async function fetchProducts(): Promise<StrapiProductsResponse> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/products?populate=*&filters[publishedAt][$notNull]=true&sort=name:asc`,
      {
        method: "GET",
        headers: apiHeaders,
        next: { revalidate: 10/* 3600 */ }, // ISR: revalidar cada hora
      }
    );

    if (!response.ok) {
      throw new Error(
        `Error Strapi: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching products from Strapi:", error);
    throw error;
  }
}

/**
 * Obtiene todas las categorías publicadas de Strapi
 */
export async function fetchCategories(): Promise<StrapiCategoriesResponse> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/categories?populate=*&filters[publishedAt][$notNull]=true&sort=name:asc`,
      {
        method: "GET",
        headers: apiHeaders,
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Error Strapi: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching categories from Strapi:", error);
    throw error;
  }
}

/**
 * Procesa productos de Strapi a formato utilizable en componentes
 */
export function formatProducts(products: StrapiProduct[]): ProcessedProduct[] {
  return products.map((product) => {
    const thumbnailUrl =
      product.images && product.images.length > 0
        ? `${STRAPI_URL}${product.images[0].url}`
        : "/placeholder.jpg";

    const allImages = product.images
      ? product.images.map((img) => `${STRAPI_URL}${img.url}`)
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
