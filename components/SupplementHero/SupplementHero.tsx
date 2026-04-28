'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Zap } from 'lucide-react';
import styles from './SupplementHero.module.css';

export default function SupplementHero() {
  return (
    <section className={styles.hero} id="store-hero">
      <div className={`${styles.inner} container`}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <Zap size={14} fill="#00C853" />
            Pakistan&apos;s #1 Supplements Store
          </div>
          <h1 className={styles.heading}>
            <span className={styles.black}>Fuel Your</span>
            <br />
            <span className={styles.green}>Performance</span>
          </h1>
          <p className={styles.sub}>
            Premium imported supplements — 100% authentic, delivered anywhere in Pakistan. 
            Whey, Creatine, Pre-Workout, BCAA & more.
          </p>
          <div className={styles.actions}>
            <Link href="/shop" className={styles.shopBtn}>
              <ShoppingBag size={18} />
              Shop Now
            </Link>
            <Link href="/contact" className={styles.contactBtn}>
              WhatsApp Us
            </Link>
          </div>
          <div className={styles.trustCard}>
            <div className={styles.trustNum}>5,000+</div>
            <div className={styles.trustLabel}>Orders Delivered 🚚</div>
          </div>
        </div>

        <div className={styles.imageWrap}>
          <div className={styles.glow} />
          <img
            src="https://m.media-amazon.com/images/I/71qq7DCcBmL._SL1500_.jpg"
            alt="PowerZone Supplements"
            className={styles.heroImg}
          />
          <div className={styles.floatChip1}>✅ 100% Authentic</div>
          <div className={styles.floatChip2}>⚡ Fast Delivery</div>
        </div>
      </div>
    </section>
  );
}
