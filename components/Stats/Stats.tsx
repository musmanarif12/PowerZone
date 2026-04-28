'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CountUp from './CountUp';
import styles from './Stats.module.css';

const stats = [
  { value: 300, label: 'Total Members', suffix: '+' },
  { value: 4, label: 'Expert Trainers', suffix: '' },
  { value: 5, label: 'Years Experience', suffix: '+' },
  { value: 7, label: 'Daily Sessions', suffix: '' }
];

const Stats = () => {
  return (
    <section className={styles.stats}>
      <div className={`${styles.container} container`}>
        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CountUp to={stat.value} />{stat.suffix}
              </motion.h2>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
