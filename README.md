# ⚡ AI Hybrid

> Berbagai AI dalam 1 genggaman — Cloud & Lokal, offline-ready.

## 🚀 Deploy ke Vercel (5 menit)

### 1. Upload ke GitHub

1. Buat repo baru di [github.com](https://github.com) → **New repository**
2. Nama: `ai-hybrid` → **Public** → Create
3. Klik **"uploading an existing file"**
4. Upload semua file berikut:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon.svg`
   - `model-registry.json`
   - `README.md`
5. Klik **Commit changes**

### 2. Deploy di Vercel

1. Buka [vercel.com](https://vercel.com) → Login dengan GitHub
2. **"Add New Project"** → Import repo `ai-hybrid`
3. Framework Preset → **Other**
4. Klik **Deploy** ✅

URL kamu: `https://ai-hybrid-xxx.vercel.app`

---

## 📁 Struktur File

```
ai-hybrid/
├── index.html          ← App utama (semua-dalam-satu)
├── manifest.json       ← PWA manifest
├── sw.js               ← Service Worker (cache offline)
├── icon.svg            ← Icon app (inline SVG, tidak butuh PNG)
├── model-registry.json ← Registry model AI lokal
└── README.md           ← Panduan ini
```

---

## ✨ Fitur

| Fitur | Keterangan |
|---|---|
| ☁️ Cloud AI | Groq (gratis), OpenAI, DeepSeek, OpenRouter |
| 🟢 AI Lokal | 10+ model offline, berjalan di browser via ONNX |
| 🐠 Akuarium | Multi-AI diskusi otomatis & belajar |
| 🏟️ Arena | AI vs AI menjawab pertanyaan yang sama |
| 🎯 Prompt Builder | Prompt dengan variabel dinamis & per-AI |
| 🧬 Memori | AI Lokal menyerap pengetahuan dari percakapan |
| ☁️ Firebase Sync | Backup & sinkronisasi antar device (opsional) |

---

## 🔑 Cara Pakai

### Cloud AI (cepat, butuh internet)
1. Daftar di [console.groq.com](https://console.groq.com) → gratis
2. Buka app → 🤖 Pilih AI → API Key → masukkan key Groq
3. Mulai chat!

### AI Lokal (offline, privat)
1. Buka app → 🟢 AI Lokal
2. Pilih model (SmolLM2 1.7B direkomendasikan)
3. Klik **Unduh** → tunggu selesai
4. Klik **Aktifkan** → siap chat offline!

---

## 🛠️ Tech Stack

- Pure HTML/CSS/JS (tidak butuh build step)
- [Transformers.js](https://github.com/huggingface/transformers.js) — model AI di browser
- IndexedDB — penyimpanan model offline
- Firebase (opsional) — sync cloud

---

*Made with ⚡ AI Hybrid*
