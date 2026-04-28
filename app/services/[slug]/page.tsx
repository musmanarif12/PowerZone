'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, Clock, CheckCircle, Zap } from 'lucide-react';
import { services } from '@/lib/data';
import styles from './ServiceDetail.module.css';

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const router = useRouter();
  
  const service = services.find(s => s.slug === slug);
  
  if (!service) {
    return <div className="container" style={{ padding: '10rem 0', textAlign: 'center' }}>
      <h1>Service Not Found</h1>
      <button onClick={() => router.push('/')} style={{ marginTop: '2rem', padding: '1rem 2rem', background: 'var(--whatsapp-green)', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer' }}>
        Back to Home
      </button>
    </div>;
  }

  return (
    <div className={styles.page}>
      <div className={`${styles.container} container`}>
        <button onClick={() => router.back()} className={styles.backBtn}>
          <ChevronLeft size={20} /> Back
        </button>
        
        <div className={styles.layout}>
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className={styles.imageSide}
          >
            <div className={styles.imageWrapper}>
              <Image 
                src={service.image} 
                alt={service.title} 
                width={800} 
                height={600} 
                className={styles.mainImage}
              />
              <div className={styles.floatingBadge}>
                <Zap size={24} color="var(--whatsapp-green)" fill="var(--whatsapp-green)" />
                <span>Premium Quality</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className={styles.contentSide}
          >
            <h4 className={styles.subtitle}>Service Details</h4>
            <h1 className={styles.title}>{service.title}</h1>
            <div className={styles.divider}></div>
            
            <p className={styles.description}>{service.fullDesc}</p>
            
            <div className={styles.infoBox}>
              <div className={styles.infoItem}>
                <Clock className={styles.icon} />
                <div>
                  <strong>Available Schedule:</strong>
                  <p>{service.schedule}</p>
                </div>
              </div>
            </div>
            
            <div className={styles.benefits}>
              <h3>Key Benefits</h3>
              <div className={styles.benefitsGrid}>
                {service.benefits.map((benefit, index) => (
                  <div key={index} className={styles.benefitItem}>
                    <CheckCircle className={styles.checkIcon} />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Link 
              href="https://wa.me/923094045794" 
              className={styles.joinBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              Enroll In This Service
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
