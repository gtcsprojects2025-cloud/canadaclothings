// app/auth/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };


  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!formData.email || !formData.password) {
  //     toast.error("Please fill all required fields");
  //     return;
  //   }

  //   if (!isLogin && !formData.name) {
  //     toast.error("Please enter your full name");
  //     return;
  //   }

  //   // Simulate API call
  //   // setTimeout(() => {
  //   //   toast.success(isLogin 
  //   //     ? "Login successful! Welcome back." 
  //   //     : "Account created successfully!"
  //   //   );
      
  //   //   // Redirect to account page after successful auth
  //   //   router.push("/account");
  //   // }, 800);

  //   if(isLogin) {
  //     // Simulate login API call
  //     // In real app, replace with actual API request and handle response accordingly 
  //   if(formData.email === "admin@example.com" && formData.password === "admin123") {
  //     toast.success("Login successful! Welcome back.");
  //     localStorage.setItem("user", JSON.stringify({ name: formData.name, email: formData.email }));
  //     localStorage.setItem("isLoggedIn", "true");
  //     window.location.href = "/account";
  //     // router.push("/account");
  //   } else {
  //     toast.error("Invalid email or password.");
  //   }
  // }else {
  //   // Simulate registration API call
  //   // In real app, replace with actual API request and handle response accordingly 
  //   toast.success("Account created successfully!");
  //   localStorage.setItem("user", JSON.stringify({ name: formData.name, email: formData.email }));
  //   localStorage.setItem("isLoggedIn", "true");
  //   window.location.href = "/account";
  //   // router.push("/account");
  // };
  // }

  // In handleSubmit function:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const res = await fetch("/api/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: isLogin ? "login" : "register",
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }),
  });

  const data = await res.json();

  if (res.ok) {
    toast.success(isLogin ? "Login successful!" : "Account created successfully!");
      localStorage.setItem("user", JSON.stringify({ name: formData.name, email: formData.email }));
      localStorage.setItem("isLoggedIn", "true");
    window.location.href = "/account";
  } else {
    toast.error(data.error || "Authentication failed");
  }
};
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">CanadaClothings</h1>
          <p className="text-gray-600 mt-2">
            {isLogin ? "Sign in to your account" : "Create a new account"}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-8">
          {/* Toggle Tabs */}
          <div className="flex border-b mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 pb-4 text-center font-medium transition-all ${
                isLogin 
                  ? "border-b-2 border-black text-black" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 pb-4 text-center font-medium transition-all ${
                !isLogin 
                  ? "border-b-2 border-black text-black" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-black"
                    placeholder="Emma Thompson"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-black"
                  placeholder="hello@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-black"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <Link href="#" className="text-sm text-black hover:underline">
                  Forgot Password?
                </Link>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-2xl font-semibold text-lg hover:bg-gray-900 transition active:scale-95 mt-4"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-black font-medium hover:underline"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-gray-500 mt-8">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}