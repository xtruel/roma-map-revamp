import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Calendar, Clock, MapPin, Tv, Ticket, Bus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMatches, usePackages } from "@/hooks/usePublicData";

const Partite = () => {
  const { upcomingMatches, nextMatch, loading } = useMatches();
  const { trasfertaPackages } = usePackages();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("it-IT", { 
      weekday: "long",
      day: "numeric", 
      month: "long", 
      year: "numeric" 
    });
  };

  const formatShortDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("it-IT", { day: "numeric", month: "short" });
  };

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
        title="Prossime Partite AS Roma"
        description="Calendario partite AS Roma: Serie A, Europa League, Coppa Italia. Acquista biglietti e pacchetti trasferta per seguire i giallorossi."
        type="website"
      />
      <Header />
      
      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-roma">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-5xl md:text-7xl text-white text-center mb-4">
            Prossime Partite
          </h1>
          <p className="text-white/80 text-center text-lg max-w-2xl mx-auto">
            Segui tutti gli impegni della Roma in Serie A, Europa League e Coppa Italia
          </p>
        </div>
      </section>

      {/* Next Match Highlight */}
      {nextMatch && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="bg-card rounded-3xl shadow-2xl overflow-hidden border-4 border-roma-gold/30">
              <div className="bg-gradient-roma p-4 text-center">
                <span className="text-roma-gold font-semibold">PROSSIMA PARTITA</span>
              </div>
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                  {/* Home Team */}
                  <div className="text-center">
                    <div className={`w-24 h-24 ${nextMatch.homeTeam === "Roma" ? "bg-roma-red" : "bg-muted"} rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg`}>
                      <span className={`font-display text-3xl ${nextMatch.homeTeam === "Roma" ? "text-roma-gold" : "text-foreground"}`}>
                        {nextMatch.homeTeam.substring(0, 3).toUpperCase()}
                      </span>
                    </div>
                    <h3 className={`font-display text-3xl ${nextMatch.homeTeam === "Roma" ? "text-primary" : "text-foreground"}`}>
                      {nextMatch.homeTeam}
                    </h3>
                  </div>

                  {/* Match Info */}
                  <div className="text-center">
                    <div className="font-display text-6xl text-primary mb-2">VS</div>
                    <div className="flex flex-col gap-2 text-muted-foreground">
                      <div className="flex items-center justify-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {formatDate(nextMatch.date)}
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Clock className="h-4 w-4" />
                        {nextMatch.time}
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {nextMatch.stadium}
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Tv className="h-4 w-4" />
                        {nextMatch.broadcast}
                      </div>
                    </div>
                    <span className="inline-block mt-4 bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-semibold">
                      {nextMatch.competition}
                    </span>
                  </div>

                  {/* Away Team */}
                  <div className="text-center">
                    <div className={`w-24 h-24 ${nextMatch.awayTeam === "Roma" ? "bg-roma-red" : "bg-muted"} rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg`}>
                      <span className={`font-display text-3xl ${nextMatch.awayTeam === "Roma" ? "text-roma-gold" : "text-foreground"}`}>
                        {nextMatch.awayTeam.substring(0, 3).toUpperCase()}
                      </span>
                    </div>
                    <h3 className={`font-display text-3xl ${nextMatch.awayTeam === "Roma" ? "text-primary" : "text-foreground"}`}>
                      {nextMatch.awayTeam}
                    </h3>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                  {nextMatch.ticketsAvailable ? (
                    <Button asChild size="lg" className="bg-roma-gold text-roma-maroon hover:bg-roma-gold-light">
                      <Link to={`/checkout?package=Biglietto ${nextMatch.homeTeam} vs ${nextMatch.awayTeam}&qty=1&price=${nextMatch.ticketPrice || 45}`}>
                        <Ticket className="h-5 w-5 mr-2" />
                        Acquista Biglietti - €{nextMatch.ticketPrice || 45}
                      </Link>
                    </Button>
                  ) : (
                    <Button size="lg" disabled variant="outline">
                      <Ticket className="h-5 w-5 mr-2" />
                      Biglietti Esauriti
                    </Button>
                  )}
                  <Button asChild size="lg" variant="outline">
                    <Link to="/pacchetti">
                      Vedi Pacchetti Esperienza
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Matches */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl text-center mb-8">Calendario Completo</h2>
          
          <div className="space-y-4">
            {upcomingMatches.map((match, index) => (
              <div
                key={match.id}
                className="bg-card rounded-xl p-6 shadow-lg border border-border hover:border-primary/50 transition-all duration-300 opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col lg:flex-row items-center gap-4">
                  {/* Match Badge */}
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${match.isHome ? "bg-primary/10 text-primary" : "bg-blue-500/10 text-blue-500"}`}>
                    {match.isHome ? "CASA" : "TRASFERTA"}
                  </div>

                  {/* Teams */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-center min-w-24">
                      <span className={`font-display text-xl ${match.homeTeam === "Roma" ? "text-primary" : "text-foreground"}`}>
                        {match.homeTeam}
                      </span>
                    </div>
                    <div className="text-center px-4">
                      <div className="font-display text-2xl text-muted-foreground">VS</div>
                    </div>
                    <div className="text-center min-w-24">
                      <span className={`font-display text-xl ${match.awayTeam === "Roma" ? "text-primary" : "text-foreground"}`}>
                        {match.awayTeam}
                      </span>
                    </div>
                  </div>
                  
                  {/* Match Info */}
                  <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                    <span className="bg-secondary px-3 py-1 rounded-full">{match.competition}</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatShortDate(match.date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {match.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {match.stadium}
                    </div>
                    <div className="flex items-center gap-1">
                      <Tv className="h-4 w-4" />
                      {match.broadcast}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    {match.ticketsAvailable ? (
                      <Button asChild className="bg-gradient-roma text-white">
                        <Link to={`/checkout?package=Biglietto ${match.homeTeam} vs ${match.awayTeam}&qty=1&price=${match.ticketPrice || 45}`}>
                          €{match.ticketPrice || 45} - Acquista
                        </Link>
                      </Button>
                    ) : (
                      <Button disabled variant="outline">
                        Esaurito
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {upcomingMatches.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                Nessuna partita in programma al momento.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trasferte Section */}
      {trasfertaPackages.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl text-foreground mb-4">
                <Bus className="inline-block h-10 w-10 mr-3 text-primary" />
                Pacchetti Trasferta
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Segui la Roma in trasferta con i nostri pacchetti all-inclusive
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trasfertaPackages.map((pkg, index) => (
                <div
                  key={pkg.id}
                  className="bg-card rounded-xl p-6 shadow-lg border border-border hover:border-blue-500/50 transition-all duration-300 opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Bus className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-foreground">{pkg.name}</h3>
                      {pkg.duration && <span className="text-sm text-muted-foreground">{pkg.duration}</span>}
                    </div>
                    {pkg.popular && (
                      <span className="bg-roma-gold text-roma-maroon text-xs px-2 py-0.5 rounded-full ml-auto">
                        Popolare
                      </span>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4">{pkg.description}</p>
                  
                  {pkg.transport && (
                    <div className="bg-blue-500/5 rounded-lg p-3 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-blue-500">
                        <span className="font-semibold">{pkg.transport.type.toUpperCase()}</span>
                        <span>•</span>
                        <span>Partenza: {pkg.transport.orario}</span>
                      </div>
                      <div className="text-muted-foreground mt-1">
                        {pkg.transport.partenza} → {pkg.transport.arrivo}
                      </div>
                    </div>
                  )}
                  
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="font-display text-2xl text-primary">€{pkg.price}</span>
                    <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white">
                      <Link to={`/checkout?package=${encodeURIComponent(pkg.name)}&qty=1&price=${pkg.price}`}>
                        Prenota
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-gradient-roma">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-4xl text-white mb-4">
            Vuoi un'esperienza completa?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Scopri i nostri pacchetti esperienza che includono biglietto, tour e molto altro
          </p>
          <Button asChild size="lg" className="bg-roma-gold text-roma-maroon hover:bg-roma-gold-light">
            <Link to="/pacchetti">
              Vedi Tutti i Pacchetti
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Partite;
