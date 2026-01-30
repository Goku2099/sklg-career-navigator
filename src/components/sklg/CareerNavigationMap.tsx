import { useState } from "react";
import { Circle, Navigation2, Target, Sparkles, GraduationCap, Award, Building2, FileCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface RouteNode {
  id: string;
  label: string;
  icon: React.ElementType;
  x: number;
  y: number;
}

interface Route {
  id: string;
  name: string;
  nodes: string[];
  path: string;
  active?: boolean;
}

const nodes: RouteNode[] = [
  { id: "start", label: "Start Career", icon: Navigation2, x: 50, y: 200 },
  { id: "exam", label: "Entrance Exams", icon: FileCheck, x: 200, y: 80 },
  { id: "cert", label: "Certifications", icon: Award, x: 200, y: 200 },
  { id: "intern", label: "Internship", icon: Building2, x: 200, y: 320 },
  { id: "college", label: "College", icon: GraduationCap, x: 400, y: 120 },
  { id: "company", label: "Company Exp.", icon: Building2, x: 400, y: 280 },
  { id: "destination", label: "Career Goal", icon: Target, x: 600, y: 200 },
];

const routes: Route[] = [
  {
    id: "route1",
    name: "Traditional Academic",
    nodes: ["start", "exam", "college", "destination"],
    path: "M 50 200 Q 100 80, 200 80 Q 300 80, 400 120 Q 500 140, 600 200",
    active: true,
  },
  {
    id: "route2",
    name: "Certification Path",
    nodes: ["start", "cert", "college", "destination"],
    path: "M 50 200 Q 125 200, 200 200 Q 300 160, 400 120 Q 500 160, 600 200",
  },
  {
    id: "route3",
    name: "Industry First",
    nodes: ["start", "intern", "company", "destination"],
    path: "M 50 200 Q 100 320, 200 320 Q 300 320, 400 280 Q 500 240, 600 200",
  },
  {
    id: "route4",
    name: "Hybrid Path",
    nodes: ["start", "cert", "company", "destination"],
    path: "M 50 200 Q 125 200, 200 200 Q 300 240, 400 280 Q 500 240, 600 200",
  },
];

const NodeIcon = ({ node, isActive, isOnActiveRoute }: { node: RouteNode; isActive?: boolean; isOnActiveRoute?: boolean }) => {
  const Icon = node.icon;
  const isEndpoint = node.id === "start" || node.id === "destination";
  
  return (
    <div
      className={cn(
        "absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300",
      )}
      style={{ left: `${(node.x / 650) * 100}%`, top: `${(node.y / 400) * 100}%` }}
    >
      {/* Node circle */}
      <div
        className={cn(
          "relative flex items-center justify-center rounded-full transition-all duration-500",
          isEndpoint ? "w-16 h-16" : "w-12 h-12",
          isActive && "animate-pulse-glow",
          isEndpoint && node.id === "start" && "bg-primary/20 border-2 border-primary glow-cyan",
          isEndpoint && node.id === "destination" && "bg-accent/20 border-2 border-accent glow-green",
          !isEndpoint && isOnActiveRoute && "bg-primary/20 border-2 border-primary",
          !isEndpoint && !isOnActiveRoute && "bg-muted/30 border border-border/50 opacity-60 hover:opacity-100 hover:border-primary/50"
        )}
      >
        <Icon className={cn(
          "transition-colors",
          isEndpoint ? "w-7 h-7" : "w-5 h-5",
          isEndpoint && node.id === "start" && "text-primary",
          isEndpoint && node.id === "destination" && "text-accent",
          !isEndpoint && isOnActiveRoute && "text-primary",
          !isEndpoint && !isOnActiveRoute && "text-muted-foreground"
        )} />
        
        {/* Current position indicator */}
        {isActive && (
          <div className="absolute -top-1 -right-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
          </div>
        )}
      </div>
      
      {/* Label */}
      <div className={cn(
        "absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center transition-opacity",
        isEndpoint ? "top-20" : "top-14",
        isOnActiveRoute || isEndpoint ? "opacity-100" : "opacity-50 group-hover:opacity-100"
      )}>
        <span className={cn(
          "text-xs font-medium px-2 py-1 rounded-full",
          isEndpoint && node.id === "start" && "text-primary bg-primary/10",
          isEndpoint && node.id === "destination" && "text-accent bg-accent/10",
          !isEndpoint && isOnActiveRoute && "text-foreground bg-card/80",
          !isEndpoint && !isOnActiveRoute && "text-muted-foreground"
        )}>
          {node.label}
        </span>
      </div>

      {/* Hover tooltip */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
        <div className="glass-card rounded-lg px-3 py-2">
          <p className="text-xs text-foreground font-medium whitespace-nowrap">{node.label}</p>
        </div>
      </div>
    </div>
  );
};

const CareerNavigationMap = () => {
  const [activeRoute, setActiveRoute] = useState("route1");
  
  const activeRouteData = routes.find(r => r.id === activeRoute);
  const activeNodes = activeRouteData?.nodes || [];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Career <span className="text-gradient">Navigation</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Multiple paths lead to your career destination. We'll help you find the optimal route 
            and adapt as you progress.
          </p>
        </div>

        {/* Route Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {routes.map((route) => (
            <button
              key={route.id}
              onClick={() => setActiveRoute(route.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activeRoute === route.id 
                  ? "bg-primary text-primary-foreground glow-cyan" 
                  : "glass-card text-muted-foreground hover:text-foreground hover:border-primary/50"
              )}
            >
              {route.name}
            </button>
          ))}
        </div>

        {/* Navigation Map */}
        <div className="glass-card rounded-2xl p-6 md:p-8">
          {/* Current Route Label */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Current Recommended Route: <span className="text-primary">{activeRouteData?.name}</span>
            </span>
          </div>

          {/* SVG Map */}
          <div className="relative w-full aspect-[16/10] md:aspect-[16/8]">
            {/* SVG Paths */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 650 400"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Gradient for active path */}
                <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="50%" stopColor="hsl(var(--secondary))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
                
                {/* Glow filter */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>

                {/* Animated dash pattern */}
                <pattern id="flowPattern" patternUnits="userSpaceOnUse" width="20" height="1">
                  <rect x="0" y="0" width="10" height="1" fill="hsl(var(--primary))" />
                </pattern>
              </defs>

              {/* Render inactive routes first (below) */}
              {routes
                .filter(route => route.id !== activeRoute)
                .map((route) => (
                  <path
                    key={route.id}
                    d={route.path}
                    fill="none"
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
                    strokeDasharray="8 4"
                    className="opacity-30 hover:opacity-60 transition-opacity cursor-pointer"
                    onClick={() => setActiveRoute(route.id)}
                  />
                ))}

              {/* Active route glow layer */}
              {activeRouteData && (
                <path
                  d={activeRouteData.path}
                  fill="none"
                  stroke="url(#activeGradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  className="opacity-30 blur-sm"
                />
              )}

              {/* Active route main line */}
              {activeRouteData && (
                <path
                  d={activeRouteData.path}
                  fill="none"
                  stroke="url(#activeGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  filter="url(#glow)"
                  className="animate-flow-path"
                  style={{
                    strokeDasharray: "1000",
                    strokeDashoffset: "0",
                  }}
                />
              )}

              {/* Animated particles on active route */}
              {activeRouteData && (
                <>
                  <circle r="4" fill="hsl(var(--primary))">
                    <animateMotion
                      dur="4s"
                      repeatCount="indefinite"
                      path={activeRouteData.path}
                    />
                  </circle>
                  <circle r="3" fill="hsl(var(--accent))" opacity="0.7">
                    <animateMotion
                      dur="4s"
                      repeatCount="indefinite"
                      path={activeRouteData.path}
                      begin="1s"
                    />
                  </circle>
                </>
              )}
            </svg>

            {/* Node Icons */}
            {nodes.map((node) => (
              <NodeIcon
                key={node.id}
                node={node}
                isActive={node.id === "exam"} // Current position mock
                isOnActiveRoute={activeNodes.includes(node.id)}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent rounded" />
              <span>Active Route</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 border-t-2 border-dashed border-border/50" />
              <span>Alternative Routes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span>Current Position</span>
            </div>
          </div>
        </div>

        {/* Route Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {routes.map((route, i) => (
            <button
              key={route.id}
              onClick={() => setActiveRoute(route.id)}
              className={cn(
                "glass-card rounded-xl p-4 text-left transition-all duration-300 hover:scale-105",
                activeRoute === route.id && "border-primary/50 glow-cyan"
              )}
            >
              <h3 className={cn(
                "font-semibold text-sm mb-1",
                activeRoute === route.id ? "text-primary" : "text-foreground"
              )}>
                {route.name}
              </h3>
              <p className="text-xs text-muted-foreground">
                {route.nodes.length - 2} steps • {route.id === "route1" ? "Recommended" : "Alternative"}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerNavigationMap;
