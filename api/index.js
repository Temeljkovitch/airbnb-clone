const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const uploadRouter = require("./routes/upload");

// Extra security packages
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/upload", uploadRouter);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
