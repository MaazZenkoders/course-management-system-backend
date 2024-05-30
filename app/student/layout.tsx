import React, { ReactNode } from 'react';
import StudentNavbar from './components/studentNavbar';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface layoutProps {
  children: ReactNode;
}

const Layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <html lang="en" data-theme = "winter">
    <body className={inter.className}>
      <StudentNavbar />
      <main className="flex-grow">
        {children}
      </main>
    </body>
    </html>
  );
};

export default Layout;
