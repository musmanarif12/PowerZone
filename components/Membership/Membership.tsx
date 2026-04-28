'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { plans as categories } from '@/lib/data';
import styles from './Membership.module.css';

const Membership = () => {
  return (
    <section className={styles.membership}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <h4>Membership Categories</h4>
          <h2>Plans for Everyone</h2>
          <div className={styles.accentLine}></div>
        </div>
        
        <div className={styles.grid}>
          {categories.map((cat, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={styles.card}
            >
              <div className={styles.cardHeader}>
                <span className={styles.icon}>{cat.icon}</span>
                <h3>{cat.name}</h3>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.priceText}>Starting from</p>
                <h4 className={styles.price}>{cat.price} PKR</h4>
                <ul className={styles.featureList}>
                  <li>✓ Free consultation</li>
                  <li>✓ Expert guidance</li>
                  <li>✓ Locker facility</li>
                </ul>
                <Link 
                  href="https://wa.me/923044603006" 
                  className={styles.joinBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Membership;
