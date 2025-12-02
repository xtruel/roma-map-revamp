import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import AdminLayout from "@/components/admin/AdminLayout";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit2, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  date: string;
  status: "published" | "draft";
}

const ARTICLES_KEY = "roma_articles";

const defaultArticles: Article[] = [
  { id: "1", title: "La Roma vince il Derby!", excerpt: "Una vittoria storica contro i biancocelesti", content: "Contenuto completo dell'articolo...", category: "Partite", image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=600", author: "Marco Rossi", date: "2024-01-15", status: "published" },
  { id: "2", title: "Intervista esclusiva al capitano", excerpt: "Le parole del leader giallorosso", content: "Contenuto completo...", category: "Interviste", image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600", author: "Giulia Bianchi", date: "2024-01-14", status: "published" },
  { id: "3", title: "Calciomercato: nuovi arrivi", excerpt: "I rinforzi per la seconda parte di stagione", content: "Contenuto completo...", category: "Mercato", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600", author: "Luca Verdi", date: "2024-01-13", status: "draft" },
];

const categories = ["Partite", "Interviste", "Mercato", "Storia", "Community", "Eventi"];

const AdminArticles = () => {
  const { isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState<Partial<Article>>({
    title: "", excerpt: "", content: "", category: "", image: "", author: "", status: "draft"
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
      return;
    }
    const stored = localStorage.getItem(ARTICLES_KEY);
    setArticles(stored ? JSON.parse(stored) : defaultArticles);
  }, [isAuthenticated, navigate]);

  const saveArticles = (newArticles: Article[]) => {
    localStorage.setItem(ARTICLES_KEY, JSON.stringify(newArticles));
    setArticles(newArticles);
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.category) {
      toast({ title: "Errore", description: "Compila tutti i campi obbligatori", variant: "destructive" });
      return;
    }

    if (editingArticle) {
      const updated = articles.map(a => a.id === editingArticle.id ? { ...a, ...formData } : a);
      saveArticles(updated);
      toast({ title: "Articolo aggiornato" });
    } else {
      const newArticle: Article = {
        ...formData as Article,
        id: Date.now().toString(),
        date: new Date().toISOString().split("T")[0],
        author: formData.author || "Admin"
      };
      saveArticles([newArticle, ...articles]);
      toast({ title: "Articolo creato" });
    }

    setIsDialogOpen(false);
    setEditingArticle(null);
    setFormData({ title: "", excerpt: "", content: "", category: "", image: "", author: "", status: "draft" });
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData(article);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    saveArticles(articles.filter(a => a.id !== id));
    toast({ title: "Articolo eliminato" });
  };

  const filteredArticles = articles.filter(a => 
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  if (!isAuthenticated) return null;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-display text-4xl text-foreground">Articoli</h1>
            <p className="text-muted-foreground">Gestisci gli articoli del sito</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-roma text-white" onClick={() => { setEditingArticle(null); setFormData({ title: "", excerpt: "", content: "", category: "", image: "", author: "", status: "draft" }); }}>
                <Plus className="h-4 w-4 mr-2" /> Nuovo Articolo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingArticle ? "Modifica Articolo" : "Nuovo Articolo"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Titolo *</Label>
                  <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Categoria *</Label>
                  <Select value={formData.category} onValueChange={v => setFormData({ ...formData, category: v })}>
                    <SelectTrigger><SelectValue placeholder="Seleziona categoria" /></SelectTrigger>
                    <SelectContent>
                      {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Estratto</Label>
                  <Input value={formData.excerpt} onChange={e => setFormData({ ...formData, excerpt: e.target.value })} placeholder="Breve descrizione dell'articolo..." />
                </div>
                <div className="space-y-2">
                  <Label>Contenuto</Label>
                  <RichTextEditor 
                    content={formData.content || ""} 
                    onChange={(content) => setFormData({ ...formData, content })} 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>URL Immagine</Label>
                    <Input value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Autore</Label>
                    <Input value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Stato</Label>
                  <Select value={formData.status} onValueChange={v => setFormData({ ...formData, status: v as "published" | "draft" })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Bozza</SelectItem>
                      <SelectItem value="published">Pubblicato</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleSubmit} className="w-full bg-gradient-roma text-white">
                  {editingArticle ? "Salva Modifiche" : "Crea Articolo"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Cerca articoli..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>

        <div className="grid gap-4">
          {filteredArticles.map(article => (
            <Card key={article.id} className="border-border hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {article.image && (
                    <img src={article.image} alt={article.title} className="w-24 h-24 object-cover rounded-lg" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-display text-xl text-foreground">{article.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">{article.category}</span>
                          <span className={`text-xs px-2 py-0.5 rounded ${article.status === "published" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"}`}>
                            {article.status === "published" ? "Pubblicato" : "Bozza"}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="icon" variant="ghost" onClick={() => handleEdit(article)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete(article.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{article.excerpt}</p>
                    <p className="text-xs text-muted-foreground mt-2">{article.author} • {article.date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminArticles;
