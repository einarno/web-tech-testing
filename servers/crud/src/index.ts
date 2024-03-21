import { Hono } from "hono";
import { cors } from "hono/cors";
import { getSupabase, supabaseMiddleware } from "./middleware/supabase";
import { getCommits } from "./getCommits";
const app = new Hono();

app.use("*", supabaseMiddleware);

app.use(
  "*",
  cors({
    origin: "http://localhost:5173",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);
app.get("/", (c) => {
  return c.text("Hello Cloudflare Workers!");
});

app.get("/getCommits", async (c) => {
  const supabase = getSupabase(c);
  const { page: pageString, perPage: perPageString } = c.req.query();
  const page = pageString ? parseInt(pageString) : undefined;
  const perPage = perPageString ? parseInt(perPageString) : undefined;

  const pagination = page && perPage ? { page, perPage } : undefined;
  console.log(pagination, page, perPage);
  const issues = await getCommits(supabase, pagination);
  return c.json(issues);
});

export default app;
