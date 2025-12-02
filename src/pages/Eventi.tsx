import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, MapPin, Clock, Users, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

const events = [
  {
    id: 1,
    title: "Roma vs Lazio - Derby della Capitale",
    date: "15 Dicembre 2024",
    time: "18:00",
    location: "Stadio Olimpico",
    type: "Partita",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    attendees: 65000,
    price: "Da €45",
    featured: true,
  },
  {
    id: 2,
    title: "Tour VIP Stadio Olimpico",
    date: "10 Dicembre 2024",
    time: "10:00",
    location: "Stadio Olimpico",
    type: "Tour",
    image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800",
    attendees: 50,
    price: "€35",
    featured: false,
  },
  {
    id: 3,
    title: "Meet & Greet con le Leggende",
    date: "20 Dicembre 2024",
    time: "15:00",
    location: "AS Roma Store - Via del Corso",
    type: "Evento",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800",
    attendees: 200,
    price: "€25",
    featured: true,
  },
  {
    id: 4,
    title: "Roma vs Milan - Serie A",
    date: "22 Dicembre 2024",
    time: "20:45",
    location: "Stadio Olimpico",
    type: "Partita",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800",
    attendees: 60000,
    price: "Da €50",
    featured: false,
  },
  {
    id: 5,
    title: "Cena Giallorossa di Natale",
    date: "23 Dicembre 2024",
    time: "20:00",
    location: "Ristorante La Lupa",
    type: "Evento",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
    attendees: 150,
    price: "€75",
    featured: false,
  },
  {
    id: 6,
    title: "Roma vs Juventus - Serie A",
    date: "5 Gennaio 2025",
    time: "18:00",
    location: "Stadio Olimpico",
    type: "Partita",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800",
    attendees: 70000,
    price: "Da €60",
    featured: true,
  },
];

const Eventi = () => {
  const featuredEvents = events.filter((e) => e.featured);
  const upcomingEvents = events.filter((e) => !e.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-roma relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920')] bg-cover bg-center" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="font-display text-5xl md:text-7xl text-white text-center mb-4 drop-shadow-lg">
            Eventi & Partite
          </h1>
          <p className="text-white/90 text-center text-lg max-w-2xl mx-auto drop-shadow">
            Non perdere nessun appuntamento giallorosso. Partite, tour, incontri e molto altro.
          </p>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl text-foreground mb-8">Eventi in Evidenza</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event, index) => (
              <div
                key={event.id}
                className="group relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-roma-rosso via-roma-rosso/60 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="bg-roma-giallo text-roma-rosso px-3 py-1 rounded-full text-sm font-bold">
                    {event.type}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-2xl text-white mb-3 group-hover:text-roma-giallo transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex flex-col gap-2 text-white/80 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-roma-giallo" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-roma-giallo" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-roma-giallo" />
                      {event.location}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-roma-giallo font-bold text-lg">{event.price}</span>
                    <Button className="bg-roma-giallo text-roma-rosso hover:opacity-90 font-semibold">
                      <Ticket className="h-4 w-4 mr-2" />
                      Acquista
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar View */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl text-foreground mb-8">Prossimi Appuntamenti</h2>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div
                key={event.id}
                className="group bg-card rounded-xl p-6 shadow-lg border border-border hover:border-primary/50 transition-all duration-300 opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                        {event.type}
                      </span>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <Users className="h-4 w-4" />
                        {event.attendees.toLocaleString()} partecipanti
                      </div>
                    </div>
                    <h3 className="font-display text-2xl text-foreground mb-2 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-2xl font-bold text-primary">{event.price}</span>
                    <Button className="bg-gradient-roma text-white">
                      <Ticket className="h-4 w-4 mr-2" />
                      Biglietti
                    </Button>
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

export default Eventi;
