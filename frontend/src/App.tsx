import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { StudentView } from "./components/StudentView";
import { CanteenView } from "./components/CanteenView";
import { UtensilsCrossed, ChefHat, LogOut } from "lucide-react";
import { Complaint } from "./types";

export default function App() {
  const [view, setView] = useState<
    "landing" | "student" | "canteen"
  >("landing");
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  const handleSelectRole = (role: "student" | "canteen") => {
    setView(role);
  };

  const handleLogout = () => {
    setView("landing");
  };

  const handleSubmitComplaint = (
    complaint: Omit<Complaint, "id" | "submittedAt" | "status">,
  ) => {
    const newComplaint: Complaint = {
      ...complaint,
      id: `C-${Date.now()}`,
      submittedAt: new Date(),
      status: "pending",
    };
    setComplaints([...complaints, newComplaint]);
  };

  const handleUpdateComplaint = (
    id: string,
    updates: Partial<Complaint>,
  ) => {
    setComplaints(
      complaints.map((complaint) =>
        complaint.id === id
          ? { ...complaint, ...updates }
          : complaint,
      ),
    );
  };

  if (view === "landing") {
    return <LandingPage onSelectRole={handleSelectRole} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-2 rounded-xl">
                <UtensilsCrossed className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Foodie
                </h1>
                <p className="text-xs text-gray-500">
                  {view === "student"
                    ? "Student Portal"
                    : "Canteen Dashboard"}
                </p>
              </div>
            </div>

            {/* View Indicator & Logout */}
            <div className="flex items-center gap-3">
              <div
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  view === "student"
                    ? "bg-gradient-to-r from-orange-100 to-red-100 text-orange-700"
                    : "bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700"
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
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
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