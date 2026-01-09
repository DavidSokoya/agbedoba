import { PRODUCTS } from "@/lib/products";
import AddToCartBtn from "@/components/AddToCartBtn"; 
import Navbar from "@/components/Navbar"; 
import Image from "next/image";
import Link from "next/link";
// 👇 Import your refactored components
import { 
  ProcessCard, 
  SocialPill, 
  FooterSocial, 
  TikTokIcon, 
  TwitterXIcon 
} from "@/components/ui";

import { 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Sprout, 
  Flame, 
  Truck, 
  Fish,
  Youtube 
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans selection:bg-orange-100 selection:text-orange-900">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[85vh] flex items-center pt-24 pb-12 overflow-hidden bg-green-950">
        
        {/* --- BACKGROUND LAYERS --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            {/* 1. Pattern Image */}
            <div className="absolute inset-0 opacity-98 mix-blend-soft-light">
              <Image 
                src="/images/hero-pattern.png" 
                alt="Pattern"
                fill
                sizes="100vw"
                className="object-cover" 
                priority
              />
            </div>
            {/* 2. Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-green-950/80 via-green-900/80 to-green-950"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* LEFT: Content */}
          <div className="text-center md:text-left pt-8 md:pt-0 animate-in slide-in-from-bottom-10 fade-in duration-700">
            
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full px-4 py-1.5 text-orange-400 text-xs font-bold mb-8">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"/>
              #1 Organic Farm in Lagos
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tighter leading-[1.05] mb-6">
              Taste the <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-200">
                Agbedoba
              </span> <br/>
              Difference.
            </h1>
            
            <p className="text-base sm:text-lg text-gray-300 mb-10 leading-relaxed max-w-lg mx-auto md:mx-0">
              Premium Catfish & Ram farming. From our ponds and pastures directly to your grill. Experience the freshest meat in town.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/#shop" className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transform active:scale-95">
                Order Now <ArrowRight className="w-4 h-4" />
              </Link>

              <Link href="/#process" className="px-8 py-4 rounded-full font-bold text-white border border-white/20 hover:bg-white/10 transition flex items-center justify-center gap-2">
                 <Sprout className="w-4 h-4 text-green-400" /> How We Farm
              </Link>
            </div>
          </div>

          {/* RIGHT: Hero Image */}
          <div className="relative h-[400px] lg:h-[500px] w-full hidden md:flex items-center justify-center animate-in slide-in-from-right-10 fade-in duration-1000">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-green-500/30 blur-[60px] rounded-full" />
             <div className="relative w-full h-full">
               <Image 
                 src="/images/hero.png" 
                 alt="Delicious Grilled Catfish"
                 fill
                 sizes="(max-width: 768px) 100vw, 50vw"
                 className="object-contain drop-shadow-2xl hover:scale-105 transition duration-700"
                 priority
               />
             </div>
          </div>
        </div>
      </section>

      {/* --- TRUST BADGES --- */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
              {['100% Organic', 'Fast Delivery', 'Halal Certified', 'Hygenic Process'].map((feature, i) => (
                  <div key={i} className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-3">
                      <div className="p-2.5 bg-green-50 rounded-full text-green-700 mb-2 md:mb-0">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <span className="text-gray-800 font-bold text-sm md:text-base">{feature}</span>
                  </div>
              ))}
            </div>
        </div>
      </section>

      {/* --- PROCESS SECTION --- */}
      <section id="process" className="py-20 md:py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-orange-500 font-bold uppercase tracking-wider text-xs md:text-sm">How We Do It</span>
            <h2 className="text-3xl md:text-5xl font-bold text-green-950 mt-3">The Agbedoba Standard</h2>
            <p className="text-gray-500 mt-4 text-sm md:text-base">We control the entire value chain to ensure you get the safest, tastiest protein.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProcessCard 
              number="01"
              icon={<Sprout className="w-6 h-6 text-white" />}
              title="Organic Breeding"
              desc="Raised on 100% organic feed in clean environments."
              color="bg-green-600"
            />
            <ProcessCard 
              number="02"
              icon={<Fish className="w-6 h-6 text-white" />}
              title="Hygenic Harvest"
              desc="Harvested live and processed immediately for freshness."
              color="bg-green-700"
            />
            <ProcessCard 
              number="03"
              icon={<Flame className="w-6 h-6 text-white" />}
              title="Smoked & Spiced"
              desc="Seasoned with secret recipes and wood-smoked to perfection."
              color="bg-orange-500"
            />
            <ProcessCard 
              number="04"
              icon={<Truck className="w-6 h-6 text-white" />}
              title="Swift Delivery"
              desc="Packed securely and delivered hot to your doorstep."
              color="bg-green-800"
            />
          </div>
        </div>
      </section>

      {/* --- OUR STORY SECTION --- */}
      <section id="story" className="py-20 md:py-24 bg-[#F3F4F1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            
            {/* Image */}
            <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[500px]">
              <div className="absolute top-0 left-0 w-2/3 h-2/3 rounded-3xl overflow-hidden shadow-2xl z-10 border-4 border-white">
                <Image src="/images/farm-story.jpg" alt="Farm" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 w-2/3 h-2/3 rounded-3xl overflow-hidden shadow-2xl z-20 border-4 border-white">
                <Image src="/images/smoked-catfish.jpg" alt="Food" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
              </div>
              {/* Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 lg:w-32 lg:h-32 bg-orange-500 rounded-full flex items-center justify-center z-30 shadow-xl border-4 border-white">
                 <span className="text-white font-bold text-center leading-tight text-sm lg:text-base">Since<br/><span className="text-xl lg:text-2xl">2020</span></span>
              </div>
            </div>

            {/* Text Content */}
            <div className="w-full lg:w-1/2">
              <span className="text-orange-600 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                <span className="w-8 h-[2px] bg-orange-600"></span> Our Story
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-green-950 mt-4 mb-6 leading-tight">
                Rooted in <br/> <span className="italic text-green-700 font-serif">Tradition.</span>
              </h2>
              
              <div className="space-y-6 text-base md:text-lg text-gray-600 font-light leading-relaxed">
                <p>
                  Agbedoba Farms wasn't built in a boardroom. It started on a small piece of land with a simple belief: 
                  <strong className="text-green-900 font-medium"> Nigerians deserve better food.</strong>
                </p>
                <div className="pl-6 border-l-4 border-orange-200 bg-white/50 p-4 rounded-r-xl">
                  <p className="italic text-gray-500 text-sm md:text-base">
                    "Food is medicine. When you eat Agbedoba, you aren't just eating BBQ; you are eating pure, unadulterated health."
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <SocialPill href="https://instagram.com" icon={<Instagram size={18}/>} label="Instagram" />
                <SocialPill href="https://tiktok.com" icon={<TikTokIcon size={18} />} label="TikTok" />
                <SocialPill href="https://twitter.com" icon={<TwitterXIcon size={18} />} label="Twitter" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SHOP SECTION --- */}
      <section id="shop" className="py-20 md:py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10 text-center md:text-left">
            <span className="text-orange-500 font-bold uppercase tracking-wider text-xs md:text-sm">Online Store</span>
            <h2 className="text-3xl md:text-4xl font-bold text-green-950 mt-2">Farm Favorites</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="group bg-gray-50 rounded-3xl p-4 transition duration-300 hover:shadow-xl hover:shadow-gray-200 flex flex-col">
                <Link href={`/products/${product.id}`} className="relative h-64 w-full rounded-2xl overflow-hidden bg-white mb-6 block cursor-pointer">
                  <div className="absolute top-3 left-3 z-10 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
                    {product.tag}
                  </div>
                  <Image 
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </Link>
                <div className="px-2 pb-2 flex flex-col flex-grow">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-orange-500 transition">{product.name}</h3>
                  </Link>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
                      {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
                    <span className="text-xl font-bold text-green-700">
                      ₦{(product.price / 100).toLocaleString()}
                    </span>
                    <AddToCartBtn product={product} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contact" className="bg-green-950 text-white py-12 md:py-20 border-t-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          <div className="md:col-span-1">
            <h3 className="text-3xl font-bold mb-4 tracking-tight">Agbedoba<span className="text-orange-500">.</span></h3>
            <p className="text-green-200/80 mb-6 leading-relaxed text-sm">
              Sustainable farming. Premium protein. Directly to your family.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
               <FooterSocial href="#" icon={<Instagram size={18} />} />
               <FooterSocial href="#" icon={<TikTokIcon size={18} />} />
               <FooterSocial href="#" icon={<TwitterXIcon size={18} />} />
               <FooterSocial href="#" icon={<Youtube size={18} />} />
            </div>
          </div>
          <div className="hidden md:block"></div>
          <div>
            <h4 className="font-bold text-lg mb-6 text-orange-500">Explore</h4>
            <ul className="space-y-4 text-green-100/70 text-sm">
              <li><Link href="/#story" className="hover:text-white transition">Our Story</Link></li>
              <li><Link href="/#shop" className="hover:text-white transition">Shop Now</Link></li>
              <li><Link href="/cart" className="hover:text-white transition">View Cart</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6 text-orange-500">Contact</h4>
            <ul className="space-y-4 text-green-100/70 text-sm flex flex-col items-center md:items-start">
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-white" />
                <span>Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-white" />
                <span>+234 810 000 0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-white" />
                <span>orders@agbedoba.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-green-900 text-center text-green-400 text-sm">
          © {new Date().getFullYear()} Agbedoba Farms. All rights reserved.
        </div>
      </footer>
    </main>
  );
}