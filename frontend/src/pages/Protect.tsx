import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { embedWatermark, downloadProtectedImage } from '../services/api';
import type { EmbedResponse } from '../types/watermark';

const Protect: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [owner, setOwner] = useState('');
  const [copyright, setCopyright] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [strength] = useState(0.1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EmbedResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  const handleFileChange = (selected: File) => {
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
    setResult(null);
    setError(null);
    setCopiedId(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    setCopiedId(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !owner || !copyright || !secretKey) {
      setError('Please provide an image, owner name, copyright ID, and secret key.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const resp = await embedWatermark(file, owner, copyright, secretKey, strength);
      setResult(resp);
    } catch (err: any) {
      setError(err.message || 'Watermark embedding failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!result) return;
    try {
      const blob = await downloadProtectedImage(result.image_id);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${result.image_id}_protected.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(err.message || 'Download failed.');
    }
  };

  const handleCopyImageId = async () => {
    if (!result?.image_id) return;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(result.image_id);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = result.image_id;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } catch (err) {
      console.warn('Clipboard copy failed:', err);
    }
  };

  const handleCopyHash = () => {
    if (!result?.sha256) return;
    navigator.clipboard.writeText(result.sha256);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-space-xl py-10">
      {/* Title & Subtitle Header */}
      <div className="max-w-3xl mb-10 text-left">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-container-low border border-outline-variant/40 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
          <span className="text-mono-badge font-mono-badge uppercase tracking-wider text-primary">
            C2PA Sovereign Enclave
          </span>
        </div>
        <h1 className="text-headline-xl font-headline-xl text-on-surface tracking-tight mb-2 font-bold">
          Protect Image
        </h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant">
          Add invisible copyright information into image frequency coefficients without perceptual loss.
        </p>
      </div>

      {/* WORKFLOW GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Input Workflow Steps */}
        <section className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* STEP 1: Upload Image */}
            <div className="bg-surface-container-low rounded-xl border border-outline-variant/40 p-6 custom-inner-highlight">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-surface-container-highest text-primary-container text-label-md font-label-md flex items-center justify-center font-bold">
                    1
                  </span>
                  <h2 className="text-headline-sm font-headline-sm text-on-surface font-semibold">Upload Image</h2>
                </div>
                <span className="text-label-sm font-label-sm text-on-surface-variant px-2 py-0.5 rounded bg-surface-container border border-outline-variant/30">
                  PNG / TIFF / JPG
                </span>
              </div>

              {!file ? (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-outline-variant/60 hover:border-primary-container/70 rounded-xl p-8 text-center cursor-pointer transition-all duration-200 bg-surface-container-lowest/40 hover:bg-surface-container-lowest/80 group relative"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    disabled={loading}
                  />
                  <div className="w-12 h-12 mx-auto rounded-full bg-surface-container-high border border-outline-variant/50 flex items-center justify-center text-on-surface-variant group-hover:text-primary-container group-hover:border-primary-container/40 transition-colors mb-3">
                    <span className="material-symbols-outlined text-[24px]">cloud_upload</span>
                  </div>
                  <p className="text-body-md font-body-md font-medium text-on-surface mb-1">
                    Choose an image to protect
                  </p>
                  <p className="text-body-sm font-body-sm text-on-surface-variant">
                    Drag your image here or browse files (PNG, TIFF, JPG up to 10MB)
                  </p>
                </div>
              ) : (
                <div className="bg-surface-container rounded-lg p-3.5 border border-outline-variant/40 flex items-center gap-4">
                  <div className="w-20 h-16 rounded-md overflow-hidden bg-surface-container-lowest border border-outline-variant/30 flex-shrink-0 relative">
                    {previewUrl && (
                      <img
                        alt="Uploaded preview"
                        className="w-full h-full object-cover"
                        src={previewUrl}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-body-md font-body-md font-medium text-on-surface truncate">{file.name}</p>
                      <span className="material-symbols-outlined text-primary-container text-[16px]">check_circle</span>
                    </div>
                    <p className="text-mono-code font-mono-code text-on-surface-variant mt-0.5">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB &bull; {file.type || 'image/png'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-label-md font-label-md text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
                      Replace
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                        className="hidden"
                        disabled={loading}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-label-md font-label-md text-error hover:text-error-container transition-colors"
                      disabled={loading}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 2: Copyright & Protection Details */}
            <div className="bg-surface-container-low rounded-xl border border-outline-variant/40 p-6 custom-inner-highlight">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-7 h-7 rounded-full bg-surface-container-highest text-primary-container text-label-md font-label-md flex items-center justify-center font-bold">
                  2
                </span>
                <h2 className="text-headline-sm font-headline-sm text-on-surface font-semibold">
                  Copyright &amp; Protection Details
                </h2>
              </div>

              <div className="space-y-4">
                {/* Owner Name Field */}
                <div>
                  <label className="block text-label-md font-label-md text-on-surface-variant mb-1.5" htmlFor="owner-name">
                    Owner Name / Author Identifier
                  </label>
                  <div className="relative">
                    <input
                      id="owner-name"
                      type="text"
                      placeholder="Owner Name"
                      value={owner}
                      onChange={(e) => setOwner(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant/50 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-lg px-3.5 py-2.5 text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/60 transition-colors"
                      required
                      disabled={loading}
                    />
                    <span className="material-symbols-outlined absolute right-3 top-2.5 text-outline text-[20px]">
                      badge
                    </span>
                  </div>
                </div>

                {/* Copyright ID Field */}
                <div>
                  <label className="block text-label-md font-label-md text-on-surface-variant mb-1.5" htmlFor="copyright-id">
                    Copyright ID / Registry Identifier
                  </label>
                  <div className="relative">
                    <input
                      id="copyright-id"
                      type="text"
                      placeholder="Copyright ID"
                      value={copyright}
                      onChange={(e) => setCopyright(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant/50 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-lg px-3.5 py-2.5 text-mono-code font-mono-code text-on-surface placeholder:text-on-surface-variant/60 transition-colors"
                      required
                      disabled={loading}
                    />
                    <span className="material-symbols-outlined absolute right-3 top-2.5 text-outline text-[20px]">
                      fingerprint
                    </span>
                  </div>
                </div>

                {/* Secret Key Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-label-md font-label-md text-on-surface-variant" htmlFor="secret-key">
                      Secret Derivation Key
                    </label>
                    <span className="text-mono-badge font-mono-badge text-tertiary">Keep Private</span>
                  </div>
                  <div className="relative">
                    <input
                      id="secret-key"
                      type={showKey ? 'text' : 'password'}
                      placeholder="Secret Key"
                      value={secretKey}
                      onChange={(e) => setSecretKey(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant/50 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-lg px-3.5 py-2.5 text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/60 tracking-wider transition-colors pr-10 font-mono-code"
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      aria-label="Toggle Secret Key Visibility"
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-3 top-2.5 text-outline hover:text-on-surface transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showKey ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                  <div className="flex items-start gap-2 mt-2">
                    <span className="material-symbols-outlined text-[16px] text-primary-container mt-0.5 flex-shrink-0">
                      info
                    </span>
                    <p className="text-body-sm font-body-sm text-on-surface-variant">
                      Keep your secret key private. You will need the exact same key to verify ownership later.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message Alert */}
            {error && (
              <div className="p-4 rounded-xl bg-error-container/20 border border-error/40 flex items-center gap-3 text-error">
                <span className="material-symbols-outlined text-[20px]">error</span>
                <span className="text-body-md font-body-md">{error}</span>
              </div>
            )}

            {/* STEP 3: Action Trigger Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || !file}
                className="w-full bg-primary-container hover:bg-primary text-on-primary font-headline-sm text-headline-sm font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary-container/10 active:opacity-90 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                    <span>Protecting Image...</span>
                  </>
                ) : (
                  <>
                    <span>Protect Image</span>
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        {/* RIGHT COLUMN: Output & Technical Verification Card */}
        <section className="lg:col-span-5 space-y-6">
          <div className="bg-surface-container-low rounded-xl border border-outline-variant/40 p-6 custom-inner-highlight">
            <div className="flex items-center justify-between mb-4">
              <span className="text-label-md font-label-md font-semibold text-on-surface">Embed Pipeline Output</span>
              {result ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-tertiary-container/10 border border-tertiary-container/30 text-tertiary text-mono-badge font-mono-badge uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                  Live Signature Stamped
                </span>
              ) : (
                <span className="text-mono-badge font-mono-badge text-on-surface-variant/70 uppercase">
                  Awaiting Embed
                </span>
              )}
            </div>

            {/* Image Preview Container */}
            <div className="relative rounded-lg overflow-hidden border border-outline-variant/50 bg-surface-container-lowest">
              {result && previewUrl ? (
                <img
                  alt="Protected specimen with embedded copyright watermark"
                  className="w-full h-56 object-cover object-center"
                  src={previewUrl}
                />
              ) : previewUrl ? (
                <img
                  alt="Pending image preview"
                  className="w-full h-56 object-cover object-center opacity-75"
                  src={previewUrl}
                />
              ) : (
                <div className="w-full h-56 flex flex-col items-center justify-center text-on-surface-variant gap-2 p-6 text-center">
                  <span className="material-symbols-outlined text-4xl text-outline-variant">image</span>
                  <p className="text-body-sm font-body-sm">
                    Upload an image and run Embed Watermark to view processed results and forensic metrics.
                  </p>
                </div>
              )}

              {result && (
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-surface-container-lowest/90 via-surface-container-lowest/60 to-transparent flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-container text-[18px]">verified_user</span>
                    <span className="text-label-sm font-label-sm text-on-surface font-medium">Protected &amp; Proven</span>
                  </div>
                  <span className="text-mono-badge font-mono-badge text-on-surface-variant bg-surface-container-highest/80 px-2 py-0.5 rounded">
                    DWT-DCT v2.4
                  </span>
                </div>
              )}
            </div>

            {/* Actions & Prominent Result Details when Result Available */}
            {result ? (
              <div className="mt-5 space-y-5">
                {/* 1. Prominent Success Panel with Image ID */}
                <div className="p-5 rounded-xl bg-tertiary-container/10 border border-tertiary-container/40 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-tertiary/15 flex items-center justify-center flex-shrink-0 text-tertiary">
                      <span className="material-symbols-outlined text-[22px]">verified_user</span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-tertiary font-bold">
                        Protection Successful
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface mt-0.5">
                        Your image has been protected successfully.
                      </p>
                    </div>
                  </div>

                  {/* Prominent Image ID Shelf with Copy Button */}
                  <div className="p-3.5 rounded-lg bg-surface-container-lowest border border-outline-variant/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-badge text-mono-badge text-on-surface-variant uppercase tracking-wider">
                        Image Identifier (Image ID)
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyImageId}
                        className="text-label-sm font-label-sm text-primary hover:text-primary-container flex items-center gap-1.5 transition-colors px-2 py-0.5 rounded bg-surface-container border border-outline-variant/40"
                        title="Copy Image ID"
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {copiedId ? 'check' : 'content_copy'}
                        </span>
                        <span>{copiedId ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>

                    <div className="flex items-center">
                      <p className="font-mono-code text-mono-code text-primary text-sm break-all select-all font-semibold tracking-wide">
                        {result.image_id}
                      </p>
                    </div>
                  </div>

                  {/* Protected Image Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
                    {result.owner_name && (
                      <div className="p-2.5 rounded bg-surface-container/60 border border-outline-variant/30">
                        <span className="text-on-surface-variant font-mono-badge block text-[10px] uppercase">
                          Owner Name
                        </span>
                        <span className="text-on-surface font-medium truncate block mt-0.5">
                          {result.owner_name}
                        </span>
                      </div>
                    )}

                    {result.copyright_id && (
                      <div className="p-2.5 rounded bg-surface-container/60 border border-outline-variant/30">
                        <span className="text-on-surface-variant font-mono-badge block text-[10px] uppercase">
                          Copyright ID
                        </span>
                        <span className="text-on-surface font-mono-code truncate block mt-0.5">
                          {result.copyright_id}
                        </span>
                      </div>
                    )}

                    {file?.name && (
                      <div className="p-2.5 rounded bg-surface-container/60 border border-outline-variant/30 sm:col-span-2">
                        <span className="text-on-surface-variant font-mono-badge block text-[10px] uppercase">
                          Original Master Filename
                        </span>
                        <span className="text-on-surface font-mono-code truncate block mt-0.5">
                          {file.name}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Verification Guidance Note */}
                  <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/40 flex items-start gap-2.5 text-xs text-on-surface-variant leading-relaxed">
                    <span className="material-symbols-outlined text-primary text-[18px] flex-shrink-0 mt-0.5">
                      info
                    </span>
                    <div>
                      <p className="font-medium text-on-surface">
                        Save this Image ID for your records. You can use it to reference your protected image during verification.
                      </p>
                      <p className="mt-1 text-on-surface-variant/90 text-[11px]">
                        Note: For watermark verification, the system requires this Image ID, the protected image file, and your secret derivation key to cryptographically recover the embedded copyright signature.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Download and Navigation Buttons */}
                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full bg-primary-container hover:bg-primary text-on-primary font-headline-sm text-label-md font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-[20px]">download</span>
                  <span>Download Protected Image</span>
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <Link
                    to={`/verify?image_id=${encodeURIComponent(result.image_id)}`}
                    className="w-full bg-surface-container hover:bg-surface-container-high text-on-surface border border-outline-variant/50 py-2.5 px-4 rounded-lg text-label-md font-label-md flex items-center justify-center gap-2 transition-colors text-center"
                  >
                    <span className="material-symbols-outlined text-[18px]">fingerprint</span>
                    <span>Verify Image</span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full bg-surface-container hover:bg-surface-container-high text-on-surface border border-outline-variant/50 py-2.5 px-4 rounded-lg text-label-md font-label-md flex items-center justify-center gap-2 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">replay</span>
                    <span>Protect Another</span>
                  </button>
                </div>

                {/* Quality & Technical Details */}
                <div className="mt-6 border-t border-outline-variant/40 pt-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-body-md font-body-md font-medium text-on-surface">
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-outline text-[20px]">analytics</span>
                        Image Quality &amp; Technical Details
                      </span>
                    </div>

                    {/* Metrics Table */}
                    <div className="grid grid-cols-3 gap-2 text-center pt-2">
                      <div className="p-2.5 rounded-lg bg-surface-container border border-outline-variant/30">
                        <p className="text-mono-badge font-mono-badge text-on-surface-variant uppercase">PSNR</p>
                        <p className="text-headline-sm font-headline-sm text-on-surface font-semibold mt-0.5">
                          {typeof result.psnr === 'number' && isFinite(result.psnr) ? `${result.psnr.toFixed(2)} dB` : '> 100 dB'}
                        </p>
                        <p className="text-label-sm font-label-sm text-tertiary">
                          {result.psnr >= 40 ? 'Excellent' : 'Good'}
                        </p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-surface-container border border-outline-variant/30">
                        <p className="text-mono-badge font-mono-badge text-on-surface-variant uppercase">SSIM</p>
                        <p className="text-headline-sm font-headline-sm text-on-surface font-semibold mt-0.5">
                          {typeof result.ssim === 'number' ? result.ssim.toFixed(4) : '1.0000'}
                        </p>
                        <p className="text-label-sm font-label-sm text-tertiary">
                          {result.ssim >= 0.98 ? 'Near Perfect' : 'High'}
                        </p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-surface-container border border-outline-variant/30">
                        <p className="text-mono-badge font-mono-badge text-on-surface-variant uppercase">MSE</p>
                        <p className="text-headline-sm font-headline-sm text-on-surface font-semibold mt-0.5">
                          {typeof result.mse === 'number' ? result.mse.toFixed(6) : '0.000000'}
                        </p>
                        <p className="text-label-sm font-label-sm text-on-surface-variant">Imperceptible</p>
                      </div>
                    </div>

                    {/* SHA-256 Hash Preview */}
                    <div className="p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/40">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-mono-badge font-mono-badge text-on-surface-variant uppercase">
                          SHA-256 Provenance Manifest
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyHash}
                          className="text-label-sm font-label-sm text-primary hover:text-primary-container flex items-center gap-1 transition-colors"
                          title="Copy Manifest Hash"
                        >
                          <span className="material-symbols-outlined text-[14px]">content_copy</span>
                          <span>{copiedHash ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="text-mono-code font-mono-code text-on-surface-variant break-all select-all text-[11px]">
                        {result.sha256}
                      </p>
                    </div>

                    {/* Perceptual Watermark Integrity */}
                    <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container/60 border border-outline-variant/30 text-body-sm font-body-sm">
                      <span className="text-on-surface-variant">Robustness Layer</span>
                      <span className="text-on-surface font-mono-code">DWT-DCT Dual-Domain</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-4 p-4 rounded-lg bg-surface-container/40 border border-outline-variant/30 text-body-sm font-body-sm text-on-surface-variant">
                Output image preview, perceptual quality metrics (PSNR, SSIM, MSE), and cryptographic SHA-256 hash manifest will be displayed here immediately after processing.
              </div>
            )}
          </div>

          {/* Security Guarantee Micro-Banner */}
          <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-start gap-3">
            <span className="material-symbols-outlined text-primary-container text-[20px] flex-shrink-0 mt-0.5">
              shield
            </span>
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              DigiForge stamps assets with mathematical rigor. Your secret key and raw master image are never persisted or shared.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Protect;
