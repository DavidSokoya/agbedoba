"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImageGalleryProps {
  images: string[]; 
  productName: string;
  tag: string;
}

export default function ProductImageGallery({ images, productName, tag }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

   const safeImages = images.length > 0 ? images : ["/images/placeholder.jpg"];

  return (
    <div className="flex flex-col gap-4 md:sticky md:top-28">
      
      {/* --- MAIN LARGE IMAGE --- */}
      <div className="relative aspect-square bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm group">
        <div className="absolute top-4 left-4 z-20 bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full uppercase tracking-wide">
           {tag}
        </div>
        
        <Image
          src={safeImages[selectedIndex]}
          alt={`${productName} view ${selectedIndex + 1}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
      </div>

      {/* --- THUMBNAIL GRID --- */}
      <div className="grid grid-cols-4 gap-3 sm:gap-4">
        {safeImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelectedIndex(i)}
            className={`
              relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2
              ${selectedIndex === i 
                ? "border-orange-500 shadow-md scale-95 ring-2 ring-orange-200" 
                : "border-transparent hover:border-gray-300 hover:shadow-sm"
              }
            `}
          >
            <Image
              src={img}
              alt={`Thumbnail ${i + 1}`}
              fill
              className="object-cover"
            />
            {/* Darken inactive images slightly */}
            <div className={`absolute inset-0 bg-black/0 transition-colors ${selectedIndex !== i ? "bg-black/10 hover:bg-black/20" : ""}`} />
          </button>
        ))}
      </div>
    </div>
  );
}