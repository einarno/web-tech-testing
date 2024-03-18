import { Hono } from "hono";
import { getIssues } from "./getCommits";
const app = new Hono();

app.get("/", (c) => c.text("Hello Cloudflare Workers!"));

app.get("/getCommits", async (c) => {
  const { page: pageString, perPage: perPageString } = c.req.query();
  const page = pageString ? parseInt(pageString) : undefined;
  const perPage = perPageString ? parseInt(perPageString) : undefined;
  console.log(page, perPage, "yeah");
  const pagination = page && perPage ? { page, perPage } : undefined;

  const issues = await getIssues(pagination);
  return c.json(issues);
});

export default app;
