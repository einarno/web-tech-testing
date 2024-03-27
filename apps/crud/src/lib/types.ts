// "id":37459,"created_at":"2024-03-17T09:56:41.674258+00:00","sha":"70ce17f3cf","contributor":" Michael Fivis","date":"2024-03-15T10:51:26","message":" synchronizer: clean up deleted select choice values (#21005)"},
export type Commit = {
  id: number;
  created_at: string;
  sha: string;
  contributor: string;
  date: string;
  message: string;
};

export const parseCommit = (data: unknown) => {
  return data as Commit;
};
