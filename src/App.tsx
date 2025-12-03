import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "@/contexts/AdminContext";
import Index from "./pages/Index";
import Articoli from "./pages/Articoli";
import Eventi from "./pages/Eventi";
import Partite from "./pages/Partite";
import Pacchetti from "./pages/Pacchetti";
import Mappa from "./pages/Mappa";
import Community from "./pages/Community";
import Trofei from "./pages/Trofei";
import ChiSiamo from "./pages/ChiSiamo";
import Contatti from "./pages/Contatti";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminArticles from "./pages/admin/AdminArticles";
import AdminMapEditor from "./pages/admin/AdminMapEditor";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminPackages from "./pages/admin/AdminPackages";
import AdminMatches from "./pages/admin/AdminMatches";
import AdminSponsors from "./pages/admin/AdminSponsors";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AdminProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/articoli" element={<Articoli />} />
            <Route path="/eventi" element={<Eventi />} />
            <Route path="/partite" element={<Partite />} />
            <Route path="/pacchetti" element={<Pacchetti />} />
            <Route path="/mappa" element={<Mappa />} />
            <Route path="/community" element={<Community />} />
            <Route path="/trofei" element={<Trofei />} />
            <Route path="/chi-siamo" element={<ChiSiamo />} />
            <Route path="/contatti" element={<Contatti />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/articoli" element={<AdminArticles />} />
            <Route path="/admin/mappa" element={<AdminMapEditor />} />
            <Route path="/admin/ordini" element={<AdminOrders />} />
            <Route path="/admin/pacchetti" element={<AdminPackages />} />
            <Route path="/admin/partite" element={<AdminMatches />} />
            <Route path="/admin/sponsor" element={<AdminSponsors />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AdminProvider>
  </QueryClientProvider>
);

export default App;
