// app/admin/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, ShoppingBag, Package, TrendingUp, 
  DollarSign, UserCheck, AlertCircle, Home 
} from "lucide-react";
import { toast } from "react-hot-toast";

interface Stats {
  totalUsers: number;
  totalOrders: number;
  totalProducts: number;
  totalRevenue: number;
}

export default function ManagementDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(!localStorage.getItem("adminLogin")){
      window.location.href="/auth"
    }else{
      fetchDashboardData();
    }
    
  }, []);




  const handleAdminLogout = ()=>{
    localStorage.removeItem("adminLogin")
    window.location.href="/auth"
  }

  const fetchDashboardData = async () => {
    try {
      const [productsRes, ordersRes, usersRes] = await Promise.all([
        fetch("/api/newProduct"),
        fetch("/api/orders"),
        fetch("/api/users")
      ]);

      const products = await productsRes.json();
      const orders = await ordersRes.json();
      const users = await usersRes.json()

      const revenue = orders.reduce((sum: number, order: any) => 
        sum + (order.totalAmount || order.total || 0), 0);

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalUsers: users.length,
        totalRevenue: revenue,
      });

      setRecentOrders(orders.slice(0, 5));
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-black">Management Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, Admin</p>
          </div>
          <div className=" flex gap-5 ">
          <button 
            onClick={fetchDashboardData}
            className="px-6 py-3 bg-black text-white rounded-2xl flex items-center gap-2 hover:bg-gray-800 transition"
          >
            Refresh Data
          </button>

            <button 
            onClick={handleAdminLogout}
            className="px-6 py-3 bg-red-500 text-white rounded-2xl flex items-center gap-2 hover:bg-gray-800 transition"
              >
            Logout
          </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Link href="/admin" className="bg-white p-6 rounded-3xl hover:shadow-md transition group">
            <Package className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="font-semibold text-lg text-black">Products</h3>
            <p className="text-sm text-gray-500">Manage inventory</p>
          </Link>

          <Link href="/admin/orders" className="bg-white p-6 rounded-3xl hover:shadow-md transition group">
            <ShoppingBag className="w-10 h-10 text-green-600 mb-4" />
            <h3 className="font-semibold text-lg text-black">Orders</h3>
            <p className="text-sm text-gray-500">Track & fulfill</p>
          </Link>

          <Link href="/admin/users" className="bg-white p-6 rounded-3xl hover:shadow-md transition group">
            <Users className="w-10 h-10 text-purple-600 mb-4" />
            <h3 className="font-semibold text-lg text-black">Users</h3>
            <p className="text-sm text-gray-500">Customer management</p>
          </Link>

          <Link href="/admin/dashboard" className="bg-black text-white p-6 rounded-3xl hover:shadow-md transition group">
            <TrendingUp className="w-10 h-10 mb-4" />
            <h3 className="font-semibold text-lg text-black">Analytics</h3>
            <p className="text-sm opacity-75">Business insights</p>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold mt-2 text-black">CA${stats.totalRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="w-10 h-10 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Orders</p>
                <p className="text-3xl font-bold mt-2 text-black">{stats.totalOrders}</p>
              </div>
              <ShoppingBag className="w-10 h-10 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Products</p>
                <p className="text-3xl font-bold mt-2 text-black">{stats.totalProducts}</p>
              </div>
              <Package className="w-10 h-10 text-purple-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Users</p>
                <p className="text-3xl font-bold mt-2 text-black">{stats.totalUsers}</p>
              </div>
              <UserCheck className="w-10 h-10 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-3xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Recent Orders</h2>
            <Link href="/admin/orders" className="text-blue-600 hover:underline flex items-center gap-1">
              View All Orders →
            </Link>
          </div>

          <div className="space-y-4">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div key={order._id} className="flex items-center justify-between border-b pb-4 last:border-none">
                  <div>
                    <p className="font-medium">{order.orderNumber}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">CA${order.totalAmount || order.total}</p>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 py-8 text-center">No recent orders found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}