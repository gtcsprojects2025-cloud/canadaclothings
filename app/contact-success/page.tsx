// app/contact-success/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowRight, Home, MessageSquare } from "lucide-react";

export default function ContactSuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(8);



  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6">
      <div className="max-w-lg w-full text-center">
        <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
          <CheckCircle size={80} className="text-green-600" />
        </div>

        <h1 className="text-5xl font-bold text-gray-900 mb-4 test-black">Message Sent!</h1>
        <p className="text-2xl text-gray-600 mb-8">
          Thank you for reaching out to us.
        </p>

        <div className="bg-white rounded-3xl p-10 mb-12 shadow-sm">
          <div className="flex justify-center mb-6">
            <MessageSquare className="w-16 h-16 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-black">We&apos;ve Received Your Message</h3>
          <p className="text-gray-600">
            Our team will review your message and get back to you within 24-48 hours.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="flex items-center justify-center gap-3 bg-black text-white px-10 py-4 rounded-2xl font-semibold hover:bg-gray-900 transition"
          >
            <Home size={20} />
            Return to Homepage
          </Link>

          <Link
            href="/shop"
            className="flex items-center justify-center gap-3 border border-gray-300 px-10 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition bg-white text-black"
          >
            Continue Shopping
            <ArrowRight size={20} />
          </Link>
        </div>

      </div>
    </div>
  );
}