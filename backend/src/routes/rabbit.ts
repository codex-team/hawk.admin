import { Router } from "express";
import Rabbit from "../models/rabbit";

const router = Router();

const rabbit = new Rabbit();

router.get("/overview", async (req, res) => {
  const overview = await rabbit.overview();
  res.json(overview);
});

router.get("/consumers", async (req, res) => {
  const consumers = await rabbit.openConnections();
  res.json(consumers);
});

export default router;
