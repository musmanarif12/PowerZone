'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Product } from '@/lib/products';
import { useCart } from '@/lib/cartContext';
import styles from './ProductCard.module.css';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const router = useRouter();

  const formatPrice = (p: number) => `Rs ${p.toLocaleString('en-PK')}`;

  return (
    <div className={styles.card}>
      {product.badge && (
        <span className={`${styles.badge} ${styles[product.badge.toLowerCase()]}`}>
          {product.badge}
        </span>
      )}
      {!product.inStock && (
        <span className={styles.outOfStock}>OUT OF STOCK</span>
      )}
      <Link href={`/product/${product.id}`} className={styles.imageWrap} prefetch={true}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.image}
          loading="eager"
          fetchPriority="high"
        />
      </Link>
      <div className={styles.info}>
        <span className={styles.brand}>{product.brand}</span>
        <Link href={`/product/${product.id}`} className={styles.name}>{product.name}</Link>
        <div className={styles.rating}>
          {[1, 2, 3, 4, 5].map(i => (
            <Star key={i} size={12} fill={i <= Math.round(product.rating) ? '#f59e0b' : 'none'} stroke={i <= Math.round(product.rating) ? '#f59e0b' : '#ccc'} />
          ))}
          <span className={styles.ratingCount}>({product.reviews})</span>
        </div>
        <div className={styles.prices}>
          <span className={styles.original}>{formatPrice(product.originalPrice)}</span>
          <span className={styles.salePrice}>{formatPrice(product.price)}</span>
        </div>
        <button
          className={styles.addBtn}
          onClick={(e) => { e.preventDefault(); router.push(`/product/${product.id}`); }}
          disabled={!product.inStock}
        >
          {product.inStock ? 'Buy Now!' : 'Sold Out'}
        </button>
      </div>
    </div>
  );
}
