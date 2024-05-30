import React, { ReactNode } from 'react';
import StudentNavbar from './components/studentNavbar';

interface layoutProps {
  children: ReactNode;
}

const layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <StudentNavbar />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

export default layout;
