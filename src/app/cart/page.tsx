"use client";

import Navbar from "@/components/Navbar";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
// 👇 Added ArrowLeft here
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const { items, addItem, decreaseItem, removeItem, totalPrice } = useCartStore();

  return (
    <main className="min-h-screen bg-[#FDFBF7] font-sans">
      <Navbar />

      <div className="pt-32 pb-20 max-w-5xl mx-auto px-6">
        
        {/* 👇 NEW BACK BUTTON */}
        <Link 
          href="/#shop" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 transition mb-6 font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>

        <h1 className="text-3xl font-bold text-green-950 mb-8">Your Basket</h1>

        {items.length === 0 ? (
          // --- EMPTY STATE ---
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added any fresh produce yet.</p>
            <Link 
              href="/#shop" 
              className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          // --- CART CONTENT ---
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Item List */}
            <div className="flex-grow space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-6 items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                  
                  {/* Image */}
                  <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill 
                      className="object-cover" 
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-green-950 text-lg">{item.name}</h3>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <p className="text-sm text-gray-500 mb-4">{item.description.substring(0, 60)}...</p>

                    <div className="flex items-center justify-between">
                      <div className="text-green-700 font-bold">
                        ₦{(item.price * item.quantity / 100).toLocaleString()}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
                        <button 
                          onClick={() => decreaseItem(item.id)}
                          className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm hover:text-orange-500 transition"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => addItem(item)}
                          className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm hover:text-green-600 transition"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Card */}
            <div className="w-full lg:w-96 flex-shrink-0">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg sticky top-32">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>₦{(totalPrice() / 100).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Delivery</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Calculated next</span>
                  </div>
                  <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-xl text-green-900">
                    <span>Total</span>
                    <span>₦{(totalPrice() / 100).toLocaleString()}</span>
                  </div>
                </div>

                <Link 
                  href="/checkout"
                  className="w-full block text-center bg-green-900 text-white py-4 rounded-xl font-bold hover:bg-green-800 transition shadow-lg shadow-green-900/20"
                >
                  Proceed to Checkout
                </Link>
                
                 <p className="text-xs text-center text-gray-400 mt-4">
                  Secure checkout powered by Paystack
                 </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}