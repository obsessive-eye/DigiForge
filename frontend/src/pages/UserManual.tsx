// src/pages/UserManual.tsx
import React from 'react';
import { BookOpen } from 'lucide-react';

const UserManual: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-cyan flex items-center mb-8">
        <BookOpen className="mr-2" size={32} />
        User Manual
      </h1>

      {/* Table of Contents */}
      <nav className="mb-8">
        <ul className="list-disc list-inside space-y-1 text-cyan">
          <li><a href="#getting-started" className="hover:underline">Getting Started</a></li>
          <li><a href="#protecting-an-image" className="hover:underline">Protecting an Image</a></li>
          <li><a href="#understanding-results" className="hover:underline">Understanding Results</a></li>
          <li><a href="#verifying-an-image" className="hover:underline">Verifying an Image</a></li>
          <li><a href="#secret-key-safety" className="hover:underline">Secret Key Safety</a></li>
          <li><a href="#recommended-workflow" className="hover:underline">Recommended Workflow</a></li>
          <li><a href="#troubleshooting" className="hover:underline">Troubleshooting</a></li>
          <li><a href="#how-the-technology-works" className="hover:underline">How the Technology Works</a></li>
        </ul>
      </nav>

      {/* Sections */}
      <section id="getting-started" className="mb-8">
        <h2 className="text-2xl font-semibold text-cyan mb-3">Getting Started</h2>
        <p className="text-grayLight mb-2">
          DigiForge uses a DWT + DCT based invisible watermark embedding algorithm.
          It provides copyright protection and integrity verification without visibly altering the image.
        </p>
        <p className="text-grayLight mb-2">
          The typical workflow is to first <strong>protect</strong> an image (embed the watermark) and later <strong>verify</strong> the watermark and integrity of the protected image.
        </p>

      </section>

      <section id="protecting-an-image" className="mb-8">
        <h2 className="text-2xl font-semibold text-cyan mb-3">Protecting an Image</h2>
        <ol className="list-decimal list-inside text-grayLight space-y-1">
          <li>Select or upload the original image.</li>
          <li>Enter the watermark text (e.g., copyright notice).</li>
          <li>Provide a secret key – this key must be kept private.</li>
          <li>Click the <strong>Protect Image</strong> button to embed the watermark.</li>
          <li>When the operation completes, download the protected image.</li>
          <li>Review the displayed metrics (PSNR, SSIM, MSE, SHA‑256 hash).</li>
        </ol>
      </section>

      <section id="understanding-results" className="mb-8">
        <h2 className="text-2xl font-semibold text-cyan mb-3">Understanding Results</h2>
        <ul className="list-disc list-inside text-grayLight space-y-1">
          <li><strong>PSNR</strong>: Peak Signal‑to‑Noise Ratio – higher values mean the protected image is visually closer to the original.</li>
          <li><strong>SSIM</strong>: Structural Similarity Index – measures perceptual similarity; values close to 1 are excellent.</li>
          <li><strong>MSE</strong>: Mean Squared Error – lower values indicate less distortion.</li>
          <li><strong>SHA‑256</strong>: Cryptographic hash of the protected image – useful to detect later modifications.</li>
          <li><strong>Verification result</strong>: Indicates whether the embedded watermark was correctly recovered.</li>
        </ul>
      </section>

      <section id="verifying-an-image" className="mb-8">
        <h2 className="text-2xl font-semibold text-cyan mb-3">Verifying an Image</h2>
        <ol className="list-decimal list-inside text-grayLight space-y-1">
          <li>Select the protected image file.</li>
          <li>Enter the same secret key used during protection.</li>
          <li>Click the <strong>Verify</strong> button.</li>
          <li>Review the verification outcome and the integrity hash.</li>
        </ol>
        <p className="text-grayLight mt-2">
          The secret key must match the one used for embedding; otherwise the watermark cannot be recovered.
        </p>
      </section>

      <section id="secret-key-safety" className="mb-8">
        <h2 className="text-2xl font-semibold text-cyan mb-3">Secret Key Safety</h2>
        <ul className="list-disc list-inside text-grayLight space-y-1">
          <li>Never expose the secret key in source code or public repositories.</li>
          <li>Use a strong, random key for each image or project.</li>
          <li>Store the key separately from the protected image.</li>
          <li>A wrong key will not recover the watermark, preserving security.</li>
        </ul>
      </section>

      <section id="recommended-workflow" className="mb-8">
        <h2 className="text-2xl font-semibold text-cyan mb-3">Recommended Workflow</h2>
        <pre className="bg-navy p-4 rounded text-grayLight whitespace-pre-wrap">
Original Image
      ↓
Enter Watermark
      ↓
Enter Secret Key
      ↓
Protect Image
      ↓
Protected Image
      ↓
Verify Later
      ↓
Check Watermark + Integrity
        </pre>
      </section>

      <section id="troubleshooting" className="mb-8">
        <h2 className="text-2xl font-semibold text-cyan mb-3">Troubleshooting</h2>
        <ul className="list-disc list-inside text-grayLight space-y-1">
          <li>Image upload fails – ensure the file is a supported format (PNG, JPEG) and under the size limit.</li>
          <li>Wrong secret key – verification will report failure; double‑check the key you used.</li>
          <li>Watermark cannot be verified – the image may have been altered (high compression, cropping) beyond the algorithm’s robustness.</li>
          <li>Backend unavailable – confirm the FastAPI server is running at the configured URL.</li>
          <li>Protected image looks different – minor visual differences are expected; check PSNR/SSIM values.</li>
        </ul>
      </section>

      <section id="how-the-technology-works" className="mb-8">
        <h2 className="text-2xl font-semibold text-cyan mb-3">How the Technology Works</h2>
        <p className="text-grayLight">
          The system operates in the transform domain using a combination of Discrete Wavelet Transform (DWT) and Discrete Cosine Transform (DCT).
          The watermark text is encoded into the frequency coefficients, then the inverse transforms reconstruct a protected image where the watermark is invisible to the human eye.
        </p>
        <p className="text-grayLight mt-2">
          During verification, the same transforms are applied to the suspect image, the embedded bits are extracted, and the result is compared to the original watermark using a similarity threshold.
        </p>
      </section>
    </div>
  );
};

export default UserManual;
