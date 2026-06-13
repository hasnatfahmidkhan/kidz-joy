"use client";

import { useState } from "react";
import { deleteProduct } from "@/lib/db/adminProducts";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";

const AdminDeleteButton = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    const result = await deleteProduct(id);

    if (result.ok) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }
    setLoading(false);
    setOpen(false);
  };

  return (
    <>
      {/* ── Trigger ── */}
      <button
        onClick={() => setOpen(true)}
        className="btn btn-ghost btn-sm btn-circle border border-base-300 hover:border-error hover:text-error"
      >
        <FiTrash2 size={13} />
      </button>

      {/* ── Confirm Modal ── */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-base-100 rounded-3xl p-7 max-w-sm w-full shadow-2xl">
            {/* Icon */}
            <div className="w-14 h-14 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-4">
              <FiTrash2 size={26} className="text-error" />
            </div>

            <h3 className="font-black text-neutral text-xl text-center mb-2">
              Delete Product?
            </h3>
            <p className="text-neutral/60 text-sm text-center mb-6">
              This action cannot be undone. The product will be permanently
              removed from the store.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setOpen(false)}
                className="btn btn-outline border-base-300 flex-1 rounded-2xl"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="btn btn-error text-white flex-1 rounded-2xl"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDeleteButton;
