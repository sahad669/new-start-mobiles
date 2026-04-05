import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../features/productSlice";
import { getAllBrand } from "../features/brandSlice";
import { getAllCategory } from "../features/categorySlice";
import { useEffect,useState } from "react";
import axiosInstants from "../axiosInstants"

const AdminDashboard = () => {
  const { products } = useSelector((state) => state.product);
  const { brands } = useSelector((state) => state.brand);
  const { categories } = useSelector((state) => state.category);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstants.get("/Orders/all");
        setOrders(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllBrand());
    dispatch(getAllCategory());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50 px-4 sm:px-6 lg:px-8 py-10">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto text-center mt-30 mb-15">
        <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-md border ">
          <span className="text-3xl">⚙️</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
        </div>

        <p className="mt-4 text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
          Manage your store effortlessly. Access categories, brands, products,
          and orders.
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {/* CATEGORY */}
        <div
          onClick={() => navigate("/category")}
          className="cursor-pointer bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center text-center hover:shadow-xl hover:scale-105 transition duration-300"
        >
          <div className="text-4xl mb-3">🗂️</div>
          <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
          <p className="text-sm text-gray-500 mt-1">Add & manage categories</p>
          <p className="mt-3 flex items-center gap-2 text-sm text-gray-600">
            <span>Showing</span>

            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm shadow-sm">
              {categories?.length || 0}
            </span>

            <span>Categories</span>
          </p>
        </div>

        {/* BRAND */}
        <div
          onClick={() => navigate("/brand")}
          className="cursor-pointer bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center text-center hover:shadow-xl hover:scale-105 transition duration-300"
        >
          <div className="text-4xl mb-3">🏷️</div>
          <h2 className="text-lg font-semibold text-gray-800">Brands</h2>
          <p className="text-sm text-gray-500 mt-1">Manage product brands</p>
          <p className="mt-3 flex items-center gap-2 text-sm text-gray-600">
            <span>Showing</span>

            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm shadow-sm">
              {brands?.length || 0}
            </span>

            <span>Brands</span>
          </p>
        </div>

        {/* PRODUCTS */}
        <div
          onClick={() => navigate("/adminproducts")}
          className="cursor-pointer bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center text-center hover:shadow-xl hover:scale-105 transition duration-300"
        >
          <div className="text-4xl mb-3">📦</div>

          <h2 className="text-lg font-semibold text-gray-800">Products</h2>

          <p className="text-sm text-gray-500 mt-1">Add & edit products</p>

          {/* Styled Count */}
          <p className="mt-3 flex items-center gap-2 text-sm text-gray-600">
            <span>Showing</span>

            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm shadow-sm">
              {products?.length || 0}
            </span>

            <span>Products</span>
          </p>
        </div>

        {/* ORDERS */}
        <div
          onClick={() => navigate("/getorders")}
          className="cursor-pointer bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center text-center hover:shadow-xl hover:scale-105 transition duration-300"
        >
          <div className="text-4xl mb-3">🧾</div>

          <h2 className="text-lg font-semibold text-gray-800">Orders</h2>

          <p className="text-sm text-gray-500 mt-1">Track customer orders</p>

          {/* ✅ Order Count */}
          <p className="mt-3 flex items-center gap-2 text-sm text-gray-600">
            <span>Showing</span>

            <span className="px-3 py-1 rounded-full bg-indigo-100 text-red-600 font-semibold shadow-sm">
              {orders?.length || 0}
            </span>

            <span>orders</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
