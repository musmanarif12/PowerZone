'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Product } from '@/lib/products';
import styles from './ProductSection.module.css';

interface Props {
  title: string;
  category: string;
  products: Product[];
}

export default function ProductSection({ title, category, products }: Props) {
  const filtered = products.filter(p => p.category === category && p.isOnWebsite);

  if (filtered.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={`${styles.inner} container`}>
        <div className={styles.header}>
          <h2>{title}</h2>
          <Link href={`/shop?category=${encodeURIComponent(category)}`} className={styles.viewAll}>
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className={styles.grid}>
          {filtered.slice(0, 6).map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
