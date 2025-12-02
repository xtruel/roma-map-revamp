import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Clock, MapPin, Tv, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const matches = {
  upcoming: [
    {
      id: 1,
      homeTeam: "Roma",
      awayTeam: "Lazio",
      date: "15 Dic 2024",
      time: "18:00",
      competition: "Serie A",
      stadium: "Stadio Olimpico",
      broadcast: "DAZN",
      ticketsAvailable: true,
    },
    {
      id: 2,
      homeTeam: "Roma",
      awayTeam: "Milan",
      date: "22 Dic 2024",
      time: "20:45",
      competition: "Serie A",
      stadium: "Stadio Olimpico",
      broadcast: "Sky Sport",
      ticketsAvailable: true,
    },
    {
      id: 3,
      homeTeam: "Atalanta",
      awayTeam: "Roma",
      date: "29 Dic 2024",
      time: "15:00",
      competition: "Serie A",
      stadium: "Gewiss Stadium",
      broadcast: "DAZN",
      ticketsAvailable: false,
    },
    {
      id: 4,
      homeTeam: "Roma",
      awayTeam: "Juventus",
      date: "5 Gen 2025",
      time: "18:00",
      competition: "Serie A",
      stadium: "Stadio Olimpico",
      broadcast: "Sky Sport",
      ticketsAvailable: true,
    },
    {
      id: 5,
      homeTeam: "Roma",
      awayTeam: "Real Sociedad",
      date: "12 Gen 2025",
      time: "21:00",
      competition: "Europa League",
      stadium: "Stadio Olimpico",
      broadcast: "Sky Sport",
      ticketsAvailable: true,
    },
  ],
  results: [
    {
      id: 6,
      homeTeam: "Roma",
      awayTeam: "Napoli",
      homeScore: 2,
      awayScore: 1,
      date: "8 Dic 2024",
      competition: "Serie A",
    },
    {
      id: 7,
      homeTeam: "Inter",
      awayTeam: "Roma",
      homeScore: 1,
      awayScore: 1,
      date: "1 Dic 2024",
      competition: "Serie A",
    },
    {
      id: 8,
      homeTeam: "Roma",
      awayTeam: "Lecce",
      homeScore: 3,
      awayScore: 0,
      date: "24 Nov 2024",
      competition: "Serie A",
    },
    {
      id: 9,
      homeTeam: "Fiorentina",
      awayTeam: "Roma",
      homeScore: 0,
      awayScore: 2,
      date: "17 Nov 2024",
      competition: "Serie A",
    },
  ],
};

const Partite = () => {
  return (
    <div className="min-h-screen bg-background">
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
                  <div className="w-24 h-24 bg-roma-red rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                    <span className="font-display text-4xl text-roma-gold">AS</span>
                  </div>
                  <h3 className="font-display text-3xl text-foreground">Roma</h3>
                </div>

                {/* Match Info */}
                <div className="text-center">
                  <div className="font-display text-6xl text-primary mb-2">VS</div>
                  <div className="flex flex-col gap-2 text-muted-foreground">
                    <div className="flex items-center justify-center gap-2">
                      <Calendar className="h-4 w-4" />
                      15 Dicembre 2024
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="h-4 w-4" />
                      18:00
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Stadio Olimpico
                    </div>
                  </div>
                  <span className="inline-block mt-4 bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-semibold">
                    Serie A - Derby
                  </span>
                </div>

                {/* Away Team */}
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                    <span className="font-display text-4xl text-white">SS</span>
                  </div>
                  <h3 className="font-display text-3xl text-foreground">Lazio</h3>
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-4">
                <Button size="lg" className="bg-roma-gold text-roma-maroon hover:bg-roma-gold-light">
                  <Ticket className="h-5 w-5 mr-2" />
                  Acquista Biglietti
                </Button>
                <Button size="lg" variant="outline">
                  <Tv className="h-5 w-5 mr-2" />
                  Dove Vederla
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Matches Tabs */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="upcoming" className="font-display text-lg">Prossime</TabsTrigger>
              <TabsTrigger value="results" className="font-display text-lg">Risultati</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              <div className="space-y-4">
                {matches.upcoming.map((match, index) => (
                  <div
                    key={match.id}
                    className="bg-card rounded-xl p-6 shadow-lg border border-border hover:border-primary/50 transition-all duration-300 opacity-0 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="text-center min-w-20">
                          <span className={`font-display text-xl ${match.homeTeam === "Roma" ? "text-primary" : "text-foreground"}`}>
                            {match.homeTeam}
                          </span>
                        </div>
                        <div className="text-center px-4">
                          <div className="font-display text-2xl text-muted-foreground">VS</div>
                        </div>
                        <div className="text-center min-w-20">
                          <span className={`font-display text-xl ${match.awayTeam === "Roma" ? "text-primary" : "text-foreground"}`}>
                            {match.awayTeam}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="bg-secondary px-3 py-1 rounded-full">{match.competition}</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {match.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {match.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <Tv className="h-4 w-4" />
                          {match.broadcast}
                        </div>
                      </div>
                      
                      <Button
                        className={match.ticketsAvailable ? "bg-gradient-roma text-white" : ""}
                        disabled={!match.ticketsAvailable}
                        variant={match.ticketsAvailable ? "default" : "outline"}
                      >
                        {match.ticketsAvailable ? "Biglietti" : "Esaurito"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="results">
              <div className="space-y-4">
                {matches.results.map((match, index) => (
                  <div
                    key={match.id}
                    className="bg-card rounded-xl p-6 shadow-lg border border-border opacity-0 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="text-center min-w-20">
                          <span className={`font-display text-xl ${match.homeTeam === "Roma" ? "text-primary" : "text-foreground"}`}>
                            {match.homeTeam}
                          </span>
                        </div>
                        <div className="text-center px-4">
                          <div className="font-display text-3xl">
                            <span className={match.homeScore > match.awayScore ? "text-green-500" : match.homeScore < match.awayScore ? "text-destructive" : "text-muted-foreground"}>
                              {match.homeScore}
                            </span>
                            <span className="text-muted-foreground mx-2">-</span>
                            <span className={match.awayScore > match.homeScore ? "text-green-500" : match.awayScore < match.homeScore ? "text-destructive" : "text-muted-foreground"}>
                              {match.awayScore}
                            </span>
                          </div>
                        </div>
                        <div className="text-center min-w-20">
                          <span className={`font-display text-xl ${match.awayTeam === "Roma" ? "text-primary" : "text-foreground"}`}>
                            {match.awayTeam}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="bg-secondary px-3 py-1 rounded-full">{match.competition}</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {match.date}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Partite;
