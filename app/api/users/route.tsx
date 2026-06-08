// app/api/users/route.tsx
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "../../../models/user";   // We'll create this

export async function GET() {
  try {
    await connectDB();
    const users = await User.find({})
      .select("-password")
      .sort({ createdAt: -1 });
    
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}