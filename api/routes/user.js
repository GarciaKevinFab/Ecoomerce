import express from "express";
import { createUser, deleteUser, getAllUser, getSingleUser, updateUser } from "../controllers/userController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//update  user
router.put('/:id', updateUser);

//delete user
router.delete('/:id', deleteUser);

//get single user
router.get('/:id', getSingleUser);

//get all users
router.get('/', getAllUser);

export default router;