'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, defaultProducts, BRANDS, CATEGORIES } from './products';
import { db } from './firebase';
import { doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';

interface AdminContextType {
  products: Product[];
  addProduct: (p: Product) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  brands: string[];
  categories: string[];
  addBrand: (name: string) => Promise<void>;
  updateBrand: (oldName: string, newName: string) => Promise<void>;
  deleteBrand: (name: string) => Promise<void>;
  addCategory: (name: string) => Promise<void>;
  updateCategory: (oldName: string, newName: string) => Promise<void>;
  deleteCategory: (name: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>(BRANDS);
  const [categories, setCategories] = useState<string[]>(CATEGORIES);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedProds = localStorage.getItem('pz_products');
      if (savedProds) {
        setProducts(JSON.parse(savedProds));
      } else {
        setProducts(defaultProducts);
        localStorage.setItem('pz_products', JSON.stringify(defaultProducts));
      }
    } catch {
      setProducts(defaultProducts);
    }

    // Sync Brands/Categories with Firestore
    const configDoc = doc(db, 'settings', 'siteConfig');
    const unsubscribe = onSnapshot(configDoc, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        if (data.brands) setBrands(data.brands);
        if (data.categories) setCategories(data.categories);
      } else {
        // Init Firestore with defaults if missing
        setDoc(configDoc, { brands: BRANDS, categories: CATEGORIES });
      }
    });

    setIsLoaded(true);
    return () => unsubscribe();
  }, []);

  const save = (updated: Product[]) => {
    setProducts(updated);
    localStorage.setItem('pz_products', JSON.stringify(updated));
  };

  const addProduct = (p: Product) => save([...products, p]);
  const updateProduct = (p: Product) => save(products.map(x => x.id === p.id ? p : x));
  const deleteProduct = (id: string) => save(products.filter(x => x.id !== id));
  
  const addBrand = async (name: string) => {
    const updated = [...brands, name];
    await updateDoc(doc(db, 'settings', 'siteConfig'), { brands: updated });
  };

  const updateBrand = async (oldName: string, newName: string) => {
    const updated = brands.map(b => b === oldName ? newName : b);
    await updateDoc(doc(db, 'settings', 'siteConfig'), { brands: updated });
  };

  const deleteBrand = async (name: string) => {
    const updated = brands.filter(b => b !== name);
    await updateDoc(doc(db, 'settings', 'siteConfig'), { brands: updated });
  };

  const addCategory = async (name: string) => {
    const updated = [...categories, name];
    await updateDoc(doc(db, 'settings', 'siteConfig'), { categories: updated });
  };

  const updateCategory = async (oldName: string, newName: string) => {
    const updated = categories.map(c => c === oldName ? newName : c);
    await updateDoc(doc(db, 'settings', 'siteConfig'), { categories: updated });
  };

  const deleteCategory = async (name: string) => {
    const updated = categories.filter(c => c !== name);
    await updateDoc(doc(db, 'settings', 'siteConfig'), { categories: updated });
  };

  if (!isLoaded) return null; // Avoid hydration mismatch

  return (
    <AdminContext.Provider value={{ 
      products, addProduct, updateProduct, deleteProduct,
      brands, categories, 
      addBrand, updateBrand, deleteBrand,
      addCategory, updateCategory, deleteCategory 
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used inside AdminProvider');
  return ctx;
}
