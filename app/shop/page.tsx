// app/shop/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { Filter } from "lucide-react";
import { Product } from "@/lib/types";   // ← Import from central types

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGender, setSelectedGender] = useState<'all' | 'female' | 'male'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high'>('newest');

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

  // Get unique categories
  const categories = Array.from(new Set(products.map(p => p.category)));

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Gender Filter
    if (selectedGender !== 'all') {
      result = result.filter(product => product.gender === selectedGender);
    }

    // Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0; // newest (you can improve using createdAt later)
    });

    return result;
  }, [products, selectedGender, selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-white">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <div className="lg:w-72 flex-shrink-0">
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-black">Filters</h2>
              <Filter className="w-5 h-5" />
            </div>

            <div className="space-y-10">
              {/* Gender */}
              <div>
                <h3 className="uppercase text-xs tracking-widest font-medium mb-4 text-black">GENDER</h3>
                <div className="space-y-3">
                  {['all', 'female', 'male'].map(g => (
                    <label key={g} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        checked={selectedGender === g}
                        onChange={() => setSelectedGender(g as any)}
                        className="w-4 h-4 accent-black"
                      />
                      <span className="capitalize text-black">{g}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="uppercase text-xs tracking-widest font-medium mb-4">CATEGORIES</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      checked={selectedCategory === 'all'}
                      onChange={() => setSelectedCategory('all')}
                      className="w-4 h-4 accent-black"
                    />
                    <span>All Categories</span>
                  </label>
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                        className="w-4 h-4 accent-black"
                      />
                      <span className="capitalize text-black">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-10">
            <p className="text-zinc-500 text-black">{filteredProducts.length} products</p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-zinc-200 px-5 py-3 rounded-2xl text-sm text-black"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <p className="text-xl text-black">Loading products...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, i) => (
                <ProductCard 
                  key={i} 
                  product={product} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}