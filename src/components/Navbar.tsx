"use client";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const items = useCartStore((state) => state.items);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Get current path
  const pathname = usePathname();

  // Calculate total items
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 👇 FIXED LOGIC: 
  // Navbar is "Dark" (Black text) if:
  // 1. We scrolled down
  // 2. OR We are NOT on the home page
  // 3. OR The Mobile Menu is OPEN (Important!)
  const isDark = isScrolled || pathname !== "/" || isMobileMenuOpen;

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isDark
            ? "bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-gray-100" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* === IMAGE LOGO === */}
          <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="relative h-10 w-40">
              <Image 
                src="/images/logo.png" 
                alt="Agbedoba Farms" 
                fill
                sizes="(max-width: 768px) 100px, 160px"
                // Invert logo colors if the background is white (isDark is true)
                className={`object-contain object-left transition ${isDark ? 'invert' : ''}`} 
                priority
              />
            </div>
          </Link>

          {/* Desktop Links */}
          <div className={`hidden md:flex items-center gap-8 font-medium text-sm uppercase tracking-wider ${isDark ? 'text-gray-800' : 'text-white'}`}>
            <Link href="/#story" className="hover:text-orange-400 transition relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-orange-400 hover:after:w-full after:transition-all">Our Story</Link>
            <Link href="/#shop" className="hover:text-orange-400 transition relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-orange-400 hover:after:w-full after:transition-all">Shop</Link>
            <Link href="/#contact" className="hover:text-orange-400 transition relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-orange-400 hover:after:w-full after:transition-all">Contact</Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link href="/cart" className="relative group p-3" onClick={() => setIsMobileMenuOpen(false)}>
              <div className={`transition ${isDark ? 'text-gray-800' : 'text-white'}`}>
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-orange-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              // The text color here will now be dark when menu is open because of `isDark`
              className={`md:hidden p-3 transition-colors duration-200 ${isDark ? 'text-gray-800' : 'text-white'}`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden animate-in slide-in-from-top-10 fade-in">
          <div className="flex flex-col gap-6 text-2xl font-bold text-gray-800">
            <Link href="/#story" onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
            <Link href="/#shop" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
            <Link href="/#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            <Link href="https://www.youtube.com/@agbedobafarms" className="text-red-600 flex items-center gap-2">YouTube <ArrowRight className="w-5 h-5"/></Link>
          </div>
        </div>
      )}
    </>
  );
}