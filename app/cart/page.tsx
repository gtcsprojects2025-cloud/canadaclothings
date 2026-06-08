// app/cart/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string, name: string) => {
    removeFromCart(id);
    toast.success(`${name} removed from cart`);
  };

  const handleProceedToCheckout = () => {
    // This is where you would integrate with your payment gateway
    if(localStorage.getItem("isLoggedIn") !== "true") {
      toast.error("Please log in to proceed to checkout");
      return;
    }
    toast.success("Proceeding to checkout...");
    redirect("/checkout");
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 150 ? 0 : 12.99;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-8">
            <ShoppingBag size={48} className="text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold mb-3">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven&apos;t added any items yet. Start shopping to fill your cart!
          </p>
          <Link
            href="/shop"
            className="inline-block bg-black text-white px-10 py-4 rounded-xl font-medium hover:bg-gray-900 transition"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold">Your Cart</h1>
            <p className="text-gray-600 mt-1">{cart.length} items</p>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-2 text-gray-600 hover:text-black transition"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="border-b px-8 py-5 bg-gray-50">
                <div className="grid grid-cols-12 text-sm font-medium text-gray-500">
                  <div className="col-span-7">Product</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Price</div>
                  <div className="col-span-1"></div>
                </div>
              </div>

              {cart.map((item, idx) => (
                <div
                  key={`${idx}-${item.selectedSize}`}
                  className="grid grid-cols-12 gap-4 px-8 py-8 border-b last:border-none items-center"
                >
                  {/* Product Info */}
                  <div className="col-span-7 flex gap-5">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image||"/placeholder.png"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg leading-tight">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1 capitalize">
                        {item.gender} • {item.category}
                      </p>
                      {item.selectedSize && (
                        <p className="text-sm text-gray-500 mt-1">Size: {item.selectedSize}</p>
                      )}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-2 flex justify-center">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                        className="px-3 py-2 hover:bg-gray-100 transition"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                        className="px-3 py-2 hover:bg-gray-100 transition"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 text-right font-semibold">
                    CA${(item.price * item.quantity).toFixed(2)}
                  </div>

                  {/* Remove */}
                  <div className="col-span-1 flex justify-end">
                    <button
                      onClick={() => handleRemoveItem(item._id, item.name)}
                      className="text-gray-400 hover:text-red-500 transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={clearCart}
              className="mt-6 text-red-500 hover:text-red-600 text-sm font-medium flex items-center gap-2"
            >
              Clear All Items
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 sticky top-8 shadow-sm">
              <h3 className="font-semibold text-xl mb-6">Order Summary</h3>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">CA${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "FREE" : `CA$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="border-t pt-4 flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>CA${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-8">
            <button
              onClick={handleProceedToCheckout}
               className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-900 transition text-lg flex items-center justify-center active:scale-[0.98]"
            >
                Proceed to Checkout
              </button>
              </div>

              <p className="text-center text-xs text-gray-500 mt-6">
                Taxes calculated at checkout • Free shipping on orders over CA$150
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}