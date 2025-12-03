# Codice Completo - Roma Club Giallorosso

Questo documento contiene tutto il codice principale del progetto, pronto per essere copiato e analizzato.

---

## 📁 STRUTTURA PROGETTO

```
src/
├── lib/
│   └── firebase.ts              # Configurazione Firebase
├── hooks/
│   ├── useFirebaseStorage.ts    # Hook per upload file
│   └── useFirebaseFirestore.ts  # Hook per database
├── contexts/
│   ├── UserContext.tsx          # Contesto utente
│   └── AdminContext.tsx         # Contesto admin
├── components/
│   ├── ImageUpload.tsx          # Componente upload immagini
│   └── FeedbackSection.tsx      # Sistema feedback/recensioni
└── pages/
    └── Utente.tsx               # Pagina profilo utente
```

---

## 1. FIREBASE CONFIGURATION

### `src/lib/firebase.ts`

```typescript
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

// Firebase configuration - REPLACE with your Firebase project config
// Get these values from Firebase Console > Project Settings > General > Your Apps
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "YOUR_PROJECT.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "YOUR_PROJECT.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "YOUR_APP_ID",
};

// Check if Firebase is configured
export const isFirebaseConfigured = (): boolean => {
  return (
    firebaseConfig.apiKey !== "YOUR_API_KEY" &&
    firebaseConfig.projectId !== "YOUR_PROJECT_ID"
  );
};

// Initialize Firebase only once
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

if (isFirebaseConfigured()) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    console.log("Firebase initialized successfully");
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
} else {
  console.log("Firebase not configured - using local storage fallback");
}

export { app, auth, db, storage };
export default app;
```

---

## 2. FIREBASE STORAGE HOOK

### `src/hooks/useFirebaseStorage.ts`

```typescript
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage, isFirebaseConfigured } from "@/lib/firebase";

interface UploadResult {
  url: string;
  path: string;
}

export const useFirebaseStorage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (
    file: File,
    folder: string = "uploads"
  ): Promise<UploadResult | null> => {
    if (!isFirebaseConfigured() || !storage) {
      console.log("Firebase not configured, using base64 fallback");
      // Fallback to base64 for local storage
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            url: reader.result as string,
            path: `local/${folder}/${file.name}`,
          });
        };
        reader.readAsDataURL(file);
      });
    }

    setIsUploading(true);
    setError(null);
    setProgress(0);

    try {
      // Generate unique filename
      const timestamp = Date.now();
      const uniqueName = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
      const filePath = `${folder}/${uniqueName}`;
      const storageRef = ref(storage, filePath);

      // Upload file
      const snapshot = await uploadBytes(storageRef, file);
      setProgress(100);

      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      setIsUploading(false);
      return { url: downloadURL, path: filePath };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Upload failed";
      setError(errorMessage);
      setIsUploading(false);
      console.error("Firebase upload error:", err);
      return null;
    }
  };

  const uploadImage = async (
    file: File,
    folder: string = "images"
  ): Promise<UploadResult | null> => {
    // Validate image
    if (!file.type.startsWith("image/")) {
      setError("Il file deve essere un'immagine");
      return null;
    }

    // Max 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError("L'immagine non può superare i 5MB");
      return null;
    }

    return uploadFile(file, folder);
  };

  const deleteFile = async (path: string): Promise<boolean> => {
    if (!isFirebaseConfigured() || !storage) {
      console.log("Firebase not configured, cannot delete from storage");
      return true; // Return true for local storage (nothing to delete)
    }

    try {
      const fileRef = ref(storage, path);
      await deleteObject(fileRef);
      return true;
    } catch (err) {
      console.error("Firebase delete error:", err);
      return false;
    }
  };

  return {
    uploadFile,
    uploadImage,
    deleteFile,
    isUploading,
    progress,
    error,
    isConfigured: isFirebaseConfigured(),
  };
};
```

---

## 3. FIREBASE FIRESTORE HOOK

### `src/hooks/useFirebaseFirestore.ts`

```typescript
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
```

---

## 4. USER CONTEXT

### `src/contexts/UserContext.tsx`

