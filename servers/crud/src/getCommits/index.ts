import { SupabaseClient } from "@supabase/supabase-js";
import { Hono } from "hono";

export const commits = new Hono().basePath("/commits");

type Pagination = {
  page: number;
  perPage: number;
};
export async function getCommits(
  supabase: SupabaseClient,
  pagination?: Pagination,
) {
  if (!pagination) {
    let { data: commits_ignite, count } = await supabase
      .from("commits_ignite")
      .select("*");
    return { commits: commits_ignite, count };
  }
  const { page, perPage } = pagination;
  const from = pagination.page * pagination.perPage;
  const to = page === 0 ? perPage : from + perPage;

  let { data: commits_ignite, count } = await supabase
    .from("commits_ignite")
    .select("*")
    .range(from, to);
  return { commits: commits_ignite, count };
}
