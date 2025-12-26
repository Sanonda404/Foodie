import { useState } from "react";
import { StudentView } from "../StudentView";
import { UtensilsCrossed, LogOut } from "lucide-react";
import { Complaint } from "../types";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  const handleLogout = () => {
    navigate('/');
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


  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-linear-to-br from-orange-500 to-red-500 p-2 rounded-xl">
                <UtensilsCrossed className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-orange-700 text-5xl">
                  Foodie
                </h1>
                <p className="text-gray-800 text-3xl">
                  Student Dashboard
                </p>
              </div>
            </div>

            {/* View Indicator & Logout */}
            <div className="flex items-center gap-3">
              <div
                className="px-4 py-2 rounded-lg flex items-center gap-2
                    bg-linear-to-r from-orange-100 to-red-100 text-orange-700"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span className="hidden sm:inline">
                    Student
                </span>
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
          <StudentView
            complaints={complaints}
            onSubmitComplaint={handleSubmitComplaint}
          />
      </main>
    </div>
  );
}