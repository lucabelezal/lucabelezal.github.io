import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shortly — URL Shortener',
  description:
    'Encurte URLs em um clique, com links recentes, cópia rápida e redirecionamento.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
