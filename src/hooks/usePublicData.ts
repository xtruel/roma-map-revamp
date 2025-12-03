import { useState, useEffect } from "react";

// Interfaces matching admin data
export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  competition: string;
  stadium: string;
  broadcast: string;
  ticketsAvailable: boolean;
  ticketPrice?: number;
  isHome: boolean;
}

export interface PackageItem {
  id: string;
  name: string;
  type: "biglietto" | "esperienza" | "trasferta" | "tour";
  price: number;
  description: string;
  features: string[];
  duration?: string;
  image?: string;
  active: boolean;
  popular: boolean;
  transport?: {
    type: "bus" | "flixbus" | "treno" | "aereo";
    partenza: string;
    arrivo: string;
    orario: string;
  };
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  status: "published" | "draft";
  featured?: boolean;
}

const MATCHES_KEY = "roma_matches";
const PACKAGES_KEY = "roma_packages";
const ARTICLES_KEY = "roma_articles";

const defaultMatches: Match[] = [
  {
    id: "1",
    homeTeam: "Roma",
    awayTeam: "Lazio",
    date: "2025-01-15",
    time: "18:00",
    competition: "Serie A",
    stadium: "Stadio Olimpico",
    broadcast: "DAZN",
    ticketsAvailable: true,
    ticketPrice: 65,
    isHome: true,
  },
  {
    id: "2",
    homeTeam: "Roma",
    awayTeam: "Milan",
    date: "2025-01-22",
    time: "20:45",
    competition: "Serie A",
    stadium: "Stadio Olimpico",
    broadcast: "Sky Sport",
    ticketsAvailable: true,
    ticketPrice: 55,
    isHome: true,
  },
  {
    id: "3",
    homeTeam: "Atalanta",
    awayTeam: "Roma",
    date: "2025-01-29",
    time: "15:00",
    competition: "Serie A",
    stadium: "Gewiss Stadium",
    broadcast: "DAZN",
    ticketsAvailable: true,
    ticketPrice: 45,
    isHome: false,
  },
  {
    id: "4",
    homeTeam: "Roma",
    awayTeam: "Juventus",
    date: "2025-02-05",
    time: "18:00",
    competition: "Serie A",
    stadium: "Stadio Olimpico",
    broadcast: "Sky Sport",
    ticketsAvailable: true,
    ticketPrice: 85,
    isHome: true,
  },
  {
    id: "5",
    homeTeam: "Roma",
    awayTeam: "Real Sociedad",
    date: "2025-02-12",
    time: "21:00",
    competition: "Europa League",
    stadium: "Stadio Olimpico",
    broadcast: "Sky Sport",
    ticketsAvailable: true,
    ticketPrice: 70,
    isHome: true,
  },
  {
    id: "6",
    homeTeam: "Napoli",
    awayTeam: "Roma",
    date: "2025-02-19",
    time: "20:45",
    competition: "Serie A",
    stadium: "Stadio Diego Armando Maradona",
    broadcast: "DAZN",
    ticketsAvailable: true,
    ticketPrice: 55,
    isHome: false,
  },
  {
    id: "7",
    homeTeam: "Roma",
    awayTeam: "Inter",
    date: "2025-02-26",
    time: "20:45",
    competition: "Serie A",
    stadium: "Stadio Olimpico",
    broadcast: "Sky Sport",
    ticketsAvailable: true,
    ticketPrice: 75,
    isHome: true,
  },
  {
    id: "8",
    homeTeam: "Roma",
    awayTeam: "Fiorentina",
    date: "2025-03-05",
    time: "18:00",
    competition: "Coppa Italia",
    stadium: "Stadio Olimpico",
    broadcast: "Mediaset",
    ticketsAvailable: true,
    ticketPrice: 40,
    isHome: true,
  },
];

