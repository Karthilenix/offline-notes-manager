import { openDB } from "idb";

const DB_NAME = "offline-notes-db";
const STORE_NAME = "notes";

export const initDB = async () => {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, {
                    keyPath: "id",
                    autoIncrement: true,
                });

                store.createIndex("title", "title");
                store.createIndex("createdAt", "createdAt");
                store.createIndex("updatedAt", "updatedAt");
            }
        },
    });
};

export const addNote = async (note) => {
    const db = await initDB();
    return db.add(STORE_NAME, note);
};

export const getAllNotes = async () => {
    const db = await initDB();
    return db.getAll(STORE_NAME);
};

export const updateNote = async (note) => {
    const db = await initDB();
    return db.put(STORE_NAME, note);
};

export const deleteNote = async (id) => {
    const db = await initDB();
    return db.delete(STORE_NAME, id);
};