// app/api/contact/route.tsx
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: `"CanadaClothings Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to yourself
      replyTo: email, // So you can reply directly
      subject: `New Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #000;">New Contact Form Submission</h2>
          
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          
          <hr style="margin: 20px 0;">
          
          <h3>Message:</h3>
          <p style="white-space: pre-wrap;">${message}</p>
          
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 14px;">
            Sent from CanadaClothings Contact Form
          </p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Thank you! Your message has been sent successfully."
    });

  } catch (error: any) {
    console.error("Contact Form Error:", error);
    return NextResponse.json({ 
      error: "Failed to send message. Please try again later." 
    }, { status: 500 });
  }
}