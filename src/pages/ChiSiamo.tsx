import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Users, Globe, Target, Award, Handshake } from "lucide-react";

const team = [
  {
    name: "Alessandro Romano",
    role: "Fondatore & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
    bio: "Romanista dalla nascita, ha fondato Ovunque Romanisti nel 2015.",
  },
  {
    name: "Francesca Totti",
    role: "Community Manager",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300",
    bio: "Gestisce la community di oltre 250.000 romanisti nel mondo.",
  },
  {
    name: "Marco De Rossi",
    role: "Content Director",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300",
    bio: "Giornalista sportivo, cura tutti i contenuti editoriali.",
  },
  {
    name: "Giulia Bianchi",
    role: "Events Manager",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300",
    bio: "Organizza tour, eventi e esperienze per i tifosi.",
  },
];

const values = [
  {
    icon: Heart,
    title: "Passione",
    description: "La passione giallorossa è il motore di tutto quello che facciamo.",
  },
  {
    icon: Users,
    title: "Comunità",
    description: "Crediamo nella forza della community e nel supporto reciproco.",
  },
  {
    icon: Globe,
    title: "Globalità",
    description: "Uniamo romanisti da tutto il mondo sotto un'unica bandiera.",
  },
  {
    icon: Target,
    title: "Eccellenza",
    description: "Puntiamo sempre al massimo, come la nostra squadra del cuore.",
  },
];

const milestones = [
  { year: "2015", event: "Fondazione di Ovunque Romanisti" },
  { year: "2017", event: "100.000 membri nella community" },
  { year: "2019", event: "Lancio dei tour guidati" },
  { year: "2021", event: "Partnership ufficiale con AS Roma" },
  { year: "2022", event: "250.000 membri raggiunti" },
  { year: "2024", event: "Espansione in 85 paesi" },
];

const ChiSiamo = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-roma relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="font-display text-5xl md:text-7xl text-white text-center mb-4">
            Chi Siamo
          </h1>
          <p className="text-white/80 text-center text-lg max-w-2xl mx-auto">
            La storia di come un gruppo di tifosi ha creato la più grande community romanista del mondo
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-4xl text-foreground mb-6">La Nostra Missione</h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Ovunque Romanisti nasce da un'idea semplice: <span className="text-primary font-semibold">unire tutti i tifosi della Roma</span>, 
              ovunque si trovino nel mondo. Vogliamo che ogni romanista possa sentirsi parte di una grande famiglia, 
              condividere la propria passione e vivere esperienze indimenticabili legate alla squadra del cuore.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-card rounded-xl px-6 py-4 shadow-lg border border-border">
                <span className="font-display text-3xl text-primary">250K+</span>
                <p className="text-muted-foreground">Membri</p>
              </div>
              <div className="bg-card rounded-xl px-6 py-4 shadow-lg border border-border">
                <span className="font-display text-3xl text-primary">85</span>
                <p className="text-muted-foreground">Paesi</p>
              </div>
              <div className="bg-card rounded-xl px-6 py-4 shadow-lg border border-border">
                <span className="font-display text-3xl text-primary">9</span>
                <p className="text-muted-foreground">Anni</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl text-foreground text-center mb-12">I Nostri Valori</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-card rounded-xl p-6 shadow-lg border border-border text-center opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display text-2xl text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl text-foreground text-center mb-4">Il Team</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Un gruppo di romanisti appassionati che lavora ogni giorno per la community
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="group text-center opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative mb-4 inline-block">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-40 h-40 rounded-full object-cover mx-auto border-4 border-roma-gold shadow-xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-roma rounded-full flex items-center justify-center shadow-lg">
                    <Heart className="h-5 w-5 text-roma-gold" />
                  </div>
                </div>
                <h3 className="font-display text-xl text-foreground">{member.name}</h3>
                <p className="text-primary font-medium text-sm mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gradient-roma">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl text-white text-center mb-12">La Nostra Storia</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-roma-gold/30" />
              
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className="relative pl-20 pb-8 last:pb-0 opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute left-4 w-8 h-8 rounded-full bg-roma-gold flex items-center justify-center shadow-lg">
                    <Award className="h-4 w-4 text-roma-maroon" />
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <span className="font-display text-2xl text-roma-gold">{milestone.year}</span>
                    <p className="text-white mt-1">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-4xl text-foreground mb-4">I Nostri Partner</h2>
          <p className="text-muted-foreground mb-12 max-w-xl mx-auto">
            Collaboriamo con le migliori realtà per offrire esperienze uniche
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
            {["AS Roma Official", "Serie A", "DAZN", "Sky Sport", "Lega Serie A"].map((partner) => (
              <div key={partner} className="text-2xl font-display text-muted-foreground">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ChiSiamo;
