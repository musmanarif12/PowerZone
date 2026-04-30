"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Menu, X, User, ChevronDown, Package, LogOut } from "lucide-react";
import { useAuth } from "@/lib/authContext";
import AuthModal from "@/components/Auth/AuthModal";
import OrderHistoryModal from "@/components/Auth/OrderHistoryModal";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const openAuth = (tab: "login" | "signup") => {
    setAuthTab(tab);
    setShowAuth(true);
  };
  const { user, isLoaded, logOut } = useAuth();
  const router = useRouter();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (window.location.pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        // Scroll to element accounting for fixed navbar height of ~80px
        const y = element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      router.push("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 500);
    }
  };

  const handleLogout = async () => {
    await logOut();
    if (window.location.pathname === "/checkout") {
      router.push("/");
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
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
        <div className={`${styles.container} container`}>
          <Link href="/" className={styles.logo}>
            <Zap className={styles.logoIcon} fill="#00C853" />
            <span>
              Power<span>Zone</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className={`${styles.navLinks} ${isOpen ? styles.active : ""}`}>
            <li>
              <a href="#" onClick={(e) => handleNavClick(e, 'home')}>
                Home
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleNavClick(e, 'about')}>
                About
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleNavClick(e, 'services')}>
                Services
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleNavClick(e, 'plans')}>
                Plans
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleNavClick(e, 'contact')}>
                Contact
              </a>
            </li>
            <li>
              <Link href="/shop" onClick={() => setIsOpen(false)}>
                Shop
              </Link>
            </li>
          </ul>

          <div className={styles.actions}>
            {isLoaded && user ? (
              <div className={styles.userControls}>
                <div className={styles.userBadge}>
                  <User size={18} />
                  <span className={styles.hideMobile}>
                    {user.name.split(" ")[0]}
                  </span>
                </div>
                <button
                  className={styles.ordersBtn}
                  onClick={() => setShowOrderHistory(true)}
                >
                  <Package size={16} />
                  <span className={styles.hideMobile}>Orders</span>
                </button>
                <button className={styles.navLogoutBtn} onClick={handleLogout}>
                  <LogOut size={16} />
                  <span className={styles.hideMobile}>Log Out</span>
                </button>
              </div>
            ) : (
              <div className={styles.authButtons}>
                <Link
                  href="https://wa.me/923044603006"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.signUpBtn}
                >
                  Join Now
                </Link>
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
      {showAuth && (
        <AuthModal onClose={() => setShowAuth(false)} initialTab={authTab} />
      )}
      {showOrderHistory && (
        <OrderHistoryModal onClose={() => setShowOrderHistory(false)} />
      )}
    </>
  );
};

export default Navbar;
