'use client';

import React from 'react';
import Link from 'next/link';
import styles from './CategoryGrid.module.css';

const categories = [
  { name: 'Whey Protein', emoji: '🥛', slug: 'Whey Protein' },
  { name: 'Pre-Workout', emoji: '⚡', slug: 'Pre-Workout' },
  { name: 'BCAA', emoji: '💪', slug: 'BCAA' },
  { name: 'Fat Burner', emoji: '🔥', slug: 'Fat Burner' },
  { name: 'Multivitamins', emoji: '💊', slug: 'Multivitamins' },
  { name: 'Creatine', emoji: '🧪', slug: 'Creatine' },
  { name: 'Weight Gainer', emoji: '📦', slug: 'Weight Gainer' },
  { name: 'Shaker Bottle', emoji: '🧴', slug: 'Shaker Bottle' },
];

export default function CategoryGrid() {
  return (
    <section className={styles.section}>
      <div className={`${styles.inner} container`}>
        <div className={styles.header}>
          <h2>Shop By <span>Category</span></h2>
          <p>Browse our complete range of premium supplements</p>
        </div>
        <div className={styles.grid}>
          {categories.map(cat => (
            <Link
              key={cat.slug}
              href={`/shop?category=${encodeURIComponent(cat.slug)}`}
              className={styles.card}
            >
              <span className={styles.emoji}>{cat.emoji}</span>
              <span className={styles.label}>{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
