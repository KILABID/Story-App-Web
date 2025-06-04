import { openDB } from 'idb';

const DB_NAME = 'storyapp-db';
const STORE_NAME = 'stories';
const BOOKMARKS_STORE = 'bookmarks';

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    }
    if (!db.objectStoreNames.contains(BOOKMARKS_STORE)) {
      db.createObjectStore(BOOKMARKS_STORE, { keyPath: 'id' });
    }
  }
});

export const initDB = async () => {
  return dbPromise;
};

export async function addBookmark(story) {
  const db = await dbPromise;
  return db.put(BOOKMARKS_STORE, story);
}

export async function removeBookmark(id) {
  const db = await dbPromise;
  return db.delete(BOOKMARKS_STORE, id);
}

export async function getBookmarks() {
  const db = await dbPromise;
  return db.getAll(BOOKMARKS_STORE);
}

export async function isBookmarked(id) {
  const db = await dbPromise;
  const bookmark = await db.get(BOOKMARKS_STORE, id);
  return bookmark !== undefined;
}
