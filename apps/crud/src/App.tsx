import "./App.css";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export function App() {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(
        "localhost:4200" + new URLSearchParams({ page: "1", perPage: "10" }),
      ).then((res) => res.json()),
  });
  return (
    <QueryClientProvider client={queryClient}>
      {JSON.stringify(data)}
    </QueryClientProvider>
  );
}
