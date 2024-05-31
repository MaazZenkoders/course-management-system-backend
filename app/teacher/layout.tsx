import React, { ReactNode } from 'react';
import { Inter } from "next/font/google";
import TeacherNavbar from './components/teacherNavbar';
import Footer from '../components/footer';

const inter = Inter({ subsets: ["latin"] });

interface layoutProps {
  children: ReactNode;
}

const Layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <html lang="en" data-theme = "winter">
    <body className={inter.className}>
        <TeacherNavbar/>
      <main className="flex-grow">
        {children}
      </main>
      <Footer/>
    </body>
    </html>
  );
};

export default Layout;
