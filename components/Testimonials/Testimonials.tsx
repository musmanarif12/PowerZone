'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    name: 'Ahmed Khan',
    role: 'Member since 2023',
    stars: 5,
    text: 'PowerZone has completely changed my fitness journey. The equipment is top-notch and the atmosphere is incredibly motivating.'
  },
  {
    name: 'Sara Malik',
    role: 'Member since 2024',
    stars: 5,
    text: 'The best gym in Pakistan! The group classes are energetic and the trainers really know their stuff. Highly recommend!'
  },
  {
    name: 'Zaryab Ali',
    role: 'Member since 2022',
    stars: 5,
    text: 'Premium experience from start to finish. The facilities are always clean and the personal training is world-class.'
  }
];

const Testimonials = () => {
  return (
    <section className={styles.testimonials} id="testimonials">
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <h4>Testimonials</h4>
          <h2>What Our Members Say</h2>
          <div className={styles.accentLine}></div>
        </div>
        
        <div className={styles.grid}>
          {testimonials.map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={styles.card}
            >
              <Quote className={styles.quoteIcon} />
              <div className={styles.stars}>
                {[...Array(item.stars)].map((_, i) => (
                  <Star key={i} fill="var(--whatsapp-green)" color="var(--whatsapp-green)" size={16} />
                ))}
              </div>
              <p className={styles.text}>{item.text}</p>
              <div className={styles.footer}>
                <div className={styles.avatar}>{item.name.charAt(0)}</div>
                <div>
                  <h5 className={styles.name}>{item.name}</h5>
                  <p className={styles.role}>{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
