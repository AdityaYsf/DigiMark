import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-4 pt-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Image Copyright Protection
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Encrypt your copyright information using AES and embed it securely into
          image files using End-of-File steganography.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Link
            to="/embed"
            className="inline-flex items-center px-5 py-2.5 rounded-lg bg-cyan-500 text-white font-medium text-sm hover:bg-cyan-600 transition-colors"
          >
            Embed Copyright
          </Link>
          <Link
            to="/extract"
            className="inline-flex items-center px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors"
          >
            Extract Copyright
          </Link>
        </div>
      </section>

      <section className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {[
          {
            step: '01',
            title: 'Encrypt',
            desc: 'Your copyright data is encrypted using AES with your secret key.',
          },
          {
            step: '02',
            title: 'Embed',
            desc: 'The encrypted data is appended to the image file using EOF steganography.',
          },
          {
            step: '03',
            title: 'Verify',
            desc: 'Extract and decrypt the data later to prove ownership.',
          },
        ].map(({ step, title, desc }) => (
          <div key={step} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-2">
            <span className="text-cyan-500 text-sm font-bold">{step}</span>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
