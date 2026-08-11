// API Documentation Metadata Configuration for Postman & Docs auto-generation

export const routeDocs = {
  // 1. POST /user -> Add User
  addUser: {
    name: "1. Add User (POST /user)",
    description: "Adds a new user to users.json file after checking email uniqueness.",
    body: {
      name: "Moaaz",
      age: 22,
      email: "moaaz@example.com",
    },
    responses: [
      {
        name: "201 Created - User Added Successfully",
        code: 201,
        body: {
          status: "success",
          message: "User added successfully",
          data: {
            id: 1,
            name: "Moaaz",
            age: 22,
            email: "moaaz@example.com",
          },
        },
      },
      {
        name: "400 Bad Request - Email Already Exists",
        code: 400,
        body: {
          status: "error",
          message: "Email already exists",
        },
      },
      {
        name: "400 Bad Request - Missing Name or Email",
        code: 400,
        body: {
          status: "error",
          message: "Name and email are required",
        },
      },
    ],
  },

  // 2. PATCH /user/:id -> Update User
  updateUser: {
    name: "2. Update User (PATCH /user/:id)",
    description: "Updates an existing user's name, age, or email by ID parameter.",
    body: {
      name: "Moaaz Updated",
      age: 23,
    },
    responses: [
      {
        name: "200 Success - User Updated",
        code: 200,
        body: {
          status: "success",
          message: "User updated successfully",
          data: {
            id: 1,
            name: "Moaaz Updated",
            age: 23,
            email: "moaaz@example.com",
          },
        },
      },
      {
        name: "404 Error - User Not Found",
        code: 404,
        body: {
          status: "error",
          message: "User not found",
        },
      },
      {
        name: "400 Error - Email Already Exists",
        code: 400,
        body: {
          status: "error",
          message: "Email already exists",
        },
      },
    ],
  },

  // 3. DELETE /user/:id -> Delete User By Path Param
  deleteUserByParam: {
    name: "3. Delete User By Path Param (DELETE /user/:id)",
    description: "Deletes a user by ID using URL parameter.",
    responses: [
      {
        name: "200 Success - User Deleted",
        code: 200,
        body: {
          status: "success",
          message: "User deleted successfully",
          data: {
            id: 1,
            name: "Moaaz",
            age: 22,
            email: "moaaz@example.com",
          },
        },
      },
      {
        name: "404 Error - User Not Found",
        code: 404,
        body: {
          status: "error",
          message: "User not found",
        },
      },
    ],
  },

  // 3. DELETE /user -> Delete User By Body
  deleteUserByBody: {
    name: "3. Delete User By Body (DELETE /user)",
    description: "Deletes a user by ID specified in JSON body.",
    body: {
      id: 1,
    },
    responses: [
      {
        name: "200 Success - User Deleted",
        code: 200,
        body: {
          status: "success",
          message: "User deleted successfully",
          data: {
            id: 1,
            name: "Moaaz",
            age: 22,
            email: "moaaz@example.com",
          },
        },
      },
      {
        name: "404 Error - User Not Found",
        code: 404,
        body: {
          status: "error",
          message: "User not found",
        },
      },
    ],
  },

  // 4. GET /user/getByName -> Get User By Name
  getUserByName: {
    name: "4. Get User By Name (GET /user/getByName)",
    description: "Retrieves a user by their name provided as query parameter.",
    query: [{ key: "name", value: "Moaaz" }],
    responses: [
      {
        name: "200 Success - User Found",
        code: 200,
        body: {
          status: "success",
          data: [
            {
              id: 1,
              name: "Moaaz",
              age: 22,
              email: "moaaz@example.com",
            },
          ],
        },
      },
      {
        name: "404 Error - User Not Found",
        code: 404,
        body: {
          status: "error",
          message: "User not found",
        },
      },
    ],
  },

  // 5. GET /user -> Get All Users
  getAllUsers: {
    name: "5. Get All Users (GET /user)",
    description: "Retrieves all users from the JSON file.",
    responses: [
      {
        name: "200 Success - Get All Users",
        code: 200,
        body: {
          status: "success",
          data: [
            {
              id: 1,
              name: "Moaaz",
              age: 22,
              email: "moaaz@example.com",
            },
          ],
        },
      },
    ],
  },

  // 6. GET /user/filter -> Filter Users By Minimum Age
  filterUsersByAge: {
    name: "6. Filter Users By Minimum Age (GET /user/filter)",
    description: "Filters users by minimum age provided as query parameter (minAge).",
    query: [{ key: "minAge", value: "20" }],
    responses: [
      {
        name: "200 Success - Filtered Users",
        code: 200,
        body: {
          status: "success",
          data: [
            {
              id: 1,
              name: "Moaaz",
              age: 22,
              email: "moaaz@example.com",
            },
          ],
        },
      },
    ],
  },

  // 7. GET /user/:id -> Get User By ID
  getUserById: {
    name: "7. Get User By ID (GET /user/:id)",
    description: "Retrieves a single user by their ID parameter.",
    responses: [
      {
        name: "200 Success - User Found",
        code: 200,
        body: {
          status: "success",
          data: {
            id: 1,
            name: "Moaaz",
            age: 22,
            email: "moaaz@example.com",
          },
        },
      },
      {
        name: "404 Error - User Not Found",
        code: 404,
        body: {
          status: "error",
          message: "User not found",
        },
      },
    ],
  },
};
