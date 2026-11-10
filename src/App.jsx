import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  Sparkles, 
  Eye, 
  ShoppingBag, 
  Heart, 
  SlidersHorizontal, 
  Maximize2, 
  RotateCw, 
  Layers, 
  ShieldCheck, 
  ArrowUpRight, 
  ChevronRight, 
  Search, 
  Info,
  Check,
  X,
  PhoneCall,
  Menu,
  Globe,
  Award
} from 'lucide-react';

// --- Bespoke SVG Logo for Rajesh & Sons ---
const RajeshSonsLogo = ({ className = "w-10 h-10" }) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    <defs>
      <linearGradient id="goldGleam" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#DFC38E" />
        <stop offset="50%" stopColor="#B38938" />
        <stop offset="100%" stopColor="#EAD7AC" />
      </linearGradient>
      <linearGradient id="borderGleam" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#B85D3B" />
        <stop offset="50%" stopColor="#DFC38E" />
        <stop offset="100%" stopColor="#B85D3B" />
      </linearGradient>
    </defs>
    {/* Outer Ornamental Frame */}
    <rect x="6" y="6" width="88" height="88" rx="2" stroke="url(#borderGleam)" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.8" />
    <rect x="12" y="12" width="76" height="76" stroke="url(#goldGleam)" strokeWidth="1.2" />
    
    {/* Loom Warp String Matrix in Background */}
    <line x1="24" y1="14" x2="24" y2="86" stroke="url(#goldGleam)" strokeWidth="0.5" opacity="0.3" />
    <line x1="32" y1="14" x2="32" y2="86" stroke="url(#goldGleam)" strokeWidth="0.5" opacity="0.3" />
    <line x1="40" y1="14" x2="40" y2="86" stroke="url(#goldGleam)" strokeWidth="0.5" opacity="0.3" />
    <line x1="48" y1="14" x2="48" y2="86" stroke="url(#goldGleam)" strokeWidth="0.5" opacity="0.3" />
    <line x1="56" y1="14" x2="56" y2="86" stroke="url(#goldGleam)" strokeWidth="0.5" opacity="0.3" />
    <line x1="64" y1="14" x2="64" y2="86" stroke="url(#goldGleam)" strokeWidth="0.5" opacity="0.3" />
    <line x1="72" y1="14" x2="72" y2="86" stroke="url(#goldGleam)" strokeWidth="0.5" opacity="0.3" />

    {/* Center Heritage Medallion Diamond */}
    <path d="M50 18 L80 50 L50 82 L20 50 Z" stroke="url(#goldGleam)" strokeWidth="1.5" fill="#1A1817" fillOpacity="0.9" />
    <path d="M50 25 L73 50 L50 75 L27 50 Z" stroke="url(#borderGleam)" strokeWidth="0.75" />

    {/* Interlocking Monogram R & S */}
    <path 
      d="M40 37 V63 M40 37 H49 C54 37 56 40 56 44 C56 48 53 50 49 50 H40 M48 50 L57 63" 
      stroke="url(#goldGleam)" 
      strokeWidth="2.4" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path 
      d="M62 42 C60 39 56 38 52 38 C46 38 46 44 51 46 C57 48 57 56 50 56 C45 56 42 53 41 50" 
      stroke="#FAF8F5" 
      strokeWidth="1.4" 
      strokeLinecap="round" 
      opacity="0.95" 
    />

    {/* Subtle Weavers Shuttles / Star Accents */}
    <circle cx="50" cy="18" r="2" fill="url(#goldGleam)" />
    <circle cx="80" cy="50" r="2" fill="url(#goldGleam)" />
    <circle cx="50" cy="82" r="2" fill="url(#goldGleam)" />
    <circle cx="20" cy="50" r="2" fill="url(#goldGleam)" />
  </svg>
);

