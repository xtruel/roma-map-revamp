import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Package, Euro, Bus, Ticket, Users, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PackageItem {
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

const STORAGE_KEY = "roma_packages";

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
    name: "Trasferta Milano",
    type: "trasferta",
    price: 199,
    description: "Segui la Roma a San Siro",
    features: ["Bus GT andata/ritorno", "Biglietto settore ospiti", "Pranzo incluso", "Guida dedicata"],
    duration: "1 giorno",
    active: true,
    popular: true,
    transport: {
      type: "bus",
      partenza: "Roma Termini",
      arrivo: "Milano San Siro",
      orario: "06:00",
    },
  },
];

const getPackages = (): PackageItem[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPackages));
  return defaultPackages;
};

const savePackages = (packages: PackageItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(packages));
};

const AdminPackages = () => {
  const { isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<PackageItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "biglietto" as PackageItem["type"],
    price: 0,
    description: "",
    features: "",
    duration: "",
    image: "",
    active: true,
    popular: false,
    transportType: "bus" as "bus" | "flixbus" | "treno" | "aereo",
    partenza: "",
    arrivo: "",
    orario: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
      return;
    }
    setPackages(getPackages());
  }, [isAuthenticated, navigate]);

  const resetForm = () => {
    setFormData({
      name: "",
      type: "biglietto",
      price: 0,
      description: "",
      features: "",
      duration: "",
      image: "",
      active: true,
      popular: false,
      transportType: "bus",
      partenza: "",
      arrivo: "",
      orario: "",
    });
    setEditingPackage(null);
  };

  const handleEdit = (pkg: PackageItem) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      type: pkg.type,
      price: pkg.price,
      description: pkg.description,
      features: pkg.features.join("\n"),
      duration: pkg.duration || "",
      image: pkg.image || "",
      active: pkg.active,
      popular: pkg.popular,
      transportType: pkg.transport?.type || "bus",
      partenza: pkg.transport?.partenza || "",
      arrivo: pkg.transport?.arrivo || "",
      orario: pkg.transport?.orario || "",
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    const newPackage: PackageItem = {
      id: editingPackage?.id || Date.now().toString(),
      name: formData.name,
      type: formData.type,
      price: formData.price,
      description: formData.description,
      features: formData.features.split("\n").filter(f => f.trim()),
      duration: formData.duration || undefined,
      image: formData.image || undefined,
      active: formData.active,
      popular: formData.popular,
      transport: formData.type === "trasferta" ? {
        type: formData.transportType,
        partenza: formData.partenza,
        arrivo: formData.arrivo,
        orario: formData.orario,
      } : undefined,
    };

    let updated: PackageItem[];
    if (editingPackage) {
      updated = packages.map(p => p.id === editingPackage.id ? newPackage : p);
    } else {
      updated = [...packages, newPackage];
    }

    setPackages(updated);
    savePackages(updated);
    setIsDialogOpen(false);
    resetForm();
    toast({
      title: editingPackage ? "Pacchetto aggiornato" : "Pacchetto creato",
      description: `${formData.name} è stato ${editingPackage ? "aggiornato" : "creato"} con successo`,
    });
  };

  const handleDelete = (id: string) => {
    const updated = packages.filter(p => p.id !== id);
    setPackages(updated);
    savePackages(updated);
    toast({
      title: "Pacchetto eliminato",
      description: "Il pacchetto è stato eliminato con successo",
    });
  };

  const typeIcons = {
    biglietto: Ticket,
    esperienza: Star,
    trasferta: Bus,
    tour: Users,
  };

  if (!isAuthenticated) return null;

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl text-foreground">Gestione Pacchetti</h1>
            <p className="text-muted-foreground">Crea e gestisci biglietti, trasferte e pacchetti esperienza</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-roma text-white">
                <Plus className="h-4 w-4 mr-2" />
                Nuovo Pacchetto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingPackage ? "Modifica Pacchetto" : "Nuovo Pacchetto"}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nome pacchetto"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo</Label>
                    <Select value={formData.type} onValueChange={(v: PackageItem["type"]) => setFormData({ ...formData, type: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="biglietto">Biglietto</SelectItem>
                        <SelectItem value="esperienza">Esperienza</SelectItem>
                        <SelectItem value="trasferta">Trasferta</SelectItem>
                        <SelectItem value="tour">Tour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Prezzo (€)</Label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Durata</Label>
                    <Input
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="es. 1 giorno, 4 ore"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Descrizione</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descrizione del pacchetto"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Caratteristiche (una per riga)</Label>
                  <Textarea
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    placeholder="Posto in Curva Sud&#10;Accesso 2 ore prima&#10;Sciarpa omaggio"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Immagine URL</Label>
                  <Input
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                {formData.type === "trasferta" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Bus className="h-5 w-5" />
                        Dettagli Trasporto
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <div className="space-y-2">
                        <Label>Tipo Trasporto</Label>
                        <Select
                          value={formData.transportType}
                          onValueChange={(v: "bus" | "flixbus" | "treno" | "aereo") => setFormData({ ...formData, transportType: v })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bus">Bus GT</SelectItem>
                            <SelectItem value="flixbus">FlixBus</SelectItem>
                            <SelectItem value="treno">Treno</SelectItem>
                            <SelectItem value="aereo">Aereo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Partenza</Label>
                          <Input
                            value={formData.partenza}
                            onChange={(e) => setFormData({ ...formData, partenza: e.target.value })}
                            placeholder="Roma Termini"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Arrivo</Label>
                          <Input
                            value={formData.arrivo}
                            onChange={(e) => setFormData({ ...formData, arrivo: e.target.value })}
                            placeholder="Milano San Siro"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Orario Partenza</Label>
                        <Input
                          type="time"
                          value={formData.orario}
                          onChange={(e) => setFormData({ ...formData, orario: e.target.value })}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={formData.active}
                      onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                    />
                    <Label>Attivo</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={formData.popular}
                      onCheckedChange={(checked) => setFormData({ ...formData, popular: checked })}
                    />
                    <Label>Più Venduto</Label>
                  </div>
                </div>

                <Button onClick={handleSave} className="w-full bg-gradient-roma text-white">
                  {editingPackage ? "Aggiorna" : "Crea"} Pacchetto
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {["biglietto", "esperienza", "trasferta", "tour"].map((type) => {
            const Icon = typeIcons[type as keyof typeof typeIcons];
            const count = packages.filter(p => p.type === type && p.active).length;
            return (
              <Card key={type}>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground capitalize">{type === "biglietto" ? "Biglietti" : type === "esperienza" ? "Esperienze" : type === "trasferta" ? "Trasferte" : "Tour"}</p>
                    <p className="text-2xl font-display">{count}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Package List */}
        <div className="grid gap-4">
          {packages.map((pkg) => {
            const Icon = typeIcons[pkg.type];
            return (
              <Card key={pkg.id} className={`border-border ${!pkg.active ? "opacity-50" : ""}`}>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className={`p-3 rounded-lg ${pkg.type === "trasferta" ? "bg-blue-500/10" : "bg-primary/10"}`}>
                    <Icon className={`h-6 w-6 ${pkg.type === "trasferta" ? "text-blue-500" : "text-primary"}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-lg">{pkg.name}</h3>
                      {pkg.popular && (
                        <span className="bg-roma-gold text-roma-maroon text-xs px-2 py-0.5 rounded-full">Più Venduto</span>
                      )}
                      {!pkg.active && (
                        <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">Disattivo</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{pkg.description}</p>
                    {pkg.transport && (
                      <p className="text-xs text-blue-500 mt-1">
                        {pkg.transport.type.toUpperCase()} • {pkg.transport.partenza} → {pkg.transport.arrivo} • {pkg.transport.orario}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl text-primary">€{pkg.price}</p>
                    {pkg.duration && <p className="text-xs text-muted-foreground">{pkg.duration}</p>}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(pkg)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDelete(pkg.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPackages;
