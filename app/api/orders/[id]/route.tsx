// app/api/orders/[id]/route.tsx
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "../../../../models/order";   // We'll create this
import { getToken } from "@/lib/auth";

// PATCH - Update order status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const { status } = await request.json();

    console.log("Updating order:", id, "to status:", status); // Debug log

    // Validate status
    const validStatuses = ["Processing", "Shipped", "Delivered", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ 
        error: "Invalid status. Must be: Processing, Shipped, Delivered, or Cancelled" 
      }, { status: 400 });
    }

    // Check authentication (optional but recommended)
    const token = request.cookies.get("token")?.value;
    if (token) {
      const decoded = getToken(token);
      if (!decoded) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 405});
       
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Order status updated to ${status}`,
      order: updatedOrder
    });
  } catch (error: any) {
    console.error("Update Order Status Error:", error);
    return NextResponse.json({ 
      error: error.message || "Failed to update order status" 
    }, { status: 500 });
  }
}