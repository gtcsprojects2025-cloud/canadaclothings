// app/admin/orders/page.tsx
"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Package,  Eye, X, ChevronLeft, ChevronRight } from "lucide-react";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  orderNumber: string;
  createdAt?: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  totalAmount?: number;
  total?: number;
  shippingAddress?: {
    fullName: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
    phone: string;
  };
  paymentMethod?: string;
  paymentReference?: string;
  items?: OrderItem[];
}

export default function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    if(!localStorage.getItem("adminLogin")){
      window.location.href="/auth"
    }else{
      fetchOrders();
    }
    
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingAddress?.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const updateOrderStatus = async (newStatus: string) => {
    if (!selectedOrder) return;
    setUpdatingStatus(true);

    try {
      const res = await fetch(`/api/orders/${selectedOrder._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        toast.success(`Order status updated to ${newStatus}`);
        fetchOrders();
        setSelectedOrder({ ...selectedOrder, status: newStatus as any });
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const openOrderDetails = (order: Order) => setSelectedOrder(order);
  const closeModal = () => setSelectedOrder(null);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <Package size={36} /> Orders Management
          </h1>
          <button onClick={fetchOrders} className="px-6 py-3 bg-black text-white rounded-2xl">
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-3xl shadow-sm mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by order number or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-2xl"
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-64 px-5 py-3 border border-gray-300 rounded-2xl"
            >
              <option value="all">All Status</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders Table - Improved Styling */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-8 py-5 text-left font-medium">Order ID</th>
                <th className="px-8 py-5 text-left font-medium">Customer</th>
                <th className="px-8 py-5 text-left font-medium">Date</th>
                <th className="px-8 py-5 text-left font-medium">Amount</th>
                <th className="px-8 py-5 text-left font-medium">Status</th>
                <th className="px-8 py-5 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedOrders.map((order, index) => (
                <tr 
                  key={order._id} 
                  className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                >
                  <td className="px-8 py-5 font-mono text-sm">{order.orderNumber}</td>
                  <td className="px-8 py-5">{order.shippingAddress?.fullName || "N/A"}</td>
                  <td className="px-8 py-5 text-sm text-gray-600">
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="px-8 py-5 font-semibold">
                    CA${order.totalAmount || order.total || 0}
                  </td>
                  <td className="px-8 py-5">
                    <span className={`inline-block px-4 py-1.5 text-xs font-medium rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <button 
                      onClick={() => openOrderDetails(order)}
                      className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 transition"
                    >
                      <Eye size={18} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-3 border rounded-xl disabled:opacity-50 hover:bg-gray-100"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm px-4">
              Page <span className="font-semibold">{currentPage}</span> of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-3 border rounded-xl disabled:opacity-50 hover:bg-gray-100"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Order Detail Modal - Same as before */}
      {/* ... (keep your existing modal code) */}
            {selectedOrder && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Order Details</h2>
                  <p className="text-gray-500">{selectedOrder.orderNumber}</p>
                </div>
                <button onClick={closeModal} className="text-gray-400 hover:text-black">
                  <X size={28} />
                </button>
              </div>

              {/* Status Update */}
              <div className="mb-8">
                <p className="text-sm text-gray-500 mb-2">Update Status</p>
                <div className="flex gap-3">
                  {["Processing", "Shipped", "Delivered", "Cancelled"].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateOrderStatus(status)}
                      disabled={updatingStatus || selectedOrder.status === status}
                      className={`px-5 py-2 rounded-xl text-sm font-medium transition ${
                        selectedOrder.status === status 
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
                          : "bg-black text-white hover:bg-gray-800"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rest of order details... */}
              {selectedOrder.shippingAddress && (
                <div className="mb-8">
                  <h3 className="font-semibold mb-3">Shipping Address</h3>
                  <div className="bg-gray-50 p-5 rounded-2xl">
                    <p className="font-medium">{selectedOrder.shippingAddress.fullName}</p>
                    <p>{selectedOrder.shippingAddress.address}</p>
                    <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.province} {selectedOrder.shippingAddress.postalCode}</p>
                    <p>{selectedOrder.shippingAddress.phone}</p>
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-semibold mb-3">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items?.map((item, index) => (
                    <div key={index} className="flex justify-between border-b pb-3">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">CA${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t text-xl font-semibold mt-6">
                <span>Total</span>
                <span>CA${selectedOrder.totalAmount || selectedOrder.total}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}