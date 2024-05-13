import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt"; // Assurez-vous d'installer ce module

const prisma = new PrismaClient();
const router = express.Router();
const auth = expressjwt({
  secret: process.env["JWT_SECRET"],
  algorithms: ["HS256"],
});
// route pour avoir les informations du profil
router.get("/user", auth, async (req, res) => {
  const id = req.auth.id;
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        email: true,
        pseudo: true,
        platform: true,
        watching: true,
        WatchList: true,
        created_at: true,
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(403).json({ message: error });
  }
});

// route pour supprimer le profil
router.delete("/user", auth, async (req, res, next) => {
  //on récupère l'id de l'utilisateur
  const id = req.auth.id;
  try {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return res.status(200).json({ message: "Compte supprimé" });
  } catch (error) {
    return res.status(403).json({ message: error });
  }
});
export default router;
