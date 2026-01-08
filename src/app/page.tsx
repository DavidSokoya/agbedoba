import { PRODUCTS } from "@/lib/products";
import AddToCartBtn from "@/components/AddToCartBtn"; 
import Navbar from "@/components/Navbar"; 
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Youtube, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Sprout, 
  Flame, 
  Truck, 
  Fish 
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-gray-900 selection:bg-orange-100 selection:text-orange-900 font-sans">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-green-900">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-20">
            <Image 
              src="/images/hero-pattern.png" 
              alt="Pattern"
              fill
              className="object-cover"
              priority
            />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* LEFT: Text Content */}
          <div className="animate-in slide-in-from-left-10 fade-in duration-700 order-2 md:order-1 pb-10 md:pb-0">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1 text-orange-400 text-sm font-bold mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"/>
              Fast Delivery in Lagos
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
              Taste the <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-200">
                Agbedoba
              </span> <br/>
              Difference.
            </h1>
            
            <p className="text-lg md:text-xl text-green-100 mb-8 leading-relaxed max-w-lg">
              Premium Catfish & Ram farming. From our ponds and pastures directly to your grill. Experience the freshest meat in town.
            </p>

            <div className="flex flex-wrap gap-4">
              {/* Primary CTA */}
              <Link href="/#shop" className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-500/30 flex items-center gap-2 transform hover:-translate-y-1">
                Order Now <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Creative Secondary CTA */}
              <Link href="/#process" className="group relative px-8 py-4 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] border border-white/30 bg-white/10 backdrop-blur-sm">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                <div className="flex items-center gap-3 relative z-10">
                   <Sprout className="w-5 h-5 text-green-300 group-hover:text-white group-hover:-translate-y-1 transition-transform duration-300" />
                   <span>How We Farm</span>
                </div>
              </Link>
            </div>
          </div>

          {/* RIGHT: Hero Image */}
          <div className="relative h-[400px] md:h-[600px] w-full order-1 md:order-2 animate-in slide-in-from-right-10 fade-in duration-1000">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-green-500/20 blur-3xl rounded-full" />
             <Image 
               src="/images/hero.png" 
               alt="Delicious Grilled Catfish"
               fill
               className="object-contain drop-shadow-2xl hover:scale-105 transition duration-700"
               priority
             />
          </div>
        </div>
      </section>

      {/* --- TRUST BADGES --- */}
      <section className="border-b border-gray-200 bg-white relative z-20 -mt-8 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] mx-2 md:mx-0">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {['100% Organic Feed', 'Same Day Delivery', 'Halal Certified', 'Hygenic Processing'].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-700 font-bold text-sm md:text-base">
                    <div className="p-2 bg-green-100 rounded-full text-green-700">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    {feature}
                </div>
            ))}
        </div>
      </section>

      {/* --- PROCESS SECTION --- */}
      <section id="process" className="py-24 bg-white overflow-hidden scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">How We Do It</span>
            <h2 className="text-3xl md:text-5xl font-bold text-green-950 mt-2">The Agbedoba Standard</h2>
            <p className="text-gray-500 mt-4">We control the entire value chain to ensure you get the safest, tastiest protein.</p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Connecting Line (Desktop Only) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-green-100 via-orange-100 to-green-100 -z-10" />

            {/* Step 1 */}
            <ProcessCard 
              number="01"
              icon={<Sprout className="w-6 h-6 text-white" />}
              title="Organic Breeding"
              desc="Our catfish and rams are raised on 100% organic feed in clean, spacious environments."
              color="bg-green-600"
            />
            {/* Step 2 */}
            <ProcessCard 
              number="02"
              icon={<Fish className="w-6 h-6 text-white" />}
              title="Hygenic Harvest"
              desc="We harvest live from the pond and process immediately to lock in freshness."
              color="bg-green-700"
            />
            {/* Step 3 */}
            <ProcessCard 
              number="03"
              icon={<Flame className="w-6 h-6 text-white" />}
              title="Smoked & Spiced"
              desc="Seasoned with our secret family recipe and wood-smoked or grilled to perfection."
              color="bg-orange-500"
            />
             {/* Step 4 */}
            <ProcessCard 
              number="04"
              icon={<Truck className="w-6 h-6 text-white" />}
              title="Swift Delivery"
              desc="Packed securely and delivered hot (or dried) to your doorstep in Lagos."
              color="bg-green-800"
            />
          </div>
        </div>
      </section>

      {/* --- OUR STORY SECTION --- */}
      <section id="story" className="py-24 bg-[#F3F4F1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            
            {/* Image Collage Layout */}
            <div className="w-full md:w-1/2 relative h-[600px] hidden md:block">
              <div className="absolute top-0 left-0 w-2/3 h-2/3 rounded-3xl overflow-hidden shadow-2xl z-10 border-4 border-white">
                <Image src="/images/farm-story.jpg" alt="Farm" fill className="object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 w-2/3 h-2/3 rounded-3xl overflow-hidden shadow-2xl z-20 border-4 border-white">
                <Image src="/images/smoked-catfish.jpg" alt="Food" fill className="object-cover" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-orange-500 rounded-full flex items-center justify-center z-30 shadow-xl border-4 border-white">
                 <span className="text-white font-bold text-center leading-tight">Since<br/><span className="text-2xl">2020</span></span>
              </div>
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2">
              <span className="text-orange-600 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                <span className="w-8 h-[2px] bg-orange-600"></span> Our Story
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-green-950 mt-4 mb-8 leading-tight">
                Rooted in <br/> <span className="italic text-green-700 font-serif">Tradition.</span>
              </h2>
              
              <div className="space-y-6 text-lg text-gray-600 font-light leading-relaxed">
                <p>
                  Agbedoba Farms wasn't built in a boardroom. It started on a small piece of land with a simple belief: 
                  <strong className="text-green-900 font-medium"> Nigerians deserve better food.</strong>
                </p>
                <p>
                  We saw a market flooded with chemically-preserved fish and poorly fed livestock. We decided to go the hard way—organic feed, clean water, and patience.
                </p>
                <div className="pl-6 border-l-4 border-orange-200">
                  <p className="italic text-gray-500">
                    "Food is medicine. When you eat Agbedoba, you aren't just eating BBQ; you are eating pure, unadulterated health."
                  </p>
                </div>
              </div>

              <div className="mt-10 flex gap-6">
                <SocialPill href="https://www.instagram.com/agbedobafarms" icon={<Instagram size={20}/>} label="Instagram" />
                <SocialPill href="https://www.tiktok.com/@agbedobafarms" icon={<TikTokIcon />} label="TikTok" />
                <SocialPill href="https://x.com/agbedobafarms" icon={<TwitterXIcon />} label="Twitter" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SHOP SECTION --- */}
      <section id="shop" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">Online Store</span>
              <h2 className="text-3xl md:text-4xl font-bold text-green-950 mt-2">Farm Favorites</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="group bg-gray-50 rounded-3xl p-4 transition duration-300 hover:shadow-xl hover:shadow-gray-200 flex flex-col">
                
                {/* Product Image - Clickable */}
                <Link href={`/products/${product.id}`} className="relative h-64 w-full rounded-2xl overflow-hidden bg-white mb-6 block cursor-pointer">
                  <div className="absolute top-3 left-3 z-10 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
                    {product.tag}
                  </div>
                  <Image 
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </Link>

                {/* Info */}
                <div className="px-2 pb-2 flex flex-col flex-grow">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-orange-500 transition">{product.name}</h3>
                  </Link>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
                      {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
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
      <footer id="contact" className="bg-green-950 text-white py-20 border-t-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Info */}
          <div className="md:col-span-1">
            <h3 className="text-3xl font-bold mb-6 tracking-tight">Agbedoba<span className="text-orange-500">.</span></h3>
            <p className="text-green-200/80 mb-6 leading-relaxed text-sm">
              We are dedicated to sustainable farming practices and providing the highest quality protein to Nigerian families.
            </p>
            {/* Socials Grid */}
            <div className="flex gap-4">
               <FooterSocial href="https://www.instagram.com/agbedobafarms" icon={<Instagram size={18} />} />
               <FooterSocial href="https://www.tiktok.com/@agbedobafarms" icon={<TikTokIcon size={18} />} />
               <FooterSocial href="https://x.com/agbedobafarms" icon={<TwitterXIcon size={18} />} />
               <FooterSocial href="https://www.youtube.com/@agbedobafarms" icon={<Youtube size={18} />} />
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block"></div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-orange-500">Explore</h4>
            <ul className="space-y-4 text-green-100/70 text-sm">
              <li><Link href="/#story" className="hover:text-white transition">Our Story</Link></li>
              <li><Link href="/#shop" className="hover:text-white transition">Shop Now</Link></li>
              <li><Link href="/cart" className="hover:text-white transition">View Cart</Link></li>
              <li><Link href="/#contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-orange-500">Contact</h4>
            <ul className="space-y-4 text-green-100/70 text-sm">
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
        
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-green-900 text-center text-green-400 text-sm">
          © {new Date().getFullYear()} Agbedoba Farms. All rights reserved.
        </div>
      </footer>

    </main>
  );
}

// --- SUB COMPONENTS ---

function ProcessCard({ number, icon, title, desc, color }: { number: string, icon: any, title: string, desc: string, color: string }) {
  return (
    <div className="relative group p-8 bg-white border border-gray-100 rounded-3xl hover:border-orange-100 hover:shadow-xl hover:shadow-orange-500/5 transition duration-300">
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3 group-hover:rotate-6 transition`}>
        {icon}
      </div>
      <h3 className="text-4xl font-bold text-gray-100 absolute top-4 right-6 select-none">{number}</h3>
      <h4 className="text-xl font-bold text-gray-900 mb-3 relative z-10">{title}</h4>
      <p className="text-sm text-gray-500 leading-relaxed relative z-10">
        {desc}
      </p>
    </div>
  )
}

function SocialPill({ href, icon, label }: { href: string, icon: any, label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-semibold text-gray-700 hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition">
      {icon}
      {label}
    </a>
  )
}

function FooterSocial({ href, icon }: { href: string, icon: any }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition text-white">
      {icon}
    </a>
  )
}

// Custom SVGs
const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
  </svg>
);

const TwitterXIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
  </svg>
);