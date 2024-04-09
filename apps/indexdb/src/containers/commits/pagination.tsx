import { Button } from "@/components/ui/button";
import React from "react";

type Props = {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
};

export const PaginationComponent: React.FC<Props> = ({
  totalPages,
  setPage,
  page,
}) => {
  return (
    <div className="flex justify-start space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </Button>
    </div>
  );
};
