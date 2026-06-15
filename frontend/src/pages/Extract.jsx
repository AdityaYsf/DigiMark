import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import { extractCopyright } from '../services/api';

export default function Extract() {
  const [file, setFile] = useState(null);
  const [secretKey, setSecretKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!file) { setError('Please select an image'); return; }
    if (!secretKey) { setError('Secret Key is required'); return; }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      fd.append('secret_key', secretKey);

      const data = await extractCopyright(fd);
      setResult(data.data);
      setSecretKey('');
      setFile(null);
    } catch (err) {
      const msg = err.response?.data?.error || err.message;
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Extract Copyright</h1>
        <p className="text-sm text-gray-500 mt-1">
          Upload a protected image and provide the secret key to retrieve the copyright information.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <FileUpload onFile={setFile} />

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Secret Key <span className="text-red-400">*</span>
          </label>
          <input
            type="password"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {result && (
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-4 text-sm text-green-800 space-y-2">
            <p className="font-semibold">Copyright Data Retrieved</p>
            <div className="space-y-1">
              <p><span className="font-medium">Owner:</span> {result.owner_name}</p>
              <p><span className="font-medium">Copyright ID:</span> {result.copyright_id}</p>
              <p><span className="font-medium">Description:</span> {result.description || '—'}</p>
              <p><span className="font-medium">Created At:</span> {new Date(result.created_at).toLocaleString()}</p>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-cyan-500 text-white font-medium py-2.5 text-sm hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Processing...' : 'Extract Copyright'}
        </button>
      </form>
    </div>
  );
}
