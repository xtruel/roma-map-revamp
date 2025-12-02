import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-roma-maroon text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-3xl text-roma-gold mb-4">
              Ovunque Romanisti
            </h3>
            <p className="text-white/70 mb-6">
              La passione giallorossa non ha confini. Unisciti alla community.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-roma-gold hover:text-roma-maroon transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-roma-gold hover:text-roma-maroon transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-roma-gold hover:text-roma-maroon transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-roma-gold hover:text-roma-maroon transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-xl text-roma-gold mb-4">Link Utili</h4>
            <ul className="space-y-3">
              {["Home", "Articoli", "Eventi", "Mappa", "Pacchetti", "Community"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/70 hover:text-roma-gold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-xl text-roma-gold mb-4">Supporto</h4>
            <ul className="space-y-3">
              {["FAQ", "Termini e Condizioni", "Privacy Policy", "Cookie Policy", "Contattaci"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/70 hover:text-roma-gold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xl text-roma-gold mb-4">Contatti</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white/70">
                <Mail className="h-5 w-5 text-roma-gold" />
                info@ovunqueromanisti.it
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Phone className="h-5 w-5 text-roma-gold" />
                +39 06 1234567
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <MapPin className="h-5 w-5 text-roma-gold flex-shrink-0" />
                Stadio Olimpico, Roma
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-white/50 text-sm">
            © 2024 Ovunque Romanisti. Tutti i diritti riservati. Daje Roma!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
