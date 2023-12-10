//Installing and setting up Mongoose
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8081;
app.use(express.json())
mongoose.connect(
  "mongodb+srv://salim:salim@cluster0.ckl6i3p.mongodb.net/?retryWrites=true&w=majority",
  console.log("Database is connected")
);
app.use("/user", require("./Routes/useRoutes"));
app.listen(port, () => console.log("Server is running at port 8081"));