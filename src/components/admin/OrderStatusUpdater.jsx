"use client";

import { useState } from "react";
import { updateOrderStatus } from "@/action/server/updateOrderStatus";
import { FiSave, FiLoader } from "react-icons/fi";

const statusOptions = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export default function OrderStatusUpdater({ orderId, initialStatus }) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const handleUpdateStatus = async () => {
    if (status === initialStatus) {
      setMessage("No changes made.");
      setMessageType("info");
      return;
    }

    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const result = await updateOrderStatus(orderId, status);

      if (result.ok) {
        setMessage(result.message);
        setMessageType("success");
        // Update the initial status after successful update
        // so user can make another change if needed
      } else {
        setMessage(result.message);
        setMessageType("error");
        // Revert status on error
        setStatus(initialStatus);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setMessage("Failed to update status.");
      setMessageType("error");
      setStatus(initialStatus);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        disabled={loading}
        className="select select-bordered w-full text-sm font-bold disabled:opacity-50"
      >
        {statusOptions.map((s) => (
          <option key={s} value={s} className="capitalize">
            {s}
          </option>
        ))}
      </select>

      <button
        onClick={handleUpdateStatus}
        disabled={loading}
        className="btn btn-primary w-full rounded-2xl gap-2 disabled:opacity-50"
      >
        {loading ? (
          <>
            <FiLoader size={16} className="animate-spin" />
            Updating...
          </>
        ) : (
          <>
            <FiSave size={16} />
            Update Status
          </>
        )}
      </button>

      {message && (
        <div
          className={`alert rounded-2xl text-sm ${
            messageType === "success"
              ? "alert-success"
              : messageType === "error"
                ? "alert-error"
                : "alert-info"
          }`}
        >
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}
