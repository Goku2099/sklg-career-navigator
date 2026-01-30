import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation2, Sparkles } from "lucide-react";

const Analyzing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/careers");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="glass-card rounded-2xl p-10 text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Navigation2 className="w-12 h-12 text-primary animate-spin" />
            <Sparkles className="w-5 h-5 text-accent absolute -top-1 -right-1 animate-pulse" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2">
          Analyzing Your Career Path
        </h2>

        <p className="text-muted-foreground text-sm">
          Evaluating interests, goals, budget and possible career routes…
        </p>

        <div className="mt-6 w-full h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full w-2/3 bg-gradient-to-r from-primary via-secondary to-accent animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Analyzing;
