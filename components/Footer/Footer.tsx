import React from 'react';
import Link from 'next/link';
import { Zap, Phone, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo}>
              <Zap className={styles.logoIcon} fill="var(--whatsapp-green)" />
              <span>Power<span>Zone</span></span>
            </Link>
            <p className={styles.brandDesc}>
              Pakistan&apos;s premium fitness destination. Built for champions, designed for everyone. 
              Join us today and unlock your true potential.
            </p>
            <div className={styles.socials}>
              <a href="#" aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://wa.me/923044603006" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.7.9L22 2l-1.5 5.5Z"></path></svg>
              </a>
            </div>
          </div>
          
          <div className={styles.linksCol}>
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/plans">Membership Plans</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>
          
          <div className={styles.contactCol}>
            <h4>Contact Info</h4>
            <div className={styles.contactInfo}>
              <div className={styles.infoItem}>
                <MapPin className={styles.infoIcon} />
                <span>13-A , Maraghzar Colony ,Multan Road Lahore</span>
              </div>
              <div className={styles.infoItem}>
                <Phone className={styles.infoIcon} />
                <span>+92 304-4603006</span>
              </div>
            </div>
          </div>
          
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} PowerZone Gym. All rights reserved.</p>
          <div className={styles.bottomLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
