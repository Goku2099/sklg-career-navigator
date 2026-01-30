import { Check, Circle, Lock, Navigation2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Milestone {
  id: number;
  title: string;
  description: string;
  status: "completed" | "active" | "upcoming";
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
  },
  {
    id: 3,
    title: "Certifications",
    description: "Earn industry-recognized certifications",
    status: "upcoming",
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
          !isCompleted && !isActive && "bg-muted/50 border-2 border-muted-foreground/30"
        )}
      >
        {isCompleted ? (
          <Check className="w-7 h-7 text-accent" />
        ) : isActive ? (
          <Navigation2 className="w-7 h-7 text-primary" />
        ) : (
          <Lock className="w-5 h-5 text-muted-foreground/50" />
        )}

        {/* Active indicator */}
        {isActive && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
            <span className="text-xs text-primary font-medium px-2 py-1 rounded-full bg-primary/10 whitespace-nowrap">
              You are here
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
            !isCompleted && !isActive && "text-muted-foreground"
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
          <div className="mt-2 flex items-center gap-1">
            <Circle className={cn(
              "w-2 h-2",
              isCompleted && "fill-accent text-accent",
              isActive && "fill-primary text-primary",
              !isCompleted && !isActive && "fill-muted text-muted"
            )} />
            <span className="text-[10px] text-muted-foreground capitalize">
              {milestone.status}
            </span>
          </div>
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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Career <span className="text-gradient">Roadmap</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Follow your personalized path with clear milestones. We'll guide you through each step 
            and re-route when needed.
          </p>
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

          {/* Milestone Nodes */}
          <div className="flex flex-col md:flex-row md:justify-between gap-12 md:gap-4 relative">
            {milestones.map((milestone, index) => (
              <MilestoneNode key={milestone.id} milestone={milestone} index={index} />
            ))}
          </div>
        </div>

        {/* Progress Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
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
