'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Star, MessageCircle } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { useAdmin } from '@/lib/adminContext';
import styles from '@/app/product/[id]/ProductDetail.module.css';
import { Product } from '@/lib/products';

interface Props {
  product: Product;
}

export default function ProductDetailClient({ product: initialProduct }: Props) {
  const { buyNow } = useCart();
  const { products } = useAdmin();
  const router = useRouter();

  // Always prefer the live product from AdminContext (Firestore real-time sync)
  const product = products.find(p => p.id === initialProduct.id) || initialProduct;

  const savings = product.originalPrice - product.price;
  const pct = Math.round((savings / product.originalPrice) * 100);

  const waMsg = encodeURIComponent(`Hi! I want to order: ${product.name} (${product.brand}) - Rs ${product.price.toLocaleString()}`);

  return (
    <div className={styles.page}>
      <div className={`${styles.inner} container`}>
        <button className={styles.back} onClick={() => router.back()}>
          <ArrowLeft size={16} /> Back
        </button>

        <div className={styles.grid}>
          <div className={styles.imageWrap}>
            {product.badge && (
              <span className={`${styles.badge} ${styles[product.badge.toLowerCase()]}`}>{product.badge}</span>
            )}
            <img src={product.image} alt={product.name} className={styles.image} />
          </div>

          <div className={styles.info}>
            <span className={styles.brand}>{product.brand}</span>
            <h1 className={styles.name}>{product.name}</h1>
            <div className={styles.rating}>
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={16} fill={i <= Math.round(product.rating) ? '#f59e0b' : 'none'} stroke={i <= Math.round(product.rating) ? '#f59e0b' : '#ccc'} />
              ))}
              <span className={styles.ratingVal}>{product.rating}</span>
              <span className={styles.ratingCount}>({product.reviews} reviews)</span>
            </div>

            <div className={styles.pricingBlock}>
              <div className={styles.priceRow}>
                <span className={styles.price}>Rs {product.price.toLocaleString()}</span>
                <span className={styles.original}>Rs {product.originalPrice.toLocaleString()}</span>
                {pct > 0 && <span className={styles.discount}>{pct}% OFF</span>}
              </div>
              {savings > 0 && <p className={styles.saving}>You save Rs {savings.toLocaleString()}!</p>}
            </div>

            <div className={styles.desc}>
              <h3>Product Description</h3>
              <p>{product.description}</p>
            </div>

            <div className={styles.details}>
              <div><strong>Category:</strong> {product.category}</div>
              <div><strong>Brand:</strong> {product.brand}</div>
              <div>
                <strong>Availability:</strong>{' '}
                <span style={{ color: product.inStock ? 'var(--primary-green)' : '#e53935', fontWeight: 700 }}>
                  {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                </span>
              </div>
            </div>

            <div className={styles.actions}>
              <button
                className={styles.cartBtn}
                onClick={() => { buyNow(product); router.push('/checkout'); }}
                disabled={!product.inStock}
              >
                Buy Now!
              </button>
              <a
                href={`https://wa.me/923094045794?text=${waMsg}`}
                className={styles.waBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} />
                Buy via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
