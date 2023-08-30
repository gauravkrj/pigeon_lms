
import HorizontalNav from '@/components/Navbar/HorizontalNav';
import './globals.css';
import { Inter } from 'next/font/google';
import SideNav from '@/components/Navbar/SideNav';
import { AuthProvider } from './Contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Pigeon LMS',
  description: 'Makes Interaction Easy with Child Tutors',
};

export default function RootLayout({ children }) {
  return (

  <AuthProvider>
    <html lang="en">
      <body className={`${inter.className} `}>
        {/* Main  Navbar*/}
        <div className="main-navbar">
          {/* Sidebar  Navbar*/}

          <div className=" side-navbar">
            <SideNav />
          </div>
          {/* Horizontal  Navbar*/}

          <div className="horizontal-navbar">
            <HorizontalNav />
          </div>
          </div>
        {/* Body Section*/}

        <div className="body-child-pass">{children}</div>
        {/* Body Section*/}
      </body>
    </html>
  </AuthProvider>
  );
}
