import mongoose from "mongoose";
import productModel from "../models/productModel.js";

// ➜ ADD NEW PRODUCT
export const addProduct = async (req, res) => {
  try {
    // 🔹 Destructure fields from request body
    const {
      name,
      brand,
      category,
      condition,
      description,
      specifications,
      variants,
      isActive,
    } = req.body;

    // 🔹 Validate required fields
    if (!name  || !category || !condition) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    // 🔹 Check if product name already exists
    const existingName = await productModel.findOne({ name });

    if (existingName) {
      return res.status(400).json({
        message: "Product name already exists",
      });
    }

    // 🔹 Validate images upload
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "Please upload at least one image",
      });
    }

    // 🔹 Convert uploaded files to URL array
    const imageUrls = req.files.map((file) => file.path || file.secure_url);

    // 🔹 Parse JSON fields (sent as string from FormData)
    const parsedSpecifications = specifications
      ? JSON.parse(specifications)
      : {};

    const parsedVariants = variants ? JSON.parse(variants) : [];
    const finalBrand = brand === "" ? null : brand;
    // 🔹 Create new product
    const product = await productModel.create({
      name,
       brand: finalBrand,
      category,
      condition,
      description,
      images: imageUrls,
      specifications: parsedSpecifications,
      variants: parsedVariants,
      isActive: isActive ?? true,
    });
    const populatedProduct = await productModel
      .findById(product._id)
      .populate("brand", "name")
      .populate("category", "categoryName");
    // 🔹 Success response
    res.status(201).json({
      message: "Product added successfully",
      product: populatedProduct,
    });
  } catch (error) {
    console.error("Add product error:", error);

    res.status(500).json({
      message: "Failed to add product",
      error: error.message,
    });
  }
};

// edit product
export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };

    if (data.brand === "") {
  data.brand = null;
}
    // ✅ Handle images (if uploaded)
    if (req.files && req.files.length > 0) {
      data.images = req.files.map((file) => file.path || file.secure_url);
    }

    // ✅ Parse JSON fields if sent as string
    if (data.specifications && typeof data.specifications === "string") {
      data.specifications = JSON.parse(data.specifications);
    }

    if (data.variants && typeof data.variants === "string") {
      data.variants = JSON.parse(data.variants);
    }

    const updated = await productModel
      .findByIdAndUpdate(id, data, { new: true })
      .populate("category")
      .populate("brand");

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product updated successfully",
      product: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to edit product",
      error: error.message,
    });
  }
};

//delete product
export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

// get all products
export const getAllProduct = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("brand", "name")
      .populate("category", "categoryName");

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get products",
      error: error.message,
    });
  }
};

//  GET PRODUCT BY ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel
      .findById(id)
      .populate("brand", "name")
      .populate("category", "categoryName");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({product});
  } catch (error) {
    res.status(500).json({
      message: "Failed to get product",
      error: error.message,
    });
  }
};

//filter category,brands,conditon and price
export const getFilteredProducts = async (req, res) => {
  try {
    const { category, brand, name, condition, minPrice, maxPrice, sort } =
      req.query;

    let filter = {};

    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (condition) filter.condition = condition;

    // Partial & case-insensitive name search
    if (name) {
      filter.name = { $regex: name, $options: "i" }; // "i" = case-insensitive
    }

    // Price filter (variants price)
    if (minPrice || maxPrice) {
      filter["variants.price"] = {};
      if (minPrice) filter["variants.price"].$gte = Number(minPrice);
      if (maxPrice) filter["variants.price"].$lte = Number(maxPrice);
    }

    let query = productModel.find(filter);

    // Sorting
    if (sort === "low") query = query.sort({ "variants.price": 1 });
    else if (sort === "high") query = query.sort({ "variants.price": -1 });

    const products = await query;

    // ✅ If no product matches
    // if (products.length === 0 && name) {
    //   return res.status(404).json({
    //     message: `No product found with name "${name}"`,
    //   });
    // }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Filtering failed",
      error: error.message,
    });
  }
};
