// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Protect from './pages/Protect';
import Verify from './pages/Verify';
import About from './pages/About';
import UserManual from './pages/UserManual';
import { BookOpen } from 'lucide-react';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-4 py-2 rounded-md hover:bg-cyan/20 ${isActive ? 'bg-cyan/30' : ''}`;

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen text-grayLight">
        {/* Sidebar */}
        <nav className="w-64 bg-navy p-4 flex flex-col space-y-2">
          <h1 className="text-2xl font-bold mb-4 text-cyan">DigiForge</h1>
          <NavLink to="/" className={navLinkClass}>Dashboard</NavLink>
          <NavLink to="/protect" className={navLinkClass}>Protect</NavLink>
          <NavLink to="/verify" className={navLinkClass}>Verify</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/user-manual" className={navLinkClass}>User Manual</NavLink>
        </nav>
        {/* Main content */}
        <main className="flex-1 p-6 bg-navy">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/protect" element={<Protect />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/about" element={<About />} />
            <Route path="/user-manual" element={<UserManual />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
