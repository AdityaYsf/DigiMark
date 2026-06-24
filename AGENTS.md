# AGENTS.md — Kriptografi

Academic project: AES-256 encryption + EOF steganography for digital image copyright protection.

## Commands

```sh
# Backend (CommonJS, Express v5 on :3001)
cd backend && npm install && npm start

# Frontend (React 19, Vite, Tailwind v4 on :5173)
cd frontend && npm install && npm run dev

# Lint (frontend only — backend has no lint setup)
cd frontend && npm run lint

# CLI: inspect embedded data in an image
node backend/scripts/inspect.js <file> [secret-key]

# No tests exist in this repo.
```

**Start order:** Backend first (port 3001). Vite proxies `/api` → `localhost:3001`.

## Architecture

- **No database.** File-based: `uploads/` (input temp), `outputs/` (protected images).
- Both dirs auto-created at startup via `fs-extra.ensureDirSync`.
- Backend deletes uploaded temp files after processing.
- **Two-layer steganography** on embed: EOF marker (`__EOF_DATA__` at end of file) + metadata (JPEG COM marker / PNG tEXt chunk). Extract tries EOF first, falls back to metadata.
- Env: only `PORT=3001` in `.env`. Key is ephemeral — never stored.
- Accepted images: JPG/JPEG/PNG, max 10 MB.

## Tech stack quirks

- **Express v5** (`"express": "^5.2.1"`). Error handler signature still `(err, req, res, next)`.
- **Multer v2** (`"multer": "^2.2.0"`). API similar to v1.
- **Tailwind CSS v4** — no `tailwind.config.js`. Styling via `@import 'tailwindcss'` and `@theme` directive in `index.css`.
- **React Router v7** with `BrowserRouter` in `main.jsx`.
- Module systems: backend uses **CommonJS** (`require`); frontend uses **ESM** (`import`).

## File layout

| Path | Role |
|---|---|
| `backend/app.js` | Express entrypoint |
| `backend/routes/api.js` | `POST /api/embed`, `POST /api/extract` |
| `backend/services/aesService.js` | `CryptoJS.AES.encrypt/decrypt` (256-bit, CBC mode — default CryptoJS) |
| `backend/services/eofService.js` | EOF embed/extract with `__EOF_DATA__` marker |
| `backend/services/metadataService.js` | JPEG COM / PNG tEXt metadata embed/extract |
| `backend/middlewares/upload.js` | Multer config (10 MB, JPG/JPEG/PNG) |
| `backend/scripts/inspect.js` | CLI tool for file inspection & decryption |
| `frontend/src/services/api.js` | Axios client (`/api` base, blob response for embed) |
| `frontend/src/App.jsx` | Router: `/`, `/embed`, `/extract`, `/about` |
| `frontend/src/index.css` | Tailwind v4 setup with custom cyan palette |

## .gitignore

Ignores: `uploads`, `.env`, `node_modules`, `dist`, `DESIGN.md`, `PRD.md`.
