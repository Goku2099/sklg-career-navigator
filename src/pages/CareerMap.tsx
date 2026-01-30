import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Navigation2,
  GraduationCap,
  FileCheck,
  School,
  BookOpen,
  Award,
  Target,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------------- TYPES ---------------- */
type Node = {
  id: string;
  label: string;
  icon: any;
  x: number;
  y: number;
};

/* ---------------- READ STUDENT PROFILE ---------------- */
const profile = JSON.parse(localStorage.getItem("studentProfile") || "{}");
const age = Number(profile.age || 15);

/* ---------------- NODES (MERGED SCHOOL) ---------------- */
const NODES: Node[] = [
  { id: "start", label: "Start", icon: Navigation2, x: 80, y: 210 },

  {
    id: "school",
    label: "School (10–12)",
    icon: GraduationCap,
    x: 240,
    y: 210,
  },

  { id: "exam", label: "Entrance Exams", icon: FileCheck, x: 400, y: 210 },

  {
    id: "govt",
    label: "Govt / Top College",
    icon: School,
    x: 560,
    y: 120,
  },
  {
    id: "private",
    label: "Private College",
    icon: School,
    x: 560,
    y: 300,
  },

  { id: "learn", label: "Skill Learning", icon: BookOpen, x: 720, y: 210 },
  { id: "cert", label: "Certifications", icon: Award, x: 850, y: 300 },

  {
    id: "job",
    label: "Job (Software Engineer)",
    icon: Target,
    x: 940,
    y: 210,
  },
];

/* ---------------- ROUTES ---------------- */
const ROUTES = {
  best: ["start", "school", "exam", "govt", "learn", "cert", "job"],
  alternate: ["start", "school", "exam", "private", "learn", "cert", "job"],
};

/* ---------------- HELPERS ---------------- */
const nodeById = (id: string) => NODES.find((n) => n.id === id)!;

const curve = (a: Node, b: Node) => {
  const dx = b.x - a.x;
  return `
    M ${a.x} ${a.y}
    C ${a.x + dx * 0.35} ${a.y},
      ${a.x + dx * 0.65} ${b.y},
      ${b.x} ${b.y}
  `;
};

/* ---------------- AGE → START NODE ---------------- */
const getStartNodeByAge = () => {
  if (age < 17) return "school";
  if (age <= 20) return "exam";
  return "learn";
};

/* ---------------- COMPONENT ---------------- */
export default function CareerMap() {
  const navigate = useNavigate();
  const [routeType, setRouteType] = useState<"best" | "alternate">("best");
  const [activeNode, setActiveNode] = useState(getStartNodeByAge());

  const activeRoute = ROUTES[routeType];

  /* -------- MOVE TO NEXT STAGE -------- */
  const moveNext = () => {
    const index = activeRoute.indexOf(activeNode);
    if (index === -1 || index === activeRoute.length - 1) return;
    setActiveNode(activeRoute[index + 1]);
  };

  return (
    <div className="min-h-screen bg-background px-6 py-16">
      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">
          Your Career Map for{" "}
          <span className="text-gradient">Software Engineer</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Best path selected for your career right now.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        {/* MAP */}
        <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
          <svg viewBox="0 0 1000 420" className="w-full h-full absolute inset-0">
            {/* WEB BACKGROUND */}
            {NODES.map((a) =>
              NODES.map((b) =>
                a.id !== b.id ? (
                  <path
                    key={`${a.id}-${b.id}`}
                    d={curve(a, b)}
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="1"
                    strokeDasharray="6 12"
                    opacity="0.12"
                  />
                ) : null
              )
            )}

            {/* ACTIVE ROUTE */}
            {activeRoute.map((id, i) => {
              if (i === activeRoute.length - 1) return null;
              const a = nodeById(activeRoute[i]);
              const b = nodeById(activeRoute[i + 1]);
              return (
                <path
                  key={`${a.id}-${b.id}`}
                  d={curve(a, b)}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="animate-flow-path"
                  style={{
                    filter: "drop-shadow(0 0 10px hsl(var(--primary)))",
                  }}
                />
              );
            })}
          </svg>

          {/* NODES */}
          {NODES.map((node) => {
            const Icon = node.icon;
            const onRoute = activeRoute.includes(node.id);
            const active = activeNode === node.id;

            return (
              <div
                key={node.id}
                onClick={() => setActiveNode(node.id)}
                className="absolute cursor-pointer"
                style={{
                  left: `${(node.x / 1000) * 100}%`,
                  top: `${(node.y / 420) * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300",
                    active && "bg-primary/20 border-2 border-primary glow-cyan",
                    !active && onRoute && "bg-muted/40 border border-primary/40",
                    !onRoute && "bg-muted/20 border border-border opacity-50"
                  )}
                >
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs mt-2 text-center text-muted-foreground">
                  {node.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* INFO PANEL */}
        <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">
              {nodeById(activeNode).label}
            </h2>

            <p className="text-sm text-muted-foreground mb-4">
              Don’t worry — we track your age and academic stage to guide you at
              the right time.
            </p>

            {activeNode === "school" && (
              <p>
                Complete school with a minimum <b>70%</b> and choose a stream
                aligned with engineering.
              </p>
            )}
            {activeNode === "exam" && (
              <p>
                Recommended exams: <b>JEE / CET / Other alternatives</b>
              </p>
            )}
            {activeNode === "learn" && (
              <p>Focus on core CS, projects, and problem-solving.</p>
            )}
          </div>

          {/* ACTIONS */}
          <div className="space-y-3">
            <button
              onClick={moveNext}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground"
            >
              I completed this stage
            </button>

            <button
              onClick={() =>
                setRouteType(routeType === "best" ? "alternate" : "best")
              }
              className="w-full py-3 rounded-lg border border-border flex items-center justify-center gap-2 hover:border-primary"
            >
              <RefreshCw className="w-4 h-4" />
              Re-route to another option
            </button>

            <button
              onClick={() => navigate("/student")}
              className="text-sm underline text-muted-foreground text-center"
            >
              Change interest or destination
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
