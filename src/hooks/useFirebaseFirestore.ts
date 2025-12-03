import { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  QueryConstraint,
  DocumentData,
  Timestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";

// Generic hook for Firestore collections
export const useFirestoreCollection = <T extends { id?: string }>(
  collectionName: string,
  localStorageKey?: string
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isConfigured = isFirebaseConfigured();
  const storageKey = localStorageKey || `roma_${collectionName}`;

  // Load data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      if (!isConfigured || !db) {
        // Fallback to localStorage
        const stored = localStorage.getItem(storageKey);
        setData(stored ? JSON.parse(stored) : []);
        setLoading(false);
        return;
      }

      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const items: T[] = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() } as T);
        });
        setData(items);
      } catch (err) {
        console.error("Firestore fetch error:", err);
        setError(err instanceof Error ? err.message : "Errore nel caricamento");
        // Fallback to localStorage on error
        const stored = localStorage.getItem(storageKey);
        setData(stored ? JSON.parse(stored) : []);
      }

      setLoading(false);
    };

    loadData();
  }, [collectionName, isConfigured, storageKey]);

  // Save to localStorage as backup
  const saveToLocalStorage = (items: T[]) => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  };

  // Add document
  const add = async (item: Omit<T, "id">): Promise<string | null> => {
    if (!isConfigured || !db) {
      // Fallback to localStorage
      const newItem = { ...item, id: Date.now().toString() } as T;
      const newData = [newItem, ...data];
      setData(newData);
      saveToLocalStorage(newData);
      return newItem.id || null;
    }

    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...item,
        createdAt: Timestamp.now(),
      });
      const newItem = { ...item, id: docRef.id } as T;
      const newData = [newItem, ...data];
      setData(newData);
      saveToLocalStorage(newData);
      return docRef.id;
    } catch (err) {
      console.error("Firestore add error:", err);
      setError(err instanceof Error ? err.message : "Errore nel salvataggio");
      return null;
    }
  };

  // Update document
  const update = async (id: string, updates: Partial<T>): Promise<boolean> => {
    if (!isConfigured || !db) {
      // Fallback to localStorage
      const newData = data.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      );
      setData(newData);
      saveToLocalStorage(newData);
      return true;
    }

    try {
      await updateDoc(doc(db, collectionName, id), {
        ...updates,
        updatedAt: Timestamp.now(),
      });
      const newData = data.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      );
      setData(newData);
      saveToLocalStorage(newData);
      return true;
    } catch (err) {
      console.error("Firestore update error:", err);
      setError(err instanceof Error ? err.message : "Errore nell'aggiornamento");
      return false;
    }
  };

  // Delete document
  const remove = async (id: string): Promise<boolean> => {
    if (!isConfigured || !db) {
      // Fallback to localStorage
      const newData = data.filter((item) => item.id !== id);
      setData(newData);
      saveToLocalStorage(newData);
      return true;
    }

    try {
      await deleteDoc(doc(db, collectionName, id));
      const newData = data.filter((item) => item.id !== id);
      setData(newData);
      saveToLocalStorage(newData);
      return true;
    } catch (err) {
      console.error("Firestore delete error:", err);
      setError(err instanceof Error ? err.message : "Errore nell'eliminazione");
      return false;
    }
  };

  // Refresh data
  const refresh = async () => {
    setLoading(true);
    if (!isConfigured || !db) {
      const stored = localStorage.getItem(storageKey);
      setData(stored ? JSON.parse(stored) : []);
    } else {
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const items: T[] = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() } as T);
        });
        setData(items);
        saveToLocalStorage(items);
      } catch (err) {
        console.error("Firestore refresh error:", err);
      }
    }
    setLoading(false);
  };

  return {
    data,
    loading,
    error,
    add,
    update,
    remove,
    refresh,
    setData,
    isConfigured,
  };
};

// Real-time listener hook
export const useFirestoreRealtime = <T extends { id?: string }>(
  collectionName: string,
  constraints: QueryConstraint[] = []
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured() || !db) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, collectionName), ...constraints);

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const items: T[] = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() } as T);
        });
        setData(items);
        setLoading(false);
      },
      (err) => {
        console.error("Firestore realtime error:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName]);

  return { data, loading, error, isConfigured: isFirebaseConfigured() };
};
