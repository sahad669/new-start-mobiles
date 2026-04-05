
import React, { useEffect, useState } from "react";
import axiosInstants from "../axiosInstants";
import toast from "react-hot-toast";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axiosInstants.get("/Orders/all");
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch orders!");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleDelete = async (orderId) => {
    // if (!window.confirm("Are you sure you want to delete this order?")) return;
    
    try {
      await axiosInstants.delete(`/Orders/${orderId}`);
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
      toast.success("Order deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete order!");
    }
  };

  // Status colors
  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-emerald-100 text-emerald-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  // Payment status colors
  const getPaymentColor = (status) => {
    const colors = {
      pending: "bg-orange-100 text-orange-800",
      paid: "bg-emerald-100 text-emerald-800",
      failed: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            All Orders ({orders.length})
          </h1>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-2xl font-semibold text-gray-500 mb-2">No orders yet</p>
            <p className="text-gray-400">Orders will appear here when customers place them.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300"
              >
                {/* Header */}
                <div className="bg-linear-to-r from-indigo-500 to-purple-600 px-6 py-4 text-white">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="font-bold text-xl">
                        #{order.orderNumber || order._id.slice(-6)}
                      </div>
                      <div className="text-sm bg-white/20 px-3 py-1 rounded-full">
                        {new Date(order.createdAt).toLocaleDateString()} •{" "}
                        {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentColor(order.paymentStatus)} bg-opacity-20`}>
                        {order.paymentMethod} - {order.paymentStatus}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.orderStatus)} bg-opacity-20`}>
                        {order.orderStatus}
                      </span>
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="p-8 lg:grid lg:grid-cols-3 gap-8">
                  {/* Left Column: Address & Items */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Shipping Address */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                      <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                        📍 Shipping Address
                      </h3>
                      <div className="space-y-2 text-gray-700">
                        <p className="font-semibold text-lg">{order.shippingAddress.fullName}</p>
                        <p>{order.shippingAddress.address}</p>
                        <p>
                          {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                        </p>
                        <p>{order.shippingAddress.country}</p>
                        <p className="font-mono text-sm">📞 {order.shippingAddress.phone}</p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-100">
                      <h3 className="font-bold text-lg text-gray-900 mb-6 flex items-center gap-2">
                        🛍️ Order Items ({order.items.length})
                      </h3>
                      <div className="space-y-4">
                        {order.items.map((item, index) => (
                          <div
                            key={`${item.product}-${index}`}
                            className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                          >
                            {/* Product Image */}
                            <div className="shrink-0">
                              <img
                                src={item.image || "/placeholder.png"}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-xl shadow-md"
                              />
                            </div>

                            {/* Product Details */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-gray-900 text-base mb-1 leading-tight">
                                {item.name}
                              </h4>
                              
                              {/* ✅ VARIANT DISPLAY - Matches Cart exactly */}
                              {item.variant && (
                                <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-800 px-3 py-1.5 rounded-full text-xs font-medium mb-3 max-w-xs">
                                  <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  {item.variant}
                                </div>
                              )}
                              
                              <p className="text-indigo-600 font-bold text-lg mb-2">
                                AED {item.price.toFixed(2)}
                              </p>
                              <p className="text-sm text-gray-600">
                                Qty: {item.quantity}
                              </p>
                            </div>

                            {/* Item Total */}
                            <div className="text-right min-w-[100px]">
                              <p className="text-2xl font-bold text-gray-900">
                                AED {(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Summary ✅ UPDATED WITH USER EMAIL */}
                  <div className="space-y-6">
                    {/* User Info Card */}
                    <div className="bg-linear-to-r from-emerald-50 to-blue-50 rounded-2xl p-6 border border-emerald-100">
                      <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
                        👤 Customer Email Address
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border">
                          
                          <div>
                            
                            {/* ✅ USER EMAIL DISPLAY */}
                            {order.user?.email && (
                              <p className="text-sm text-gray-600 font-mono bg-gray-50 px-2 py-1 rounded">
                                {order.user.email}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-linear-to-b from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100 sticky top-6">
                      <h3 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-3">
                        💰 Order Summary
                      </h3>
                      <div className="space-y-3 text-lg">
                        <div className="flex justify-between py-2">
                          <span className="text-gray-700">Subtotal</span>
                          <span className="font-bold">AED {order.subtotal?.toFixed(2) || "0.00"}</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-gray-700">Shipping</span>
                          <span className="font-bold text-emerald-600">AED {order.shippingFee?.toFixed(2) || "10.00"}</span>
                        </div>
                        <div className="h-px bg-gray-200 my-2"></div>
                        <div className="flex justify-between text-2xl font-bold text-gray-900 py-2">
                          <span>Total</span>
                          <span className="text-indigo-600">AED {order.totalPrice?.toFixed(2) || "0.00"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    {order.trackingNumber && (
                      <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                        <p className="font-semibold text-emerald-800 mb-1">Tracking:</p>
                        <p className="font-mono text-sm bg-white px-3 py-1 rounded-lg">{order.trackingNumber}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
