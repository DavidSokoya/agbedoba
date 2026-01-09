"use client";
import { Product } from "../lib/products";
import { useCartStore } from "../store/cartStore";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function AddToCartBtn({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    
    // Simple visual feedback
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);
  };

  return (
    <button 
      onClick={handleAdd}
      className={`
        flex items-center gap-2 px-2 py-2 rounded-full text-sm font-bold transition-all duration-200
        ${isAdded 
          ? "bg-green-700 text-white scale-105" 
          : "bg-orange-500 text-white hover:bg-orange-600 active:scale-95"
        }
      `}
    >
      <ShoppingCart className="w-4 h-4" />
      {isAdded ? "Added!" : "Add to Cart"}
    </button>
  );
}