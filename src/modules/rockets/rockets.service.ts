import type { Rocket, RocketCreate, RocketInput } from "./rockets.types.js";
import { RocketStore } from "./rockets.store.js";
import { validateRocketInput } from "./rockets.validation.js";

type ServiceResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: "validation" | "not_found"; details?: string[] };

const store = new RocketStore();

const list = (): ServiceResult<Rocket[]> => ({ ok: true, value: store.list() });

const get = (id: string): ServiceResult<Rocket> => {
  const rocket = store.get(id);

  if (!rocket) {
    return { ok: false, error: "not_found" };
  }

  return { ok: true, value: rocket };
};

const create = (input: RocketInput): ServiceResult<Rocket> => {
  const validation = validateRocketInput(input);

  if (!validation.ok) {
    return { ok: false, error: "validation", details: validation.errors };
  }

  return { ok: true, value: store.create(validation.value) };
};

const update = (id: string, input: RocketInput): ServiceResult<Rocket> => {
  const existing = store.get(id);

  if (!existing) {
    return { ok: false, error: "not_found" };
  }

  const validation = validateRocketInput(input);

  if (!validation.ok) {
    return { ok: false, error: "validation", details: validation.errors };
  }

  return { ok: true, value: store.update(id, validation.value) };
};

const remove = (id: string): ServiceResult<{ id: string }> => {
  const existing = store.get(id);

  if (!existing) {
    return { ok: false, error: "not_found" };
  }

  store.remove(id);
  return { ok: true, value: { id } };
};

export const rocketService = {
  list,
  get,
  create,
  update,
  remove,
};
