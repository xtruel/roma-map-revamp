import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  className?: string;
  aspectRatio?: "square" | "video" | "wide";
}

const ImageUpload = ({ value, onChange, className, aspectRatio = "video" }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[21/9]",
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Per favore seleziona un'immagine valida");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("L'immagine non può superare i 5MB");
      return;
    }

    setIsUploading(true);

    try {
      // Convert to base64 for local storage simulation
      // In production, this would upload to Firebase Storage
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
        setIsUploading(false);
      };
      reader.onerror = () => {
        alert("Errore durante il caricamento dell'immagine");
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Upload error:", error);
      setIsUploading(false);
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
              <span className="text-xs text-muted-foreground">oppure trascina qui (max 5MB)</span>
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
