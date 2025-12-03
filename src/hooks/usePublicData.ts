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

const MATCHES_KEY = "roma_matches";
const PACKAGES_KEY = "roma_packages";

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
    ticketPrice: 45,
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
    ticketPrice: 65,
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
    ticketPrice: 75,
    isHome: true,
  },
];

const defaultPackages: PackageItem[] = [
  {
    id: "1",
    name: "Curva Sud",
    type: "biglietto",
    price: 45,
    description: "L'esperienza più autentica tra i veri tifosi",
    features: ["Posto in Curva Sud", "Accesso 2 ore prima", "Sciarpa omaggio", "Bevanda inclusa"],
    active: true,
    popular: false,
  },
  {
    id: "2",
    name: "Tribuna Monte Mario",
    type: "biglietto",
    price: 85,
    description: "Vista panoramica sullo stadio",
    features: ["Posto centrale", "Seduta numerata", "Accesso area hospitality", "Programma partita", "Parcheggio incluso"],
    active: true,
    popular: true,
  },
  {
    id: "3",
    name: "Roma Experience",
    type: "esperienza",
    price: 120,
    duration: "1 giorno",
    description: "Vivi una giornata da vero romanista",
    features: ["Tour dello stadio", "Visita museo AS Roma", "Biglietto partita", "Pranzo in ristorante partner", "Kit merchandising"],
    image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800",
    active: true,
    popular: true,
  },
  {
    id: "4",
    name: "Weekend Giallorosso",
    type: "esperienza",
    price: 350,
    duration: "2 giorni",
    description: "Un weekend completo nella Capitale",
    features: ["1 notte in hotel 4 stelle", "Biglietto partita Tribuna", "Tour Roma giallorossa", "Cena tipica romana", "Transfer da/per stadio"],
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800",
    active: true,
    popular: false,
  },
  {
    id: "5",
    name: "Trasferta Milano",
    type: "trasferta",
    price: 199,
    duration: "1 giorno",
    description: "Segui la Roma a San Siro",
    features: ["Bus GT andata/ritorno", "Biglietto settore ospiti", "Pranzo incluso", "Guida dedicata"],
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
    id: "6",
    name: "Tour Storico Roma",
    type: "tour",
    price: 65,
    duration: "4 ore",
    description: "Scopri i luoghi che hanno fatto la storia giallorossa",
    features: ["Stadio Olimpico", "Trigoria", "Campo Testaccio", "Monumento Agostino Di Bartolomei"],
    active: true,
    popular: false,
  },
];

export const useMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(MATCHES_KEY);
    if (stored) {
      setMatches(JSON.parse(stored));
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

export const usePackages = () => {
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(PACKAGES_KEY);
    if (stored) {
      setPackages(JSON.parse(stored));
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
