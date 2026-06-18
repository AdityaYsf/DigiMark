import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import { embedCopyright } from '../services/api';

export default function Embed() {
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({ owner_name: '', copyright_id: '', description: '', secret_key: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [downloadName, setDownloadName] = useState('');

  function set(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setDownloadUrl(null);

    if (!file) { setError('Pilih gambar terlebih dahulu'); return; }
    if (!form.owner_name || !form.copyright_id || !form.secret_key) {
      setError('Nama pemilik, ID Hak Cipta, dan Kunci Rahasia wajib diisi');
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      fd.append('owner_name', form.owner_name);
      fd.append('copyright_id', form.copyright_id);
      fd.append('description', form.description);
      fd.append('secret_key', form.secret_key);

      const res = await embedCopyright(fd);
      const blob = new Blob([res.data], { type: file.type });
      const url = URL.createObjectURL(blob);

      const disposition = res.headers['content-disposition'] || '';
      const match = disposition.match(/filename="?(.+?)"?$/);
      setDownloadName(match ? match[1] : `protected_${file.name}`);
      setDownloadUrl(url);
      setForm({ owner_name: '', copyright_id: '', description: '', secret_key: '' });
      setFile(null);
    } catch (err) {
      const msg = err.response?.data
        ? await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
              try { resolve(JSON.parse(reader.result).error); } catch { resolve(reader.result); }
            };
            reader.readAsText(err.response.data);
          })
        : err.message;
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  function handleDownload() {
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = downloadName;
    a.click();
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="text-center sm:text-left">
        <h1 className="text-2xl font-bold text-gray-900">Sisipkan Hak Cipta</h1>
        <p className="text-sm text-gray-500 mt-1">
          Unggah gambar dan masukkan informasi hak cipta untuk menyisipkannya secara aman.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <FileUpload onFile={setFile} />

        <div className="space-y-4 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          {[
            { label: 'Nama Pemilik', field: 'owner_name', type: 'text', required: true },
            { label: 'ID Hak Cipta', field: 'copyright_id', type: 'text', required: true },
            { label: 'Deskripsi', field: 'description', type: 'text', required: false },
            { label: 'Kunci Rahasia', field: 'secret_key', type: 'password', required: true },
          ].map(({ label, field, type, required }) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-400">*</span>}
              </label>
              <input
                type={type}
                value={form[field]}
                onChange={set(field)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              />
            </div>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {downloadUrl && (
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-700 space-y-2">
            <p>Data hak cipta berhasil disisipkan!</p>
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center px-4 py-1.5 rounded-lg bg-green-600 text-white font-medium text-xs hover:bg-green-700 transition-colors"
            >
              Unduh {downloadName}
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-cyan-500 text-white font-medium py-2.5 text-sm hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          {loading ? 'Memproses...' : 'Sisipkan Hak Cipta'}
        </button>
      </form>
    </div>
  );
}
