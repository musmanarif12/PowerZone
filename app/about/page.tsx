import React from 'react';
import { Metadata } from 'next';
import About from '@/components/About/About';

export const metadata: Metadata = {
  title: "About Us | PowerZone",
  description: "Learn more about PowerZone, our mission, and our state-of-the-art facilities.",
};

export default function AboutPage() {
  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <About />
    </main>
  );
}
