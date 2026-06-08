// app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {  Trash2, RefreshCw, Edit2 } from "lucide-react";

interface Product {
  _id?: string;
  id?: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  gender: "male" | "female" | "unisex";
  season?: "summer" | "winter" | "spring" | "fall";
  description?: string;
  sizes?: string[];
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State (All fields from Product type)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    image: "",
    category: "",
    gender: "female" as "male" | "female" | "unisex",
    season: "" as "" | "summer" | "winter" | "spring" | "fall",
    description: "",
    sizes: [] as string[],
  });

  const [newSize, setNewSize] = useState("");

  // Fetch Products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/newProduct");
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(!localStorage.getItem("adminLogin")){
      window.location.href="/auth"
    }else{
      fetchProducts();
    }
    
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addSize = () => {
    if (newSize.trim() && !formData.sizes.includes(newSize.trim().toUpperCase())) {
      setFormData(prev => ({
        ...prev,
        sizes: [...prev.sizes, newSize.trim().toUpperCase()]
      }));
      setNewSize("");
    }
  };

  const removeSize = (sizeToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter(s => s !== sizeToRemove)
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      originalPrice: "",
      image: "",
      category: "",
      gender: "female",
      season: "",
      description: "",
      sizes: [],
    });
    setNewSize("");
    setEditingProduct(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        season: formData.season || undefined,
        description: formData.description || undefined,
      };

      const method = editingProduct ? "PUT" : "POST";
      const url = editingProduct ? `/api/newProduct/${editingProduct._id || editingProduct.id}` : "/api/newProduct";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log("Response from server:", res);

      if (res.ok) {
        toast.success(editingProduct ? "Product updated successfully!" : "Product added successfully!");
        fetchProducts();
        resetForm();
      } else {
        toast.error("Failed to save product");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const editProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || "",
      image: product.image,
      category: product.category,
      gender: product.gender,
      season: product.season || "",
      description: product.description || "",
      sizes: product.sizes || [],
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            Admin Dashboard
          </h1>
          <button
            onClick={fetchProducts}
            className="flex items-center gap-2 px-5 py-3 bg-white rounded-2xl border hover:bg-gray-50 transition"
          >
            <RefreshCw size={18} /> Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 ">
          {/* Add / Edit Product Form */}
          <div className="bg-gray-100  rounded-3xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 ">
              <div>
                <label className="block text-sm font-medium mb-2">Product Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 border rounded-2xl" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label>Price (CA$) *</label>
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} required step="0.01" className="w-full px-4 py-3 border rounded-2xl" />
                </div>
                <div>
                  <label>Original Price</label>
                  <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleInputChange} step="0.01" className="w-full px-4 py-3 border rounded-2xl" />
                </div>
              </div>

              <div>
                <label>Image URL *</label>
                <input type="text" placeholder="https://picsum.photos/id/1015/600/800" name="image" value={formData.image} onChange={handleInputChange} required className="w-full px-4 py-3 border rounded-2xl" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label>Category *</label>
                  <input type="text" name="category" value={formData.category} onChange={handleInputChange} required className="w-full px-4 py-3 border rounded-2xl" />
                </div>
                <div>
                  <label>Gender *</label>
                  <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full px-4 py-3 border rounded-2xl">
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="unisex">Unisex</option>
                  </select>
                </div>
              </div>

              <div>
                <label>Season</label>
                <select name="season" value={formData.season} onChange={handleInputChange} className="w-full px-4 py-3 border rounded-2xl">
                  <option value="">No Season</option>
                  <option value="summer">Summer</option>
                  <option value="winter">Winter</option>
                  <option value="spring">Spring</option>
                  <option value="fall">Fall</option>
                </select>
              </div>

              <div>
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} className="w-full px-4 py-3 border rounded-2xl" />
              </div>

              {/* Sizes Management */}
              <div>
                <label className="block text-sm font-medium mb-2">Sizes</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                    placeholder="S, M, L..."
                    className="flex-1 px-4 py-3 border rounded-2xl"
                  />
                  <button type="button" onClick={addSize} className="px-6 bg-black text-white rounded-2xl">Add</button>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {formData.sizes.map((size) => (
                    <div key={size} className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-2xl">
                      {size}
                      <button type="button" onClick={() => removeSize(size)} className="text-red-500">
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-black text-white py-4 rounded-2xl font-semibold hover:bg-gray-900 disabled:opacity-70"
                >
                  {submitting ? "Saving..." : editingProduct ? "Update Product" : "Add Product"}
                </button>
                {editingProduct && (
                  <button type="button" onClick={resetForm} className="px-8 border border-gray-300 rounded-2xl hover:bg-gray-50">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Products List */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">All Products ({products.length})</h2>

            {loading ? (
              <p className="text-center py-10">Loading products...</p>
            ) : (
              <div className="space-y-4 max-h-[750px] overflow-auto pr-4">
                {products.map((product) => (
                  <div key={product._id || product.id} className="bg-white p-6 rounded-3xl flex gap-6 items-center border">
                    <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-2xl" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-sm text-gray-500">
                        {product.gender} • {product.category} • CA${product.price}
                      </p>
                      {product.sizes && product.sizes.length > 0 && (
                        <p className="text-xs text-gray-400 mt-1">Sizes: {product.sizes.join(", ")}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => editProduct(product)} className="p-3 hover:bg-gray-100 rounded-xl">
                        <Edit2 size={20} />
                      </button>
                      <button className="p-3 hover:bg-red-50 text-red-500 rounded-xl">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}