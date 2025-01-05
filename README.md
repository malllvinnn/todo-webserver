# 🛠️ TO-DO WEBSERVER

Proyek ini adalah API sederhana untuk mengelola autentikasi pengguna dan manajemen tugas (task management). API ini memungkinkan pengguna untuk mendaftar, login, dan melakukan operasi CRUD pada tugas mereka. Data saat ini disimpan di local storage sebagai langkah awal untuk pembelajaran.

Proyek ini merupakan bagian dari mempraktekan hasil belajar dari course **Fastcampus ID**.

## ✨ Features

**Autentikasi User**

- **Register**: Pengguna dapat membuat akun baru.
- **Login**: Pengguna yang sudah terdaftar dapat login dan mendapatkan token untuk autentikasi.

**Manajemen Task**

- **Create**: Tambahkan task baru.
- **Read**: Lihat daftar task yang dimiliki pengguna yang sedang login.
- **Update**: Ubah task yang sudah ada.
- **Delete**: Hapus task tertentu.

## 🧰 Tech Stack

- **Node.js** - Runtime JavaScript untuk server-side.
- **Express.js** - Framework web minimalis untuk membangun API.
- **JSON Web Token (JWT)** - Untuk autentikasi berbasis token.
- **Bcrypt** - Untuk mengenkripsi kata sandi pengguna.
- **Morgan** - Middleware untuk logging request HTTP.
- **Zod** - Library validasi schema untuk memastikan data request API sesuai.

## 🚀 Cara Memulai

### Prasyarat

Pastikan Anda sudah menginstal:

- **Node.js** (v16 atau lebih baru)
- **npm** atau **yarn**

### Langkah Instalasi

#### 1. Clone repository ini:

```bash
git clone https://github.com/malllvinnn/todo-webserver.git
```

#### 2. Pindah ke direktory:

```bash
cd repo-name
```

#### 3. Instal semua dependensi:

```bash
npm install
```

#### 4. Jalankan aplikasi

```bash
node main.js
```

atau untuk realtime dengan perubahan

```bash
node --watch main.js
```

## 📦 API Endpoint

Gunakan tools seperti **Postman**, **Insomnia**, atau tools serupa untuk menguji endpoint berikut:

---

### **Autentikasi Endpoint**

#### **Register User**

| Endpoint                | Metode | Deskripsi                  |
| :---------------------- | :----- | :------------------------- |
| `/api/v1/auth/register` | `POST` | **Mendaftarkan User Baru** |

Masukkan email dan password untuk membuat user baru:

```json
{
  "email": "example@test.com",
  "password": "Example12345678"
}
```

**Response:**  
API akan mengembalikan JSON dengan ID user dalam format UUID:

```json
{
  "id": "randomUUID"
}
```

---

#### **Login User**

| Endpoint             | Metode | Deskripsi      |
| :------------------- | :----- | :------------- |
| `/api/v1/auth/login` | `POST` | **Login User** |

Masukkan email dan password user yang telah terdaftar:

```json
{
  "email": "example@test.com",
  "password": "Example12345678"
}
```

**Response:**  
API akan mengembalikan JSON dengan token autentikasi. Token ini digunakan untuk otorisasi setiap endpoint terkait **Task**:

```json
{
  "type": "Bearer",
  "token": "<token_jwt>"
}
```

---

### **Manajemen Task**

#### **Get All Tasks**

| Endpoint        | Metode | Deskripsi            |
| :-------------- | :----- | :------------------- |
| `/api/v1/tasks` | `GET`  | **Ambil Semua Task** |

Tambahkan token autentikasi di bagian **Authorization** dengan memilih tipe **Bearer Token**, kemudian isi field `token` dengan token yang diperoleh saat login.

**Response:**  
Jika belum ada task, response berupa array kosong:

```json
[]
```

Jika ada task, response berupa daftar task seperti berikut:

```json
[
  {
    "id": "randomUUID",
    "title": "Task Title",
    "status": "todo",
    "userId": "randomUUID"
  }
]
```

---

#### **Add Task**

| Endpoint        | Metode | Deskripsi       |
| :-------------- | :----- | :-------------- |
| `/api/v1/tasks` | `POST` | **Tambah Task** |

Tambahkan token autentikasi di bagian **Authorization** dengan tipe **Bearer Token**, lalu inputkan `title` task baru seperti berikut:

```json
{
  "title": "Task Baru"
}
```

**Response:**  
API akan mengembalikan JSON dengan informasi task yang baru dibuat:

```json
{
  "id": "randomUUID",
  "title": "Task Baru",
  "status": "todo",
  "userId": "randomUUID"
}
```

---

#### **Update Task**

| Endpoint            | Metode | Deskripsi       |
| :------------------ | :----- | :-------------- |
| `/api/v1/tasks/:id` | `PUT`  | **Update Task** |

Tambahkan token autentikasi di bagian **Authorization** dengan tipe **Bearer Token**.

Inputkan ID task yang ingin diperbarui di bagian `Params`, misalnya:

```
http://localhost:3002/api/v1/tasks/83b44e12-b67c-43d7-a4e0-18e615a01862
```

Untuk mengubah status task, gunakan salah satu dari 3 pilihan berikut: `["todo", "onprogress", "done"]`. Contoh input body:

```json
{
  "status": "onprogress"
}
```

**Response:**  
API akan mengembalikan JSON dengan informasi task yang telah diperbarui:

```json
{
  "id": "randomUUID",
  "title": "Task Baru",
  "status": "onprogress",
  "userId": "randomUUID"
}
```

---

#### **Delete Task**

| Endpoint            | Metode   | Deskripsi      |
| :------------------ | :------- | :------------- |
| `/api/v1/tasks/:id` | `DELETE` | **Hapus Task** |

Tambahkan token autentikasi di bagian **Authorization** dengan tipe **Bearer Token**.

Inputkan ID task yang ingin dihapus di bagian `Params`, misalnya:

```
http://localhost:3002/api/v1/tasks/83b44e12-b67c-43d7-a4e0-18e615a01862
```

**Response:**  
API akan mengembalikan JSON dengan informasi task yang telah dihapus:

```json
{
  "id": "randomUUID",
  "title": "Task Baru",
  "status": "onprogress",
  "userId": "randomUUID"
}
```

---

## 📝 Noted

- Proyek ini masih dalam tahap awal pembelajaran, sehingga data disimpan di local storage.
- Jika ingin mengembangkan lebih lanjut, Anda dapat mempertimbangkan untuk menggunakan database seperti MongoDB, PostgreSQL, atau MySQL.

## Authors

- Instagram: [@malllvinnn](https://www.instagram.com/malllvinnn/)
