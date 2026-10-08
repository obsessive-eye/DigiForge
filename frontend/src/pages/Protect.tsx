// src/pages/Protect.tsx
import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import ImagePreview from '../components/ImagePreview';
import LoadingState from '../components/LoadingState';
import MetricCard from '../components/MetricCard';
import StatusCard from '../components/StatusCard';
import { embedWatermark, downloadProtectedImage } from '../services/api';
import type { EmbedResponse } from '../types/watermark';

const Protect: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [owner, setOwner] = useState('');
  const [copyright, setCopyright] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [strength] = useState(0.1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EmbedResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (f: File) => {
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
    setResult(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !owner || !copyright || !secretKey) {
      setError('All fields are required.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const resp = await embedWatermark(file, owner, copyright, secretKey, strength);
      setResult(resp);
    } catch (err:any) {
      setError(err.message);
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
    } catch (err:any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-cyan mb-6">Protect Image</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <ImageUploader onFileSelect={handleFileSelect} disabled={loading} />
        <ImagePreview file={file} imageUrl={previewUrl} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Owner Name"
            value={owner}
            onChange={e => setOwner(e.target.value)}
            className="p-2 border rounded bg-navy text-grayLight"
            required
          />
          <input
            type="text"
            placeholder="Copyright ID"
            value={copyright}
            onChange={e => setCopyright(e.target.value)}
            className="p-2 border rounded bg-navy text-grayLight"
            required
          />
          <input
            type="password"
            placeholder="Secret Key"
            value={secretKey}
            onChange={e => setSecretKey(e.target.value)}
            className="p-2 border rounded bg-navy text-grayLight col-span-full"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-cyan text-navy font-semibold rounded hover:bg-cyan/80 transition"
        >
          {loading ? 'Protecting…' : 'Protect Image'}
        </button>
        {error && <p className="text-red-400">{error}</p>}
      </form>

      {loading && <LoadingState />}

      {result && (
        <div className="mt-8 space-y-4">
          <StatusCard title="Protection Complete" status="success">
            <p className="mb-2">Watermark embedded successfully.</p>
            <div className="grid grid-cols-2 gap-4">
              <MetricCard label="PSNR" value={result.psnr.toFixed(2)} unit="dB" />
              <MetricCard label="SSIM" value={result.ssim.toFixed(4)} />
              <MetricCard label="MSE" value={result.mse.toFixed(3)} />
              <MetricCard label="SHA‑256" value={result.sha256.slice(0, 8) + '…'} />
            </div>
          </StatusCard>
          <div className="flex space-x-4">
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-cyan text-navy rounded hover:bg-cyan/80"
            >
              Download Protected Image
            </button>
            <a
              href={`/verify?image_id=${result.image_id}`}
              className="px-4 py-2 bg-cyan text-navy rounded hover:bg-cyan/80"
            >
              Verify This Image
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Protect;
