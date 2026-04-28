'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, Check, Star, Shield, Trophy } from 'lucide-react';
import { plans } from '@/lib/data';
import styles from './MembershipDetail.module.css';

const MembershipDetailPage = () => {
  const { slug } = useParams();
  const router = useRouter();
  
  const plan = plans.find(p => p.slug === slug);
  
  if (!plan) {
    return <div className="container" style={{ padding: '10rem 0', textAlign: 'center' }}>
      <h1>Plan Not Found</h1>
      <button onClick={() => router.push('/')} style={{ marginTop: '2rem', padding: '1rem 2rem', background: 'var(--whatsapp-green)', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer' }}>
        Back to Home
      </button>
    </div>;
  }

  const getIcon = (name: string) => {
    if (name.includes('Silver')) return <Shield size={40} />;
    if (name.includes('Gold')) return <Star size={40} />;
    return <Trophy size={40} />;
  };

  return (
    <div className={styles.page}>
      <div className={`${styles.container} container`}>
        <button onClick={() => router.back()} className={styles.backBtn}>
          <ChevronLeft size={20} /> Back to Plans
        </button>
        
        <div className={styles.card}>
          <div className={styles.header}>
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={styles.planIcon}
            >
              {getIcon(plan.name)}
            </motion.div>
            <h1>{plan.name}</h1>
            <p className={styles.tagline}>Unlock Your Full Potential</p>
          </div>
          
          <div className={styles.body}>
            <div className={styles.pricingSide}>
              <div className={styles.priceTag}>
                <span className={styles.currency}>PKR</span>
                <span className={styles.amount}>{plan.price}</span>
                <span className={styles.period}>/month</span>
              </div>
              <p className={styles.planDesc}>{plan.fullDesc}</p>
              <Link 
                href="https://wa.me/923094045794" 
                className={styles.joinBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join PowerZone Now
              </Link>
            </div>
            
            <div className={styles.featuresSide}>
              <h3>What&apos;s Included</h3>
              <div className={styles.featureGrid}>
                {plan.details.map((detail, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={styles.featureItem}
                  >
                    <Check className={styles.check} />
                    <span>{detail}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipDetailPage;
