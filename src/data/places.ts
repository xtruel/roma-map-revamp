export type Category = "monumenti" | "stadi" | "locali" | "ristoranti" | "musei" | "shopping" | "chiese" | "piazze";

export interface Place {
  id: string;
  name: string;
  category: Category;
  lat: number;
  lng: number;
  description: string;
  address: string;
  image: string;
}

export const categories: { id: Category; label: string; color: string }[] = [
  { id: "monumenti", label: "Monumenti", color: "#8B0000" },
  { id: "stadi", label: "Stadi", color: "#FFD700" },
  { id: "locali", label: "Locali", color: "#FF6B35" },
  { id: "ristoranti", label: "Ristoranti", color: "#CD853F" },
  { id: "musei", label: "Musei", color: "#4169E1" },
  { id: "shopping", label: "Shopping", color: "#228B22" },
  { id: "chiese", label: "Chiese", color: "#9932CC" },
  { id: "piazze", label: "Piazze", color: "#FF69B4" },
];

export const defaultPlaces: Place[] = [
  // Stadi
  { id: "1", name: "Stadio Olimpico", category: "stadi", lat: 41.9341, lng: 12.4547, description: "La casa della Roma dal 1953. Capacità 72.698 posti. Teatro di infinite emozioni giallorosse.", address: "Viale dei Gladiatori, 00135 Roma", image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800" },
  { id: "2", name: "Centro Sportivo Fulvio Bernardini", category: "stadi", lat: 41.7844, lng: 12.4692, description: "Il centro di allenamento della prima squadra a Trigoria, cuore pulsante del calcio romanista.", address: "Via di Trigoria, 00128 Roma", image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800" },
  { id: "3", name: "Stadio Tre Fontane", category: "stadi", lat: 41.8303, lng: 12.4714, description: "Casa della Roma Femminile e della Primavera giallorossa.", address: "Via delle Tre Fontane, 00144 Roma", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800" },
  
  // Monumenti
  { id: "4", name: "Colosseo", category: "monumenti", lat: 41.8902, lng: 12.4922, description: "L'anfiteatro Flavio, simbolo eterno di Roma. Il più grande anfiteatro del mondo antico.", address: "Piazza del Colosseo, 00184 Roma", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800" },
  { id: "5", name: "Fontana di Trevi", category: "monumenti", lat: 41.9009, lng: 12.4833, description: "La fontana più famosa del mondo. Lancia una moneta per tornare a Roma!", address: "Piazza di Trevi, 00187 Roma", image: "https://images.unsplash.com/photo-1525874684015-58379d421a52?w=800" },
  { id: "6", name: "Pantheon", category: "monumenti", lat: 41.8986, lng: 12.4769, description: "Tempio romano dedicato a tutti gli dei, capolavoro dell'architettura antica.", address: "Piazza della Rotonda, 00186 Roma", image: "https://images.unsplash.com/photo-1548585744-e3c90506d4e6?w=800" },
  { id: "7", name: "Castel Sant'Angelo", category: "monumenti", lat: 41.9031, lng: 12.4663, description: "Mausoleo dell'imperatore Adriano, poi fortezza papale. Vista mozzafiato su Roma.", address: "Lungotevere Castello, 50, 00193 Roma", image: "https://images.unsplash.com/photo-1569155165047-e95ab7cf16fb?w=800" },
  { id: "8", name: "Altare della Patria", category: "monumenti", lat: 41.8946, lng: 12.4833, description: "Il Vittoriano, monumento nazionale dedicato a Vittorio Emanuele II.", address: "Piazza Venezia, 00186 Roma", image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=800" },
  { id: "9", name: "Arco di Costantino", category: "monumenti", lat: 41.8897, lng: 12.4908, description: "Arco trionfale eretto per celebrare la vittoria di Costantino a Ponte Milvio.", address: "Via di San Gregorio, 00184 Roma", image: "https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?w=800" },
  { id: "10", name: "Fori Imperiali", category: "monumenti", lat: 41.8925, lng: 12.4853, description: "Complesso di piazze monumentali costruite dagli imperatori romani.", address: "Via dei Fori Imperiali, 00186 Roma", image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800" },
  
  // Piazze
  { id: "11", name: "Piazza Navona", category: "piazze", lat: 41.8992, lng: 12.4731, description: "Una delle piazze più belle di Roma con la Fontana dei Quattro Fiumi del Bernini.", address: "Piazza Navona, 00186 Roma", image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800" },
  { id: "12", name: "Piazza di Spagna", category: "piazze", lat: 41.9058, lng: 12.4823, description: "La scalinata più famosa del mondo con la Fontana della Barcaccia.", address: "Piazza di Spagna, 00187 Roma", image: "https://images.unsplash.com/photo-1555992828-ca4dbe41d294?w=800" },
  { id: "13", name: "Campo de' Fiori", category: "piazze", lat: 41.8956, lng: 12.4722, description: "Piazza storica con mercato mattutino e vita notturna animata.", address: "Campo de' Fiori, 00186 Roma", image: "https://images.unsplash.com/photo-1592482614977-dbb0ff9d2f87?w=800" },
  { id: "14", name: "Piazza del Popolo", category: "piazze", lat: 41.9106, lng: 12.4764, description: "Grande piazza neoclassica con l'obelisco egizio al centro.", address: "Piazza del Popolo, 00187 Roma", image: "https://images.unsplash.com/photo-1578390432942-d2f63e6e2c6b?w=800" },
  
  // Chiese
  { id: "15", name: "Basilica di San Pietro", category: "chiese", lat: 41.9022, lng: 12.4539, description: "La più grande chiesa del mondo, cuore della cristianità.", address: "Piazza San Pietro, 00120 Città del Vaticano", image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800" },
  { id: "16", name: "Basilica di San Giovanni in Laterano", category: "chiese", lat: 41.8859, lng: 12.5056, description: "Cattedrale di Roma e madre di tutte le chiese del mondo.", address: "Piazza di San Giovanni in Laterano, 4, 00184 Roma", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800" },
  { id: "17", name: "Santa Maria Maggiore", category: "chiese", lat: 41.8976, lng: 12.4986, description: "Una delle quattro basiliche papali maggiori di Roma.", address: "Piazza di Santa Maria Maggiore, 00100 Roma", image: "https://images.unsplash.com/photo-1563284222-8f63d2d5a0f9?w=800" },
  
  // Musei
  { id: "18", name: "Musei Vaticani", category: "musei", lat: 41.9065, lng: 12.4536, description: "Uno dei musei più grandi del mondo con la Cappella Sistina.", address: "Viale Vaticano, 00165 Roma", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800" },
  { id: "19", name: "Galleria Borghese", category: "musei", lat: 41.9142, lng: 12.4922, description: "Capolavori di Bernini, Caravaggio e Raffaello in Villa Borghese.", address: "Piazzale Scipione Borghese, 5, 00197 Roma", image: "https://images.unsplash.com/photo-1565060169194-19fabf63012c?w=800" },
  { id: "20", name: "Musei Capitolini", category: "musei", lat: 41.8931, lng: 12.4828, description: "Il museo pubblico più antico del mondo sul Campidoglio.", address: "Piazza del Campidoglio, 1, 00186 Roma", image: "https://images.unsplash.com/photo-1568454537842-d933259bb258?w=800" },
  { id: "21", name: "MAXXI", category: "musei", lat: 41.9281, lng: 12.4675, description: "Museo nazionale delle arti del XXI secolo di Zaha Hadid.", address: "Via Guido Reni, 4A, 00196 Roma", image: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=800" },
  
  // Shopping
  { id: "22", name: "AS Roma Store - Via del Corso", category: "shopping", lat: 41.9029, lng: 12.4802, description: "Il flagship store ufficiale della Roma nel cuore della città.", address: "Via del Corso, 34, 00186 Roma", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800" },
  { id: "23", name: "AS Roma Store - Stadio Olimpico", category: "shopping", lat: 41.9335, lng: 12.4542, description: "Store ufficiale allo stadio con merchandise esclusivo.", address: "Viale dei Gladiatori, 00135 Roma", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800" },
  { id: "24", name: "Via Condotti", category: "shopping", lat: 41.9053, lng: 12.4798, description: "La via dello shopping di lusso con le grandi firme.", address: "Via dei Condotti, 00187 Roma", image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800" },
  
  // Ristoranti
  { id: "25", name: "Trattoria della Lupa", category: "ristoranti", lat: 41.8894, lng: 12.4700, description: "Cucina romana tradizionale nel cuore di Trastevere. Cacio e pepe leggendaria.", address: "Via della Lungaretta, 101, 00153 Roma", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800" },
  { id: "26", name: "Da Enzo al 29", category: "ristoranti", lat: 41.8867, lng: 12.4689, description: "Osteria storica con i migliori piatti della tradizione romanesca.", address: "Via dei Vascellari, 29, 00153 Roma", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800" },
  { id: "27", name: "Roscioli", category: "ristoranti", lat: 41.8947, lng: 12.4736, description: "Salumeria e ristorante gourmet, tempio della carbonara.", address: "Via dei Giubbonari, 21, 00186 Roma", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800" },
  
  // Locali
  { id: "28", name: "Bar Romanista Testaccio", category: "locali", lat: 41.8753, lng: 12.4764, description: "Il ritrovo storico dei tifosi giallorossi prima delle partite.", address: "Via di Monte Testaccio, 00153 Roma", image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800" },
  { id: "29", name: "Pub The Yellow", category: "locali", lat: 41.9014, lng: 12.4992, description: "Birra artigianale e maxischermo per tutte le partite della Roma.", address: "Via Cavour, 158, 00184 Roma", image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800" },
  { id: "30", name: "Circolo Giallorosso EUR", category: "locali", lat: 41.8358, lng: 12.4706, description: "Club dei tifosi con eventi, proiezioni e incontri con ex giocatori.", address: "Viale Europa, 00144 Roma", image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800" },
];

// LocalStorage helpers
const PLACES_KEY = "roma_places";

export const getPlaces = (): Place[] => {
  const stored = localStorage.getItem(PLACES_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(PLACES_KEY, JSON.stringify(defaultPlaces));
  return defaultPlaces;
};

export const savePlaces = (places: Place[]): void => {
  localStorage.setItem(PLACES_KEY, JSON.stringify(places));
};

export const addPlace = (place: Omit<Place, "id">): Place => {
  const places = getPlaces();
  const newPlace = { ...place, id: Date.now().toString() };
  places.push(newPlace);
  savePlaces(places);
  return newPlace;
};

export const updatePlace = (id: string, updates: Partial<Place>): void => {
  const places = getPlaces();
  const index = places.findIndex(p => p.id === id);
  if (index !== -1) {
    places[index] = { ...places[index], ...updates };
    savePlaces(places);
  }
};

export const deletePlace = (id: string): void => {
  const places = getPlaces().filter(p => p.id !== id);
  savePlaces(places);
};
