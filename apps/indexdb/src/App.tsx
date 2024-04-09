import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CommitsTable } from "./containers/commits";
import { fillDB, initDB } from "./lib/indexedDb";
const queryClient = new QueryClient();

export function App() {
  const [isDBReady, setIsDBReady] = React.useState<boolean>(false);

  const handleInitDB = async () => {
    console.log("initDB");
    const status = await initDB();
    if (status) {
      await fillDB();
    }
    setIsDBReady(status);
  };
  React.useEffect(() => {
    if (!isDBReady) {
      handleInitDB();
    }
  }, [isDBReady]);
  handleInitDB();
  return (
    <div className="container mx-auto">
      <QueryClientProvider client={queryClient}>
        {!isDBReady ? <div>Loading...</div> : <CommitsTable />}
      </QueryClientProvider>
    </div>
  );
}
