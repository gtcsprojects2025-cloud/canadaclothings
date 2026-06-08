// app/api/newProduct/route.tsx
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "../../../models/product";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Accept all fields dynamically
    const productData = {
      name: body.name,
      price: parseFloat(body.price),
      originalPrice: body.originalPrice ? parseFloat(body.originalPrice) : undefined,
      image: body.image,
      category: body.category?.toLowerCase().trim(),
      gender: body.gender,
      season: body.season && body.season !== "" ? body.season : undefined,
      description: body.description?.trim() || undefined,
      sizes: Array.isArray(body.sizes) ? body.sizes : [],
    };

    // Validation
    if (!productData.name || !productData.price || !productData.image || !productData.category || !productData.gender) {
      return NextResponse.json({ 
        error: "Missing required fields: name, price, image, category, gender" 
      }, { status: 400 });
    }

    const newProduct = await Product.create(productData);

    return NextResponse.json({
      success: true,
      message: "Product added successfully!",
      product: newProduct,
    });
  } catch (error: any) {
    console.error("Product Creation Error:", error);
    return NextResponse.json({ 
      error: error.message || "Failed to create product" 
    }, { status: 500 });
  }
}

// GET all products
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



// PUT - Update existing product
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name: updateData.name,
        price: updateData.price ? parseFloat(updateData.price) : undefined,
        originalPrice: updateData.originalPrice ? parseFloat(updateData.originalPrice) : undefined,
        image: updateData.image,
        category: updateData.category?.toLowerCase().trim(),
        gender: updateData.gender,
        season: updateData.season && updateData.season !== "" ? updateData.season : undefined,
        description: updateData.description?.trim() || undefined,
        sizes: Array.isArray(updateData.sizes) ? updateData.sizes : undefined,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Product updated successfully!",
      product: updatedProduct,
    });
  } catch (error: any) {
    console.error("Update Product Error:", error);
    return NextResponse.json({ error: error.message || "Failed to update product" }, { status: 500 });
  }
}