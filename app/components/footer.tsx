import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-0.5 px-4 text-center absolute bottom-0 w-full">
      <div className="container mx-auto">
        <p>&copy; 2024 Abstraction Courses. All rights reserved.</p>
        <p>Contact us: contact@abstractioncourses.com</p>
        <p>Follow us on social media: @abstractioncourses</p>
      </div>
    </footer>
  );
};

export default Footer;
