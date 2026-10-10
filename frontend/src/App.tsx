import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Protect from './pages/Protect';
import Verify from './pages/Verify';
import About from './pages/About';
import UserManual from './pages/UserManual';
import Landing from './pages/Landing';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-background text-on-surface antialiased">
        {/* Unified Stitch Top Navigation */}
        <Navigation />

        {/* Main Content Area */}
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/protect" element={<Protect />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/about" element={<About />} />
            <Route path="/user-manual" element={<UserManual />} />
          </Routes>
        </main>

        {/* Shared Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
