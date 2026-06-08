// app/product/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Heart, ArrowLeft, Star } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { toast } from "react-hot-toast";
import { Product } from "@/lib/types";



export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/newProduct`);
        const allProducts: Product[] = await res.json();
        console.log("Fetched products:", params._id, params);

        // console.log("params id:", params.id);

        const foundProduct = allProducts.find(p => 
          p._id === params.id || p._id?.toString() === params.id
        );

        if (foundProduct) {
          setProduct(foundProduct);
          setSelectedSize(foundProduct.sizes?.[0] || "");
        } else {
          toast.error("Product not found");
          console.error("Product not found for id:", params.id);
          router.push("/shop");
        }

        // Get related products
        const related = allProducts
          .filter(p => p.gender === foundProduct?.gender && p._id !== foundProduct?._id)
          .slice(0, 4);
        
        setRelatedProducts(related);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params._id, router]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product as any, selectedSize || undefined);
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Back Button */}
        <Link href="/shop" className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-8">
          <ArrowLeft size={20} />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div>
            <div className="relative aspect-square bg-white rounded-3xl overflow-hidden shadow-sm">
              <Image
                src={product.image||"/placeholder.png"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 capitalize">
                {product.gender} • {product.category}
                {product.season && <span>• {product.season}</span>}
              </div>
              <h1 className="text-4xl font-bold leading-tight">{product.name}</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={22} fill="currentColor" />
                ))}
              </div>
              <span className="text-gray-500">(24 reviews)</span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold">CA${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">
                  CA${product.originalPrice}
                </span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed text-lg">
              {product.description || "Premium quality product with exceptional comfort and modern style."}
            </p>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <p className="font-medium mb-3">Select Size</p>
                <div className="flex flex-wrap gap-3">
                  {product.sizes[0].split(",").map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 border rounded-2xl text-sm font-medium transition-all ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <p className="font-medium mb-3">Quantity</p>
              <div className="flex items-center gap-4 w-fit border rounded-2xl px-4 py-2">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-2xl hover:bg-gray-100 w-8">-</button>
                <span className="font-semibold w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-2xl hover:bg-gray-100 w-8">+</button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-black hover:bg-gray-900 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition active:scale-95"
            >
              <ShoppingCart size={22} />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Related Products */}
         {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((related, i) => (
                <ProductCard key={i} product={related} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}