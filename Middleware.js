import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.headers["access-token"];
  if (!token) return res.status(401).json({ message: "Token requerido" });

  jwt.verify(token, "CLAVE_SECRETA", (err, decoded) => {
    if (err) return res.status(403).json({ message: "Token inválido" });

    req.user = decoded;
    next();
  });
};
