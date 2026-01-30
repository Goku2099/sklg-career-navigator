import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Student = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [education, setEducation] = useState("");

  const [interest, setInterest] = useState("");
  const [customInterest, setCustomInterest] = useState("");
  const [goal, setGoal] = useState("");
  const [customGoal, setCustomGoal] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [location, setLocation] = useState("");

  const submitProfile = () => {
    localStorage.setItem(
      "studentProfile",
      JSON.stringify({
        name,
        age,
        education,
        interest: customInterest || interest,
        goal: customGoal || goal,
        hobbies,
        location,
      })
    );

    // Also store separately for easy access in map logic
    localStorage.setItem("studentAge", age);
    localStorage.setItem("studentEducation", education);

    navigate("/analyzing");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="glass-card rounded-2xl p-8 max-w-xl w-full">
        <h1 className="text-3xl font-bold mb-8 text-center text-gradient">
          Student Career Profile
        </h1>

        {/* Name */}
        <div className="mb-6">
          <label className="text-sm text-muted-foreground">Your Name</label>
          <input
            className="w-full mt-2 p-3 rounded-lg bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Age */}
        <div className="mb-6">
          <label className="text-sm text-muted-foreground">Your Age</label>
          <input
            type="number"
            className="w-full mt-2 p-3 rounded-lg bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            placeholder="e.g. 17, 20, 24"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        {/* Education */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-2">
            Current Education Level
          </p>
          <div className="flex gap-3 flex-wrap">
            {[
              { id: "school", label: "School Student" },
              { id: "undergraduate", label: "Undergraduate" },
              { id: "graduate", label: "Graduate" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setEducation(item.id)}
                className={`px-4 py-2 rounded-full border transition
                  ${
                    education === item.id
                      ? "bg-primary text-primary-foreground glow-cyan"
                      : "border-border text-muted-foreground hover:border-primary"
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interest */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-2">Your Interest</p>
          <div className="flex gap-3 flex-wrap mb-3">
            {["Technology", "Medical", "Business", "Arts"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setInterest(item);
                  setCustomInterest("");
                }}
                className={`px-4 py-2 rounded-full border transition
                  ${
                    interest === item
                      ? "bg-primary text-primary-foreground glow-cyan"
                      : "border-border text-muted-foreground hover:border-primary"
                  }`}
              >
                {item}
              </button>
            ))}
          </div>

          <label className="text-xs text-muted-foreground">
            Other Interest (optional)
          </label>
          <input
            className="w-full mt-2 p-3 rounded-lg bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            placeholder="e.g. Law, Design, Finance"
            value={customInterest}
            onChange={(e) => {
              setCustomInterest(e.target.value);
              setInterest("");
            }}
          />
        </div>

        {/* Career Goal */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-2">Career Goal</p>
          <div className="flex gap-3 flex-wrap mb-3">
            {["Software Engineer", "Doctor", "Data Scientist"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setGoal(item);
                  setCustomGoal("");
                }}
                className={`px-4 py-2 rounded-full border transition
                  ${
                    goal === item
                      ? "bg-secondary text-secondary-foreground"
                      : "border-border text-muted-foreground hover:border-secondary"
                  }`}
              >
                {item}
              </button>
            ))}
          </div>

          <label className="text-xs text-muted-foreground">
            Other Career Goal (optional)
          </label>
          <input
            className="w-full mt-2 p-3 rounded-lg bg-muted border border-border focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
            placeholder="e.g. Product Manager, Economist"
            value={customGoal}
            onChange={(e) => {
              setCustomGoal(e.target.value);
              setGoal("");
            }}
          />
        </div>

        {/* Hobbies */}
        <div className="mb-6">
          <label className="text-sm text-muted-foreground">
            Hobbies & Activities
          </label>
          <input
            className="w-full mt-2 p-3 rounded-lg bg-muted border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none"
            placeholder="e.g. coding, chess, sports, music"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
          />
        </div>

        {/* Location */}
        <div className="mb-8">
          <label className="text-sm text-muted-foreground">
            Preferred Location
          </label>
          <input
            className="w-full mt-2 p-3 rounded-lg bg-muted border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none"
            placeholder="e.g. India, USA, Europe, Remote"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Submit */}
        <Button
          className="w-full glow-cyan"
          disabled={
            !name ||
            !age ||
            !education ||
            !(interest || customInterest) ||
            !(goal || customGoal) ||
            !location
          }
          onClick={submitProfile}
        >
          Generate My Career Path
        </Button>
      </div>
    </div>
  );
};

export default Student;
