// app/forgot-password/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        toast.success("Password reset link has been sent to your email");
      } else {
        toast.error(data.error || "Failed to send reset link");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3 text-black">Forgot Password?</h1>
          <p className="text-gray-600">Enter your email and we&apos;ll send you a reset link</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-10">
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-black">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3.5 border border-gray-300 rounded-2xl focus:outline-none focus:border-black text-gray-600"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-4 rounded-2xl font-semibold text-lg hover:bg-gray-900 transition disabled:opacity-70"
              >
                {loading ? "Sending Reset Link..." : "Send Reset Link"}
              </button>

              <div className="text-center">
                <Link href="/auth" className="text-sm text-gray-600 hover:text-black flex items-center justify-center gap-2">
                  <ArrowLeft size={16} /> Back to Login
                </Link>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-3 text-black">Check Your Email</h3>
              <p className="text-gray-600 mb-8">
                We&apos;ve sent a password reset link to <strong>{email}</strong>.<br />
                Please check your inbox (and spam folder).
              </p>
              <button
                onClick={() => {
                  setSuccess(false);
                  setEmail("");
                }}
                className="text-black underline"
              >
                Send to another email
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}