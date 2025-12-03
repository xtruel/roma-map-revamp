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
