import React from 'react';
import { Metadata } from 'next';
import Pricing from '@/components/Pricing/Pricing';

export const metadata: Metadata = {
  title: "Membership Plans | PowerZone",
  description: "Choose the best membership plan for your fitness goals.",
};

export default function PlansPage() {
  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <Pricing />
    </main>
  );
}
