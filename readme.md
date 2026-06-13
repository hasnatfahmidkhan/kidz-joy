# 🎉 Kidz Joy — E-Commerce Platform for Kids

A modern full-stack e-commerce platform for children’s toys and educational products, built with **Next.js 16**, **React 19**, and **MongoDB**.

![Kidz Joy](https://res.cloudinary.com/dye6u4hpt/image/upload/q_auto/f_auto/v1781352467/home_banner_qmydpy.webp)

---

## 📌 Table of Contents

* ✨ Features
* 🛠 Tech Stack
* 📁 Project Structure
* 🚀 Getting Started
* 🔐 Environment Setup
* 🧩 Scripts
* 🎨 Design System
* 📍 Routes
* 🔑 Feature Breakdown
* 🚀 Deployment
* 🤝 Contributing
* 📞 Support
* 📝 License

---

## ✨ Features

### 🛍️ Core E-Commerce

* Product catalog with search & filters
* Shopping cart with persistent state
* Secure multi-step checkout
* SSLCommerz payment integration
* Order tracking system
* Product reviews & ratings

### 👤 User System

* Email/password + Google OAuth login
* Profile management
* Wishlist (session-based)
* Responsive mobile-first UI

### 🔧 Admin Panel

* Product CRUD (create, update, delete)
* Order management
* Dashboard analytics
* User & inventory control

---

## 🛠 Tech Stack

| Layer         | Stack                                         |
| ------------- | --------------------------------------------- |
| Frontend      | Next.js 16, React 19, Tailwind CSS 4, DaisyUI |
| Backend       | Next.js Server Actions, API Routes            |
| Database      | MongoDB 7.2                                   |
| Auth          | NextAuth 4.24, bcryptjs                       |
| Payments      | SSLCommerz                                    |
| UI/UX         | Swiper, React Icons, DaisyUI                  |
| Notifications | React Hot Toast                               |
| Dev Tools     | ESLint 9                                      |

---

## 📁 Project Structure

```
src/
├── app/                # App Router
│   ├── (public)/      # Public pages
│   ├── (dashboard)/   # Admin panel
│   ├── api/           # API routes
│   └── layout.jsx
│
├── components/
│   ├── admin/
│   ├── auth/
│   ├── cart/
│   ├── checkout/
│   ├── layout/
│   ├── navbar/
│   └── wishlist/
│
├── context/
├── hooks/
├── lib/
├── provider/
├── action/server/
└── data/
```

---

## 🚀 Getting Started

### 1. Clone repo

```bash
git clone https://github.com/yourusername/kidz-joy.git
cd kidz-joy
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment

Create `.env.local` (see below)

### 4. Run development server

```bash
npm run dev
```

Open: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Variables

```env
MONGODB_URI=your_mongo_uri

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret

GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret

NEXT_PUBLIC_SSLCOMMERZ_STORE_ID=your_store_id
SSLCOMMERZ_STORE_PASSWORD=your_password
```

Generate secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🧩 Scripts

```bash
npm run dev       # Dev server
npm run build     # Production build
npm start         # Start production
npm run lint      # ESLint check
```

---

## 🎨 Design System

### Colors

```css
--primary: oklch(65% 0.23 35);
--secondary: oklch(58% 0.18 30);
--accent: oklch(72% 0.2 55);
--success: oklch(70% 0.17 145);
--error: oklch(62% 0.24 28);
```

### Typography

* Font: **Poppins**
* Weights: 100 → 900

---

## 📍 Routes Overview

### Public

* `/` Home
* `/shop` Products
* `/products/[id]` Product details
* `/cart` Cart
* `/checkout` Checkout
* `/login` / `/register`

### User (Protected)

* `/wishlist`
* `/orders`
* `/profile`

### Admin (Protected)

* `/admin` Dashboard
* `/admin/products`
* `/admin/orders`

---

## 🔑 Feature Highlights

### 🛒 Cart System

* React Context state management
* Persistent storage
* Quantity updates + discount logic

### 🔐 Authentication

* JWT session-based auth
* OAuth (Google)
* Route protection middleware

### 💳 Payments

* SSLCommerz gateway
* Order confirmation flow
* Failure/success handling

### ⭐ Wishlist

* Login-required feature
* Session-aware storage
* Auto redirect handling

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
git push origin main
```

Then import project in:
[https://vercel.com/import](https://vercel.com/import)

Add environment variables in dashboard.

---

## 🤝 Contributing

```bash
git checkout -b feature-name
git commit -m "Add feature"
git push origin feature-name
```

Open a Pull Request 🚀

---

## 📞 Support

* Email: [support@kidzjoy.com](mailto:support@kidzjoy.com)
* Issues: GitHub Issues
* Discussions: GitHub Discussions

---

## 📝 License

© 2024 Kidz Joy — All rights reserved.

---
