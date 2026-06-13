import Image from "next/image";
import Link from "next/link";
import {
  FiShield,
  FiHeart,
  FiAward,
  FiTruck,
  FiArrowRight,
} from "react-icons/fi";
import { GiBearFace, GiPuzzle, GiRocketFlight } from "react-icons/gi";
import { MdToys } from "react-icons/md";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Kidz Joy — our mission to bring safe, fun and educational toys to every child in Bangladesh.",
};

const values = [
  {
    icon: FiShield,
    title: "Safety First",
    desc: "Every toy in our store is carefully checked for safety certifications. No compromises when it comes to your child.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: FiHeart,
    title: "Made with Love",
    desc: "We handpick every product with care — choosing toys that spark joy, creativity and learning.",
    color: "bg-error/10 text-error",
  },
  {
    icon: FiAward,
    title: "Quality Guaranteed",
    desc: "We only stock toys that meet our strict quality standards. Durable, non-toxic and built to last.",
    color: "bg-warning/10 text-warning",
  },
  {
    icon: FiTruck,
    title: "Fast Delivery",
    desc: "We deliver across Bangladesh. Dhaka gets same-day or next-day delivery in most cases.",
    color: "bg-success/10 text-success",
  },
];

const stats = [
  { value: "500+", label: "Toys Available", icon: GiPuzzle },
  { value: "10K+", label: "Happy Kids", icon: GiBearFace },
  { value: "64", label: "Districts Served", icon: GiRocketFlight },
  { value: "4.8★", label: "Average Rating", icon: MdToys },
];

