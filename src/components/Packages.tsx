import { Link } from "react-router-dom";
import { Check, Star, Ticket, MapPin, Users, Bus, ArrowRight, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { usePackages, useMatches } from "@/hooks/usePublicData";
import { useAdmin } from "@/contexts/AdminContext";
import AdminEditButton from "./AdminEditButton";

const Packages = () => {
  const { activePackages, loading } = usePackages();
  const { nextMatch } = useMatches();
  const { isAuthenticated: isAdmin } = useAdmin();

  // Show 4 featured packages
  const featuredPackages = activePackages
    .sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0))
    .slice(0, 4);

  const typeIcons = {
    biglietto: Ticket,
    esperienza: Star,
    trasferta: Bus,
    tour: MapPin,
  };

  if (loading) {
    return (
      <section id="pacchetti" className="py-20 bg-gradient-roma">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse text-white">Caricamento...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="pacchetti" className="py-20 bg-gradient-roma">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="font-display text-5xl md:text-6xl text-white">
              Pacchetti & Biglietti
            </h2>
            {isAdmin && (
              <AdminEditButton to="/admin/pacchetti" label="Gestisci" variant="button" className="bg-white/20 border-white/30 text-white hover:bg-white/30" />
            )}
          </div>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Scegli l'esperienza perfetta per vivere la passione giallorossa
          </p>
          {nextMatch && (
            <div className="mt-6 inline-flex items-center gap-3 bg-white/10 backdrop-blur px-6 py-3 rounded-full">
              <span className="text-roma-gold font-semibold">Prossima partita:</span>
              <span className="text-white">
                {nextMatch.homeTeam} vs {nextMatch.awayTeam}
              </span>
              <Link 
                to="/partite" 
                className="text-roma-gold hover:text-roma-gold-light flex items-center gap-1"
              >
                Vedi calendario <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPackages.map((pkg, index) => {
            const Icon = typeIcons[pkg.type];
            return (
              <div
                key={pkg.id}
                className={`relative bg-card rounded-2xl p-6 shadow-xl opacity-0 animate-fade-in ${
                  pkg.popular ? "ring-4 ring-roma-gold scale-105" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-roma-gold text-roma-maroon px-4 py-1 rounded-full text-xs font-bold">
                    PIÙ POPOLARE
                  </div>
                )}
                
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-4">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                
                <h3 className="font-display text-2xl text-foreground mb-1">
                  {pkg.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {pkg.description}
                </p>
                
                <div className="mb-6">
                  <span className="font-display text-4xl text-primary">€{pkg.price}</span>
                  <span className="text-muted-foreground">/persona</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {pkg.features.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="h-5 w-5 text-roma-gold flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  asChild
                  className={`w-full ${
                    pkg.popular
                      ? "bg-roma-gold text-roma-maroon hover:bg-roma-gold-light"
                      : "bg-gradient-roma text-white hover:opacity-90"
                  }`}
                >
                  <Link to={`/checkout?package=${encodeURIComponent(pkg.name)}&qty=1&price=${pkg.price}`}>
                    Acquista
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-white text-roma-maroon hover:bg-white/90">
            <Link to="/pacchetti">
              <Ticket className="h-5 w-5 mr-2" />
              Tutti i Pacchetti
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            <Link to="/partite">
              <MapPin className="h-5 w-5 mr-2" />
              Calendario Partite
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Packages;
