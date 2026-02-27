import { Router } from "express";
import { rocketService } from "./rockets.service.js";
import type { RocketInput } from "./rockets.types.js";

export const rocketsRouter = Router();

rocketsRouter.get("/", (req, res) => {
  const result = rocketService.list();

  if (!result.ok) {
    return res.status(500).json({ error: "internal_error" });
  }

  res.status(200).json({ items: result.value });
});

rocketsRouter.get("/:id", (req, res) => {
  const result = rocketService.get(req.params.id);

  if (!result.ok) {
    return res.status(404).json({ error: "not_found", message: "Rocket not found" });
  }

  return res.status(200).json(result.value);
});

rocketsRouter.post("/", (req, res) => {
  const input = req.body as RocketInput;
  const result = rocketService.create(input);

  if (!result.ok) {
    return res.status(400).json({ error: "validation_error", details: result.details });
  }

  return res.status(201).json(result.value);
});

rocketsRouter.put("/:id", (req, res) => {
  const input = req.body as RocketInput;
  const result = rocketService.update(req.params.id, input);

  if (!result.ok) {
    if (result.error === "not_found") {
      return res.status(404).json({ error: "not_found", message: "Rocket not found" });
    }

    return res.status(400).json({ error: "validation_error", details: result.details });
  }

  return res.status(200).json(result.value);
});

rocketsRouter.delete("/:id", (req, res) => {
  const result = rocketService.remove(req.params.id);

  if (!result.ok) {
    return res.status(404).json({ error: "not_found", message: "Rocket not found" });
  }

  return res.status(200).json({ status: "deleted", id: result.value.id });
});
