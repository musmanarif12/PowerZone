'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { plans } from '@/lib/data';
import styles from './Pricing.module.css';

const Pricing = () => {
  return (
    <section className={styles.pricing} id="plans">
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <h4>Pricing Plans</h4>
          <h2>Choose Your Membership</h2>
          <div className={styles.accentLine}></div>
        </div>
        
        <div className={styles.grid}>
          {plans.map((plan, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${styles.card} ${plan.highlighted ? styles.highlighted : ''}`}
            >
              {plan.highlighted && <div className={styles.badge}>Best Value</div>}
              <h3 className={styles.planName}>{plan.name}</h3>
              <div className={styles.priceContainer}>
                <span className={styles.currency}>PKR</span>
                <span className={styles.price}>{plan.price}</span>
                <span className={styles.period}>/month</span>
              </div>
              
              <ul className={styles.features}>
                {plan.features.map((feature, i) => (
                  <li key={i}>
                    <Check className={styles.checkIcon} size={18} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                href="https://wa.me/923094045794" 
                className={styles.ctaBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
