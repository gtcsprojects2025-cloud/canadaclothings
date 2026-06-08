// app/order-success/OrderSuccessContent.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowRight, ShoppingBag, Home } from "lucide-react";

export default function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const [orderRef, setOrderRef] = useState<string>("");

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      setOrderRef(ref);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6">
      <div className="max-w-2xl w-full text-center">
        <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
          <CheckCircle size={80} className="text-green-600" />
        </div>

        <h1 className="text-5xl font-bold text-gray-900 mb-4">Thank You!</h1>
        <p className="text-2xl text-gray-600 mb-8">Your order has been placed successfully</p>

        {orderRef && (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-10">
            <p className="text-sm text-gray-500 mb-1">Order Reference</p>
            <p className="text-2xl font-mono font-semibold text-black tracking-widest">{orderRef}</p>
          </div>
        )}

        <div className="bg-white rounded-3xl p-8 mb-10 text-left">
          <h3 className="font-semibold text-lg mb-6">What happens next?</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-medium">1</span>
              </div>
              <div>
                <p className="font-medium">Order Confirmation</p>
                <p className="text-sm text-gray-600">You will receive a confirmation email shortly.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-medium">2</span>
              </div>
              <div>
                <p className="font-medium">Processing</p>
                <p className="text-sm text-gray-600">Our team is preparing your order for shipment.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-medium">3</span>
              </div>
              <div>
                <p className="font-medium">Delivery</p>
                <p className="text-sm text-gray-600">You will be notified when your order is on the way.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/account"
            className="flex items-center justify-center gap-3 bg-black text-white px-10 py-4 rounded-2xl font-semibold hover:bg-gray-900 transition"
          >
            <ShoppingBag size={20} />
            View My Orders
          </Link>

          <Link
            href="/shop"
            className="flex items-center justify-center gap-3 border border-gray-300 px-10 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition"
          >
            Continue Shopping
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="mt-12">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition">
            <Home size={18} />
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}