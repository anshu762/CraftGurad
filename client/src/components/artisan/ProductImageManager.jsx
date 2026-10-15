import { useState } from 'react';
import { apiClient } from '../../lib/apiClient.js';
import useToast from '../../hooks/useToast.js';

export default function ProductImageManager({ productId, images, onChange }) {
  const { showToast } = useToast();
  const [file, setFile] = useState(null);
  const [altText, setAltText] = useState('');
  const [uploading, setUploading] = useState(false);
  const [busyId, setBusyId] = useState(null);

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) { showToast('Choose an image file first.', 'error'); return; }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      if (altText) formData.append('altText', altText);
      await apiClient.upload(`/products/manage/${productId}/images`, formData);
      setFile(null); setAltText('');
      showToast('Image uploaded.');
      await onChange();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(imageId) {
    setBusyId(imageId);
    try {
      await apiClient.delete(`/products/manage/${productId}/images/${imageId}`);
      showToast('Image removed.');
      await onChange();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setBusyId(null);
    }
  }

  async function handleAltTextBlur(imageId, value) {
    try {
      await apiClient.patch(`/products/manage/${productId}/images/${imageId}`, { altText: value });
      await onChange();
    } catch (err) {
      showToast(err.message, 'error');
    }
  }

  async function handleMove(index, direction) {
    const sorted = [...images].sort((a, b) => a.displayOrder - b.displayOrder);
    const target = index + direction;
    if (target < 0 || target >= sorted.length) return;
    [sorted[index], sorted[target]] = [sorted[target], sorted[index]];
    try {
      await apiClient.patch(`/products/manage/${productId}/images/reorder`, { order: sorted.map((i) => i.id) });
      await onChange();
    } catch (err) {
      showToast(err.message, 'error');
    }
  }

  const sortedImages = [...images].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="border-t border-line pt-6 mt-6">
      <p className="eyebrow mb-4">Photos</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {sortedImages.map((img, idx) => (
          <div key={img.id} className="border border-line rounded-sm p-2">
            <div className="aspect-[4/5] bg-line/30 mb-2 overflow-hidden rounded-sm">
              {img.url ? <img src={img.url} alt={img.altText} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xs text-mute p-2 text-center">{img.altText}</div>}
            </div>
            <input
              defaultValue={img.altText}
              onBlur={(e) => handleAltTextBlur(img.id, e.target.value)}
              className="w-full border border-line px-2 py-1 text-xs rounded-sm bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta mb-2"
              placeholder="Alt text"
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                <button type="button" onClick={() => handleMove(idx, -1)} disabled={idx === 0} className="text-xs text-mute disabled:opacity-30">↑</button>
                <button type="button" onClick={() => handleMove(idx, 1)} disabled={idx === sortedImages.length - 1} className="text-xs text-mute disabled:opacity-30">↓</button>
              </div>
              <button type="button" disabled={busyId === img.id} onClick={() => handleDelete(img.id)} className="text-xs text-terracotta hover:underline">
                {busyId === img.id ? '…' : 'Remove'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleUpload} className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
        <div className="flex-1">
          <label className="block text-xs text-mute mb-1">New photo</label>
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="text-sm" />
        </div>
        <div className="flex-1 w-full">
          <label className="block text-xs text-mute mb-1">Alt text (optional)</label>
          <input value={altText} onChange={(e) => setAltText(e.target.value)}
            className="w-full border border-line px-3 py-2 text-sm rounded-sm bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta" />
        </div>
        <button type="submit" disabled={uploading} className="border border-charcoal px-5 py-2 text-sm uppercase tracking-wide hover:bg-charcoal hover:text-cream transition-colors rounded-sm disabled:opacity-60 whitespace-nowrap">
          {uploading ? 'Uploading…' : 'Upload'}
        </button>
      </form>
    </div>
  );
}