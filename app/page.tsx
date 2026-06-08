// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Navbar from "@/components/NavBar";
import { Product } from "@/lib/types";

const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070",
    title: "Elegant Women's Collection",
    subtitle: "Summer 2026 - Flowing dresses & chic styles",
    category: "female",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?q=80&w=2070",
    title: "Modern Men's Fashion",
    subtitle: "Premium casual & formal wear",
    category: "male",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1544",
    title: "Kids & Children's Wear",
    subtitle: "Comfortable & adorable styles",
    category: "children",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);


  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);


  

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 50000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/newProduct");
        console.log("API response status:", res.status);
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
          console.log("Fetched products:", data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
console.log("Products in state:", products);
    fetchProducts();
    
  }, [products]); // Dependency on products length to avoid infinite loop

  

  return (
    <main className="min-h-screen">
      
      {/* Hero Section with Sliding Background */}
      <div className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}

        {/* Content Overlay */}
        <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
              {heroSlides[currentSlide].subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="group bg-white text-black px-10 py-4 rounded-full font-semibold flex items-center justify-center gap-3 hover:bg-gray-100 transition-all text-lg"
              >
                Shop Now
                <ArrowRight className="group-hover:translate-x-1 transition" />
              </Link>

              <Link
                href="/shop"
                className="border border-white/70 text-white px-10 py-4 rounded-full font-medium flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
              >
                Browse Collections
              </Link>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-white scale-125" : "bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Scroll Prompt */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 flex flex-col items-center">
          <span className="text-sm tracking-widest">SCROLL TO EXPLORE</span>
          <div className="w-px h-12 bg-white/30 mt-2" />
        </div>
      </div>

      {/* Featured Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold">Featured Collections</h2>
              <p className="text-gray-600 mt-3">Handpicked premium pieces for every season</p>
            </div>
            <Link href="/shop" className="flex items-center gap-2 text-black hover:underline font-medium">
              View All <ShoppingBag size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            
            {products.slice(0, 8).map((product, i) => (
             
                <ProductCard key={i} product={product} />
            
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-600 mb-12">Find the perfect style for everyone</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["female", "male", "children"].map((gender) => (
              <Link
                key={gender}
                href={`/shop?gender=${gender}`}
                className="group relative h-96 rounded-3xl overflow-hidden"
              >
                <Image
                  src={
                    gender === "female"
                      ? "https://images.unsplash.com/photo-1483985988355-763728e1935b"
                      : gender === "male"
                      ? "https://images.unsplash.com/photo-1505022610485-0249ba5b3675"
                      : "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1544"
                  }
                  alt={gender}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-10 left-10 text-white">
                  <h3 className="text-4xl font-semibold capitalize">{gender}</h3>
                  <p className="mt-2 opacity-90">Explore Collection →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}