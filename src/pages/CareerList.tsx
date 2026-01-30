import { useNavigate } from "react-router-dom";
import { fakeCareerEngine } from "@/lib/fakeEngine";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const CareerList = () => {
  const navigate = useNavigate();
  const engine = fakeCareerEngine();

  return (
    <div className="min-h-screen bg-background px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Your Career <span className="text-gradient">Destinations</span>
          </h1>
          <p className="text-muted-foreground">
            Choose your destination — we’ll guide you step-by-step on how to reach it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {engine.careers.map((career: any) => (
            <div
              key={career.id}
              className={`glass-card rounded-2xl p-6 transition hover:scale-105 ${
                career.recommended ? "border-primary/60 glow-cyan" : ""
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-primary" />
                <h3 className="text-lg font-semibold">{career.title}</h3>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                {career.description}
              </p>

              {career.recommended && (
                <span className="text-xs text-primary">Recommended Career</span>
              )}

              <Button
                className="w-full mt-4"
                onClick={() => {
                  localStorage.setItem("selectedCareer", career.id);
                  localStorage.setItem(
                    "availableRoutes",
                    JSON.stringify(career.routes)
                  );
                  navigate("/career-map");
                }}
              >
                View Career Path
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerList;
