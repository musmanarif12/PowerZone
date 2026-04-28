'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.backgroundOverlay}></div>
      <div className={`${styles.container} container`}>
        <div className={styles.content}>
          <motion.h4 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.subtitle}
          >
            Pakistan&apos;s Premium Fitness Destination
          </motion.h4>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles.title}
          >
            Unlock Your Power. <br />
            <span>Train at PowerZone.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={styles.description}
          >
            Built for champions. Experience world-class equipment, 
            expert coaching, and a community that pushes you to be your best self.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className={styles.ctaGroup}
          >
            <Link 
              href="https://wa.me/923094045794" 
              className={styles.primaryBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Started
            </Link>
            <Link href="#plans" className={styles.secondaryBtn}>
              View Plans
            </Link>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={styles.imageContainer}
        >
          <Image 
            src="/assets/img1.jpg" 
            alt="Fitness Athlete" 
            width={700} 
            height={800} 
            priority
            className={styles.heroImage}
          />
          <div className={styles.imageBadge}>
            <span>10+</span>
            <small>Years of Excellence</small>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
