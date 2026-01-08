# Agbedoba Farms: <a href="https://agbedoba-store.vercel.app" target="_blank">Visit Store</a>
<a href="https://agbedoba-store.vercel.app" target="_blank">
<img src="https://via.placeholder.com/800x400.png?text=Agbedoba+Farms+Demo+GIF" width="100%" alt="Agbedoba Farms Preview"/>
</a>

A premium e-commerce platform for Agbedoba Farms, enabling customers to securely order organic catfish and livestock. The platform features a seamless "farm-to-table" checkout experience, ensuring freshness and sustainability. It bridges the gap between traditional farming and modern digital commerce in Lagos.


## Tech used: 
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase) ![Paystack](https://img.shields.io/badge/Paystack-0BA6FF?style=for-the-badge&logo=paystack&logoColor=white) ![Zustand](https://img.shields.io/badge/Zustand-bear-brown?style=for-the-badge)


## Optimizations
One major area for optimization was the product page performance. I implemented **Static Site Generation (SSG)** using `generateStaticParams` to pre-build individual product pages at build time, reducing database reads to zero for browsing users. I also utilized a **"One-Write" Server Architecture** for checkout, where prices are recalculated securely on the server to prevent client-side manipulation before writing to Firebase.

**Future Improvements:**
The next phase of development will focus on empowering the administrator. I plan to build a full **CRUD (Create, Read, Update, Delete)** interface within the Admin Dashboard, allowing the farm owner to add new products, update prices, and delete out-of-stock items directly from the UI without modifying code.

## Lessons Learned
Handling the integration between **Next.js App Router** and **Paystack** was a key learning curve. I learned how to securely initialize transactions on the server side and verify payment references via a dedicated API route before confirming orders in Firestore. Also, I learned to manage **Dynamic Navbar Visibility** by utilizing the `usePathname` hook to detect page changes and invert text colors for better accessibility on white backgrounds (like the Cart page) vs. the dark Hero section.

## Admin Access

To secure the Admin Dashboard (`/admin`), a secure PIN must be configured manually in the environment variables.

1. Open your `.env.local` file.
2. Add the variable: `ADMIN_SECRET_PIN="your_secure_password"`
3. Restart the server.

## Installation

1. Clone repo
2. Run `npm install`
3. Create a `.env.local` file and add your keys:
   ```env
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_id
   FIREBASE_CLIENT_EMAIL=your_email
   FIREBASE_PRIVATE_KEY="your_private_key"
   ADMIN_SECRET_PIN="create_your_own_password"
   PAYSTACK_SECRET_KEY="sk_test_..."
   PAYSTACK_PUBLIC_KEY="pk_test_..."