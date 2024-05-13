import express from "express";
import { PrismaClient } from "@prisma/client";
import { expressjwt } from "express-jwt"; // Assurez-vous d'installer ce module
import platformValidation from "./platformvalidation.js";
const prisma = new PrismaClient();
const router = express.Router();
const auth = expressjwt({
  secret: process.env["JWT_SECRET"],
  algorithms: ["HS256"],
});

// route pour avoir les plateformes
router.get("/platform", async (req, res) => {
  try {
    const plateform = await prisma.platform.findMany({});
    if (plateform) {
      res.json(plateform);
    }
  } catch (error) {
    return res.json({ message: error });
  }
});

router.post("/platform", auth, async (req, res) => {
  const id = req.auth.id;
  let data;
  try {
    data = platformValidation.parse(req.body);
    const existingPlatform = await prisma.platform.findFirst({
      where: {
        id: data.id,
      },
    });
    if (existingPlatform) {
      const existingUserPlatform = await prisma.user_Platform.findFirst({
        where: {
          userId: id,
          platformId: data.id,
        },
      });
      if (existingUserPlatform) {
        return res.json({ message: "plateforme deja ajoute" });
      } else {
        await prisma.user_Platform.create({
          data: {
            userId: id,
            platformId: data.id,
          },
        });
        return res.json({ message: "plateforme ajoute avec succes" });
      }
    }
  } catch (error) {
    return res.json({ message: error });
  }
});

export default router;
