'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './Gallery.module.css';

interface GalleryProps {
  // Add props if needed
}

const Gallery: React.FC<GalleryProps> = () => {
  const images = [
    { src: '/assets/img2.jpg', alt: 'Elite Gym Interior', span: 'wide' },
    { src: '/assets/img3.jpg', alt: 'Premium Equipment', span: 'tall' },
    { src: '/assets/img4.jpg', alt: 'Performance Training', span: 'normal' },
    { src: '/assets/img5.jpg', alt: 'Expert Coaching', span: 'normal' }
  ];

  return (
    <section className={styles.gallery} id="gallery">
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <motion.h4 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.subtitle}
          >
            Visual Tour
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={styles.title}
          >
            Experience the Excellence
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className={styles.accentLine}
          ></motion.div>
        </div>

        <div className={styles.grid}>
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${styles.item} ${styles[img.span]}`}
            >
              <Image 
                src={img.src} 
                alt={img.alt} 
                fill 
                className={styles.image}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className={styles.overlay}>
                <span className={styles.tag}>{img.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
