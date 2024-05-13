import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import formValidation from "./registerValidation.js";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
const router = express.Router();

// route pour l'inscription
router.post("/register", async (req, res) => {
  let userdata;
  try {
    // on récupère les informations de l'utilisateur
    userdata = formValidation.parse(req.body);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }

  // on vérifie dans la base si il y est déjà
  const user = await prisma.user.findFirst({
    where: { email: userdata.email },
  });

  // si il n'existe pas
  if (!user) {
    // on hash le mot de passe via bcrypt
    const hashedPassword = await bcrypt.hash(userdata.password, 10);
    // on ajoute le user
    await prisma.user
      .create({
        data: {
          email: userdata.email,
          pseudo: userdata.username,
          password: hashedPassword,
        },
      })
      // et on signe le token
      .then((user) => {
        res.json({
          token: jwt.sign(
            { email: user.email, id: user.id },
            process.env["JWT_SECRET"],
            { expiresIn: "24h" }
          ),
        });
      });
  } else {
    // sinon on retour une erreur si le user existe déjà
    return res.status(400).json({
      message: "User already exists",
    });
  }
});

export default router;
