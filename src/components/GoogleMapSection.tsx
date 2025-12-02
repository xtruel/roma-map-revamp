import { useState, useEffect, useCallback } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MapPin } from "lucide-react";
import { Place, Category, categories, getPlaces } from "@/data/places";

const mapContainerStyle = { width: "100%", height: "600px" };
const center = { lat: 41.9028, lng: 12.4964 };

const mapStyles = [
  { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
];

// Get API key once at module load time
const STORED_API_KEY = typeof window !== "undefined" 
  ? localStorage.getItem("google_maps_key") || "AIzaSyDEMO_KEY_REPLACE_ME_12345"
  : "AIzaSyDEMO_KEY_REPLACE_ME_12345";

// Set demo key if not present
if (typeof window !== "undefined" && !localStorage.getItem("google_maps_key")) {
  localStorage.setItem("google_maps_key", STORED_API_KEY);
}

const GoogleMapSection = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [inputKey, setInputKey] = useState("");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    setPlaces(getPlaces());
  }, []);

  const onMapLoad = useCallback(() => {
    setMapLoaded(true);
  }, []);

  const handleApiKeySubmit = () => {
    if (inputKey.trim()) {
      localStorage.setItem("google_maps_key", inputKey.trim());
      window.location.reload();
    }
  };

  const filteredPlaces = activeCategory
    ? places.filter(p => p.category === activeCategory)
    : places;

  const getCategoryColor = (category: Category) => {
    return categories.find(c => c.id === category)?.color || "#8B0000";
  };

  return (
    <section id="mappa" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-5xl md:text-6xl text-foreground mb-4">
            Mappa Giallorossa
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Scopri tutti i luoghi iconici della Roma: dallo stadio Olimpico ai centri
            sportivi, dai negozi ufficiali ai luoghi storici.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Button
            variant={activeCategory === null ? "default" : "outline"}
            onClick={() => setActiveCategory(null)}
            className={activeCategory === null ? "bg-gradient-roma text-white" : ""}
          >
            Tutti ({places.length})
          </Button>
          {categories.map((cat) => {
            const count = places.filter(p => p.category === cat.id).length;
            return (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? "default" : "outline"}
                onClick={() => setActiveCategory(cat.id)}
                className={activeCategory === cat.id ? "bg-gradient-roma text-white" : "hover:border-primary"}
              >
                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: cat.color }} />
                {cat.label} ({count})
              </Button>
            );
          })}
        </div>

        {/* Map */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-roma-gold/30">
          {showKeyInput ? (
            <div className="h-[600px] bg-card flex items-center justify-center">
              <div className="text-center max-w-md p-8">
                <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="font-display text-2xl mb-4">Configura Google Maps</h3>
                <p className="text-muted-foreground mb-6">
                  Inserisci la tua Google Maps API Key per visualizzare la mappa interattiva.
                </p>
                <Input
                  placeholder="AIzaSy..."
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  className="mb-4"
                />
                <Button onClick={handleApiKeySubmit} className="bg-gradient-roma text-white">
                  Attiva Mappa
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  Ottieni la key su{" "}
                  <a href="https://console.cloud.google.com/apis/credentials" target="_blank" className="text-primary underline">
                    Google Cloud Console
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <LoadScript googleMapsApiKey={STORED_API_KEY}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={12}
                options={{ styles: mapStyles, disableDefaultUI: false, zoomControl: true }}
                onLoad={onMapLoad}
              >
                {mapLoaded && filteredPlaces.map((place) => (
                  <Marker
                    key={place.id}
                    position={{ lat: place.lat, lng: place.lng }}
                    onClick={() => setSelectedPlace(place)}
                    icon={{
                      path: window.google?.maps?.SymbolPath?.CIRCLE || 0,
                      fillColor: getCategoryColor(place.category),
                      fillOpacity: 1,
                      strokeColor: "#FFD700",
                      strokeWeight: 3,
                      scale: 12
                    }}
                  />
                ))}

                {selectedPlace && (
                  <InfoWindow
                    position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
                    onCloseClick={() => setSelectedPlace(null)}
                  >
                    <div className="max-w-xs">
                      {selectedPlace.image && (
                        <img 
                          src={selectedPlace.image} 
                          alt={selectedPlace.name}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                      )}
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{selectedPlace.name}</h3>
                      <span 
                        className="inline-block text-xs px-2 py-0.5 rounded text-white mb-2"
                        style={{ backgroundColor: getCategoryColor(selectedPlace.category) }}
                      >
                        {categories.find(c => c.id === selectedPlace.category)?.label}
                      </span>
                      <p className="text-sm text-gray-600 mb-2">{selectedPlace.description}</p>
                      <p className="text-xs text-gray-500">📍 {selectedPlace.address}</p>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
          )}
          
          {/* Change API Key button */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowKeyInput(true)}
            className="absolute top-4 right-4 bg-background/90 backdrop-blur"
          >
            Cambia API Key
          </Button>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-roma-gold" style={{ backgroundColor: cat.color }} />
              <span className="text-sm text-muted-foreground">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoogleMapSection;
