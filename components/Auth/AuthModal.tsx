'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '@/lib/authContext';
import styles from './AuthModal.module.css';

interface AuthModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const { signIn, signUp, resetPassword } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setIsForgot] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Login form
  const [logEmail, setLogEmail] = useState('');
  const [logPass, setLogPass] = useState('');

  // Signup form
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regPhone, setRegPhone] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await signIn(logEmail, logPass);
    if (success) {
      if (onSuccess) onSuccess();
      else onClose();
    }
    else setError('Invalid email or password. Please try again.');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await signUp(regName, regEmail, regPass, regPhone);
    if (success) {
      alert("Account created successfully! Please sign in to continue to payment.");
      setIsLogin(true);
      setLogEmail(regEmail);
      setError('');
    } else {
      setError('Registration failed. Email might already be in use.');
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await resetPassword(logEmail);
    if (success) {
      setMessage('Password reset link sent to your email.');
      setError('');
    } else {
      setError('Failed to send reset link. Please check your email.');
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeBtn}><X size={20} /></button>
        
        <div className={styles.header}>
          <h2>{isForgot ? 'Reset Password' : isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>
            {isForgot 
              ? 'Enter your email address and we will send you a link to reset your password.' 
              : isLogin 
                ? 'Sign in to access your saved cart and personal orders.' 
                : 'Join PowerZone for faster checkout and exclusive offers.'}
          </p>
        </div>

        {error && <div className={styles.error}>{error}</div>}
        {message && <div className={styles.message}>{message}</div>}

        {isForgot ? (
          <form onSubmit={handleReset} className={styles.form}>
            <div className={styles.field}>
              <label>Email Address</label>
              <input type="email" required value={logEmail} onChange={e => setLogEmail(e.target.value)} placeholder="your@email.com" />
            </div>
            <button type="submit" className={styles.submitBtn}>Send Reset Link</button>
            <button type="button" className={styles.switchBtn} style={{marginTop:'0.5rem'}} onClick={() => { setIsForgot(false); setError(''); setMessage(''); }}>
              Back to Login
            </button>
          </form>
        ) : isLogin ? (
          <form onSubmit={handleLogin} className={styles.form}>
            <div className={styles.field}>
              <label>Email Address</label>
              <input type="email" required value={logEmail} onChange={e => setLogEmail(e.target.value)} />
            </div>
            <div className={styles.field}>
              <label>Password</label>
              <input type="password" required value={logPass} onChange={e => setLogPass(e.target.value)} />
              <button type="button" className={styles.forgotLink} onClick={() => { setIsForgot(true); setError(''); setMessage(''); }}>
                Forgot password?
              </button>
            </div>
            <button type="submit" className={styles.submitBtn}>Sign In</button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className={styles.form}>
            <div className={styles.field}>
              <label>Full Name</label>
              <input type="text" required value={regName} onChange={e => setRegName(e.target.value)} />
            </div>
            <div className={styles.field}>
              <label>Email Address</label>
              <input type="email" required value={regEmail} onChange={e => setRegEmail(e.target.value)} />
            </div>
            <div className={styles.field}>
              <label>Phone Number (Optional)</label>
              <input type="text" value={regPhone} onChange={e => setRegPhone(e.target.value)} />
            </div>
            <div className={styles.field}>
              <label>Password</label>
              <input type="password" required minLength={6} value={regPass} onChange={e => setRegPass(e.target.value)} />
            </div>
            <button type="submit" className={styles.submitBtn}>Create Account</button>
          </form>
        )}

        <div className={styles.footer}>
          {isLogin ? (
            <p>New to PowerZone? <button type="button" onClick={() => { setIsLogin(false); setError(''); }} className={styles.switchBtn}>Sign up</button></p>
          ) : (
            <p>Already have an account? <button type="button" onClick={() => { setIsLogin(true); setError(''); }} className={styles.switchBtn}>Sign in</button></p>
          )}
        </div>
      </div>
    </div>
  );
}
