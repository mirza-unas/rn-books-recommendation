import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import authRoute from "./routes/authRoute.js";
import bookRoute from "./routes/bookRoute.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use("/api/auth", authRoute);
app.use("/api/books", bookRoute);

app.get("/", (req, res) => {
  res.send("API is running");
});
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
  });
}

export default app;
