const express = require("express");
const app = express();
const port = 4500;
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//creating schema
const Schemaa = mongoose.Schema({
  name: String,
  price: Number,
});

//creating collection
const Products = mongoose.model("Products", Schemaa);

//creating product
app.post("/api/product/new", async (req, res) => {
  const product = await Products.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

//getting products
app.get("/api/products", async (req, res) => {
  const product = await Products.find();

  res.status(200).json({
    success: true,
    product,
  });
});

//updating product

app.put("/api/product/:id", async (req, res) => {
  let product = await Products.findById(req.params.id);

  product = await Products.findByIdAndUpdate(req.params.id, req.body);

  if (!product) {
    res.status(500).json({
      success: false,
      massage: "product not found",
    });
  }

  res.status(200).json({
    success: true,
    massage: "product updated",
  });
});

//delete the product
app.delete("/api/product/:id", async (req, res) => {
  const product = await Products.findById(req.params.id);
  
  if (!product) {
      res.status(500).json({
          success: false,
          massage: "product not found",
        });
    }
    await product.remove();
    
    res.status(200).json({
        success: true,
        massage: "product deleted",
    });

});

// {<<<<<<<<<<<<<<<<<<<--->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>}

app.listen(port, () => {
  console.log("Node Connected!");
});

mongoose.connect("mongodb://127.0.0.1:27017/LastHopeData").then(() => {
  console.log("MongoDB Connected!");
});