const team = [
  {
    name: "Rahim Uddin",
    role: "Founder & CEO",
    avatar: "R",
    color: "bg-primary/10 text-primary",
    bio: "Father of two. Started Kidz Joy after struggling to find quality, safe toys for his kids.",
  },
  {
    name: "Nusrat Jahan",
    role: "Head of Curation",
    avatar: "N",
    color: "bg-accent/10 text-accent",
    bio: "Child development specialist. Personally reviews every product before it goes live.",
  },
  {
    name: "Karim Hassan",
    role: "Operations Lead",
    avatar: "K",
    color: "bg-success/10 text-success",
    bio: "Ensures every order is packed safely and delivered on time, every time.",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ── Hero Section ── */}
      <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
        {/* Left Text */}
        <div className="flex-1">
          <p className="text-primary font-semibold text-sm mb-2">Our Story</p>
          <h1 className="text-4xl sm:text-5xl font-black text-neutral leading-tight mb-5">
            Where Every Child
            <span className="text-primary"> Deserves</span> to Play 🧸
          </h1>
          <p className="text-neutral/60 leading-relaxed mb-4">
            Kidz Joy was born out of a simple belief — every child deserves
            access to safe, high-quality, and imaginative toys that help them
            grow, learn, and most importantly, have fun.
          </p>
          <p className="text-neutral/60 leading-relaxed mb-8">
            Founded in 2023 in Dhaka, Bangladesh, we started as a small
            family-run store with a mission to bring the best educational and
            fun toys to parents across the country. Today, we serve thousands of
            happy families across all 64 districts.
          </p>
          <Link href="/shop" className="btn btn-primary rounded-2xl px-8 gap-2">
            Explore Our Toys
            <FiArrowRight size={17} />
          </Link>
        </div>

        {/* Right Visual */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-md">
            {/* Main card */}
            <div className="bg-linear-to-br from-primary to-secondary rounded-3xl p-10 flex flex-col items-center justify-center gap-4 shadow-2xl shadow-primary/20">
              <MdToys size={80} className="text-white/80" />
              <div className="text-center">
                <p className="text-white font-black text-3xl">Kidz Joy</p>
                <p className="text-white/70 text-sm mt-1">
                  Safe • Fun • Educational
                </p>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-base-100 border border-base-200 shadow-lg rounded-2xl px-4 py-3 text-center">
              <p className="font-black text-primary text-xl">10K+</p>
              <p className="text-xs text-neutral/50 font-semibold">
                Happy Kids
              </p>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-base-100 border border-base-200 shadow-lg rounded-2xl px-4 py-3 text-center">
              <p className="font-black text-success text-xl">4.8★</p>
              <p className="text-xs text-neutral/50 font-semibold">
                Avg Rating
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-20">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-base-100 border border-base-200 rounded-2xl p-6 text-center hover:shadow-md transition-all duration-200"
            >
              <Icon size={30} className="text-primary mx-auto mb-3" />
              <p className="font-black text-neutral text-2xl">{stat.value}</p>
              <p className="text-neutral/50 text-xs font-semibold mt-1">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* ── Our Values ── */}
      <div className="mb-20">
        <div className="text-center mb-10">
          <p className="text-primary font-semibold text-sm mb-2">
            What We Stand For
          </p>
          <h2 className="text-3xl font-black text-neutral">Our Values</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="bg-base-100 border border-base-200 rounded-2xl p-6 hover:shadow-md transition-all duration-200"
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${value.color} flex items-center justify-center mb-4`}
                >
                  <Icon size={22} />
                </div>
                <h3 className="font-black text-neutral mb-2">{value.title}</h3>
                <p className="text-neutral/60 text-sm leading-relaxed">
                  {value.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Our Story ── */}
      <div className="mb-20">
        <div className="bg-linear-to-br from-primary/5 to-accent/5 border border-primary/10 rounded-3xl p-8 sm:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary font-semibold text-sm mb-2">
              How It Started
            </p>
            <h2 className="text-3xl font-black text-neutral mb-6">
              A Father&apos;s Mission 💛
            </h2>
            <div className="space-y-4 text-neutral/70 leading-relaxed text-left sm:text-center">
              <p>
                It started with a problem every Bangladeshi parent knows too
                well — finding toys that are actually safe, educational, and fun
                for your kids. Most options were either cheap plastic imports
                with no safety certifications, or expensive imported brands out
                of reach for the average family.
              </p>
              <p>
                Our founder Rahim Uddin, a father of two, decided to change
                that. Starting from a small room in Mirpur, Dhaka, he began
                carefully sourcing and testing toys — rejecting anything that
                didn&apos;t meet his personal standard as a parent.
              </p>
              <p>
                Word spread. Parents trusted us because we genuinely cared.
                Today, Kidz Joy delivers to every corner of Bangladesh, but our
                promise remains the same —{" "}
                <strong className="text-primary">
                  every toy we sell, we&apos;d be happy to give to our own kids.
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Team ── */}
      <div className="mb-20">
        <div className="text-center mb-10">
          <p className="text-primary font-semibold text-sm mb-2">
            The People Behind Kidz Joy
          </p>
          <h2 className="text-3xl font-black text-neutral">Meet the Team</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-base-100 border border-base-200 rounded-2xl p-6 text-center hover:shadow-md transition-all duration-200"
            >
              <div
                className={`w-16 h-16 rounded-full ${member.color} flex items-center justify-center mx-auto mb-4 font-black text-2xl`}
              >
                {member.avatar}
              </div>
              <h3 className="font-black text-neutral text-lg">{member.name}</h3>
              <p className="text-primary text-sm font-bold mb-3">
                {member.role}
              </p>
              <p className="text-neutral/60 text-sm leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="bg-linear-to-r from-primary to-secondary rounded-3xl p-8 sm:p-12 text-center text-white">
        <h2 className="text-3xl font-black mb-3">
          Ready to Make Your Child Smile? 🎉
        </h2>
        <p className="text-white/80 mb-6 max-w-md mx-auto">
          Browse our full collection of safe, fun and educational toys for
          children aged 3–12.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/shop"
            className="btn bg-white text-primary hover:bg-white/90 border-none font-bold rounded-2xl px-8 gap-2 w-full sm:w-auto"
          >
            <GiBearFace size={18} />
            Shop Now
          </Link>
          <Link
            href="/contact"
            className="btn btn-ghost border border-white/30 text-white hover:bg-white/15 rounded-2xl px-8 w-full sm:w-auto"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
