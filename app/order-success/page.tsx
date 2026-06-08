// app/order-success/page.tsx
"use client";

import { Suspense } from "react";
import OrderSuccessContent from "./OrderSuccessContent";

// Main page wrapper with Suspense boundary
export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Finalizing your order confirmation...</p>
        </div>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}