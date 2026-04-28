'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import styles from './ContactPage.module.css';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(`Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nMessage: ${form.message}`);
    window.open(`https://wa.me/923094045794?text=${msg}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className={styles.page}>
      <div className={`${styles.inner} container`}>
        <div className={styles.header}>
          <h1>Contact <span>Us</span></h1>
          <p>Have questions? We&apos;d love to hear from you. Send us a message or WhatsApp us directly.</p>
        </div>

        <div className={styles.grid}>
          {/* Info side */}
          <div className={styles.info}>
            <div className={styles.infoCard}>
              <div className={styles.infoItem}>
                <div className={styles.iconWrap}><Phone size={20} /></div>
                <div>
                  <h4>Phone / WhatsApp</h4>
                  <p>+92 309 4045794</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.iconWrap}><Mail size={20} /></div>
                <div>
                  <h4>Email</h4>
                  <p>info@powerzone.pk</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.iconWrap}><MapPin size={20} /></div>
                <div>
                  <h4>Address</h4>
                  <p>Maraghzar Colony, Multan Road, Lahore, Pakistan</p>
                </div>
              </div>
            </div>
            <a
              href="https://wa.me/923094045794"
              className={styles.waBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </a>
          </div>

          {/* Form side */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <h3>Send a Message</h3>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>Full Name</label>
                <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name" />
              </div>
              <div className={styles.field}>
                <label>Phone Number</label>
                <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="03XX XXXXXXX" />
              </div>
            </div>
            <div className={styles.field}>
              <label>Email Address</label>
              <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@example.com" />
            </div>
            <div className={styles.field}>
              <label>Message</label>
              <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Tell us what you need..." />
            </div>
            <button type="submit" className={styles.submitBtn}>
              <Send size={16} />
              {sent ? 'Message Sent! ✓' : 'Send via WhatsApp'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
