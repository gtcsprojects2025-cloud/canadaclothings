// app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Plus, Trash2, RefreshCw, Edit2, Upload } from "lucide-react";
import { Product } from "@/lib/types";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

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
    fetchProducts();
  }, []);

  // Cloudinary Image Upload
  // const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   setUploadingImage(true);

  //   const formDataUpload = new FormData();
  //   formDataUpload.append("file", file);
  //   formDataUpload.append("upload_preset", "canadaclothings"); // Create this preset in Cloudinary

  //   try {
  //     const res = await fetch(
  //       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/image/upload`,
  //       {
  //         method: "POST",
  //         body: formDataUpload,
  //       }
  //     );

  //     const data = await res.json();

  //     console.log("response from cloudinary...", res)

  //     if (data.secure_url) {
  //       setFormData(prev => ({ ...prev, image: data.secure_url }));
  //       toast.success("Image uploaded successfully!");
  //     }
  //   } catch (error) {
  //     console.log("failed to upload image", error)
  //     toast.error("Failed to upload image");
  //   } finally {
  //     setUploadingImage(false);
  //   }
  // };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setUploadingImage(true);

  const formDataUpload = new FormData();
  formDataUpload.append("file", file);
  formDataUpload.append("upload_preset", "canadaclothings"); // Must match your preset name

  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (!cloudName) {
      throw new Error("Cloudinary Cloud Name is missing in .env.local");
    }

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formDataUpload,
      }
    );

    const data = await res.json();

    if (data.secure_url) {
      setFormData(prev => ({ ...prev, image: data.secure_url }));
      toast.success("Image uploaded successfully!");
    } else {
      throw new Error(data.error?.message || "Upload failed");
    }
  } catch (error: any) {
    console.error("Cloudinary Upload Error:", error);
    toast.error(error.message || "Failed to upload image. Check console.");
  } finally {
    setUploadingImage(false);
  }
};

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
      name: "", price: "", originalPrice: "", image: "", category: "",
      gender: "female", season: "", description: "", sizes: [],
    });
    setNewSize("");
    setEditingProduct(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        image: formData.image,
        category: formData.category,
        gender: formData.gender,
        season: formData.season || undefined,
        description: formData.description || undefined,
        sizes: formData.sizes,
      };

      let res;
      if (editingProduct) {
        res = await fetch(`/api/newProduct/${editingProduct._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/newProduct", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        toast.success(editingProduct ? "Product updated!" : "Product added successfully!");
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
      image: product.image||"",
      category: product.category,
      gender: product.gender,
      season: product.season || "",
      description: product.description || "",
      sizes: product.sizes || [],
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <button onClick={fetchProducts} className="flex items-center gap-2 px-5 py-3 bg-white rounded-2xl border">
            <RefreshCw size={18} /> Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Add/Edit Product Form */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">Product Image</label>
                <div className="flex gap-4">
                  <label className="flex-1 cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-gray-400 transition">
                      <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                      <p className="text-sm text-gray-500">Click to upload image</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>

                  {formData.image && (
                    <div className="w-24 h-24 border rounded-2xl overflow-hidden">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                {uploadingImage && <p className="text-sm text-blue-600 mt-2">Uploading to Cloudinary...</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Image URL (Auto-filled)</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-2xl"
                  placeholder="https://res.cloudinary.com/..."
                />
              </div>

              {/* Other Fields */}
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

              {/* Rest of the form remains the same... */}
              <button
                type="submit"
                disabled={submitting || uploadingImage}
                className="w-full bg-black text-white py-4 rounded-2xl font-semibold text-lg hover:bg-gray-900 disabled:opacity-70"
              >
                {submitting ? "Saving..." : editingProduct ? "Update Product" : "Add Product"}
              </button>
            </form>
          </div>

          {/* Products List */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">All Products ({products.length})</h2>
            {/* Your existing product list rendering */}
          </div>
        </div>
      </div>
    </div>
  );
}