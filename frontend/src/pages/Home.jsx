import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-6 pt-12 pb-8 px-4 rounded-2xl bg-gradient-to-br from-cyan-50 via-white to-teal-50 border border-cyan-100/50">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-xs font-medium">
          Tugas Akhir Kriptografi
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          Perlindungan Hak Cipta Gambar
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Enkripsi informasi hak cipta Anda menggunakan AES-192 dan sisipkan
          secara aman ke dalam file gambar dengan teknik steganografi EOF.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Link
            to="/embed"
            className="inline-flex items-center px-5 py-2.5 rounded-lg bg-cyan-500 text-white font-medium text-sm hover:bg-cyan-600 transition-colors shadow-sm"
          >
            Sisipkan Hak Cipta
          </Link>
          <Link
            to="/extract"
            className="inline-flex items-center px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors"
          >
            Ekstrak Hak Cipta
          </Link>
        </div>
      </section>

      <section className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {[
          {
            step: '01',
            title: 'Enkripsi',
            desc: 'Data hak cipta Anda dienkripsi menggunakan AES dengan kunci rahasia yang Anda buat.',
            icon: (
              <svg className="w-8 h-8 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            ),
          },
          {
            step: '02',
            title: 'Penyisipan',
            desc: 'Data terenkripsi ditambahkan di akhir file gambar menggunakan teknik steganografi EOF.',
            icon: (
              <svg className="w-8 h-8 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
            ),
          },
          {
            step: '03',
            title: 'Verifikasi',
            desc: 'Ekstrak dan dekripsi data di kemudian hari untuk membuktikan kepemilikan Anda.',
            icon: (
              <svg className="w-8 h-8 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            ),
          },
        ].map(({ step, title, desc, icon }) => (
          <div key={step} className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-3 hover:shadow-md hover:border-cyan-200 transition-all">
            <div className="flex items-center justify-between">
              {icon}
              <span className="text-cyan-500 text-sm font-bold">{step}</span>
            </div>
            <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