const defaultPackages: PackageItem[] = [
  // Biglietti
  {
    id: "1",
    name: "Curva Sud",
    type: "biglietto",
    price: 45,
    description: "L'esperienza più autentica tra i veri tifosi della Curva Sud",
    features: ["Posto in Curva Sud", "Accesso 2 ore prima", "Sciarpa omaggio", "Bevanda inclusa"],
    active: true,
    popular: false,
  },
  {
    id: "2",
    name: "Tribuna Monte Mario",
    type: "biglietto",
    price: 85,
    description: "Vista panoramica centrale sullo stadio Olimpico",
    features: ["Posto centrale numerato", "Seduta premium", "Accesso area hospitality", "Programma partita", "Parcheggio incluso"],
    active: true,
    popular: true,
  },
  {
    id: "3",
    name: "Tribuna Tevere",
    type: "biglietto",
    price: 65,
    description: "Ottima visuale laterale a bordo campo",
    features: ["Posto laterale", "Seduta comoda", "Snack bar vicino", "Gadget ricordo"],
    active: true,
    popular: false,
  },
  {
    id: "4",
    name: "VIP Box",
    type: "biglietto",
    price: 350,
    description: "L'esperienza premium definitiva per veri intenditori",
    features: ["Box privato 4-6 persone", "Catering gourmet incluso", "Open bar premium", "Parcheggio VIP dedicato", "Meet & greet giocatori", "Kit merchandising esclusivo"],
    active: true,
    popular: false,
  },
  // Esperienze
  {
    id: "5",
    name: "Roma Experience",
    type: "esperienza",
    price: 120,
    duration: "1 giorno",
    description: "Vivi una giornata da vero romanista",
    features: ["Tour dello stadio Olimpico", "Visita museo AS Roma", "Biglietto partita Curva", "Pranzo in ristorante partner", "Kit merchandising"],
    image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800",
    active: true,
    popular: true,
  },
  {
    id: "6",
    name: "Weekend Giallorosso",
    type: "esperienza",
    price: 450,
    duration: "2 giorni / 1 notte",
    description: "Un weekend completo nella Capitale giallorossa",
    features: ["1 notte hotel 4 stelle centro", "Biglietto partita Tribuna", "Tour Roma giallorossa", "Cena tipica romana", "Transfer da/per stadio", "Guida dedicata"],
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800",
    active: true,
    popular: true,
  },
  {
    id: "7",
    name: "Family Pack",
    type: "esperienza",
    price: 180,
    duration: "1 giorno",
    description: "Porta tutta la famiglia allo stadio",
    features: ["4 biglietti Tribuna Tevere", "Area giochi bambini", "Foto ricordo stampata", "Gadget per i piccoli", "Sconto 20% merchandising"],
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    active: true,
    popular: false,
  },
  // Trasferte
  {
    id: "8",
    name: "Trasferta Milano",
    type: "trasferta",
    price: 199,
    duration: "1 giorno",
    description: "Segui la Roma a San Siro contro l'Inter",
    features: ["Bus GT andata/ritorno", "Biglietto settore ospiti", "Pranzo al sacco incluso", "Assicurazione viaggio", "Guida/accompagnatore"],
    active: true,
    popular: true,
    transport: {
      type: "bus",
      partenza: "Roma Termini",
      arrivo: "Milano San Siro",
      orario: "06:00",
    },
  },
  {
    id: "9",
    name: "Trasferta Napoli",
    type: "trasferta",
    price: 149,
    duration: "1 giorno",
    description: "Trasferta al Maradona",
    features: ["Bus GT comfort", "Biglietto settore ospiti", "Colazione inclusa", "Sosta pranzo", "Accompagnatore"],
    active: true,
    popular: false,
    transport: {
      type: "bus",
      partenza: "Roma Tiburtina",
      arrivo: "Napoli Fuorigrotta",
      orario: "08:00",
    },
  },
  {
    id: "10",
    name: "Trasferta Bergamo",
    type: "trasferta",
    price: 179,
    duration: "1 giorno",
    description: "In trasferta contro l'Atalanta",
    features: ["Bus GT", "Biglietto settore ospiti", "Pranzo", "Guida dedicata"],
    active: true,
    popular: false,
    transport: {
      type: "bus",
      partenza: "Roma Termini",
      arrivo: "Bergamo Gewiss Stadium",
      orario: "05:30",
    },
  },
  {
    id: "11",
    name: "Trasferta Torino",
    type: "trasferta",
    price: 219,
    duration: "1 giorno",
    description: "Roma vs Juventus all'Allianz Stadium",
    features: ["Bus GT premium", "Biglietto settore ospiti", "Kit tifo", "Pranzo gourmet", "Accompagnatore esperto"],
    active: true,
    popular: true,
    transport: {
      type: "bus",
      partenza: "Roma Termini",
      arrivo: "Torino Allianz Stadium",
      orario: "05:00",
    },
  },
  // Tour
  {
    id: "12",
    name: "Tour Storico Roma",
    type: "tour",
    price: 65,
    duration: "4 ore",
    description: "Scopri i luoghi che hanno fatto la storia giallorossa",
    features: ["Stadio Olimpico (esterno)", "Centro Sportivo Trigoria", "Campo Testaccio storico", "Monumento Di Bartolomei"],
    active: true,
    popular: false,
  },
  {
    id: "13",
    name: "Roma Gastronomica",
    type: "tour",
    price: 95,
    duration: "5 ore",
    description: "I ristoranti e locali preferiti dai giocatori",
    features: ["Trattoria della Lupa", "Pizzeria del Romanista", "Bar Sport Giallorosso", "Gelateria Totti", "Degustazioni incluse"],
    active: true,
    popular: true,
  },
  {
    id: "14",
    name: "Roma by Night",
    type: "tour",
    price: 55,
    duration: "3 ore",
    description: "I locali dove festeggiare le vittorie della Roma",
    features: ["Pub Curva Sud", "Disco Olimpico Club", "Wine Bar 1927", "Rooftop Giallorosso"],
    active: true,
    popular: false,
  },
];

