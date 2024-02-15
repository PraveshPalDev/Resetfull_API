import dotenv from "dotenv";
import connectionDB from "./mongodb/index.mjs";
import { app } from "./app.mjs";

dotenv.config();
const PORT = process.env.PORT || 3000;

// here connect to mongoDB url
connectionDB()
  .then(() => {
    app.on("error", (err) => {
      console.log("mongoDB error", err);
    });
  })
  .catch((err) => {
    console.log("database connection error =>", err);
  });

app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});
