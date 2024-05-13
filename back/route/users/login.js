import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import formValidation from "./loginValidation.js";
import bcrypt from "bcrypt";

const router = express.Router();
const prisma = new PrismaClient();
// route pour la connexion
router.post("/login", async (req, res) => {
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

  // si il esy présent dans la base 
  if (user) {
    // on compare les mots de passe 
    const comparePassword = await bcrypt.compare(
      userdata.password,
      user.password
    );
// si ils sont identiques
    if (comparePassword) {
      // alors on signe le token 
      res.json({
        token: jwt.sign(
          {
            id: user.id,
            email: user.email,
            pseudo: user.pseudo,
          },
          process.env["JWT_SECRET"],
          { expiresIn: "24h" }
        ),
      });
    } else {
      // sinon on renvoire une erreur 
      res.status(400).json({
        message: "Email ou Mot de passe invalide",
      });
    }
  } else {
    // si le user existe pas  on renvoire une erreur 
    res.status(400).json({
      message: "Email ou Mot de passe invalide",
    });
  }
});

export default router;
