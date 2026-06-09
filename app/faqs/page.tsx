// app/faqs/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, HelpCircle } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    category: "Shipping & Delivery",
    questions: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping within Canada takes 3-7 business days. Express shipping is available at checkout and usually arrives within 1-3 business days."
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship to the USA, UK, Europe, and Australia. International delivery typically takes 7-14 business days depending on the destination."
      },
      {
        q: "Is shipping free?",
        a: "Free shipping is available on all orders over CA$150 within Canada. Orders below that amount have a flat shipping rate of CA$12.99."
      }
    ]
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        q: "What is your return policy?",
        a: "You have 14 days from the date of delivery to return eligible items. Items must be unused, in original packaging, and with all tags attached."
      },
      {
        q: "How do I return an item?",
        a: "Contact our support team with your order number. We'll provide a return shipping label and instructions. Once we receive and inspect the item, we'll process your refund."
      },
      {
        q: "When will I get my refund?",
        a: "Refunds are processed within 3-5 business days after we receive your return. The money will appear back in your original payment method within 5-10 business days."
      }
    ]
  },
  {
    category: "Orders & Payments",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept Paystack, PayPal, Visa, Mastercard, and American Express. All transactions are secure and encrypted."
      },
      {
        q: "Can I change or cancel my order?",
        a: "You can cancel or modify your order within 2 hours of placing it. After that, please contact us as soon as possible."
      },
      {
        q: "Do you offer order tracking?",
        a: "Yes. Once your order ships, you'll receive a tracking number via email to monitor your delivery status."
      }
    ]
  },
  {
    category: "Products & Sizing",
    questions: [
      {
        q: "How do I know which size to order?",
        a: "We provide detailed size charts on each product page. If you're unsure, we recommend sizing up for a more comfortable fit."
      },
      {
        q: "Are your products authentic?",
        a: "All products sold on CanadaClothings are 100% authentic, sourced directly from reputable manufacturers and brands."
      },
      {
        q: "What if an item is out of stock?",
        a: "You can sign up for restock notifications on any product page. We'll email you as soon as it's back in stock."
      }
    ]
  }
];

export default function FAQsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter(item => item !== id));
    } else {
      setOpenItems([...openItems, id]);
    }
  };

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-black text-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <HelpCircle className="w-20 h-20 mx-auto mb-6 text-white/80" />
          <h1 className="text-6xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-400">Find answers to common questions about our products and services.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Search Bar */}
        <div className="relative mb-12">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={22} />
          </div>
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-5 bg-white border border-gray-200 rounded-3xl text-lg focus:outline-none focus:border-black"
          />
        </div>

        {/* FAQs */}
        <div className="space-y-8">
          {filteredFaqs.map((category, catIndex) => (
            <div key={catIndex}>
              <h2 className="text-2xl font-semibold mb-6 text-black">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq, index) => {
                  const itemId = `${catIndex}-${index}`;
                  const isOpen = openItems.includes(itemId);

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white border border-gray-100 rounded-3xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition"
                      >
                        <span className="font-medium text-lg pr-8">{faq.q}</span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown size={24} />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="overflow-hidden"
                          >
                            <div className="px-8 pb-8 text-gray-600 leading-relaxed border-t">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-20 bg-white rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-semibold mb-4">Still Have Questions?</h2>
          <p className="text-gray-600 mb-8">Our friendly support team is here to help.</p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-3 bg-black text-white px-10 py-4 rounded-2xl font-medium hover:bg-gray-900 transition"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}