import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Next.js Complete Lab | Module 6',
    template: '%s | Next.js Lab',
  },
  description:
    'A comprehensive demonstration of Next.js 15 features including SSR, SSG, ISR, App Router, Server Components, API Routes, and optimization techniques.',
  keywords: ['Next.js', 'React', 'SSR', 'SSG', 'ISR', 'Server Components', 'Web Development'],
  authors: [{ name: 'MSc. Tran Vinh Khiem' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Next.js Complete Lab',
    title: 'Next.js Complete Lab | Module 6',
    description: 'Master Next.js with hands-on exercises and a complete AI-powered project.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col antialiased font-sans">
        <div className="noise-overlay" />
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
