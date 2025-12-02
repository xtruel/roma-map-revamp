import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Lock, CheckCircle2, ArrowLeft, Shield, Ticket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const defaultPackages: Record<string, { name: string; price: number; description: string }> = {
  "curva-sud": { name: "Curva Sud", price: 45, description: "L'esperienza più autentica tra i veri tifosi" },
  "tribuna-monte-mario": { name: "Tribuna Monte Mario", price: 85, description: "Vista panoramica sullo stadio" },
  "tribuna-tevere": { name: "Tribuna Tevere", price: 75, description: "Ottima visuale a bordo campo" },
  "vip-box": { name: "VIP Box", price: 250, description: "L'esperienza premium definitiva" },
  "roma-experience": { name: "Roma Experience", price: 120, description: "Vivi una giornata da vero romanista" },
  "weekend-giallorosso": { name: "Weekend Giallorosso", price: 350, description: "Un weekend completo nella Capitale" },
  "trasferta-fans": { name: "Trasferta Fans", price: 199, description: "Segui la Roma in trasferta" },
  "tour-storico-roma": { name: "Tour Storico Roma", price: 65, description: "Scopri i luoghi che hanno fatto la storia giallorossa" },
  "roma-gastronomica": { name: "Roma Gastronomica", price: 85, description: "I ristoranti preferiti dai giocatori" },
  "roma-by-night": { name: "Roma by Night", price: 55, description: "I locali dove festeggiare le vittorie" },
};

const cardSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, "Numero carta: 16 cifre"),
  cardName: z.string().min(3, "Nome richiesto").max(100),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato: MM/YY"),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV: 3-4 cifre"),
});

