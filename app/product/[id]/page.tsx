import React from "react";
import { Metadata } from "next";
import { defaultProducts, Product } from "@/lib/products";
import ProductDetailClient from "@/components/ProductDetail/ProductDetailClient";
import { notFound } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

interface Props {
  params: { id: string };
}

export const revalidate = 60; // Revalidate every 60 seconds
export const dynamicParams = true; // Allow on-demand rendering for new products

export async function generateStaticParams() {
  const staticParams = defaultProducts.map((p) => ({
    id: p.id,
  }));

  try {
    const productsColl = collection(db, "products");
    const snapshot = await getDocs(productsColl);
    const dbParams = snapshot.docs.map((doc) => ({
      id: doc.id,
    }));

    // Merge and remove duplicates
    const allIds = new Set([
      ...staticParams.map((p) => p.id),
      ...dbParams.map((p) => p.id),
    ]);
    return Array.from(allIds).map((id) => ({ id }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return staticParams;
  }
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const docRef = doc(db, "products", id);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as Product;
    }
  } catch (e) {
    console.error("Error fetching product from Firestore:", e);
  }
  // Fallback to static data
  return defaultProducts.find((p) => p.id === id) || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Product Not Found | PowerZone",
    };
  }
  // ... rest of metadata ...

  return {
    title: `${product.name} | PowerZone Pakistan`,
    description: `Buy ${product.name} by ${product.brand} only at PowerZone. ${product.description.substring(0, 150)}...`,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "PKR",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `https://powerzone.pk/product/${product.id}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
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
