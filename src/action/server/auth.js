"use server";

import { collections, dbConnect } from "@/lib/db/dbConnect";
import bcrypt from "bcryptjs";

const isValidEmail = (email) => {
  // simple email check (you can replace with zod later)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const postUser = async (payload) => {
  try {
    const name = (payload?.name || "").trim();
    const email = (payload?.email || "").trim().toLowerCase();
    const password = payload?.password || "";

    // 1) Validate payload
    if (!name || name.length < 2) {
      return { ok: false, message: "Name must be at least 2 characters." };
    }

    if (!email || !isValidEmail(email)) {
      return { ok: false, message: "Please provide a valid email address." };
    }

    if (!password || password.length < 6) {
      return { ok: false, message: "Password must be at least 6 characters." };
    }

    const usersCol = await dbConnect(collections.USERS);

    // 2) Check existing user
    const existing = await usersCol.findOne({ email });
    if (existing) {
      return { ok: false, message: "This email is already registered." };
    }

    // 3) Create user document (only allowlisted fields)
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      provider: "credentials",
      image: "",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // 4) Insert
    const result = await usersCol.insertOne(newUser);

    if (!result.acknowledged) {
      return { ok: false, message: "Failed to create user. Try again." };
    }

    // ✅ return only serializable data
    return {
      ok: true,
      message: "Account created successfully.",
      userId: result.insertedId.toString(),
    };
  } catch (err) {
    // 5) Duplicate key safety (if you add unique index on email)
    if (err?.code === 11000) {
      return { ok: false, message: "This email is already registered." };
    }

    console.error("postUser error:", err);
    return { ok: false, message: "Something went wrong. Please try again." };
  }
};

export const loginUser = async (payload) => {
  try {
    const email = (payload?.email || "").trim().toLowerCase();
    const password = payload?.password || "";

    if (!email || !password) return null;

    const usersCol = await dbConnect(collections.USERS);

    const user = await usersCol.findOne({ email, provider: "credentials" });
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    // ✅ Return only safe fields (NO password)
    return {
      id: user._id.toString(), // NextAuth needs `id`
      name: user.name || "",
      email: user.email,
      image: user.image || "",
      role: user.role || "user",
    };
  } catch (err) {
    console.error("loginUser error:", err);
    return null;
  }
};
