import { useEffect, useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { StudentView } from "./components/StudentView";
import { CanteenView } from "./components/CanteenView";
import { UtensilsCrossed, ChefHat, LogOut } from "lucide-react";
import { Complaint } from "./types";

// Extend window type
declare global {
  interface Window {
    chatbase?: any;
  }
}

export default function App() {
  const [view, setView] = useState<
    "landing" | "student" | "canteen"
  >("landing");

  const [complaints, setComplaints] = useState<Complaint[]>([]);

  /* --------------------------------------------------
     CHATBASE LOADER (STRICT MODE SAFE)
  -------------------------------------------------- */
  useEffect(() => {
    if (document.getElementById("chatbase-script")) return;

    if (!window.chatbase) {
      const chatbaseQueue: any[] = [];

      const chatbaseFn = (...args: any[]) => {
        chatbaseQueue.push(args);
      };

      (chatbaseFn as any).q = chatbaseQueue;

      window.chatbase = new Proxy(chatbaseFn, {
        get(target, prop) {
          if (prop === "q") return chatbaseQueue;
          return (...args: any[]) => target(...args);
        },
      });
    }

    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "chatbase-script";
    script.setAttribute("domain", "www.chatbase.co");
    script.setAttribute("chatbotId", "u-Q4GEDOVUyWZUnAAgdzc");
    script.defer = true;

    document.body.appendChild(script);
  }, []);

  /* --------------------------------------------------
     CHATBOT ROLE CONTEXT
  -------------------------------------------------- */
  useEffect(() => {
    if (!window.chatbase) return;

    if (view === "landing") {
      window.chatbase("hide");
      return;
    }

    window.chatbase("show");
    window.chatbase("setContext", {
      user_role:
        view === "student"
          ? "student"
          : "canteen_staff",
    });
  }, [view]);

  /* --------------------------------------------------
     HANDLERS
  -------------------------------------------------- */
  const handleSelectRole = (role: "student" | "canteen") => {
    setView(role);
  };

  const handleLogout = () => {
    setView("landing");
  };

  const handleSubmitComplaint = (
    complaint: Omit<Complaint, "id" | "submittedAt" | "status">
  ) => {
    const newComplaint: Complaint = {
      ...complaint,
      id: `C-${Date.now()}`,
      submittedAt: new Date(),
      status: "pending",
    };
    setComplaints((prev) => [...prev, newComplaint]);
  };

  const handleUpdateComplaint = (
    id: string,
    updates: Partial<Complaint>
  ) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      )
    );
  };

  /* --------------------------------------------------
     LANDING PAGE
  -------------------------------------------------- */
  if (view === "landing") {
    return <LandingPage onSelectRole={handleSelectRole} />;
  }

  /* --------------------------------------------------
     MAIN UI
  -------------------------------------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-orange-500 to-red-500 p-2 rounded-xl">
              <UtensilsCrossed className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Foodie
              </h1>
              <p className="text-xs text-gray-500">
                {view === "student"
                  ? "Student Portal"
                  : "Canteen Dashboard"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                view === "student"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-indigo-100 text-indigo-700"
              }`}
            >
              {view === "student" ? (
                <>
                  <UtensilsCrossed className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    Student
                  </span>
                </>
              ) : (
                <>
                  <ChefHat className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    Canteen
                  </span>
                </>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main>
        {view === "student" ? (
          <StudentView
            complaints={complaints}
            onSubmitComplaint={handleSubmitComplaint}
          />
        ) : (
          <CanteenView
            complaints={complaints}
            onUpdateComplaint={handleUpdateComplaint}
          />
        )}
      </main>
    </div>
  );
}
