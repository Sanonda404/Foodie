import { useState } from "react";
import { Complaint } from "../../types";
import {
  AlertTriangle,
  MessageSquare,
  Upload,
  X,
  CheckCircle,
  FileText,
} from "lucide-react";

interface ReviewComplaintProps {
  onSubmitComplaint: (
    complaint: Omit<Complaint, "id" | "submittedAt" | "status">
  ) => void;
  complaints: Complaint[];
}

export function ReviewComplaint({
  onSubmitComplaint,
  complaints,
}: ReviewComplaintProps) {
  const [complaintType, setComplaintType] = useState<
    "food-quality" | "food-poisoning" | "harassment"
  >("food-quality");
  const [studentName, setStudentName] = useState("");
  const [orderToken, setOrderToken] = useState("");
  const [description, setDescription] = useState("");
  const [harassmentTarget, setHarassmentTarget] = useState<"student" | "staff">(
    "student"
  );
  const [proofImages, setProofImages] = useState<string[]>([]);
  const [imageInput, setImageInput] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddImage = () => {
    if (imageInput.trim()) {
      setProofImages([...proofImages, imageInput.trim()]);
      setImageInput("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setProofImages(proofImages.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const complaint: Omit<Complaint, "id" | "submittedAt" | "status"> = {
      type: complaintType,
      studentName,
      orderToken: complaintType !== "harassment" ? orderToken : undefined,
      description,
      proofImages,
      harassmentTarget:
        complaintType === "harassment" ? harassmentTarget : undefined,
    };

    onSubmitComplaint(complaint);

    // Reset form
    setStudentName("");
    setOrderToken("");
    setDescription("");
    setProofImages([]);
    setImageInput("");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getStatusColor = (status: Complaint["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "under-review":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "resolved":
        return "bg-green-100 text-green-700 border-green-300";
    }
  };

  const getTypeLabel = (type: Complaint["type"]) => {
    switch (type) {
      case "food-quality":
        return "Food Quality Issue";
      case "food-poisoning":
        return "Food Poisoning Report";
      case "harassment":
        return "Harassment Complaint";
    }
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-300 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-green-800">
            Your complaint has been submitted successfully. We'll review it
            soon.
          </p>
        </div>
      )}

      {/* Complaint Form */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-gray-900 mb-6">Submit Review / Complaint</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Complaint Type */}
          <div>
            <label className="block text-sm text-gray-700 mb-3">
              Complaint Type
            </label>
            <div className="grid md:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setComplaintType("food-quality")}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  complaintType === "food-quality"
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <MessageSquare className="w-5 h-5 text-orange-500 mb-2" />
                <div className="text-sm text-gray-900">Food Quality</div>
                <div className="text-xs text-gray-500">
                  Review or complaint about food
                </div>
              </button>

              <button
                type="button"
                onClick={() => setComplaintType("food-poisoning")}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  complaintType === "food-poisoning"
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <AlertTriangle className="w-5 h-5 text-red-500 mb-2" />
                <div className="text-sm text-gray-900">Food Poisoning</div>
                <div className="text-xs text-gray-500">
                  Report with medical proof
                </div>
              </button>

              <button
                type="button"
                onClick={() => setComplaintType("harassment")}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  complaintType === "harassment"
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <AlertTriangle className="w-5 h-5 text-purple-500 mb-2" />
                <div className="text-sm text-gray-900">Harassment</div>
                <div className="text-xs text-gray-500">Report misconduct</div>
              </button>
            </div>
          </div>

          {/* Student Name */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Order Token (for food-related complaints) */}
          {complaintType !== "harassment" && (
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Order Token Number *
              </label>
              <input
                type="text"
                required
                value={orderToken}
                onChange={(e) => setOrderToken(e.target.value)}
                placeholder="e.g., FD-1234"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter the token number from your order receipt
              </p>
            </div>
          )}

          {/* Harassment Target */}
          {complaintType === "harassment" && (
            <div>
              <label className="block text-sm text-gray-700 mb-3">
                Report About *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setHarassmentTarget("student")}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    harassmentTarget === "student"
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  Student Harassment
                </button>
                <button
                  type="button"
                  onClick={() => setHarassmentTarget("staff")}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    harassmentTarget === "staff"
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  Staff Misconduct
                </button>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Description *
              {complaintType === "food-poisoning" && (
                <span className="text-red-500">
                  {" "}
                  (Include symptoms and timeline)
                </span>
              )}
            </label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder={
                complaintType === "food-quality"
                  ? "Describe your experience with the food quality..."
                  : complaintType === "food-poisoning"
                  ? "Describe your symptoms, when they started, and any medical diagnosis..."
                  : "Describe the harassment incident in detail..."
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Proof Upload */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Upload Proof (Optional)
              {complaintType === "food-poisoning" && (
                <span className="text-red-500">
                  {" "}
                  - Medical reports recommended
                </span>
              )}
            </label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                  placeholder="Paste image URL or document link"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="px-6 py-3 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Add
                </button>
              </div>

              {proofImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {proofImages.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={img}
                        alt={`Proof ${idx + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {complaintType === "food-poisoning"
                ? "Upload photos of the food and medical reports/prescriptions"
                : "Upload photos or documents as evidence"}
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <FileText className="w-5 h-5" />
            Submit Complaint
          </button>
        </form>
      </div>

      {/* My Complaints */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-gray-900 mb-4">My Submitted Complaints</h3>

        {complaints.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No complaints submitted yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <div
                key={complaint.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-gray-900">
                        {getTypeLabel(complaint.type)}
                      </h4>
                      <span
                        className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(
                          complaint.status
                        )}`}
                      >
                        {complaint.status === "pending" && "Pending"}
                        {complaint.status === "under-review" && "Under Review"}
                        {complaint.status === "resolved" && "Resolved"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Submitted on{" "}
                      {complaint.submittedAt.toLocaleDateString("en-IN")} at{" "}
                      {complaint.submittedAt.toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {complaint.orderToken && (
                    <div className="bg-gray-100 px-3 py-1 rounded text-sm text-gray-700">
                      {complaint.orderToken}
                    </div>
                  )}
                </div>

                <p className="text-gray-700 text-sm mb-3">
                  {complaint.description}
                </p>

                {complaint.proofImages.length > 0 && (
                  <div className="flex gap-2 mb-3 overflow-x-auto">
                    {complaint.proofImages.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Proof ${idx + 1}`}
                        className="w-20 h-20 object-cover rounded border border-gray-200"
                      />
                    ))}
                  </div>
                )}

                {complaint.resolution && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                    <p className="text-xs text-green-700 mb-1">Resolution:</p>
                    <p className="text-sm text-green-800">
                      {complaint.resolution}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
