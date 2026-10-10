import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { checkHealth } from '../services/api';

export const Navigation: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    const verifyHealth = () => {
      checkHealth()
        .then(() => {
          if (mounted) setIsOnline(true);
        })
        .catch(() => {
          if (mounted) setIsOnline(false);
        });
    };

    verifyHealth();
    const interval = setInterval(verifyHealth, 10000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-primary font-medium border-b-2 border-primary pb-1 font-label-md text-label-md transition-colors'
      : 'text-on-surface-variant hover:text-on-surface transition-colors duration-150 font-label-md text-label-md';

  return (
    <header className="bg-surface/85 backdrop-blur-md full-width top-0 sticky z-50 border-b border-outline-variant/30">
      <div className="flex justify-between items-center w-full px-4 md:px-space-xl max-w-7xl mx-auto h-16">
        {/* Brand Logo */}
        <Link
          to="/"
          className="text-headline-sm font-headline-sm tracking-tight text-on-surface flex items-center gap-space-xs font-bold"
        >
          <span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center border border-outline-variant/50 text-primary">
            <span className="material-symbols-outlined text-[18px]">fingerprint</span>
          </span>
          <span className="text-white font-headline-sm">DigiForge</span>
          <span className="hidden sm:inline-block text-[10px] font-mono-badge text-on-surface-variant bg-surface-container-high px-1.5 py-0.5 rounded ml-1">
            v2.4
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/dashboard" aria-label="Dashboard Overview" className={navLinkClass}>
            Overview
          </NavLink>
          <NavLink to="/protect" className={navLinkClass}>
            Protect
          </NavLink>
          <NavLink to="/verify" className={navLinkClass}>
            Verify
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/user-manual" className={navLinkClass}>
            User Manual
          </NavLink>
        </nav>

        {/* Trailing Status & Action Buttons */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-container border border-outline-variant/50 text-xs font-mono-badge">
            <span
              className={`w-2 h-2 rounded-full ${
                isOnline === true
                  ? 'bg-tertiary-fixed-dim animate-pulse'
                  : isOnline === false
                  ? 'bg-error'
                  : 'bg-yellow-400 animate-pulse'
              }`}
            />
            <span className="text-on-surface-variant text-[11px]">
              {isOnline === true ? 'FastAPI Online' : isOnline === false ? 'Offline' : 'Connecting...'}
            </span>
          </div>

          <Link
            to="/protect"
            className="bg-primary-container text-on-primary font-label-md text-label-md font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:bg-primary shadow-sm active:opacity-90 flex items-center gap-1.5"
          >
            <span>Open Workspace</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-on-surface-variant hover:text-on-surface rounded-lg bg-surface-container border border-outline-variant/40"
            aria-label="Toggle Mobile Menu"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-container-low border-b border-outline-variant/40 px-4 py-4 space-y-2">
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-body-md text-on-surface hover:bg-surface-container"
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            aria-label="Dashboard Overview"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-body-md text-on-surface hover:bg-surface-container"
          >
            Overview
          </NavLink>
          <NavLink
            to="/protect"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-body-md text-on-surface hover:bg-surface-container"
          >
            Protect
          </NavLink>
          <NavLink
            to="/verify"
            onClick={() => setMobileMenuOpen(false)}
            className="block x-3 py-2 rounded-lg text-body-md text-on-surface hover:bg-surface-container"
          >
            Verify
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-body-md text-on-surface hover:bg-surface-container"
          >
            About
          </NavLink>
          <NavLink
            to="/user-manual"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-body-md text-on-surface hover:bg-surface-container"
          >
            User Manual
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Navigation;
