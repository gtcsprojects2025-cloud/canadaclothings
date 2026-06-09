// app/terms-of-service/page.tsx
"use client";

import { motion } from "framer-motion";
import { Scale, Shield, FileText, Users, Clock, AlertTriangle } from "lucide-react";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function TermsOfServicePage() {
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
            <Scale className="w-20 h-20 mx-auto mb-6 text-white/80" />
            <h1 className="text-6xl font-bold mb-6 text-white">Terms of Service</h1>
            <p className="text-xl text-gray-400">Last Updated: April 1, 2023</p>
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
            <p className="text-gray-600 leading-relaxed text-lg">
              Welcome to <strong>Canada Clothings</strong>. These Terms of Service ("Terms") govern your use of our website located at <strong>www.canadaclothings.com</strong> (the "Website") and your purchase of products from us.
            </p>
          </motion.section>

          <motion.section variants={fadeIn} className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3 text-black">
              <Users className="text-blue-600" /> User Obligations
            </h2>
            <div className="bg-white p-8 rounded-3xl shadow-sm">
              <p className="text-gray-600 leading-relaxed">
                By using our Website, you represent that you are at least 18 years old or the legal age of majority in your jurisdiction. You agree to provide accurate, current, and complete information when submitting data to us. You are responsible for maintaining the confidentiality of your account and password.
              </p>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 text-black">Purchases & Orders</h2>
            <div className="bg-white p-8 rounded-3xl shadow-sm space-y-6">
              <ul className="list-disc pl-6 space-y-4 text-gray-600">
                <li>All purchases are subject to our acceptance. We reserve the right to refuse or cancel any order.</li>
                <li>Prices and availability are subject to change without notice.</li>
                <li>We do not permit orders from dealers or resellers.</li>
                <li>All sales are final except as provided in our Return Policy.</li>
              </ul>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3 text-black">
              <Shield className="text-emerald-600" /> Intellectual Property
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              All content on this Website, including text, images, logos, and designs, is the property of Canada Clothings or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.
            </p>
          </motion.section>

          <motion.section variants={fadeIn} className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 text-black">Limitation of Liability</h2>
            <div className="bg-white p-8 rounded-3xl shadow-sm">
              <p className="text-gray-600">
                To the fullest extent permitted by law, Canada Clothings shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Website or purchase of products.
              </p>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 text-black">Governing Law</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the Province of Ontario, Canada, without regard to its conflict of law provisions.
            </p>
          </motion.section>

          <motion.section variants={fadeIn} className="text-center bg-white rounded-3xl p-12">
            <h2 className="text-3xl font-semibold mb-4 text-black">Questions?</h2>
            <p className="text-gray-600 mb-8">If you have any questions about these Terms of Service, please contact us.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center gap-3 bg-black text-white px-10 py-4 rounded-2xl font-medium hover:bg-gray-900 transition">
                Contact Us
              </Link>
              <Link href="/privacy-policy" className="inline-flex items-center gap-3 border border-gray-300 px-10 py-4 rounded-2xl font-medium hover:bg-gray-50 transition text-black">
                Privacy Policy
              </Link>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}