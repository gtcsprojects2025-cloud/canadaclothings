// app/contact/page.tsx
"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { toast } from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";

export default function ContactPage() {

  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Message sent successfully!");
        
        setFormData({ name: "", email: "", subject: "", message: "" });
        
        router.push('/contact-success')
      } else {
        toast.error(data.error || "Failed to send message");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-black">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We&apos;d love to hear from you. Our team is ready to assist with any questions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl shadow-sm p-10">
              <h2 className="text-3xl font-semibold mb-8 text-black">Send Us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-600">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-600">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-600">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-600">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={8}
                    className="w-full px-5 py-4 border border-gray-300 rounded-3xl focus:outline-none focus:border-black resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-black text-white py-4 rounded-2xl font-semibold text-lg hover:bg-gray-900 transition flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {submitting ? "Sending Message..." : "Send Message"}
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-10">
              <h2 className="text-2xl font-semibold mb-8 text-black">Get in Touch</h2>

              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-black">
                    <MapPin size={24} />
                  </div>
                  <div className=" text-gray-600">
                    <p className="font-medium">Visit Us</p>
                    <p className="text-gray-600 mt-1">1001-1551 Lycee Place
                    <br />Ottawa, Ontario K1G4B5</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-black">
                    <Phone size={24} />
                  </div>
                  <div className=" text-gray-600">
                    <p className="font-medium">Call Us</p>
                    <p className="text-gray-600 mt-1">(+1)-613-416-3188</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-black">
                    <Mail size={24} />
                  </div>
                  <div className=" text-gray-600">
                    <p className="font-medium">Email Us</p>
                    <p className="text-gray-600 mt-1">hello@canadaclothings.com</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-black">
                    <Clock size={24} />
                  </div>
                  <div className=" text-gray-600">
                    <p className="font-medium">Business Hours</p>
                    <p className="text-gray-600 mt-1">Monday - Friday: 9:00 AM - 7:00 PM<br />Saturday: 10:00 AM - 6:00 PM<br />Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}