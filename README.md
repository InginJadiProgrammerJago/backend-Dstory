# 📖 D-Story Backend

D-Story Backend adalah API server untuk aplikasi berbagi cerita berbasis lokasi. Menyediakan fitur autentikasi, CRUD cerita, upload gambar ke Supabase Storage, serta reverse geocoding menggunakan OpenStreetMap.

> ⚠️ **Status Proyek:**  
> Backend ini sudah mencakup semua fitur utama (~90% complete) namun masih dalam tahap penyempurnaan (code improvement, bug fix, dan beberapa fitur tambahan). API stabil digunakan, namun perubahan endpoint mungkin terjadi di rilis berikutnya.

## ✨ Fitur Utama

- 🔐 **Autentikasi Aman** – Register & Login dengan bcrypt + JWT
- 📝 **CRUD Cerita** – Tambah, baca, edit, hapus cerita
- 📤 **Upload Gambar** ke Supabase Storage
- 📍 **Simpan Lokasi** – Latitude & Longitude tersimpan di database
- 🌐 **Reverse Geocoding** – Konversi koordinat menjadi alamat singkat via Nominatim API
- 🚀 **PostgreSQL + Prisma ORM** – Query cepat & aman

## 🛠️ Tech Stack

- **Node.js + Express**
- **PostgreSQL + Prisma ORM**
- **Supabase Storage**
- **Multer** (upload file)
- **JWT** (autentikasi)
- **NodeCache** (caching geocoding)
- **OpenStreetMap Nominatim API**

## 📂 Struktur Proyek

```
controllers/        # Logika Auth & Story
middleware/         # Auth middleware & multer upload
routes/             # Endpoint API
prismaClient.js     # Inisialisasi Prisma
supabaseClient.js   # Koneksi Supabase Storage
index.js            # Entry point server
```

## 🚀 Cara Menjalankan

### 1. Clone Repository
```bash
git clone https://github.com/username/d-story-backend.git
cd d-story-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Buat file `.env`
```env
DATABASE_URL=postgresql://user:password@host:port/dbname
JWT_SECRET=your_jwt_secret
SUPABASE_URL=https://your-supabase-url.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 4. Migrasi Database
```bash
npx prisma migrate dev
```

### 5. Jalankan Server
```bash
npm run dev
```

### 6. API berjalan di:
```
http://localhost:3000
```

## 📡 Endpoint API

| METHOD | ENDPOINT | DESKRIPSI |
|--------|----------|-----------|
| POST | `/api/register` | Register user |
| POST | `/api/login` | Login user (JWT) |
| GET | `/api/stories` | Ambil semua cerita |
| GET | `/api/stories/:id` | Ambil detail cerita |
| POST | `/api/stories` | Tambah cerita (dengan gambar) |
| PUT | `/api/stories/:id` | Update cerita |
| DELETE | `/api/stories/:id` | Hapus cerita |
| POST | `/api/upload` | Upload gambar terpisah |
| GET | `/api/geocode/reverse` | Reverse geocoding |

## 📌 Roadmap

- [ ] Validasi input lebih ketat (Zod/Validator)
- [ ] Paginasi daftar cerita
- [ ] Fitur search & filter
- [ ] Logging & monitoring API
- [ ] Unit testing

## 📄 Lisensi

MIT License – bebas digunakan dan dimodifikasi.
