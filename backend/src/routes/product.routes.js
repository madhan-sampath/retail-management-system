const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

// CRUD operations
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

// Filtering operations
router.get("/filter/low-stock", productController.getLowStockProducts);
router.get("/filter/price", productController.getProductsByPriceRange);

// Search operations
router.get("/search", productController.searchProducts);

// Top-selling products
router.get("/top-selling", productController.getTopSellingProducts);

module.exports = router;
