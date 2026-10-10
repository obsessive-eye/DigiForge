import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { checkHealth } from '../services/api';

const Dashboard: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

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
    <div className="w-full max-w-7xl mx-auto px-4 md:px-space-xl py-10 space-y-12">
      {/* ================= PAGE HERO HEADER ================= */}
      <section className="flex flex-col gap-3 max-w-3xl">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isOnline === true
                ? 'bg-tertiary-fixed-dim animate-pulse'
                : isOnline === false
                ? 'bg-error'
                : 'bg-yellow-400 animate-pulse'
            }`}
          />
          <span className="font-mono-badge text-mono-badge text-on-surface-variant uppercase tracking-wider">
            {isOnline === true ? 'FastAPI Operational &bull; DWT+DCT Enclave' : isOnline === false ? 'Backend Offline' : 'Connecting Engine...'}
          </span>
        </div>
        <h1 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-surface tracking-tight font-bold">
          Welcome to DigiForge
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Choose an action below to protect an original file or verify ownership of an existing image.
        </p>
      </section>

      {/* ================= PRIMARY ACTION WORKSPACE CARDS ================= */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* CARD 1: PROTECT AN IMAGE */}
        <div className="group relative flex flex-col justify-between p-8 rounded-2xl bg-surface-container-low border border-outline-variant/60 hover:border-primary/50 transition-all duration-200">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center border border-outline-variant/60 text-primary">
                <span className="material-symbols-outlined text-2xl">verified_user</span>
              </div>
              <span className="text-mono-badge font-mono-badge px-2.5 py-1 rounded bg-surface-container text-on-surface-variant border border-outline-variant/40 uppercase">
                EMBED PIPELINE
              </span>
            </div>

            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-2 font-semibold">
                Protect an Image
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Embed an invisible, robust watermark into your master image using dual-domain frequency transformation.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-tertiary-fixed-dim/15 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim text-sm">check</span>
                </div>
                <span className="font-body-md text-body-md text-on-surface">Invisible DWT-DCT watermark embedding</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-tertiary-fixed-dim/15 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim text-sm">check</span>
                </div>
                <span className="font-body-md text-body-md text-on-surface">PSNR, SSIM and MSE image fidelity metrics</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-tertiary-fixed-dim/15 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim text-sm">check</span>
                </div>
                <span className="font-body-md text-body-md text-on-surface">Downloadable tamper-resistant protected image</span>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <Link
              to="/protect"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary-container text-on-primary font-headline-sm text-label-md font-semibold hover:bg-primary transition-all duration-150 shadow-sm"
            >
              <span>Protect Image</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* CARD 2: VERIFY OWNERSHIP */}
        <div className="group relative flex flex-col justify-between p-8 rounded-2xl bg-surface-container-low border border-outline-variant/60 hover:border-primary/50 transition-all duration-200">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center border border-outline-variant/60 text-primary">
                <span className="material-symbols-outlined text-2xl">fingerprint</span>
              </div>
              <span className="text-mono-badge font-mono-badge px-2.5 py-1 rounded bg-surface-container text-on-surface-variant border border-outline-variant/40 uppercase">
                EXTRACT PIPELINE
              </span>
            </div>

            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-2 font-semibold">
                Verify Ownership
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Validate copyright provenance and bit-exact integrity by extracting watermark coefficients with your secret key.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-tertiary-fixed-dim/15 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim text-sm">check</span>
                </div>
                <span className="font-body-md text-body-md text-on-surface">Blind watermark extraction using secret key</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-tertiary-fixed-dim/15 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim text-sm">check</span>
                </div>
                <span className="font-body-md text-body-md text-on-surface">SHA-256 bit-level integrity verification</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-tertiary-fixed-dim/15 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim text-sm">check</span>
                </div>
                <span className="font-body-md text-body-md text-on-surface">Forensic validation report &amp; similarity score</span>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <Link
              to="/verify"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-surface-container border border-outline-variant text-on-surface font-headline-sm text-label-md font-medium hover:bg-surface-container-high hover:border-outline transition-all duration-150"
            >
              <span>Verify Image</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS SUMMARY (3-STEP WALKTHROUGH) ================= */}
      <section className="flex flex-col gap-6 pt-4">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">How DigiForge Works</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Three friction-free steps to sovereign creative ownership</p>
          </div>
          <span className="hidden sm:inline-flex text-mono-badge font-mono-badge text-on-surface-variant/80 uppercase">
            Pipeline Architecture
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="flex flex-col gap-3 p-6 rounded-xl bg-surface-container-low border border-outline-variant/40">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-surface-container text-primary font-mono-badge text-mono-badge flex items-center justify-center border border-outline-variant/60 font-bold">
                01
              </span>
              <span className="material-symbols-outlined text-outline">upload_file</span>
            </div>
            <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Select &amp; Anchor</h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Upload your master file. DigiForge maps high-entropy frequency domains without touching perceptible visual channels.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col gap-3 p-6 rounded-xl bg-surface-container-low border border-outline-variant/40">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-surface-container text-primary font-mono-badge text-mono-badge flex items-center justify-center border border-outline-variant/60 font-bold">
                02
              </span>
              <span className="material-symbols-outlined text-outline">key</span>
            </div>
            <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Generate Secret Key</h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              A distinct cryptographic seed binds your identity to the media coefficients. Zero keys or raw data ever leave your custody.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col gap-3 p-6 rounded-xl bg-surface-container-low border border-outline-variant/40">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-surface-container text-primary font-mono-badge text-mono-badge flex items-center justify-center border border-outline-variant/60 font-bold">
                03
              </span>
              <span className="material-symbols-outlined text-outline">verified</span>
            </div>
            <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Publish &amp; Prove</h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Share online with certainty. Even if scraped, compressed, or cropped, blind extraction recovers bit-exact proof of ownership.
            </p>
          </div>
        </div>
      </section>

      {/* ================= QUICK REFERENCE PANEL ================= */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 rounded-xl bg-surface-container-low border border-outline-variant/50">
        {/* Supported Formats Section */}
        <div className="flex flex-col gap-3 lg:border-r lg:border-outline-variant/40 lg:pr-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-base">image</span>
            <span className="font-label-md text-label-md text-on-surface font-medium">Supported Formats</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="px-2.5 py-1 rounded bg-surface-container border border-outline-variant text-on-surface font-mono-code text-mono-code">
              PNG <span className="text-tertiary-fixed-dim text-mono-badge">(Recommended)</span>
            </span>
            <span className="px-2.5 py-1 rounded bg-surface-container border border-outline-variant text-on-surface-variant font-mono-code text-mono-code">
              TIFF
            </span>
            <span className="px-2.5 py-1 rounded bg-surface-container border border-outline-variant text-on-surface-variant font-mono-code text-mono-code">
              JPEG
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant/80">
            Lossless formats preserve discrete cosine and wavelet frequency headers indefinitely.
          </p>
        </div>

        {/* Secret Key Best Practice Note */}
        <div className="lg:col-span-2 flex flex-col justify-center gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-base">info</span>
            <span className="font-label-md text-label-md text-on-surface font-medium">Secret Key Best Practice</span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Always store your secret key securely &mdash; it is the only way to verify embedded ownership.
          </p>
          <div className="flex items-center gap-4 text-label-sm font-label-sm text-outline pt-1">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">encrypted</span>
              Client-side key derivation
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">storage</span>
              Zero server key caching
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
