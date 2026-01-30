import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background Paths */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="pathGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--sklg-cyan))" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(var(--sklg-cyan))" stopOpacity="1" />
              <stop offset="100%" stopColor="hsl(var(--sklg-indigo))" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="pathGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--sklg-teal))" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(var(--sklg-teal))" stopOpacity="1" />
              <stop offset="100%" stopColor="hsl(var(--sklg-green))" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          <path
            d="M-100,400 Q200,200 400,350 T700,300 T1000,400 T1300,350"
            fill="none"
            stroke="url(#pathGradient1)"
            strokeWidth="2"
            strokeDasharray="10 5"
            className="animate-flow-path"
            style={{ strokeDashoffset: 100 }}
          />
          <path
            d="M-100,500 Q300,350 500,450 T800,400 T1100,500 T1400,450"
            fill="none"
            stroke="url(#pathGradient2)"
            strokeWidth="2"
            strokeDasharray="10 5"
            className="animate-flow-path"
            style={{ strokeDashoffset: 100, animationDelay: "0.5s" }}
          />
          <path
            d="M-100,300 Q150,150 350,250 T650,200 T950,300 T1250,250"
            fill="none"
            stroke="url(#pathGradient1)"
            strokeWidth="1.5"
            strokeDasharray="8 4"
            className="animate-flow-path"
            style={{ strokeDashoffset: 100, animationDelay: "1s" }}
          />
        </svg>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/40 animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
            <Navigation className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI-Powered Career Navigation</span>
          </div>
        </div>

        <h1 
          className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <span className="text-gradient">SKLG</span>
        </h1>

        <p 
          className="text-xl md:text-2xl text-muted-foreground mb-4 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          Navigate Your Career. Achieve with Confidence.
        </p>

        <p 
          className="text-muted-foreground/70 max-w-2xl mx-auto mb-10 animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          Your personal career GPS — discover the right path, follow step-by-step milestones, 
          and get dynamically re-routed when life happens.
        </p>

        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <Button 
            size="lg" 
            className="glow-cyan hover:scale-105 transition-transform duration-300"
          >
            <MapPin className="w-5 h-5 mr-2" />
            Start Your Journey
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="hover:bg-muted/50 transition-all duration-300"
          >
            Explore Paths
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in-up"
          style={{ animationDelay: "1s" }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
