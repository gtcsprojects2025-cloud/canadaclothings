// components/ProductCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");
const [sortedSizes, setSortedSizes] = useState<string[]>([]);
const [adding, setAdding] = useState(false)
  const availableSizes = product.sizes || [];
  useEffect(() => {
    if (availableSizes.length > 0) {
      setSortedSizes(availableSizes[0].split(","));
      // setSelectedSize(availableSizes[0].split(",")[0]);
    }
  }, [product.sizes]);

  const handleAddToCart = (e: React.MouseEvent) => {
    setAdding(true)
    e.preventDefault(); // Prevent navigation when clicking button
    const sizeToUse = selectedSize || (availableSizes.length > 0 ? availableSizes[0] : undefined);
    addToCart(product, sizeToUse);
    setTimeout(()=>{
      setAdding(false)
    }, 3000)
  };

  return (
    <Link href={`/product/${product._id }`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
        <div className="relative h-80 overflow-hidden">
          <Image
            src={product.image||"/placeholder.png"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.season && (
            <div className="absolute top-3 left-3 bg-white/90 text-xs font-medium px-3 py-1 rounded-full text-gray-500">
              {product.season.toUpperCase()}
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 capitalize">
                {product.gender} • {product.category}
              </p>
              <h3 className="font-semibold text-lg mt-1 line-clamp-2 text-black group-hover:text-black transition-colors">
                {product.name}
              </h3>
            </div>
            <button className="text-gray-400 hover:text-red-500 transition-colors" onClick={(e) => e.preventDefault()}>
              <Heart size={20} />
            </button>
          </div>

          <div className="flex items-baseline gap-2 mt-3">
            <span className="text-2xl font-bold text-black">CA${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">CA${product.originalPrice}</span>
            )}
          </div>

          {/* Size Selector */}
          {availableSizes.length > 0 && (
            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-2">SIZE</p>
              <div className="flex gap-2 flex-wrap">
                {sortedSizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedSize(size);
                    }}
                    className={`text-sm border px-3 py-1.5 rounded-lg transition-all text-black ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={adding}
            className={`mt-6 w-full ${
              adding 
                ? "bg-gray-600" 
                : "bg-black hover:bg-gray-900"
            } text-white py-3.5 rounded-xl flex items-center justify-center gap-2 font-medium transition-all active:scale-95 disabled:opacity-70`}
          >
            <ShoppingCart size={18} />
            {adding?'Processing':'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
}