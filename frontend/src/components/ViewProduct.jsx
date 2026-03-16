import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../features/productSlice";
import { addProductToCart } from "../features/cartSlice";
import { getFilteredProducts } from "../features/productSlice";

const ViewProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { viewProduct, loading } = useSelector((state) => state.product);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getProductById(id));
    }, 600);

    return () => clearTimeout(timer);
  }, [dispatch, id]);

  useEffect(() => {
    if (viewProduct?.images?.length > 0) {
      setSelectedImage(viewProduct.images[0]);
    }
  }, [viewProduct]);

  useEffect(() => {
    if (viewProduct?.category?._id) {
      dispatch(
        getFilteredProducts({
          category: viewProduct.category._id,
        }),
      ).then((res) => {
        // remove current product from related list
        const filtered = res.payload?.filter((p) => p._id !== viewProduct._id);
        setRelatedProducts(filtered);
      });
    }
  }, [viewProduct, dispatch]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50 ">
        <div className="w-14 h-14 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium text-gray-700">Loading product...</p>
      </div>
    );
  }

  if (!viewProduct) return null;

  const variant = viewProduct.variants?.[selectedVariant];

  const handleAddToCart = () => {
    if (!variant) return;

    dispatch(
      addProductToCart({
        id: viewProduct._id,
        name: viewProduct.name,
        image: selectedImage || viewProduct.images[0],
        price: variant.price,
        variant: variant,
        qty: 1,
      }),
    );

    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-25 pb-22">
      {/* Top header / breadcrumb style */}
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-xs text-gray-400 mb-1">
            Home / Products /{" "}
            <span className="text-gray-600">
              {viewProduct.category?.categoryName || "Category"}
            </span>
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {viewProduct.name}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {viewProduct.brand?.name} • {viewProduct.condition}
          </p>
        </div>
      </div>

      {/* Main content - WIDER SECTIONS */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-13 xl:grid-cols-13">
          {/* Left: images - 5 cols */}
          <section className="lg:col-span-5 xl:col-span-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
              {/* Main image */}
              <div className="aspect-4/5 w-full rounded-xl flex items-center justify-center overflow-hidden">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt={viewProduct.name}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-xs text-gray-400">No image</span>
                )}
              </div>

              {/* Thumbnails */}
              {viewProduct.images?.length > 1 && (
                <div className="mt-4 grid grid-cols-5 sm:grid-cols-6 gap-2">
                  {viewProduct.images.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedImage(img)}
                      className={`relative aspect-square rounded-lg border flex items-center justify-center overflow-hidden ${
                        selectedImage === img
                          ? "border-indigo-500 ring-2 ring-indigo-400"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`thumb-${i}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Middle: info and variants - INCREASED to 5 cols */}
          <section className="lg:col-span-4 xl:col-span-4">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-emerald-600">
                    In stock
                  </p>
                </div>

                <p className="text-xl font-bold text-black leading-relaxed">
                  {viewProduct.name}
                </p>

                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  {viewProduct.condition && (
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700">
                      Condition: {viewProduct.condition}
                    </span>
                  )}
                  {viewProduct.brand?.name && (
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700">
                      Brand: {viewProduct.brand.name}
                    </span>
                  )}
                </div>
              </div>

              {/* Variants - NOW WIDER */}
              {viewProduct.variants?.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Select variant
                  </h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {viewProduct.variants.map((v, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setSelectedVariant(i);
                          if (viewProduct.images?.[i]) {
                            setSelectedImage(viewProduct.images[i]);
                          }
                        }}
                        className={`w-full text-left rounded-xl border px-4 py-3 text-sm transition ${
                          selectedVariant === i
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">
                              {v.color || "Variant"} • {v.storage} • {v.ram}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              Stock:{" "}
                              <span className="font-semibold">
                                {v.stock ?? 0}
                              </span>
                            </p>
                          </div>
                          <p className="text-sm font-bold text-indigo-600">
                            AED {v.price}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Right: buy box - INCREASED WIDTH & PROMINENT STOCK */}
          <aside className="lg:col-span-4 xl:col-span-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-3 sm:p-6 sticky top-20">
              <div className="flex items-baseline justify-between mb-4">
                <p className="text-2xl md:text-3xl font-bold text-indigo-600">
                  AED {variant?.price ?? "—"}
                </p>
                {viewProduct.mrp && (
                  <p className="text-xs text-gray-400 line-through">
                    AED {viewProduct.mrp}
                  </p>
                )}
              </div>

              {/* Stock - MORE PROMINENT */}
              <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <p className="text-sm font-semibold text-emerald-800">
                  In Stock
                </p>
                <p className="text-lg font-bold text-emerald-700 mt-0.5">
                  {variant?.stock ?? 0} units available
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full inline-flex items-center justify-center rounded-full bg-yellow-400 hover:bg-yellow-500 text-sm font-semibold text-gray-900 py-3.5 shadow-sm transition"
                >
                  Add to Cart
                </button>

                <button
                  onClick={handleAddToCart}
                  className="w-full inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 text-sm font-semibold text-white py-3.5 shadow-sm transition"
                >
                  Buy Now
                </button>
              </div>

              <div className="mt-6 space-y-1.5 text-xs text-gray-500">
                <p>✔ Secure transaction</p>
                <p>✔ Fast delivery across UAE</p>
                <p>✔ Easy & hassle-free returns</p>
              </div>

              <div className="mt-6 border-t pt-4 space-y-2 text-xs text-gray-500">
                <p className="font-semibold text-gray-700">Delivery</p>
                <p>Delivered within 2–4 business days.</p>
                <p>Cash on delivery may be available for selected areas.</p>
              </div>
            </div>
          </aside>
        </div>

        {/* Product details section - FIXED JSX */}
        <section className="mt-10 lg:mt-14 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">
            Product details
          </h2>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Description
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {viewProduct.description}
            </p>
          </div>

          {/* Basic info + variant info */}
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Product information
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <span className="font-medium">Brand:</span>{" "}
                  {viewProduct.brand?.name || "-"}
                </li>
                <li>
                  <span className="font-medium">Category:</span>{" "}
                  {viewProduct.category?.categoryName || "-"}
                </li>
                <li>
                  <span className="font-medium">Condition:</span>{" "}
                  {viewProduct.condition || "-"}
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Selected variant
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <span className="font-medium">Color:</span>{" "}
                  {variant?.color || "-"}
                </li>
                <li>
                  <span className="font-medium">Storage:</span>{" "}
                  {variant?.storage || "-"}
                </li>
                <li>
                  <span className="font-medium">RAM:</span>{" "}
                  {variant?.ram || "-"}
                </li>
                <li>
                  <span className="font-medium">Price:</span>{" "}
                  {variant?.price ? `AED ${variant.price}` : "-"}
                </li>
                <li>
                  <span className="font-medium">Stock:</span>{" "}
                  {variant?.stock ?? "-"}
                </li>
              </ul>
            </div>
          </div>

          {/* Specifications */}
          {viewProduct.specifications &&
            Object.keys(viewProduct.specifications).length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Technical specifications
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  {Object.entries(viewProduct.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between gap-4 border-b pb-2"
                      >
                        <span className="font-medium text-gray-700 capitalize">
                          {key}
                        </span>
                        <span className="text-gray-600 text-right">
                          {value}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}
        </section>
        {/* Related Products */}
        {relatedProducts?.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              More in {viewProduct.category?.categoryName}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {relatedProducts.map((product) => {
                const image = product.images?.[0];
                const price = product.variants?.[0]?.price;

                return (
                  <div 
                    key={product._id}
                    // onClick={() => navigate(`/viewproduct/${product._id}`)}
                    className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer"
                  >
                    <div className="aspect-4/5 rounded-t-2xl overflow-hidden flex items-center justify-center">
                      {image ? (
                        <img
                          src={image}
                          alt={product.name}
                          className="h-full w-full object-contain group-hover:scale-105 transition"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">No image</span>
                      )}
                    </div>

                    <div className="p-3">
                      <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                        {product.name}
                      </h3>

                      <p className="text-indigo-600 text-md font-bold mt-1">
                        AED {price ?? "—"}
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();

                          // scroll to top
                          window.scrollTo({
                            top: 1,
                            behavior: "smooth",
                          });

                          navigate(`/viewproduct/${product._id}`);
                        }}
                        className="mt-3 inline-flex w-full items-center justify-center gap-1 rounded-full bg-indigo-600 px-3 py-1.5 text-md font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                      >
                        View Product
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ViewProduct;
