"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const clearCart = useCartStore((state) => state.clearCart);

  // Clear the cart when this page loads
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="text-center">
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-10 h-10" />
      </div>
      
      <h1 className="text-3xl font-bold text-green-950 mb-4">Order Received!</h1>
      <p className="text-gray-500 max-w-md mx-auto mb-8">
        Thank you for shopping with Agbedoba Farms. Your order <span className="font-mono font-bold text-gray-800">#{orderId?.slice(0, 6)}...</span> has been successfully placed.
      </p>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 max-w-sm mx-auto mb-8 shadow-sm">
        <p className="text-sm text-gray-400 mb-2">What happens next?</p>
        <p className="text-gray-800 font-medium">
          We will contact you via <br/> <span className="text-green-600">WhatsApp / Phone</span> <br/> shortly to confirm delivery.
        </p>
      </div>

      <Link 
        href="/"
        className="inline-flex items-center gap-2 bg-green-900 text-white px-8 py-3 rounded-full font-bold hover:bg-green-800 transition"
      >
        Back to Home <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6">
      <Suspense fallback={<div>Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}