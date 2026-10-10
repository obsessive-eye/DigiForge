import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { checkHealth } from '../services/api';

const Landing: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [imgError, setImgError] = useState(false);

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

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-space-xl pt-12 pb-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Pill Badge with Real Health Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-outline-variant/60 mb-6">
              <span
                className={`w-2 h-2 rounded-full ${
                  isOnline === true
                    ? 'bg-tertiary-fixed-dim animate-pulse'
                    : isOnline === false
                    ? 'bg-error'
                    : 'bg-yellow-400 animate-pulse'
                }`}
              />
              <span className="font-mono-badge text-mono-badge text-on-surface-variant">
                DigiForge 2.0 &bull; {isOnline === true ? 'FastAPI Operational' : isOnline === false ? 'Backend Offline' : 'Connecting Engine...'}
              </span>
            </div>

            {/* Hero Headline */}
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg font-bold text-on-surface tracking-tight leading-none mb-6">
              Your images.<br />
              <span className="text-primary font-semibold">Your ownership.</span>
            </h1>

            {/* Hero Subtitle */}
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-10 leading-relaxed">
              Protect your images with invisible watermarks. Verify ownership whenever you need without compromising visual fidelity.
            </p>

            {/* Action Buttons Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-6">
              <Link
                to="/protect"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary-container text-on-primary font-headline-sm text-label-md font-semibold hover:bg-primary transition-all duration-200 shadow-sm active:opacity-90"
              >
                <span>Protect an Image</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
              <Link
                to="/verify"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-surface-container text-on-surface font-headline-sm text-label-md font-medium border border-outline-variant hover:bg-surface-container-high hover:border-primary/40 transition-all duration-200"
              >
                <span>Verify an Image</span>
                <span className="material-symbols-outlined text-[18px]">fingerprint</span>
              </Link>
            </div>

            {/* Reassurance Footnote */}
            <p className="font-body-sm text-body-sm text-on-surface-variant/80 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim">verified_user</span>
              <span>Private by design. Simple to use. DWT + DCT transform domain security.</span>
            </p>
          </div>

          {/* Right Hero Column (Visual Showcase) */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl pointer-events-none" />
            <div className="relative rounded-2xl p-2 bg-surface-container-low border border-outline-variant/60 shadow-2xl">
              <div className="relative overflow-hidden rounded-xl aspect-[16/10] bg-surface-container-lowest">
                {!imgError ? (
                  <img
                    alt="Protected Architectural Study"
                    className="w-full h-full object-cover object-center filter contrast-[1.02]"
                    src="/architectural-specimen.png"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container-low p-8 text-center fine-grid relative">
                    <div className="w-14 h-14 rounded-2xl bg-surface-container-highest border border-outline-variant/60 flex items-center justify-center text-primary mb-3 shadow-lg">
                      <span className="material-symbols-outlined text-[28px]">architecture</span>
                    </div>
                    <p className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      Architectural Provenance Specimen
                    </p>
                    <p className="font-mono-code text-mono-code text-on-surface-variant text-xs mt-1">
                      1376 &times; 768 px &bull; DWT-DCT Frequency Protected
                    </p>
                  </div>
                )}
                {/* Floating Protected Badge */}
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-surface-container-lowest/85 backdrop-blur-md border border-outline-variant/80 shadow-lg">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-container" />
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                    <span className="font-label-md text-label-md text-on-surface font-semibold">Protected Image</span>
                  </div>
                </div>

                {/* Top Right Micro Metadata Shelf */}
                <div className="absolute top-4 right-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-lowest/70 backdrop-blur-md border border-outline-variant/40">
                  <span className="font-mono-badge text-mono-badge text-on-surface-variant">DWT-DCT CODES</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: VALUE PROPOSITION / CORE BENEFITS */}
      <section className="border-t border-outline-variant/20 bg-surface-container-lowest py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-space-xl">
          <div className="max-w-2xl mb-14">
            <h2 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl font-bold text-on-surface tracking-tight mb-4">
              Built for creators who care about their work.
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Invisible protection engineered with precision, simplified for everyday creators.
            </p>
          </div>

          {/* Bento Grid Benefits Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 01 */}
            <div className="p-8 rounded-2xl bg-surface-container-low border border-outline-variant/50 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center border border-outline-variant/60 text-primary">
                    <span className="material-symbols-outlined text-[24px]">verified</span>
                  </span>
                  <span className="font-mono-badge text-mono-badge text-on-surface-variant/60">01</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface mb-3">
                  Protect your work
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Add invisible copyright information to your images with zero visible distortion.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-outline-variant/20 flex items-center gap-2 text-primary font-label-md text-label-md">
                <span>Zero perceptual artifacts</span>
              </div>
            </div>

            {/* Card 02 */}
            <div className="p-8 rounded-2xl bg-surface-container-low border border-outline-variant/50 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center border border-outline-variant/60 text-primary">
                    <span className="material-symbols-outlined text-[24px]">key</span>
                  </span>
                  <span className="font-mono-badge text-mono-badge text-on-surface-variant/60">02</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface mb-3">
                  Verify ownership
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Confirm provenance anytime using your secret key and cryptographic validation.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-outline-variant/20 flex items-center gap-2 text-primary font-label-md text-label-md">
                <span>Cryptographic verification</span>
              </div>
            </div>

            {/* Card 03 */}
            <div className="p-8 rounded-2xl bg-surface-container-low border border-outline-variant/50 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center border border-outline-variant/60 text-primary">
                    <span className="material-symbols-outlined text-[24px]">lock</span>
                  </span>
                  <span className="font-mono-badge text-mono-badge text-on-surface-variant/60">03</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface mb-3">
                  Private by design
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Your secret key is never stored on the server. You retain full cryptographic control.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-outline-variant/20 flex items-center gap-2 text-primary font-label-md text-label-md">
                <span>Zero key storage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW DIGIFORGE WORKS (3 SIMPLE STEPS) */}
      <section className="py-20 border-t border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-4 md:px-space-xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl font-bold text-on-surface tracking-tight mb-4">
              How DigiForge works
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Three simple steps to secure your creative output.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-start p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30">
              <span className="w-10 h-10 rounded-xl bg-surface-container text-primary font-mono-badge text-label-md font-bold flex items-center justify-center border border-outline-variant/50 mb-6">
                01
              </span>
              <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface mb-2">
                Upload your image
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Select any PNG, TIFF, or JPEG file you want to protect.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-start p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30">
              <span className="w-10 h-10 rounded-xl bg-surface-container text-primary font-mono-badge text-label-md font-bold flex items-center justify-center border border-outline-variant/50 mb-6">
                02
              </span>
              <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface mb-2">
                Add copyright details
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Enter your name, copyright identifier, and a secret derivation key.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-start p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30">
              <span className="w-10 h-10 rounded-xl bg-surface-container text-primary font-mono-badge text-label-md font-bold flex items-center justify-center border border-outline-variant/50 mb-6">
                03
              </span>
              <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface mb-2">
                Download &amp; verify
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Download your protected image and verify ownership anytime with your key.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CALL TO ACTION BANNER */}
      <section className="py-20 border-t border-outline-variant/20 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-4 md:px-space-xl">
          <div className="p-10 md:p-14 rounded-3xl bg-surface-container-low border border-outline-variant/60 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl font-bold text-on-surface tracking-tight mb-3">
                Your work deserves protection.
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Start securing your images with sovereign cryptographic provenance today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
              <Link
                to="/protect"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary-container text-on-primary font-headline-sm text-label-md font-semibold hover:bg-primary transition-all duration-200"
              >
                <span>Protect an Image</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
              <Link
                to="/user-manual"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-surface-container text-on-surface font-headline-sm text-label-md font-medium border border-outline-variant hover:bg-surface-container-high transition-all duration-200"
              >
                <span>Read Manual</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
