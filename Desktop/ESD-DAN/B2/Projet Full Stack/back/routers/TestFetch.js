import { expressjwt } from "express-jwt";
import createError from "http-errors";
import bcrypt from "bcrypt";
import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

import { fetchAPI } from "../js/fetchAPI.js";
import { getPainting } from "../js/query.js";

const prisma = new PrismaClient();

// j'initialise un routeur
const router = express.Router();

// middleware pour vérifier le token
const auth = expressjwt({
  secret: process.env["JWT_KEY"],
  algorithms: ["HS256"],
});

router.get("/fetch/:id", async (req, res, next) => {
  //fetch data from apicollections.parismusees.paris.fr
  const id = req.params.id;
  const data = await fetchAPI(getPainting(id), req.body.auth_token);

  res.json(data);
});

//Toutes les peintures
router.get("/paintings", async (req, res, next) => {
  const paintings = await prisma.paintings.findMany();
  res.json(paintings);
});

//Infos pour une peinture
router.get("/paintings/:id", async (req, res, next) => {
  const id = req.params.id;
  const painting = await prisma.paintings.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  res.json(painting);
});

//Tous les artistes
router.get("/artists", async (req, res, next) => {
  const artists = await prisma.artists.findMany();
  res.json(artists);
});

//Infos pour un artiste
router.get("/artists/:id", async (req, res, next) => {
  const id = req.params.id;
  const artist = await prisma.artists.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  res.json(artist);
});

export default router;
