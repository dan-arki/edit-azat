import express from "express";
import { PrismaClient } from "@prisma/client";
import { expressjwt } from "express-jwt";
const prisma = new PrismaClient();
const router = express.Router();

const auth = expressjwt({
  secret: process.env["JWT_SECRET"],
  algorithms: ["HS256"],
});

router.post("/watching", auth, async (req, res) => {
  const userId = req.auth.id;
  const { mediaId } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const existing = await prisma.watching.findFirst({
      where: {
        userId: userId,
        mediaId: mediaId,
      },
    });
    if (existing) {
      return res.json({
        message: "Vous avez déjà ajouté ce media à vos vues.",
      });
    }
    // Créer une entrée dans la table Watching
    await prisma.watching.create({
      data: {
        userId: userId,
        mediaId: mediaId,
      },
    });

    return res.json({ message: "Ajout du média aux vidéos déjà vues." });
  } catch (error) {
    console.error(
      "Erreur lors de l'ajout du média aux vidéos déjà vues :",
      error
    );
    return res.status(500).json({ message: "Erreur interne du serveur." });
  }
});

router.get('/watching', auth, async (req, res) => {
  const userId = req.auth.id;
  try {
    const watching = await prisma.watching.findMany({
      where: {
        userId: userId,
      },
      include: {
        media: true,
      },
    });
    res.json(watching);
  } catch (error) {
    return res.json({ message: error });
  }
});

export default router;
