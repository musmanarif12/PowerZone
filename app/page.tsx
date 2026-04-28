import React from 'react';
import Hero from '@/components/Hero/Hero';
import Features from '@/components/Features/Features';
import About from '@/components/About/About';
import Services from '@/components/Services/Services';
import Stats from '@/components/Stats/Stats';
import Trainer from '@/components/Trainer/Trainer';
import Testimonials from '@/components/Testimonials/Testimonials';
import Pricing from '@/components/Pricing/Pricing';
import Gallery from '@/components/Gallery/Gallery';

export default function Home() {
  return (
    <main>
      {/* Gym Website Sections — unchanged */}
      <Hero />
      <Features />
      <About />
      <Services />
      <Stats />
      <Trainer />
      <Testimonials />
      <Pricing />
      <Gallery />
    </main>
  );
}
