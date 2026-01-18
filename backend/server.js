require("dotenv").config() ;
const express= require("express");
const cors= require("cors");
const path= require("path");
const connectDB = require("./config/db");
const authRoutes= require("./routes/authRoutes");
const incomeRoutes= require("./routes/incomeRoutes");
const expenseRoutes= require("./routes/expenseRoutes");
const dashboardRoutes= require("./routes/dashboardRoutes");
const debugRoutes = require("./routes/debug");
const app = express();

app.use(express.json());
app.use("/api/v1", debugRoutes);
// Middleware to handle CORS


const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));






connectDB(); 

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/income",incomeRoutes);
app.use("/api/v1/expense",expenseRoutes);
app.use("/api/v1/dashboard",dashboardRoutes);

app.use("/uploads",express.static("uploads"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
