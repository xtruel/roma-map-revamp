import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Calendar, Clock, MapPin, Tv, Ticket } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Match {
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

const STORAGE_KEY = "roma_matches";

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
    homeTeam: "Milan",
    awayTeam: "Roma",
    date: "2025-01-22",
    time: "20:45",
    competition: "Serie A",
    stadium: "San Siro",
    broadcast: "Sky Sport",
    ticketsAvailable: true,
    ticketPrice: 55,
    isHome: false,
  },
];

const getMatches = (): Match[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultMatches));
  return defaultMatches;
};

const saveMatches = (matches: Match[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(matches));
};

const AdminMatches = () => {
  const { isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const [matches, setMatches] = useState<Match[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);
  const [formData, setFormData] = useState({
    homeTeam: "Roma",
    awayTeam: "",
    date: "",
    time: "18:00",
    competition: "Serie A",
    stadium: "Stadio Olimpico",
    broadcast: "DAZN",
    ticketsAvailable: true,
    ticketPrice: 45,
    isHome: true,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
      return;
    }
    setMatches(getMatches());
  }, [isAuthenticated, navigate]);

  const resetForm = () => {
    setFormData({
      homeTeam: "Roma",
      awayTeam: "",
      date: "",
      time: "18:00",
      competition: "Serie A",
      stadium: "Stadio Olimpico",
      broadcast: "DAZN",
      ticketsAvailable: true,
      ticketPrice: 45,
      isHome: true,
    });
    setEditingMatch(null);
  };

  const handleEdit = (match: Match) => {
    setEditingMatch(match);
    setFormData({
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      date: match.date,
      time: match.time,
      competition: match.competition,
      stadium: match.stadium,
      broadcast: match.broadcast,
      ticketsAvailable: match.ticketsAvailable,
      ticketPrice: match.ticketPrice || 45,
      isHome: match.isHome,
    });
    setIsDialogOpen(true);
  };

  const handleHomeToggle = (isHome: boolean) => {
    if (isHome) {
      setFormData({
        ...formData,
        isHome: true,
        homeTeam: "Roma",
        awayTeam: formData.homeTeam === "Roma" ? formData.awayTeam : formData.homeTeam,
        stadium: "Stadio Olimpico",
      });
    } else {
      setFormData({
        ...formData,
        isHome: false,
        awayTeam: "Roma",
        homeTeam: formData.awayTeam === "Roma" ? formData.homeTeam : formData.awayTeam,
      });
    }
  };

  const handleSave = () => {
    const newMatch: Match = {
      id: editingMatch?.id || Date.now().toString(),
      ...formData,
    };

    let updated: Match[];
    if (editingMatch) {
      updated = matches.map(m => m.id === editingMatch.id ? newMatch : m);
    } else {
      updated = [...matches, newMatch];
    }

    // Sort by date
    updated.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    setMatches(updated);
    saveMatches(updated);
    setIsDialogOpen(false);
    resetForm();
    toast({
      title: editingMatch ? "Partita aggiornata" : "Partita aggiunta",
      description: `${formData.homeTeam} vs ${formData.awayTeam}`,
    });
  };

  const handleDelete = (id: string) => {
    const updated = matches.filter(m => m.id !== id);
    setMatches(updated);
    saveMatches(updated);
    toast({
      title: "Partita eliminata",
    });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric" });
  };

  if (!isAuthenticated) return null;

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl text-foreground">Calendario Partite</h1>
            <p className="text-muted-foreground">Gestisci le prossime partite e la disponibilità biglietti</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-roma text-white">
                <Plus className="h-4 w-4 mr-2" />
                Nuova Partita
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingMatch ? "Modifica Partita" : "Nuova Partita"}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Home/Away Toggle */}
                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                  <Label>Tipo:</Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={formData.isHome ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleHomeToggle(true)}
                      className={formData.isHome ? "bg-gradient-roma text-white" : ""}
                    >
                      Casa
                    </Button>
                    <Button
                      type="button"
                      variant={!formData.isHome ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleHomeToggle(false)}
                      className={!formData.isHome ? "bg-blue-500 text-white" : ""}
                    >
                      Trasferta
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Squadra Casa</Label>
                    <Input
                      value={formData.homeTeam}
                      onChange={(e) => setFormData({ ...formData, homeTeam: e.target.value })}
                      disabled={formData.isHome}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Squadra Ospite</Label>
                    <Input
                      value={formData.awayTeam}
                      onChange={(e) => setFormData({ ...formData, awayTeam: e.target.value })}
                      disabled={!formData.isHome}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Data</Label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Orario</Label>
                    <Input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Competizione</Label>
                    <Select value={formData.competition} onValueChange={(v) => setFormData({ ...formData, competition: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Serie A">Serie A</SelectItem>
                        <SelectItem value="Coppa Italia">Coppa Italia</SelectItem>
                        <SelectItem value="Europa League">Europa League</SelectItem>
                        <SelectItem value="Champions League">Champions League</SelectItem>
                        <SelectItem value="Amichevole">Amichevole</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Trasmissione</Label>
                    <Select value={formData.broadcast} onValueChange={(v) => setFormData({ ...formData, broadcast: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DAZN">DAZN</SelectItem>
                        <SelectItem value="Sky Sport">Sky Sport</SelectItem>
                        <SelectItem value="Mediaset">Mediaset</SelectItem>
                        <SelectItem value="TV8">TV8</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Stadio</Label>
                  <Input
                    value={formData.stadium}
                    onChange={(e) => setFormData({ ...formData, stadium: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Prezzo Biglietto (€)</Label>
                    <Input
                      type="number"
                      value={formData.ticketPrice}
                      onChange={(e) => setFormData({ ...formData, ticketPrice: Number(e.target.value) })}
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-8">
                    <Switch
                      checked={formData.ticketsAvailable}
                      onCheckedChange={(checked) => setFormData({ ...formData, ticketsAvailable: checked })}
                    />
                    <Label>Biglietti Disponibili</Label>
                  </div>
                </div>

                <Button onClick={handleSave} className="w-full bg-gradient-roma text-white">
                  {editingMatch ? "Aggiorna" : "Aggiungi"} Partita
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Partite Programmate</p>
                <p className="text-2xl font-display">{matches.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="p-3 rounded-lg bg-roma-gold/10">
                <Ticket className="h-6 w-6 text-roma-gold" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Biglietti Disponibili</p>
                <p className="text-2xl font-display">{matches.filter(m => m.ticketsAvailable).length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="p-3 rounded-lg bg-blue-500/10">
                <MapPin className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Trasferte</p>
                <p className="text-2xl font-display">{matches.filter(m => !m.isHome).length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Matches List */}
        <div className="space-y-4">
          {matches.map((match) => (
            <Card key={match.id} className={`border-border ${!match.ticketsAvailable ? "opacity-70" : ""}`}>
              <CardContent className="flex items-center gap-4 p-4">
                <div className={`p-3 rounded-lg ${match.isHome ? "bg-primary/10" : "bg-blue-500/10"}`}>
                  <span className={`font-display text-lg ${match.isHome ? "text-primary" : "text-blue-500"}`}>
                    {match.isHome ? "C" : "T"}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-lg">
                      <span className={match.homeTeam === "Roma" ? "text-primary" : ""}>{match.homeTeam}</span>
                      <span className="text-muted-foreground mx-2">vs</span>
                      <span className={match.awayTeam === "Roma" ? "text-primary" : ""}>{match.awayTeam}</span>
                    </h3>
                    <span className="bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded-full">
                      {match.competition}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(match.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {match.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {match.stadium}
                    </span>
                    <span className="flex items-center gap-1">
                      <Tv className="h-3 w-3" />
                      {match.broadcast}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  {match.ticketsAvailable ? (
                    <span className="text-green-500 text-sm font-medium">€{match.ticketPrice} - Disponibili</span>
                  ) : (
                    <span className="text-destructive text-sm font-medium">Esauriti</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(match)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(match.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminMatches;
