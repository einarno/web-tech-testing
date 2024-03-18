import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://zvaelggcvmvawchfzgzo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2YWVsZ2djdm12YXdjaGZ6Z3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA1OTI3NTYsImV4cCI6MjAyNjE2ODc1Nn0.C4h2wi4h1Xn-xVYJtdkWWXEu_ikld1lhgjD6EbXB4go",
);

type Pagination = {
  page: number;
  perPage: number;
};
export async function getIssues(pagination?: Pagination) {
  if (!pagination) {
    let { data: commits_ignite } = await supabase
      .from("commits_ignite")
      .select("*")
      .range(0, 9);
    return commits_ignite;
  }
  const { page, perPage } = pagination;
  const from = pagination.page * pagination.perPage;
  const to = page === 0 ? perPage : from + perPage;

  let { data: commits_ignite } = await supabase
    .from("commits_ignite")
    .select("*")
    .range(from, to);
  return commits_ignite;
}
