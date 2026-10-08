// src/pages/About.tsx
import React from 'react';

const About: React.FC = () => (
  <div className="max-w-2xl mx-auto">
    <h2 className="text-3xl font-bold text-cyan mb-4">About This Project</h2>
        <p className="text-grayLight mb-2">
          DigiForge demonstrates invisible watermark embedding, extraction, and verification for digital images. It uses a DWT + DCT based invisible watermark embedding algorithm implemented in the backend FastAPI service.
        </p>
    <p className="text-grayLight">
      The application is built with React, TypeScript, Vite, and Tailwind CSS to provide
      a modern, responsive UI.
    </p>
  </div>
);

export default About;
