import express from "express";
import Products from "../models/Product.js";
const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    // change logic here for data modification
    const products = await Products.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
