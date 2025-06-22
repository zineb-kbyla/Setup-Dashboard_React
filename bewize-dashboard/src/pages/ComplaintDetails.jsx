import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import PageTitle from "../components/PageTitle";
import { faBox, faCheckCircle, faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";

// Mock data for demonstration
const mockComplaint = {
  id: 1,
  userName: "John Doe",
  userEmail: "john@example.com",
  userAvatar: require("../images/Avatars/Avatar1.png"),
  type: "Technical",
  status: "Resolved",
  originalMessage: "I have an issue with the app crashing.",
  reply: "Thank you for your feedback. We are looking into it.",
  resolutionComment: "Bug fixed in version 1.2.3.",
};

export default function ComplaintDetails() {
  // In a real app, get complaint from location.state or fetch by ID
  const location = useLocation();
  const complaint = location.state?.complaint || mockComplaint;

  const [reply, setReply] = useState(complaint.reply || "");
  const [isResolved, setIsResolved] = useState(complaint.status === "Resolved");
  const [resolutionComment, setResolutionComment] = useState(complaint.resolutionComment || "");
  const [status, setStatus] = useState(complaint.status);

  const handleReply = () => {
    // Implement reply logic here
    alert(`Réponse envoyée: ${reply}`);
  };

  const handleResolve = () => {
    setIsResolved(true);
    setStatus("Resolved");
    // Implement resolve logic here
    alert(`Réclamation marquée comme résolue. Commentaire: ${resolutionComment}`);
  };

  return (
    <DashboardLayout>
      <PageTitle title={`Détail de la réclamation`} icon={faBox} />
      <div className="w-full bg-white rounded-xl shadow-sm p-6 border border-gray-100 relative">
        {/* Status badge in absolute top center */}
        <div className="absolute left-1/2 -translate-x-1/2 top-4 z-10">
          <span className={`inline-block px-4 py-2 text-sm font-semibold rounded-full shadow ${
            status === 'Open' ? 'bg-yellow-100 text-yellow-800' :
            status === 'Resolved' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {status}
          </span>
        </div>
        {/* User info in top left */}
        <div className="flex items-center gap-4 mb-8">
          <img
            className="rounded-full w-14 h-14 object-cover border-2 border-gray-100"
            src={complaint.userAvatar}
            alt={complaint.userName + " avatar"}
          />
          <div>
            <h2 className="font-semibold text-lg text-gray-900">{complaint.userName}</h2>
            <p className="text-gray-600 text-sm">{complaint.userEmail}</p>
          </div>
        </div>
        {/* Checkpoint button in top right */}
        <div className="absolute top-6 right-6">
          {isResolved ? (
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow font-semibold">
              <FontAwesomeIcon icon={faCheckCircle} /> Réclamation résolue
            </span>
          ) : (
            <button
              onClick={handleResolve}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 shadow font-semibold transition-colors"
            >
              <FontAwesomeIcon icon={faCheckCircle} /> Marquer comme résolue
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Original Message */}
          <div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Type de réclamation</label>
              <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-800 font-medium">{complaint.type}</div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Message original</label>
              <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-800">{complaint.originalMessage}</div>
            </div>
          </div>
          {/* Right: Response and Resolution */}
          <div>
            {isResolved ? (
              <>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Réponse envoyée</label>
                  <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-800 border border-gray-200 text-sm min-h-[48px]">
                    {reply || <span className="text-gray-400">Aucune réponse envoyée.</span>}
                  </div>
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Commentaire de résolution</label>
                  <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-800 border border-gray-200 text-sm min-h-[48px]">
                    {resolutionComment || <span className="text-gray-400">Aucun commentaire de résolution.</span>}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Répondre</label>
                  <textarea
                    className="w-full border rounded-lg p-2 text-gray-700 focus:outline-blue-500"
                    rows={3}
                    value={reply}
                    onChange={e => setReply(e.target.value)}
                    placeholder="Écrivez votre réponse ici..."
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Commentaire de résolution</label>
                  <textarea
                    className="w-full border rounded-lg p-2 text-gray-700 focus:outline-blue-500"
                    rows={2}
                    value={resolutionComment}
                    onChange={e => setResolutionComment(e.target.value)}
                    placeholder="Ajoutez un commentaire de résolution..."
                  />
                </div>
                <button
                  onClick={handleReply}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full"
                  disabled={!reply}
                >
                  <FontAwesomeIcon icon={faReply} className="mr-2" />Envoyer la réponse
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 