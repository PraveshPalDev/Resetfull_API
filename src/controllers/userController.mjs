import User from "../models/userModels.mjs";

import { asyncHandler } from "../utils/asyncHandler.mjs";
import { ApiResponse } from "../utils/apiResponseHandler.mjs";
import { ApiError } from "../utils/apiErrorHandler.mjs";

// Get all users
export const handleGetAllUsers = asyncHandler(async (req, res) => {
  try {
    const allUsers = await User.find({});

    if (!allUsers) {
      throw new ApiError(400, "Something went wrong !!");
    }

    res
      .status(200)
      .json(new ApiResponse(200, allUsers, "Fetched all users successfully"));
  } catch (error) {
    throw new ApiError(500, "An error occurred while fetched all the user");
  }
});

// Create a new user
export const handlerCreateUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, gender } = req.body;

  // Check if all required fields are provided
  if (!firstName || !lastName || !email || !gender) {
    throw new ApiError(400, "All fields are required.");
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "User with this email already exists.");
    }

    // Create the user
    const user = await User.create({ firstName, lastName, email, gender });
    res
      .status(201)
      .json(new ApiResponse(201, user, "User created successfully"));
  } catch (error) {
    throw new ApiError(500, "An error occurred while creating the user");
  }
});

// Get user by ID
export const handleUserByID = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    throw new ApiError(400, "User ID is missing.");
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    res
      .status(200)
      .json(new ApiResponse(200, user, "User fetched successfully"));
  } catch (error) {
    throw new ApiError(500, "An error occurred while fetched the user");
  }
});

// update the particular item
export const handleUpdateUserByID = asyncHandler(async (req, res) => {
  const body = req.body;

  if (!body.id || !body.fullName || !body.gender || !body.lastName) {
    throw new ApiError(400, "id is required to update the user");
  }

  const userUpdateData = {
    fullName: body.fullName,
    lastName: body.lastName,
    gender: body.gender,
  };
  try {
    const user = await User.findByIdAndUpdate(body.id, userUpdateData, {
      new: true,
    });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, user, "User updated successfully"));
  } catch (error) {
    throw new ApiError(500, "An error occurred while updating the user");
  }
});

// update the all user details
export const handleUpdateUserById = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    throw new ApiError(400, "ID is required to update the user");
  }

  const updates = {};
  const allField = ["fullName", "lastName", "gender"];
  allField?.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  try {
    const user = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, user, "User updated successfully"));
  } catch (error) {
    throw new ApiError(500, "An error occurred while replace the user");
  }
});

export const handleDeleteUserByID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(404, "User id is required !!");
  }

  try {
    const user = await User.findByIdAndDelete(id, { new: true });

    if (!user) {
      throw new ApiError(404, "User not found !!");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, user, "Delete user successfully"));
  } catch (error) {
    throw new ApiError(
      500,
      "An error occurred while user deleted in the database"
    );
  }
});
