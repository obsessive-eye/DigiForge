// src/pages/Verify.tsx
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import LoadingState from '../components/LoadingState';
import { verifyWatermark } from '../services/api';
import type { VerifyResponse } from '../types/watermark';

const Verify: React.FC = () => {
  const [searchParams] = useSearchParams();
  const imageId = searchParams.get('image_id') || '';
  const [file, setFile] = useState<File | null>(null);
  const [secretKey, setSecretKey] = useState('');
  const [result, setResult] = useState<VerifyResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleVerify = async () => {
    if (!file || !imageId || !secretKey) {
      setError('File, image ID and secret key are required');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const resp = await verifyWatermark(file, imageId, secretKey);
      setResult(resp);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-cyan mb-6">Verify Image</h2>
      <div className="space-y-4">
        <input type="file" accept="image/*" onChange={handleFileSelect} disabled={loading} />
        <input
          type="password"
          placeholder="Secret Key"
          value={secretKey}
          onChange={e => setSecretKey(e.target.value)}
          disabled={loading}
          className="p-2 border rounded bg-navy text-grayLight"
        />
        <button
          onClick={handleVerify}
          disabled={loading}
          className="px-4 py-2 bg-cyan text-navy rounded hover:bg-cyan/80 transition"
        >
          {loading ? 'Verifying…' : 'Verify'}
        </button>
        {loading && <LoadingState />}
        {error && <p className="text-red-400">{error}</p>}
        {result && (
          <pre className="bg-navy p-4 rounded text-grayLight overflow-x-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};

export default Verify;
