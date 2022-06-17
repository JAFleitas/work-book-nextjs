interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  createdAt: number;
  description: string;
  status: string;
}

export const seedData: SeedData = {
  entries: [
    {
      createdAt: Date.now(),
      description: "loremasdas daskldjkasdjk",
      status: "pending",
    },
    {
      createdAt: Date.now() - 100000,
      description: "loremasd da das as daskldjkasdjk",
      status: "finished",
    },
    {
      createdAt: Date.now() - 1000000,
      description: "loremasdasd asdw3ee3 3e3 daskldjkasdjk",
      status: "in-progress",
    },
  ],
};
