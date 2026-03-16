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
    <div className="w-full p-4 pt-24 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {editId ? "Edit Product" : "Add Product"}
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow max-w-4xl mx-auto"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border rounded-lg p-2"
        />

        <select
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          required
          className="border rounded-lg p-2"
        >
          <option value="">Select Brand</option>
          {brands?.map((b) => (
            <option key={b._id} value={b._id}>
              {b.name}
            </option>
          ))}
        </select>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="border rounded-lg p-2"
        >
          <option value="">Select Category</option>
          {categories?.map((c) => (
            <option key={c._id} value={c._id}>
              {c.categoryName}
            </option>
          ))}
        </select>

        <select
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          className="border rounded-lg p-2"
        >
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border rounded-lg p-2 md:col-span-2"
        />

        <h2 className="font-semibold md:col-span-2 text-lg">Specifications</h2>

        {Object.keys(formData.specifications).map((key) => (
          <input
            key={key}
            type="text"
            name={key}
            placeholder={key}
            value={formData.specifications[key]}
            onChange={handleSpecChange}
            className="border rounded-lg p-2"
          />
        ))}

        <h2 className="font-semibold md:col-span-2 text-lg">Variants</h2>

        {formData.variants.map((variant, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg md:col-span-2 bg-gray-50"
          >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {Object.keys(variant).map((key) => (
                <input
                  key={key}
                  type={key === "price" || key === "stock" ? "number" : "text"}
                  name={key}
                  placeholder={key}
                  value={variant[key]}
                  onChange={(e) => handleVariantChange(index, e)}
                  className="border rounded-lg p-2"
                />
              ))}
            </div>

            {formData.variants.length > 1 && (
              <button
                type="button"
                onClick={() => removeVariant(index)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove Variant
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addVariant}
          className="bg-green-600 text-white px-4 py-2 rounded md:col-span-2"
        >
          Add Another Variant
        </button>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="border rounded-lg p-2 md:col-span-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg md:col-span-2"
        >
          {loading
            ? "Please wait..."
            : editId
              ? "Update Product"
              : "Add Product"}
        </button>

        {editId && (
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white p-2 rounded md:col-span-2"
          >
            Cancel
          </button>
        )}
      </form>

      {/* PRODUCT SECTION */}
      <div className="w-full mt-10 px-4">
        <h2 className="font-bold text-2xl text-center mb-4">All Products</h2>

        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="border p-2 rounded-lg w-full"
          />

          <select
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
            className="border p-2 rounded-lg w-full md:w-60"
          >
            <option value="">All Brands</option>
            {brands?.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        {/* ❌ NO RESULTS MESSAGE — FILTER ONLY */}
        {products.length === 0 && isFiltering && (
          <div className="text-center text-gray-500 text-lg mt-6">
            {searchName
              ? `No products found with name "${searchName}"`
              : "No products found for selected brand"}
          </div>
        )}

        {/* 🛍 PRODUCT GRID */}
        {products?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="border p-5 rounded-xl shadow bg-white"
              >
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>

                <p>
                  <strong>Brand:</strong> {product.brand?.name}
                </p>

                <p>
                  <strong>Category:</strong> {product.category?.categoryName}
                </p>

                <p>
                  <strong>Condition:</strong> {product.condition}
                </p>

                <p>
                  <strong>Description:</strong> {product.description}
                </p>

                <h4 className="mt-3 font-bold">Specification</h4>
                <ul className="list-disc ml-6">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <li key={key}>
                        <strong>{key}:</strong> {value}
                      </li>
                    ),
                  )}
                </ul>

                <h4 className="mt-3 font-bold">Variants</h4>
                {product.variants.map((v, i) => (
                  <p key={i}>
                    {v.color} — {v.storage} — {v.ram} — AED {v.price} — Stock:{" "}
                    {v.stock}
                  </p>
                ))}

                <h4 className="font-semibold mt-3">Images</h4>
                <div className="flex gap-2 flex-wrap">
                  {product.images.map((img, i) => (
                    <img
                      src={img}
                      alt={product.name}
                      key={i}
                      className="w-24 h-24 object-cover rounded"
                    />
                  ))}
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => dispatch(deleteProduct(product._id))}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !isFiltering && (
            <p className="text-center text-gray-500 mt-4">
              No products available
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default ProductsAdmin;
