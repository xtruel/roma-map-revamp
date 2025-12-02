import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleMapSection from "@/components/GoogleMapSection";
import { MapPin, Star, Clock } from "lucide-react";
import { getPlaces, categories } from "@/data/places";

const Mappa = () => {
  const places = getPlaces();
  const featuredPlaces = places.slice(0, 3);

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
            Scopri tutti i {places.length} luoghi iconici della Roma nella Città Eterna
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
                key={place.id}
                className="group bg-card rounded-xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all duration-300 opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span 
                    className="absolute top-3 left-3 text-white px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: categories.find(c => c.id === place.category)?.color }}
                  >
                    {categories.find(c => c.id === place.category)?.label}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-xl text-foreground">{place.name}</h3>
                    <div className="flex items-center gap-1 text-roma-gold">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-semibold">4.9</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{place.description}</p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      {place.address}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Map */}
      <GoogleMapSection />

      <Footer />
    </div>
  );
};

export default Mappa;
