// app/reset-password/page.tsx
"use client";

import { Suspense } from "react";
import ResetPasswordContent from "./resetPasswordContent"

// Main wrapper with Suspense boundary
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Loading password reset page...</p>
        </div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}