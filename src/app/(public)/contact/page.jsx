import ContactForm from "@/components/contact/ContactForm";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiMessageSquare,
} from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Kidz Joy. We're here to help with orders, products, delivery and anything else.",
};

const contactInfo = [
  {
    icon: FiMail,
    label: "Email Us",
    value: "hello@kidzjoy.com",
    sub: "We reply within 24 hours",
    color: "bg-primary/10 text-primary",
    href: "mailto:hello@kidzjoy.com",
  },
  {
    icon: FiPhone,
    label: "Call Us",
    value: "+880 1234-567890",
    sub: "Sat–Thu, 9am–8pm",
    color: "bg-success/10 text-success",
    href: "tel:+8801234567890",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: "+880 1234-567890",
    sub: "Quick replies on WhatsApp",
    color: "bg-[#25D366]/10 text-[#25D366]",
    href: "https://wa.me/8801234567890",
  },
  {
    icon: FiMapPin,
    label: "Our Location",
    value: "Mirpur-10, Dhaka",
    sub: "Bangladesh",
    color: "bg-error/10 text-error",
    href: "https://maps.google.com",
  },
];

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Dhaka deliveries take 1–2 business days. Outside Dhaka takes 2–4 business days.",
  },
  {
    q: "What is your return policy?",
    a: "We offer a 7-day return policy. Products must be unused and in original packaging.",
  },
  {
    q: "Are your toys safety certified?",
    a: "Yes! Every toy we sell passes our safety check. We only stock non-toxic, child-safe products.",
  },
  {
    q: "Can I change my order after placing it?",
    a: "Contact us within 2 hours of placing the order. After that, it may already be in processing.",
  },
];

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ── Header ── */}
      <div className="text-center mb-12">
        <p className="text-primary font-semibold text-sm mb-2">Get In Touch</p>
        <h1 className="text-4xl font-black text-neutral mb-3">
          We&apos;re Here to Help 💬
        </h1>
        <p className="text-neutral/60 max-w-md mx-auto leading-relaxed">
          Have a question about an order, product or delivery? Our friendly team
          is ready to help!
        </p>
      </div>

      {/* ── Contact Info Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {contactInfo.map((info) => {
          const Icon = info.icon;
          return (
            <a
              key={info.label}
              href={info.href}
              target={info.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group bg-base-100 border border-base-200 rounded-2xl p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col gap-3"
            >
              <div
                className={`w-12 h-12 rounded-2xl ${info.color} flex items-center justify-center`}
              >
                <Icon size={22} />
              </div>
              <div>
                <p className="text-xs font-black text-neutral/40 uppercase tracking-widest mb-0.5">
                  {info.label}
                </p>
                <p className="font-bold text-neutral text-sm group-hover:text-primary transition-colors">
                  {info.value}
                </p>
                <p className="text-xs text-neutral/50 mt-0.5">{info.sub}</p>
              </div>
            </a>
          );
        })}
      </div>

      {/* ── Main Section: Form + Info ── */}
      <div className="flex flex-col lg:flex-row gap-10 mb-16">
        {/* ── LEFT: Contact Form ── */}
        <div className="flex-1">
          <div className="bg-base-100 border border-base-200 rounded-2xl p-6 sm:p-8">
            <h2 className="font-black text-neutral text-xl mb-1 flex items-center gap-2">
              <FiMessageSquare className="text-primary" />
              Send us a Message
            </h2>
            <p className="text-neutral/50 text-sm mb-6">
              Fill out the form below and we&apos;ll get back to you ASAP.
            </p>
            <ContactForm />
          </div>
        </div>

        {/* ── RIGHT: Hours + Social ── */}
        <div className="w-full lg:w-80 shrink-0 space-y-5">
          {/* Business Hours */}
          <div className="bg-base-100 border border-base-200 rounded-2xl p-6 space-y-4">
            <h3 className="font-black text-neutral flex items-center gap-2">
              <FiClock size={18} className="text-primary" />
              Business Hours
            </h3>
            <div className="space-y-3 text-sm">
              {[
                { day: "Saturday – Thursday", time: "9:00 AM – 8:00 PM" },
                { day: "Friday", time: "2:00 PM – 8:00 PM" },
              ].map((hour) => (
                <div key={hour.day} className="flex justify-between">
                  <span className="text-neutral/60 font-medium">
                    {hour.day}
                  </span>
                  <span className="font-bold text-neutral">{hour.time}</span>
                </div>
              ))}
            </div>
            <div className="bg-success/10 text-success text-xs font-bold px-3 py-2 rounded-xl">
              ✅ We&apos;re currently open!
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-base-100 border border-base-200 rounded-2xl p-6 space-y-4">
            <h3 className="font-black text-neutral">Follow Us</h3>
            <p className="text-neutral/50 text-sm">
              Stay updated on new arrivals and exclusive deals.
            </p>
            <div className="space-y-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-2xl border border-base-200 hover:border-primary hover:bg-primary/5 transition-all duration-150 group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#1877F2]/10 flex items-center justify-center">
                  <FaFacebookF size={16} className="text-[#1877F2]" />
                </div>
                <span className="font-bold text-sm text-neutral group-hover:text-primary">
                  Facebook Page
                </span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-2xl border border-base-200 hover:border-pink-400 hover:bg-pink-50 transition-all duration-150 group"
              >
                <div className="w-9 h-9 rounded-xl bg-pink-50 flex items-center justify-center">
                  <FaInstagram size={16} className="text-pink-500" />
                </div>
                <span className="font-bold text-sm text-neutral group-hover:text-pink-500">
                  Instagram
                </span>
              </a>
              <a
                href="https://wa.me/8801234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-2xl border border-base-200 hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all duration-150 group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#25D366]/10 flex items-center justify-center">
                  <FaWhatsapp size={16} className="text-[#25D366]" />
                </div>
                <span className="font-bold text-sm text-neutral group-hover:text-[#25D366]">
                  WhatsApp Chat
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── FAQ Section ── */}
      <div>
        <div className="text-center mb-8">
          <p className="text-primary font-semibold text-sm mb-2">
            Quick Answers
          </p>
          <h2 className="text-3xl font-black text-neutral">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-base-100 border border-base-200 rounded-2xl p-5 hover:shadow-sm transition-all duration-200"
            >
              <p className="font-black text-neutral text-sm mb-2">Q: {faq.q}</p>
              <p className="text-neutral/60 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-neutral/50 mt-6">
          Still have questions?{" "}
          <a
            href="mailto:hello@kidzjoy.com"
            className="font-bold text-primary hover:underline"
          >
            Email us directly →
          </a>
        </p>
      </div>
    </div>
  );
}