// --- Strapi Model Mock Data ---
const STRAPI_CARPETS = [
  {
    id: 1,
    documentId: 'cpt_01',
    attributes: {
      title: 'Mirzapur Royal Oushak',
      slug: 'mirzapur-royal-oushak',
      knotDensity: 320,
      material: '100% Hand-Spun Ghazni Wool',
      weaveType: 'Hand-Knotted',
      pileHeight: '9 mm',
      origin: 'Bhadohi, Uttar Pradesh',
      price: 3450,
      dimensions: "8' x 10' (240 x 300 cm)",
      primaryPalette: ['#A45A3C', '#E2D5C4', '#4A5348'],
      featuredTag: 'Archival Restoration',
      image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=1600&auto=format&fit=crop',
      macroTexture: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2400&auto=format&fit=crop',
      description: 'Hand-knotted by third-generation master craftsmen over 180 uninterrupted days. Hand-washed in mineral-rich waters of the Ganges basin for a soft, aged patina.'
    }
  },
  {
    id: 2,
    documentId: 'cpt_02',
    attributes: {
      title: 'Kashmir Imperial Silk Medallion',
      slug: 'kashmir-imperial-silk-medallion',
      knotDensity: 550,
      material: 'Pure Mulberry Silk on Silk Warp',
      weaveType: 'Master-Knotted',
      pileHeight: '5 mm',
      origin: 'Srinagar Valley',
      price: 7800,
      dimensions: "9' x 12' (270 x 360 cm)",
      primaryPalette: ['#1C2A3A', '#C8A86B', '#DCD5C6'],
      featuredTag: 'Collector Reserve',
      image: 'https://images.unsplash.com/photo-1594040226829-7f251ab46d80?q=80&w=1600&auto=format&fit=crop',
      macroTexture: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=2400&auto=format&fit=crop',
      description: 'Exceeding 550 knots per square inch, each thread radiates an iridescent sheen that shifts with directional gallery illumination.'
    }
  },
  {
    id: 3,
    documentId: 'cpt_03',
    attributes: {
      title: 'Varanasi Raw Jute & Botanical Wool',
      slug: 'varanasi-raw-jute-botanical-wool',
      knotDensity: 190,
      material: 'Organic Golden Jute & Highland Wool',
      weaveType: 'Flatweave Soumak',
      pileHeight: '7 mm',
      origin: 'Gopiganj Loom Atelier',
      price: 1980,
      dimensions: "6' x 9' (180 x 270 cm)",
      primaryPalette: ['#C5A880', '#5B675A', '#2E2D2B'],
      featuredTag: 'Natural Dye Heritage',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop',
      macroTexture: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2400&auto=format&fit=crop',
      description: 'Colored using crushed madder root, indigo leaf, and wild walnut rind. Breathable, textured, and created without synthetic binders.'
    }
  },
  {
    id: 4,
    documentId: 'cpt_04',
    attributes: {
      title: 'Bhadohi Contemporary Abstract Ochre',
      slug: 'bhadohi-contemporary-abstract-ochre',
      knotDensity: 280,
      material: 'New Zealand Semi-Worsted Wool',
      weaveType: 'Carved High-Low Tuft',
      pileHeight: '12 mm',
      origin: 'Bhadohi Loom District',
      price: 2450,
      dimensions: "8' x 10' (240 x 300 cm)",
      primaryPalette: ['#C98A4B', '#2A2A2A', '#DCD5CA'],
      featuredTag: 'Modernist Atelier',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1600&auto=format&fit=crop',
      macroTexture: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=2400&auto=format&fit=crop',
      description: 'A sculptural multi-level relief carpet sculpted by hand shears, presenting an architectural play of shadow, warmth, and quiet luxury.'
    }
  }
];

// --- Live Animated Counter Component ---
const CounterMetric = ({ target, suffix = '', label }) => {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1600;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setVal(target);
        clearInterval(timer);
      } else {
        setVal(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="flex flex-col">
      <div className="text-2xl md:text-3xl font-serif text-[#FAF8F5] flex items-center">
        <span>{val.toLocaleString()}</span>
        <span className="text-[#DFC38E]">{suffix}</span>
      </div>
      <div className="text-[11px] uppercase tracking-[0.2em] text-[#9E9A93] mt-1 font-mono">{label}</div>
    </div>
  );
};

