import { Check, Circle, Navigation2, Route, RefreshCw, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Milestone {
  id: number;
  title: string;
  description: string;
  status: "completed" | "active" | "upcoming";
  alternativeCount?: number;
}

const milestones: Milestone[] = [
  {
    id: 1,
    title: "Learn Core Skills",
    description: "Master fundamentals in programming and problem-solving",
    status: "completed",
  },
  {
    id: 2,
    title: "Entrance Exams",
    description: "Prepare and appear for JEE/NEET/other competitive exams",
    status: "active",
    alternativeCount: 2,
  },
  {
    id: 3,
    title: "Certifications",
    description: "Earn industry-recognized certifications",
    status: "upcoming",
    alternativeCount: 3,
  },
  {
    id: 4,
    title: "Internship",
    description: "Gain real-world experience at top companies",
    status: "upcoming",
  },
  {
    id: 5,
    title: "College Admission",
    description: "Secure admission in your dream institution",
    status: "upcoming",
  },
];

const MilestoneNode = ({ milestone, index }: { milestone: Milestone; index: number }) => {
  const isCompleted = milestone.status === "completed";
  const isActive = milestone.status === "active";

  return (
    <div 
      className="relative flex flex-col items-center group animate-fade-in-up"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Node */}
      <div
        className={cn(
          "relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer",
          isCompleted && "bg-accent/20 border-2 border-accent glow-green",
          isActive && "bg-primary/20 border-2 border-primary animate-pulse-glow",
          !isCompleted && !isActive && "bg-muted/30 border-2 border-primary/30 hover:border-primary/60 hover:bg-primary/10"
        )}
      >
        {isCompleted ? (
          <Check className="w-7 h-7 text-accent" />
        ) : isActive ? (
          <Navigation2 className="w-7 h-7 text-primary" />
        ) : (
          <Circle className="w-5 h-5 text-primary/50" />
        )}

        {/* Active indicator */}
        {isActive && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
            <span className="text-xs text-primary font-medium px-2 py-1 rounded-full bg-primary/10 whitespace-nowrap flex items-center gap-1">
              <Navigation2 className="w-3 h-3" />
              You are here
            </span>
          </div>
        )}

        {/* Alternative routes indicator */}
        {milestone.alternativeCount && !isCompleted && (
          <div className="absolute -top-2 -right-2">
            <span className="text-[10px] w-5 h-5 rounded-full bg-secondary/80 text-secondary-foreground flex items-center justify-center font-medium">
              +{milestone.alternativeCount}
            </span>
          </div>
        )}
      </div>

      {/* Label */}
      <div className="mt-12 text-center max-w-[140px]">
        <h3 
          className={cn(
            "font-semibold text-sm mb-1 transition-colors",
            isCompleted && "text-accent",
            isActive && "text-primary",
            !isCompleted && !isActive && "text-foreground/80"
          )}
        >
          {milestone.title}
        </h3>
        <p className="text-xs text-muted-foreground/70 hidden md:block">
          {milestone.description}
        </p>
      </div>

      {/* Hover Card */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20">
        <div className="glass-card rounded-lg p-3 min-w-[180px]">
          <p className="text-xs text-foreground font-medium mb-1">{milestone.title}</p>
          <p className="text-xs text-muted-foreground">{milestone.description}</p>
          {milestone.alternativeCount && (
            <p className="text-[10px] text-secondary mt-2 flex items-center gap-1">
              <Route className="w-3 h-3" />
              {milestone.alternativeCount} alternative routes available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const CareerTimeline = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Career <span className="text-gradient">Roadmap</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Follow your personalized path with clear milestones. We'll guide you through each step 
            and re-route when needed.
          </p>
        </div>

        {/* Route Label */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2">
            <Route className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Current Recommended Route to Your Career Goal</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent hidden md:block" />
          
          {/* Animated Progress Line */}
          <div 
            className="absolute top-8 left-0 h-0.5 bg-gradient-to-r from-accent via-primary to-primary/0 hidden md:block"
            style={{ width: "30%" }}
          />

          {/* Directional arrows on route */}
          <div className="absolute top-[26px] left-[15%] hidden md:flex items-center gap-16 text-primary/30">
            <ArrowRight className="w-4 h-4" />
            <ArrowRight className="w-4 h-4" />
            <ArrowRight className="w-4 h-4" />
            <ArrowRight className="w-4 h-4" />
          </div>

          {/* Milestone Nodes */}
          <div className="flex flex-col md:flex-row md:justify-between gap-12 md:gap-4 relative">
            {milestones.map((milestone, index) => (
              <MilestoneNode key={milestone.id} milestone={milestone} index={index} />
            ))}
          </div>
        </div>

        {/* Re-routing & Alternative Routes Info */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <RefreshCw className="w-4 h-4 text-secondary" />
            <span>Route updates automatically based on your progress</span>
          </div>
          <div className="hidden md:block w-px h-4 bg-border" />
          <div className="flex items-center gap-2 text-muted-foreground">
            <Route className="w-4 h-4 text-secondary" />
            <span>Alternative paths available at key decision points</span>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Completed", value: "1", color: "text-accent" },
            { label: "In Progress", value: "1", color: "text-primary" },
            { label: "Upcoming", value: "3", color: "text-muted-foreground" },
            { label: "Total Progress", value: "20%", color: "text-primary" },
          ].map((stat, i) => (
            <div 
              key={stat.label} 
              className="glass-card rounded-xl p-4 text-center hover:scale-105 transition-transform duration-300 animate-fade-in-up"
              style={{ animationDelay: `${0.8 + i * 0.1}s` }}
            >
              <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerTimeline;
