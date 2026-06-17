// app/shop/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/lib/types";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGender, setSelectedGender] = useState<'all' | 'female' | 'male'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high'>('newest');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

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
      return 0; // newest
    });

    return result;
  }, [products, selectedGender, selectedCategory, sortBy]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedGender, selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <div className="lg:w-72 flex-shrink-0">
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Filters</h2>
              <Filter className="w-5 h-5" />
            </div>

            <div className="space-y-10">
              {/* Gender */}
              <div>
                <h3 className="uppercase text-xs tracking-widest font-medium mb-4">GENDER</h3>
                <div className="space-y-3">
                  {['all', 'female', 'male'].map(g => (
                    <label key={g} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        checked={selectedGender === g}
                        onChange={() => setSelectedGender(g as any)}
                        className="w-4 h-4 accent-black"
                      />
                      <span className="capitalize">{g}</span>
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
                      <span className="capitalize">{cat}</span>
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
            <p className="text-zinc-500">
              Showing <span className="font-semibold text-black">{paginatedProducts.length}</span> of {filteredProducts.length} products
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-zinc-200 px-5 py-3 rounded-2xl text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <p className="text-xl">Loading products...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                  />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-6 mt-16">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-6 py-3 border rounded-2xl disabled:opacity-50 hover:bg-gray-100 transition"
                  >
                    <ChevronLeft size={18} /> Previous
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Page</span>
                    <span className="font-semibold text-lg">{currentPage}</span>
                    <span className="text-sm text-gray-500">of</span>
                    <span className="font-semibold text-lg">{totalPages}</span>
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-6 py-3 border rounded-2xl disabled:opacity-50 hover:bg-gray-100 transition"
                  >
                    Next <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}