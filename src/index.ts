import { Hono } from "hono";
import { subscriber } from "./routes/subscriber";
import { newsletter } from "./routes/newsletter";
import * as os from "os";
import { serve } from "@hono/node-server";
import * as dotenv from "dotenv";
dotenv.config();

const app = new Hono();
const PORT = 8080;

app.route("/subscriber", subscriber);

app.route("/emails", subscriber);

app.route("/newsletter", newsletter);

app.get("/", (c) => {
  return c.text(`Hello from ${os.hostname()}`);
});

if (!process.versions.bun) {
  console.log(`Server running on ${PORT}`);
  serve({
    fetch: app.fetch,
    port: PORT,
  });
}

export default {
  fetch: app.fetch,
  port: PORT,
};
