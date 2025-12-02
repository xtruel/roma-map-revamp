import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Users, Clock, Globe, Smartphone, Monitor, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";

const pageViews = [
  { page: "/", views: 12450, change: 15 },
  { page: "/partite", views: 8320, change: 22 },
  { page: "/articoli", views: 6890, change: -5 },
  { page: "/mappa", views: 5430, change: 45 },
  { page: "/pacchetti", views: 4210, change: 12 },
  { page: "/community", views: 3560, change: 8 },
];

const trafficSources = [
  { source: "Ricerca Organica", percentage: 42, color: "#8B0000" },
  { source: "Social Media", percentage: 28, color: "#FFD700" },
  { source: "Diretto", percentage: 18, color: "#4169E1" },
  { source: "Referral", percentage: 12, color: "#228B22" },
];

const deviceStats = [
  { device: "Mobile", percentage: 58, icon: Smartphone },
  { device: "Desktop", percentage: 35, icon: Monitor },
  { device: "Tablet", percentage: 7, icon: Monitor },
];

const topCountries = [
  { country: "Italia", flag: "🇮🇹", visits: 45230 },
  { country: "Stati Uniti", flag: "🇺🇸", visits: 8920 },
  { country: "Regno Unito", flag: "🇬🇧", visits: 5640 },
  { country: "Germania", flag: "🇩🇪", visits: 4320 },
  { country: "Francia", flag: "🇫🇷", visits: 3210 },
];

const hourlyData = [
  { hour: "00", visits: 120 }, { hour: "02", visits: 80 }, { hour: "04", visits: 45 },
  { hour: "06", visits: 90 }, { hour: "08", visits: 350 }, { hour: "10", visits: 520 },
  { hour: "12", visits: 680 }, { hour: "14", visits: 720 }, { hour: "16", visits: 850 },
  { hour: "18", visits: 920 }, { hour: "20", visits: 1100 }, { hour: "22", visits: 450 },
];

const AdminAnalytics = () => {
  const { isAuthenticated } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const maxHourly = Math.max(...hourlyData.map(d => d.visits));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-4xl text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Statistiche dettagliate del sito</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Visite Totali</p>
                  <p className="text-2xl font-display text-foreground">68,420</p>
                </div>
                <Eye className="h-8 w-8 text-primary/20" />
              </div>
              <p className="text-xs text-green-500 flex items-center gap-1 mt-2">
                <ArrowUp className="h-3 w-3" /> +18% vs mese scorso
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Utenti Unici</p>
                  <p className="text-2xl font-display text-foreground">24,890</p>
                </div>
                <Users className="h-8 w-8 text-roma-gold/20" />
              </div>
              <p className="text-xs text-green-500 flex items-center gap-1 mt-2">
                <ArrowUp className="h-3 w-3" /> +12% vs mese scorso
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tempo Medio</p>
                  <p className="text-2xl font-display text-foreground">4:32</p>
                </div>
                <Clock className="h-8 w-8 text-blue-500/20" />
              </div>
              <p className="text-xs text-green-500 flex items-center gap-1 mt-2">
                <ArrowUp className="h-3 w-3" /> +8% vs mese scorso
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Bounce Rate</p>
                  <p className="text-2xl font-display text-foreground">32.4%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500/20" />
              </div>
              <p className="text-xs text-green-500 flex items-center gap-1 mt-2">
                <ArrowDown className="h-3 w-3" /> -5% vs mese scorso
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hourly Traffic */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Traffico Orario (Oggi)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between h-40 gap-1">
                {hourlyData.map((data) => (
                  <div key={data.hour} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full bg-gradient-roma rounded-t transition-all hover:opacity-80"
                      style={{ height: `${(data.visits / maxHourly) * 100}%` }}
                    />
                    <span className="text-xs text-muted-foreground mt-1">{data.hour}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Traffic Sources */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Sorgenti di Traffico</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {trafficSources.map((source) => (
                <div key={source.source}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground">{source.source}</span>
                    <span className="text-muted-foreground">{source.percentage}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${source.percentage}%`, backgroundColor: source.color }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Pages */}
          <Card className="border-border lg:col-span-2">
            <CardHeader>
              <CardTitle>Pagine più Visitate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pageViews.map((page, index) => (
                  <div key={page.page} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                    <span className="text-lg font-display text-muted-foreground w-6">{index + 1}</span>
                    <div className="flex-1">
                      <p className="text-sm text-foreground font-medium">{page.page}</p>
                      <p className="text-xs text-muted-foreground">{page.views.toLocaleString()} visualizzazioni</p>
                    </div>
                    <span className={`text-xs flex items-center gap-1 ${page.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {page.change >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                      {Math.abs(page.change)}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Devices & Countries */}
          <div className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" /> Dispositivi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {deviceStats.map((device) => (
                  <div key={device.device} className="flex items-center gap-3">
                    <device.icon className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="flex justify-between text-sm">
                        <span>{device.device}</span>
                        <span className="text-muted-foreground">{device.percentage}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full mt-1">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${device.percentage}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-4 w-4" /> Top Paesi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {topCountries.map((country) => (
                  <div key={country.country} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      {country.country}
                    </span>
                    <span className="text-muted-foreground">{country.visits.toLocaleString()}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
