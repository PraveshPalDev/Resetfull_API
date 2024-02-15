import express from "express";

const app = express();

// middleware Plugin
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.status(200).send("Welcome to server");
});

// here import all routes
import userRoutes from "./routes/userRoutes.mjs";
app.use("/api/v1/users", userRoutes);

export { app };