```typescript
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  phone?: string;
  city?: string;
}

interface UserContextType {
  isAuthenticated: boolean;
  user: User | null;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Simulated Google accounts for demo
const GOOGLE_ACCOUNTS = [
  { id: "1", email: "mario.rossi@gmail.com", name: "Mario Rossi" },
  { id: "2", email: "luca.bianchi@gmail.com", name: "Luca Bianchi" },
  { id: "3", email: "giulia.verdi@gmail.com", name: "Giulia Verdi" },
];

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("roma_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const loginWithGoogle = async (): Promise<boolean> => {
    // Simulate Google OAuth - pick random account
    const account = GOOGLE_ACCOUNTS[Math.floor(Math.random() * GOOGLE_ACCOUNTS.length)];
    
    const userData: User = {
      id: account.id,
      email: account.email,
      name: account.name,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(account.name)}&background=8B0000&color=FFD700&size=200`,
    };
    
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("roma_user", JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("roma_user");
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("roma_user", JSON.stringify(updatedUser));
    }
  };

  return (
    <UserContext.Provider value={{ isAuthenticated, user, loginWithGoogle, logout, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};
```

---

## 5. ADMIN CONTEXT

### `src/contexts/AdminContext.tsx`

```typescript
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AdminUser {
  email: string;
  name: string;
  avatar: string;
}

interface AdminContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Demo admin credentials
const DEMO_ADMINS = [
  { email: "admin@ovunqueromanisti.it", password: "roma1927", name: "Admin Roma", avatar: "https://ui-avatars.com/api/?name=Admin+Roma&background=8B0000&color=FFD700" },
];

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("admin_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const admin = DEMO_ADMINS.find(a => a.email === email && a.password === password);
    if (admin) {
      const userData = { email: admin.email, name: admin.name, avatar: admin.avatar };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("admin_user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("admin_user");
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
};
```

---

## 6. IMAGE UPLOAD COMPONENT

### `src/components/ImageUpload.tsx`

```typescript
import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Loader2, Cloud, CloudOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useFirebaseStorage } from "@/hooks/useFirebaseStorage";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  className?: string;
  aspectRatio?: "square" | "video" | "wide";
  folder?: string;
}

const ImageUpload = ({ value, onChange, className, aspectRatio = "video", folder = "images" }: ImageUploadProps) => {
  const [urlInput, setUrlInput] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { uploadImage, isUploading, isConfigured } = useFirebaseStorage();

  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[21/9]",
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = await uploadImage(file, folder);
    if (result) {
      onChange(result.url);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput("");
      setShowUrlInput(false);
    }
  };

  const handleRemove = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {value ? (
        <div className={cn("relative rounded-lg overflow-hidden border border-border", aspectClasses[aspectRatio])}>
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x225?text=Immagine+non+valida";
            }}
          />
          <Button
            type="button"
            size="icon"
            variant="destructive"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
          {/* Storage indicator */}
          <div className="absolute bottom-2 left-2">
            {isConfigured ? (
              <span className="flex items-center gap-1 text-xs bg-green-500/80 text-white px-2 py-0.5 rounded">
                <Cloud className="h-3 w-3" /> Firebase
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs bg-yellow-500/80 text-white px-2 py-0.5 rounded">
                <CloudOff className="h-3 w-3" /> Locale
              </span>
            )}
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "relative rounded-lg border-2 border-dashed border-border bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2",
            aspectClasses[aspectRatio]
          )}
          onClick={() => fileInputRef.current?.click()}
        >
          {isUploading ? (
            <>
              <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
              <span className="text-sm text-muted-foreground">Caricamento...</span>
            </>
          ) : (
            <>
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Clicca per caricare un'immagine</span>
              <span className="text-xs text-muted-foreground">
                {isConfigured ? "Firebase Storage (max 5MB)" : "Locale (max 5MB)"}
              </span>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {!value && (
        <div className="flex gap-2">
          {showUrlInput ? (
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="https://esempio.com/immagine.jpg"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleUrlSubmit()}
              />
              <Button type="button" size="sm" onClick={handleUrlSubmit}>
                Aggiungi
              </Button>
              <Button type="button" size="sm" variant="ghost" onClick={() => setShowUrlInput(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => setShowUrlInput(true)}
            >
              <Upload className="h-4 w-4 mr-2" />
              Inserisci URL immagine
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
```

---

## 7. FEEDBACK SECTION COMPONENT

### `src/components/FeedbackSection.tsx`

```typescript
import { useState, useEffect } from "react";
import { Star, Send, User, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";

interface Feedback {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
  likedBy: string[];
}

interface FeedbackSectionProps {
  entityType: "site" | "article" | "package" | "event";
  entityId?: string;
  title?: string;
}

const FEEDBACK_KEY = "roma_feedback";

const FeedbackSection = ({ entityType, entityId = "general", title = "Lascia il tuo feedback" }: FeedbackSectionProps) => {
  const { isAuthenticated, user } = useUser();
  const { toast } = useToast();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const storageKey = `${FEEDBACK_KEY}_${entityType}_${entityId}`;

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setFeedbacks(JSON.parse(stored));
    }
  }, [storageKey]);

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  const saveFeedbacks = (newFeedbacks: Feedback[]) => {
    localStorage.setItem(storageKey, JSON.stringify(newFeedbacks));
    setFeedbacks(newFeedbacks);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({ title: "Seleziona una valutazione", variant: "destructive" });
      return;
    }
    if (!comment.trim()) {
      toast({ title: "Scrivi un commento", variant: "destructive" });
      return;
    }
    if (!name.trim() && !isAuthenticated) {
      toast({ title: "Inserisci il tuo nome", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    const newFeedback: Feedback = {
      id: Date.now().toString(),
      name: name || user?.name || "Anonimo",
      avatar: user?.avatar,
      rating,
      comment: comment.trim(),
      date: new Date().toISOString(),
      likes: 0,
      likedBy: [],
    };

    saveFeedbacks([newFeedback, ...feedbacks]);
    setRating(0);
    setComment("");
    setIsSubmitting(false);
    
    toast({ title: "Grazie per il tuo feedback!" });
  };

  const handleLike = (feedbackId: string) => {
    const visitorId = user?.id || localStorage.getItem("visitor_id") || Date.now().toString();
    if (!localStorage.getItem("visitor_id") && !user?.id) {
      localStorage.setItem("visitor_id", visitorId);
    }

    const updated = feedbacks.map(f => {
      if (f.id === feedbackId) {
        const hasLiked = f.likedBy.includes(visitorId);
        return {
          ...f,
          likes: hasLiked ? f.likes - 1 : f.likes + 1,
          likedBy: hasLiked 
            ? f.likedBy.filter(id => id !== visitorId)
            : [...f.likedBy, visitorId],
        };
      }
      return f;
    });

    saveFeedbacks(updated);
  };

  const averageRating = feedbacks.length > 0
    ? (feedbacks.reduce((acc, f) => acc + f.rating, 0) / feedbacks.length).toFixed(1)
    : "0.0";

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="font-display text-2xl text-foreground">{title}</h3>
          <p className="text-muted-foreground text-sm">{feedbacks.length} recensioni</p>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
          <Star className="h-6 w-6 fill-primary text-primary" />
          <span className="font-display text-2xl text-primary">{averageRating}</span>
          <span className="text-muted-foreground text-sm">/5</span>
        </div>
      </div>

      {/* Feedback form */}
      <Card className="border-primary/20">
        <CardContent className="p-4 space-y-4">
          {/* Star rating */}
          <div className="space-y-2">
            <label className="text-sm font-medium">La tua valutazione</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      star <= (hoverRating || rating)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Name input (only if not logged in) */}
          {!isAuthenticated && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Il tuo nome</label>
              <Input
                placeholder="Come vuoi essere chiamato?"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          {/* Comment */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Il tuo commento</label>
            <Textarea
              placeholder="Condividi la tua esperienza..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-gradient-roma text-white"
          >
            <Send className="h-4 w-4 mr-2" />
            {isSubmitting ? "Invio..." : "Invia Feedback"}
          </Button>
        </CardContent>
      </Card>

      {/* Feedback list */}
      <div className="space-y-4">
        {feedbacks.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            Nessun feedback ancora. Sii il primo a lasciare una recensione!
          </p>
        ) : (
          feedbacks.map((feedback) => {
            const visitorId = user?.id || localStorage.getItem("visitor_id") || "";
            const hasLiked = feedback.likedBy.includes(visitorId);

            return (
              <Card key={feedback.id} className="border-border">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      {feedback.avatar ? (
                        <AvatarImage src={feedback.avatar} alt={feedback.name} />
                      ) : null}
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {feedback.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">{feedback.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            {formatDate(feedback.date)}
                          </span>
                        </div>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= feedback.rating
                                  ? "fill-primary text-primary"
                                  : "text-muted-foreground/30"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-foreground/80 mt-2">{feedback.comment}</p>
                      <button
                        onClick={() => handleLike(feedback.id)}
                        className={`flex items-center gap-1 mt-2 text-xs transition-colors ${
                          hasLiked ? "text-primary" : "text-muted-foreground hover:text-primary"
                        }`}
                      >
                        <ThumbsUp className={`h-3 w-3 ${hasLiked ? "fill-primary" : ""}`} />
                        {feedback.likes > 0 && <span>{feedback.likes}</span>}
                        <span className="ml-1">Utile</span>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FeedbackSection;
```

---

## 📋 VARIABILI AMBIENTE (.env)

Crea un file `.env` nella root del progetto con queste variabili:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## 🚀 COME ATTIVARE FIREBASE

1. Vai su [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuovo progetto
3. Vai su Project Settings > General > Your Apps
4. Aggiungi una Web App
5. Copia le credenziali nel file `.env`
6. Abilita:
   - Authentication > Email/Password e Google
   - Firestore Database
   - Storage

---

## 📝 NOTE

- Senza configurare Firebase, tutto funziona con `localStorage` come fallback
- Il codice è già pronto per Firebase, basta aggiungere le variabili ambiente
- Tutte le operazioni CRUD sono gestite con fallback automatico
