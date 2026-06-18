import { useState, useRef } from 'react';

export default function FileUpload({ onFile }) {
  const [preview, setPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  function handleFile(file) {
    if (!file) return;
    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
      alert('Hanya file JPG, JPEG, dan PNG yang diperbolehkan');
      return;
    }
    onFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
        dragOver
          ? 'border-cyan-400 bg-cyan-50'
          : 'border-gray-300 hover:border-gray-400 bg-white'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {preview ? (
        <div className="space-y-3">
          <img src={preview} alt="Pratinjau" className="max-h-64 mx-auto rounded-lg shadow-sm" />
          <p className="text-sm text-gray-500">Klik atau seret untuk mengganti</p>
        </div>
      ) : (
        <div className="space-y-2">
          <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
          </svg>
          <p className="text-sm text-gray-600">
            <span className="text-cyan-600 font-medium">Klik untuk unggah</span> atau seret dan lepas
          </p>
          <p className="text-xs text-gray-400">JPG, JPEG, atau PNG &middot; Maks 10 MB</p>
        </div>
      )}
    </div>
  );
}
