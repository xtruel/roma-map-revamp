import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Trophy, Calendar, Star } from "lucide-react";

const trophies = [
  {
    id: 1,
    name: "Serie A",
    count: 3,
    years: ["1941-42", "1982-83", "2000-01"],
    icon: "🏆",
    color: "from-amber-400 to-amber-600",
  },
  {
    id: 2,
    name: "Coppa Italia",
    count: 9,
    years: ["1963-64", "1968-69", "1979-80", "1980-81", "1983-84", "1985-86", "1990-91", "2006-07", "2007-08"],
    icon: "🏆",
    color: "from-blue-400 to-blue-600",
  },
  {
    id: 3,
    name: "Supercoppa Italiana",
    count: 2,
    years: ["2001", "2007"],
    icon: "🏆",
    color: "from-green-400 to-green-600",
  },
  {
    id: 4,
    name: "Conference League",
    count: 1,
    years: ["2021-22"],
    icon: "🏆",
    color: "from-emerald-400 to-emerald-600",
  },
  {
    id: 5,
    name: "Coppa delle Fiere",
    count: 1,
    years: ["1960-61"],
    icon: "🏆",
    color: "from-purple-400 to-purple-600",
  },
];

const historicMoments = [
  {
    year: "1927",
    title: "La Fondazione",
    description: "Nasce l'AS Roma dalla fusione di Alba, Fortitudo e Roman",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600",
  },
  {
    year: "1942",
    title: "Primo Scudetto",
    description: "La Roma conquista il suo primo titolo di Campione d'Italia",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600",
  },
  {
    year: "1983",
    title: "Secondo Scudetto",
    description: "La Roma di Liedholm vince il campionato con Falcao, Conti e Bruno",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600",
  },
  {
    year: "2001",
    title: "Terzo Scudetto",
    description: "Lo scudetto di Capello con Totti, Batistuta e Montella",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600",
  },
  {
    year: "2022",
    title: "Conference League",
    description: "Mourinho porta la Roma a vincere il primo trofeo europeo della sua storia",
    image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=600",
  },
];

const legends = [
  { name: "Francesco Totti", role: "Attaccante", years: "1992-2017", goals: 307 },
  { name: "Daniele De Rossi", role: "Centrocampista", years: "2001-2019", goals: 63 },
  { name: "Agostino Di Bartolomei", role: "Centrocampista", years: "1972-1984", goals: 40 },
  { name: "Bruno Conti", role: "Ala", years: "1973-1991", goals: 44 },
  { name: "Roberto Pruzzo", role: "Attaccante", years: "1978-1988", goals: 138 },
  { name: "Paulo Roberto Falcão", role: "Centrocampista", years: "1980-1985", goals: 22 },
];

const Trofei = () => {
  const totalTrophies = trophies.reduce((acc, t) => acc + t.count, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-roma relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <Trophy className="w-96 h-96 text-roma-gold" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="font-display text-5xl md:text-7xl text-white text-center mb-4">
            Bacheca dei Trofei
          </h1>
          <p className="text-white/80 text-center text-lg max-w-2xl mx-auto mb-8">
            97 anni di storia, passione e trionfi. Ecco l'albo d'oro dell'AS Roma.
          </p>
          <div className="text-center">
            <span className="inline-block bg-roma-gold text-roma-maroon px-8 py-4 rounded-full">
              <span className="font-display text-5xl">{totalTrophies}</span>
              <span className="ml-2 text-lg font-semibold">Trofei Totali</span>
            </span>
          </div>
        </div>
      </section>

      {/* Trophies Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trophies.map((trophy, index) => (
              <div
                key={trophy.id}
                className="bg-card rounded-2xl p-8 shadow-xl border border-border hover:shadow-2xl transition-all duration-300 opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${trophy.color} mb-6 shadow-lg`}>
                  <span className="text-4xl">{trophy.icon}</span>
                </div>
                
                <h3 className="font-display text-3xl text-foreground mb-2">
                  {trophy.name}
                </h3>
                
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="h-5 w-5 text-roma-gold" />
                  <span className="font-display text-4xl text-primary">{trophy.count}</span>
                  <span className="text-muted-foreground">volte</span>
                </div>
                
                <div className="space-y-2">
                  <span className="text-sm font-semibold text-muted-foreground">STAGIONI:</span>
                  <div className="flex flex-wrap gap-2">
                    {trophy.years.map((year) => (
                      <span
                        key={year}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {year}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl text-foreground text-center mb-4">
            Momenti Storici
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            I momenti che hanno scritto la leggenda giallorossa
          </p>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary/20 -translate-x-1/2 hidden md:block" />
            
            <div className="space-y-12">
              {historicMoments.map((moment, index) => (
                <div
                  key={moment.year}
                  className={`flex flex-col md:flex-row items-center gap-8 opacity-0 animate-fade-in ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="bg-card rounded-xl p-6 shadow-lg border border-border inline-block">
                      <span className="font-display text-5xl text-roma-gold">{moment.year}</span>
                      <h3 className="font-display text-2xl text-foreground mt-2">{moment.title}</h3>
                      <p className="text-muted-foreground mt-2">{moment.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-roma flex items-center justify-center shadow-xl z-10 relative">
                      <Star className="h-8 w-8 text-roma-gold" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <img
                      src={moment.image}
                      alt={moment.title}
                      className="w-full max-w-sm rounded-xl shadow-xl mx-auto"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Legends */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl text-foreground text-center mb-4">
            Le Leggende
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            I giocatori che hanno scritto la storia della Roma
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {legends.map((legend, index) => (
              <div
                key={legend.name}
                className="group bg-card rounded-xl p-6 shadow-lg border border-border hover:border-roma-gold transition-all duration-300 opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-roma flex items-center justify-center shadow-lg">
                    <span className="font-display text-2xl text-roma-gold">
                      {legend.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-foreground group-hover:text-primary transition-colors">
                      {legend.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">{legend.role}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border flex justify-between text-sm">
                  <div>
                    <span className="text-muted-foreground">Anni: </span>
                    <span className="font-semibold text-foreground">{legend.years}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Gol: </span>
                    <span className="font-semibold text-primary">{legend.goals}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Trofei;
