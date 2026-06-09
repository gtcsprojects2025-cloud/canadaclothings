// app/shipping-policy/page.tsx
"use client";

import { motion } from "framer-motion";
import { Truck, Clock, Globe, ShieldCheck, Package } from "lucide-react";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } }
};

export default function ShippingPolicyPage() {
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
            <Truck className="w-20 h-20 mx-auto mb-6 text-white/80" />
            <h1 className="text-6xl font-bold mb-6 text-white">Shipping Policy</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Fast, reliable, and secure shipping across Canada and internationally.
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
              <Globe className="text-blue-600" /> Shipping Destinations
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm">
                <h3 className="font-semibold text-2xl mb-4 text-black">🇨🇦 Canada</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• Free shipping on orders over CA$150</li>
                  <li>• Standard delivery: 3-7 business days</li>
                  <li>• Express delivery available</li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm">
                <h3 className="font-semibold text-2xl mb-4 text-black">🌍 International</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• Shipping to USA, UK, Europe & Australia</li>
                  <li>• Delivery: 7-14 business days</li>
                  <li>• Customs & duties may apply</li>
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3 text-black">
              <Clock className="text-amber-600" /> Processing & Delivery Times
            </h2>
            <div className="bg-white rounded-3xl p-10 space-y-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="text-sm uppercase tracking-widest text-gray-500 mb-2">Order Processing</div>
                  <p className="text-2xl font-semibold text-black">1-2 Business Days</p>
                  <p className="text-gray-600 mt-2">Orders placed before 2 PM EST are processed same day.</p>
                </div>
                <div>
                  <div className="text-sm uppercase tracking-widest text-gray-500 mb-2">Canada Shipping</div>
                  <p className="text-2xl font-semibold text-black">3-7 Business Days</p>
                  <p className="text-gray-600 mt-2">Express options available at checkout.</p>
                </div>
                <div>
                  <div className="text-sm uppercase tracking-widest text-gray-500 mb-2">International</div>
                  <p className="text-2xl font-semibold text-black">7-14 Business Days</p>
                  <p className="text-gray-600 mt-2">Delivery times vary by country.</p>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 text-black">Shipping Rates</h2>
            <div className="bg-white rounded-3xl p-10">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-5 text-black">Destination</th>
                    <th className="text-left py-5 text-black">Order Value</th>
                    <th className="text-left py-5 text-black">Shipping Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-5 text-gray-600">Canada</td>
                    <td className="py-5 text-gray-600">Under CA$150</td>
                    <td className="py-5 text-gray-600 font-medium">CA$12.99</td>
                  </tr>
                  <tr>
                    <td className="py-5 text-gray-600">Canada</td>
                    <td className="py-5 text-gray-600">Over CA$150</td>
                    <td className="py-5 font-medium text-green-600">FREE</td>
                  </tr>
                  <tr>
                    <td className="py-5 text-gray-600">USA</td>
                    <td className="py-5 text-gray-600">All Orders</td>
                    <td className="py-5 text-gray-600 font-medium">CA$24.99</td>
                  </tr>
                  <tr>
                    <td className="py-5 text-gray-600">International</td>
                    <td className="py-5 text-gray-600">All Orders</td>
                    <td className="py-5 text-gray-600 font-medium">CA$34.99+</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3 text-black">
              <ShieldCheck className="text-emerald-600" /> Important Notes
            </h2>
            <ul className="list-disc pl-6 space-y-4 text-gray-600 text-lg">
              <li>Tracking number will be emailed to you once your order is shipped.</li>
              <li>During peak seasons (Black Friday, Holidays), delivery times may be longer.</li>
              <li>Customs duties and taxes for international orders are the responsibility of the customer.</li>
              <li>We ship from our warehouse in Toronto, Canada.</li>
            </ul>
          </motion.section>

          <motion.div variants={fadeIn} className="text-center bg-white rounded-3xl p-12">
            <h2 className="text-3xl font-semibold mb-4 text-black">Have Questions?</h2>
            <p className="text-gray-600 mb-8">Our support team is happy to help with any shipping inquiries.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center gap-3 bg-black text-white px-10 py-4 rounded-2xl font-medium hover:bg-gray-900 transition">
                Contact Support
              </Link>
              <Link href="mailto:hello@canadaclothings.com" className="inline-flex items-center gap-3 border border-gray-300 px-10 py-4 rounded-2xl font-medium hover:bg-gray-50 transition text-black">
                Email Us
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}