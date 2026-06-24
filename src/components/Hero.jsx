import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroImages = useMemo(() => [
    assets.hero_img1,
    assets.hero_img2,
    assets.hero_img3,
  ], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl border border-gray-100">
      
      <div className="absolute inset-0 z-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iNSIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMDIiLz48L3N2Zz4=')]"></div>

      <div className="flex flex-col lg:flex-row min-h-[500px]">
     
        <div className="w-full lg:w-1/2 flex items-center justify-center py-12 px-6 sm:px-12 lg:px-16 relative z-10">
          <div className="max-w-md animate-fadeIn">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-0 h-[2px] bg-[#8B5E3C] animate-growWidth"></div>
              <p className="text-[#8B5E3C] font-medium text-sm md:text-base tracking-widest uppercase animate-fadeIn">
                Handcrafted With Love
              </p>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-4 prata-regular animate-fadeIn">
              Discover the <span className="text-[#8B5E3C]">Art</span> of Indian Craftsmanship
            </h1>

            <p className="text-lg text-gray-600 mb-8 animate-fadeIn">
              Each piece tells a story of tradition, passion, and unparalleled skill from artisans across India.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn">
              <Link to="/collections">
                <button className="flex items-center gap-2 bg-[#8B5E3C] hover:bg-[#A36B4F] text-white font-medium px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-md hover:scale-105 active:scale-95">
                  Shop Collection <span className="text-lg">→</span>
                </button>
              </Link>
              <Link to="/artisans">
                <button className="flex items-center gap-2 bg-white border border-[#8B5E3C] text-[#8B5E3C] font-medium px-6 py-3 rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95">
                  Meet Our Artisans <span className="text-lg">👜</span>
                </button>
              </Link>
            </div>

         
            <div className="mt-10 flex items-center gap-4 text-sm text-gray-500 animate-fadeIn">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="w-8 h-8 rounded-full bg-[#8B5E3C] border-2 border-white"></div>
                ))}
              </div>
              <div>
                <p className="font-medium text-gray-700">500+ Artisans</p>
                <p>Creating beautiful products</p>
              </div>
            </div>
          </div>
        </div>


        <div className="w-full lg:w-1/2 relative overflow-hidden">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-gray-100 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <img
                src={img}
                alt="Artisan Handmade Showcase"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/30 to-transparent lg:bg-gradient-to-r lg:from-white/0 lg:via-white/30 lg:to-white/80"></div>
            </div>
          ))}

          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-[#8B5E3C] w-6' : 'bg-white/50'}`}
              ></button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes growWidth {
          from { width: 0; }
          to { width: 40px; }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-growWidth {
          animation: growWidth 0.8s ease-out forwards;
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default Hero;
