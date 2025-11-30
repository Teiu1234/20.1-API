import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../db.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  await db.execute("INSERT INTO users (email, password) VALUES (?, ?)", [
    email,
    hashed,
  ]);

  res.json({ message: "Usuario registrado" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await db.execute("SELECT * FROM users WHERE email=?", [email]);
  if (rows.length === 0)
    return res.status(404).json({ message: "Usuario no existe" });

  const user = rows[0];
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Contraseña incorrecta" });

  const token = jwt.sign({ id: user.id }, "CLAVE_SECRETA", {
    expiresIn: "1h",
  });

  res.json({ message: "Login exitoso", token });
});

export default router;
