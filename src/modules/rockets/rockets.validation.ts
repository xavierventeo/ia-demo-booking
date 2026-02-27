import type { RocketCreate, RocketInput, RocketRange } from "./rockets.types.js";

type ValidationResult =
  | { ok: true; value: RocketCreate }
  | { ok: false; errors: string[] };

const allowedRanges: RocketRange[] = ["suborbital", "orbital", "moon", "mars"];

export const validateRocketInput = (input: RocketInput): ValidationResult => {
  const errors: string[] = [];
  const name = input.name?.trim() ?? "";

  if (name.length === 0) {
    errors.push("name is required");
  }

  if (!input.range || !allowedRanges.includes(input.range)) {
    errors.push("range must be one of suborbital, orbital, moon, mars");
  }

  if (typeof input.capacity !== "number" || !Number.isInteger(input.capacity)) {
    errors.push("capacity must be an integer between 1 and 10");
  } else if (input.capacity < 1 || input.capacity > 10) {
    errors.push("capacity must be between 1 and 10");
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: {
      name,
      range: input.range as RocketRange,
      capacity: input.capacity as number,
    },
  };
};
