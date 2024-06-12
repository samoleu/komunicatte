require("dotenv").config();

const express = require("express");
var cors = require("cors");
const exampleRoute = require("./routes/exampleRoute");
const profileRoute = require('./routes/profileRoute');
const chatRoute = require("./routes/chatRoute");
const mongoose = require("mongoose");

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/example", exampleRoute);
app.use('/api/profile', profileRoute);
app.use("/api/chat", chatRoute);

app.listen(3001, () => {
  console.log(`Server Started at ${3001}`);
});
