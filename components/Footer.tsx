// components/Footer.tsx
"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, X} from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleAdminLogin = ()=>{

    if(localStorage.getItem("adminLogin")){
    window.location.href="/admin/dashboard"
    }else{

      setTimeout(()=>{
      toast.error("Login as an Administrator");
      window.location.href="/auth"

      }, 1000)
    
      
    }
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Thank you! You've been subscribed to our newsletter.");
      setEmail("");
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: Brand & Address */}
          <div className="lg:col-span-4">
            <h2 className="text-white text-3xl font-bold tracking-tight">CanadaClothings</h2>
            <p className="mt-3 text-gray-400 max-w-md">
              Premium fashion for every generation. Quality clothing with Canadian warmth and international style.
            </p>

            <div className="mt-8 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p>1001-1551 Lycee Place </p>
                  <p>Ottawa, Ontario K1G4B5</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <p>(+1)-613-416-3188</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <p>hello@canadaclothings.com</p>
              </div>
              <div className="flex items-center gap-3">
                {/* <Mail className="w-5 h-5 text-gray-400" /> */}
                <button onClick={handleAdminLogin} className="hover:text-white mt-2 cursor-pointer p-2 bg-red-600 rounded-xl transition">ADMIN LOGIN</button>
              </div>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold text-lg mb-5">Shop</h3>
            <ul className="space-y-3">
              <li><Link href="/shop?gender=female" className="hover:text-white transition">Women&apos;s Collection</Link></li>
              <li><Link href="/shop?gender=male" className="hover:text-white transition">Men&apos;s Collection</Link></li>
              <li><Link href="/shop?gender=children" className="hover:text-white transition">Kids&apos; Collection</Link></li>
              <li><Link href="/shop" className="hover:text-white transition">All Products</Link></li>
              <li><Link href="/shop?season=summer" className="hover:text-white transition">Summer Sale</Link></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold text-lg mb-5">Support</h3>
            <ul className="space-y-3">
              <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition">Shipping Policy</Link></li>
              <li><Link href="/returns" className="hover:text-white transition">Returns & Exchanges</Link></li>
              <li><Link href="/faq" className="hover:text-white transition">FAQs</Link></li>
              <li><Link href="/track-order" className="hover:text-white transition">Track Your Order</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-4">
            <h3 className="text-white font-semibold text-lg mb-5">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to get early access to new arrivals, exclusive offers, and seasonal collections.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="bg-gray-800 border border-gray-700 text-white px-5 py-3 rounded-l-xl focus:outline-none focus:border-gray-600 flex-1"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-white text-black px-8 rounded-r-xl font-medium hover:bg-gray-100 transition disabled:opacity-70"
                >
                  {isSubmitting ? "Joining..." : "Subscribe"}
                </button>
              </div>
              <p className="text-xs text-gray-500">
                We respect your inbox. Unsubscribe anytime.
              </p>
            </form>

            {/* Social Media */}
            <div className="mt-10">
              <h4 className="text-white font-medium mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white transition"><FaFacebook size={24} /></a>
                <a href="#" className="hover:text-white transition"><FaInstagram size={24} /></a>
                <a href="#" className="hover:text-white transition"><FaLinkedin size={24} /></a>
                <a href="#" className="hover:text-white transition"><FaYoutube size={24} /></a>
                <a href="#" className="hover:text-white transition"><FaTiktok size={24} /></a>
                <a href="#" className="hover:text-white transition"><FaXTwitter size={24} /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} CanadaClothings. All Rights Reserved.</p>
          
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-gray-300 transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition">Terms of Service</Link>
            <Link href="/accessibility" className="hover:text-gray-300 transition">Accessibility</Link>
          </div>

          <p className="mt-4 md:mt-0">Powered By <a href="https://loplatforms.com" className="hover:text-gray-300 transition">LOPlatforms</a></p>
        </div>
      </div>
    </footer>
  );
}