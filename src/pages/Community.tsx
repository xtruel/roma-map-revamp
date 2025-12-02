import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, MessageCircle, MapPin, Heart, Camera, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const testimonials = [
  {
    id: 1,
    name: "Marco B.",
    location: "New York, USA",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    message: "Essere romanista a 7000 km da Roma non è facile, ma grazie a questa community mi sento sempre a casa. Daje Roma!",
    likes: 234,
  },
  {
    id: 2,
    name: "Giulia R.",
    location: "Londra, UK",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    message: "Ho trovato altri romanisti qui a Londra e ora guardiamo tutte le partite insieme. Grazie Ovunque Romanisti!",
    likes: 189,
  },
  {
    id: 3,
    name: "Paolo M.",
    location: "Sydney, Australia",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    message: "Anche dall'altra parte del mondo, il cuore batte sempre giallorosso. Questa community è fantastica!",
    likes: 156,
  },
  {
    id: 4,
    name: "Sofia L.",
    location: "Buenos Aires, Argentina",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    message: "Mio nonno era di Roma e mi ha trasmesso questa passione. Ora la condivido con voi!",
    likes: 298,
  },
];

const photos = [
  "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400",
  "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=400",
  "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400",
  "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400",
  "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400",
  "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=400",
  "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400",
  "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=400",
];

const stats = [
  { label: "Membri", value: "250K+", icon: Users },
  { label: "Paesi", value: "85", icon: MapPin },
  { label: "Foto condivise", value: "50K+", icon: Camera },
  { label: "Messaggi", value: "1M+", icon: MessageCircle },
];

const Community = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-roma relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-4 gap-2 p-4">
            {photos.slice(0, 8).map((photo, i) => (
              <img key={i} src={photo} alt="" className="w-full h-32 object-cover rounded-lg" />
            ))}
          </div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="font-display text-5xl md:text-7xl text-white text-center mb-4">
            Community
          </h1>
          <p className="text-white/80 text-center text-lg max-w-2xl mx-auto mb-8">
            La famiglia giallorossa più grande del mondo. Unisciti a noi ovunque tu sia.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-roma-gold text-roma-maroon hover:bg-roma-gold-light">
              Iscriviti Gratis
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Scopri di Più
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-3">
                  <stat.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="font-display text-4xl text-foreground">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl text-foreground text-center mb-4">
            Voci dalla Community
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Romanisti da tutto il mondo condividono la loro passione
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-card rounded-xl p-6 shadow-lg border border-border hover:border-primary/50 transition-all duration-300 opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-start gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-roma-gold"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">"{testimonial.message}"</p>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <Heart className="h-4 w-4" />
                        {testimonial.likes}
                      </button>
                      <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <Share2 className="h-4 w-4" />
                        Condividi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl text-foreground text-center mb-4">
            Galleria Giallorossa
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Le foto più belle condivise dalla community
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <img
                  src={photo}
                  alt={`Community photo ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-roma-maroon/0 group-hover:bg-roma-maroon/50 transition-colors duration-300 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" className="gap-2">
              <Camera className="h-4 w-4" />
              Carica la tua foto
            </Button>
          </div>
        </div>
      </section>

      {/* Join Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-card rounded-2xl p-8 shadow-xl border border-border">
            <h2 className="font-display text-3xl text-foreground text-center mb-2">
              Unisciti alla Community
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Entra a far parte della famiglia giallorossa più grande del mondo
            </p>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Nome" />
                <Input placeholder="Email" type="email" />
              </div>
              <Input placeholder="Città, Paese" />
              <Textarea placeholder="Perché sei romanista? Raccontaci la tua storia..." rows={4} />
              <Button className="w-full bg-gradient-roma text-white" size="lg">
                Iscriviti alla Community
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Community;
