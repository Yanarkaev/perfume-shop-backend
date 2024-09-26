const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const app = express();
const perfumeRoute = require("./routes/perfume.route"); // Импортируем маршрут
const categoryRoute = require("./routes/category.route"); // Импортируем маршрут
const imageRoute = require("./routes/image.route"); // Импортируем маршрут
const brandRoute = require("./routes/brand.route"); // Импортируем маршрут

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/perfumes", perfumeRoute);
app.use("/image", imageRoute);
app.use("/brand", brandRoute);
app.use("/categories", categoryRoute);

(async () => {
  try {
    await mongoose.connect(process.env.SERVER);
    console.log("mongoose connected");

    app.listen(process.env.PORT, () => {
      console.log(`connected on ${process.env.PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
})();
