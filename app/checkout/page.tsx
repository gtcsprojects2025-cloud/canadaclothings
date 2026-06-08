// app/checkout/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, CreditCard, Truck } from "lucide-react";
import { toast } from "react-hot-toast";
import PaystackPop from '@paystack/inline-js';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"paystack" | "paypal">("paystack");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "ON",
    postalCode: "",
  });

  const subtotal = getTotalPrice();
  const shipping = subtotal > 150 ? 0 : 12.99;
  const total = subtotal + shipping;
  const amountInKobo = Math.round(total * 100);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Paystack Payment
  const handlePaystackPayment = () => {
    if (!formData.email || !formData.firstName) {
      toast.error("Please fill in your name and email");
      return;
    }

    setIsProcessing(true);

    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: formData.email,
      amount: amountInKobo,
      firstname: formData.firstName,
      lastname: formData.lastName,
      phone: formData.phone,
      currency: "NGN",
      metadata: {
        order_items: cart.length,
      },
onSuccess: async (transaction: any) => {
  // Create order in database
  await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      items: cart.map(item => ({
        product: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: total,
      shippingAddress: {
        fullName: `${formData.firstName} ${formData.lastName}`,
        address: formData.address,
        city: formData.city,
        province: formData.province,
        postalCode: formData.postalCode,
        phone: formData.phone,
      },
      paymentMethod: "paystack",
      paymentReference: transaction.reference,
    }),
  });

  toast.success(`Payment successful! Reference: ${transaction.reference}`);
  clearCart();
  window.location.href = `/order-success?ref=${transaction.reference}`;
},
      onCancel: () => {
        toast.error("Payment cancelled");
        setIsProcessing(false);
      },
    });
  };

  // PayPal Success Handler
  const handlePayPalApprove = (data: any, actions: any) => {
    return actions.order.capture().then((details: any) => {
      toast.success(`Payment successful! Thank you ${details.payer.name.given_name}`);
      clearCart();
      window.location.href = "/";
    });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <Link href="/shop" className="text-black hover:underline">Go back to shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-10">
          <Link href="/cart" className="flex items-center gap-2 text-gray-600 hover:text-black">
            <ArrowLeft size={20} />
            Back to Cart
          </Link>
          <h1 className="text-4xl font-bold">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Shipping + Payment */}
          <div className="lg:col-span-7">
            <div className="space-y-10">
              {/* Shipping Form */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Truck className="w-6 h-6" />
                  <h2 className="text-2xl font-semibold">Shipping Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange}
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-black" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange}
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-black" required />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-black" required />
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-black" />
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium mb-2">Street Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange}
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-black" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange}
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-black" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Province</label>
                    <select name="province" value={formData.province} onChange={handleInputChange}
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-black">
                      <option value="ON">Ontario</option>
                      <option value="QC">Quebec</option>
                      <option value="BC">British Columbia</option>
                      <option value="AB">Alberta</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Postal Code</label>
                    <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange}
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-black" />
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                  <CreditCard className="w-6 h-6" />
                  Payment Method
                </h2>

                <div className="flex gap-4 mb-8">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("paystack")}
                    className={`flex-1 py-4 border-2 rounded-2xl font-medium transition-all ${
                      paymentMethod === "paystack" ? "border-black bg-gray-50" : "border-gray-300"
                    }`}
                  >
                    Paystack (Card)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("paypal")}
                    className={`flex-1 py-4 border-2 rounded-2xl font-medium transition-all ${
                      paymentMethod === "paypal" ? "border-black bg-gray-50" : "border-gray-300"
                    }`}
                  >
                    PayPal
                  </button>
                </div>

                {/* Paystack */}
                {paymentMethod === "paystack" && (
                  <button
                    onClick={handlePaystackPayment}
                    disabled={isProcessing}
                    className="w-full bg-black text-white py-5 rounded-2xl font-semibold text-lg hover:bg-gray-900 transition disabled:opacity-70"
                  >
                    {isProcessing ? "Processing..." : `Pay CA$${total.toFixed(2)} with Paystack`}
                  </button>
                )}

                {/* PayPal */}
                {paymentMethod === "paypal" && (
                  <div className="pt-4">
                    <PayPalScriptProvider options={{
                      clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "YOUR_PAYPAL_CLIENT_ID",
                      currency: "CAD",
                    }}>
                      <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={(_:any, actions:any) => {
                          return actions.order.create({
                            intent: "CAPTURE",
                            purchase_units: [{
                              amount: {
                                currency_code: "CAD",
                                value: total.toFixed(2),
                              },
                            }],
                          });
                        }}
                        onApprove={handlePayPalApprove}
                        onError={(err:any) => {
                          toast.error("Payment failed. Please try again.");
                          console.error(err);
                        }}
                      />
                    </PayPalScriptProvider>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-8 sticky top-8 shadow-sm">
              <h3 className="font-semibold text-2xl mb-8">Order Summary</h3>
              
              <div className="space-y-6 max-h-[400px] overflow-auto">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex gap-5">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden">
                      <Image src={item.image || "/placeholder.png"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      {item.selectedSize && <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>}
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">CA${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t mt-8 pt-6 space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>CA${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `CA$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t pt-4">
                  <span>Total</span>
                  <span>CA${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}