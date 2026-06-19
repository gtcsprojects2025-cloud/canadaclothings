// app/api/auth/route.tsx
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "../../../models/user";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || "yourSuperSecretKeyForJWTsChangeInProduction";

// POST /api/auth → Register or Login
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { action, name, email, password } = await request.json();

    if (action === "register") {
      if (!name || !email || !password) {
        return NextResponse.json({ error: "All fields required" }, { status: 400 });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json({ error: "User already exists" }, { status: 400 });
      }

      const user = await User.create({ name, email, password });
      const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

      const response = NextResponse.json({ success: true, user: { name: user.name, email: user.email } });
      response.cookies.set("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 7 });
      return response;
    }

    // Login
    if (action === "login") {
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }

      const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

      const response = NextResponse.json({ success: true, user: { name: user.name, email: user.email, role: user.role } });
      response.cookies.set("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 7 });
      return response;
    }
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}