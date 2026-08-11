import { Router } from "express";
import {
  handleAddUser,
  handleUpdateUser,
  handleDeleteUser,
  handleGetUserByName,
  handleGetAllUsers,
  handleFilterUsersByAge,
  handleGetUserById,
} from "../controllers/userController.js";

const router = Router();

// 1. POST /user -> Add new user
router.post("/user", async (req, res) => {
  const result = await handleAddUser(req.body);
  res.status(result.status).json(result.body);
});

// 2. PATCH /user/:id -> Update user by ID
router.patch("/user/:id", async (req, res) => {
  const result = await handleUpdateUser(req.params.id, req.body);
  res.status(result.status).json(result.body);
});

// 3. DELETE /user/:id & DELETE /user -> Delete user
const deleteRouteHandler = async (req, res) => {
  const id = req.params.id || req.body?.id;
  const result = await handleDeleteUser(id);
  res.status(result.status).json(result.body);
};
router.delete("/user/:id", deleteRouteHandler);
router.delete("/user", deleteRouteHandler);

// 4. GET /user/getByName -> Get user by name
router.get("/user/getByName", async (req, res) => {
  const result = await handleGetUserByName(req.query.name);
  res.status(result.status).json(result.body);
});

// 5. GET /user -> Get all users
router.get("/user", async (req, res) => {
  const result = await handleGetAllUsers();
  res.status(result.status).json(result.body);
});

// 6. GET /user/filter -> Filter by minAge
router.get("/user/filter", async (req, res) => {
  const minAge = req.query.minAge || req.query.age;
  const result = await handleFilterUsersByAge(minAge);
  res.status(result.status).json(result.body);
});

// 7. GET /user/:id -> Get user by ID
router.get("/user/:id", async (req, res) => {
  const result = await handleGetUserById(req.params.id);
  res.status(result.status).json(result.body);
});

export default router;
