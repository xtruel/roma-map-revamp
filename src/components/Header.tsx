import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { Button } from "./ui/button";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Articoli", href: "#articoli" },
  { label: "Eventi", href: "#eventi" },
  { label: "Prossime Partite", href: "#partite" },
  { label: "Pacchetti", href: "#pacchetti" },
  { label: "Mappa", href: "#mappa" },
  { label: "Community", href: "#community" },
  { label: "Trofei", href: "#trofei" },
  { label: "Chi Siamo", href: "#chi-siamo" },
  { label: "Contatti", href: "#contatti" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span className="font-display text-2xl tracking-wide text-primary">
              Ovunque Romanisti
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.slice(0, 8).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-md hover:bg-muted"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button className="hidden md:flex bg-gradient-roma text-primary-foreground hover:opacity-90">
              Accedi
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-3 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button className="mt-4 bg-gradient-roma text-primary-foreground">
                Accedi
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
