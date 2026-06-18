export default function About() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center sm:text-left">
        <h1 className="text-2xl font-bold text-gray-900">Tentang Proyek Ini</h1>
        <p className="text-sm text-gray-500 mt-1">
          Menggabungkan enkripsi AES dan steganografi EOF untuk melindungi hak cipta gambar digital.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-3">
          <h2 className="font-semibold text-gray-900">Enkripsi AES</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Advanced Encryption Standard (AES) adalah algoritma enkripsi simetris yang digunakan
            secara global untuk mengamankan data sensitif. Algoritma ini mengenkripsi informasi
            hak cipta menggunakan kunci rahasia yang diberikan oleh pengguna, memastikan hanya
            pemilik kunci yang benar dapat membaca data yang tersisip.
          </p>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-3">
          <h2 className="font-semibold text-gray-900">Steganografi EOF</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Steganografi End-of-File (EOF) bekerja dengan menambahkan data setelah akhir logis
            file. Penampil gambar mengabaikan data di luar akhir file yang diharapkan, sehingga
            tampilan visual tetap tidak berubah. Teknik ini memungkinkan data hak cipta
            terenkripsi disembunyikan di dalam gambar JPEG dan PNG tanpa perubahan yang terlihat.
          </p>
        </section>
      </div>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-3">
        <h2 className="font-semibold text-gray-900">Cara Kerja</h2>
        <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2 leading-relaxed">
          <li>Informasi hak cipta (nama pemilik, ID, deskripsi) diubah menjadi format JSON.</li>
          <li>Data JSON dienkripsi menggunakan AES dengan kunci rahasia Anda.</li>
          <li>Teks terenkripsi ditambahkan ke akhir file gambar.</li>
          <li>Untuk verifikasi, data yang ditambahkan diekstrak dan didekripsi menggunakan kunci yang sama.</li>
        </ol>
      </section>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-3">
        <h2 className="font-semibold text-gray-900">Keterbatasan</h2>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 leading-relaxed">
          <li>Kompresi ulang gambar dapat menghilangkan data yang tersisip.</li>
          <li>Ukuran file bertambah sebesar data yang ditambahkan (biasanya beberapa ratus byte).</li>
          <li>Manipulasi file yang ekstrem dapat merusak data yang disembunyikan.</li>
        </ul>
      </section>
    </div>
  );
}
