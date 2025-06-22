import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheckCircle, faReply } from "@fortawesome/free-solid-svg-icons";

export default function ComplaintActionModal({
  isOpen,
  onClose,
  onReply,
  onResolve,
  complaint,
}) {
  const [reply, setReply] = useState("");
  const [isResolved, setIsResolved] = useState(complaint?.status === "Resolved");
  const [resolutionComment, setResolutionComment] = useState("");

  if (!isOpen || !complaint) return null;

  const handleReply = () => {
    if (onReply) onReply(reply);
    setReply("");
  };

  const handleResolve = () => {
    setIsResolved(true);
    if (onResolve) onResolve(resolutionComment);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FontAwesomeIcon icon={faReply} className="text-blue-500" />
            Gérer la réclamation
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Répondre</label>
          <textarea
            className="w-full border rounded-lg p-2 text-gray-700 focus:outline-blue-500"
            rows={3}
            value={reply}
            onChange={e => setReply(e.target.value)}
            placeholder="Écrivez votre réponse ici..."
            disabled={isResolved}
          />
          <button
            onClick={handleReply}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            disabled={!reply || isResolved}
          >
            Envoyer la réponse
          </button>
        </div>

        <div className="mb-4">
          <button
            onClick={handleResolve}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${isResolved ? 'bg-green-400 text-white' : 'bg-green-600 text-white hover:bg-green-700'} transition-colors`}
            disabled={isResolved}
          >
            <FontAwesomeIcon icon={faCheckCircle} />
            {isResolved ? 'Réclamation résolue' : 'Marquer comme résolue'}
          </button>
        </div>

        {isResolved && (
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
        )}
      </motion.div>
    </motion.div>
  );
} 