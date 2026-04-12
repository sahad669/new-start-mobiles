import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  getAllProducts,
  editProduct,
  deleteProduct,
  getFilteredProducts,
} from "../features/productSlice";
import { getAllBrand } from "../features/brandSlice";
import { getAllCategory } from "../features/categorySlice";
import toast from "react-hot-toast";

const ProductsAdmin = () => {
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.product);
  const { brands } = useSelector((state) => state.brand);
  const { categories } = useSelector((state) => state.category);
  const [searchName, setSearchName] = useState("");
  const [filterBrand, setFilterBrand] = useState("");

  const initialVariant = {
    color: "",
    storage: "",
    ram: "",
    price: 0,
    stock: 0,
  };

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    condition: "new",
    description: "",
    specifications: {
      screen: "",
      processor: "",
      camera: "",
      battery: "",
      os: "",
    },
    variants: [initialVariant],
    images: [],
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllBrand());
    dispatch(getAllCategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getFilteredProducts({
        name: searchName,
        brand: filterBrand,
      }),
    );
  }, [searchName, filterBrand, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSpecChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      specifications: { ...formData.specifications, [name]: value },
    });
  };

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const newVariants = [...formData.variants];
    newVariants[index][name] = value;
    setFormData({ ...formData, variants: newVariants });
  };

  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [...formData.variants, { ...initialVariant }],
    });
  };

  const removeVariant = (index) => {
    const newVariants = formData.variants.filter((_, i) => i !== index);
    setFormData({ ...formData, variants: newVariants });
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    setFormData({ ...formData, images: e.target.files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("brand", formData.brand);
    data.append("category", formData.category);
    data.append("condition", formData.condition);
    data.append("description", formData.description);
    data.append("specifications", JSON.stringify(formData.specifications));
    data.append("variants", JSON.stringify(formData.variants));

    for (let i = 0; i < formData.images.length; i++) {
      data.append("images", formData.images[i]);
    }

    if (editId) {
      dispatch(editProduct({ id: editId, data }));
    } else {
      dispatch(addProduct(data));
    }

    handleCancel();
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setFormData({
      name: product.name,
      brand: product.brand?._id || product.brand,
      category: product.category?._id || product.category,
      condition: product.condition,
      description: product.description,
      specifications: product.specifications,
      variants: product.variants,
      images: [],
    });
  };

  const handleCancel = () => {
    setEditId(null);
    setFormData({
      name: "",
      brand: "",
      category: "",
      condition: "new",
      description: "",
      specifications: {
        screen: "",
        processor: "",
        camera: "",
        battery: "",
        os: "",
      },
      variants: [initialVariant],
      images: [],
    });
  };

  const isFiltering = searchName !== "" || filterBrand !== "";

  return (
    <div className="min-h-screen bg-linear-to-brr from-slate-50 via-white to-indigo-50 py-5 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mt-20 mb-8">
        <div className="backdrop-blur-sm p-8 text-center">
          <svg
            className="w-8 h-8 text-indigo-600 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>

          <h1 className="text-4xl font-bold mb-4">
            {editId ? "Edit Product" : "Add Product"}
          </h1>

          <p className="text-lg text-slate-600">
            Complete product management with variants, specifications, and
            images
          </p>
          
        </div>
      </div>

      {/* FORM */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl border border-slate-200/50 p-4 lg:p-12">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                placeholder="product name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border-2 border-slate-200 rounded-2xl bg-slate-50 text-md placeholder-slate-400 focus:ring-4 focus:ring-blue-500 focus:border-blue-500 focus:bg-white focus:outline-none transition-all shadow-sm hover:shadow-md"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Brand *
              </label>
              <select
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                
                className="w-full px-5 py-3 border-2 border-slate-200 rounded-2xl bg-slate-50 text-md focus:ring-4 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white focus:outline-none transition-all shadow-sm hover:shadow-md"
              >
                <option value="">Select Brand</option>
                {brands?.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border-2 border-slate-200 rounded-2xl bg-slate-50 text-md focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white focus:outline-none transition-all shadow-sm hover:shadow-md"
              >
                <option value="">Select Category</option>
                {categories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.categoryName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Condition
              </label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full px-5 py-3 border-2 border-slate-200 rounded-2xl bg-slate-50 text-md focus:ring-4 focus:ring-orange-500 focus:border-orange-500 focus:bg-white focus:outline-none transition-all shadow-sm hover:shadow-md"
              >
                <option value="new">New</option>
                <option value="used">Used</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Enter detailed product description..."
                value={formData.description}
                onChange={handleChange}
                className="w-full px-5 py-3 border-2 border-slate-200 rounded-2xl bg-slate-50 text-md placeholder-slate-400 resize-vertical focus:ring-4 focus:ring-purple-500 focus:border-purple-500 focus:bg-white focus:outline-none transition-all shadow-sm hover:shadow-md min-h-[120px]"
              />
            </div>

            <div className="md:col-span-2">
              <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <svg
                  className="w-8 h-8 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                Specifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.keys(formData.specifications).map((key) => (
                  <div key={key} className="group">
                    <label className="block text-xs font-semibold text-slate-700 mb-2 capitalize">
                      {key}
                    </label>
                    <input
                      type="text"
                      name={key}
                      placeholder={`Enter ${key} details...`}
                      value={formData.specifications[key]}
                      onChange={handleSpecChange}
                      className="w-full px-5 py-3 border-2 border-slate-200 rounded-2xl bg-slate-50 text-md placeholder-slate-400 focus:ring-4 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white focus:outline-none transition-all shadow-sm hover:shadow-md"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-3">
                <svg
                  className="w-8 h-8 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Variants
              </h2>
              {formData.variants.map((variant, index) => (
                <div
                  key={index}
                  className="border-2 border-slate-200 p-8 rounded-3xl bg-linear-to-br from-slate-50 to-indigo-50 hover:shadow-xl transition-all mb-6 group"
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                    {Object.keys(variant).map((key) => (
                      <div key={key} className="group relative">
                        <label className="block text-xs font-semibold text-slate-700 mb-2 capitalize">
                          {key}
                        </label>
                        <input
                          type={
                            key === "price" || key === "stock"
                              ? "number"
                              : "text"
                          }
                          name={key}
                          placeholder={key}
                          value={variant[key]}
                          onChange={(e) => handleVariantChange(index, e)}
                          className="w-full px-5 py-3 border-2 border-slate-200 rounded-2xl bg-white text-md placeholder-slate-400 focus:ring-4 focus:ring-purple-500 focus:border-purple-500 focus:bg-white focus:outline-none transition-all shadow-sm hover:shadow-md"
                        />
                      </div>
                    ))}
                  </div>

                  {formData.variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariant(index)}
                      className="inline-flex items-center gap-2 bg-linear-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all text-sm"
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
                      Remove Variant
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addVariant}
                className="w-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 px-6 rounded-3xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-3 md:col-span-2"
              >
                <svg
                  className="w-6 h-6"
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
                Add Another Variant
              </button>
            </div>

            <div className="md:col-span-2">
              <label className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                Product Images
                <span className="text-sm text-slate-500 bg-slate-200 px-3 py-1 rounded-full">
                  (Max 5 images)
                </span>
              </label>
              <div className="border-4 border-dashed border-slate-300 rounded-3xl p-5 text-center hover:border-blue-400 hover:bg-blue-50 transition-all bg-linear-to-br from-slate-50 to-indigo-50 shadow-lg hover:shadow-2xl">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="images"
                />
                <label
                  htmlFor="images"
                  className="cursor-pointer flex flex-col items-center gap-4"
                >
                  <svg
                    className="w-16 h-16 text-slate-400 hover:text-blue-500 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <p className="text-xl font-bold text-slate-700 mb-1">
                      Click to upload images
                    </p>
                    <p className="text-md text-slate-500">
                      PNG, JPG, WebP (Max 5MB each)
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-400 disabled:to-slate-500 text-white py-4 px-6 rounded-3xl font-bold text-lg shadow-2xl hover:shadow-3xl focus:outline-none focus:ring-8 focus:ring-blue-500/30 transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-4 h-8 w-8 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  {editId ? "Updating Product..." : "Adding Product..."}
                </>
              ) : editId ? (
                "Update Product"
              ) : (
                "Add Product"
              )}
            </button>

            {editId && (
              <button
                type="button"
                onClick={handleCancel}
                className="md:col-span-2 bg-linear-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white py-6 px-12 rounded-3xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all"
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>
      </div>

      {/* PRODUCT SECTION */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-200/50 p-8 lg:p-12">
          <h2 className="text-xl font-bold text-slate-900 text-center mb-6 flex items-center justify-center gap-3">
            <svg
              className="w-10 h-10 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            All Products
          </h2>

          <div className="flex flex-col lg:flex-row gap-4 mb-10">
            <div className="flex flex-1 gap-4">
              <div className="relative flex-1">
                <svg
                  className="absolute left-5 top-1/2 -translate-y-1/1 w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="🔍 Search by product name..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="w-full pl-16   pr-6 py-4 border-2 border-slate-200 rounded-3xl bg-slate-50 text-sm placeholder-slate-400 focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white focus:outline-none transition-all shadow-lg hover:shadow-xl"
                />
              </div>

              <select
                value={filterBrand}
                onChange={(e) => setFilterBrand(e.target.value)}
                className="w-full lg:w-72 px-6 py-3 border-2 border-slate-200 rounded-3xl bg-slate-50 text-md focus:ring-4 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white focus:outline-none transition-all shadow-lg hover:shadow-xl"
              >
                <option value="">All Brands</option>
                {brands?.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ❌ NO RESULTS MESSAGE — FILTER ONLY */}
          {products.length === 0 && isFiltering && (
            <div className="bg-linear-to-r from-rose-50 to-red-50 border-4 border-rose-200 rounded-3xl p-16 text-center shadow-2xl">
              <svg
                className="mx-auto w-24 h-24 text-rose-400 mb-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h3 className="text-3xl font-bold text-rose-900 mb-4">
                No Products Found
              </h3>
              <p className="text-xl text-rose-700 mb-8">
                {searchName
                  ? `No products found with name "${searchName}"`
                  : "No products found for selected brand"}
              </p>
              <button
                onClick={() => {
                  setSearchName("");
                  setFilterBrand("");
                }}
                className="bg-linear-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white px-10 py-4 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* 🛍 PRODUCT GRID */}
          {products?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="group bg-white/90 backdrop-blur-sm rounded-3xl border-2 border-slate-200 shadow-xl hover:shadow-3xl hover:border-blue-300 hover:-translate-y-2 transition-all duration-500 overflow-hidden max-h-[600px] hover:max-h-none"
                >
                  {/* Product Header */}
                  <div className="p-8 pb-4 border-b-2 border-slate-100">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-slate-900 line-clamp-2 pr-4 group-hover:text-blue-600 transition-all">
                        {product.name}
                      </h3>
                      <span
                        className={`px-3 py-2 rounded-2xl text-xs font-bold shadow-lg ${
                          product.condition === "new"
                            ? "bg-linear-to-r from-emerald-500 to-teal-500 text-white"
                            : "bg-linear-to-r from-orange-500 to-red-500 text-white"
                        }`}
                      >
                        {product.condition?.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3 text-md">
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl group-hover:bg-emerald-50 transition-all">
                        <svg
                          className="w-6 h-6 text-emerald-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2h10a2 2 0 012 2v2M4 7h16"
                          />
                        </svg>
                        <div>
                          <div className="font-semibold text-slate-800">
                            Brand
                          </div>
                          <div className="text-xl font-bold text-slate-900">
                           {product.brand?.name || "No Brand"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl group-hover:bg-indigo-50 transition-all">
                        <svg
                          className="w-6 h-6 text-indigo-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        <div>
                          <div className="font-semibold text-slate-800">
                            Category
                          </div>
                          <div className="text-xl font-bold text-slate-900">
                            {product.category?.categoryName}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="p-6 pb-3">
                    <div className="mb-5">
                      <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        📝 Description
                      </h4>
                      <p className="text-md text-slate-700 leading-relaxed line-clamp-3 group-hover:line-clamp-none">
                        {product.description}
                      </p>
                    </div>

                    {/* Specification */}
                    <div className="mb-8">
                      <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        ⚙️ Specification
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-32 overflow-y-auto">
                        {Object.entries(product.specifications).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="flex items-start gap-3 p-3 bg-linear-to-r from-slate-50 to-indigo-50 rounded-2xl hover:shadow-md transition-all"
                            >
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0" />
                              <div>
                                <div className="font-semibold text-slate-800 capitalize">
                                  {key}:
                                </div>
                                <div className="text-md text-slate-900 font-medium">
                                  {value}
                                </div>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    {/* Variants */}
                    <div className="mb-6">
                      <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        🎨 Variants ({product.variants?.length || 0})
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-40 overflow-y-auto">
                        {product.variants?.map((v, i) => (
                          <div
                            key={i}
                            className="group/variant p-5 border-2 border-purple-100 rounded-2xl bg-linear-to-br from-purple-50 to-pink-50 hover:border-purple-300 hover:shadow-lg transition-all"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-md text-purple-800">
                                {v.color}
                              </span>
                              <span className="px-3 py-1 bg-linear-to-r from-emerald-500 to-teal-500 text-white rounded-full text-md font-bold">
                                AED {v.price}
                              </span>
                            </div>
                            <div className="text-xs text-slate-600 space-y-1">
                              <div>
                                Storage:{" "}
                                <span className="font-semibold text-slate-900">
                                  {v.storage}
                                </span>
                              </div>
                              <div>
                                RAM:{" "}
                                <span className="font-semibold text-slate-900">
                                  {v.ram}
                                </span>
                              </div>
                              <div>
                                Stock:{" "}
                                <span
                                  className={`font-bold ${v.stock > 0 ? "text-emerald-600" : "text-rose-600"}`}
                                >
                                  {v.stock}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Images */}
                    <div className="mb-6">
                      <h4 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                        🖼️ Images ({product.images?.length || 0})
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
                        {product.images?.map((img, i) => (
                          <div
                            key={i}
                            className="group/image relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 hover:-rotate-1"
                          >
                            <img
                              src={img}
                              alt={`${product.name} - Image ${i + 1}`}
                              className="w-full h-25 sm:h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-3">
                              <span className="text-white text-sm font-bold">
                                Image {i + 1}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt- border-t-2 border-slate-200">
                      <button
                        onClick={() => dispatch(deleteProduct(product._id))}
                        className="flex-1 bg-linear-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white py-3 px-5 mb-3 rounded-3xl font-bold shadow-xl hover:shadow-2xl transition-all text-md flex items-center justify-center gap-2"
                      >
                        <svg
                          className="w-5 h-5"
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
                        Delete Product
                      </button>
                      <button
                        onClick={() => handleEdit(product)}
                        className="flex-1 bg-linear-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-3 px-4 mb-3 rounded-3xl font-bold shadow-xl hover:shadow-2xl transition-all text-md flex items-center justify-center gap-2"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Edit Product
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !isFiltering && (
              <div className="bg-linear-to-r from-slate-50 to-indigo-50 border-4 border-slate-200 rounded-3xl p-20 text-center shadow-2xl">
                <svg
                  className="mx-auto w-32 h-32 text-slate-400 mb-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <h3 className="text-4xl font-bold text-slate-900 mb-6">
                  No Products Available
                </h3>
                <p className="text-2xl text-slate-600 mb-12 max-w-2xl mx-auto">
                  Your product catalog is empty. Add your first product using
                  the form above to get started.
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsAdmin;
