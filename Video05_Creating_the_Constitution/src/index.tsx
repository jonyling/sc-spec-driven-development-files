import { serve } from "@hono/node-server";
import app from "./app";
import { openClinic } from "./db/clinic";

openClinic();

serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`Server running at http://localhost:${info.port}`);
});
