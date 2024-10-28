import { CategoryResponse, ProductResponse } from '@framework/types';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const productUrls = await getProductsSlugs();
  const categoryUrls = await getCategoriesSlug();
  const urls = [...productUrls, ...categoryUrls];
 const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL
  // Static URL example
  const staticUrls = [
    {
      url: `${baseUrl}/zh/products`,
      lastModified: '2024-11-01',
      changeFrequency: 'weekly' as 'weekly', // Type assertion
      priority: 0.5,
    },
    {
      url: `${baseUrl}/zh`,
      lastModified: '2024-11-01',
      changeFrequency: 'weekly' as 'weekly', // Type assertion
      priority: 0.5,
    },
  ];

  return [...staticUrls, ...urls];
}

async function getProductsSlugs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}${API_ENDPOINTS.PRODUCTS}?fields=slug,updatedAt`);
  const productResponse = await res.json() as ProductResponse;
  const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL
  return productResponse.data.products.map((product) => ({
    url: `${baseUrl}/en/products/${product.slug}`,
    lastModified: new Date(product.updatedAt).toISOString(), // Convert to ISO string
    changeFrequency: 'weekly' as 'weekly', // Type assertion
    priority: 0.7,
  }));
}

async function getCategoriesSlug() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}${API_ENDPOINTS.CATEGORIES}?fields=slug,updatedAt`);
  const categoryResponse = await res.json() as CategoryResponse;
  const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL
  return categoryResponse.data.categories.map((category) => ({
    url: `${baseUrl}/en/categories/${category.slug}`,
    lastModified: new Date(category.updatedAt).toISOString(), // Convert to ISO string
    changeFrequency: 'weekly' as 'weekly', // Type assertion
    priority: 0.6,
  }));
}
