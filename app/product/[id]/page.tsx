import React from 'react';
import { Metadata } from 'next';
import { defaultProducts } from '@/lib/products';
import ProductDetailClient from '@/components/ProductDetail/ProductDetailClient';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = defaultProducts.find((p) => p.id === id);

  if (!product) {
    return {
      title: 'Product Not Found | PowerZone',
    };
  }

  return {
    title: `${product.name} | PowerZone Pakistan`,
    description: `Buy ${product.name} by ${product.brand} only at PowerZone. ${product.description.substring(0, 150)}...`,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = defaultProducts.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'PKR',
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `https://powerzone.pk/product/${product.id}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} />
    </>
  );
}
