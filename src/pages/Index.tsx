import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import GoogleMapSection from "@/components/GoogleMapSection";
import Articles from "@/components/Articles";
import Packages from "@/components/Packages";
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
      <Footer />
    </div>
  );
};

export default Index;