// --- Ambient Warp Loom Strings Animation Component ---
const LoomThreadMatrix = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25 z-0">
      <div className="w-full h-full flex justify-between px-6">
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#DFC38E]/30 to-transparent"
            initial={{ opacity: 0.1, scaleY: 0.8 }}
            animate={{ 
              opacity: [0.15, 0.4, 0.15],
              scaleY: [0.95, 1.05, 0.95]
            }}
            transition={{
              duration: 3.5 + (i % 5) * 0.7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.12
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default function RajeshAndSonsApp() {
  // --- States ---
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedRug, setSelectedRug] = useState(STRAPI_CARPETS[0]);
  const [selectedRoom, setSelectedRoom] = useState('living');
  const [roomRugAngle, setRoomRugAngle] = useState(0);
  const [roomRugScale, setRoomRugScale] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState([1]);
  const [toastMessage, setToastMessage] = useState(null);
  const [swatchModalOpen, setSwatchModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currency, setCurrency] = useState('USD');

  // Magnifier States
  const [isMagnifierActive, setIsMagnifierActive] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0, relX: 0, relY: 0 });
  const magnifierContainerRef = useRef(null);

  // Trigger Toast Notification
  const notify = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const toggleWishlist = (id, title) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(item => item !== id));
      notify(`Removed "${title}" from your curated wishlist.`);
    } else {
      setWishlist([...wishlist, id]);
      notify(`Added "${title}" to your private collector wishlist.`);
    }
  };

  const addToCart = (title) => {
    setCartCount(prev => prev + 1);
    notify(`Reserved bespoke sample for "${title}". Added to archival acquisitions.`);
  };

  // Magnifier Movement Handler
  const handleMouseMove = (e) => {
    if (!magnifierContainerRef.current) return;
    const rect = magnifierContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      setIsMagnifierActive(true);
      const relX = (x / rect.width) * 100;
      const relY = (y / rect.height) * 100;
      setLensPos({ x, y, relX, relY });
    } else {
      setIsMagnifierActive(false);
    }
  };

  // Filtered Products
  const filteredCarpets = activeFilter === 'All' 
    ? STRAPI_CARPETS 
    : STRAPI_CARPETS.filter(c => c.attributes.weaveType.toLowerCase().includes(activeFilter.toLowerCase()) || c.attributes.material.toLowerCase().includes(activeFilter.toLowerCase()));

  // Smooth Scroll Helper
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#121110] text-[#FAF8F5] selection:bg-[#B85D3B] selection:text-white font-sans relative overflow-x-hidden">
      
      {/* Dynamic Toast Feedback Overlay */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-6 z-50 flex items-center gap-3 bg-[#1F1D1B] border border-[#DFC38E]/50 px-5 py-4 shadow-2xl rounded-sm max-w-md"
          >
            <Sparkles className="w-4 h-4 text-[#DFC38E] shrink-0" />
            <p className="text-xs tracking-wider text-[#FAF8F5]">{toastMessage}</p>
            <button onClick={() => setToastMessage(null)} className="text-[#9E9A93] hover:text-[#FAF8F5] ml-2">
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Complimentary Swatch Modal */}
      <AnimatePresence>
        {swatchModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              className="bg-[#181615] border border-[#DFC38E]/40 max-w-lg w-full p-8 relative shadow-2xl"
            >
              <button 
                onClick={() => setSwatchModalOpen(false)}
                className="absolute top-6 right-6 text-[#9E9A93] hover:text-[#FAF8F5]"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 mb-3">
                <RajeshSonsLogo className="w-6 h-6" />
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#DFC38E]">Archival Sample Program</span>
              </div>
              <h3 className="font-serif text-2xl mb-2 text-[#FAF8F5]">Request Bespoke Loom Swatch</h3>
              <p className="text-xs text-[#A8A39B] mb-6 leading-relaxed">
                Receive an authentic 6" x 6" master weaver swatch of <strong>{selectedRug.attributes.title}</strong>, knot-certified and dyed with botanical extract compounds.
              </p>
              <form onSubmit={(e) => {
                e.preventDefault();
                setSwatchModalOpen(false);
                notify(`Swatch folio dispatched to your private concierge address.`);
              }} className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-[#DFC38E]">Recipient / Architectural Studio</label>
                  <input required placeholder="Lord/Lady, Studio Principal, or Collector" className="w-full bg-[#121110] border border-white/20 p-3 text-xs text-white focus:outline-none focus:border-[#DFC38E] mt-1" />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-[#DFC38E]">Shipping Address (Global Air Express)</label>
                  <input required placeholder="Mayfair, London / 5th Ave, NY / South Delhi" className="w-full bg-[#121110] border border-white/20 p-3 text-xs text-white focus:outline-none focus:border-[#DFC38E] mt-1" />
                </div>
                <button type="submit" className="w-full py-3.5 bg-[#B85D3B] hover:bg-[#a04e30] transition text-xs font-mono uppercase tracking-widest font-semibold text-white mt-2">
                  Dispatch Sample Folio & KPSI Certificate
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Top Banner */}
      <div className="w-full bg-[#1A1817] border-b border-white/5 py-2 px-6 flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-[#A8A39B]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#DFC38E] animate-ping" />
          <span>Bhadohi & Mirzapur Looms Operating • 100% Carbon-Neutral Export Delivery</span>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => {
              const next = currency === 'USD' ? 'EUR' : currency === 'EUR' ? 'GBP' : currency === 'GBP' ? 'INR' : 'USD';
              setCurrency(next);
              notify(`Currency shifted to ${next}. Exchange rate indexed to daily bullion rates.`);
            }} 
            className="hover:text-[#DFC38E] transition flex items-center gap-1"
          >
            <Globe className="w-3 h-3" />
            <span>Valuation: {currency}</span>
          </button>
          <button onClick={() => notify("Connecting directly to Bhadohi Master Weaver Concierge: +91 94152 83920")} className="hover:text-[#DFC38E] transition flex items-center gap-1">
            <PhoneCall className="w-3 h-3" />
            <span>Private Atelier Concierge</span>
          </button>
        </div>
      </div>

      {/* Main Global Navigation */}
      <nav className="sticky top-0 z-40 bg-[#121110]/90 backdrop-blur-md border-b border-white/10 px-6 lg:px-12 py-4 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div 
          onClick={() => scrollToSection('hero')} 
          className="flex items-center gap-3.5 cursor-pointer group"
        >
          <RajeshSonsLogo className="w-10 h-10 group-hover:scale-105 transition-transform" />
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-[0.18em] uppercase text-[#FAF8F5] group-hover:text-[#DFC38E] transition-colors font-semibold">
              Rajesh & Sons
            </span>
            <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#DFC38E]/80 -mt-0.5">
              Master Weavers • Est. 1978
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest font-mono text-[#DCD5C6]">
          <button onClick={() => scrollToSection('collection')} className="hover:text-[#DFC38E] transition py-1 relative">
            Archival Collection
          </button>
          <button onClick={() => scrollToSection('magnifier')} className="hover:text-[#DFC38E] transition py-1">
            Fiber & KPSI Lens
          </button>
          <button onClick={() => scrollToSection('visualizer')} className="hover:text-[#DFC38E] transition py-1">
            Room Visualizer
          </button>
          <button onClick={() => scrollToSection('heritage')} className="hover:text-[#DFC38E] transition py-1">
            Legacy Of Bhadohi
          </button>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <button 
            onClick={() => setSwatchModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 border border-[#DFC38E]/40 px-3.5 py-2 text-[#DFC38E] hover:bg-[#DFC38E] hover:text-[#121110] transition uppercase tracking-widest text-[10px]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Free Swatch</span>
          </button>

          <button 
            onClick={() => notify(`Wishlist holds ${wishlist.length} heirloom pieces.`)} 
            className="p-2 relative text-[#FAF8F5] hover:text-[#DFC38E] transition"
            title="Archival Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#B85D3B] text-[8px] flex items-center justify-center rounded-full font-bold">
                {wishlist.length}
              </span>
            )}
          </button>

          <button 
            onClick={() => notify(`Archival Cart contains ${cartCount} piece(s). Shipping coordinated via insured transit.`)} 
            className="p-2 relative text-[#FAF8F5] hover:text-[#DFC38E] transition"
            title="Archival Vault Acquisitions"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#DFC38E] text-[#121110] text-[8px] flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#FAF8F5]"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#181615] border-b border-white/10 px-6 py-6 flex flex-col gap-4 text-xs font-mono uppercase tracking-widest"
          >
            <button onClick={() => scrollToSection('collection')} className="text-left py-2 hover:text-[#DFC38E]">Archival Collection</button>
            <button onClick={() => scrollToSection('magnifier')} className="text-left py-2 hover:text-[#DFC38E]">Fiber & KPSI Lens</button>
            <button onClick={() => scrollToSection('visualizer')} className="text-left py-2 hover:text-[#DFC38E]">Room Visualizer</button>
            <button onClick={() => scrollToSection('heritage')} className="text-left py-2 hover:text-[#DFC38E]">Legacy Of Bhadohi</button>
            <button onClick={() => { setMobileMenuOpen(false); setSwatchModalOpen(true); }} className="text-left py-2 text-[#DFC38E]">Request Material Swatch</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH RICH ANIMATIONS & LOOM MATRIX                       */}
      {/* ========================================================================= */}
      <section id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-6 lg:px-16 pt-8 pb-16">
        <LoomThreadMatrix />

        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#B85D3B]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#DFC38E]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">
          {/* Animated Provenance Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 border border-[#DFC38E]/30 bg-[#1A1817]/80 backdrop-blur-md rounded-full mb-8 shadow-inner"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#DFC38E] animate-spin" style={{ animationDuration: '9s' }} />
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#E8E2D8]">
              Heritage of Bhadohi & Mirzapur • 100% Hand-Spun Wool & Pure Silk
            </span>
          </motion.div>

          {/* Kinetic Typography Title */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] mb-6 text-[#FAF8F5]"
          >
            Rajesh & Sons
            <span className="block italic font-light text-[#DFC38E] text-3xl sm:text-5xl md:text-6xl lg:text-7xl mt-2">
              Woven Archival Artistry.
            </span>
          </motion.h1>

          {/* Subheading Narrative */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="max-w-2xl text-xs sm:text-sm md:text-base text-[#B0AAA0] font-light leading-relaxed mb-10 tracking-wide"
          >
            Founded in 1978 in India’s foremost carpet cradle, our looms weave generational integrity into every individual knot. Commissioned by sovereign palaces, luxury residences, and international connoisseurs.
          </motion.p>

          {/* CTA Button Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono uppercase tracking-widest"
          >
            <button
              onClick={() => scrollToSection('collection')}
              className="px-8 py-4 bg-[#B85D3B] hover:bg-[#a04e30] transition-colors text-white font-medium flex items-center gap-2 group shadow-lg"
            >
              <span>Explore The 2026 Vault</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection('visualizer')}
              className="px-8 py-4 border border-[#DFC38E]/50 hover:border-[#DFC38E] bg-[#1A1817]/60 hover:bg-[#DFC38E]/10 transition-colors text-[#FAF8F5] flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#DFC38E]" />
              <span>Launch Room Visualizer</span>
            </button>
          </motion.div>

          {/* Live Heritage Metrics Strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 mt-16 pt-12 border-t border-white/10 w-full max-w-4xl"
          >
            <CounterMetric target={48} suffix="+" label="Years Heritage" />
            <CounterMetric target={1200} suffix="+" label="Master Artisans" />
            <CounterMetric target={550} suffix=" KPSI" label="Peak Knot Density" />
            <CounterMetric target={45} suffix="+" label="Countries Exported" />
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. INTERACTIVE 4X KPSI & FIBER DENSITY MAGNIFIER                         */}
      {/* ========================================================================= */}
      <section id="magnifier" className="py-24 px-6 lg:px-16 bg-[#161413] border-t border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#DFC38E] mb-2">
                <Search className="w-3.5 h-3.5" />
                <span>Micro-Inspection Telemetry</span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-[#FAF8F5]">
                Knot Density & Macro Fiber Inspection
              </h2>
            </div>
            <p className="text-xs text-[#9E9A93] max-w-md font-mono mt-4 md:mt-0 leading-relaxed">
              Sweep your cursor across the textile surface to engage our 4x optical zoom lens. Examine individual weft crossings, Tibetan loops, and botanical dye luster.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Magnifier Canvas Container */}
            <div className="lg:col-span-8">
              <div 
                ref={magnifierContainerRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsMagnifierActive(true)}
                onMouseLeave={() => setIsMagnifierActive(false)}
                className="relative h-[480px] md:h-[580px] w-full bg-[#1A1817] overflow-hidden cursor-crosshair rounded-sm border border-white/10 select-none shadow-2xl"
              >
                {/* Base Macro Rug Texture */}
                <img 
                  src={selectedRug.attributes.macroTexture} 
                  alt={selectedRug.attributes.title}
                  className="w-full h-full object-cover pointer-events-none"
                />

                {/* Overlaid Info Badge */}
                <div className="absolute top-4 left-4 bg-[#121110]/90 backdrop-blur-md px-3 py-1.5 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-[#DFC38E]">
                  Sample: {selectedRug.attributes.title}
                </div>

                {/* Lens Overlay */}
                {isMagnifierActive && (
                  <motion.div
                    className="absolute pointer-events-none rounded-full border-2 border-[#DFC38E] shadow-[0_0_50px_rgba(223,195,142,0.35)] overflow-hidden"
                    style={{
                      width: 220,
                      height: 220,
                      left: lensPos.x - 110,
                      top: lensPos.y - 110,
                    }}
                  >
                    <div 
                      className="w-[880px] h-[880px] absolute bg-cover bg-no-repeat"
                      style={{
                        backgroundImage: `url(${selectedRug.attributes.macroTexture})`,
                        backgroundPosition: `${lensPos.relX}% ${lensPos.relY}%`,
                        backgroundSize: '400%',
                        transform: 'translate(-50%, -50%)',
                        left: '50%',
                        top: '50%',
                      }}
                    />
                    {/* Reticle Crosshairs */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                      <div className="w-full h-[0.5px] bg-[#DFC38E]" />
                      <div className="h-full w-[0.5px] bg-[#DFC38E] absolute" />
                    </div>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#121110]/90 px-2 py-0.5 rounded text-[8px] font-mono tracking-widest text-[#DFC38E]">
                      4.0X KPSI LENS
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Live Telemetry Panel */}
            <div className="lg:col-span-4 bg-[#1A1817] p-8 border border-white/10 rounded-sm">
              <h3 className="font-serif text-xl mb-6 text-[#FAF8F5] pb-4 border-b border-white/10">
                Textile Diagnostics
              </h3>

              <div className="space-y-5 text-xs font-mono">
                <div>
                  <span className="text-[#88837A] block text-[10px] uppercase tracking-widest">Knot Density (KPSI)</span>
                  <div className="text-xl text-[#DFC38E] font-serif mt-1 flex items-baseline justify-between">
                    <span>{selectedRug.attributes.knotDensity} Knots / Sq. In.</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Ultra-Fine Grade</span>
                  </div>
                </div>

                <div>
                  <span className="text-[#88837A] block text-[10px] uppercase tracking-widest">Selected Model</span>
                  <span className="text-sm text-[#FAF8F5] font-serif block mt-1">{selectedRug.attributes.title}</span>
                </div>

                <div>
                  <span className="text-[#88837A] block text-[10px] uppercase tracking-widest">Yarn & Warp Composition</span>
                  <span className="text-[#FAF8F5] block mt-1">{selectedRug.attributes.material}</span>
                </div>

                <div>
                  <span className="text-[#88837A] block text-[10px] uppercase tracking-widest">Weave Specification</span>
                  <span className="text-[#FAF8F5] block mt-1">{selectedRug.attributes.weaveType} • Pile: {selectedRug.attributes.pileHeight}</span>
                </div>

                <div>
                  <span className="text-[#88837A] block text-[10px] uppercase tracking-widest">Geographic Provenance</span>
                  <span className="text-[#FAF8F5] block mt-1">{selectedRug.attributes.origin}</span>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                  <button 
                    onClick={() => setSwatchModalOpen(true)}
                    className="w-full py-3 bg-[#DFC38E] hover:bg-[#cdb07c] transition text-[#121110] font-semibold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Order Physical Weave Swatch</span>
                  </button>
                  <button 
                    onClick={() => notify(`KPSI Certificate for ${selectedRug.attributes.title} generated for inspection.`)}
                    className="w-full py-2.5 border border-white/20 hover:border-white/40 text-[10px] uppercase tracking-widest text-[#DCD5C6] transition"
                  >
                    View Strapi Loom Certificate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. ARCHIVAL COLLECTION CATALOG WITH ANIMATED FILTERING                   */}
      {/* ========================================================================= */}
      <section id="collection" className="py-24 px-6 lg:px-16 max-w-7xl mx-auto">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#DFC38E] mb-2 block">
              Curated Inventory
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#FAF8F5]">
              Master Loom Creations
            </h2>
          </div>

          {/* Sticky Style Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0 font-mono text-[11px] uppercase tracking-widest">
            {['All', 'Hand-Knotted', 'Silk', 'Flatweave Soumak', 'Tuft'].map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  notify(`Filtering catalog by "${filter}" technique.`);
                }}
                className={`px-4 py-2 border transition-colors ${
                  activeFilter === filter 
                    ? 'border-[#DFC38E] bg-[#DFC38E] text-[#121110] font-semibold' 
                    : 'border-white/10 bg-[#1A1817] text-[#9E9A93] hover:text-[#FAF8F5]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Carpet Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10"
        >
          <AnimatePresence>
            {filteredCarpets.map((carpet) => {
              const { attributes } = carpet;
              const isWishlisted = wishlist.includes(carpet.id);

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5 }}
                  key={carpet.id}
                  className="group bg-[#181615] border border-white/10 hover:border-[#DFC38E]/50 transition-colors flex flex-col justify-between overflow-hidden rounded-sm"
                >
                  {/* Card Image Stage */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#121110]">
                    <img 
                      src={attributes.image} 
                      alt={attributes.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />

                    {/* Tag Badge */}
                    <div className="absolute top-4 left-4 bg-[#121110]/85 backdrop-blur-md px-3 py-1 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-[#DFC38E]">
                      {attributes.featuredTag}
                    </div>

                    {/* Floating Wishlist Button */}
                    <button 
                      onClick={() => toggleWishlist(carpet.id, attributes.title)}
                      className="absolute top-4 right-4 p-2.5 rounded-full bg-[#121110]/80 backdrop-blur-md border border-white/10 text-white hover:text-[#B85D3B] transition"
                      title="Add to collector wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#B85D3B] text-[#B85D3B]' : ''}`} />
                    </button>

                    {/* Palette Dots */}
                    <div className="absolute bottom-4 left-4 flex gap-1.5 p-1 bg-[#121110]/80 backdrop-blur-md rounded-full border border-white/10">
                      {attributes.primaryPalette.map((col, idx) => (
                        <div 
                          key={idx} 
                          className="w-3.5 h-3.5 rounded-full border border-white/20"
                          style={{ backgroundColor: col }}
                          title={`Dyed Tone: ${col}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex justify-between items-baseline mb-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#88837A]">
                          {attributes.weaveType} • {attributes.knotDensity} KPSI
                        </span>
                        <span className="text-sm font-mono text-[#DFC38E]">
                          ${attributes.price.toLocaleString()}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl text-[#FAF8F5] mb-2 group-hover:text-[#DFC38E] transition-colors">
                        {attributes.title}
                      </h3>

                      <p className="text-xs text-[#9E9A93] leading-relaxed mb-6 font-light">
                        {attributes.description}
                      </p>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 text-xs font-mono">
                      <button
                        onClick={() => {
                          setSelectedRug(carpet);
                          scrollToSection('visualizer');
                          notify(`Loaded "${attributes.title}" into 2D Room Perspective Studio.`);
                        }}
                        className="flex items-center gap-1.5 text-[#DFC38E] hover:underline uppercase tracking-wider text-[11px]"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>Place In Room</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedRug(carpet);
                            scrollToSection('magnifier');
                            notify(`Examining "${attributes.title}" at 4x optical resolution.`);
                          }}
                          className="p-2 border border-white/20 hover:border-[#DFC38E] text-[#DCD5C6] transition"
                          title="Inspect weave knots"
                        >
                          <Search className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => addToCart(attributes.title)}
                          className="px-4 py-2 bg-[#B85D3B] hover:bg-[#a04e30] text-white font-medium uppercase tracking-wider text-[11px] transition flex items-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Reserve</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE 2D ROOM PERSPECTIVE VISUALIZER                            */}
      {/* ========================================================================= */}
      <section id="visualizer" className="py-24 px-6 lg:px-16 bg-[#161413] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#DFC38E] mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>Spatial Architectural Simulation</span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-[#FAF8F5]">
                2D Room Perspective Visualizer
              </h2>
            </div>
            <p className="text-xs text-[#9E9A93] max-w-md font-mono mt-4 md:mt-0 leading-relaxed">
              Experience scale and perspective distortion before procurement. Toggle room environments and adjust orientation to match your architectural floorplan.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Simulation Canvas Stage */}
            <div className="lg:col-span-8 bg-[#121110] border border-white/10 rounded-sm overflow-hidden relative h-[450px] sm:h-[540px] flex items-center justify-center shadow-2xl">
              {/* Background Interior Room Template */}
              <img 
                src={
                  selectedRoom === 'living' 
                    ? 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop' 
                    : selectedRoom === 'bedroom'
                    ? 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1600&auto=format&fit=crop'
                    : 'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1600&auto=format&fit=crop'
                } 
                alt="Room setting"
                className="w-full h-full object-cover opacity-80"
              />

              {/* Floor Perspective Plane with Carpet Rendering */}
              <div className="absolute inset-x-0 bottom-6 sm:bottom-10 h-72 flex items-center justify-center pointer-events-none [perspective:900px]">
                <motion.div 
                  className="shadow-2xl transition-all duration-300 relative border border-[#DFC38E]/30"
                  style={{
                    transform: `rotateX(58deg) rotateZ(${roomRugAngle}deg) scale(${roomRugScale})`,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.85)'
                  }}
                >
                  <img 
                    src={selectedRug.attributes.image} 
                    alt="Carpet on floor"
                    className="w-72 sm:w-96 md:w-[420px] aspect-[8/10] object-cover rounded-[1px]"
                  />
                  {/* Sheen reflection over rug */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/15 pointer-events-none" />
                </motion.div>
              </div>

              {/* Active Rug Floating Overlay */}
              <div className="absolute top-4 left-4 bg-[#121110]/90 backdrop-blur-md border border-white/10 p-3 text-xs font-mono">
                <span className="text-[#88837A] block text-[9px] uppercase tracking-wider">Projected Artwork</span>
                <span className="text-[#FAF8F5] font-serif font-medium">{selectedRug.attributes.title}</span>
                <span className="text-[#DFC38E] block text-[10px]">{selectedRug.attributes.dimensions}</span>
              </div>
            </div>

            {/* Room Controls Panel */}
            <div className="lg:col-span-4 bg-[#1A1817] p-8 border border-white/10 rounded-sm">
              <h3 className="font-serif text-xl mb-6 text-[#FAF8F5] pb-4 border-b border-white/10">
                Spatial Parameters
              </h3>

              <div className="space-y-6 text-xs font-mono">
                {/* Room Environment Selection */}
                <div>
                  <label className="text-[#88837A] block text-[10px] uppercase tracking-widest mb-2">Interior Environment</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'living', label: 'Salon' },
                      { key: 'bedroom', label: 'Suite' },
                      { key: 'dining', label: 'Dining' }
                    ].map((env) => (
                      <button
                        key={env.key}
                        onClick={() => {
                          setSelectedRoom(env.key);
                          notify(`Shifted architectural environment to ${env.label}.`);
                        }}
                        className={`py-2 px-3 text-center border uppercase text-[10px] transition ${
                          selectedRoom === env.key 
                            ? 'border-[#DFC38E] bg-[#DFC38E] text-[#121110] font-bold' 
                            : 'border-white/10 text-[#9E9A93] hover:text-[#FAF8F5]'
                        }`}
                      >
                        {env.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Swap Selected Rug */}
                <div>
                  <label className="text-[#88837A] block text-[10px] uppercase tracking-widest mb-2">Selected Heirlooms</label>
                  <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                    {STRAPI_CARPETS.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          setSelectedRug(c);
                          notify(`Now previewing "${c.attributes.title}".`);
                        }}
                        className={`w-full text-left p-2.5 border text-xs flex justify-between items-center transition ${
                          selectedRug.id === c.id 
                            ? 'border-[#DFC38E] bg-[#DFC38E]/10 text-[#FAF8F5]' 
                            : 'border-white/5 text-[#9E9A93] hover:text-[#FAF8F5]'
                        }`}
                      >
                        <span className="truncate pr-2">{c.attributes.title}</span>
                        <span className="text-[#DFC38E] font-mono text-[10px]">${c.attributes.price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Spatial Rotation & Scale Controls */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div>
                    <div className="flex justify-between text-[10px] text-[#88837A] mb-1">
                      <span>AXIS ROTATION</span>
                      <span className="text-[#DFC38E]">{roomRugAngle}°</span>
                    </div>
                    <input 
                      type="range" 
                      min="-45" 
                      max="45" 
                      value={roomRugAngle}
                      onChange={(e) => setRoomRugAngle(Number(e.target.value))}
                      className="w-full accent-[#DFC38E] bg-white/10 h-1 rounded appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] text-[#88837A] mb-1">
                      <span>SCALE RATIO</span>
                      <span className="text-[#DFC38E]">{roomRugScale}x</span>
                    </div>
                    <input 
                      type="range" 
                      min="0.8" 
                      max="1.25" 
                      step="0.05"
                      value={roomRugScale}
                      onChange={(e) => setRoomRugScale(Number(e.target.value))}
                      className="w-full accent-[#DFC38E] bg-white/10 h-1 rounded appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2">
                  <button 
                    onClick={() => addToCart(selectedRug.attributes.title)}
                    className="w-full py-3.5 bg-[#B85D3B] hover:bg-[#a04e30] transition text-white font-medium uppercase tracking-widest text-[10px]"
                  >
                    Acquire This Selected Dimension
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. HERITAGE & PROVENANCE STORY SECTION                                    */}
      {/* ========================================================================= */}
      <section id="heritage" className="py-24 px-6 lg:px-16 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#DFC38E] mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>Generational Provenance</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-[#FAF8F5] mb-6 leading-tight">
              Four Decades of Weaving Distinction in Bhadohi.
            </h2>
            <p className="text-xs sm:text-sm text-[#B0AAA0] leading-relaxed mb-6 font-light">
              Under the visionary guardianship of the Rajesh family since 1978, our atelier preserves the authentic Mughal and Persian weaving methodologies brought to Uttar Pradesh centuries ago.
            </p>
            <p className="text-xs sm:text-sm text-[#B0AAA0] leading-relaxed mb-8 font-light">
              Each strand of wool is naturally washed, combed, and dyed in small batches with dried pomegranate rinds, walnut hulls, and madder root, producing subtle abrash gradations that machine looms can never replicate.
            </p>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => notify("Atelier Monograph PDF dispatched to your download queue.")}
                className="px-6 py-3 border border-[#DFC38E]/50 hover:bg-[#DFC38E]/10 transition text-[#DFC38E] font-mono uppercase tracking-widest text-[10px]"
              >
                Download Atelier Monograph
              </button>
              <button 
                onClick={() => setSwatchModalOpen(true)}
                className="px-6 py-3 bg-[#B85D3B] hover:bg-[#a04e30] transition text-white font-mono uppercase tracking-widest text-[10px]"
              >
                Request Swatch
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1594040226829-7f251ab46d80?q=80&w=800&auto=format&fit=crop" 
                alt="Weaver at loom" 
                className="w-full h-64 object-cover rounded-sm border border-white/10"
              />
              <div className="p-5 bg-[#181615] border border-white/10 text-xs font-mono">
                <span className="text-[#DFC38E] text-[10px] uppercase tracking-widest block mb-1">Authenticity Guaranteed</span>
                <p className="text-[#9E9A93] text-[11px] leading-relaxed">Every piece bears the official Rajesh & Sons hand-carved copper seal and artisan signature.</p>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="p-5 bg-[#181615] border border-white/10 text-xs font-mono">
                <span className="text-[#DFC38E] text-[10px] uppercase tracking-widest block mb-1">Ethical Artisan Guild</span>
                <p className="text-[#9E9A93] text-[11px] leading-relaxed">Certified fair wages, full healthcare coverage, and generational craft apprenticeships.</p>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=800&auto=format&fit=crop" 
                alt="Hand-knotted loom details" 
                className="w-full h-64 object-cover rounded-sm border border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. EDITORIAL FOOTER WITH ACTIVE ACTIONS & NEWSLETTER                      */}
      {/* ========================================================================= */}
      <footer className="bg-[#0C0B0A] border-t border-white/10 pt-16 pb-12 px-6 lg:px-16 text-xs font-mono text-[#88837A]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <RajeshSonsLogo className="w-8 h-8" />
              <span className="font-serif text-lg tracking-[0.18em] text-[#FAF8F5] uppercase">Rajesh & Sons</span>
            </div>
            <p className="text-[11px] text-[#A8A39B] leading-relaxed max-w-sm">
              Carpet Weavers, Finishers & International Exporters. Headquartered in Bhadohi (The Carpet City of India) with representation in London, Dubai, and New York.
            </p>
            <div className="text-[10px] text-[#DFC38E] tracking-widest">
              REGISTERED EXPORT HOUSE • GOVT. OF INDIA RECOGNIZED
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-[10px] uppercase tracking-[0.2em] mb-4">Navigations</h4>
            <ul className="space-y-2.5 text-[11px]">
              <li><button onClick={() => scrollToSection('hero')} className="hover:text-[#DFC38E] transition">Imperial Welcome</button></li>
              <li><button onClick={() => scrollToSection('collection')} className="hover:text-[#DFC38E] transition">Archival Portfolio</button></li>
              <li><button onClick={() => scrollToSection('magnifier')} className="hover:text-[#DFC38E] transition">Fiber Magnifier</button></li>
              <li><button onClick={() => scrollToSection('visualizer')} className="hover:text-[#DFC38E] transition">Spatial Visualizer</button></li>
              <li><button onClick={() => scrollToSection('heritage')} className="hover:text-[#DFC38E] transition">Bhadohi Provenance</button></li>
            </ul>
          </div>

          {/* Strapi Admin & Tech Specs */}
          <div>
            <h4 className="text-white text-[10px] uppercase tracking-[0.2em] mb-4">Strapi Integration</h4>
            <ul className="space-y-2.5 text-[11px]">
              <li><button onClick={() => notify("Navigating to Strapi Admin at /admin with role 'SuperAdmin'...")} className="hover:text-[#DFC38E] transition">Strapi Admin Portal</button></li>
              <li><button onClick={() => notify("API Endpoint: GET /api/carpets?populate=*")} className="hover:text-[#DFC38E] transition">REST Endpoints (/api)</button></li>
              <li><button onClick={() => notify("GraphQL Schema: query { carpets { documentId title knotDensity } }")} className="hover:text-[#DFC38E] transition">GraphQL Playground</button></li>
              <li><button onClick={() => notify("Cloudinary Media Provider Connected.")} className="hover:text-[#DFC38E] transition">Media CDN Sync</button></li>
            </ul>
          </div>

          {/* Atelier Newsletter */}
          <div>
            <h4 className="text-white text-[10px] uppercase tracking-[0.2em] mb-4">The Collector Bulletin</h4>
            <p className="text-[10px] text-[#9E9A93] mb-3">Privileged notifications on completed archival loom releases.</p>
            <form onSubmit={(e) => {
              e.preventDefault();
              notify("Thank you for enrolling in The Rajesh & Sons Collector Bulletin.");
            }} className="space-y-2">
              <input 
                type="email" 
                required 
                placeholder="patron@domain.com"
                className="w-full bg-[#181615] border border-white/10 p-2.5 text-[11px] text-white focus:outline-none focus:border-[#DFC38E]"
              />
              <button 
                type="submit"
                className="w-full py-2 bg-[#B85D3B] hover:bg-[#a04e30] text-white text-[10px] uppercase tracking-widest font-medium transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[10px] text-[#66625C] gap-4">
          <div>
            © {new Date().getFullYear()} Rajesh & Sons Carpet Weavers & Exporters Pvt. Ltd. All Rights Reserved.
          </div>
          <div className="flex gap-6">
            <button onClick={() => notify("Handmade Guild Certified: 100% Child-Labor Free Guaranteed by Rugmark & GoodWeave standards.")} className="hover:text-[#9E9A93]">Ethical Weaving Guarantee</button>
            <button onClick={() => notify("Export Logistics: Direct insured air shipment via FedEx / DHL Express.")} className="hover:text-[#9E9A93]">Transit Insurance</button>
            <button onClick={() => notify("Privacy Policy: Collector identities are protected under private ledger discretion.")} className="hover:text-[#9E9A93]">Discretion & Privacy</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
