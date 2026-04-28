import React from 'react';
import { Truck, ShieldCheck, Package, Lock } from 'lucide-react';
import styles from './TrustStrip.module.css';

const items = [
  { icon: Truck, text: 'Delivery All Over Pakistan' },
  { icon: ShieldCheck, text: '100% Authentic Products' },
  { icon: Package, text: 'Imported from Verified Vendors' },
  { icon: Lock, text: 'Secure Payment' },
];

export default function TrustStrip() {
  return (
    <div className={styles.strip}>
      <div className={`${styles.inner} container`}>
        {items.map(({ icon: Icon, text }) => (
          <div key={text} className={styles.item}>
            <Icon size={22} className={styles.icon} />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
