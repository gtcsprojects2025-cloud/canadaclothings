// app/api/orders/route.tsx
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "../../../models/order";   // We'll create this
import { getToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const decoded = getToken(token);
    if (!decoded?.userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { 
      items, 
      total, 
      shippingAddress, 
      paymentMethod, 
      paymentReference 
    } = await request.json();

    const newOrder = await Order.create({
      user: decoded.userId,
      orderNumber: `ORD-${Date.now()}`,
      items: items,
      totalAmount: total,
      shippingAddress,
      paymentMethod,
      paymentReference,
      status: "Processing",
    });

    return NextResponse.json({
      success: true,
      message: "Order created successfully",
      order: newOrder
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

}


  // GET - Fetch user's orders
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const decoded = getToken(token);
    if (!decoded?.userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const orders = await Order.find({ })
      .sort({ createdAt: -1 })
      .populate('items.product', 'name image'); // Optional: populate product details

    return NextResponse.json(orders);
  } catch (error: any) {
    console.error("Fetch Orders Error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
