import express from "express";
import expressRoutes from "./src/routes/expressRoutes.js";

const app = express();
app.use(express.json());

// Register Express CRUD Routes (Ordered 1 to 7)
app.use(expressRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
