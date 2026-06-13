"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addProduct, updateProduct } from "@/lib/db/adminProducts";
import toast from "react-hot-toast";
import { FiSave, FiPlus, FiTrash2 } from "react-icons/fi";

const categories = [
  "educational",
  "flashcards",
  "puzzles",
  "costumes",
  "stem-toys",
];

const ProductForm = ({ product = null }) => {
  const router = useRouter();
  const isEditing = !!product;

  const [isLoading, setIsLoading] = useState(false);

  // ── QnA dynamic list ──
  const [qna, setQna] = useState(
    product?.qna || [{ question: "", answer: "" }],
  );

  // ── Info points dynamic list ──
  const [info, setInfo] = useState(product?.info || [""]);

  // ── QnA helpers ──
  const addQna = () =>
    setQna((prev) => [...prev, { question: "", answer: "" }]);

  const removeQna = (i) =>
    setQna((prev) => prev.filter((_, index) => index !== i));

  const updateQna = (i, field, value) =>
    setQna((prev) =>
      prev.map((item, index) =>
        index === i ? { ...item, [field]: value } : item,
      ),
    );

  // ── Info helpers ──
  const addInfo = () => setInfo((prev) => [...prev, ""]);
  const removeInfo = (i) =>
    setInfo((prev) => prev.filter((_, index) => index !== i));
  const updateInfo = (i, value) =>
    setInfo((prev) => prev.map((item, index) => (index === i ? value : item)));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target;
    const payload = {
      title: form.title.value,
      bangla: form.bangla.value,
      category: form.category.value,
      price: Number(form.price.value),
      discount: Number(form.discount.value || 0),
      description: form.description.value,
      image: form.image.value,
      featured: form.featured.checked,
      qna: qna.filter((q) => q.question && q.answer),
      info: info.filter((i) => i.trim() !== ""),
    };

    const result = isEditing
      ? await updateProduct(product._id, payload)
      : await addProduct(payload);

    if (result.ok) {
      toast.success(result.message);
      router.push("/admin/products");
    } else {
      toast.error(result.message);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ── Basic Info ── */}
      <div className="bg-base-100 border border-base-200 rounded-2xl p-6 space-y-4">
        <h2 className="font-black text-neutral text-base">Basic Info</h2>

        {/* Title */}
        <div className="form-control">
          <label className="label pb-1">
            <span className="label-text font-bold text-neutral/70 text-sm">
              Title (English) *
            </span>
          </label>
          <input
            type="text"
            name="title"
            defaultValue={product?.title || ""}
            placeholder="Product title in English"
            required
            className="input input-bordered w-full rounded-2xl focus:outline-none focus:border-primary"
          />
        </div>

        {/* Bangla Title */}
        <div className="form-control">
          <label className="label pb-1">
            <span className="label-text font-bold text-neutral/70 text-sm">
              Title (Bangla)
            </span>
          </label>
          <input
            type="text"
            name="bangla"
            defaultValue={product?.bangla || ""}
            placeholder="বাংলায় পণ্যের নাম"
            className="input input-bordered w-full rounded-2xl focus:outline-none focus:border-primary"
          />
        </div>

        {/* Category */}
        <div className="form-control">
          <label className="label pb-1">
            <span className="label-text font-bold text-neutral/70 text-sm">
              Category *
            </span>
          </label>
          <select
            name="category"
            defaultValue={product?.category || ""}
            required
            className="select select-bordered w-full rounded-2xl focus:outline-none focus:border-primary"
          >
            <option value="" disabled>
              Select category
            </option>
            {categories.map((c) => (
              <option key={c} value={c} className="capitalize">
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Image URL */}
        <div className="form-control">
          <label className="label pb-1">
            <span className="label-text font-bold text-neutral/70 text-sm">
              Image URL *
            </span>
          </label>
          <input
            type="url"
            name="image"
            defaultValue={product?.image || ""}
            placeholder="https://i.ibb.co/..."
            required
            className="input input-bordered w-full rounded-2xl focus:outline-none focus:border-primary"
          />
          <label className="label pt-1">
            <span className="label-text-alt text-neutral/40">
              Use imgBB or any image hosting service
            </span>
          </label>
        </div>
      </div>

      {/* ── Pricing ── */}
      <div className="bg-base-100 border border-base-200 rounded-2xl p-6 space-y-4">
        <h2 className="font-black text-neutral text-base">Pricing</h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Price */}
          <div className="form-control">
            <label className="label pb-1">
              <span className="label-text font-bold text-neutral/70 text-sm">
                Price (৳) *
              </span>
            </label>
            <input
              type="number"
              name="price"
              defaultValue={product?.price || ""}
              placeholder="1200"
              required
              min={0}
              className="input input-bordered w-full rounded-2xl focus:outline-none focus:border-primary"
            />
          </div>

          {/* Discount */}
          <div className="form-control">
            <label className="label pb-1">
              <span className="label-text font-bold text-neutral/70 text-sm">
                Discount (%)
              </span>
            </label>
            <input
              type="number"
              name="discount"
              defaultValue={product?.discount || 0}
              placeholder="10"
              min={0}
              max={100}
              className="input input-bordered w-full rounded-2xl focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Featured toggle */}
        <div className="flex items-center justify-between bg-base-200/50 border border-base-300 rounded-2xl px-5 py-4">
          <div>
            <p className="font-bold text-neutral text-sm">Featured Product</p>
            <p className="text-xs text-neutral/50 mt-0.5">
              Show on home page featured section
            </p>
          </div>
          <input
            type="checkbox"
            name="featured"
            defaultChecked={product?.featured || false}
            className="toggle toggle-primary"
          />
        </div>
      </div>

      {/* ── Description ── */}
      <div className="bg-base-100 border border-base-200 rounded-2xl p-6 space-y-4">
        <h2 className="font-black text-neutral text-base">Description</h2>
        <textarea
          name="description"
          defaultValue={product?.description || ""}
          rows={6}
          placeholder="Detailed product description..."
          className="textarea textarea-bordered w-full rounded-2xl focus:outline-none focus:border-primary resize-none"
        />
      </div>

      {/* ── Key Info Points ── */}
      <div className="bg-base-100 border border-base-200 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-black text-neutral text-base">Key Info Points</h2>
          <button
            type="button"
            onClick={addInfo}
            className="btn btn-ghost btn-sm gap-1 text-primary"
          >
            <FiPlus size={14} />
            Add
          </button>
        </div>
        <div className="space-y-3">
          {info.map((point, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={point}
                onChange={(e) => updateInfo(i, e.target.value)}
                placeholder={`Info point ${i + 1}`}
                className="input input-bordered flex-1 rounded-2xl focus:outline-none focus:border-primary text-sm"
              />
              {info.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeInfo(i)}
                  className="btn btn-ghost btn-sm btn-circle text-error"
                >
                  <FiTrash2 size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Q&A ── */}
      <div className="bg-base-100 border border-base-200 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-black text-neutral text-base">Q&amp;A</h2>
          <button
            type="button"
            onClick={addQna}
            className="btn btn-ghost btn-sm gap-1 text-primary"
          >
            <FiPlus size={14} />
            Add Q&amp;A
          </button>
        </div>
        <div className="space-y-4">
          {qna.map((item, i) => (
            <div
              key={i}
              className="space-y-2 p-4 bg-base-200/50 rounded-2xl border border-base-300"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral/50">
                  Q&amp;A #{i + 1}
                </span>
                {qna.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQna(i)}
                    className="btn btn-ghost btn-xs btn-circle text-error"
                  >
                    <FiTrash2 size={12} />
                  </button>
                )}
              </div>
              <input
                type="text"
                value={item.question}
                onChange={(e) => updateQna(i, "question", e.target.value)}
                placeholder="Question..."
                className="input input-bordered w-full rounded-xl text-sm focus:outline-none focus:border-primary"
              />
              <input
                type="text"
                value={item.answer}
                onChange={(e) => updateQna(i, "answer", e.target.value)}
                placeholder="Answer..."
                className="input input-bordered w-full rounded-xl text-sm focus:outline-none focus:border-primary"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Submit ── */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary w-full rounded-2xl h-14 font-black text-base gap-2"
      >
        {isLoading ? (
          <>
            <span className="loading loading-spinner loading-sm" />
            {isEditing ? "Updating..." : "Adding..."}
          </>
        ) : (
          <>
            <FiSave size={20} />
            {isEditing ? "Update Product" : "Add Product"}
          </>
        )}
      </button>
    </form>
  );
};

export default ProductForm;
