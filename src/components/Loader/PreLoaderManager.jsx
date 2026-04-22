"use client";

import { useState, useEffect } from "react";
import PreLoader from "./PreLoader";

export default function PreLoaderManager() {
  const [showPreloader, setShowPreloader] = useState(true);

  if (!showPreloader) return null;

  return <PreLoader onFinish={() => setShowPreloader(false)} />;
}
