import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Clock, User, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = ["Tutti", "Partite", "Calciomercato", "Leggende", "Storia", "News", "Interviste"];

const articles = [
  {
    id: 1,
    title: "Roma-Lazio: Il Derby della Capitale",
    excerpt: "Tutto quello che devi sapere sul derby più sentito d'Italia. La rivalità storica, i protagonisti e le emozioni che solo questa sfida può regalare.",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    author: "Marco Rossi",
    date: "2 ore fa",
    category: "Partite",
    featured: true,
  },
  {
    id: 2,
    title: "La Storia del Capitano Francesco Totti",
    excerpt: "25 anni di amore giallorosso, 307 gol e infinite emozioni. Il racconto completo della leggenda romanista.",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800",
    author: "Giulia Bianchi",
    date: "5 ore fa",
    category: "Leggende",
    featured: true,
  },
  {
    id: 3,
    title: "Nuovo Stadio: Gli Ultimi Aggiornamenti",
    excerpt: "Il progetto del nuovo stadio della Roma procede. Ecco tutti i dettagli sulla nuova casa giallorossa.",
    image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800",
    author: "Luca Verdi",
    date: "1 giorno fa",
    category: "News",
    featured: false,
  },
  {
    id: 4,
    title: "Calciomercato: I Nuovi Obiettivi",
    excerpt: "Le ultime indiscrezioni sul mercato della Roma. Nomi caldi e possibili colpi in entrata e uscita.",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800",
    author: "Andrea Neri",
    date: "2 giorni fa",
    category: "Calciomercato",
    featured: false,
  },
  {
    id: 5,
    title: "Daniele De Rossi: Il Cuore di Roma",
    excerpt: "La storia del centrocampista che ha dedicato la carriera alla maglia giallorossa. Grinta, talento e romanismo.",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800",
    author: "Paolo Conti",
    date: "3 giorni fa",
    category: "Leggende",
    featured: false,
  },
  {
    id: 6,
    title: "Lo Scudetto del 2001: 18 Anni Dopo",
    excerpt: "Il racconto dello storico tricolore conquistato dalla Roma di Capello. I protagonisti e le emozioni di quella stagione indimenticabile.",
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800",
    author: "Maria Russo",
    date: "4 giorni fa",
    category: "Storia",
    featured: false,
  },
  {
    id: 7,
    title: "Intervista Esclusiva: I Ricordi di Cafu",
    excerpt: "Il terzino brasiliano racconta i suoi anni alla Roma tra emozioni, trofei e l'amore per la città eterna.",
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800",
    author: "Francesco Gialli",
    date: "5 giorni fa",
    category: "Interviste",
    featured: false,
  },
  {
    id: 8,
    title: "Youth League: I Talenti del Futuro",
    excerpt: "La Primavera della Roma sta sfornando talenti. Ecco i giovani pronti a conquistare la prima squadra.",
    image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800",
    author: "Sara Martini",
    date: "1 settimana fa",
    category: "News",
    featured: false,
  },
];

const Articoli = () => {
  const [activeCategory, setActiveCategory] = useState("Tutti");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = activeCategory === "Tutti" || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = filteredArticles.filter((a) => a.featured);
  const regularArticles = filteredArticles.filter((a) => !a.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-roma relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920')] bg-cover bg-center" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/60" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="font-display text-5xl md:text-7xl text-white text-center mb-4 drop-shadow-lg">
            Articoli
          </h1>
          <p className="text-white/90 text-center text-lg max-w-2xl mx-auto drop-shadow">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-roma-maroon via-roma-maroon/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block bg-roma-gold text-roma-maroon px-3 py-1 rounded-full text-xs font-semibold mb-3">
                      {article.category}
                    </span>
                    <h3 className="font-display text-3xl text-white mb-2 group-hover:text-roma-gold transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-white/80 mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-white/60">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {article.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {article.date}
                      </div>
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
                className="group bg-card rounded-xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all duration-300 cursor-pointer opacity-0 animate-fade-in"
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
                </div>
                <div className="p-4">
                  <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{article.author}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="gap-2">
              Carica altri articoli
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Articoli;
