import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-space-xl py-10 space-y-16">
      {/* HERO HEADER: Editorial & Precise */}
      <section className="relative pt-6 pb-8 overflow-hidden">
        <div className="max-w-4xl flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 self-start bg-surface-container-low border border-outline-variant/60 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-mono-badge font-mono-badge text-primary uppercase">
              Cryptographic Integrity Engine
            </span>
            <span className="text-outline-variant text-label-sm">&bull;</span>
            <span className="text-label-sm font-label-sm text-on-surface-variant">
              C2PA Compatible Standards
            </span>
          </div>

          <h1 className="text-headline-xl md:text-display-lg font-headline-xl md:font-display-lg tracking-tight text-on-surface font-bold">
            About DigiForge
          </h1>

          <p className="text-body-lg font-body-lg text-secondary max-w-3xl leading-relaxed">
            Sovereign cryptographic provenance and invisible watermarking engineered for creators, photographers, and studios.
          </p>

          {/* Key Thesis Metric Chips */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-outline-variant/30">
            <div className="flex flex-col">
              <span className="text-mono-badge font-mono-badge text-on-surface-variant uppercase">
                Embedding Model
              </span>
              <span className="text-headline-sm font-headline-sm text-on-surface mt-1 font-semibold">
                DWT + DCT Bands
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-mono-badge font-mono-badge text-on-surface-variant uppercase">
                Key Architecture
              </span>
              <span className="text-headline-sm font-headline-sm text-primary mt-1 font-semibold">
                Zero-Knowledge
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-mono-badge font-mono-badge text-on-surface-variant uppercase">
                Persistence
              </span>
              <span className="text-headline-sm font-headline-sm text-on-surface mt-1 font-semibold">
                Survives Re-Encode
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-mono-badge font-mono-badge text-on-surface-variant uppercase">
                Protocol
              </span>
              <span className="text-headline-sm font-headline-sm text-on-surface mt-1 font-semibold">
                Non-Speculative
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: THE MISSION & THE PROBLEM */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-mono-badge font-mono-badge text-primary uppercase">01 / The Core Dilemma</span>
          <h2 className="text-headline-lg font-headline-lg text-on-surface font-bold">
            The Fragility of Superficial Protection
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/40 space-y-3">
            <span className="material-symbols-outlined text-error text-2xl">delete_sweep</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Metadata Stripping
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Standard EXIF, IPTC, and XMP metadata fields are routinely stripped by social media platforms and CDNs to reduce payload overhead and privacy leakage. Once stripped, provenance is irretrievably lost.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/40 space-y-3">
            <span className="material-symbols-outlined text-error text-2xl">auto_fix_normal</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Visible Watermark Defeat
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Visible logos and overlays compromise artistic aesthetics and are trivially removed by modern content-aware inpainting and generative AI models in fractions of a second.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW FREQUENCY EMBEDDING OPERATES */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-mono-badge font-mono-badge text-primary uppercase">02 / Technological Foundation</span>
          <h2 className="text-headline-lg font-headline-lg text-on-surface font-bold">
            How Frequency Embedding Operates
          </h2>
        </div>

        <div className="p-8 rounded-2xl bg-surface-container-low border border-outline-variant/50 space-y-6">
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            DigiForge rejects superficial overlays and file headers. Instead, it embeds identity mathematics directly into the frequency representation of the image:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 p-4 rounded-xl bg-surface-container border border-outline-variant/30">
              <span className="font-mono-badge text-primary font-bold text-xs">STEP 01</span>
              <h3 className="font-headline-sm text-label-md text-on-surface font-semibold">Wavelet Decomposition</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                The image is converted to luminance space and decomposed into 2D DWT subbands (LL, LH, HL, HH).
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-surface-container border border-outline-variant/30">
              <span className="font-mono-badge text-primary font-bold text-xs">STEP 02</span>
              <h3 className="font-headline-sm text-label-md text-on-surface font-semibold">DCT Block Quantization</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                8&times;8 DCT transforms middle frequencies where human eyes cannot detect subtle variations.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-surface-container border border-outline-variant/30">
              <span className="font-mono-badge text-primary font-bold text-xs">STEP 03</span>
              <h3 className="font-headline-sm text-label-md text-on-surface font-semibold">Inverse Reconstruction</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Inverse IDCT and IDWT reconstruct a master file with indistinguishable visual fidelity (PSNR &gt; 44 dB).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: DUAL-TIER VERIFICATION ARCHITECTURE */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-mono-badge font-mono-badge text-primary uppercase">03 / Forensic Architecture</span>
          <h2 className="text-headline-lg font-headline-lg text-on-surface font-bold">
            Dual-Tier Verification Architecture
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/40 space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-2xl">verified</span>
              <h3 className="font-headline-sm text-headline-sm font-semibold">Tier 1: Perceptual Robustness</h3>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              If an image is compressed, cropped, or slightly scaled, the frequency watermark remains intact. Blind extraction decodes the author identity and copyright ID without requiring the original unmarked file.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/40 space-y-3">
            <div className="flex items-center gap-2 text-tertiary">
              <span className="material-symbols-outlined text-2xl">fingerprint</span>
              <h3 className="font-headline-sm text-headline-sm font-semibold">Tier 2: Cryptographic Rigor</h3>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              SHA-256 hash manifest verification checks whether pixel coefficients were modified bit-by-bit. This allows DigiForge to distinguish between pristine masters and re-saved or edited files.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: ETHICAL BOUNDARIES & CALL TO ACTION */}
      <section className="p-8 md:p-12 rounded-3xl bg-surface-container-low border border-outline-variant/60 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="max-w-xl">
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mb-3">
            Built on Open, Auditable Fundamentals
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            DigiForge avoids proprietary DRM locks or speculative blockchains. It provides transparent, reproducible cryptographic provenance for digital creators worldwide.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
          <Link
            to="/protect"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary-container text-on-primary font-headline-sm text-label-md font-semibold hover:bg-primary transition-all duration-200"
          >
            <span>Open Workspace</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
          <Link
            to="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-surface-container text-on-surface font-headline-sm text-label-md font-medium border border-outline-variant hover:bg-surface-container-high transition-all duration-200"
          >
            <span>Dashboard</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
