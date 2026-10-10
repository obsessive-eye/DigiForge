import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-container-lowest w-full border-t border-outline-variant/30 mt-16">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-space-xl py-space-xl flex flex-col md:flex-row justify-between items-center gap-space-md">
        {/* Brand & Copyright */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Link
            to="/"
            className="text-headline-sm font-headline-sm text-on-surface font-semibold flex items-center gap-2"
          >
            <span className="text-primary material-symbols-outlined text-[20px]">fingerprint</span>
            <span>DigiForge</span>
          </Link>
          <span className="hidden md:inline text-outline-variant">&bull;</span>
          <p className="text-body-sm font-body-sm text-on-surface-variant text-center md:text-left">
            &copy; 2026 DigiForge Systems Inc. Sovereign cryptographic provenance for creators.
          </p>
        </div>

        {/* Links & System Status Indicator */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link to="/user-manual" className="text-on-surface-variant hover:text-on-surface transition-colors text-label-sm font-label-sm">
            System Manual
          </Link>
          <Link to="/about" className="text-on-surface-variant hover:text-on-surface transition-colors text-label-sm font-label-sm">
            About DigiForge
          </Link>
          <Link to="/dashboard" className="text-on-surface-variant hover:text-on-surface transition-colors text-label-sm font-label-sm flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim" />
            <span>Workspace Status</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
