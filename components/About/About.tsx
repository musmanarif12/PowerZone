'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './About.module.css';

const About = () => {
  return (
    <section className={styles.about} id="about">
      <div className={`${styles.container} container`}>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={styles.imageSide}
        >
          <div className={styles.imageWrapper}>
            <Image 
              src="/assets/powerzone gym trainer.png" 
              alt="PowerZone gym trainer" 
              width={600} 
              height={450} 
              className={styles.aboutImage}
            />
            <div className={styles.experienceBox}>
              <h3>5+</h3>
              <p>Years of Premium Experience</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.contentSide}
        >
          <div className={styles.header}>
            <h4>Who We Are</h4>
            <div className={styles.accentLine}></div>
          </div>
          <h2>We Are Dedicated To Help You Reach Your Potential</h2>
          <p className={styles.mission}>
            Our mission is to provide an elite training environment where champions are forged. 
            At PowerZone, we combine state-of-the-art equipment with world-class expertise to 
            create a fitness experience like no other in Pakistan.
          </p>
          
          <div className={styles.values}>
            <div className={styles.valueItem}>
              <div className={styles.dot}></div>
              <div>
                <h5>Our Mission</h5>
                <p>To empower individuals to lead healthier, stronger lives through dedicated training.</p>
              </div>
            </div>
            <div className={styles.valueItem}>
              <div className={styles.dot}></div>
              <div>
                <h5>Our Vision</h5>
                <p>To be the gold standard of fitness in the region, recognized for excellence and results.</p>
              </div>
            </div>
          </div>
          
          <Link 
            href="https://wa.me/923044603006" 
            className={styles.learnMore}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More About Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
