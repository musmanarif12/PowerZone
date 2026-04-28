'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { services } from '@/lib/data';
import styles from './Services.module.css';

const Services = () => {
  return (
    <section className={styles.services} id="services">
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <h4>Our Services</h4>
          <h2>Push Your Limits With These Services</h2>
          <div className={styles.accentLine}></div>
        </div>
        
        <div className={styles.grid}>
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                <Image 
                  src={service.image} 
                  alt={service.title} 
                  width={400} 
                  height={250} 
                  className={styles.cardImage}
                />
                <div className={styles.overlay}></div>
              </div>
              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.desc}</p>
                <Link href={`/services/${service.slug}`} className={styles.readMore}>
                  Read More →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
