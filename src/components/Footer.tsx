import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Shield } from "lucide-react";

const Footer = () => {
  const links = [
    { label: "Home", href: "/" },
    { label: "Articoli", href: "/articoli" },
    { label: "Eventi", href: "/eventi" },
    { label: "Mappa", href: "/mappa" },
    { label: "Pacchetti", href: "/pacchetti" },
    { label: "Community", href: "/community" },
  ];

  const supportLinks = [
    { label: "FAQ", href: "/contatti" },
    { label: "Chi Siamo", href: "/chi-siamo" },
    { label: "Contattaci", href: "/contatti" },
  ];

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
              {links.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-white/70 hover:text-roma-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-xl text-roma-gold mb-4">Supporto</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-white/70 hover:text-roma-gold transition-colors">
                    {link.label}
                  </Link>
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

        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © 2024 Ovunque Romanisti. Tutti i diritti riservati. Daje Roma!
          </p>
          <Link 
            to="/admin/login" 
            className="flex items-center gap-2 text-white/30 hover:text-roma-gold transition-colors text-sm"
          >
            <Shield className="h-4 w-4" />
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
