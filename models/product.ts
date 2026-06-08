// models/Product.ts
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  originalPrice: { 
    type: Number 
  },
  image: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  gender: { 
    type: String, 
    enum: ["male", "female", "unisex"], 
    required: true 
  },
  season: { 
    type: String, 
    enum: ["summer", "winter", "spring", "fall", null],  // Allow null
    default: null
  },
  description: { 
    type: String 
  },
  sizes: [{ 
    type: String 
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;