const defaultArticles: Article[] = [
  {
    id: "1",
    title: "Roma-Lazio: Il Derby della Capitale si Avvicina",
    excerpt: "Tutto quello che devi sapere sul derby più sentito d'Italia. La rivalità storica, i protagonisti e le emozioni che solo questa sfida può regalare.",
    content: "<p>Il derby della Capitale è molto più di una semplice partita di calcio...</p>",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    author: "Marco Rossi",
    date: "2025-01-10",
    category: "Partite",
    status: "published",
    featured: true,
  },
  {
    id: "2",
    title: "La Leggenda di Francesco Totti: 25 Anni di Amore Giallorosso",
    excerpt: "307 gol, infinite emozioni e un amore eterno per Roma. Il racconto completo della leggenda romanista.",
    content: "<p>Francesco Totti non è solo un giocatore, è un simbolo...</p>",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800",
    author: "Giulia Bianchi",
    date: "2025-01-08",
    category: "Leggende",
    status: "published",
    featured: true,
  },
  {
    id: "3",
    title: "Stadio della Roma: Tutti gli Aggiornamenti sul Nuovo Impianto",
    excerpt: "Il progetto del nuovo stadio della Roma procede. Ecco tutti i dettagli sulla nuova casa giallorossa.",
    content: "<p>Il sogno di un nuovo stadio sta per diventare realtà...</p>",
    image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800",
    author: "Luca Verdi",
    date: "2025-01-07",
    category: "News",
    status: "published",
  },
  {
    id: "4",
    title: "Calciomercato Roma: I Nomi Caldi per Gennaio",
    excerpt: "Le ultime indiscrezioni sul mercato della Roma. Nomi caldi e possibili colpi in entrata e uscita.",
    content: "<p>La sessione di mercato invernale si avvicina...</p>",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800",
    author: "Andrea Neri",
    date: "2025-01-06",
    category: "Calciomercato",
    status: "published",
  },
  {
    id: "5",
    title: "Daniele De Rossi: Il Cuore Giallorosso",
    excerpt: "La storia del centrocampista che ha dedicato la carriera alla maglia giallorossa. Grinta, talento e romanismo puro.",
    content: "<p>Daniele De Rossi rappresenta l'essenza del romanismo...</p>",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800",
    author: "Paolo Conti",
    date: "2025-01-05",
    category: "Leggende",
    status: "published",
  },
  {
    id: "6",
    title: "Lo Scudetto 2001: La Stagione Indimenticabile",
    excerpt: "Il racconto dello storico tricolore conquistato dalla Roma di Capello. I protagonisti e le emozioni di quella stagione magica.",
    content: "<p>17 giugno 2001, una data scolpita nel cuore di ogni romanista...</p>",
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800",
    author: "Maria Russo",
    date: "2025-01-04",
    category: "Storia",
    status: "published",
  },
  {
    id: "7",
    title: "Intervista Esclusiva: Cafu Racconta i Suoi Anni alla Roma",
    excerpt: "Il terzino brasiliano racconta i suoi anni alla Roma tra emozioni, trofei e l'amore per la città eterna.",
    content: "<p>Marcos Evangelista de Moraes, per tutti Cafu...</p>",
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800",
    author: "Francesco Gialli",
    date: "2025-01-03",
    category: "Interviste",
    status: "published",
  },
  {
    id: "8",
    title: "Primavera Roma: I Talenti del Futuro Giallorosso",
    excerpt: "Il settore giovanile della Roma sta sfornando talenti. Ecco i giovani pronti a conquistare la prima squadra.",
    content: "<p>La cantera giallorossa continua a produrre talenti...</p>",
    image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800",
    author: "Sara Martini",
    date: "2025-01-02",
    category: "News",
    status: "published",
  },
  {
    id: "9",
    title: "Guida allo Stadio Olimpico: Come Arrivare e Cosa Vedere",
    excerpt: "Tutto quello che devi sapere per vivere al meglio la tua esperienza allo Stadio Olimpico di Roma.",
    content: "<p>Lo Stadio Olimpico è il tempio del calcio romano...</p>",
    image: "https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?w=800",
    author: "Marco Rossi",
    date: "2025-01-01",
    category: "Guide",
    status: "published",
  },
  {
    id: "10",
    title: "Trigoria: Dentro il Centro Sportivo della Roma",
    excerpt: "Un tour virtuale nel centro sportivo Fulvio Bernardini, la casa degli allenamenti giallorossi.",
    content: "<p>Trigoria è molto più di un centro sportivo...</p>",
    image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800",
    author: "Luca Verdi",
    date: "2024-12-30",
    category: "News",
    status: "published",
  },
];

