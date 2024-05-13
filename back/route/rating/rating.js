import express from "express";
import { PrismaClient } from "@prisma/client";

import { expressjwt } from "express-jwt";
const prisma = new PrismaClient();
const router = express.Router();

const auth = expressjwt({
  secret: process.env["JWT_SECRET"],
  algorithms: ["HS256"],
});

router.post("/rating", auth, async (req, res) => {
  const user = req.auth.id;
  const { mediaId, score } = req.body;

  if (score < 0 || score > 5) {
    return res.json({ message: "La note doit etre comprise entre 0 et 5" });
  }
  try {
    const existingLike = await prisma.rating.findFirst({
      where: {
        userId: user,
        mediaId: mediaId,
      },
    });
    if (existingLike) {
      return res.json({ message: "vous avez deja ajouter un like" });
    } else {
      await prisma.rating.create({
        data: {
          userId: user,
          mediaId: mediaId,
          score: score,
        },
      });
      return res.json({ message: "vous avez ajouter un like" });
    }
  } catch (error) {
    return res.json({ message: error });
  }
});

export default router;
