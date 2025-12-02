import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MapSection from "@/components/MapSection";
import { MapPin, Star, Clock, Phone } from "lucide-react";

const featuredPlaces = [
  {
    name: "Stadio Olimpico",
    category: "Monumento",
    description: "La casa della Roma dal 1953. Capacità 72.698 posti.",
    address: "Viale dei Gladiatori, 00135 Roma",
    hours: "Tour: 10:00 - 18:00",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=600",
  },
  {
    name: "Centro Sportivo Fulvio Bernardini",
    category: "Allenamento",
    description: "Il centro di allenamento della prima squadra a Trigoria.",
    address: "Via di Trigoria, 00128 Roma",
    hours: "Non visitabile",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600",
  },
  {
    name: "AS Roma Store - Via del Corso",
    category: "Shopping",
    description: "Il flagship store ufficiale nel cuore di Roma.",
    address: "Via del Corso 34, 00186 Roma",
    hours: "10:00 - 20:00",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600",
  },
];

const Mappa = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-roma">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-5xl md:text-7xl text-white text-center mb-4">
            Mappa Giallorossa
          </h1>
          <p className="text-white/80 text-center text-lg max-w-2xl mx-auto">
            Scopri tutti i luoghi iconici della Roma nella Città Eterna
          </p>
        </div>
      </section>

      {/* Featured Places */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl text-foreground mb-8">Luoghi Imperdibili</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {featuredPlaces.map((place, index) => (
              <div
                key={place.name}
                className="group bg-card rounded-xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all duration-300 opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    {place.category}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-xl text-foreground">{place.name}</h3>
                    <div className="flex items-center gap-1 text-roma-gold">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-semibold">{place.rating}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">{place.description}</p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      {place.address}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      {place.hours}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Map */}
      <MapSection />

      <Footer />
    </div>
  );
};

export default Mappa;
