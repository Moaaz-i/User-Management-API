import { readUsers, writeUsers } from "../services/userService.js";

// Helper to parse body from ctx or req
export async function getRequestBody(reqOrCtx) {
  if (reqOrCtx?.body && typeof reqOrCtx.body === "function") {
    try {
      return await reqOrCtx.body();
    } catch {
      return {};
    }
  }
  return reqOrCtx.body || {};
}

// 1. POST /user -> Add new user
export async function handleAddUser(data) {
  const { name, age, email, id } = data;
  if (!name || !email) {
    return { status: 400, body: { status: "error", message: "Name and email are required" } };
  }

  const users = await readUsers();
  const emailExists = users.some(
    (u) => u.email && u.email.toLowerCase() === String(email).toLowerCase()
  );

  if (emailExists) {
    return { status: 400, body: { status: "error", message: "Email already exists" } };
  }

  const newUser = {
    id: id || (users.length > 0 ? Math.max(...users.map((u) => Number(u.id) || 0)) + 1 : 1),
    name,
    age: age ? Number(age) : null,
    email,
  };

  users.push(newUser);
  await writeUsers(users);

  return {
    status: 201,
    body: { status: "success", message: "User added successfully", data: newUser },
  };
}

// 2. PATCH /user/:id -> Update user by ID
export async function handleUpdateUser(id, data) {
  const { name, age, email } = data;
  const users = await readUsers();
  const userIndex = users.findIndex((u) => String(u.id) === String(id));

  if (userIndex === -1) {
    return { status: 404, body: { status: "error", message: "User not found" } };
  }

  if (email && email.toLowerCase() !== users[userIndex].email?.toLowerCase()) {
    const emailExists = users.some(
      (u) => u.email && u.email.toLowerCase() === String(email).toLowerCase()
    );
    if (emailExists) {
      return { status: 400, body: { status: "error", message: "Email already exists" } };
    }
  }

  if (name !== undefined) users[userIndex].name = name;
  if (age !== undefined) users[userIndex].age = Number(age);
  if (email !== undefined) users[userIndex].email = email;

  await writeUsers(users);

  return {
    status: 200,
    body: { status: "success", message: "User updated successfully", data: users[userIndex] },
  };
}

// 3. DELETE /user/:id or DELETE /user -> Delete user
export async function handleDeleteUser(id) {
  if (!id) {
    return { status: 400, body: { status: "error", message: "User ID is required" } };
  }

  const users = await readUsers();
  const userIndex = users.findIndex((u) => String(u.id) === String(id));

  if (userIndex === -1) {
    return { status: 404, body: { status: "error", message: "User not found" } };
  }

  const deletedUser = users.splice(userIndex, 1)[0];
  await writeUsers(users);

  return {
    status: 200,
    body: { status: "success", message: "User deleted successfully", data: deletedUser },
  };
}

// 4. GET /user/getByName -> Get user by name
export async function handleGetUserByName(name) {
  if (!name) {
    return { status: 400, body: { status: "error", message: "Name query parameter is required" } };
  }

  const users = await readUsers();
  const filteredUsers = users.filter(
    (u) => u.name && u.name.toLowerCase() === String(name).toLowerCase()
  );

  if (filteredUsers.length === 0) {
    return { status: 404, body: { status: "error", message: "User not found" } };
  }

  return { status: 200, body: { status: "success", data: filteredUsers } };
}

// 5. GET /user -> Get all users
export async function handleGetAllUsers() {
  const users = await readUsers();
  return { status: 200, body: { status: "success", data: users } };
}

// 6. GET /user/filter -> Filter by minAge
export async function handleFilterUsersByAge(minAgeStr) {
  const minAge = Number(minAgeStr);
  if (isNaN(minAge)) {
    return { status: 400, body: { status: "error", message: "Valid minAge query parameter is required" } };
  }

  const users = await readUsers();
  const filteredUsers = users.filter((u) => Number(u.age) >= minAge);
  return { status: 200, body: { status: "success", data: filteredUsers } };
}

// 7. GET /user/:id -> Get user by ID
export async function handleGetUserById(id) {
  const users = await readUsers();
  const user = users.find((u) => String(u.id) === String(id));

  if (!user) {
    return { status: 404, body: { status: "error", message: "User not found" } };
  }

  return { status: 200, body: { status: "success", data: user } };
}
