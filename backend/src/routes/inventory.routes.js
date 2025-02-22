const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventory.controller");

// ✅ Get all inventory records
router.get("/", inventoryController.getAllInventory);

// ✅ Get inventory by product ID
router.get("/:productId", inventoryController.getInventoryByProductId);

// ✅ Update inventory by product ID
router.put("/:productId", inventoryController.updateInventory);

// ✅ Delete inventory by product ID
router.delete("/:productId", inventoryController.deleteInventory);

module.exports = router;
