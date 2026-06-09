// app/api/auth/forgot-password/route.tsx
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "../../../../models/user";
import crypto from "crypto";

import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Don't reveal if email exists (security best practice)
      return NextResponse.json({ 
        success: true, 
        message: "If an account exists, a reset link has been sent." 
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    // In production, send email with reset link
    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;

    // Nodemailer Setup
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can use other services like SendGrid, Resend, etc.
      auth: {
        user: process.env.EMAIL_USER,        // Your Gmail address
        pass: process.env.EMAIL_PASSWORD,    // App Password (not regular password)
      },
    });

    const mailOptions = {
      from: `"CanadaClothings" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Password - CanadaClothings",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #000; text-align: center;">Password Reset Request</h2>
          <p>Hello ${user.name},</p>
          <p>You requested to reset your password. Click the button below to proceed:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #000; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold;">
              Reset Password
            </a>
          </div>

          <p style="color: #666; font-size: 14px;">
            This link will expire in 15 minutes. If you didn't request this, please ignore this email.
          </p>
          
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            Best regards,<br>
            <strong>CanadaClothings Team</strong>
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log(`🔑 Password reset link for ${email}: ${resetUrl}`);

    return NextResponse.json({
      success: true,
      message: "Password reset link has been sent to your email."
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}