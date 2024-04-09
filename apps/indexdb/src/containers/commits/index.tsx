import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

import { PaginationComponent } from "./pagination";
import { Commit } from "@/lib/types";
import { getAllCommits } from "@/lib/indexedDb";

export const CommitsTable = () => {
  const [commits, setCommits] = React.useState<Commit[]>([]);
  const [page, setPage] = React.useState(1);

  // declare this async method
  const handleGetCommits = async () => {
    const commitData = await getAllCommits();
    setCommits(commitData);
  };
  React.useEffect(() => {
    if (commits.length === 0) {
      handleGetCommits();
    }
  }, [commits.length]);
  const paginatedCommits = React.useMemo(() => {
    if (commits.length === 0) {
      return [];
    }
    const start = (page - 1) * 10;
    const end = start + 10;
    return commits.slice(start, end);
  }, [commits, page]);
  return (
    <div className="container mx-auto">
      <TableCaption>Commits</TableCaption>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Message</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedCommits.map((commit) => (
            <TableRow key={commit.sha}>
              <TableCell>{commit.message}</TableCell>
              <TableCell>{commit.contributor}</TableCell>
              <TableCell>{commit.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          {paginatedCommits.length !== 0 && (
            <PaginationComponent
              page={page}
              setPage={setPage}
              totalPages={Math.ceil(commits.length / 10)}
            />
          )}
        </TableFooter>
      </Table>
    </div>
  );
};
