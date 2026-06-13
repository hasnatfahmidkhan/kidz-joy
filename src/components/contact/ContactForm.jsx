"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiMessageSquare, FiSend } from "react-icons/fi";

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target;
    const payload = {
      name: form.name.value,
      email: form.email.value,
      subject: form.subject.value,
      message: form.message.value,
    };

    // ── TODO: wire up to server action / email service later ──
    await new Promise((r) => setTimeout(r, 1000));

    toast.success("Message sent! We'll reply within 24 hours.");
    form.reset();
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div className="form-control">
        <label className="label pb-1">
          <span className="label-text font-bold text-neutral/70 text-sm">
            Full Name *
          </span>
        </label>
        <div className="relative">
          <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/40" />
          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
            className="input input-bordered w-full pl-11 rounded-2xl focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Email */}
      <div className="form-control">
        <label className="label pb-1">
          <span className="label-text font-bold text-neutral/70 text-sm">
            Email Address *
          </span>
        </label>
        <div className="relative">
          <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/40" />
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            required
            className="input input-bordered w-full pl-11 rounded-2xl focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Subject */}
      <div className="form-control">
        <label className="label pb-1">
          <span className="label-text font-bold text-neutral/70 text-sm">
            Subject *
          </span>
        </label>
        <select
          name="subject"
          required
          defaultValue=""
          className="select select-bordered w-full rounded-2xl focus:outline-none focus:border-primary"
        >
          <option value="" disabled>
            Select a subject
          </option>
          <option value="order">Order Issue</option>
          <option value="product">Product Question</option>
          <option value="delivery">Delivery Query</option>
          <option value="return">Return & Refund</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Message */}
      <div className="form-control">
        <label className="label pb-1">
          <span className="label-text font-bold text-neutral/70 text-sm">
            Message *
          </span>
        </label>
        <div className="relative">
          <FiMessageSquare className="absolute left-4 top-4 text-neutral/40" />
          <textarea
            name="message"
            placeholder="Tell us how we can help..."
            rows={5}
            required
            className="textarea textarea-bordered w-full pl-11 rounded-2xl focus:outline-none focus:border-primary resize-none"
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary w-full rounded-2xl h-12 font-black gap-2"
      >
        {isLoading ? (
          <>
            <span className="loading loading-spinner loading-sm" />
            Sending...
          </>
        ) : (
          <>
            <FiSend size={17} />
            Send Message
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
