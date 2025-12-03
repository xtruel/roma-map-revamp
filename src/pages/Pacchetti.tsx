import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SocialShare from "@/components/SocialShare";
import { Check, Star, Ticket, MapPin, Users, Bus, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePackages, useMatches } from "@/hooks/usePublicData";

const Pacchetti = () => {
  const { ticketPackages, experiencePackages, trasfertaPackages, tourPackages, loading } = usePackages();
  const { upcomingMatches, nextMatch } = useMatches();

  const typeIcons = {
    biglietto: Ticket,
    esperienza: Star,
    trasferta: Bus,
    tour: MapPin,
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
        title="Pacchetti e Biglietti"
        description="Biglietti partita, pacchetti esperienza, trasferte in bus e tour giallorossi. Vivi la tua passione per la Roma con le nostre offerte esclusive."
        type="website"
      />
      <Header />
      
      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-roma relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=1920')] bg-cover bg-center" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="font-display text-5xl md:text-7xl text-white text-center mb-4">
            Pacchetti & Biglietti
          </h1>
          <p className="text-white/80 text-center text-lg max-w-2xl mx-auto">
            Scegli l'esperienza perfetta per vivere la tua passione giallorossa
          </p>
        </div>
      </section>

      {/* Next Match Banner */}
      {nextMatch && (
        <section className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Prossima partita</p>
                  <p className="font-display text-xl">
                    {nextMatch.homeTeam} vs {nextMatch.awayTeam}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button asChild variant="outline">
                  <Link to="/partite">Vedi Calendario</Link>
                </Button>
                {nextMatch.ticketsAvailable && (
                  <Button asChild className="bg-gradient-roma text-white">
                    <Link to={`/checkout?package=Biglietto ${nextMatch.homeTeam} vs ${nextMatch.awayTeam}&qty=1&price=${nextMatch.ticketPrice || 45}`}>
                      Acquista Biglietto - €{nextMatch.ticketPrice || 45}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Ticket Packages */}
      {ticketPackages.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl text-foreground mb-4">
                <Ticket className="inline-block h-10 w-10 mr-3 text-primary" />
                Biglietti Partita
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Scegli il tuo posto allo Stadio Olimpico per la prossima partita
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ticketPackages.map((pkg, index) => (
                <div
                  key={pkg.id}
                  className={`relative bg-card rounded-2xl p-6 shadow-xl border border-border hover:border-primary/50 transition-all duration-300 opacity-0 animate-fade-in ${
                    pkg.popular ? "ring-4 ring-roma-gold scale-105 z-10" : ""
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-roma-gold text-roma-maroon px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                      PIÙ VENDUTO
                    </div>
                  )}
                  
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-4">
                    <Ticket className="h-7 w-7 text-primary" />
                  </div>
                  
                  <h3 className="font-display text-2xl text-foreground mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {pkg.description}
                  </p>
                  
                  <div className="mb-6">
                    <span className="font-display text-4xl text-primary">€{pkg.price}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="h-5 w-5 text-roma-gold flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex gap-2">
                    <Button
                      asChild
                      className={`flex-1 ${
                        pkg.popular
                          ? "bg-roma-gold text-roma-maroon hover:bg-roma-gold-light"
                          : "bg-gradient-roma text-white hover:opacity-90"
                      }`}
                    >
                      <Link to={`/checkout?package=${encodeURIComponent(pkg.name)}&qty=1&price=${pkg.price}`}>
                        Acquista
                      </Link>
                    </Button>
                    <SocialShare 
                      title={`Biglietto ${pkg.name} - €${pkg.price}`}
                      description={pkg.description}
                      type="package"
                      className="h-10"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Packages */}
      {experiencePackages.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl text-foreground mb-4">
                <Star className="inline-block h-10 w-10 mr-3 text-roma-gold" />
                Pacchetti Esperienza
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Molto più di una partita: vivi Roma come un vero tifoso
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {experiencePackages.map((pkg, index) => (
                <div
                  key={pkg.id}
                  className="group bg-card rounded-2xl overflow-hidden shadow-xl border border-border hover:shadow-2xl transition-all duration-300 opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {pkg.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {pkg.duration && (
                        <div className="absolute top-4 right-4 bg-roma-gold text-roma-maroon px-3 py-1 rounded-full text-sm font-bold">
                          {pkg.duration}
                        </div>
                      )}
                      {pkg.popular && (
                        <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                          Più Venduto
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-display text-2xl text-foreground mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {pkg.description}
                    </p>
                    
                    <ul className="space-y-2 mb-6">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-roma-gold" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-muted-foreground">A partire da</span>
                        <div className="font-display text-3xl text-primary">€{pkg.price}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button asChild className="bg-gradient-roma text-white">
                          <Link to={`/checkout?package=${encodeURIComponent(pkg.name)}&qty=1&price=${pkg.price}`}>
                            Prenota
                          </Link>
                        </Button>
                        <SocialShare 
                          title={`${pkg.name} - €${pkg.price}`}
                          description={pkg.description}
                          image={pkg.image}
                          type="package"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trasferte Packages */}
      {trasfertaPackages.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl text-foreground mb-4">
                <Bus className="inline-block h-10 w-10 mr-3 text-blue-500" />
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
                        Prenota Trasferta
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tour Packages */}
      {tourPackages.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl text-foreground mb-4">
                <MapPin className="inline-block h-10 w-10 mr-3 text-primary" />
                Tour Giallorossi
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Esplora Roma seguendo le orme dei campioni
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tourPackages.map((pkg, index) => (
                <div
                  key={pkg.id}
                  className="bg-card rounded-xl p-6 shadow-lg border border-border hover:border-primary/50 transition-all duration-300 opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-foreground">{pkg.name}</h3>
                      {pkg.duration && <span className="text-sm text-muted-foreground">{pkg.duration}</span>}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4">{pkg.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <span className="text-xs font-semibold text-primary">TAPPE:</span>
                    {pkg.features.map((stop, i) => (
                      <div key={stop} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-5 h-5 rounded-full bg-roma-gold/20 text-roma-gold text-xs flex items-center justify-center font-bold">
                          {i + 1}
                        </span>
                        {stop}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="font-display text-2xl text-primary">€{pkg.price}</span>
                    <Button asChild variant="outline" className="hover:bg-primary hover:text-primary-foreground">
                      <Link to={`/checkout?package=${encodeURIComponent(pkg.name)}&qty=1&price=${pkg.price}`}>
                        Prenota Tour
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
            Hai bisogno di un pacchetto personalizzato?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Contattaci per creare l'esperienza giallorossa perfetta per te, la tua famiglia o il tuo gruppo
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-roma-gold text-roma-maroon hover:bg-roma-gold-light">
              <Link to="/contatti">Richiedi Preventivo</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/partite">
                <Calendar className="h-5 w-5 mr-2" />
                Vedi Calendario Partite
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pacchetti;
