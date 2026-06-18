# Kriptografi — Implementasi AES & Steganografi EOF untuk Keamanan Hak Cipta Gambar Digital

Sistem berbasis web yang mengenkripsi informasi hak cipta menggunakan **AES-192** dan menyisipkannya ke dalam gambar digital menggunakan metode **End of File (EOF) Steganography**.

## Alur Sistem

### Penyisipan (Embed)
```
Upload Gambar → Input Data Hak Cipta → Input Secret Key → AES-192 Encrypt → EOF Embed → Download Gambar Terproteksi
```

### Ekstraksi (Extract)
```
Upload Gambar → Input Secret Key → EOF Extract → AES-192 Decrypt → Tampilkan Informasi Hak Cipta
```

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| **Frontend** | React + Vite + Tailwind CSS |
| **Backend** | Node.js + Express.js |
| **Enkripsi** | CryptoJS (AES-192, CBC mode) |
| **Steganografi** | EOF (End of File) |

## Struktur Project

```
kriptografi/
├── backend/
│   ├── app.js                 # Entry point Express
│   ├── routes/api.js          # Route /api/embed dan /api/extract
│   ├── controllers/
│   │   ├── embedController.js
│   │   └── extractController.js
│   ├── services/
│   │   ├── aesService.js      # AES-192 encrypt/decrypt
│   │   └── eofService.js      # EOF steganography embed/extract
│   ├── middlewares/upload.js  # Multer file upload (JPG/PNG, max 10MB)
│   └── scripts/inspect.js     # CLI tool untuk inspeksi file
├── frontend/
│   ├── src/
│   │   ├── pages/             # Home, Embed, Extract, About
│   │   ├── components/        # FileUpload, Navbar
│   │   └── services/api.js    # Axios client
│   └── ...
├── PRD.md
└── README.md
```

## Setup & Menjalankan

### Prasyarat
- Node.js ≥ 18

### Backend
```bash
cd backend
npm install
npm start        # http://localhost:3001
```

### Frontend
```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
```

## API Endpoint

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/embed` | Upload gambar + data hak cipta + secret key → download gambar terproteksi |
| POST | `/api/extract` | Upload gambar + secret key → tampilkan data hak cipta |

## CLI Tool (Inspeksi)

```bash
node backend/scripts/inspect.js <file-gambar> [secret-key]
```

Menampilkan informasi file dan data EOF yang tersembunyi. Jika secret key diberikan, akan mendekripsi data.

## Catatan Akademik

Project ini dibuat untuk tugas akhir mata kuliah **Kriptografi**. Algoritma yang diimplementasikan:

- **AES-192** — Enkripsi data hak cipta dengan key 192-bit
- **EOF Steganography** — Penyisipan data terenkripsi di akhir file gambar
