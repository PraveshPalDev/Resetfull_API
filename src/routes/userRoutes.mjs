import express from "express";
import {
  handleGetAllUsers,
  handlerCreateUser,
  handleUserByID,
  handleUpdateUserByID,
  handleUpdateUserById,
  handleDeleteUserByID,
} from "../controllers/userController.mjs";
const router = express.Router();

// create a hybrid routes from web
router.get("/", handleGetAllUsers).post("/", handlerCreateUser);

// request to based on params id
router.get("/:id", handleUserByID);

// update the data based on id
router.put("/updateUserID", handleUpdateUserByID);

// replace the data based on id
router.patch("/updateUser", handleUpdateUserById);

// delete the data based on id
router.delete("/deleteUser/:id", handleDeleteUserByID);

export default router;
