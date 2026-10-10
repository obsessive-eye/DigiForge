import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { verifyWatermark } from '../services/api';
import type { VerifyResponse } from '../types/watermark';

type SimulationState = 'real' | 'verified' | 'invalid_key' | 'tampered';

const Verify: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [imageId, setImageId] = useState(searchParams.get('image_id') || '');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [secretKey, setSecretKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [realResult, setRealResult] = useState<VerifyResponse | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [activeSimulation, setActiveSimulation] = useState<SimulationState>('real');

  const handleFileChange = (selected: File) => {
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
    setRealResult(null);
    setServerError(null);
    setActiveSimulation('real');
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
    setRealResult(null);
    setServerError(null);
    setActiveSimulation('real');
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !imageId.trim() || !secretKey) {
      setServerError('Image file, Image ID, and Secret Key are all required.');
      return;
    }

    setLoading(true);
    setServerError(null);
    setActiveSimulation('real');

    try {
      const resp = await verifyWatermark(file, imageId.trim(), secretKey);
      setRealResult(resp);
    } catch (err: any) {
      setServerError(err.message || 'Server error occurred during verification.');
    } finally {
      setLoading(false);
    }
  };

  // Determine current display state: either simulation or real API result
  const displayResult: VerifyResponse | null = (() => {
    if (activeSimulation === 'verified') {
      return {
        success: true,
        watermark_detected: true,
        owner_name: 'Elena Rostova',
        copyright_id: 'DF-COPYRIGHT-2025-9941X',
        similarity: 99.84,
        copyright_status: 'VERIFIED',
        sha256_match: true,
        integrity_status: 'UNCHANGED',
      };
    }
    if (activeSimulation === 'invalid_key') {
      return {
        success: true,
        watermark_detected: false,
        owner_name: null,
        copyright_id: null,
        similarity: 12.35,
        copyright_status: 'NOT_VERIFIED',
        sha256_match: true,
        integrity_status: 'UNCHANGED',
      };
    }
    if (activeSimulation === 'tampered') {
      return {
        success: true,
        watermark_detected: true,
        owner_name: 'Elena Rostova',
        copyright_id: 'DF-COPYRIGHT-2025-9941X',
        similarity: 88.5,
        copyright_status: 'VERIFIED',
        sha256_match: false,
        integrity_status: 'FILE_CHANGED',
      };
    }
    return realResult;
  })();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-space-xl py-10">
      {/* Workspace Header & Simulation Switcher Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-high border border-outline-variant/40 text-primary font-mono-badge text-mono-badge tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              PROVENANCE ENGINE V2.4
            </span>
            <span className="text-on-surface-variant font-mono-badge text-mono-badge">DWT-DCT VALIDATED</span>
          </div>
          <h1 className="text-headline-xl font-headline-xl text-on-surface tracking-tight font-bold">
            Verify Image
          </h1>
          <p className="text-body-md font-body-md text-on-surface-variant mt-1 max-w-2xl">
            Check a protected image using your secret key to confirm original provenance and bit-exact integrity.
          </p>
        </div>

        {/* State Simulation Controls for Inspection */}
        <div className="flex flex-col items-start md:items-end gap-2 bg-surface-container-lowest/80 p-3 rounded-xl border border-outline-variant/40 custom-inner-highlight">
          <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-[14px]">tune</span>
            <span>Simulation Preview Mode</span>
          </div>
          <div className="inline-flex p-1 rounded-lg bg-surface-container-low border border-outline-variant/40 flex-wrap gap-1">
            <button
              type="button"
              onClick={() => setActiveSimulation('verified')}
              className={`px-2.5 py-1 rounded text-label-sm font-label-sm transition-all ${
                activeSimulation === 'verified'
                  ? 'bg-primary-container text-on-primary font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              [State: Verified Match]
            </button>
            <button
              type="button"
              onClick={() => setActiveSimulation('invalid_key')}
              className={`px-2.5 py-1 rounded text-label-sm font-label-sm transition-all ${
                activeSimulation === 'invalid_key'
                  ? 'bg-primary-container text-on-primary font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              [State: Invalid Key]
            </button>
            <button
              type="button"
              onClick={() => setActiveSimulation('tampered')}
              className={`px-2.5 py-1 rounded text-label-sm font-label-sm transition-all ${
                activeSimulation === 'tampered'
                  ? 'bg-primary-container text-on-primary font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              [State: File Tampered]
            </button>
            {activeSimulation !== 'real' && (
              <button
                type="button"
                onClick={() => setActiveSimulation('real')}
                className="px-2.5 py-1 rounded text-label-sm font-label-sm text-primary hover:underline"
              >
                Reset to Live
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Dual-Column Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* LEFT COLUMN: Input Form */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <form onSubmit={handleVerify} className="space-y-6">
            {/* STEP 1: Select Image Card */}
            <section className="bg-surface-container-low rounded-xl border border-outline-variant/50 p-6 custom-inner-highlight flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-surface-container-high border border-outline text-primary font-mono-badge text-mono-badge flex items-center justify-center font-bold">
                    01
                  </span>
                  <h2 className="text-headline-sm font-headline-sm text-on-surface font-semibold">
                    Select Image to Verify
                  </h2>
                </div>
                {file && (
                  <span className="text-label-sm font-label-sm text-primary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span> Loaded
                  </span>
                )}
              </div>

              {!file ? (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-outline-variant/60 hover:border-primary/50 transition-colors rounded-xl p-8 text-center bg-surface-container-lowest/40 cursor-pointer relative"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    disabled={loading}
                  />
                  <div className="w-10 h-10 mx-auto rounded-full bg-surface-container-high border border-outline-variant/50 flex items-center justify-center text-on-surface-variant mb-2">
                    <span className="material-symbols-outlined text-[20px]">upload_file</span>
                  </div>
                  <p className="text-body-md font-body-md font-medium text-on-surface">
                    Drop suspect image to verify
                  </p>
                  <p className="text-body-sm font-body-sm text-on-surface-variant mt-1">
                    PNG, TIFF, JPG files accepted
                  </p>
                </div>
              ) : (
                <div className="group relative rounded-lg border border-outline-variant/80 bg-surface-container-lowest overflow-hidden">
                  <div className="aspect-[16/9] w-full relative overflow-hidden bg-surface-dim">
                    {previewUrl && (
                      <img
                        alt="Loaded specimen preview"
                        className="w-full h-full object-cover"
                        src={previewUrl}
                      />
                    )}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded bg-surface-container-highest/90 border border-outline-variant/60 backdrop-blur-sm text-on-surface font-mono-badge text-mono-badge">
                      <span className="material-symbols-outlined text-primary text-[14px]">lens_blur</span>
                      <span>DWT SCAN READY</span>
                    </div>
                  </div>
                  <div className="p-3.5 bg-surface-container-low flex flex-col gap-2 border-t border-outline-variant/40">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-code text-mono-code text-on-surface font-medium truncate">
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="text-on-surface-variant hover:text-error transition-colors text-label-sm font-label-sm"
                        disabled={loading}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex items-center gap-3 text-on-surface-variant font-mono-badge text-mono-badge text-[11px]">
                      <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                      <span>&bull;</span>
                      <span>{file.type || 'IMAGE'}</span>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* STEP 2: Verification Details */}
            <section className="bg-surface-container-low rounded-xl border border-outline-variant/50 p-6 custom-inner-highlight flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-surface-container-high border border-outline text-primary font-mono-badge text-mono-badge flex items-center justify-center font-bold">
                  02
                </span>
                <h2 className="text-headline-sm font-headline-sm text-on-surface font-semibold">
                  Verification Details
                </h2>
              </div>

              {/* Image ID Input */}
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-1.5" htmlFor="imageIdInput">
                  Image Identifier (Image ID)
                </label>
                <div className="relative">
                  <input
                    id="imageIdInput"
                    type="text"
                    placeholder="Enter Image ID (e.g. UUID)"
                    value={imageId}
                    onChange={(e) => setImageId(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface placeholder:text-on-surface-variant/60 rounded-lg px-3.5 py-2.5 font-mono-code text-mono-code focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs"
                    required
                    disabled={loading}
                  />
                </div>
                <p className="text-body-sm font-body-sm text-on-surface-variant/80 mt-1">
                  Generated during image protection.
                </p>
              </div>

              {/* Secret Key Input */}
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-1.5" htmlFor="secretKeyInput">
                  Secret Key
                </label>
                <div className="relative">
                  <input
                    id="secretKeyInput"
                    type={showKey ? 'text' : 'password'}
                    placeholder="Secret Key"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface placeholder:text-on-surface-variant/60 rounded-lg px-3.5 py-2.5 pr-11 font-mono-code text-mono-code focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all tracking-wider text-xs"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-3 top-2.5 text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showKey ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Server Error Alert */}
              {serverError && (
                <div className="p-3 rounded-lg bg-error-container/20 border border-error/50 text-error text-body-sm font-body-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">warning</span>
                  <span>{serverError}</span>
                </div>
              )}

              {/* Verify Trigger Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading || !file}
                  className="w-full bg-primary-container hover:bg-primary text-on-primary font-headline-sm text-headline-sm font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary-container/10 active:opacity-90 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <span>Verify</span>
                      <span className="material-symbols-outlined text-[20px]">fingerprint</span>
                    </>
                  )}
                </button>
              </div>
            </section>
          </form>
        </div>

        {/* RIGHT COLUMN: Forensic Verification Dossier Output */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <section className="bg-surface-container-low rounded-xl border border-outline-variant/50 p-6 md:p-8 custom-inner-highlight flex flex-col gap-6">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary text-[22px]">verified</span>
                <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
                  Forensic Verification Dossier
                </h3>
              </div>
              <span className="font-mono-badge text-mono-badge px-2.5 py-1 rounded bg-surface-container text-on-surface-variant border border-outline-variant/40 uppercase">
                {activeSimulation !== 'real' ? `SIMULATION: ${activeSimulation}` : 'LIVE EXTRACTION'}
              </span>
            </div>

            {displayResult ? (
              <div className="space-y-6">
                {/* Status Verdict Banner */}
                {displayResult.watermark_detected && displayResult.sha256_match ? (
                  <div className="p-4 rounded-xl bg-tertiary-container/10 border border-tertiary-container/40 flex items-start gap-4">
                    <span className="material-symbols-outlined text-tertiary text-3xl flex-shrink-0">
                      verified_user
                    </span>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-tertiary font-bold">
                        CRYPTOGRAPHIC PROVENANCE CONFIRMED
                      </h4>
                      <p className="font-body-md text-body-md text-on-surface mt-0.5">
                        Watermark extracted with bit-exact fidelity. Secret key authorized and asset is unmodified.
                      </p>
                    </div>
                  </div>
                ) : displayResult.watermark_detected && !displayResult.sha256_match ? (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-start gap-4">
                    <span className="material-symbols-outlined text-amber-400 text-3xl flex-shrink-0">
                      warning
                    </span>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-amber-400 font-bold">
                        INTEGRITY WARNING: IMAGE MODIFIED
                      </h4>
                      <p className="font-body-md text-body-md text-on-surface mt-0.5">
                        Watermark was successfully recovered, but pixel coefficients or metadata have been altered since protection.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-error-container/20 border border-error/40 flex items-start gap-4">
                    <span className="material-symbols-outlined text-error text-3xl flex-shrink-0">
                      gpp_bad
                    </span>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-error font-bold">
                        WATERMARK NOT DETECTED
                      </h4>
                      <p className="font-body-md text-body-md text-on-surface mt-0.5">
                        Secret key failed to decode a valid watermark signature, or the image does not contain DigiForge provenance.
                      </p>
                    </div>
                  </div>
                )}

                {/* Telemetry Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-surface-container border border-outline-variant/30">
                    <span className="font-mono-badge text-mono-badge text-on-surface-variant uppercase">
                      Copyright Status
                    </span>
                    <p className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1">
                      {displayResult.copyright_status}
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-surface-container border border-outline-variant/30">
                    <span className="font-mono-badge text-mono-badge text-on-surface-variant uppercase">
                      Integrity Status
                    </span>
                    <p className={`font-headline-sm text-headline-sm font-semibold mt-1 ${displayResult.sha256_match ? 'text-tertiary' : 'text-amber-400'}`}>
                      {displayResult.integrity_status}
                    </p>
                  </div>

                  {displayResult.owner_name && (
                    <div className="p-4 rounded-lg bg-surface-container border border-outline-variant/30">
                      <span className="font-mono-badge text-mono-badge text-on-surface-variant uppercase">
                        Author / Owner Name
                      </span>
                      <p className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1">
                        {displayResult.owner_name}
                      </p>
                    </div>
                  )}

                  {displayResult.copyright_id && (
                    <div className="p-4 rounded-lg bg-surface-container border border-outline-variant/30">
                      <span className="font-mono-badge text-mono-badge text-on-surface-variant uppercase">
                        Registry / Copyright ID
                      </span>
                      <p className="font-mono-code text-mono-code text-on-surface font-semibold mt-1 text-sm">
                        {displayResult.copyright_id}
                      </p>
                    </div>
                  )}

                  {displayResult.similarity !== null && displayResult.similarity !== undefined && (
                    <div className="p-4 rounded-lg bg-surface-container border border-outline-variant/30 md:col-span-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono-badge text-mono-badge text-on-surface-variant uppercase">
                          Watermark Correlation Confidence
                        </span>
                        <span className="font-mono-code text-mono-code text-primary font-bold">
                          {displayResult.similarity}%
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                        <div
                          className="h-full bg-primary-container transition-all duration-500 rounded-full"
                          style={{ width: `${Math.min(displayResult.similarity, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Forensic Notes */}
                <div className="p-4 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-body-sm font-body-sm text-on-surface-variant space-y-1">
                  <div className="flex items-center gap-2 text-on-surface font-medium">
                    <span className="material-symbols-outlined text-[16px] text-primary">security</span>
                    <span>Blind Extraction Protocol</span>
                  </div>
                  <p>
                    Watermark extracted without requiring reference to the original unmarked image file.
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center text-on-surface-variant gap-3">
                <span className="material-symbols-outlined text-5xl text-outline-variant">fingerprint</span>
                <p className="text-body-md font-body-md text-on-surface font-medium">
                  No Image Verification Active
                </p>
                <p className="text-body-sm font-body-sm max-w-sm">
                  Select a suspect file on the left and enter your secret key, or select a simulation state above to inspect preview dossiers.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Verify;
