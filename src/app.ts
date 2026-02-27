import express from "express";
import { rocketsRouter } from "./modules/rockets/rockets.router.js";

export const createApp = () => {
  const app = express();

  app.use(express.json());

  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.use("/rockets", rocketsRouter);

  return app;
};
