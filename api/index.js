const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connect");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

const authRouter = require("./routes/auth");
const uploadRouter = require("./routes/upload");
const accommodationRouter = require("./routes/accommodation");
const bookingRouter = require("./routes/booking");
const userRouter = require("./routes/user");

const notFoundMiddleware = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use("/uploads", express.static(__dirname + "/uploads"));

// Extra security packages
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

const corsOptions = {
  origin: [
    "http://localhost:5173", // Development frontend
    "https://temeljkovitch-waterbnd.netlify.app", // Deployed frontend
  ],
  credentials: true, // Allow cookies and credentials
};
app.use(cors(corsOptions));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/upload", uploadRouter);
app.use("/api/v1/accommodation", accommodationRouter);
app.use("/api/v1/booking", bookingRouter);
app.use("/api/v1/user", userRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
