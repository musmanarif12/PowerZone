import type { Metadata } from "next";
import { CartProvider } from "@/lib/cartContext";
import { AdminProvider } from "@/lib/adminContext";
import { AuthProvider } from "@/lib/authContext";
import ConditionalLayout from "@/components/ConditionalLayout/ConditionalLayout";
import "./globals.css";

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    default: "PowerZone | Pakistan's #1 Supplements Store",
    template: "%s | PowerZone"
  },
  description: "Premium gym & supplements store in Pakistan. Buy authentic whey protein, pre-workout, BCAA, fat burners & more. Delivery all over Pakistan.",
  keywords: ["supplements", "whey protein", "gym", "pakistan", "fitness", "bodybuilding", "powerzone"],
  authors: [{ name: "PowerZone Team" }],
  creator: "PowerZone",
  publisher: "PowerZone Pakistan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://powerzone.pk'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "PowerZone | Authentic Supplements in Pakistan",
    description: "Premium gym & supplements store. Authentic products delivered all over Pakistan.",
    url: 'https://powerzone.pk',
    siteName: 'PowerZone',
    images: [
      {
        url: '/og-image.jpg', // Assuming you'll add this later or use a generic one
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "PowerZone | Pakistan's Top Supplement Store",
    description: "Buy authentic whey protein, BCAA, and vitamins with home delivery in Pakistan.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import WhatsAppButton from "@/components/WhatsApp/WhatsAppButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PowerZone Pakistan',
    url: 'https://powerzone.pk',
    logo: 'https://powerzone.pk/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+92-309-4045794',
      contactType: 'customer service',
      areaServed: 'PK',
      availableLanguage: ['English', 'Urdu'],
    },
    sameAs: [
      'https://www.facebook.com/powerzone.pk',
      'https://www.instagram.com/powerzone.pk',
    ],
  };

  const searchBoxLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://powerzone.pk',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://powerzone.pk/shop?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(searchBoxLd) }}
        />
      </head>
      <body>
        <AuthProvider>
          <CartProvider>
            <AdminProvider>
              <ConditionalLayout>
                {children}
              </ConditionalLayout>
            </AdminProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
