import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, UtensilsCrossed, MapPin, Phone, Globe, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addPlace, getPlaces, deletePlace, updatePlace, Place } from "@/data/places";

interface SponsorRestaurant extends Place {
  phone?: string;
  website?: string;
  openingHours?: string;
  discount?: string;
  isSponsor: boolean;
}

const SPONSORS_KEY = "roma_sponsor_restaurants";

const getSponsorData = (): Record<string, Partial<SponsorRestaurant>> => {
  const stored = localStorage.getItem(SPONSORS_KEY);
  return stored ? JSON.parse(stored) : {};
};

const saveSponsorData = (data: Record<string, Partial<SponsorRestaurant>>) => {
  localStorage.setItem(SPONSORS_KEY, JSON.stringify(data));
};

const AdminSponsors = () => {
  const { isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<SponsorRestaurant[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<SponsorRestaurant | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    lat: 41.9,
    lng: 12.5,
    image: "",
    phone: "",
    website: "",
    openingHours: "",
    discount: "",
    isSponsor: true,
  });

  const loadRestaurants = () => {
    const places = getPlaces();
    const sponsorData = getSponsorData();
    const restaurantPlaces = places.filter(p => p.category === "ristoranti");
    
    const enrichedRestaurants: SponsorRestaurant[] = restaurantPlaces.map(r => ({
      ...r,
      ...sponsorData[r.id],
      isSponsor: sponsorData[r.id]?.isSponsor ?? false,
    }));
    
    setRestaurants(enrichedRestaurants);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
      return;
    }
    loadRestaurants();
  }, [isAuthenticated, navigate]);

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      address: "",
      lat: 41.9,
      lng: 12.5,
      image: "",
      phone: "",
      website: "",
      openingHours: "",
      discount: "",
      isSponsor: true,
    });
    setEditingRestaurant(null);
  };

  const handleEdit = (restaurant: SponsorRestaurant) => {
    setEditingRestaurant(restaurant);
    setFormData({
      name: restaurant.name,
      description: restaurant.description,
      address: restaurant.address,
      lat: restaurant.lat,
      lng: restaurant.lng,
      image: restaurant.image,
      phone: restaurant.phone || "",
      website: restaurant.website || "",
      openingHours: restaurant.openingHours || "",
      discount: restaurant.discount || "",
      isSponsor: restaurant.isSponsor,
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingRestaurant) {
      // Update existing place
      updatePlace(editingRestaurant.id, {
        name: formData.name,
        description: formData.description,
        address: formData.address,
        lat: formData.lat,
        lng: formData.lng,
        image: formData.image,
      });

      // Update sponsor data
      const sponsorData = getSponsorData();
      sponsorData[editingRestaurant.id] = {
        phone: formData.phone,
        website: formData.website,
        openingHours: formData.openingHours,
        discount: formData.discount,
        isSponsor: formData.isSponsor,
      };
      saveSponsorData(sponsorData);
    } else {
      // Add new restaurant
      const newPlace = addPlace({
        name: formData.name,
        category: "ristoranti",
        description: formData.description,
        address: formData.address,
        lat: formData.lat,
        lng: formData.lng,
        image: formData.image || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
      });

      // Save sponsor data
      const sponsorData = getSponsorData();
      sponsorData[newPlace.id] = {
        phone: formData.phone,
        website: formData.website,
        openingHours: formData.openingHours,
        discount: formData.discount,
        isSponsor: formData.isSponsor,
      };
      saveSponsorData(sponsorData);
    }

    loadRestaurants();
    setIsDialogOpen(false);
    resetForm();
    toast({
      title: editingRestaurant ? "Ristorante aggiornato" : "Ristorante aggiunto",
      description: `${formData.name} è stato ${editingRestaurant ? "aggiornato" : "aggiunto"} con successo`,
    });
  };

  const handleDelete = (id: string) => {
    deletePlace(id);
    const sponsorData = getSponsorData();
    delete sponsorData[id];
    saveSponsorData(sponsorData);
    loadRestaurants();
    toast({
      title: "Ristorante eliminato",
    });
  };

  const toggleSponsor = (restaurant: SponsorRestaurant) => {
    const sponsorData = getSponsorData();
    sponsorData[restaurant.id] = {
      ...sponsorData[restaurant.id],
      isSponsor: !restaurant.isSponsor,
    };
    saveSponsorData(sponsorData);
    loadRestaurants();
    toast({
      title: restaurant.isSponsor ? "Sponsor rimosso" : "Sponsor aggiunto",
      description: restaurant.name,
    });
  };

  if (!isAuthenticated) return null;

  const sponsors = restaurants.filter(r => r.isSponsor);
  const nonSponsors = restaurants.filter(r => !r.isSponsor);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl text-foreground">Ristoranti Partner</h1>
            <p className="text-muted-foreground">Gestisci i ristoranti sponsor che appaiono sulla mappa</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-roma text-white">
                <Plus className="h-4 w-4 mr-2" />
                Nuovo Ristorante
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingRestaurant ? "Modifica Ristorante" : "Nuovo Ristorante"}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Nome</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nome ristorante"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Descrizione</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Cucina romana tradizionale..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Indirizzo</Label>
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Via Roma, 1, 00100 Roma"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Latitudine</Label>
                    <Input
                      type="number"
                      step="0.0001"
                      value={formData.lat}
                      onChange={(e) => setFormData({ ...formData, lat: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Longitudine</Label>
                    <Input
                      type="number"
                      step="0.0001"
                      value={formData.lng}
                      onChange={(e) => setFormData({ ...formData, lng: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Immagine URL</Label>
                  <Input
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Telefono</Label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+39 06 1234567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Sito Web</Label>
                    <Input
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://ristorante.it"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Orari di Apertura</Label>
                  <Input
                    value={formData.openingHours}
                    onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                    placeholder="Lun-Dom 12:00-23:00"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Sconto per i Tifosi</Label>
                  <Input
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    placeholder="10% con tessera Roma Club"
                  />
                </div>

                <div className="flex items-center gap-2 p-4 bg-roma-gold/10 rounded-lg">
                  <Switch
                    checked={formData.isSponsor}
                    onCheckedChange={(checked) => setFormData({ ...formData, isSponsor: checked })}
                  />
                  <Label className="text-roma-maroon font-semibold">Ristorante Sponsor Partner</Label>
                </div>

                <Button onClick={handleSave} className="w-full bg-gradient-roma text-white">
                  {editingRestaurant ? "Aggiorna" : "Aggiungi"} Ristorante
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-roma-gold/30">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="p-3 rounded-lg bg-roma-gold/10">
                <UtensilsCrossed className="h-6 w-6 text-roma-gold" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ristoranti Sponsor</p>
                <p className="text-2xl font-display text-roma-gold">{sponsors.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="p-3 rounded-lg bg-muted">
                <UtensilsCrossed className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Altri Ristoranti</p>
                <p className="text-2xl font-display">{nonSponsors.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sponsors Section */}
        {sponsors.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-display text-2xl text-roma-gold flex items-center gap-2">
              <UtensilsCrossed className="h-6 w-6" />
              Ristoranti Sponsor
            </h2>
            <div className="grid gap-4">
              {sponsors.map((restaurant) => (
                <Card key={restaurant.id} className="border-roma-gold/30 bg-roma-gold/5">
                  <CardContent className="flex items-center gap-4 p-4">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-lg">{restaurant.name}</h3>
                        <span className="bg-roma-gold text-roma-maroon text-xs px-2 py-0.5 rounded-full font-semibold">
                          SPONSOR
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{restaurant.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {restaurant.address}
                        </span>
                        {restaurant.discount && (
                          <span className="text-roma-gold font-semibold">{restaurant.discount}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => toggleSponsor(restaurant)}>
                        Rimuovi Sponsor
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleEdit(restaurant)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(restaurant.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Non-Sponsors Section */}
        {nonSponsors.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-display text-2xl">Altri Ristoranti</h2>
            <div className="grid gap-4">
              {nonSponsors.map((restaurant) => (
                <Card key={restaurant.id} className="border-border">
                  <CardContent className="flex items-center gap-4 p-4">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-display text-lg">{restaurant.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{restaurant.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => toggleSponsor(restaurant)} className="text-roma-gold border-roma-gold/30 hover:bg-roma-gold/10">
                        Rendi Sponsor
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleEdit(restaurant)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(restaurant.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminSponsors;
