import React from 'react';
import { Metadata } from 'next';
import Services from '@/components/Services/Services';

export const metadata: Metadata = {
  title: "Our Services | PowerZone",
  description: "Explore the premium services we offer at PowerZone Fitness Club.",
};

export default function ServicesPage() {
  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <Services />
    </main>
  );
}
