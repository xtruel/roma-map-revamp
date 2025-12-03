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
