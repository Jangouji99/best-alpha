import { Inter, Poppins } from 'next/font/google';
import { Metadata } from 'next';

import './[lang]/globals.css';

// const inter = Inter({
//   weight: ['400', '500', '600', '700'],
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-inter',
// });

const manrope = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Best Alpha',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" suppressHydrationWarning={true}>
      <body
        className={`${manrope.variable}`}
        // to prevent any warning that is caused by third party extensions like Grammarly
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
