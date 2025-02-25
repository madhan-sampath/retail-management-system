const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./src/config/database");


// ✅ Import Routes
const categoryRoutes = require("./src/routes/category.routes");
const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/user.routes");
const roleRoutes = require("./src/routes/role.routes");
const productRoutes = require("./src/routes/product.routes");
const orderRoutes = require("./src/routes/order.routes");
const inventoryRoutes = require("./src/routes/inventory.routes");
const reportRoutes = require("./src/routes/report.routes")


require("./src/models"); // ✅ Ensures all models and associations are loaded

const app = express(); // ✅ Initialize Express app

app.use(cors());
app.use(express.json()); // ✅ Middleware to parse JSON

// ✅ Register API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("api/reports", reportRoutes)


app.use("/api/suppliers", require("./src/routes/supplier.routes"));
app.use("/api/customers", require("./src/routes/customer.routes"));
app.use("/api/payments", require("./src/routes/payment.routes"));
app.use("/api/audit", require("./src/routes/auditLog.routes"));


const orderItemRoutes = require("./src/routes/orderItem.routes");
app.use("/api/order-items", orderItemRoutes);








// ✅ Sync Database
sequelize
  .sync()
  .then(() => console.log("✅ Database synchronized!"))
  .catch((err) => console.error("❌ Sequelize sync error:", err));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
