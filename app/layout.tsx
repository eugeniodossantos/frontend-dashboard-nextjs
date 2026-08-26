import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frontend Analytics Dashboard',
  description: 'Portfolio dashboard built with Next.js, TypeScript and REST APIs.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}