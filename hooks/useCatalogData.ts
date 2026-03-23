// Hook personalizado para cargar datos del catálogo con caché en sessionStorage
"use client";

import { useState, useEffect } from "react";
import type {
  ProcessedProduct,
  ProcessedCategory,
  StrapiProduct,
  StrapiCategory,
} from "@/types/strapi";

interface CacheData {
  products: ProcessedProduct[];
  categories: ProcessedCategory[];
  timestamp: number;
}

interface CatalogData {
  products: ProcessedProduct[];
  categories: ProcessedCategory[];
}

const CACHE_KEY = "strapi-catalog-cache";
const CACHE_TTL = 60 * 60 * 1000; // 1 hora en milisegundos

// La URL debe estar definida en tiempo de compilación del cliente
const STRAPI_URL = "http://localhost:1337";

/**
 * Hook que maneja la carga de productos y categorías desde Strapi
 * Implementa caché con sessionStorage y manejo de errores
 */
export function useCatalogData() {
  const [data, setData] = useState<CatalogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Intenta obtener datos del caché
        const cachedData = sessionStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const cache: CacheData = JSON.parse(cachedData);
          const isExpired = Date.now() - cache.timestamp > CACHE_TTL;

          if (!isExpired) {
            if (isMounted) {
              setData({
                products: cache.products,
                categories: cache.categories,
              });
              setLoading(false);
            }
            return;
          }
        }

        // Obtiene datos frescos de Strapi
        const [productsRes, categoriesRes] = await Promise.all([
          fetch(
            `${STRAPI_URL}/api/products?populate=*&filters[publishedAt][$notNull]=true&sort=name:asc`
          ),
          fetch(
            `${STRAPI_URL}/api/categories?populate=*&filters[publishedAt][$notNull]=true&sort=name:asc`
          ),
        ]);

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error("Failed to fetch from Strapi");
        }

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        const products = productsData.data || [];
        const categories = categoriesData.data || [];

        // Formatea productos
        const formattedProducts: ProcessedProduct[] = products.map(
          (product: StrapiProduct) => {
            const thumbnailUrl =
              product.images && product.images.length > 0
                ? `${STRAPI_URL}${product.images[0].url}`
                : "";

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
          }
        );

        // Formatea categorías
        const formattedCategories: ProcessedCategory[] = categories.map(
          (category: StrapiCategory) => ({
            id: category.id,
            documentId: category.documentId,
            name: category.name,
            uid: category.uid,
          })
        );

        // Guarda en caché
        const newCache: CacheData = {
          products: formattedProducts,
          categories: formattedCategories,
          timestamp: Date.now(),
        };
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(newCache));

        if (isMounted) {
          setData({
            products: formattedProducts,
            categories: formattedCategories,
          });
        }
      } catch (err) {
        console.error("Error loading catalog data:", err);
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Error cargando catálogo"
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    data,
    loading,
    error,
  };
}
