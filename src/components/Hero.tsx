import { Button } from "./ui/button";
import { Users, Heart, Trophy } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1632153630571-6becfa9a4290?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-roma-maroon/80 via-roma-red/60 to-roma-maroon/90" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-20">
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-white tracking-wider mb-6 animate-fade-in">
          Ovunque Romanisti
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 font-light opacity-0 animate-fade-in [animation-delay:200ms]">
          La passione giallorossa non ha confini. Unisciti alla più grande
          comunità di tifosi della Roma nel mondo.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 opacity-0 animate-fade-in [animation-delay:400ms]">
          <Button
            size="lg"
            className="bg-roma-gold text-roma-maroon hover:bg-roma-gold-light font-semibold text-lg px-8 py-6 rounded-full shadow-gold animate-pulse-gold"
          >
            Unisciti a Noi
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white/10 font-semibold text-lg px-8 py-6 rounded-full backdrop-blur-sm"
          >
            Tutti gli Articoli
          </Button>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 bg-roma-maroon py-6 px-8 flex items-center justify-center gap-4">
            <div className="flex gap-4">
              <Trophy className="h-6 w-6 text-roma-gold" />
              <Heart className="h-6 w-6 text-roma-gold" />
              <Users className="h-6 w-6 text-roma-gold" />
            </div>
            <span className="text-white font-medium">
              Unisciti alla famiglia giallorossa ovunque tu sia
            </span>
          </div>
          <div className="flex-1 bg-roma-gold py-6 px-8 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              className="border-roma-maroon text-roma-maroon hover:bg-roma-maroon hover:text-white"
            >
              Scopri gli Articoli
            </Button>
            <Button className="bg-roma-maroon text-white hover:bg-roma-red">
              Scopri la Mappa
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
