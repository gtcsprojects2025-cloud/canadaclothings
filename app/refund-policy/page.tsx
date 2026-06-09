// app/refund-policy/page.tsx
"use client";

import { motion } from "framer-motion";
import { Shield, Clock, RefreshCw, AlertCircle, CheckCircle, Phone, Mail } from "lucide-react";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-black text-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Shield className="w-20 h-20 mx-auto mb-6 text-white/80" />
            <h1 className="text-6xl font-bold mb-6">Refund Policy</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We stand behind the quality of our products. Learn more about our return and refund process.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="prose prose-lg max-w-none"
        >
          <motion.section variants={fadeIn} className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3 text-black">
              <CheckCircle className="text-green-600" /> Our Promise
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At CanadaClothings, customer satisfaction is our top priority. We offer a hassle-free refund and return policy to ensure you love your purchase.
            </p>
          </motion.section>

          <motion.section variants={fadeIn} className="mb-16">
            <h2 className="text-3xl font-semibold mb-6">Eligibility for Refund</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-3xl shadow-sm">
                <h3 className="font-semibold text-xl mb-4">✅ Eligible Returns</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex gap-3"><span className="text-green-500">•</span> Item received damaged or defective</li>
                  <li className="flex gap-3"><span className="text-green-500">•</span> Wrong item shipped</li>
                  <li className="flex gap-3"><span className="text-green-500">•</span> Item does not match description</li>
                  <li className="flex gap-3"><span className="text-green-500">•</span> Change of mind (within 14 days)</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm">
                <h3 className="font-semibold text-xl mb-4">❌ Non-Refundable</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex gap-3"><span className="text-red-500">•</span> Used or worn items</li>
                  <li className="flex gap-3"><span className="text-red-500">•</span> Items without original tags</li>
                  <li className="flex gap-3"><span className="text-red-500">•</span> Personalized or custom orders</li>
                  <li className="flex gap-3"><span className="text-red-500">•</span> Sale/final clearance items</li>
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3 text-black">
              <Clock className="text-amber-600" /> Return Window
            </h2>
            <p className="text-gray-600 text-lg">
              You have <span className="font-semibold text-black">14 days</span> from the date of delivery to return eligible items.
            </p>
          </motion.section>

          <motion.section variants={fadeIn} className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 text-black">How to Return</h2>
            <div className="space-y-8">
              {[
                "Contact our support team at hello@canadaclothings.com with your order number",
                "Pack the item(s) securely in original packaging with all tags attached",
                "Ship the return to: 1001-1551 Lycee Place Ottawa, Ontario K1G4B5",
                "Once received and inspected, we will process your refund within 3-5 business days"
              ].map((step, i) => (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  className="flex gap-6"
                >
                  <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center font-semibold flex-shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-lg text-gray-600 pt-1">{step}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section variants={fadeIn} className="text-center bg-white rounded-3xl p-12">
            <h2 className="text-3xl font-semibold mb-4 text-black">Need Help?</h2>
            <p className="text-gray-600 mb-8">Our customer support team is available Monday to Friday, 9 AM - 6 PM EST</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="mailto:hello@canadaclothings.com" className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-2xl font-medium hover:bg-gray-900 transition">
                <Mail size={20} /> Email Us
              </Link>
              <Link href="tel:+14165550123" className="inline-flex items-center gap-3 border border-gray-300 px-8 py-4 rounded-2xl font-medium hover:bg-gray-50 transition text-black">
                <Phone size={20} /> Call Us
              </Link>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}