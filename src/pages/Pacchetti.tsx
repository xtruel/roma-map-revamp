import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, Star, Ticket, MapPin, Users, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

const ticketPackages = [
  {
    id: 1,
    name: "Curva Sud",
    price: "45",
    description: "L'esperienza più autentica tra i veri tifosi",
    icon: Users,
    features: [
      "Posto in Curva Sud",
      "Accesso 2 ore prima",
      "Sciarpa omaggio",
      "Bevanda inclusa",
    ],
    popular: false,
    color: "bg-roma-red",
  },
  {
    id: 2,
    name: "Tribuna Monte Mario",
    price: "85",
    description: "Vista panoramica sullo stadio",
    icon: Ticket,
    features: [
      "Posto centrale",
      "Seduta numerata",
      "Accesso area hospitality",
      "Programma partita",
      "Parcheggio incluso",
    ],
    popular: true,
    color: "bg-roma-gold",
  },
  {
    id: 3,
    name: "Tribuna Tevere",
    price: "75",
    description: "Ottima visuale a bordo campo",
    icon: Star,
    features: [
      "Vista sul campo",
      "Seduta comoda",
      "Snack bar vicino",
      "Gadget ricordo",
    ],
    popular: false,
    color: "bg-roma-maroon",
  },
  {
    id: 4,
    name: "VIP Box",
    price: "250",
    description: "L'esperienza premium definitiva",
    icon: Gift,
    features: [
      "Box privato",
      "Catering incluso",
      "Open bar",
      "Parcheggio VIP",
      "Meet & greet giocatori",
      "Kit merchandising esclusivo",
    ],
    popular: false,
    color: "bg-gradient-to-r from-roma-gold to-amber-400",
  },
];

const experiencePackages = [
  {
    id: 5,
    name: "Roma Experience",
    price: "120",
    duration: "1 giorno",
    description: "Vivi una giornata da vero romanista",
    image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800",
    features: [
      "Tour dello stadio",
      "Visita museo AS Roma",
      "Biglietto partita",
      "Pranzo in ristorante partner",
      "Kit merchandising",
    ],
  },
  {
    id: 6,
    name: "Weekend Giallorosso",
    price: "350",
    duration: "2 giorni",
    description: "Un weekend completo nella Capitale",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800",
    features: [
      "1 notte in hotel 4 stelle",
      "Biglietto partita Tribuna",
      "Tour Roma giallorossa",
      "Cena tipica romana",
      "Transfer da/per stadio",
      "Guida dedicata",
    ],
  },
  {
    id: 7,
    name: "Trasferta Fans",
    price: "199",
    duration: "1 giorno",
    description: "Segui la Roma in trasferta",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800",
    features: [
      "Trasporto in pullman GT",
      "Biglietto settore ospiti",
      "Pranzo al sacco",
      "Assicurazione viaggio",
      "Accompagnatore dedicato",
    ],
  },
];

const tourPackages = [
  {
    id: 8,
    name: "Tour Storico Roma",
    price: "65",
    duration: "4 ore",
    description: "Scopri i luoghi che hanno fatto la storia giallorossa",
    stops: ["Stadio Olimpico", "Trigoria", "Campo Testaccio", "Monumento Agostino Di Bartolomei"],
  },
  {
    id: 9,
    name: "Roma Gastronomica",
    price: "85",
    duration: "5 ore",
    description: "I ristoranti preferiti dai giocatori",
    stops: ["Trattoria della Lupa", "Pizzeria Romanista", "Bar Sport Giallorosso", "Gelateria Totti"],
  },
  {
    id: 10,
    name: "Roma by Night",
    price: "55",
    duration: "3 ore",
    description: "I locali dove festeggiare le vittorie",
    stops: ["Pub Curva Sud", "Discoteca Olimpico", "Wine Bar 1927", "Rooftop Giallorosso"],
  },
];

const Pacchetti = () => {
  return (
    <div className="min-h-screen bg-background">
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

      {/* Ticket Packages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl text-foreground mb-4">Biglietti Partita</h2>
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
                
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${pkg.color} mb-4`}>
                  <pkg.icon className="h-7 w-7 text-white" />
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
                
                <Button
                  asChild
                  className={`w-full ${
                    pkg.popular
                      ? "bg-roma-gold text-roma-maroon hover:bg-roma-gold-light"
                      : "bg-gradient-roma text-white hover:opacity-90"
                  }`}
                >
                  <Link to={`/checkout?package=${pkg.name.toLowerCase().replace(/\s+/g, "-")}&qty=1&price=${pkg.price}`}>
                    Acquista
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Packages */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl text-foreground mb-4">Pacchetti Esperienza</h2>
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
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-roma-gold text-roma-maroon px-3 py-1 rounded-full text-sm font-bold">
                    {pkg.duration}
                  </div>
                </div>
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
                    <Button asChild className="bg-gradient-roma text-white">
                      <Link to={`/checkout?package=${pkg.name.toLowerCase().replace(/\s+/g, "-")}&qty=1&price=${pkg.price}`}>
                        Prenota
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tour Packages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl text-foreground mb-4">Tour Giallorossi</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Esplora Roma seguendo le orme dei campioni
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tourPackages.map((tour, index) => (
              <div
                key={tour.id}
                className="bg-card rounded-xl p-6 shadow-lg border border-border hover:border-primary/50 transition-all duration-300 opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-foreground">{tour.name}</h3>
                    <span className="text-sm text-muted-foreground">{tour.duration}</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4">{tour.description}</p>
                
                <div className="space-y-2 mb-6">
                  <span className="text-xs font-semibold text-primary">TAPPE:</span>
                  {tour.stops.map((stop, i) => (
                    <div key={stop} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-5 h-5 rounded-full bg-roma-gold/20 text-roma-gold text-xs flex items-center justify-center font-bold">
                        {i + 1}
                      </span>
                      {stop}
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="font-display text-2xl text-primary">€{tour.price}</span>
                  <Button asChild variant="outline" className="hover:bg-primary hover:text-primary-foreground">
                    <Link to={`/checkout?package=${tour.name.toLowerCase().replace(/\s+/g, "-")}&qty=1&price=${tour.price}`}>
                      Acquista
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-roma">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-4xl text-white mb-4">
            Hai bisogno di un pacchetto personalizzato?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Contattaci per creare l'esperienza giallorossa perfetta per te, la tua famiglia o il tuo gruppo
          </p>
          <Button size="lg" className="bg-roma-gold text-roma-maroon hover:bg-roma-gold-light">
            Richiedi Preventivo
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pacchetti;
