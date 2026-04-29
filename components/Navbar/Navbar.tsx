'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Zap, Menu, X, User, ChevronDown, Package, LogOut } from "lucide-react";
import { useAuth } from '@/lib/authContext';
import AuthModal from '@/components/Auth/AuthModal';
import OrderHistoryModal from '@/components/Auth/OrderHistoryModal';
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login');
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const openAuth = (tab: 'login' | 'signup') => {
    setAuthTab(tab);
    setShowAuth(true);
  };
  const { user, isLoaded, logOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logOut();
    if (window.location.pathname === '/checkout') {
      router.push('/');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (isOpen) setIsOpen(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`${styles.container} container`}>
          <Link href="/" className={styles.logo}>
            <Zap className={styles.logoIcon} fill="#00C853" />
            <span>
              Power<span>Zone</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
            <li><Link href="/#home" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link href="/#about" onClick={() => setIsOpen(false)}>About</Link></li>
            <li><Link href="/#services" onClick={() => setIsOpen(false)}>Services</Link></li>
            <li><Link href="/#plans" onClick={() => setIsOpen(false)}>Plans</Link></li>
            <li><Link href="/#contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
            <li>
              <Link href="/shop" onClick={() => setIsOpen(false)}>Shop</Link>
            </li>
          </ul>

          <div className={styles.actions}>
            {isLoaded && user ? (
              <div className={styles.userControls}>
                <div className={styles.userBadge}>
                  <User size={18} />
                  <span>{user.name.split(' ')[0]}</span>
                </div>
                <button 
                  className={styles.ordersBtn} 
                  onClick={() => setShowOrderHistory(true)}
                >
                  <Package size={16} />
                  Orders
                </button>
                <button 
                  className={styles.navLogoutBtn} 
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  Log Out
                </button>
              </div>
            ) : (
              <div className={styles.authButtons}>
                <button
                  className={styles.signInBtn}
                  onClick={() => openAuth('login')}
                >
                  Sign In
                </button>
                <button
                  className={styles.signUpBtn}
                  onClick={() => openAuth('signup')}
                >
                  Sign Up
                </button>
              </div>
            )}

            <button
              className={styles.hamburger}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} initialTab={authTab} />}
      {showOrderHistory && <OrderHistoryModal onClose={() => setShowOrderHistory(false)} />}
    </>
  );
};

export default Navbar;
