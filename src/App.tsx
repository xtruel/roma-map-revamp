import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
