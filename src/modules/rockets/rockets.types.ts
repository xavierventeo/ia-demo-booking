export type RocketRange = "suborbital" | "orbital" | "moon" | "mars";

export type Rocket = {
  id: string;
  name: string;
  range: RocketRange;
  capacity: number;
};

export type RocketInput = {
  name?: string;
  range?: RocketRange;
  capacity?: number;
};

export type RocketCreate = {
  name: string;
  range: RocketRange;
  capacity: number;
};
