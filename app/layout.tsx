import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';

const display = Cormorant_Garamond({ variable: '--font-display', subsets: ['latin'], weight: ['500','600'] });
const sans = DM_Sans({ variable: '--font-sans', subsets: ['latin'] });
export const metadata: Metadata = { title: 'Lash by Design | Lash Studio', description: 'Personalised lash extensions, thoughtfully designed for you. View services and book your appointment online.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={`${display.variable} ${sans.variable}`}>{children}</body></html>; }
