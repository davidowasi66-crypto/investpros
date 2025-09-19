
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t-2 border-black bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="border-t border-dashed border-gray-300 mt-8 pt-8 text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} CryptoYields. All rights reserved. 
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
