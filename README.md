# Kriptografi — AES-256 & EOF Steganography

Sistem berbasis web untuk mengenkripsi informasi hak cipta menggunakan **AES-256** dan menyisipkannya ke dalam gambar digital menggunakan **End of File (EOF) Steganography**.

---

## Panduan Menjalankan Aplikasi

### 1. Prasyarat

- **Node.js** versi 18 atau lebih baru
- **npm** (bundel dengan Node.js)
- **Git** (opsional, untuk cloning)

### 2. Clone atau Download Project

```bash
git clone <url-repository>
cd kriptografi
```

### 3. Install & Jalankan Backend (Port 3001)

```bash
cd backend
npm install
npm start
```

Tunggu hingga muncul log server berjalan. Backend akan berjalan di `http://localhost:3001`.

### 4. Install & Jalankan Frontend (Port 5173)

Buka terminal baru (biarkan backend tetap berjalan).

```bash
cd frontend
npm install
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`.

### 5. Buka Aplikasi

Buka browser dan akses **http://localhost:5173**.

Halaman yang tersedia:

| Halaman | Path | Deskripsi |
|---------|------|-----------|
| Beranda | `/` | Halaman utama |
| Embed | `/embed` | Upload gambar + input data hak cipta + secret key → download gambar terproteksi |
| Extract | `/extract` | Upload gambar terproteksi + secret key → lihat data hak cipta |
| About | `/about` | Informasi project |

### 6. Catatan Penting

| Item | Keterangan |
|------|------------|
| Urutan *start* | Backend harus berjalan **lebih dulu** sebelum frontend |
| Port backend | `3001` (dikonfigurasi di `backend/.env`) |
| Port frontend | `5173` (Vite dev server, proxy `/api` ke backend) |
| Gambar yang didukung | JPG / JPEG / PNG, maksimal **10 MB** |
| Secret key | Tidak disimpan di server — hanya dimasukkan oleh pengguna saat *embed* / *extract* |
| File upload | File sementara di `backend/uploads/` akan otomatis dihapus setelah diproses |
| Hasil output | Gambar terproteksi disimpan di `backend/outputs/` |

### 7. CLI Tool (Opsional)

```bash
node backend/scripts/inspect.js <file-gambar> [secret-key]
```

Menampilkan informasi file dan data EOF yang tersembunyi. Jika secret key diberikan, akan mendekripsi data.

---

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | React 19 + Vite 8 + Tailwind CSS 4 |
| Backend | Node.js + Express 5 (CommonJS) |
| Enkripsi | CryptoJS (AES-256, CBC mode) |
| Steganografi | EOF (End of File) + Metadata (JPEG COM / PNG tEXt) |

Project ini dibuat untuk tugas mata kuliah **Kriptografi**.
