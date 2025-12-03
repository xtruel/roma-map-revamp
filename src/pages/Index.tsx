import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import GoogleMapSection from "@/components/GoogleMapSection";
import Articles from "@/components/Articles";
import Packages from "@/components/Packages";
import FeedbackSection from "@/components/FeedbackSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Stats />
      <GoogleMapSection />
      <Articles />
      <Packages />
      
      {/* Feedback Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <FeedbackSection 
            entityType="site" 
            entityId="homepage"
            title="Cosa pensano i tifosi"
          />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
