import { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Landmark, Beer, UtensilsCrossed, Building2, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Category = "monumenti" | "locali" | "ristoranti" | "musei" | "shopping";

interface Place {
  id: number;
  name: string;
  category: Category;
  lat: number;
  lng: number;
  description: string;
  address: string;
}

const categories: { id: Category; label: string; icon: typeof Landmark; color: string }[] = [
  { id: "monumenti", label: "Monumenti", icon: Landmark, color: "#8B0000" },
  { id: "locali", label: "Locali", icon: Beer, color: "#FFD700" },
  { id: "ristoranti", label: "Ristoranti", icon: UtensilsCrossed, color: "#CD853F" },
  { id: "musei", label: "Musei", icon: Building2, color: "#4169E1" },
  { id: "shopping", label: "Shopping", icon: ShoppingBag, color: "#228B22" },
];

const places: Place[] = [
  { id: 1, name: "Stadio Olimpico", category: "monumenti", lat: 41.9341, lng: 12.4547, description: "La casa della Roma", address: "Viale dei Gladiatori" },
  { id: 2, name: "Colosseo", category: "monumenti", lat: 41.8902, lng: 12.4922, description: "Simbolo di Roma", address: "Piazza del Colosseo" },
  { id: 3, name: "Fontana di Trevi", category: "monumenti", lat: 41.9009, lng: 12.4833, description: "La fontana più famosa", address: "Piazza di Trevi" },
  { id: 4, name: "Pantheon", category: "monumenti", lat: 41.8986, lng: 12.4769, description: "Tempio romano", address: "Piazza della Rotonda" },
  { id: 5, name: "Bar Romanista", category: "locali", lat: 41.9028, lng: 12.4964, description: "Il ritrovo dei tifosi", address: "Via del Corso" },
  { id: 6, name: "Pub Giallorosso", category: "locali", lat: 41.8919, lng: 12.5113, description: "Birra e partite", address: "Via Casilina" },
  { id: 7, name: "Trattoria della Lupa", category: "ristoranti", lat: 41.8955, lng: 12.4823, description: "Cucina romana", address: "Trastevere" },
  { id: 8, name: "AS Roma Store", category: "shopping", lat: 41.9029, lng: 12.4663, description: "Negozio ufficiale", address: "Via del Corso 34" },
  { id: 9, name: "Museo della Roma", category: "musei", lat: 41.9341, lng: 12.4567, description: "Storia giallorossa", address: "Stadio Olimpico" },
  { id: 10, name: "Castel Sant'Angelo", category: "monumenti", lat: 41.9031, lng: 12.4663, description: "Mausoleo imperiale", address: "Lungotevere Castello" },
];

const MapSection = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [mapboxToken, setMapboxToken] = useState("");
  const [isMapReady, setIsMapReady] = useState(false);

  const createMarkerElement = (place: Place) => {
    const category = categories.find((c) => c.id === place.category);
    const el = document.createElement("div");
    el.className = "marker-container";
    el.innerHTML = `
      <svg width="48" height="60" viewBox="0 0 48 60" xmlns="http://www.w3.org/2000/svg" style="cursor: pointer; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3)); transition: all 0.3s ease;">
        <defs>
          <linearGradient id="grad-${place.id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${category?.color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${category?.color}dd;stop-opacity:1" />
          </linearGradient>
        </defs>
        <path d="M24 2C12 2 2 12 2 24c0 16 22 34 22 34s22-18 22-34C46 12 36 2 24 2z" 
              fill="url(#grad-${place.id})" 
              stroke="#FFD700" 
              stroke-width="3"/>
        <circle cx="24" cy="22" r="12" fill="#FFD700"/>
      </svg>
    `;
    
    el.style.cursor = "pointer";
    el.addEventListener("mouseenter", () => {
      el.style.transform = "scale(1.2) translateY(-5px)";
      el.style.zIndex = "100";
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
      el.style.zIndex = "";
    });
    
    return el;
  };

  const initMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [12.4964, 41.9028],
      zoom: 12,
      pitch: 45,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({ visualizePitch: true }),
      "top-right"
    );

    map.current.on("load", () => {
      setIsMapReady(true);
      addMarkers();
    });
  };

  const addMarkers = () => {
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const filteredPlaces = activeCategory
      ? places.filter((p) => p.category === activeCategory)
      : places;

    filteredPlaces.forEach((place) => {
      const el = createMarkerElement(place);
      const category = categories.find((c) => c.id === place.category);

      const popup = new mapboxgl.Popup({
        offset: 30,
        closeButton: true,
        maxWidth: "300px",
      }).setHTML(`
        <div style="padding: 16px; background: linear-gradient(135deg, #8B0000, #6B0000); color: white; border-radius: 8px;">
          <h3 style="font-family: 'Bebas Neue', sans-serif; font-size: 1.5rem; margin: 0 0 8px 0; color: #FFD700;">${place.name}</h3>
          <p style="font-size: 0.875rem; margin: 0 0 8px 0; opacity: 0.9;">${place.description}</p>
          <p style="font-size: 0.75rem; margin: 0; opacity: 0.7;">📍 ${place.address}</p>
          <span style="display: inline-block; margin-top: 12px; padding: 4px 12px; background: ${category?.color}; border-radius: 20px; font-size: 0.75rem; font-weight: 600;">
            ${category?.label}
          </span>
        </div>
      `);

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([place.lng, place.lat])
        .setPopup(popup)
        .addTo(map.current!);

      markersRef.current.push(marker);
    });
  };

  useEffect(() => {
    if (isMapReady) {
      addMarkers();
    }
  }, [activeCategory, isMapReady]);

  return (
    <section id="mappa" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-5xl md:text-6xl text-foreground mb-4">
            Mappa Giallorossa
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Scopri tutti i luoghi iconici della Roma: dallo stadio Olimpico ai centri
            sportivi, dai negozi ufficiali ai luoghi storici che hanno fatto la
            storia giallorossa.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Button
            variant={activeCategory === null ? "default" : "outline"}
            onClick={() => setActiveCategory(null)}
            className={activeCategory === null ? "bg-gradient-roma text-white" : ""}
          >
            Tutti
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? "default" : "outline"}
              onClick={() => setActiveCategory(cat.id)}
              className={
                activeCategory === cat.id
                  ? "bg-gradient-roma text-white"
                  : "hover:border-primary"
              }
            >
              <cat.icon className="h-4 w-4 mr-2" />
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Map Container */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-roma-gold/30">
          {!mapboxToken ? (
            <div className="h-[600px] bg-card flex items-center justify-center">
              <div className="text-center max-w-md p-8">
                <Landmark className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="font-display text-2xl mb-4">Configura Mapbox</h3>
                <p className="text-muted-foreground mb-6">
                  Inserisci il tuo Mapbox Public Token per visualizzare la mappa
                  interattiva.
                </p>
                <Input
                  placeholder="pk.eyJ1I..."
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  className="mb-4"
                />
                <Button onClick={initMap} className="bg-gradient-roma text-white">
                  Attiva Mappa
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  Ottieni il token su{" "}
                  <a
                    href="https://mapbox.com"
                    target="_blank"
                    className="text-primary underline"
                  >
                    mapbox.com
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <div ref={mapContainer} className="h-[600px] w-full" />
          )}

          {/* Map Overlay Gradient */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              <span className="text-sm text-muted-foreground">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MapSection;
