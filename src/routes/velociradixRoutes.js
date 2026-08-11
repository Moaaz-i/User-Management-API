import {
  getRequestBody,
  handleAddUser,
  handleUpdateUser,
  handleDeleteUser,
  handleGetUserByName,
  handleGetAllUsers,
  handleFilterUsersByAge,
  handleGetUserById,
} from "../controllers/userController.js";
import { routeDocs } from "../docs/apiDocs.js";

export function registerVelociradixRoutes(app) {
  // 1. POST /user -> Add new user
  app.post(
    "/user",
    async (ctx) => {
      const body = await getRequestBody(ctx);
      const result = await handleAddUser(body);
      return ctx.status(result.status).json(result.body);
    },
    routeDocs.addUser
  );

  // 2. PATCH /user/:id -> Update user by ID
  app.patch(
    "/user/:id",
    async (ctx) => {
      const body = await getRequestBody(ctx);
      const result = await handleUpdateUser(ctx.params?.id, body);
      return ctx.status(result.status).json(result.body);
    },
    routeDocs.updateUser
  );

  // 3. DELETE /user/:id & DELETE /user -> Delete user
  const deleteHandler = async (ctx) => {
    const body = await getRequestBody(ctx);
    const id = ctx.params?.id || body?.id;
    const result = await handleDeleteUser(id);
    return ctx.status(result.status).json(result.body);
  };

  app.delete("/user/:id", deleteHandler, routeDocs.deleteUserByParam);
  app.delete("/user", deleteHandler, routeDocs.deleteUserByBody);

  // 4. GET /user/getByName -> Get user by name
  app.get(
    "/user/getByName",
    async (ctx) => {
      const url = new URL(ctx.req.url, "http://localhost:3000");
      const name = ctx.query?.name || url.searchParams.get("name");
      const result = await handleGetUserByName(name);
      return ctx.status(result.status).json(result.body);
    },
    routeDocs.getUserByName
  );

  // 5. GET /user -> Get all users
  app.get(
    "/user",
    async (ctx) => {
      const result = await handleGetAllUsers();
      return ctx.status(result.status).json(result.body);
    },
    routeDocs.getAllUsers
  );

  // 6. GET /user/filter -> Filter by minAge
  app.get(
    "/user/filter",
    async (ctx) => {
      const url = new URL(ctx.req.url, "http://localhost:3000");
      const minAgeStr = ctx.query?.minAge || ctx.query?.age || url.searchParams.get("minAge") || url.searchParams.get("age");
      const result = await handleFilterUsersByAge(minAgeStr);
      return ctx.status(result.status).json(result.body);
    },
    routeDocs.filterUsersByAge
  );

  // 7. GET /user/:id -> Get user by ID
  app.get(
    "/user/:id",
    async (ctx) => {
      const result = await handleGetUserById(ctx.params?.id);
      return ctx.status(result.status).json(result.body);
    },
    routeDocs.getUserById
  );
}
