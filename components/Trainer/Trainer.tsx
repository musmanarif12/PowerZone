'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Award, Star, ShieldCheck } from 'lucide-react';
import styles from './Trainer.module.css';

const Trainer = () => {
  return (
    <section className={styles.trainer}>
      <div className={`${styles.container} container`}>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={styles.contentSide}
        >
          <div className={styles.header}>
            <h4>Expert Trainer</h4>
            <h2>Meet Our Head Trainer</h2>
            <div className={styles.accentLine}></div>
          </div>
          
          <div className={styles.bio}>
            <h3 className={styles.trainerName}>Muhammad Bilal</h3>
            <p className={styles.title}>Head Coach & Nutritionist</p>
            
            <p className={styles.description}>
              With over 5 years of experience in transformation and athletic training, 
              Bilal has helped hundreds of members reach their peak performance. 
              Certified by fitness bodies, he brings a dedicated approach 
              to training and daily sessions.
            </p>
            
            <div className={styles.credentials}>
              <div className={styles.credItem}>
                <Award className={styles.icon} />
                <span>Certified Personal Trainer (ACE)</span>
              </div>
              <div className={styles.credItem}>
                <Star className={styles.icon} />
                <span>Sports Nutrition Specialist</span>
              </div>
              <div className={styles.credItem}>
                <ShieldCheck className={styles.icon} />
                <span>Pro Bodybuilding Coach</span>
              </div>
            </div>
            
            <Link 
              href="https://wa.me/923094045794" 
              className={styles.bookBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Session
            </Link>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.imageSide}
        >
          <div className={styles.imageWrapper}>
            <div className={styles.bgDecoration}></div>
            <Image 
              src="/head-trainer.png" 
              alt="M. Bilal - Head Trainer" 
              width={500} 
              height={600} 
              className={styles.trainerImage}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Trainer;
