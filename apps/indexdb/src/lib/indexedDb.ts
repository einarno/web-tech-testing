// db.ts

import { Commit, parseCommit } from "./types";

let request: IDBOpenDBRequest;
let db: IDBDatabase;

const dbName = "testDB";
const storeName = "commits";

export const initDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // open the connection
    request = indexedDB.open(dbName);

    request.onupgradeneeded = () => {
      db = request.result;
      // if the data object store doesn't exist, create it
      if (!db.objectStoreNames.contains(storeName)) {
        console.log("Creating commit store");
        db.createObjectStore(storeName, { keyPath: "id" });
      }
      // no need to resolve here
    };

    request.onsuccess = () => {
      resolve(true);
    };

    request.onerror = () => {
      resolve(false);
    };
  });
};

export const getAllCommits = (): Promise<Commit[]> => {
  return new Promise((resolver) => {
    request = indexedDB.open(dbName);

    request.onsuccess = (event) => {
      console.log("request.onsuccess - getAllData", event?.target?.result);

      db = event?.target?.result;
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const res = store.getAll();
      res.onsuccess = () => {
        resolver(res.result);
      };
    };
  });
};

export const fillDB = async () => {
  const allCommits = await getAllCommits();
  console.log("All commits", allCommits);
  if (allCommits.length > 0) {
    console.log("Commits already exist in the DB");
    return;
  }
  const data = await fetch("http://localhost:4200/getCommits").then((res) =>
    res.json(),
  );
  console.log("Fetched data", data);
  const commits = data.commits.map((commit: Commit) => parseCommit(commit));
  console.log("Filling DB with commits", db);
  const transaction = db.transaction("commits", "readwrite");

  transaction.oncomplete = function () {
    console.log("All commits added successfully");
  };

  transaction.onerror = function (event) {
    console.error("Error when adding commits", event);
  };

  const objectStore = transaction.objectStore(storeName);

  for (const commit of commits) {
    const request = objectStore.add(commit);

    request.onsuccess = () => {
      console.log(`New student added, email: ${request.result}`);
    };

    request.onsuccess = (err) => {
      console.error(`Error to add new student: ${err}`);
    };
  }
};
