const { Op } = require("sequelize");
const { Product } = require("../models");

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
};

// Create a product
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error creating product" });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    await product.update(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error updating product" });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    await product.destroy();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting product" });
  }
};

// Get products by price range
exports.getProductsByPriceRange = async (req, res) => {
  try {
    const { min, max } = req.query;
    const products = await Product.findAll({
      where: { price: { [Op.between]: [min || 0, max || Number.MAX_VALUE] } }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error filtering products by price" });
  }
};

// Get low-stock products (< 5 stock)
exports.getLowStockProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { stock_quantity: { [Op.lt]: 5 } },
      order: [["stock_quantity", "ASC"]]
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching low-stock products" });
  }
};

// Search products by name, ID, or stock
exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    const products = await Product.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } },
          { product_id: { [Op.eq]: query } },
          { stock_quantity: { [Op.eq]: query } }
        ]
      }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error searching products" });
  }
};

// Get top-selling products
exports.getTopSellingProducts = async (req, res) => {
  try {
    const topSelling = await OrderItem.findAll({
      attributes: ["product_id", [sequelize.fn("SUM", sequelize.col("quantity")), "totalSold"]],
      group: ["product_id"],
      order: [[sequelize.literal("totalSold"), "DESC"]],
      limit: 5
    });

    const productIds = topSelling.map((item) => item.product_id);
    const products = await Product.findAll({
      where: { product_id: { [Op.in]: productIds } }
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching top-selling products" });
  }
};


// const logAction = require("../utils/auditLogger");

// exports.createProduct = async (req, res) => {
//   try {
//     const { name, description, category_id, price, stock_quantity, image_url } = req.body;
//     const product = await Product.create({ name, description, category_id, price, stock_quantity, image_url });

//     // 🔥 Log the action
//     await logAction(req.user.id, "CREATE", `Created product: ${product.name}`);

//     res.status(201).json({ message: "Product created successfully", product });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating product", error });
//   }
// };

