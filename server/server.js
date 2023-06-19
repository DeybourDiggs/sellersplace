const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/dbConfig");
const cors = require("cors");
const usersRoute = require("./routes/userRoutes");
const productsRoute = require("./routes/productRoutes");
const port = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(cors({ origin: true }));

// app.use(cors,(req,res, next)=>{
//   res.setHeader('Access-Control-Allow-Origin',"http://127.0.0.1:5174");
//   res.setHeader('Access-Control-Allow-Headers',"*");
//   res.header('Access-Control-Allow-Credentials', true);
//   next();
// });

app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);
app.listen(port, () => console.log(`Node/Express Server started on ${port}`));
