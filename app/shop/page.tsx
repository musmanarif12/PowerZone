import React, { Suspense } from 'react';
import { Metadata } from 'next';
import ShopClient from '@/components/Shop/ShopClient';

export const metadata: Metadata = {
  title: "Shop Online | Authentic Gym Supplements in Pakistan",
  description: "Browse our complete collection of authentic whey protein, pre-workouts, BCAAs, and multivitamins. Best prices in Pakistan with express home delivery.",
  keywords: ["buy protein pakistan", "gym supplements store", "creatine price pakistan", "best whey protein brand"],
  openGraph: {
    title: "PowerZone Store | Authentic Supplements Pakistan",
    description: "Your one-stop shop for gym supplements. Quality guaranteed.",
  }
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>Loading store...</div>}>
      <ShopClient />
    </Suspense>
  );
}
