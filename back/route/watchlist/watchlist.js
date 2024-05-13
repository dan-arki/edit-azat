import express from "express";
import { PrismaClient } from "@prisma/client";
import { expressjwt } from "express-jwt";
const prisma = new PrismaClient();
const router = express.Router();

const auth = expressjwt({
  secret: process.env["JWT_SECRET"],
  algorithms: ["HS256"],
});

router.post("/watchlist", auth, async (req, res) => {
  const user = req.auth.id;
  const { mediaId } = req.body;
  try {
    await prisma.watchList.create({
      data: {
        userId: user,
        mediaId: mediaId,
      },
    });
    res.json({ message: "Ajout du media dans la watchlist" });
  } catch (error) {
    return res.json({ message: error });
  }
});

router.get('/watchlist', auth, async (req, res) => {
  const user = req.auth.id;
  try {
    const watchlist = await prisma.watchList.findMany({
      where: {
        userId: user
      },
      include : {
        media: true
      }
    });
    res.json(watchlist);
  } catch (error) {
    return res.json({ message: error });
  }
})

router.delete('/watchlist', auth, async (req, res) => {
    const user = req.auth.id;
    const { mediaId } = req.body;
    try {
      await prisma.watchList.deleteMany({
        where: {
          userId: user,
          mediaId: mediaId
        }
      });
      res.json({ message: "Suppression du media de la watchlist" });
    } catch (error) {
      return res.json({ message: error });
    }
})
export default router;
