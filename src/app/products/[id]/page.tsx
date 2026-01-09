import { PRODUCTS } from "@/lib/products";
import AddToCartBtn from "@/components/AddToCartBtn";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Star, Truck, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";
import ProductImageGallery from "@/components/ProductImageGallery";

// Tell Next.js which products to build statically
export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

// Updated Type Definition for Next.js 15
type Props = {
  params: Promise<{ id: string }>;
};

// Component is async and awaits params
export default async function ProductPage({ params }: Props) {
  
  const { id } = await params;
  
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FDFBF7] font-sans">
      <Navbar />

      <div className="pt-28 pb-16 max-w-7xl mx-auto px-6">
        {/* Back Link */}
        <Link 
          href="/#shop" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 transition mb-8 font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Product Image Gallery */}
            <ProductImageGallery 
            images={product.gallery} 
            productName={product.name}
            tag={product.tag}
            />
          {/* Product Details */}
          <div className="flex flex-col h-full animate-in slide-in-from-right-8 fade-in duration-500">
            
            {/* Header */}
            <h1 className="text-3xl md:text-5xl font-bold text-green-950 mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
               <div className="flex text-orange-400">
                 {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
               </div>
               <span className="text-gray-400 text-sm">(42 Verified Reviews)</span>
            </div>

            {/* Price */}
            <div className="text-4xl font-bold text-green-700 mb-8 border-b border-gray-200 pb-8">
              ₦{(product.price / 100).toLocaleString()}
              <span className="text-base font-normal text-gray-400 ml-2">/ per pack</span>
            </div>

            {/* Description */}
            <div className="prose prose-gray max-w-none mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {product.description}
              </p>
              <p className="text-gray-600 leading-relaxed text-lg mt-4">
                Raised on Agbedoba Farms with 100% organic feed. We ensure every cut is fresh, hygienic, and processed under strict quality control standards.
              </p>
            </div>

            {/* Benefits List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <div className="flex items-center gap-3 text-gray-700 bg-white p-3 rounded-lg border border-gray-100">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="font-medium">Organic Feed</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 bg-white p-3 rounded-lg border border-gray-100">
                <Truck className="w-5 h-5 text-green-600" />
                <span className="font-medium">Next Day Delivery</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 bg-white p-3 rounded-lg border border-gray-100">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <span className="font-medium">Hygiene Certified</span>
              </div>
            </div>

            {/* Action Area */}
            <div className="mt-auto bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500 text-center sm:text-left">
                <span className="block font-bold text-green-800">Ready to order?</span>
                Delivery calculated at checkout.
              </div>
              {/* Reuse the button */}
              <div className="scale-110">
                <AddToCartBtn product={product} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}