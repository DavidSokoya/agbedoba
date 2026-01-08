// src/lib/products.ts

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;      // Used for the Home Page thumbnail
  gallery: string[];  // NEW: Used for the Product Page gallery
  tag: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "prod_catfish_smoked",
    name: "Oven-Dried Smoked Catfish",
    price: 850000,
    description: "Sand-free, stone-free, and ready to eat. Perfectly dried for long shelf life.",
    image: "/images/smoked-catfish.jpg", 
    // 👇 ADD DIFFERENT IMAGES HERE
    gallery: [
      "/images/smoked-catfish.jpg",      // Main View
      "/images/smoked-catfish-2.jpg",    // Side View
      "/images/smoked-catfish-3.jpg",    // Packaging View
      "/images/smoked-catfish-4.jpg"     // Cooking View
    ],
    tag: "Best Seller"
  },
  {
    id: "prod_bbq_ram",
    name: "Spicy BBQ Ram Platter",
    price: 1500000,
    description: "Tender grilled ram meat with our signature pepper sauce. Great for weekends.",
    image: "/images/bbq-ram.jpg",
    gallery: [
      "/images/bbq-ram.jpg",
      "/images/bbq-ram-2.jpg",
      "/images/bbq-ram-3.jpg",
      "/images/bbq-ram-4.jpg"
    ],
    tag: "Hot & Spicy"
  },
  {
    id: "prod_catfish_live",
    name: "Jumbo Live Catfish (1kg)",
    price: 350000,
    description: "Fresh from the pond. We clean and cut upon request for delivery.",
    image: "/images/live-catfish.jpg",
    gallery: [
      "/images/live-catfish.jpg",
      "/images/live-catfish-2.jpg",
      "/images/live-catfish-3.jpg",
      "/images/live-catfish-4.jpg"
    ],
    tag: "Fresh"
  },
];