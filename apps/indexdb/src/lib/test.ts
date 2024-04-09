import { Commit } from "./types";

let request: IDBOpenDBRequest;
let db: IDBDatabase;

const storeName = "commits";

export const initDB = (): Promise<boolean | IDBDatabase> => {
  return new Promise((resolve) => {
    request = indexedDB.open("myDB");

    // if the data object store doesn't exist, create it
    request.onupgradeneeded = () => {
      db = request.result;

      if (!db.objectStoreNames.contains(storeName)) {
        console.log("Creating users store");
        db.createObjectStore(storeName, { keyPath: "id" });
      }
      // no need to resolve here
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      resolve(false);
    };
  });
};

export {};
