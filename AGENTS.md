# AGENTS.md

## What this is

Web app that encrypts copyright info (AES) and embeds it into image files (EOF steganography). Frontend + backend monorepo.

## Structure

```
frontend/     — React 19 + Vite 8 + Tailwind CSS 4 (ESM)
backend/      — Express.js 5 (CommonJS)
.gitignore    — excludes uploads, .env, node_modules, dist, DESIGN.md, PRD.md
```

## Commands

```bash
# frontend
cd frontend && npm install
cd frontend && npm run dev         # Vite dev server (default http://localhost:5173)
cd frontend && npm run build       # production build
cd frontend && npm run lint        # ESLint 10 + react-hooks plugin

# backend
cd backend && npm install
cd backend && npm start            # node app.js (no nodemon, no watch)
```

No test framework is configured (`npm test` is a placeholder in both packages).

CLI inspect tool: `node scripts/inspect.js <image-file> [secret-key]` — shows file info, raw encrypted data, and optionally decrypts with provided key.

## Current state

**Backend** (`backend/`) — implemented:
- `app.js` — Express 5 server with CORS, error handling, static /outputs serving
- `routes/api.js` — `POST /api/embed`, `POST /api/extract`
- `controllers/embedController.js` — validates fields, encrypts, embeds, returns download
- `controllers/extractController.js` — extracts EOF data, decrypts, returns copyright JSON
- `services/aesService.js` — `encrypt(data, key)` / `decrypt(ciphertext, key)` via crypto-js
- `services/eofService.js` — `embed(path, data, outPath)` / `extract(path)` via fs-extra (appends marker + JSON)
- `middlewares/upload.js` — multer with UUID filenames, JPG/JPEG/PNG filter, 10 MB limit
- `uploads/` — temp incoming files (in `.gitignore`)
- `outputs/` — processed image files served as static
- `.env` — `PORT=3001`

**Frontend** (`frontend/`):
- `src/App.jsx` — Router + layout (Navbar + Routes for Home, Embed, Extract, About)
- `src/pages/Home.jsx` — Hero + 3-step explainer
- `src/pages/Embed.jsx` — Upload image + copyright fields + secret key → download
- `src/pages/Extract.jsx` — Upload protected image + secret key → show copyright data
- `src/pages/About.jsx` — AES + EOF explanation
- `src/components/Navbar.jsx` — Top nav with active-link highlighting
- `src/components/FileUpload.jsx` — Drag-and-drop zone with preview
- `src/services/api.js` — Axios client (`embedCopyright`, `extractCopyright`)
- `src/index.css` — `@import 'tailwindcss'` (Tailwind v4, no config file)
- `vite.config.js` — dev proxy `/api` → `http://localhost:3001`

## Key conventions

- **Tailwind v4**: Use `@import 'tailwindcss'` in CSS. No `tailwind.config.js` — use CSS-first config with `@theme`.
- **ESM vs CJS**: Frontend uses ES modules (`"type": "module"`); backend uses CommonJS (`"type": "commonjs"`). Use `require()` / `module.exports` in backend, `import`/`export` in frontend.
- **Backend**: Express 5 API (uses `app.listen` not `http.createServer`). Uses `multer` for file upload, `fs-extra` for file I/O, `crypto-js` for AES, `uuid` for IDs.

## Routes (from PRD)

- `POST /api/embed` — upload image + copyright data, returns image with embedded EOF data
- `POST /api/extract` — upload image with EOF data, returns decrypted copyright info

## Source of truth for requirements

`PRD.md` — product requirements. `DESIGN.md` is a UI design reference (Boardto Dashboard style) that was preserved as a visual target but may not reflect final layout.

## Development workflow (both running)

```bash
cd backend && npm start     # http://localhost:3001
cd frontend && npm run dev  # http://localhost:5173 (proxies /api → :3001)
```
