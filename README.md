# 🎬 MovieFlix

MovieFlix is a modern movie streaming web app built with **React, TypeScript, Vite, Redux Toolkit, TailwindCSS, Axios, React Router, React Hook Form and Firebase**.  
It allows users to **search movies, view details, manage a watch list, and log in securely**.

---

## 🚀 Features

- 🔍 **Search Movies** – Browse and search movies quickly  
- 📄 **Movie Details** – View detailed info about each movie  
- ⭐ **Watchlist** – Save your favorite movies (private & authenticated)  
- 🔐 **Authentication** – Firebase login system  
- 🎨 **Responsive UI** – Styled with TailwindCSS  
- 🛡 **Protected Routes** – Using custom `PrivateRoute`  
- ⚠ **404 Page** – Friendly Not Found page  

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Vite  
- **State Management:** Redux Toolkit  
- **Styling:** TailwindCSS  
- **Auth & Storage:** Firebase  
- **Routing:** React Router v7  
- **Forms:** React Hook Form  
- **HTTP Client:** Axios  

---

## 📦 Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/movieflix.git
   cd movieflix
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up Firebase:

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)  
   - Add web app credentials  
   - Copy Firebase config and place it in your `.env` file:

     ```env
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     VITE_TMDB_API_KEY= YOUR API KEY
     ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

---

## 📂 Project Structure

```
src/
 ├─ components/
 │   └─ PrivateRoute.tsx
 ├─ layout/
 │   └─ MainLayout.tsx
 ├─ pages/
 │   ├─ SearchPage.tsx
 │   ├─ MovieDetails.tsx
 │   ├─ Movies.tsx
 │   ├─ WatchListPage.tsx
 │   ├─ LoginPage.tsx
 │   └─ 404.tsx
 ├─ router/
 │   └─ index.tsx
 ├─ redux/
 │   └─ store.ts
 └─ main.tsx
```

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
