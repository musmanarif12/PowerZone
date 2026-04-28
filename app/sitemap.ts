import { MetadataRoute } from 'next';
import { defaultProducts } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://powerzone.pk';

  // Static routes
  const staticRoutes = [
    '',
    '/shop',
    '/membership',
    '/services',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Product routes
  const productRoutes = defaultProducts.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes];
}
