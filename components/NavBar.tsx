'use client';

import Link from 'next/link';
import { ShoppingCart, User, Search, Menu, Circle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cart } = useCart();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);


  const handleRouteChange = () => {
    if(localStorage.getItem("isLoggedIn") === "true") {
      // User is logged in, allow access to account page
      redirect("/account");
    } else {
      // User is not logged in, redirect to auth page
      redirect("/auth");
      
    }
  };
  useEffect(() => {
    if(localStorage.getItem("isLoggedIn") === "true") {
      // User is logged in, allow access to account page
      setIsLoggedIn(true);
    } else {
      // User is not logged in, redirect to auth page
      setIsLoggedIn(false);
      
    }
  }, [isLoggedIn]);

  const handleCartClick = () => {
    // if(localStorage.getItem("isLoggedIn") === "true") {
    //   // User is logged in, allow access to cart page
    //   redirect("/cart");
    // } else {
    //   // User is not logged in, redirect to auth page
    //   redirect("/auth");
    // }
    redirect("/cart");
  };

  return (
    <nav className="border-b bg-white dark:bg-zinc-950 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-3xl font-bold tracking-tighter">CANADA<span className="text-rose-600">CLOTHINGS</span></Link>
            
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <Link href="/shop" className="hover:text-rose-600 transition-colors">SHOP</Link>
              <Link href="/female" className="hover:text-rose-600 transition-colors">FEMALE</Link>
              <Link href="/male" className="hover:text-rose-600 transition-colors">MALE</Link>
              {/* <Link href="/sale" className="hover:text-rose-600 transition-colors text-rose-600">SALE</Link> */}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block w-72">
              <input 
                type="text" 
                placeholder="Search clothing..." 
                className="w-full bg-zinc-100 dark:bg-zinc-800 pl-10 py-2.5 rounded-full text-sm focus:outline-hidden focus:ring-1 focus:ring-rose-500"
              />
              <Search className="absolute left-4 top-3.5 w-4 h-4 text-zinc-400" />
            </div>

            <button onClick={handleRouteChange} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
              <User className="w-5 h-5" />
            </button>
            
            <button onClick={handleCartClick} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-medium w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <div>
               {isLoggedIn?(
              <svg width="24" height="24" viewBox="0 0 24 24">
                <defs>
                  <radialGradient id="circleGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#00c853" />
                    <stop offset="100%" stopColor="#cfd5d2" />
                  </radialGradient>
                </defs>
                <circle cx="12" cy="12" r="10" fill="url(#circleGradient)" />
              </svg>
            ):(
            <svg width="24" height="24" viewBox="0 0 24 24">
              <defs>
                <radialGradient id="circleGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#e42e12" />
                  <stop offset="100%" stopColor="#cfd5d2" />
                </radialGradient>
              </defs>
              <circle cx="12" cy="12" r="10" fill="url(#circleGradient)" />
            </svg>
            )}
            </div>
           

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white dark:bg-zinc-950">
          <div className="px-6 py-8 flex flex-col gap-6 text-lg">
            <Link href="/shop" className="hover:text-rose-600">Shop All</Link>
            <Link href="/female" className="hover:text-rose-600">Women</Link>
            <Link href="/male" className="hover:text-rose-600">Men</Link>
          </div>
        </div>
      )}
    </nav>
  );
}