import { ArrowRight, Clock, User } from "lucide-react";
import { Button } from "./ui/button";

const articles = [
  {
    id: 1,
    title: "Roma-Lazio: Il Derby della Capitale",
    excerpt: "Tutto quello che devi sapere sul derby più sentito d'Italia...",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600",
    author: "Marco Rossi",
    date: "2 ore fa",
    category: "Partite",
  },
  {
    id: 2,
    title: "La Storia del Capitano",
    excerpt: "Francesco Totti: 25 anni di amore giallorosso...",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600",
    author: "Giulia Bianchi",
    date: "5 ore fa",
    category: "Leggende",
  },
  {
    id: 3,
    title: "Nuovo Stadio: Gli Ultimi Aggiornamenti",
    excerpt: "Il progetto del nuovo stadio della Roma procede...",
    image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=600",
    author: "Luca Verdi",
    date: "1 giorno fa",
    category: "News",
  },
];

const Articles = () => {
  return (
    <section id="articoli" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="font-display text-5xl md:text-6xl text-foreground mb-2">
              Ultimi Articoli
            </h2>
            <p className="text-muted-foreground">
              Le ultime notizie dal mondo giallorosso
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex gap-2">
            Tutti gli articoli
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <article
              key={article.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all duration-300 opacity-0 animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  {article.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl text-foreground mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
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

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" className="gap-2">
            Tutti gli articoli
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Articles;
