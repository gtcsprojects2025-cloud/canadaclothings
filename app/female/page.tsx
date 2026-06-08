// app/female/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal } from "lucide-react";
import { Product } from "@/lib/types";

export default function FemalePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"default" | "price-low" | "price-high" | "newest">("default");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Fetch products from database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/newProduct");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter only female products
  const femaleProducts = products.filter(p => p.gender === "female");

  const categories = Array.from(new Set(femaleProducts.map(p => p.category)));

  // Apply filters and sorting
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...femaleProducts];

    // Category Filter
    if (selectedCategory !== "all") {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => {
          const dateA = new Date((a as any).createdAt || 0);
          const dateB = new Date((b as any).createdAt || 0);
          return dateB.getTime() - dateA.getTime();
        });
        break;
      default:
        break;
    }

    return result;
  }, [femaleProducts, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-[420px] bg-black">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b')] bg-cover bg-center opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        
        <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
          <div>
            <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight">
              Women&apos;s Collection
            </h1>
            <p className="text-xl text-white/90 mt-4 max-w-2xl mx-auto">
              Elegant, stylish, and comfortable fashion for the modern woman
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-6 mb-10 items-end">
          <div className="flex-1">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-black">{filteredAndSortedProducts.length}</span> products
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-500">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat} className="capitalize">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <SlidersHorizontal size={18} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black"
            >
              <option value="default">Sort by Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-xl">Loading products...</p>
          </div>
        ) : filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredAndSortedProducts.map((product, idx) => (
              <ProductCard key={idx} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No women&apos;s products found.</p>
          </div>
        )}
      </div>
    </div>
  );
}