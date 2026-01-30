export const fakeCareerEngine = () => {
  const data = JSON.parse(localStorage.getItem("studentProfile") || "{}");

  const interest = data.interest || "";
  const goal = data.goal || "";
  const hobbies = data.hobbies || "";

  let careers = [];

  // TECHNOLOGY
  if (interest.includes("Technology") || goal.includes("Software")) {
    careers = [
      {
        id: "data-scientist",
        title: "Data Science Engineer",
        description: "Works with data, ML models, and analytics",
        recommended: true,
        routes: ["route2", "route4", "route1"],
      },
      {
        id: "software-engineer",
        title: "Software Engineer",
        description: "Builds scalable software systems",
        recommended: false,
        routes: ["route1", "route2"],
      },
      {
        id: "mentor",
        title: "Tech Mentor / Educator",
        description: "Guides others through teaching & mentoring",
        recommended: false,
        routes: ["route1", "route4"],
      },
    ];
  }

  // MEDICAL
  else if (interest.includes("Medical") || goal.includes("Doctor")) {
    careers = [
      {
        id: "doctor",
        title: "Medical Doctor",
        description: "Clinical practice and patient care",
        recommended: true,
        routes: ["route1"],
      },
      {
        id: "medical-researcher",
        title: "Medical Researcher",
        description: "Research & innovation in healthcare",
        recommended: false,
        routes: ["route1", "route3"],
      },
    ];
  }

  // SPORTS / ARTS / OTHERS
  else if (hobbies.toLowerCase().includes("sport")) {
    careers = [
      {
        id: "athlete",
        title: "Professional Athlete",
        description: "Competitive sports and training",
        recommended: true,
        routes: ["route3", "route4"],
      },
      {
        id: "coach",
        title: "Sports Coach",
        description: "Training and mentoring athletes",
        recommended: false,
        routes: ["route4"],
      },
    ];
  }

  // FALLBACK
  else {
    careers = [
      {
        id: "generalist",
        title: "Multi-Domain Professional",
        description: "Flexible career across domains",
        recommended: true,
        routes: ["route4", "route2"],
      },
    ];
  }

  return {
    student: data,
    careers,
  };
};
