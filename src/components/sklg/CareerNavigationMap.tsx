import { useState } from "react";
import {
  Navigation2,
  Target,
  Sparkles,
  GraduationCap,
  Award,
  Building2,
  FileCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { fakeCareerEngine } from "@/lib/fakeEngine";

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
}

/* -------------------- GRAPH NODES -------------------- */
const nodes: RouteNode[] = [
  { id: "start", label: "Start Career", icon: Navigation2, x: 50, y: 200 },
  { id: "exam", label: "Entrance Exams", icon: FileCheck, x: 200, y: 80 },
  { id: "cert", label: "Certifications", icon: Award, x: 200, y: 200 },
  { id: "intern", label: "Internship", icon: Building2, x: 200, y: 320 },
  { id: "college", label: "College", icon: GraduationCap, x: 400, y: 120 },
  { id: "company", label: "Company Exp.", icon: Building2, x: 400, y: 280 },
  { id: "destination", label: "Career Goal", icon: Target, x: 600, y: 200 },
];

/* -------------------- ALL ROUTES -------------------- */
const routes: Route[] = [
  {
    id: "route1",
    name: "Traditional Academic",
    nodes: ["start", "exam", "college", "destination"],
    path: "M 50 200 Q 100 80, 200 80 Q 300 80, 400 120 Q 500 140, 600 200",
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

/* -------------------- NODE UI -------------------- */
const NodeIcon = ({
  node,
  isOnActiveRoute,
}: {
  node: RouteNode;
  isOnActiveRoute?: boolean;
}) => {
  const Icon = node.icon;
  const isEndpoint = node.id === "start" || node.id === "destination";

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 group"
      style={{
        left: `${(node.x / 650) * 100}%`,
        top: `${(node.y / 400) * 100}%`,
      }}
    >
      <div
        className={cn(
          "relative flex items-center justify-center rounded-full transition-all duration-500",
          isEndpoint ? "w-16 h-16" : "w-12 h-12",
          isOnActiveRoute
            ? "bg-primary/20 border-2 border-primary animate-pulse-glow"
            : "bg-muted/30 border border-border opacity-50"
        )}
      >
        <Icon
          className={cn(
            isEndpoint ? "w-7 h-7" : "w-5 h-5",
            isOnActiveRoute ? "text-primary" : "text-muted-foreground"
          )}
        />
      </div>

      <div className="absolute top-14 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
        {node.label}
      </div>
    </div>
  );
};

/* -------------------- MAIN -------------------- */
const CareerNavigationMap = () => {
  const engine = fakeCareerEngine();

  const selectedCareerId = localStorage.getItem("selectedCareer");
  const career =
    engine.careers.find((c: any) => c.id === selectedCareerId) ||
    engine.careers[0];

  const visibleRoutes = routes.filter((r) =>
    career.routes.includes(r.id)
  );

  const [activeRoute, setActiveRoute] = useState(visibleRoutes[0]?.id);

  const activeRouteData = visibleRoutes.find(
    (r) => r.id === activeRoute
  );

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Path to <span className="text-gradient">{career.title}</span>
          </h2>
          <p className="text-muted-foreground">
            We dynamically adapt routes as your journey evolves.
          </p>
        </div>

        {/* Route Selector */}
        <div className="flex justify-center gap-3 mb-8">
          {visibleRoutes.map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveRoute(r.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm transition-all",
                activeRoute === r.id
                  ? "bg-primary text-primary-foreground glow-cyan"
                  : "glass-card text-muted-foreground"
              )}
            >
              {r.name}
            </button>
          ))}
        </div>

        {/* MAP */}
        <div className="glass-card rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm">
              Showing route:{" "}
              <span className="text-primary font-medium">
                {activeRouteData?.name}
              </span>
            </span>
          </div>

          <div className="relative w-full aspect-[16/9]">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 650 400"
            >
              <defs>
                <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="50%" stopColor="hsl(var(--secondary))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>

              {/* Inactive routes */}
              {visibleRoutes
                .filter((r) => r.id !== activeRoute)
                .map((r) => (
                  <path
                    key={r.id}
                    d={r.path}
                    fill="none"
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
                    strokeDasharray="8 4"
                    className="opacity-30"
                  />
                ))}

              {/* Active route */}
              {activeRouteData && (
                <path
                  d={activeRouteData.path}
                  fill="none"
                  stroke="url(#activeGradient)"
                  strokeWidth="4"
                  className="animate-flow-path"
                />
              )}

              {/* Moving particle */}
              {activeRouteData && (
                <circle r="4" fill="hsl(var(--primary))">
                  <animateMotion
                    dur="4s"
                    repeatCount="indefinite"
                    path={activeRouteData.path}
                  />
                </circle>
              )}
            </svg>

            {nodes.map((node) => (
              <NodeIcon
                key={node.id}
                node={node}
                isOnActiveRoute={activeRouteData?.nodes.includes(node.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerNavigationMap;
