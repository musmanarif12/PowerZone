import React from 'react';
import styles from './BrandsGrid.module.css';

const brands = [
  { name: 'Optimum Nutrition', abbr: 'ON' },
  { name: 'Dymatize', abbr: 'DYM' },
  { name: 'MuscleTech', abbr: 'MT' },
  { name: 'BSN', abbr: 'BSN' },
  { name: 'USN', abbr: 'USN' },
  { name: 'MyProtein', abbr: 'MP' },
  { name: 'Ultimate Nutrition', abbr: 'UN' },
  { name: 'Isopure', abbr: 'ISO' },
  { name: 'Cellucor', abbr: 'C4' },
  { name: 'BPI Sports', abbr: 'BPI' },
];

export default function BrandsGrid() {
  return (
    <section className={styles.section}>
      <div className={`${styles.inner} container`}>
        <div className={styles.header}>
          <h2>Shop by <span>Brands</span></h2>
          <p>Only authentic, imported supplements from trusted brands</p>
        </div>
        <div className={styles.grid}>
          {brands.map(b => (
            <a key={b.name} href={`/shop?brand=${encodeURIComponent(b.name)}`} className={styles.card}>
              <div className={styles.logo}>{b.abbr}</div>
              <span className={styles.name}>{b.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
