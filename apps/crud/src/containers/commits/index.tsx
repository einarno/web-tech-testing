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
import { Commit } from "@/lib/types";
import React from "react";

import { PaginationComponent } from "./pagination";
type Props = {
  commits: Commit[];
  pagination: {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
  };
};
export const CommitsTable: React.FC<Props> = ({ commits, pagination }) => {
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
          {commits.map((commit) => (
            <TableRow key={commit.sha}>
              <TableCell>{commit.message}</TableCell>
              <TableCell>{commit.contributor}</TableCell>
              <TableCell>{commit.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <PaginationComponent {...pagination} />
        </TableFooter>
      </Table>
    </div>
  );
};
