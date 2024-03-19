import { Hono } from "hono";

import { createClient } from "@supabase/supabase-js";
import { getSupabase, supabaseMiddleware } from "./middleware/supabase";
import { getCommits } from "./getCommits";
const app = new Hono();

app.use("*", supabaseMiddleware);

app.get("/", (c) => {
  return c.text("Hello Cloudflare Workers!");
});

app.get("/getCommits", async (c) => {
  const supabase = getSupabase(c);

  const { page: pageString, perPage: perPageString } = c.req.query();
  const page = pageString ? parseInt(pageString) : undefined;
  const perPage = perPageString ? parseInt(perPageString) : undefined;

  const pagination = page && perPage ? { page, perPage } : undefined;

  const issues = await getCommits(supabase, pagination);
  return c.json(issues);
});

export default app;
