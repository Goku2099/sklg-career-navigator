import HeroSection from "@/components/sklg/HeroSection";
import CareerNavigationMap from "@/components/sklg/CareerNavigationMap";
import CollegeRecommendations from "@/components/sklg/CollegeRecommendations";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <HeroSection />
      <CareerNavigationMap />
      <CollegeRecommendations />
      
      {/* Footer */}
      <footer className="py-8 text-center border-t border-border/30">
        <p className="text-muted-foreground text-sm">
          © 2026 SKLG — Navigate Your Career with Confidence
        </p>
      </footer>
    </div>
  );
};

export default Index;
