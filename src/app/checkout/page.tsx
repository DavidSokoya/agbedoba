"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ShieldCheck, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, totalPrice } = useCartStore();
  const router = useRouter();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "Lagos", 
    state: "Lagos",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 👇 THIS IS THE CRITICAL UPDATE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Send order details to our API
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData: formData,
          cartItems: items
        }),
      });

      const result = await response.json();

      if (result.success && result.checkoutUrl) {
        // 2. REDIRECT TO PAYSTACK
        console.log("Redirecting to Paystack:", result.checkoutUrl);
        window.location.href = result.checkoutUrl;
      } else {
        alert("Payment initialization failed: " + (result.error || "Unknown Error"));
        setIsSubmitting(false);
      }

    } catch (error) {
      console.error(error);
      alert("Failed to connect to server.");
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <Link href="/#shop" className="text-orange-500 hover:underline">Return to Shop</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDFBF7] font-sans">
      <div className="bg-white border-b border-gray-100 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
           <Link href="/cart" className="flex items-center gap-2 text-gray-500 hover:text-green-800 transition text-sm font-medium">
             <ArrowLeft className="w-4 h-4" /> Back to Cart
           </Link>
           <span className="font-bold text-xl tracking-tight text-green-950">Agbedoba<span className="text-orange-500">.</span>Checkout</span>
           <div className="flex items-center gap-1 text-green-700 text-xs font-bold bg-green-50 px-2 py-1 rounded border border-green-100">
             <Lock className="w-3 h-3" /> Secure
           </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* FORM SECTION */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm">1</div>
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <input required name="name" type="text" placeholder="e.g. Adewale Johnson" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <input required name="phone" type="tel" placeholder="e.g. 0801 234 5678" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition" onChange={handleChange} />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <input required name="email" type="email" placeholder="e.g. wale@gmail.com" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition" onChange={handleChange} />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm">2</div>
                  Delivery Address
                </h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Street Address</label>
                    <input required name="address" type="text" placeholder="e.g. 15, Admiralty Way" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition" onChange={handleChange} />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">City</label>
                      <select name="city" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition" onChange={handleChange}>
                        <option value="Lagos">Lagos Island</option>
                        <option value="Ikeja">Ikeja / Mainland</option>
                        <option value="Lekki">Lekki / Ajah</option>
                        <option value="Ikorodu">Ikorodu</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">State</label>
                      <input disabled value="Lagos State" className="w-full p-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed" />
                    </div>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-green-800 transition shadow-xl shadow-green-900/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Connecting to Paystack...</span>
                ) : (
                  <>
                    Pay Now <span className="bg-white/20 px-2 py-0.5 rounded text-sm">₦{(totalPrice() / 100).toLocaleString()}</span>
                  </>
                )}
              </button>
              
              <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Secured by Paystack
              </p>
            </form>
          </div>

          {/* ORDER SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Your Order</h3>
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                      <span className="absolute bottom-0 right-0 bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center font-bold">x{item.quantity}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-800 line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-gray-500">₦{(item.price / 100).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between items-center">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-xl text-green-900">₦{(totalPrice() / 100).toLocaleString()}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}