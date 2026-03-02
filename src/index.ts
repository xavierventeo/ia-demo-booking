import { createApp } from "./app.js";

const DEFAULT_PORT = 3000 as const;
const portFromEnv = Number.parseInt(process.env.PORT ?? "", 10);
const port = Number.isFinite(portFromEnv) ? portFromEnv : DEFAULT_PORT;

const app = createApp();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
