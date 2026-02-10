import mongoose from "mongoose";
import brandModel from "../models/brandModel.js";

// add new Brand

export const addBrand = async (req, res) => {
  const {name} = req.body;
  try {
    if (!name) {
      return res.status(400).json({ error: "Brand name requireed" });
    }
    const existingBrand = await brandModel.findOne({name});
    if (existingBrand) {
      return res.json({ message: "Brand Name alredy existed create new one" });
    }

    const newBrand = await brandModel.create({name});
    res
      .status(201)
      .json({ message: "Brand Created Successfully", newBrand });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//edit brand

export const editBrand = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const editedBrand = await brandModel.findByIdAndUpdate(id, data, {
      new: true,
      upsert: true,
    });
    res
      .status(200)
      .json({ message: "Brand Updated Successfully", editedBrand });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//delete brand

export const deleteBrand = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedBrand = await brandModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Brand deleted successfully", deletedBrand });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get all Brand

export const getAllBrand = async (req, res) => {
  try {
    const allBrand = await brandModel.find({});
    res.status(200).json(allBrand);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
