import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  increaseQty,
  decreaseQty,
  removeCartItem,
  clearCart,
} from "../features/cartSlice";
import {
  getAddresses,
  setDefaultAddress,
  deleteAddress,
} from "../features/addressSlice";
import axiosInstants from "../axiosInstants";
import toast from "react-hot-toast";
import EmptyCart from "../components/EmptyCart";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const { addresses } = useSelector((state) => state.address);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (user?.userId) {
      dispatch(getAddresses(user.userId));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddr = addresses.find((a) => a.isDefault);
      setSelectedAddress(defaultAddr || addresses[0]);
    }
  }, [addresses]);

  const SHIPPING_FEE = 10;

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const total = subtotal + (items.length > 0 ? SHIPPING_FEE : 0);

  // ✅ HELPER FUNCTION: Convert variant object to readable string
  const getVariantDisplay = (variant) => {
    if (!variant) return null;

    // If it's already a string
    if (typeof variant === "string") return variant;

    // If it's an object, extract details
    const { color, storage, ram } = variant;
    const parts = [];
    if (color) parts.push(color.toUpperCase());
    if (storage) parts.push(storage);
    if (ram) parts.push(ram);

    return parts.length > 0 ? parts.join(" | ") : "Default";
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login", { state: { from: "/cart" } });
      return;
    }

    if (!selectedAddress) {
      toast.error("Please select a shipping address");
      return;
    }

    try {
      const res = await axiosInstants.post("/Orders/createcheckout", {
        cartItems: items,
        userId: user.userId,
        shippingAddress: selectedAddress,
        paymentMethod,
      });

      if (paymentMethod === "Card") {
        window.location.href = res.data.url;
      } else {
        navigate("/payment-success-cash", { replace: true });
        dispatch(clearCart());
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Checkout failed");
    }
  };

  if (!items?.length) return <EmptyCart />;

  return (
    <div className="min-h-screen bg-gray-50 py-6  lg:py-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pt-30">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Shopping Cart
          </h1>
          <div className="text-sm text-gray-500">
            ({items.length} {items.length === 1 ? "item" : "items"})
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left: Cart Items + Address + Payment */}
          <div className="xl:col-span-8 space-y-8">
            {/* Cart Items */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Your Items
              </h2>
              <div className="space-y-5">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.variant?._id || item.variant}`}
                    className="flex gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    {/* Image */}
                    <div className="shrink-0">
                      <img
                        src={item.image || "/placeholder.png"}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg shadow-sm"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">
                        {item.name}
                      </h3>

                      {/* ✅ FIXED VARIANT DISPLAY */}
                      {getVariantDisplay(item.variant) && (
                        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-800 px-3 py-1.5 rounded-full text-xs font-medium mb-3 max-w-xs">
                          <svg
                            className="w-3 h-3 shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {getVariantDisplay(item.variant)}
                        </div>
                      )}

                      <p className="text-indigo-600 font-bold text-base mb-3">
                        AED {item.price.toFixed(2)}
                      </p>

                      {/* Quantity */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            dispatch(
                              decreaseQty({
                                id: item.id,
                                variant: item.variant,
                              }),
                            )
                          }
                          className="w-11 h-11 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-indigo-400 hover:bg-indigo-50 transition-all text-sm font-semibold text-gray-700"
                        >
                          -
                        </button>
                        <span className="w-10 text-center font-bold text-lg text-gray-900 bg-gray-100 px-3 py-2 rounded-lg">
                          {item.qty}
                        </span>
                        <button
                          onClick={() =>
                            dispatch(
                              increaseQty({
                                id: item.id,
                                variant: item.variant,
                              }),
                            )
                          }
                          className="w-11 h-11 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-indigo-400 hover:bg-indigo-50 transition-all text-sm font-semibold text-gray-700"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Price & Remove */}
                    <div className="flex flex-col items-end gap-3 text-right min-w-[120px]">
                      <p className="text-xl font-bold text-gray-900">
                        AED {(item.price * item.qty).toFixed(2)}
                      </p>
                      <button
                        onClick={() =>
                          dispatch(
                            removeCartItem({
                              id: item.id,
                              variant: item.variant,
                            }),
                          )
                        }
                        className="text-sm text-red-500 hover:text-red-600 font-medium px-3 py-1 rounded-lg hover:bg-red-50 transition-all"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart */}
              <div className="pt-8 mt-8 border-t-2 border-gray-200 flex justify-between">
                <button
                  onClick={() => dispatch(clearCart())}
                  className="text-sm text-red-600 hover:text-red-700 font-semibold flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-red-50 transition-all"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Clear Cart
                </button>
                <button
                  className="text-sm text-blue-600 hover:text-blue-700 fontsemibold flex item-center gap-2 px-4 py-2 rounded-xl hover:bg-blue-50 transition-all"
                  onClick={() => {
                    scrollToTop();
                    navigate("/ordersummery");
                  }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7h18M3 7a2 2 0 012-2h14a2 2 0 012 2M3 7v13a2 2 0 002 2h14a2 2 0 002-2V7M16 3v4M8 3v4"
                    />
                  </svg>
                  View Order
                </button>
              </div>
            </div>

            {/* Shipping Address & Payment - SAME AS BEFORE */}
            {user && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Shipping Address
                  </h2>
                  <button
                    onClick={() =>
                      navigate("/add-address", { state: { fromCart: true } })
                    }
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Add Address
                  </button>
                </div>

                {addresses.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                    <p className="text-gray-500 text-lg mb-2">No addresses</p>
                    <button
                      onClick={() => {
                        scrollToTop();
                        navigate("/add-address", { state: { fromCart: true } });
                      }}
                      className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg"
                    >
                      Add your first address
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {addresses.map((addr) => (
                      <div
                        key={addr._id}
                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                          selectedAddress?._id === addr._id
                            ? "border-indigo-500 bg-indigo-50 shadow-lg ring-2 ring-indigo-200"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedAddress(addr)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-lg text-gray-900 truncate">
                              {addr.fullName}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {addr.address}, {addr.city}
                            </p>
                            <p className="text-sm text-gray-600">
                              {addr.country} • {addr.postalCode}
                            </p>
                            <p className="text-sm text-gray-600">
                              {addr.phone}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-1 ml-4">
                            {addr.isDefault && (
                              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-3 pt-3 border-t border-gray-200 text-xs">
                          {!addr.isDefault && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                dispatch(
                                  setDefaultAddress({
                                    userId: user.userId,
                                    addressId: addr._id,
                                  }),
                                );
                              }}
                              className="text-emerald-600 hover:text-emerald-700 font-medium px-3 py-1 rounded-lg hover:bg-emerald-50"
                            >
                              Set Default
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              scrollToTop()
                              navigate(`/edit-address/${addr._id}`);
                            }}
                            className="text-blue-600 hover:text-blue-700 font-medium px-3 py-1 rounded-lg hover:bg-blue-50"
                          >
                            Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(
                                deleteAddress({
                                  userId: user.userId,
                                  addressId: addr._id,
                                }),
                              );
                            }}
                            className="text-red-600 hover:text-red-700 font-medium px-3 py-1 rounded-lg hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Payment Method */}
            {user && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12"
                    />
                  </svg>
                  Payment Method
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-4 p-5 border-2 border-gray-200 rounded-2xl hover:border-indigo-300 cursor-pointer transition-all group hover:shadow-md">
                    <input
                      type="radio"
                      value="COD"
                      checked={paymentMethod === "COD"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-6 h-6 text-indigo-600 border-2 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <div>
                      <p className="font-semibold text-lg text-gray-900">
                        Cash on Delivery
                      </p>
                      <p className="text-sm text-gray-600">
                        Pay when your order arrives
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center gap-4 p-5 border-2 border-gray-200 rounded-2xl hover:border-indigo-300 cursor-pointer transition-all group hover:shadow-md">
                    <input
                      type="radio"
                      value="Card"
                      checked={paymentMethod === "Card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-6 h-6 text-indigo-600 border-2 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <div>
                      <p className="font-semibold text-lg text-gray-900">
                        Credit/Debit Card
                      </p>
                      <p className="text-sm text-gray-600">
                        Pay securely online
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="xl:col-span-4">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Order Summary
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-lg text-gray-700">
                    Subtotal ({items.length} items)
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    AED {subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-lg text-gray-700">Shipping</span>
                  <span className="text-xl font-bold text-emerald-600">
                    AED 10.00
                  </span>
                </div>
                <div className="flex justify-between pt-4 border-t-2 border-gray-200">
                  <span className="text-2xl font-bold text-gray-900">
                    Total
                  </span>
                  <span className="text-3xl font-bold text-indigo-600">
                    AED {total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={!user || !selectedAddress}
                className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-5 rounded-2xl text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-200 disabled:cursor-not-allowed disabled:transform-none"
              >
                {user && selectedAddress
                  ? "Proceed to Checkout"
                  : "Complete Setup"}
              </button>

              {!user && (
                <p className="text-center text-md text-gray-500 mt-6">
                  Please{" "}
                  <button
                    onClick={() => {
                      scrollToTop();
                      navigate("/login");
                    }}
                    className="text-indigo-600 hover:text-indigo-700 font-semibold underline"
                  >
                    sign in
                  </button>{" "}
                  to checkout
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
