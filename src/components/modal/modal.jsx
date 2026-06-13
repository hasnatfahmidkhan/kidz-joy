"use client";

import { FiX } from "react-icons/fi";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* modal box */}
      <div className="relative z-10 w-full max-w-md bg-base-100 rounded-2xl p-6 shadow-xl">
        {/* header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
            <FiX />
          </button>
        </div>

        {/* content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
