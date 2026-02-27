import type { Rocket, RocketCreate } from "./rockets.types.js";

export class RocketStore {
  private rockets = new Map<string, Rocket>();
  private nextId = 1;

  list(): Rocket[] {
    return Array.from(this.rockets.values());
  }

  get(id: string): Rocket | undefined {
    return this.rockets.get(id);
  }

  create(input: RocketCreate): Rocket {
    const rocket: Rocket = {
      id: String(this.nextId++),
      name: input.name,
      range: input.range,
      capacity: input.capacity,
    };

    this.rockets.set(rocket.id, rocket);
    return rocket;
  }

  update(id: string, input: RocketCreate): Rocket {
    const rocket: Rocket = {
      id,
      name: input.name,
      range: input.range,
      capacity: input.capacity,
    };

    this.rockets.set(id, rocket);
    return rocket;
  }

  remove(id: string): boolean {
    return this.rockets.delete(id);
  }
}
