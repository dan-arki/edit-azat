import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { expressjwt } from "express-jwt";

//Import routes
import admin from "./routers/Admin.js";
import testFetch from "./routers/TestFetch.js";

// initialize app
const app = express();
// initialize prisma
const prisma = new PrismaClient();

// port parameter, used at the end
const port = 3000;

app.use(
  cors({
    origin: ["localhost:5000"],
  })
);

//JWT
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ msg: "Ton JWT est invalide !" });
  }

  // autres erreurs à gérer
  return res.status(err.status).json({ msg: err.message });
});

// middleware pour vérifier le token
const auth = expressjwt({
  secret: process.env["JWT_KEY"],
  algorithms: ["HS256"],
});

app.get("/", async (req, res, next) => {
  res.json("Salut !");
});

app.use(cors());
app.use(express.json());
app.use("/", admin);
app.use("/", testFetch);

// run the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
