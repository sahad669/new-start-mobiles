
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstants from "../axiosInstants";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const OrderSummary = () => {
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axiosInstants.get(`/Orders/user/${user.userId}`);
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  // Status colors
  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      processing: "bg-blue-100 text-blue-800 border-blue-200",
      shipped: "bg-purple-100 text-purple-800 border-purple-200",
      delivered: "bg-emerald-100 text-emerald-800 border-emerald-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
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
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-indigo-50 py-6 sm:py-12 ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12 text-center pt-23 ">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-linear-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent mb-2">
            Your Orders
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
            Track your recent orders and delivery status
          </p>
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="text-center py-20 px-4">
            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-8 bg-linear-to-r from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              No orders yet
            </h2>
            <p className="text-lg text-gray-500 mb-8 max-w-md mx-auto">
              Your shopping journey starts when you add items to cart.
            </p>
            <button
              onClick={() => navigate("/product")}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-2xl font-semibold text-lg shadow-lg hover:bg-indigo-700 transition-all duration-200 hover:shadow-xl"
            >
              Start Shopping
            </button>
          </div>
        )}

        {/* Orders List */}
        <div className="space-y-4 sm:space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Order Header */}
              <div className="bg-linear-to-r from-indigo-500/10 to-purple-500/10 border-b border-indigo-100/50 px-6 py-5 sm:py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-start sm:items-center">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide font-medium">
                      Order Number
                    </p>
                    <p className="font-bold text-lg sm:text-xl text-gray-900 truncate">
                      #{order.orderNumber || order._id.slice(-8)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide font-medium">
                      Date
                    </p>
                    <p className="font-semibold text-sm sm:text-base text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide font-medium">
                      Status
                    </p>
                    <span className={`inline-flex px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-full border ${getStatusColor(order.orderStatus)}`}>
                      {order.orderStatus.toUpperCase()}
                    </span>
                  </div>

                  <div className="text-right sm:text-left">
                    <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide font-medium">
                      Payment
                    </p>
                    <span className={`inline-block px-2 py-1 text-xs sm:text-sm font-semibold rounded-full ${getPaymentColor(order.paymentStatus)}`}>
                      {order.paymentMethod}
                    </span>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="p-6 sm:p-8 divide-y divide-gray-100">
                {order.items.map((item, index) => (
                  <div
                    key={`${item.product}-${index}`}
                    className="py-4 sm:py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6"
                  >
                    <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                      <div className="shrink-0">
                        <img
                          src={item.image || "/placeholder.png"}
                          alt={item.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-2xl shadow-md bg-linear-to-br from-gray-50 to-gray-100"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-gray-900 text-sm sm:text-base leading-tight mb-1 truncate">
                          {item.name}
                        </h4>
                        
                        {/* Variant Badge */}
                        {item.variant && (
                          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-800 px-3 py-1.5 rounded-full text-xs font-medium mb-2 max-w-xs">
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
                        
                        <p className="text-indigo-600 font-bold text-sm sm:text-base">
                          AED {item.price.toFixed(2)}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="text-right sm:text-left">
                      <p className="text-xl sm:text-2xl font-bold text-gray-900">
                        AED {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="bg-linear-to-r from-indigo-50 to-purple-50 px-6 py-5 sm:py-6 border-t border-indigo-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6">
                <div className="space-y-1 text-sm text-gray-600">
                  {order.trackingNumber && (
                    <p className="flex items-center gap-2 font-medium">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                      Tracking: <span className="font-mono">{order.trackingNumber}</span>
                    </p>
                  )}
                  
                  {order.shippedAt && (
                    <p>Shipped: {new Date(order.shippedAt).toLocaleDateString()}</p>
                  )}
                  
                  {order.deliveredAt && (
                    <p className="font-semibold text-emerald-700">
                      Delivered: {new Date(order.deliveredAt).toLocaleDateString()}
                    </p>
                  )}
                </div>

                <div className="text-right sm:text-left">
                  <p className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    AED {order.totalPrice?.toFixed(2) || "0.00"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
