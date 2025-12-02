import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Package, Euro, User, Calendar, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: string;
  package: { name: string; price: number; description: string };
  quantity: number;
  total: number;
  customer: { email: string; firstName: string; lastName: string; phone: string };
  date: string;
  status: "confirmed" | "pending" | "cancelled";
}

const AdminOrders = () => {
  const { isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
      return;
    }
    loadOrders();
  }, [isAuthenticated, navigate]);

  const loadOrders = () => {
    const stored = localStorage.getItem("roma_orders");
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status } : o);
    localStorage.setItem("roma_orders", JSON.stringify(updated));
    setOrders(updated);
    toast({ title: "Stato ordine aggiornato" });
  };

  const deleteOrder = (orderId: string) => {
    const updated = orders.filter(o => o.id !== orderId);
    localStorage.setItem("roma_orders", JSON.stringify(updated));
    setOrders(updated);
    toast({ title: "Ordine eliminato" });
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = 
      o.customer.email.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = orders.filter(o => o.status === "confirmed").reduce((sum, o) => sum + o.total, 0);

  if (!isAuthenticated) return null;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-4xl text-foreground">Ordini</h1>
          <p className="text-muted-foreground">Gestisci gli ordini e i pagamenti</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ordini Totali</p>
                <p className="text-2xl font-display text-foreground">{orders.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <Euro className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ricavi Totali</p>
                <p className="text-2xl font-display text-foreground">€{totalRevenue}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-roma-gold/10 flex items-center justify-center">
                <User className="h-6 w-6 text-roma-gold" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Clienti Unici</p>
                <p className="text-2xl font-display text-foreground">
                  {new Set(orders.map(o => o.customer.email)).size}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Cerca per email, nome o ID ordine..." 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              className="pl-10" 
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Stato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutti</SelectItem>
              <SelectItem value="confirmed">Confermati</SelectItem>
              <SelectItem value="pending">In attesa</SelectItem>
              <SelectItem value="cancelled">Cancellati</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <Card className="border-border">
            <CardContent className="p-12 text-center">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-xl text-foreground mb-2">Nessun ordine trovato</h3>
              <p className="text-muted-foreground">
                {orders.length === 0 
                  ? "Gli ordini appariranno qui quando i clienti effettuano acquisti" 
                  : "Prova a modificare i filtri di ricerca"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map(order => (
              <Card key={order.id} className="border-border hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-sm text-muted-foreground">{order.id}</span>
                        <Badge variant={
                          order.status === "confirmed" ? "default" : 
                          order.status === "pending" ? "secondary" : "destructive"
                        }>
                          {order.status === "confirmed" ? "Confermato" : 
                           order.status === "pending" ? "In attesa" : "Cancellato"}
                        </Badge>
                      </div>
                      <h3 className="font-display text-lg text-foreground">
                        {order.package.name} x{order.quantity}
                      </h3>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {order.customer.firstName} {order.customer.lastName}
                        </span>
                        <span>{order.customer.email}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(order.date).toLocaleDateString("it-IT")}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-display text-primary">€{order.total}</p>
                      </div>
                      <Select 
                        value={order.status} 
                        onValueChange={(v) => updateOrderStatus(order.id, v as Order["status"])}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="confirmed">Confermato</SelectItem>
                          <SelectItem value="pending">In attesa</SelectItem>
                          <SelectItem value="cancelled">Cancellato</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="text-destructive"
                        onClick={() => deleteOrder(order.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
