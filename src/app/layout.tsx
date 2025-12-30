import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Knowledge Base | Hoang Bao Minh',
    template: '%s | Knowledge Base',
  },
  description: 'AI-Powered Next.js Documentation - Xây dựng bởi Hoang Bao Minh',
  keywords: ['Next.js', 'React', 'Documentation', 'Knowledge Base', 'AI', 'Hoang Bao Minh'],
  authors: [{ name: 'Hoang Bao Minh' }],
  creator: 'Hoang Bao Minh',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Knowledge Base by Hoang Bao Minh',
    title: 'Knowledge Base | Hoang Bao Minh',
    description: 'AI-Powered Next.js Documentation',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Knowledge Base | Hoang Bao Minh',
    description: 'AI-Powered Next.js Documentation',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
