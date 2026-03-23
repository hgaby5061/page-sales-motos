// Tipos para respuestas directas de Strapi (v4+ sin nesting en attributes)

export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiCategory {
  id: number;
  documentId: string;
  uid: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiProduct {
  id: number;
  documentId: string;
  name: string;
  description: string;
  price: number;
  images: StrapiImage[];
  category: StrapiCategory;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiProductsResponse {
  data: StrapiProduct[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiCategoriesResponse {
  data: StrapiCategory[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Tipo procesado para uso en componentes
export interface ProcessedProduct {
  id: number;
  documentId: string;
  name: string;
  categoryName: string;
  price: number;
  description: string;
  thumbnail: string;
  images: string[];
}

export interface ProcessedCategory {
  id: number;
  documentId: string;
  name: string;
  uid: string;
}
