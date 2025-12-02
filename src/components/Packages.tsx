import { Check, Star, Ticket, MapPin, Users } from "lucide-react";
import { Button } from "./ui/button";

const packages = [
  {
    id: 1,
    name: "Biglietto Singolo",
    price: "45",
    description: "Accesso alla partita con posto assegnato",
    icon: Ticket,
    features: [
      "Posto in Curva Sud",
      "Accesso 2 ore prima",
      "Sciarpa omaggio",
    ],
    popular: false,
  },
  {
    id: 2,
    name: "Pacchetto Esperienza",
    price: "120",
    description: "Vivi la Roma come un vero tifoso",
    icon: Star,
    features: [
      "Posto in Tribuna Monte Mario",
      "Tour dello stadio pre-partita",
      "Kit merchandising esclusivo",
      "Cena in ristorante partner",
    ],
    popular: true,
  },
  {
    id: 3,
    name: "Roma Tour",
    price: "85",
    description: "Scopri i luoghi iconici giallorossi",
    icon: MapPin,
    features: [
      "Guida esperta romanista",
      "5 tappe storiche",
      "Pranzo incluso",
      "Gadget ricordo",
    ],
    popular: false,
  },
  {
    id: 4,
    name: "Pacchetto Gruppo",
    price: "350",
    description: "Per gruppi di 5-10 persone",
    icon: Users,
    features: [
      "Posti adiacenti garantiti",
      "Trasporto incluso",
      "Guida dedicata",
      "Sconto 15% merchandising",
    ],
    popular: false,
  },
];

const Packages = () => {
  return (
    <section id="pacchetti" className="py-20 bg-gradient-roma">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-5xl md:text-6xl text-white mb-4">
            Pacchetti & Biglietti
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Scegli l'esperienza perfetta per vivere la passione giallorossa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, index) => (
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
                <pkg.icon className="h-7 w-7 text-primary" />
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
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="h-5 w-5 text-roma-gold flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                className={`w-full ${
                  pkg.popular
                    ? "bg-roma-gold text-roma-maroon hover:bg-roma-gold-light"
                    : "bg-gradient-roma text-white hover:opacity-90"
                }`}
              >
                Acquista
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
