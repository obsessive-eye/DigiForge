// src/types/watermark.ts
export interface EmbedResponse {
  success: boolean;
  image_id: string;
  owner_name: string;
  copyright_id: string;
  watermark_length: number;
  psnr: number;
  ssim: number;
  mse: number;
  sha256: string;
  download_url: string;
}

export interface VerifyResponse {
  success: boolean;
  watermark_detected: boolean;
  similarity?: number | null;
  owner_name?: string | null;
  copyright_id?: string | null;
  copyright_status: string;
  sha256_match: boolean;
  integrity_status: string;
  download_url?: string;
}
