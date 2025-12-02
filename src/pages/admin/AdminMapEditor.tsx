import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit2, Trash2, MapPin, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Place, Category, categories, getPlaces, addPlace, deletePlace, updatePlace } from "@/data/places";

const mapContainerStyle = { width: "100%", height: "500px" };
const center = { lat: 41.9028, lng: 12.4964 };
const DEMO_KEY = "AIzaSyDEMO_KEY_REPLACE_ME_12345";
const STORED_API_KEY = localStorage.getItem("google_maps_key") || DEMO_KEY;

const AdminMapEditor = () => {
  const { isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [places, setPlaces] = useState<Place[]>([]);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlace, setEditingPlace] = useState<Place | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [inputKey, setInputKey] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [formData, setFormData] = useState<Partial<Place>>({
    name: "", category: "monumenti", lat: 41.9028, lng: 12.4964, description: "", address: "", image: ""
  });

  const onMapLoad = useCallback(() => {
    setMapLoaded(true);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
      return;
    }
    setPlaces(getPlaces());
  }, [isAuthenticated, navigate]);

  const handleApiKeySubmit = () => {
    if (inputKey) {
      localStorage.setItem("google_maps_key", inputKey);
      toast({ title: "API Key salvata" });
      window.location.reload();
    }
  };

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setFormData(prev => ({
        ...prev,
        lat: e.latLng!.lat(),
        lng: e.latLng!.lng()
      }));
    }
  }, []);

  const handleSubmit = () => {
    if (!formData.name || !formData.category) {
      toast({ title: "Errore", description: "Compila tutti i campi obbligatori", variant: "destructive" });
      return;
    }

    if (editingPlace) {
      updatePlace(editingPlace.id, formData);
      toast({ title: "Luogo aggiornato" });
    } else {
      addPlace(formData as Omit<Place, "id">);
      toast({ title: "Luogo aggiunto" });
    }

    setPlaces(getPlaces());
    setIsDialogOpen(false);
    setEditingPlace(null);
    setFormData({ name: "", category: "monumenti", lat: 41.9028, lng: 12.4964, description: "", address: "", image: "" });
  };

  const handleEdit = (place: Place) => {
    setEditingPlace(place);
    setFormData(place);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deletePlace(id);
    setPlaces(getPlaces());
    toast({ title: "Luogo eliminato" });
  };

  const filteredPlaces = places.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const getCategoryColor = (category: Category) => {
    return categories.find(c => c.id === category)?.color || "#8B0000";
  };

  if (!isAuthenticated) return null;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-display text-4xl text-foreground">Editor Mappa</h1>
            <p className="text-muted-foreground">Gestisci i luoghi sulla mappa ({places.length} luoghi)</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-roma text-white" onClick={() => { setEditingPlace(null); setFormData({ name: "", category: "monumenti", lat: 41.9028, lng: 12.4964, description: "", address: "", image: "" }); }}>
                <Plus className="h-4 w-4 mr-2" /> Aggiungi Luogo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingPlace ? "Modifica Luogo" : "Nuovo Luogo"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome *</Label>
                    <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Categoria *</Label>
                    <Select value={formData.category} onValueChange={v => setFormData({ ...formData, category: v as Category })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Descrizione</Label>
                  <Textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>Indirizzo</Label>
                  <Input value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>URL Immagine</Label>
                  <Input value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} placeholder="https://..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Latitudine</Label>
                    <Input type="number" step="any" value={formData.lat} onChange={e => setFormData({ ...formData, lat: parseFloat(e.target.value) })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Longitudine</Label>
                    <Input type="number" step="any" value={formData.lng} onChange={e => setFormData({ ...formData, lng: parseFloat(e.target.value) })} />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Clicca sulla mappa per selezionare le coordinate</p>
                <p className="text-xs text-muted-foreground italic">La mini-mappa è disponibile nella vista principale</p>
                <Button onClick={handleSubmit} className="w-full bg-gradient-roma text-white">
                  {editingPlace ? "Salva Modifiche" : "Aggiungi Luogo"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="border-border mb-6">
          <CardContent className="p-4">
            <div className="flex gap-2 items-center">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Aggiorna API Key:</span>
              <Input value={inputKey} onChange={e => setInputKey(e.target.value)} placeholder="AIzaSy..." className="max-w-xs" />
              <Button onClick={handleApiKeySubmit} size="sm" variant="outline">Salva</Button>
            </div>
          </CardContent>
        </Card>

        <LoadScript googleMapsApiKey={STORED_API_KEY}>
          <div className="rounded-xl overflow-hidden border-4 border-roma-gold/30 shadow-xl">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={12}
              onLoad={onMapLoad}
            >
              {mapLoaded && places.map(place => (
                <Marker
                  key={place.id}
                  position={{ lat: place.lat, lng: place.lng }}
                  onClick={() => setSelectedPlace(place)}
                  icon={{
                    path: window.google?.maps?.SymbolPath?.CIRCLE || 0,
                    fillColor: getCategoryColor(place.category),
                    fillOpacity: 1,
                    strokeColor: "#FFD700",
                    strokeWeight: 2,
                    scale: 10
                  }}
                />
              ))}
              {selectedPlace && (
                <InfoWindow
                  position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
                  onCloseClick={() => setSelectedPlace(null)}
                >
                  <div className="p-2 max-w-xs">
                    {selectedPlace.image && (
                      <img src={selectedPlace.image} alt={selectedPlace.name} className="w-full h-24 object-cover rounded mb-2" />
                    )}
                    <h3 className="font-bold text-gray-900">{selectedPlace.name}</h3>
                    <p className="text-sm text-gray-600">{selectedPlace.description}</p>
                    <p className="text-xs text-gray-500 mt-1">📍 {selectedPlace.address}</p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </div>
        </LoadScript>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Cerca luoghi..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPlaces.map(place => (
                <Card key={place.id} className="border-border hover:shadow-md transition-shadow overflow-hidden">
                  {place.image && (
                    <img src={place.image} alt={place.name} className="w-full h-32 object-cover" />
                  )}
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-display text-lg text-foreground">{place.name}</h3>
                        <span 
                          className="inline-block text-xs px-2 py-0.5 rounded mt-1 text-white"
                          style={{ backgroundColor: getCategoryColor(place.category) }}
                        >
                          {categories.find(c => c.id === place.category)?.label}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" onClick={() => handleEdit(place)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete(place.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{place.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
      </div>
    </AdminLayout>
  );
};

export default AdminMapEditor;
