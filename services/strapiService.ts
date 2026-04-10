// Servicio para comunicación con API de Strapi
// Este módulo maneja todas las llamadas a la API

"use server";

import type {
  StrapiProductsResponse,
  StrapiCategoriesResponse,
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
      `${STRAPI_URL}/api/products?populate=*&filters[publishedAt][$notNull]=true&sort=name:asc&pagination[pageSize]=50`,
      {
        method: "GET",
        headers: apiHeaders,
        next: { revalidate: 3600 }, // ISR 24h
        signal: AbortSignal.timeout(15000),
      },
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
        next: { revalidate: 86400 }, // ISR 24h
        signal: AbortSignal.timeout(15000),
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
