/// <reference types="vite/client" />
// src/services/api.ts
import type { EmbedResponse, VerifyResponse } from '../types/watermark';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

export const checkHealth = async () => {
  const res = await fetch(`${API_BASE}/api/health`);
  if (!res.ok) throw new Error('Health check failed');
  return res.json();
};

export const embedWatermark = async (
  file: File,
  owner_name: string,
  copyright_id: string,
  secret_key: string,
  strength: number = 0.1,
): Promise<EmbedResponse> => {
  const form = new FormData();
  form.append('image', file);
  form.append('owner_name', owner_name);
  form.append('copyright_id', copyright_id);
  form.append('secret_key', secret_key);
  form.append('strength', strength.toString());

  const res = await fetch(`${API_BASE}/api/watermark/embed`, {
    method: 'POST',
    body: form,
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Embed failed');
  }
  return res.json();
};

export const verifyWatermark = async (
  file: File,
  image_id: string,
  secret_key: string,
): Promise<VerifyResponse> => {
  const form = new FormData();
  form.append('image', file);
  form.append('image_id', image_id);
  form.append('secret_key', secret_key);

  const res = await fetch(`${API_BASE}/api/watermark/verify`, {
    method: 'POST',
    body: form,
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Verify failed');
  }
  return res.json();
};

export const downloadProtectedImage = async (image_id: string): Promise<Blob> => {
  const res = await fetch(`${API_BASE}/api/images/${image_id}/download`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Download failed');
  }
  return res.blob();
};
