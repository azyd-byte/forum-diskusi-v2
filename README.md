# Forum App - React Web Developer Expert

Aplikasi forum diskusi berbasis React yang memungkinkan pengguna untuk membuat thread, memberikan komentar, serta melakukan voting (upvote/downvote).

Project ini dikembangkan sebagai submission pada kelas **Menjadi React Web Developer Expert**.

---

## Fitur Utama

- 🔐 Autentikasi pengguna (login)
- 🧵 Melihat daftar thread
- 🏷️ Filter thread berdasarkan kategori
- 👍 Upvote & 👎 Downvote thread
- 💬 Menambahkan komentar pada thread
- 👍👎 Voting pada komentar
- ⏱️ Format waktu relatif (misal: "5 menit lalu")

---

## Tech Stack

- React.js
- Redux (State Management)
- React Router
- Tailwind CSS
- REST API (Dicoding Forum API)

---

## 📁 Struktur Folder

```
src/
├── components/
├── pages/
├── states/        # Redux (actions, reducers, thunks)
├── utils/         # helper functions (formatTime, dll)
├── styles/
└── App.jsx
```

---

## Instalasi & Menjalankan Project

```
npm install
npm start
```

Aplikasi akan berjalan di:
http://localhost:3000

---

## Optimasi Performa

- Menggunakan useMemo untuk menghindari kalkulasi ulang
- Menggunakan object lookup (usersMap) untuk performa lebih baik

---

## 🔒 Keamanan (XSS Protection)

- Menggunakan DOMPurify untuk sanitasi HTML
- Semua dangerouslySetInnerHTML sudah melalui sanitasi

---

## 💡 Catatan Pengembangan

- Separation of concerns
- Utility function dipisahkan ke folder utils
- Struktur modular

---

## Author

Dikembangkan oleh Zayadi

---

## 🌐 Live Demo

Aplikasi dapat diakses secara langsung melalui link berikut:

[Forum Diskusi App](https://forum-diskusi-v2.vercel.app/)
