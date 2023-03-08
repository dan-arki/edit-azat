import { expressjwt } from "express-jwt";
import createError from "http-errors";
import bcrypt from "bcrypt";
import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

//Import validator
import RegisterValidator from "../validators/RegisterValidator.js";
import LoginValidator from "../validators/LoginValidator.js";

const prisma = new PrismaClient();

// j'initialise un routeur
const router = express.Router();

// middleware pour vérifier le token
const auth = expressjwt({
  secret: process.env["JWT_KEY"],
  algorithms: ["HS256"],
});

//Register admin
router.post("/admin/register", async (req, res, next) => {
  let registerData;

  try {
    registerData = RegisterValidator.parse(req.body);
  } catch (error) {
    return res.status(400).json({ errors: error.issues });
  }

  const user = await prisma.admins.findFirst({
    where: {
      email: registerData.email,
    },
  });

  if (user)
    return next(createError(400, "Un compte existe déjà avec cet email."));

  const hashedPassword = await bcrypt.hash(registerData.password, 10);

  await prisma.admins.create({
    data: {
      email: registerData.email,
      password: hashedPassword,
    },
  });

  // puis on renvoie le token
  res.json("User created");
});

//Login admin
router.post("/admin/login", async (req, res, next) => {
  let loginData;
  try {
    loginData = LoginValidator.parse(req.body);
  } catch (error) {
    return res.status(400).json({ errors: error.issues });
  }

  const user = await prisma.admins.findFirst({
    where: {
      email: loginData.email,
    },
  });

  if (!user) return next(createError(400, "Email ou mot de passe incorrect."));
  const passwordMatch = await bcrypt.compare(loginData.password, user.password);

  if (!passwordMatch)
    return next(createError(400, "Email ou mot de passe incorrect."));

  // on crée le token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env["JWT_KEY"],
    {
      expiresIn: "1h",
    }
  );

  // puis on renvoie le token
  res.json({ token });
});

export default router;
