// app/account/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { User, ShoppingBag, Heart, Settings, LogOut, Edit, Package, Save, X } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { Order } from "@/lib/types";

interface UserProfile {
    _id?: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    createdAt?: string;
    avatar: string;
}

// interface Order {
//     _id: string;
//     orderNumber: string;
//     createdAt: string;
//     date: string;
//     status: "Delivered" | "Processing" | "Shipped" | "Cancelled";
//     total: number;
//     items: number;
//     products: Array<{ name: string; quantity: number; price: number }>;
// }

export default function AccountPage() {
    const { cart } = useCart();
    const [activeTab, setActiveTab] = useState<"profile" | "orders" | "wishlist" | "settings">("profile");
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    // const [user, setUser] = useState<UserProfile>({
    //     name: "Emma Thompson",
    //     email: "emma.thompson@email.com",
    //     phone: "+1 (416) 123-4567",
    //     address: "123 Fashion Street, Toronto, ON M5V 2T6",
    //     joinDate: "March 2025",
    //     avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    // });

    // const [editForm, setEditForm] = useState<UserProfile>(user);

    // Initialize with empty strings to avoid undefined
  const [user, setUser] = useState<UserProfile>({
    name: "",
    email: "",
    phone: "",
    address: "",
    
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
  });

  const [editForm, setEditForm] = useState<UserProfile>({
    name: "",
    email: "",
    phone: "",
    address: "",
   
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
  });
    const [orders, setOrders] = useState<Order[]>([]);

    // Fetch user profile and orders
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, ordersRes] = await Promise.all([
                    fetch("/api/user/profile"),
                    fetch("/api/orders")
                ]);

                if (profileRes.ok) {
                    const profileData = await profileRes.json();
                    console.log("Fetched profile data:", profileData);
                    setUser(profileData);
                    setEditForm(profileData);
                }

                if (ordersRes.ok) {
                    const ordersData = await ordersRes.json();
                    setOrders(ordersData);
                }
            } catch (error) {
                toast.error("Failed to load account data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        // This effect runs whenever the cart changes, but currently does nothing.
        // You can add any side effects related to cart updates here if needed.
        console.log("User orders updated:", orders);
        console.log("User profile updated:", user);
    }, []);

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const saveProfile = async () => {
        try {
            const res = await fetch("/api/user/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editForm),
            });

            if (res.ok) {
                const updatedUser = await res.json();
                setUser(updatedUser.user || editForm);
                toast.success("Profile updated successfully!");
                setIsEditing(false);
            } else {
                toast.error("Failed to update profile");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const cancelEdit = () => {
        setEditForm(user);
        setIsEditing(false);
    };

    const handleLogout = () => {
        // Clear user session (this is just a placeholder, implement actual logout logic)
        localStorage.removeItem("user");
        localStorage.setItem("isLoggedIn", "false");
        toast.success("Logged out successfully");
        window.location.href = "/auth";
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-10">
                    {/* Sidebar */}
                    <div className="w-full md:w-80 bg-white rounded-3xl p-6 shadow-sm h-fit">
                        <div className="flex items-center gap-4 mb-10">
                            {/* <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-2xl object-cover" /> */}
                            <User size={48} className="text-gray-400" />

                            <div>
                                <h2 className="font-semibold text-xl">{user.name}</h2>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                        </div>

                        <nav className="space-y-2">
                            {[
                                { label: "Profile", icon: User, tab: "profile" },
                                { label: "My Orders", icon: ShoppingBag, tab: "orders" },
                                // { label: "Wishlist", icon: Heart, tab: "wishlist" },
                                { label: "Settings", icon: Settings, tab: "settings" },
                            ].map((item) => (
                                <button
                                    key={item.tab}
                                    onClick={() => setActiveTab(item.tab as any)}
                                    className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-left transition-all ${activeTab === item.tab ? "bg-black text-white" : "hover:bg-gray-100"
                                        }`}
                                >
                                    <item.icon size={20} />
                                    {item.label}
                                </button>
                            ))}
                        </nav>

                        <button onClick={handleLogout} className="w-full mt-8 flex items-center gap-3 px-5 py-4 text-red-600 hover:bg-red-50 rounded-2xl transition">
                            <LogOut size={20} />
                            Logout
                        </button>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 bg-white rounded-3xl p-8 shadow-sm">
                        {loading ? (
                            <div className="flex items-center justify-center h-96">Loading...</div>
                        ) : activeTab === "profile" ? (
                            <div>
                                <div className="flex justify-between items-center mb-8">
                                    <h1 className="text-3xl font-bold">My Profile</h1>
                                    {!isEditing && (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center gap-2 px-5 py-2 border border-gray-300 rounded-xl hover:bg-gray-50"
                                        >
                                            <Edit size={18} /> Edit Profile
                                        </button>
                                    )}
                                </div>

                                {isEditing ? (
                                    <div className="space-y-6 max-w-lg">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={editForm.name}
                                                onChange={handleEditChange}
                                                className="w-full px-4 py-3 border rounded-2xl"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={editForm.email}
                                                onChange={handleEditChange}
                                                className="w-full px-4 py-3 border rounded-2xl"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={editForm.phone}
                                                onChange={handleEditChange}
                                                className="w-full px-4 py-3 border rounded-2xl"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Address</label>
                                            <textarea
                                                name="address"
                                                value={editForm.address}
                                                onChange={handleEditChange}
                                                rows={3}
                                                className="w-full px-4 py-3 border rounded-2xl"
                                            />
                                        </div>

                                        <div className="flex gap-4 pt-4">
                                            <button
                                                onClick={saveProfile}
                                                className="flex-1 bg-black text-white py-3.5 rounded-2xl font-medium flex items-center justify-center gap-2"
                                            >
                                                <Save size={18} /> Save Changes
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                className="flex-1 border border-gray-300 py-3.5 rounded-2xl font-medium flex items-center justify-center gap-2"
                                            >
                                                <X size={18} /> Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="text-sm text-gray-500">Full Name</label>
                                            <p className="text-lg font-medium mt-1">{user.name}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-500">Email Address</label>
                                            <p className="text-lg font-medium mt-1">{user.email}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-500">Phone Number</label>
                                            <p className="text-lg font-medium mt-1">{user.phone}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-500">Member Since</label>
                                            <p className="text-lg font-medium mt-1">{user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { 
                                                month: 'long', 
                                                year: 'numeric' 
                                            }) : "2026"}</p>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="text-sm text-gray-500">Default Shipping Address</label>
                                            <p className="mt-3 leading-relaxed text-gray-700">{user.address}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : activeTab === "orders" ? (
                            // Orders content (already good from previous version)
                            <div>
                                <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                    <Package size={28} /> My Orders
                                </h1>
                                {/* ... existing orders code ... */}
                                {orders.length > 0 ? (
                                    <div className="space-y-6">
                                        {orders.map((order) => (
                                            <div key={order._id} className="border border-gray-200 rounded-2xl p-6 hover:border-gray-300 transition">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-mono text-sm text-gray-500">{order.orderNumber}</p>
                                                        <p className="text-2xl font-semibold mt-1">CA${order.totalAmount.toFixed(2)}</p>
                                                    </div>
                                                    <span className={`px-5 py-2 rounded-full text-sm font-medium ${order.status === "Delivered" ? "bg-green-100 text-green-700" :
                                                            order.status === "Processing" ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </div>

                                                <p className="text-sm text-gray-500 mt-4">
                                                    {/* Ordered on {order.date} • {order.items}  */}
                                                    Ordered on {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { 
                                                        month: 'short', 
                                                        day: 'numeric', 
                                                        year: 'numeric' 
                                                    }) : "N/A"} 
                                                </p>

                                                <div className="mt-4 text-sm text-gray-600">
                                                    {order.items?.slice(0, 2).map((p: any, i: number) => (
                                                       <p key={i}>{p.name} × {p.quantity}</p>
                                                       )) || <p className="text-gray-400">No product details available</p>}
                                                </div>

                                                <Link href={`/product/${order._id}`} className="text-black hover:underline text-sm mt-4 inline-block">
                                                    View Order Details →
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                ) : (

                                    <div className="text-center py-20 text-gray-500">
                                        <p className="text-center py-20 text-gray-500">You haven't placed any orders yet.</p>
                                        {/* {activeTab === "wishlist" ? "Wishlist coming soon" : "Settings coming soon"} */}
                                    </div>
                                )}
                                </div>
                              
                                ): activeTab === "wishlist" && (
                                    <div className="text-center py-20">
                                        <Heart size={80} className="mx-auto mb-6 text-gray-300" />
                                        <h3 className="text-2xl font-medium">Your Wishlist is Empty</h3>
                                        <p className="text-gray-500 mt-3">Save items you love for later</p>
                                        <Link href="/shop" className="mt-6 inline-block bg-black text-white px-8 py-3 rounded-xl">
                                            Browse Shop
                                        </Link>
                                    </div>
                                )}


                                {activeTab === "settings" && (
                                    <div>
                                        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
                                        <div className="max-w-md space-y-8">
                                            <div>
                                                <h3 className="font-medium mb-4">Email Notifications</h3>
                                                <div className="space-y-4">
                                                    <label className="flex items-center gap-3">
                                                        <input type="checkbox" defaultChecked className="w-5 h-5 accent-black" />
                                                        Order status updates
                                                    </label>
                                                    <label className="flex items-center gap-3">
                                                        <input type="checkbox" defaultChecked className="w-5 h-5 accent-black" />
                                                        New arrivals & seasonal sales
                                                    </label>
                                                    <label className="flex items-center gap-3">
                                                        <input type="checkbox" className="w-5 h-5 accent-black" />
                                                        Promotional offers
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="pt-6 border-t">
                                                <button className="text-red-600 hover:text-red-700 font-medium">
                                                    Delete My Account
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                    </div>
                </div>
            </div>
        
    );
}