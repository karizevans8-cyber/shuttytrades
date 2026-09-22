import './globals.css';
import { ReactNode } from 'react';
export const metadata={title:'ShuttyTrades — Demo Trading Platform',description:'ShuttyTrades demo trading platform'};
export default function RootLayout({children}:{children:ReactNode}){return <html lang="en"><body>{children}</body></html>}