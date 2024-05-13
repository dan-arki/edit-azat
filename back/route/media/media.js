import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// Récupérer tous les médias avec les noms des acteurs
router.get("/media", async (req, res) => {
  try {
    const media = await prisma.media.findMany({   
      include: {
        platforms: { select: { platform: true } },
        categories: true,
        actor: { select: { actor: true } },
        season: {
          include: {
            episodes: true,
          },
        },
        Rating: true,
      },
    });
    res.json(media);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Une erreur s'est produite lors de la récupération des médias.",
    });
  }
});

router.get('/media/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const resp = await prisma.media.findFirst({
      where : {
        id : id
      },
      include: {
        platforms: { select: { platform: true } },
        categories: true,
        actor: { select: { actor: true } },
        season: {
          include: {
            episodes: true,
          },
        },
        Rating: true,
      }
    })
    return res.json(resp)
  } catch (error) {
    console.log(error)
  }
})
// Récupérer les médias en fonction de la plateforme avec les noms des acteurs
router.get("/media/:platformId", async (req, res) => {
  const platformId = parseInt(req.params.platformId);
  try {
    const media = await prisma.media.findMany({
      where: {
        platforms: {
          some: {
            platformId: platformId,
          },
        },
      },
      include: {
        platforms: true,
        categories: true,
        actor: true,
        season: {
          include: {
            episodes: true,
          },
        },
        Rating: true,
      },
    });
    res.json(media);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Une erreur s'est produite lors de la récupération des médias.",
    });
  }
});

// Récupérer les médias en fonction de la catégorie avec les noms des acteurs
router.get("/media/categories/:categorieId", async (req, res) => {
  const categorieId = parseInt(req.params.categorieId);
  try {
    const media = await prisma.media.findMany({
      where: {
        categories: {
          some: {
            id: categorieId,
          },
        },
      },
      include: {
        platforms: true,
        categories: true,
        actor: true,
        season: {
          include: {
            episodes: true,
          },
        },
        Rating: true,
      },
    });
    res.json(media);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Une erreur s'est produite lors de la récupération des médias.",
    });
  }
});

export default router;
