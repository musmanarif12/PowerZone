'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, db } from '@/lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  cartKey: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, pass: string) => Promise<boolean>;
  signUp: (name: string, email: string, pass: string, phone?: string) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  logOut: () => void;
  isLoaded: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'User',
          email: firebaseUser.email || '',
          cartKey: `pz_cart_${firebaseUser.uid}`
        });
      } else {
        setUser(null);
      }
      setIsLoaded(true);
    });
    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      return true;
    } catch (error) {
      return false;
    }
  };

  const signUp = async (name: string, email: string, pass: string, phone?: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const u = userCredential.user;
      
      await updateProfile(u, { displayName: name });
      
      await setDoc(doc(db, 'users', u.uid), {
        name,
        email,
        phone: phone || '',
        createdAt: new Date().toISOString()
      });

      await signOut(auth);

      return true;
    } catch (error) {
      return false;
    }
  };

  const logOut = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, resetPassword, logOut, isLoaded }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
