import { Star, TrendingUp, DollarSign, MapPin } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface College {
  id: number;
  name: string;
  location: string;
  careerFit: number;
  affordability: "low" | "medium" | "high";
  ranking: number;
  highlight: string;
}

const colleges: College[] = [
  {
    id: 1,
    name: "IIT Delhi",
    location: "New Delhi",
    careerFit: 95,
    affordability: "high",
    ranking: 1,
    highlight: "Top Engineering",
  },
  {
    id: 2,
    name: "BITS Pilani",
    location: "Rajasthan",
    careerFit: 88,
    affordability: "medium",
    ranking: 4,
    highlight: "Industry Connect",
  },
  {
    id: 3,
    name: "NIT Trichy",
    location: "Tamil Nadu",
    careerFit: 82,
    affordability: "high",
    ranking: 8,
    highlight: "Best Value",
  },
  {
    id: 4,
    name: "VIT Vellore",
    location: "Tamil Nadu",
    careerFit: 75,
    affordability: "medium",
    ranking: 12,
    highlight: "Fast Growing",
  },
];

const AffordabilityBadge = ({ level }: { level: College["affordability"] }) => {
  const config = {
    high: { label: "Affordable", color: "text-accent bg-accent/10" },
    medium: { label: "Moderate", color: "text-primary bg-primary/10" },
    low: { label: "Premium", color: "text-secondary bg-secondary/10" },
  };

  return (
    <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", config[level].color)}>
      {config[level].label}
    </span>
  );
};

const CollegeCard = ({ college, index }: { college: College; index: number }) => {
  return (
    <div
      className="glass-card rounded-2xl p-5 hover:scale-[1.02] hover:border-primary/50 transition-all duration-300 cursor-pointer group animate-fade-in-up"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-muted-foreground">#{college.ranking}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
              {college.highlight}
            </span>
          </div>
          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
            {college.name}
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <MapPin className="w-3 h-3" />
            {college.location}
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Star className="w-5 h-5 text-primary" />
        </div>
      </div>

      {/* Career Fit Score */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Career Fit
          </span>
          <span className="text-sm font-semibold text-primary">{college.careerFit}%</span>
        </div>
        <Progress value={college.careerFit} className="h-2" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-muted-foreground text-xs">
          <DollarSign className="w-3 h-3" />
          <AffordabilityBadge level={college.affordability} />
        </div>
        <button className="text-xs text-primary hover:underline">
          View Details →
        </button>
      </div>
    </div>
  );
};

const CollegeRecommendations = () => {
  return (
    <section className="py-20 px-4 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Recommended <span className="text-gradient">Colleges</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Based on your career path and goals, here are the top institutions that align 
            with your journey.
          </p>
        </div>

        {/* College Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {colleges.map((college, index) => (
            <CollegeCard key={college.id} college={college} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button className="px-6 py-3 rounded-full glass-card hover:bg-primary/10 transition-colors text-sm font-medium">
            View All Recommendations →
          </button>
        </div>
      </div>
    </section>
  );
};

export default CollegeRecommendations;