const customerSchema = z.object({
  email: z.string().email("Email non valida").max(255),
  firstName: z.string().min(2, "Nome richiesto").max(50),
  lastName: z.string().min(2, "Cognome richiesto").max(50),
  phone: z.string().regex(/^[\d\s+()-]{8,20}$/, "Telefono non valido"),
});

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const packageId = searchParams.get("package") || "curva-sud";
  const quantity = parseInt(searchParams.get("qty") || "1", 10);
  const priceParam = searchParams.get("price");
  
  const defaultPkg = defaultPackages[packageId] || defaultPackages["curva-sud"];
  const selectedPackage = {
    id: packageId,
    name: defaultPkg.name,
    price: priceParam ? parseInt(priceParam, 10) : defaultPkg.price,
    description: defaultPkg.description
  };
  const subtotal = selectedPackage.price * quantity;
  const serviceFee = Math.round(subtotal * 0.05);
  const total = subtotal + serviceFee;

  const [step, setStep] = useState<"details" | "payment" | "success">("details");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [customer, setCustomer] = useState({
    email: "", firstName: "", lastName: "", phone: ""
  });
  
  const [card, setCard] = useState({
    cardNumber: "", cardName: "", expiry: "", cvv: ""
  });

  const validateCustomer = () => {
    const result = customerSchema.safeParse(customer);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(e => {
        fieldErrors[e.path[0] as string] = e.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const validateCard = () => {
    const result = cardSchema.safeParse(card);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(e => {
        fieldErrors[e.path[0] as string] = e.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleContinue = () => {
    if (validateCustomer()) {
      setStep("payment");
    }
  };

  const handlePayment = async () => {
    if (!validateCard()) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem("roma_orders") || "[]");
    orders.push({
      id: `ORD-${Date.now()}`,
      package: selectedPackage,
      quantity,
      total,
      customer: { ...customer },
      date: new Date().toISOString(),
      status: "confirmed"
    });
    localStorage.setItem("roma_orders", JSON.stringify(orders));
    
    setIsProcessing(false);
    setStep("success");
    toast({ title: "Pagamento completato!", description: "Riceverai i biglietti via email." });
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\D/g, "").slice(0, 16);
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 pb-20">
          <div className="container mx-auto px-4 max-w-lg">
            <Card className="border-green-500/30 bg-green-500/5">
              <CardContent className="pt-8 text-center">
                <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-6" />
                <h1 className="font-display text-4xl text-foreground mb-2">Pagamento Completato!</h1>
                <p className="text-muted-foreground mb-6">
                  Grazie per il tuo acquisto. I biglietti sono stati inviati a <strong>{customer.email}</strong>
                </p>
                <div className="bg-card rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm text-muted-foreground">Ordine:</p>
                  <p className="font-display text-xl text-foreground">{selectedPackage.name} x{quantity}</p>
                  <p className="text-2xl font-bold text-primary">€{total}</p>
                </div>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" asChild>
                    <Link to="/pacchetti">Altri Pacchetti</Link>
                  </Button>
                  <Button className="bg-gradient-roma text-white" asChild>
                    <Link to="/">Torna alla Home</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" /> Indietro
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              <h1 className="font-display text-4xl text-foreground">Checkout</h1>
              
              {/* Progress */}
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 ${step === "details" ? "text-primary" : "text-muted-foreground"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === "details" ? "bg-primary text-white" : "bg-muted"}`}>1</div>
                  <span className="hidden sm:inline">Dati</span>
                </div>
                <div className="flex-1 h-0.5 bg-muted" />
                <div className={`flex items-center gap-2 ${step === "payment" ? "text-primary" : "text-muted-foreground"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === "payment" ? "bg-primary text-white" : "bg-muted"}`}>2</div>
                  <span className="hidden sm:inline">Pagamento</span>
                </div>
              </div>

              {step === "details" && (
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Dati Acquirente</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nome *</Label>
                        <Input 
                          value={customer.firstName}
                          onChange={e => setCustomer({ ...customer, firstName: e.target.value })}
                          placeholder="Mario"
                        />
                        {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label>Cognome *</Label>
                        <Input 
                          value={customer.lastName}
                          onChange={e => setCustomer({ ...customer, lastName: e.target.value })}
                          placeholder="Rossi"
                        />
                        {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Email *</Label>
                      <Input 
                        type="email"
                        value={customer.email}
                        onChange={e => setCustomer({ ...customer, email: e.target.value })}
                        placeholder="mario.rossi@email.com"
                      />
                      {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label>Telefono *</Label>
                      <Input 
                        type="tel"
                        value={customer.phone}
                        onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                        placeholder="+39 333 1234567"
                      />
                      {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                    </div>
                    <Button onClick={handleContinue} className="w-full bg-gradient-roma text-white">
                      Continua al Pagamento
                    </Button>
                  </CardContent>
                </Card>
              )}

              {step === "payment" && (
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" /> Pagamento con Carta
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Numero Carta *</Label>
                      <Input 
                        value={card.cardNumber}
                        onChange={e => setCard({ ...card, cardNumber: formatCardNumber(e.target.value) })}
                        placeholder="1234 5678 9012 3456"
                        maxLength={16}
                      />
                      {errors.cardNumber && <p className="text-xs text-destructive">{errors.cardNumber}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label>Nome sulla Carta *</Label>
                      <Input 
                        value={card.cardName}
                        onChange={e => setCard({ ...card, cardName: e.target.value })}
                        placeholder="MARIO ROSSI"
                      />
                      {errors.cardName && <p className="text-xs text-destructive">{errors.cardName}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Scadenza *</Label>
                        <Input 
                          value={card.expiry}
                          onChange={e => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                        {errors.expiry && <p className="text-xs text-destructive">{errors.expiry}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label>CVV *</Label>
                        <Input 
                          type="password"
                          value={card.cvv}
                          onChange={e => setCard({ ...card, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                          placeholder="123"
                          maxLength={4}
                        />
                        {errors.cvv && <p className="text-xs text-destructive">{errors.cvv}</p>}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                      <Lock className="h-4 w-4" />
                      <span>I tuoi dati sono protetti con crittografia SSL</span>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setStep("details")} className="flex-1">
                        Indietro
                      </Button>
                      <Button 
                        onClick={handlePayment} 
                        disabled={isProcessing}
                        className="flex-1 bg-gradient-roma text-white"
                      >
                        {isProcessing ? "Elaborazione..." : `Paga €${total}`}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border-border sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ticket className="h-5 w-5 text-primary" /> Riepilogo Ordine
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-gradient-roma rounded-lg flex items-center justify-center">
                      <Ticket className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg text-foreground">{selectedPackage.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedPackage.description}</p>
                      <p className="text-sm text-muted-foreground">Quantità: {quantity}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotale</span>
                      <span>€{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Commissioni servizio</span>
                      <span>€{serviceFee}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-display">
                    <span>Totale</span>
                    <span className="text-primary">€{total}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Pagamento sicuro garantito</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
