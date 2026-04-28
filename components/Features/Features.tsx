import React from 'react';
import { Dumbbell, Users, Clock } from 'lucide-react';
import styles from './Features.module.css';

const features = [
  {
    icon: <Dumbbell />,
    title: 'Pro Equipment',
    desc: 'Top-tier commercial machines from world-class brands for maximum results.'
  },
  {
    icon: <Users />,
    title: 'Expert Coaches',
    desc: 'Certified professionals dedicated to your growth and proper technique.'
  },
  {
    icon: <Clock />,
    title: 'Flexible Timing',
    desc: '24/7 access option to fit your fitness journey into any schedule.'
  }
];

const Features = () => {
  return (
    <section className={styles.features}>
      <div className={`${styles.container} container`}>
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrapper}>
                {feature.icon}
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDesc}>{feature.desc}</p>
              <div className={styles.cardLine}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