// Matches Hook
export const useMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(MATCHES_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Always ensure we have at least the default data structure
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMatches(parsed);
        } else {
          localStorage.setItem(MATCHES_KEY, JSON.stringify(defaultMatches));
          setMatches(defaultMatches);
        }
      } catch {
        localStorage.setItem(MATCHES_KEY, JSON.stringify(defaultMatches));
        setMatches(defaultMatches);
      }
    } else {
      localStorage.setItem(MATCHES_KEY, JSON.stringify(defaultMatches));
      setMatches(defaultMatches);
    }
    setLoading(false);
  }, []);

  const upcomingMatches = matches
    .filter(m => new Date(m.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const nextMatch = upcomingMatches[0];

  return { matches, upcomingMatches, nextMatch, loading };
};

// Packages Hook
export const usePackages = () => {
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(PACKAGES_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Check if we have the new extended data (more than 5 packages means updated)
        if (Array.isArray(parsed) && parsed.length >= 10) {
          setPackages(parsed);
        } else {
          // Replace with new extended defaults
          localStorage.setItem(PACKAGES_KEY, JSON.stringify(defaultPackages));
          setPackages(defaultPackages);
        }
      } catch {
        localStorage.setItem(PACKAGES_KEY, JSON.stringify(defaultPackages));
        setPackages(defaultPackages);
      }
    } else {
      localStorage.setItem(PACKAGES_KEY, JSON.stringify(defaultPackages));
      setPackages(defaultPackages);
    }
    setLoading(false);
  }, []);

  const activePackages = packages.filter(p => p.active);
  const ticketPackages = activePackages.filter(p => p.type === "biglietto");
  const experiencePackages = activePackages.filter(p => p.type === "esperienza");
  const trasfertaPackages = activePackages.filter(p => p.type === "trasferta");
  const tourPackages = activePackages.filter(p => p.type === "tour");

  return { 
    packages, 
    activePackages, 
    ticketPackages, 
    experiencePackages, 
    trasfertaPackages, 
    tourPackages, 
    loading 
  };
};

// Articles Hook
export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(ARTICLES_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Check if we have the new extended data
        if (Array.isArray(parsed) && parsed.length >= 8) {
          setArticles(parsed);
        } else {
          localStorage.setItem(ARTICLES_KEY, JSON.stringify(defaultArticles));
          setArticles(defaultArticles);
        }
      } catch {
        localStorage.setItem(ARTICLES_KEY, JSON.stringify(defaultArticles));
        setArticles(defaultArticles);
      }
    } else {
      localStorage.setItem(ARTICLES_KEY, JSON.stringify(defaultArticles));
      setArticles(defaultArticles);
    }
    setLoading(false);
  }, []);

  const publishedArticles = articles.filter(a => a.status === "published");
  const featuredArticles = publishedArticles.filter(a => a.featured);

  return { articles, publishedArticles, featuredArticles, loading };
};
