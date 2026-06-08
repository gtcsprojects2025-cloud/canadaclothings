// app/admin/users/page.tsx
"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Users,  Eye, X, User } from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: "user" | "admin";
  createdAt: string;
  avatar?: string;
}

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openUserDetails = (user: User) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <Users size={36} /> Users Management
          </h1>
          <button onClick={fetchUsers} className="px-6 py-3 bg-black text-white rounded-2xl">
            Refresh
          </button>
        </div>

        {/* Search */}
        <div className="bg-white p-6 rounded-3xl shadow-sm mb-8">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-2xl"
          />
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-8 py-5 text-left font-medium">User</th>
                <th className="px-8 py-5 text-left font-medium">Email</th>
                <th className="px-8 py-5 text-left font-medium">Role</th>
                <th className="px-8 py-5 text-left font-medium">Joined</th>
                <th className="px-8 py-5 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user, index) => (
                <tr 
                  key={user._id} 
                  className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/70'}`}
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      {/* <img 
                        src={user.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330"} 
                        alt={user.name}
                        className="w-9 h-9 rounded-full object-cover"
                      /> */}
                      <User size={18} className="text-gray-400 w-6 h-6 rounded-full object-cover" />
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-gray-600">{user.email}</td>
                  <td className="px-8 py-5">
                    <span className={`px-4 py-1 rounded-full text-sm ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-5 text-center">
                    <button 
                      onClick={() => openUserDetails(user)}
                      className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700"
                    >
                      <Eye size={18} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">User Details</h2>
                  <p className="text-gray-500">{selectedUser.email}</p>
                </div>
                <button onClick={closeModal} className="text-gray-400 hover:text-black">
                  <X size={28} />
                </button>
              </div>

              <div className="flex justify-center mb-8">
                {/* <img 
                  src={selectedUser.avatar} 
                  alt={selectedUser.name}
                  className="w-28 h-28 rounded-2xl object-cover border-4 border-white shadow"
                /> */}
                <User size={96} className="text-gray-400 w-28 h-28 rounded-2xl object-cover border-4 border-white shadow" /> {/* Placeholder if no avatar */}
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm text-gray-500">Full Name</label>
                  <p className="text-xl font-medium">{selectedUser.name}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Email Address</label>
                  <p className="text-lg">{selectedUser.email}</p>
                </div>

                {selectedUser.phone && (
                  <div>
                    <label className="text-sm text-gray-500">Phone Number</label>
                    <p className="text-lg">{selectedUser.phone}</p>
                  </div>
                )}

                {selectedUser.address && (
                  <div>
                    <label className="text-sm text-gray-500">Address</label>
                    <p className="text-lg">{selectedUser.address}</p>
                  </div>
                )}

                <div>
                  <label className="text-sm text-gray-500">Role</label>
                  <p className="text-lg capitalize">{selectedUser.role}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Member Since</label>
                  <p className="text-lg">
                    {new Date(selectedUser.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}