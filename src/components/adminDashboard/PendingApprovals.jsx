import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import api from "../../utils/api"; // Import the API instance

const PendingApprovals = ({ pendingEvents, onEventApproved, onEventRejected }) => {
  const [loadingApproval, setLoadingApproval] = useState(null);
  const [errorApproval, setErrorApproval] = useState(null);
  const [loadingReject, setLoadingReject] = useState(null);
  const [errorReject, setErrorReject] = useState(null);

  const getAuthHeader = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.token : null;

    if (!token) {
      throw new Error("User not authenticated");
    }
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const handleApprove = async (eventId) => {
    setLoadingApproval(eventId); // Set ID
    setErrorApproval(null);
    try {
      const config = getAuthHeader();
      await api.put(`/events/${eventId}/approve`, {}, config);
      if (onEventApproved) {
        onEventApproved();
      }
    } catch (err) {
      setErrorApproval(err.response && err.response.data.message ? err.response.data.message : err.message);
    } finally {
      setLoadingApproval(null); // Clear ID
    }
  };

  const handleReject = async (eventId) => {
    setLoadingReject(eventId); // Set ID
    setErrorReject(null);
    try {
      const config = getAuthHeader();
      await api.delete(`/events/${eventId}`, config); // <-- FIX: Changed to api.delete
      if (onEventRejected) {
        onEventRejected();
      }
    } catch (err) {
      setErrorReject(err.response && err.response.data.message ? err.response.data.message : err.message);
    } finally {
      setLoadingReject(null); // Clear ID
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-[#1e293b] p-6 rounded-xl shadow-lg"
    >
      {/* Header */}
      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="text-lg font-semibold text-white mb-4"
      >
        Pending Approvals
      </motion.h3>

      {/* Error messages */}
      {errorApproval && <p className="text-red-500 text-sm mb-2">Approval Error: {errorApproval}</p>}
      {errorReject && <p className="text-red-500 text-sm mb-2">Rejection Error: {errorReject}</p>}

      {/* List */}
      <div className="space-y-4">
        {pendingEvents.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-400"
          >
            No pending events for approval.
          </motion.p>
        ) : (
          pendingEvents.map((event, index) => (
            <motion.div
              key={event._id} // Use event._id from backend
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex justify-between items-center bg-[#111827] px-4 py-3 rounded-lg shadow-md border border-gray-700 hover:border-purple-500 transition"
            >
              {/* Left Side: Event Details */}
              <div>
                <p className="text-white font-semibold">{event.title}</p>
                <p className="text-gray-400 text-sm">Organizer: {event.organizer?.name || 'Unknown'}</p>
                <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-yellow-500/20 text-yellow-400 rounded-full">
                  Pending
                </span>
              </div>

              {/* Right Side: Actions */}
              <div className="flex gap-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  onClick={() => handleApprove(event._id)}
                  disabled={!!loadingApproval || !!loadingReject} // Disable if any operation is in progress
                  className="flex items-center gap-1 px-3 py-1 rounded-lg bg-green-600 hover:bg-green-500 transition text-white disabled:opacity-50"
                >
                  {loadingApproval === event._id ? (
                    "Approving..."
                  ) : (
                    <>
                      <CheckCircle size={16} /> Approve
                    </>
                  )}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  onClick={() => handleReject(event._id)}
                  disabled={!!loadingApproval || !!loadingReject} // Disable if any operation is in progress
                  className="flex items-center gap-1 px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 transition text-white disabled:opacity-50"
                >
                  {loadingReject === event._id ? (
                    "Rejecting..."
                  ) : (
                    <>
                      <XCircle size={16} /> Reject
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default PendingApprovals;
