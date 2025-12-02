import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "info@ovunqueromanisti.it",
    description: "Rispondiamo entro 24 ore",
  },
  {
    icon: Phone,
    title: "Telefono",
    value: "+39 06 1234567",
    description: "Lun-Ven 9:00-18:00",
  },
  {
    icon: MapPin,
    title: "Indirizzo",
    value: "Via della Roma 27, 00186 Roma",
    description: "Sede operativa",
  },
  {
    icon: Clock,
    title: "Orari",
    value: "Lun-Ven 9:00-18:00",
    description: "Weekend solo emergenze",
  },
];

const faqs = [
  {
    question: "Come posso acquistare i biglietti?",
    answer: "Puoi acquistare i biglietti direttamente dal nostro sito nella sezione 'Pacchetti'. Accettiamo tutte le principali carte di credito e PayPal. I biglietti verranno inviati via email in formato digitale.",
  },
  {
    question: "Posso cancellare o modificare una prenotazione?",
    answer: "Sì, puoi modificare o cancellare la tua prenotazione fino a 48 ore prima dell'evento. Contattaci via email o telefono per assistenza. Le cancellazioni effettuate nei tempi previsti riceveranno un rimborso completo.",
  },
  {
    question: "Come funzionano i tour guidati?",
    answer: "I tour guidati partono da punti di ritrovo prestabiliti e sono condotti da guide esperte e appassionate di Roma. La durata varia da 3 a 5 ore a seconda del pacchetto scelto. È incluso tutto il materiale necessario.",
  },
  {
    question: "Posso organizzare un evento per un gruppo?",
    answer: "Assolutamente sì! Offriamo pacchetti personalizzati per gruppi di qualsiasi dimensione. Contattaci per un preventivo gratuito e ti aiuteremo a organizzare l'esperienza perfetta per il tuo gruppo.",
  },
  {
    question: "Come posso diventare partner?",
    answer: "Siamo sempre alla ricerca di nuove partnership con aziende e attività che condividono la nostra passione. Inviaci una proposta a partnership@ovunqueromanisti.it e ti ricontatteremo.",
  },
  {
    question: "È possibile avere un rimborso?",
    answer: "I rimborsi sono disponibili per cancellazioni effettuate almeno 48 ore prima dell'evento. Per eventi cancellati da noi, offriamo rimborso completo o la possibilità di utilizzare il credito per un altro evento.",
  },
];

const Contatti = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-roma">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-5xl md:text-7xl text-white text-center mb-4">
            Contattaci
          </h1>
          <p className="text-white/80 text-center text-lg max-w-2xl mx-auto">
            Siamo qui per aiutarti. Scrivici per qualsiasi domanda o richiesta.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 -mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={info.title}
                className="bg-card rounded-xl p-6 shadow-xl border border-border text-center opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                  <info.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-1">{info.title}</h3>
                <p className="text-primary font-semibold mb-1">{info.value}</p>
                <p className="text-muted-foreground text-sm">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="font-display text-3xl text-foreground mb-2">Inviaci un Messaggio</h2>
              <p className="text-muted-foreground mb-8">
                Compila il form e ti risponderemo il prima possibile
              </p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Nome *</label>
                    <Input placeholder="Il tuo nome" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Cognome *</label>
                    <Input placeholder="Il tuo cognome" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                  <Input type="email" placeholder="la.tua@email.com" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Telefono</label>
                  <Input type="tel" placeholder="+39 333 1234567" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Oggetto *</label>
                  <Input placeholder="Di cosa vuoi parlarci?" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Messaggio *</label>
                  <Textarea placeholder="Scrivi il tuo messaggio..." rows={6} />
                </div>
                
                <Button size="lg" className="w-full bg-gradient-roma text-white">
                  <Send className="h-5 w-5 mr-2" />
                  Invia Messaggio
                </Button>
              </form>
            </div>
            
            {/* Map Placeholder */}
            <div>
              <h2 className="font-display text-3xl text-foreground mb-2">Dove Siamo</h2>
              <p className="text-muted-foreground mb-8">
                Vieni a trovarci nella nostra sede a Roma
              </p>
              
              <div className="bg-muted rounded-2xl h-80 flex items-center justify-center mb-6">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">Via della Roma 27</p>
                  <p className="text-muted-foreground">00186 Roma, Italia</p>
                </div>
              </div>
              
              {/* Quick Contact */}
              <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
                <h3 className="font-display text-xl text-foreground mb-4">Contatto Rapido</h3>
                <div className="space-y-4">
                  <a
                    href="mailto:info@ovunqueromanisti.it"
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-primary/10 transition-colors"
                  >
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="text-foreground">info@ovunqueromanisti.it</span>
                  </a>
                  <a
                    href="tel:+3906123456"
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-primary/10 transition-colors"
                  >
                    <Phone className="h-5 w-5 text-primary" />
                    <span className="text-foreground">+39 06 1234567</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-primary/10 transition-colors"
                  >
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <span className="text-foreground">Chat WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="font-display text-4xl text-foreground mb-4">Domande Frequenti</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Trova rapidamente le risposte alle domande più comuni
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card rounded-xl border border-border px-6 shadow-sm"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contatti;
