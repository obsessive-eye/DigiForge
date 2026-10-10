import React from 'react';

const UserManual: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-space-xl py-10">
      {/* Title & Subtitle Header */}
      <div className="max-w-3xl mb-10 text-left">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-container-low border border-outline-variant/40 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
          <span className="text-mono-badge font-mono-badge uppercase tracking-wider text-primary">
            DOCUMENTATION &bull; V2.4
          </span>
        </div>
        <h1 className="text-headline-xl font-headline-xl text-on-surface tracking-tight mb-2 font-bold">
          How to use DigiForge
        </h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant">
          Complete guide to protecting, verifying, and preserving image ownership using sovereign cryptographic frequency watermarking.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sticky Sidebar Table of Contents */}
        <aside className="lg:col-span-3 lg:sticky lg:top-24 space-y-6">
          <div className="bg-surface-container-low border border-outline-variant/50 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-outline-variant/30">
              <h2 className="text-headline-sm font-headline-sm text-on-surface text-[14px] uppercase tracking-wider font-semibold">
                Table of Contents
              </h2>
              <span className="text-primary font-mono-badge text-mono-badge">8 SECTIONS</span>
            </div>
            <nav className="space-y-1 text-label-md font-label-md">
              <a
                href="#getting-started"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all"
              >
                <span className="flex items-center gap-2">
                  <span className="font-mono-badge text-[11px] opacity-75">01</span>
                  <span>Getting Started</span>
                </span>
              </a>
              <a
                href="#protecting-an-image"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all"
              >
                <span className="flex items-center gap-2">
                  <span className="font-mono-badge text-[11px] opacity-75">02</span>
                  <span>Protecting an Image</span>
                </span>
              </a>
              <a
                href="#understanding-results"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all"
              >
                <span className="flex items-center gap-2">
                  <span className="font-mono-badge text-[11px] opacity-75">03</span>
                  <span>Understanding Results</span>
                </span>
              </a>
              <a
                href="#verifying-an-image"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all"
              >
                <span className="flex items-center gap-2">
                  <span className="font-mono-badge text-[11px] opacity-75">04</span>
                  <span>Verifying an Image</span>
                </span>
              </a>
              <a
                href="#secret-key-safety"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all"
              >
                <span className="flex items-center gap-2">
                  <span className="font-mono-badge text-[11px] opacity-75">05</span>
                  <span>Secret Key Safety</span>
                </span>
              </a>
              <a
                href="#recommended-workflow"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all"
              >
                <span className="flex items-center gap-2">
                  <span className="font-mono-badge text-[11px] opacity-75">06</span>
                  <span>Recommended Workflow</span>
                </span>
              </a>
              <a
                href="#troubleshooting"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all"
              >
                <span className="flex items-center gap-2">
                  <span className="font-mono-badge text-[11px] opacity-75">07</span>
                  <span>Troubleshooting</span>
                </span>
              </a>
              <a
                href="#how-the-technology-works"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all"
              >
                <span className="flex items-center gap-2">
                  <span className="font-mono-badge text-[11px] opacity-75">08</span>
                  <span>How the Technology Works</span>
                </span>
              </a>
            </nav>
          </div>

          {/* Pro Tip Card */}
          <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-primary font-mono-badge text-mono-badge">
              <span className="material-symbols-outlined text-[16px]">lightbulb</span>
              <span>CREATOR BEST PRACTICE</span>
            </div>
            <p className="text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
              Always store your secret key and original master copies in offline cold storage. Zero keys are saved on the server.
            </p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-9 space-y-12">
          {/* SECTION 1: Getting Started */}
          <section id="getting-started" className="bg-surface-container-low border border-outline-variant/40 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-surface-container text-primary font-mono-badge flex items-center justify-center font-bold">
                01
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                Getting Started
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              DigiForge uses a dual-domain Discrete Wavelet Transform (DWT) and Discrete Cosine Transform (DCT) invisible watermarking engine. It binds copyright provenance directly into high-entropy image frequency bands without introducing perceptible visual noise.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/30">
                <span className="material-symbols-outlined text-primary text-[20px] mb-2">visibility_off</span>
                <h3 className="font-headline-sm text-label-md text-on-surface font-semibold">True Invisibility</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Watermarks reside in middle-frequency coefficients where human visual perception is least sensitive.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/30">
                <span className="material-symbols-outlined text-primary text-[20px] mb-2">shield</span>
                <h3 className="font-headline-sm text-label-md text-on-surface font-semibold">Resilient Integrity</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Watermarks survive compression, subtle crops, and web re-encodings without degradation.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/30">
                <span className="material-symbols-outlined text-primary text-[20px] mb-2">lock</span>
                <h3 className="font-headline-sm text-label-md text-on-surface font-semibold">Zero-Knowledge Key</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  No secret keys are stored in any database. Extraction strictly requires your private key.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 2: Protecting an Image */}
          <section id="protecting-an-image" className="bg-surface-container-low border border-outline-variant/40 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-surface-container text-primary font-mono-badge flex items-center justify-center font-bold">
                02
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                Protecting an Image
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Embedding a watermark takes only a few straightforward steps:
            </p>
            <ol className="list-decimal list-inside space-y-3 font-body-md text-body-md text-on-surface pl-2">
              <li className="leading-relaxed">
                <strong>Upload Master File:</strong> Select a PNG, TIFF, or JPEG image (PNG is recommended for bit-exact preservation).
              </li>
              <li className="leading-relaxed">
                <strong>Enter Author &amp; Registry Metadata:</strong> Supply your Owner Name / Studio and unique Copyright ID.
              </li>
              <li className="leading-relaxed">
                <strong>Provide Secret Key:</strong> Enter a strong secret derivation key to seed the pseudo-random coefficient matrix.
              </li>
              <li className="leading-relaxed">
                <strong>Embed Watermark:</strong> Click Embed Watermark. The system computes DWT-DCT coefficients and stamps the file.
              </li>
              <li className="leading-relaxed">
                <strong>Download &amp; Review:</strong> Download the protected image and inspect your PSNR, SSIM, MSE, and SHA-256 hash manifest.
              </li>
            </ol>
          </section>

          {/* SECTION 3: Understanding Results */}
          <section id="understanding-results" className="bg-surface-container-low border border-outline-variant/40 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-surface-container text-primary font-mono-badge flex items-center justify-center font-bold">
                03
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                Understanding Results
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Every embedding run generates objective forensic metrics comparing the protected image against the original input:
            </p>
            <div className="space-y-3">
              <div className="p-3.5 rounded-lg bg-surface-container border border-outline-variant/30 flex items-start gap-3">
                <span className="font-mono-badge text-primary px-2 py-0.5 rounded bg-surface-container-highest uppercase mt-0.5">PSNR</span>
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface font-semibold">Peak Signal-to-Noise Ratio</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Measures visual fidelity in decibels (dB). Scores above 38 dB indicate imperceptible differences; DigiForge typically scores &gt; 44 dB.
                  </p>
                </div>
              </div>
              <div className="p-3.5 rounded-lg bg-surface-container border border-outline-variant/30 flex items-start gap-3">
                <span className="font-mono-badge text-primary px-2 py-0.5 rounded bg-surface-container-highest uppercase mt-0.5">SSIM</span>
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface font-semibold">Structural Similarity Index</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Evaluates structural pattern, luminance, and contrast consistency on a scale from 0 to 1. Values exceeding 0.98 indicate near-perfect perceptual fidelity.
                  </p>
                </div>
              </div>
              <div className="p-3.5 rounded-lg bg-surface-container border border-outline-variant/30 flex items-start gap-3">
                <span className="font-mono-badge text-primary px-2 py-0.5 rounded bg-surface-container-highest uppercase mt-0.5">MSE</span>
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface font-semibold">Mean Squared Error</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Computes the average squared pixel difference between original and watermarked arrays. Lower values reflect minimal distortion.
                  </p>
                </div>
              </div>
              <div className="p-3.5 rounded-lg bg-surface-container border border-outline-variant/30 flex items-start gap-3">
                <span className="font-mono-badge text-primary px-2 py-0.5 rounded bg-surface-container-highest uppercase mt-0.5">SHA-256</span>
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface font-semibold">Cryptographic Hash Manifest</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Bit-level digest of the protected file at moment of generation. Any posterior tampering alters this hash.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: Verifying an Image */}
          <section id="verifying-an-image" className="bg-surface-container-low border border-outline-variant/40 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-surface-container text-primary font-mono-badge flex items-center justify-center font-bold">
                04
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                Verifying an Image
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Verification uses blind extraction &mdash; the original unmarked master is never needed:
            </p>
            <ol className="list-decimal list-inside space-y-3 font-body-md text-body-md text-on-surface pl-2">
              <li className="leading-relaxed">
                <strong>Upload Suspect File:</strong> Select the image file you wish to verify.
              </li>
              <li className="leading-relaxed">
                <strong>Enter Tracking &amp; Key Details:</strong> Supply the Image ID and the exact secret key used when stamping.
              </li>
              <li className="leading-relaxed">
                <strong>Execute Verification:</strong> Click Verify. The pipeline transforms the image into wavelet subbands and decrypts the embedded payload.
              </li>
              <li className="leading-relaxed">
                <strong>Inspect Forensic Report:</strong> Check Copyright Status (VERIFIED / NOT_VERIFIED), Correlation Confidence, and SHA-256 Integrity Status (UNCHANGED / FILE_CHANGED).
              </li>
            </ol>
          </section>

          {/* SECTION 5: Secret Key Safety */}
          <section id="secret-key-safety" className="bg-surface-container-low border border-outline-variant/40 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-surface-container text-primary font-mono-badge flex items-center justify-center font-bold">
                05
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                Secret Key Safety
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Your secret key is the cryptographic pillar of your copyright claim:
            </p>
            <ul className="list-disc list-inside space-y-2 font-body-md text-body-md text-on-surface pl-2">
              <li><strong>Zero Server Storage:</strong> DigiForge does not record or cache your secret key in any database.</li>
              <li><strong>Irrecoverable Without Key:</strong> Without the key, the watermark cannot be recovered, even by server administrators.</li>
              <li><strong>Secure Vaulting:</strong> Store your keys in a password manager or physical vault alongside your media archives.</li>
              <li><strong>Granular Keys:</strong> Use distinct secret keys for different creative client catalogs to prevent cross-collection inference.</li>
            </ul>
          </section>

          {/* SECTION 6: Recommended Workflow */}
          <section id="recommended-workflow" className="bg-surface-container-low border border-outline-variant/40 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-surface-container text-primary font-mono-badge flex items-center justify-center font-bold">
                06
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                Recommended Workflow
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Follow this production pipeline for complete provenance lifecycle management:
            </p>
            <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/40 font-mono-code text-on-surface text-xs leading-relaxed overflow-x-auto">
              [Master Image] &rarr; [DigiForge Embed + Secret Key] &rarr; [Protected Asset + SHA-256 Hash]
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&darr;
              <br />
              [Public Distribution / Social / Web] &rarr; [Suspect File Found] &rarr; [DigiForge Verify] &rarr; [Bit-Exact Ownership Proven]
            </div>
          </section>

          {/* SECTION 7: Troubleshooting */}
          <section id="troubleshooting" className="bg-surface-container-low border border-outline-variant/40 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-surface-container text-primary font-mono-badge flex items-center justify-center font-bold">
                07
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                Troubleshooting
              </h2>
            </div>
            <div className="space-y-3 font-body-md text-body-md text-on-surface">
              <div className="p-3.5 rounded-lg bg-surface-container border border-outline-variant/30">
                <h3 className="font-label-md text-label-md text-primary font-semibold">Upload or Decode Fails</h3>
                <p className="text-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Ensure the image is in PNG, JPEG, or TIFF format, under 10MB in file size, and has minimum dimensions of 64&times;64 pixels.
                </p>
              </div>
              <div className="p-3.5 rounded-lg bg-surface-container border border-outline-variant/30">
                <h3 className="font-label-md text-label-md text-primary font-semibold">Watermark Not Detected During Verification</h3>
                <p className="text-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Double check the secret key and Image ID. If even a single character in the key differs, extraction pseudorandomness cannot realign.
                </p>
              </div>
              <div className="p-3.5 rounded-lg bg-surface-container border border-outline-variant/30">
                <h3 className="font-label-md text-label-md text-primary font-semibold">SHA-256 Status Shows &quot;FILE_CHANGED&quot;</h3>
                <p className="text-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  This indicates the image was re-compressed or edited after protection. Because DigiForge uses frequency embedding, your watermark may still be successfully verified!
                </p>
              </div>
              <div className="p-3.5 rounded-lg bg-surface-container border border-outline-variant/30">
                <h3 className="font-label-md text-label-md text-primary font-semibold">Backend Offline Error</h3>
                <p className="text-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Confirm that the FastAPI server is running locally on port 8000 or the configured VITE_API_BASE_URL.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 8: How the Technology Works */}
          <section id="how-the-technology-works" className="bg-surface-container-low border border-outline-variant/40 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-surface-container text-primary font-mono-badge flex items-center justify-center font-bold">
                08
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                How the Technology Works
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              DigiForge operates in the transform frequency domain rather than altering spatial pixel values directly:
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              1. <strong>Discrete Wavelet Transform (DWT):</strong> Decomposes the image luminance channel into approximation (LL) and detail subbands (LH, HL, HH).
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              2. <strong>Discrete Cosine Transform (DCT):</strong> Applied across 8&times;8 blocks in the selected subband to concentrate energy into frequency components.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              3. <strong>Pseudo-Random Key Modulation:</strong> Your secret key seeds a deterministic pseudo-random sequence mapping watermark bits into mid-frequency coefficients.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              4. <strong>Inverse Transforms (IDCT &amp; IDWT):</strong> Reconstruct the spatial image matrix with zero perceptible distortion while ensuring high resilience against attacks.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default UserManual;
