import { useState } from "react";
import { Complaint } from "../../types";
import {
  AlertTriangle,
  MessageSquare,
  CheckCircle,
  Clock,
  Eye,
  X,
} from "lucide-react";

interface ComplaintsManagerProps {
  complaints: Complaint[];
  onUpdateComplaint: (id: string, updates: Partial<Complaint>) => void;
}

export function ComplaintsManager({
  complaints,
  onUpdateComplaint,
}: ComplaintsManagerProps) {
  const [filterStatus, setFilterStatus] = useState<"all" | Complaint["status"]>(
    "all"
  );
  const [filterType, setFilterType] = useState<"all" | Complaint["type"]>(
    "all"
  );
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(
    null
  );
  const [resolution, setResolution] = useState("");

  const filteredComplaints = complaints.filter((c) => {
    const statusMatch = filterStatus === "all" || c.status === filterStatus;
    const typeMatch = filterType === "all" || c.type === filterType;
    return statusMatch && typeMatch;
  });

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
        return "Food Quality";
      case "food-poisoning":
        return "Food Poisoning";
      case "harassment":
        return "Harassment";
    }
  };

  const getTypeColor = (type: Complaint["type"]) => {
    switch (type) {
      case "food-quality":
        return "text-orange-600";
      case "food-poisoning":
        return "text-red-600";
      case "harassment":
        return "text-purple-600";
    }
  };

  const handleUpdateStatus = (id: string, status: Complaint["status"]) => {
    onUpdateComplaint(id, { status });
  };

  const handleResolve = () => {
    if (selectedComplaint && resolution.trim()) {
      onUpdateComplaint(selectedComplaint.id, {
        status: "resolved",
        resolution: resolution.trim(),
        resolvedAt: new Date(),
      });
      setSelectedComplaint(null);
      setResolution("");
    }
  };

  const pendingCount = complaints.filter((c) => c.status === "pending").length;
  const urgentCount = complaints.filter(
    (c) => c.type === "food-poisoning" && c.status !== "resolved"
  ).length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-700">Pending Review</p>
              <p className="text-2xl text-yellow-900 mt-1">{pendingCount}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-700">Urgent (Food Poisoning)</p>
              <p className="text-2xl text-red-900 mt-1">{urgentCount}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700">Resolved</p>
              <p className="text-2xl text-green-900 mt-1">
                {complaints.filter((c) => c.status === "resolved").length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="under-review">Under Review</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Filter by Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="food-quality">Food Quality</option>
              <option value="food-poisoning">Food Poisoning</option>
              <option value="harassment">Harassment</option>
            </select>
          </div>
        </div>
      </div>

      {/* Complaints List */}
      <div className="space-y-4">
        {filteredComplaints.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <MessageSquare className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No complaints found</p>
          </div>
        ) : (
          filteredComplaints.map((complaint) => (
            <div
              key={complaint.id}
              className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3
                          className={`text-lg ${getTypeColor(complaint.type)}`}
                        >
                          {getTypeLabel(complaint.type)}
                        </h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(
                            complaint.status
                          )}`}
                        >
                          {complaint.status === "pending" && "Pending"}
                          {complaint.status === "under-review" &&
                            "Under Review"}
                          {complaint.status === "resolved" && "Resolved"}
                        </span>
                        {complaint.type === "food-poisoning" && (
                          <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                            URGENT
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        By{" "}
                        <span className="font-medium">
                          {complaint.studentName}
                        </span>
                        {complaint.orderToken &&
                          ` • Token: ${complaint.orderToken}`}
                      </p>
                      <p className="text-xs text-gray-500">
                        Submitted on{" "}
                        {complaint.submittedAt.toLocaleDateString("en-IN")} at{" "}
                        {complaint.submittedAt.toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedComplaint(complaint)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>

                  {complaint.status === "pending" && (
                    <button
                      onClick={() =>
                        handleUpdateStatus(complaint.id, "under-review")
                      }
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                    >
                      Start Review
                    </button>
                  )}

                  {complaint.status === "under-review" && (
                    <button
                      onClick={() => {
                        setSelectedComplaint(complaint);
                        setResolution("");
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                    >
                      Resolve
                    </button>
                  )}
                </div>
              </div>

              <p className="text-gray-700 mb-4">{complaint.description}</p>

              {complaint.harassmentTarget && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-purple-800">
                    Harassment by:{" "}
                    <span className="font-medium capitalize">
                      {complaint.harassmentTarget}
                    </span>
                  </p>
                </div>
              )}

              {complaint.proofImages.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Attached Proof ({complaint.proofImages.length}):
                  </p>
                  <div className="flex gap-2 overflow-x-auto">
                    {complaint.proofImages.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Proof ${idx + 1}`}
                        className="w-24 h-24 object-cover rounded border border-gray-200 cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => window.open(img, "_blank")}
                      />
                    ))}
                  </div>
                </div>
              )}

              {complaint.resolution && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-green-700 mb-1">Resolution:</p>
                      <p className="text-sm text-green-800">
                        {complaint.resolution}
                      </p>
                      {complaint.resolvedAt && (
                        <p className="text-xs text-green-600 mt-1">
                          Resolved on{" "}
                          {complaint.resolvedAt.toLocaleDateString("en-IN")}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* View/Resolve Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
              <h3 className="text-xl text-gray-900">Complaint Details</h3>
              <button
                onClick={() => {
                  setSelectedComplaint(null);
                  setResolution("");
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p
                    className={`text-lg ${getTypeColor(
                      selectedComplaint.type
                    )}`}
                  >
                    {getTypeLabel(selectedComplaint.type)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full border text-sm ${getStatusColor(
                      selectedComplaint.status
                    )}`}
                  >
                    {selectedComplaint.status}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Student Name</p>
                <p className="text-gray-900">{selectedComplaint.studentName}</p>
              </div>

              {selectedComplaint.orderToken && (
                <div>
                  <p className="text-sm text-gray-500">Order Token</p>
                  <p className="text-gray-900 font-mono">
                    {selectedComplaint.orderToken}
                  </p>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="text-gray-900">{selectedComplaint.description}</p>
              </div>

              {selectedComplaint.proofImages.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Proof Images</p>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedComplaint.proofImages.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Proof ${idx + 1}`}
                        className="w-full h-40 object-cover rounded border cursor-pointer"
                        onClick={() => window.open(img, "_blank")}
                      />
                    ))}
                  </div>
                </div>
              )}

              {selectedComplaint.status === "under-review" &&
                !selectedComplaint.resolution && (
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Add Resolution
                    </label>
                    <textarea
                      value={resolution}
                      onChange={(e) => setResolution(e.target.value)}
                      rows={4}
                      placeholder="Describe how this complaint was resolved..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleResolve}
                      disabled={!resolution.trim()}
                      className="mt-3 w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Mark as Resolved
                    </button>
                  </div>
                )}

              {selectedComplaint.resolution && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-700 mb-1">Resolution:</p>
                  <p className="text-green-800">
                    {selectedComplaint.resolution}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
