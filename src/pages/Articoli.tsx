import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SocialShare from "@/components/SocialShare";
import AdminEditButton from "@/components/AdminEditButton";
import { ArrowRight, Clock, User, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useArticles } from "@/hooks/usePublicData";
import { useAdmin } from "@/contexts/AdminContext";

const categories = ["Tutti", "Partite", "Calciomercato", "Leggende", "Storia", "News", "Interviste", "Guide"];

const Articoli = () => {
  const [activeCategory, setActiveCategory] = useState("Tutti");
  const [searchQuery, setSearchQuery] = useState("");
  const { publishedArticles, loading } = useArticles();
  const { isAuthenticated: isAdmin } = useAdmin();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Oggi";
    if (diffDays === 1) return "Ieri";
    if (diffDays < 7) return `${diffDays} giorni fa`;
    return date.toLocaleDateString("it-IT", { day: "numeric", month: "short" });
  };

  const filteredArticles = publishedArticles.filter((article) => {
    const matchesCategory = activeCategory === "Tutti" || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = filteredArticles.filter((a) => a.featured);
  const regularArticles = filteredArticles.filter((a) => !a.featured);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary">Caricamento...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Articoli e News Giallorosse"
        description="Tutte le notizie, le storie e gli approfondimenti dal mondo giallorosso. Leggende, partite, calciomercato e storia della AS Roma."
        type="website"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-roma relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920')] bg-cover bg-center" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/60" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center gap-4">
            <h1 className="font-display text-5xl md:text-7xl text-white text-center drop-shadow-lg">
              Articoli
            </h1>
            {isAdmin && (
              <AdminEditButton to="/admin/articoli" label="Gestisci Articoli" variant="button" />
            )}
          </div>
          <p className="text-white/90 text-center text-lg max-w-2xl mx-auto mt-4 drop-shadow">
            Tutte le notizie, le storie e gli approfondimenti dal mondo giallorosso
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border sticky top-16 bg-background/95 backdrop-blur-md z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(cat)}
                  className={activeCategory === cat ? "bg-gradient-roma text-white" : ""}
                >
                  {cat}
                </Button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cerca articoli..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl text-foreground mb-8">In Evidenza</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map((article, index) => (
                <article
                  key={article.id}
                  className="group relative rounded-2xl overflow-hidden shadow-xl cursor-pointer opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-roma-rosso via-roma-rosso/50 to-transparent" />
                  
                  {/* Admin Edit Button */}
                  {isAdmin && (
                    <div className="absolute top-4 right-4 z-10">
                      <AdminEditButton to="/admin/articoli" />
                    </div>
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block bg-roma-giallo text-roma-rosso px-3 py-1 rounded-full text-xs font-semibold mb-3">
                      {article.category}
                    </span>
                    <h3 className="font-display text-3xl text-white mb-2 group-hover:text-roma-giallo transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-white/80 mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {article.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {formatDate(article.date)}
                        </div>
                      </div>
                      <SocialShare 
                        title={article.title}
                        description={article.excerpt}
                        image={article.image}
                        type="article"
                        className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl text-foreground mb-8">Tutti gli Articoli</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {regularArticles.map((article, index) => (
              <article
                key={article.id}
                className="group bg-card rounded-xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all duration-300 cursor-pointer opacity-0 animate-fade-in relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold">
                    {article.category}
                  </span>
                  {isAdmin && (
                    <div className="absolute top-3 right-3">
                      <AdminEditButton to="/admin/articoli" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{article.author}</span>
                      <span>•</span>
                      <span>{formatDate(article.date)}</span>
                    </div>
                    <SocialShare 
                      title={article.title}
                      description={article.excerpt}
                      image={article.image}
                      type="article"
                      className="h-8 px-2 text-xs"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          {filteredArticles.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              Nessun articolo trovato.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Articoli;
