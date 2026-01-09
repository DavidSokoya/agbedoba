"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  
  const reference = searchParams.get('reference'); 

  useEffect(() => {
    if (!reference) return;

    const verifyPayment = async () => {
      try {
        const res = await fetch('/api/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reference }),
        });

        const data = await res.json();

        if (data.success) {
          router.push(`/success?orderId=${data.orderId}`);
        } else {
          alert("Payment could not be verified. Please contact support.");
          router.push('/');
        }
      } catch (error) {
        console.error("Verification error", error);
      }
    };

    verifyPayment();
  }, [reference, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF7]">
      <Loader2 className="w-12 h-12 text-green-700 animate-spin mb-4" />
      <h2 className="text-xl font-bold text-gray-800">Verifying Payment...</h2>
      <p className="text-gray-500">Please do not close this window.</p>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyContent />
    </Suspense>
  )
}