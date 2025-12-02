import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, MapPin, Eye, TrendingUp, Calendar } from "lucide-react";

const stats = [
  { label: "Visite Oggi", value: "2,847", change: "+12%", icon: Eye, color: "text-primary" },
  { label: "Utenti Attivi", value: "1,234", change: "+8%", icon: Users, color: "text-roma-gold" },
  { label: "Articoli Pubblicati", value: "156", change: "+3", icon: FileText, color: "text-green-500" },
  { label: "Luoghi sulla Mappa", value: "30", change: "+5", icon: MapPin, color: "text-blue-500" },
];

const recentActivity = [
  { action: "Nuovo articolo pubblicato", time: "2 minuti fa", user: "Admin" },
  { action: "Luogo aggiunto alla mappa", time: "15 minuti fa", user: "Admin" },
  { action: "Commento approvato", time: "1 ora fa", user: "Sistema" },
  { action: "Pacchetto aggiornato", time: "3 ore fa", user: "Admin" },
  { action: "Nuovo utente registrato", time: "5 ore fa", user: "Sistema" },
];

const weeklyData = [
  { day: "Lun", visits: 1200 },
  { day: "Mar", visits: 1800 },
  { day: "Mer", visits: 2100 },
  { day: "Gio", visits: 1900 },
  { day: "Ven", visits: 2500 },
  { day: "Sab", visits: 3200 },
  { day: "Dom", visits: 2847 },
];

const AdminDashboard = () => {
  const { isAuthenticated } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const maxVisits = Math.max(...weeklyData.map(d => d.visits));

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-4xl text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Panoramica generale del sito</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-border hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-display text-foreground">{stat.value}</div>
                <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  {stat.change} questa settimana
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Chart */}
          <Card className="lg:col-span-2 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Visite Settimanali
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between h-48 gap-2">
                {weeklyData.map((data) => (
                  <div key={data.day} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-full bg-gradient-roma rounded-t-lg transition-all duration-500 hover:opacity-80"
                      style={{ height: `${(data.visits / maxVisits) * 100}%` }}
                    />
                    <span className="text-xs text-muted-foreground mt-2">{data.day}</span>
                    <span className="text-xs font-semibold text-foreground">{data.visits}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Attività Recente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time} • {activity.user}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
