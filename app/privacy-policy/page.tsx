// app/privacy-policy/page.tsx
"use client";

import { motion } from "framer-motion";
import { Shield, Eye, Lock, Users, Clock, Globe } from "lucide-react";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function PrivacyPolicyPage() {
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
            <h1 className="text-6xl font-bold mb-6 text-white">Privacy Policy</h1>
            <p className="text-xl text-gray-400">Last Updated: February 1st, 2023</p>
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
              At <strong>CanadaClothings Ltd</strong>, we take the privacy of our customers seriously and are committed to protecting their personal information. This Privacy Policy outlines the information we collect, how we use it, and the steps we take to ensure its security.
            </p>
          </motion.section>

          <motion.section variants={fadeIn} className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3 text-black">
              <Users className="text-blue-600" /> Information We Collect
            </h2>
            <div className="bg-white p-8 rounded-3xl shadow-sm space-y-6">
              <ul className="space-y-4 text-gray-600">
                <li className="flex gap-3 text-gray-600"><span className="text-blue-600">•</span> Contact information (name, postal address, email address, telephone number)</li>
                <li className="flex gap-3 text-gray-600"><span className="text-blue-600">•</span> Payment information (credit card numbers, expiration dates, security codes)</li>
                <li className="flex gap-3 text-gray-600"><span className="text-blue-600">•</span> Demographic information (age, gender, location)</li>
                <li className="flex gap-3 text-gray-600"><span className="text-blue-600">•</span> Purchase history and preferences</li>
              </ul>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3 text-black">
              <Eye className="text-amber-600" /> How We Use Your Information
            </h2>
            <div className="bg-white p-8 rounded-3xl shadow-sm space-y-4 text-gray-600">
              <p>We use the information we collect to provide you with the best possible shopping experience, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Processing and fulfilling your orders</li>
                <li>Providing customer service and support</li>
                <li>Sending promotional offers and updates</li>
                <li>Improving our website and product offerings</li>
                <li>Analyzing customer trends and preferences</li>
              </ul>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3 text-black">
              <Lock className="text-emerald-600" /> Information Sharing
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We do not sell or rent your personal information to third parties. We may share information with trusted third-party service providers who help us operate our business (such as shipping companies and payment processors). These companies are contractually obligated to protect your information and use it only for the services we request.
            </p>
          </motion.section>

          <motion.section variants={fadeIn} className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 text-black">Data Security</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information, including secure servers, encryption technology, and restricted access to authorized personnel only.
            </p>
          </motion.section>

          <motion.section variants={fadeIn} className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 text-black">Cookies Policy</h2>
            <div className="bg-white p-8 rounded-3xl shadow-sm text-gray-600 space-y-6">
              <p>We use cookies to enhance your experience on our website. Cookies help us remember your preferences, understand how you use our site, and improve our services.</p>
              <p>You can manage your cookie preferences through your browser settings. However, disabling cookies may affect the functionality of our website.</p>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 text-black">Changes to This Policy</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
            </p>
          </motion.section>

          <motion.div variants={fadeIn} className="text-center bg-white rounded-3xl p-12">
            <h2 className="text-3xl font-semibold mb-4 text-black">Questions or Concerns?</h2>
            <p className="text-gray-600 mb-8">If you have any questions about this Privacy Policy, please feel free to contact us.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center gap-3 bg-black text-white px-10 py-4 rounded-2xl font-medium hover:bg-gray-900 transition">
                Contact Us
              </Link>
              <a href="mailto:hello@canadaclothings.com" className="inline-flex items-center gap-3 border border-gray-300 px-10 py-4 rounded-2xl font-medium hover:bg-gray-50 transition text-black">
                Email Us
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}