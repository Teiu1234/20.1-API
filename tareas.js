import express from "express";
import { db } from "../db.js";
import { authMiddleware } from "../authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const [rows] = await db.execute(
    "SELECT * FROM tasks WHERE user_id=?",
    [req.user.id]
  );
  res.json(rows);
});

router.post("/", authMiddleware, async (req, res) => {
  const { title } = req.body;

  await db.execute(
    "INSERT INTO tasks (user_id, title) VALUES (?, ?)",
    [req.user.id, title]
  );

  res.json({ message: "Tarea creada" });
});

router.delete("/:id", authMiddleware, async (req, res) => {
  await db.execute(
    "DELETE FROM tasks WHERE id=? AND user_id=?",
    [req.params.id, req.user.id]
  );

  res.json({ message: "Tarea eliminada" });
});

export default router;
