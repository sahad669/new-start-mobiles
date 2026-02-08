import mongoose from "mongoose";
import categoryModel from "../models/categoryModel.js";

// add new Category

export const addCategory = async (req, res) => {
  const { categoryName } = req.body;
  try {
    if (!categoryName) {
     return res.status(400).json({ message: "Category name required" });
    }
    const existingCategory = await categoryModel.findOne({ categoryName });
    if (existingCategory) {
      return res.json({ error: "Category Name alredy existed create new one" });
    }

    const newCategory = await categoryModel.create({ categoryName });
    res
      .status(201)
      .json({ message: "Category Created Successfully", newCategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//edit Category

export const editCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const editedCategory = await categoryModel.findByIdAndUpdate(id, data, {
      new: true,
      upsert: true,
    });
    res
      .status(200)
      .json({ message: "Category Updated Successfully", editedCategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//delete category

export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCategory = await categoryModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Category deleted successfully", deletedCategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get all Category

export const getAllCategory = async (req, res) => {
  try {
    const allCategory = await categoryModel.find({});
    res.status(200).json(allCategory);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
