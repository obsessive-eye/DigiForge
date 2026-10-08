// src/pages/Dashboard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-cyan mb-6">DigiForge<br/>Secure Digital Watermarking</h1>
      <p className="text-grayLight mb-8">Protect your digital images, verify copyright ownership, and check image integrity.</p>
      <div className="flex flex-col space-y-4 md:flex-row md:justify-center md:space-y-0 md:space-x-4">
        <Link
          to="/protect"
          className="px-6 py-3 bg-cyan text-navy rounded-md hover:bg-cyan/80 transition"
        >
          Protect Image
        </Link>
        <Link
          to="/verify"
          className="px-6 py-3 bg-cyan text-navy rounded-md hover:bg-cyan/80 transition"
        >
          Verify Image
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
