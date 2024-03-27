import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { CommitsTable } from "./containers/commits";
import { parseCommit } from "./lib/types";

const queryClient = new QueryClient();

export function App() {
  const [page, setPage] = React.useState(1);

  const { isPending, error, data } = useQuery({
    queryKey: ["repoData", page],
    queryFn: () =>
      fetch(
        "http://localhost:4200/getCommits?" +
          new URLSearchParams({ page: `${page}`, perPage: "10" }),
      ).then((res) => res.json()),
  });

  return (
    <div className="container mx-auto">
      <QueryClientProvider client={queryClient}>
        {isPending ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <CommitsTable
            commits={data.commits.map(parseCommit)}
            pagination={{
              page,
              setPage,
              totalPages: Math.ceil(data.count / 10),
            }}
          />
        )}
      </QueryClientProvider>
    </div>
  );
}
