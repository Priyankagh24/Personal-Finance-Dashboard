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
app.use(
cors ({
origin: [ "http://localhost:5173",
    "https://finaancetracker.netlify.app"],
methods: ["GET" ,"POST","PUT", "DELETE"],
allowedHeaders :["Content-Type" ,"Authorization"] ,
})
);

app.options("*", cors());
app.use((req, res, next) => {
  console.log("Request body:", req.body);
  next();
});


connectDB(); 

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/income",incomeRoutes);
app.use("/api/v1/expense",expenseRoutes);
app.use("/api/v1/dashboard",dashboardRoutes);

app.use("/uploads",express.static("uploads"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
