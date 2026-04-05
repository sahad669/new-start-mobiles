import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getFilteredProducts } from "../features/productSlice";
import { getAllBrand } from "../features/brandSlice";
import { getAllCategory } from "../features/categorySlice";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const didInitFetch = useRef(false);

  const [searchName, setSearchName] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterBrand, setFilterBrand] = useState("");
  const [filterCondition, setFilterCondition] = useState("");
  const [sort, setSort] = useState("");

  const { brands } = useSelector((state) => state.brand);
  const { categories } = useSelector((state) => state.category);
  const { products, loading, error } = useSelector((state) => state.product);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Initial load (brands & categories once, products first time)
  useEffect(() => {
    if (didInitFetch.current) return;
    didInitFetch.current = true;
    dispatch(getAllProducts());
    dispatch(getAllBrand());
    dispatch(getAllCategory());
  }, [dispatch]);

  // ✅ Backend Filtering (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      // ALL filters empty → get all products
      if (
        !searchName &&
        !filterCategory &&
        !filterBrand &&
        !filterCondition &&
        !sort
      ) {
        dispatch(getAllProducts());
        return;
      }

      // Any filter active → get filtered
      dispatch(
        getFilteredProducts({
          name: searchName,
          category: filterCategory,
          brand: filterBrand,
          condition: filterCondition,
          sort,
        }),
      );
    }, 500); // a bit snappier

    return () => clearTimeout(timer);
  }, [
    searchName,
    filterCategory,
    filterBrand,
    filterCondition,
    sort,
    dispatch,
  ]);

  // 🔹 Loading UI
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <div className="w-14 h-14 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium text-gray-700">Loading products...</p>
      </div>
    );
  }

  // 🔹 Error UI
  if (error) {
    return (
      <div className="flex justify-center items-center h-screenbg-linear-to-br from-slate-50 via-white to-indigo-50">
        <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg shadow-sm">
          {error}
        </div>
      </div>
    );
  }

  // ✅ Check if any filter/search is active
  const isFiltering =
    searchName || filterCategory || filterBrand || filterCondition || sort;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50 pt-25 pb-14">
      {/* Top Bar / Breadcrumb style */}
      <div className="border-b bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Products
            </h1>
            <p className="text-sm text-gray-500">
              Browse our latest inventory and find what you need.
            </p>
          </div>
          <p className="text-sm text-gray-500 mt-1 md:mt-0">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {products?.length || 0}
            </span>{" "}
            items
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters sidebar on desktop, top bar on mobile */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 mb-4 lg:mb-0">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                {isFiltering && (
                  <button
                    onClick={() => {
                      setSearchName("");
                      setFilterBrand("");
                      setFilterCategory("");
                      setFilterCondition("");
                      setSort("");
                    }}
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Search
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <svg
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35M11.25 18a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Search by product name..."
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="block w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
                  />
                </div>
              </div>

              {/* Brand */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Brand
                </label>
                <select
                  value={filterBrand}
                  onChange={(e) => setFilterBrand(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
                >
                  <option value="">All Brands</option>
                  {brands?.map((b) => (
                    <option key={b._id} value={b._id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Category
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
                >
                  <option value="">All Categories</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Condition */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Condition
                </label>
                <select
                  value={filterCondition}
                  onChange={(e) => setFilterCondition(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
                >
                  <option value="">All Condition</option>
                  <option value="new">New</option>
                  <option value="used">Used</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Sort by
                </label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
                >
                  <option value="">Default</option>
                  <option value="low">Price: Low → High</option>
                  <option value="high">Price: High → Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* No results (filter only) */}
            {products.length === 0 && isFiltering && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center text-center">
                <p className="text-lg font-medium text-gray-800 mb-2">
                  No products found
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {searchName
                    ? `No products found with name "${searchName}".`
                    : filterBrand
                      ? "No products found for the selected brand."
                      : filterCategory
                        ? "No products found for the selected category."
                        : filterCondition
                          ? "No products found for the selected condition."
                          : "No products match your current filters."}
                </p>
                <button
                  onClick={() => {
                    setSearchName("");
                    setFilterBrand("");
                    setFilterCategory("");
                    setFilterCondition("");
                    setSort("");
                  }}
                  className="inline-flex items-center gap-1 rounded-full bg-indigo-600 px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                >
                  Reset filters
                </button>
              </div>
            )}

            {/* Product grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                {products.map((product) => {
                  const firstImage = product.images?.[0];
                  const firstPrice = product.variants?.[0]?.price;
                  const conditionLabel =
                    product.condition || product.status || filterCondition;

                  return (
                    <div
                      key={product._id}
                      onClick={() => {
                        scrollToTop();
                        navigate(`/viewproduct/${product._id}`);
                      }}
                      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col"
                    >
                      <div className="relative">
                        <div className="w-full  aspect-4/5 bg-gray-50 rounded-t-2xl overflow-hidden flex items-center justify-center">
                          {firstImage ? (
                            <img
                              src={firstImage}
                              alt={product.name}
                              className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                              No image
                            </div>
                          )}
                        </div>

                        {/* Condition badge */}
                        {conditionLabel && (
                          <span className="absolute left-2 top-2 inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-gray-800 shadow-sm">
                            {String(conditionLabel).toUpperCase()}
                          </span>
                        )}

                        {/* Hover quick view bar */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                          <div className="pointer-events-auto flex items-center justify-center gap-2 bg-black/60 py-2 text-xs text-white">
                            <span>View details</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col px-3.5 pb-3 ">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 min-h-10">
                          {product.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500 line-clamp-2 min-h-8">
                          {product.description}
                        </p>

                        <div className="mt-3 flex items-end justify-between">
                          <div>
                            <p className="text-base font-bold text-indigo-600">
                              AED {firstPrice ?? "—"}
                            </p>
                            {product.mrp && (
                              <p className="text-xs text-gray-400 line-through">
                                AED {product.mrp}
                              </p>
                            )}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            scrollToTop();

                            navigate(`/viewproduct/${product._id}`);
                          }}
                          className="mt-3 inline-flex w-full items-center justify-center gap-1 rounded-full bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              !isFiltering && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
                  <p className="text-lg font-medium text-gray-800 mb-2">
                    No products available
                  </p>
                  <p className="text-sm text-gray-500">
                    Once items are added to your catalog, they will appear here.
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
