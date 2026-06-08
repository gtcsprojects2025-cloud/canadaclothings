// app/api/newProduct/[id]/route.tsx
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "../../../../models/product";
// import { Console } from "console";

// PUT - Update product by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    console.log("Updating product with ID:", (await params).id);
    const { id } = await params;           // ← This is how we get the ID
    const body = await request.json();

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name: body.name,
        price: body.price ? parseFloat(body.price) : undefined,
        originalPrice: body.originalPrice ? parseFloat(body.originalPrice) : undefined,
        image: body.image,
        category: body.category?.toLowerCase().trim(),
        gender: body.gender,
        season: body.season && body.season !== "" ? body.season : undefined,
        description: body.description?.trim() || undefined,
        sizes: Array.isArray(body.sizes) ? body.sizes : undefined,
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}