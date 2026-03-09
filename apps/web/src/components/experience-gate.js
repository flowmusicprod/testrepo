"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "dejeri_experience_entered";

export function ExperienceGate() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasEntered = window.localStorage.getItem(STORAGE_KEY) === "true";
    setOpen(!hasEntered);
  }, []);

  function enterExperience() {
    window.localStorage.setItem(STORAGE_KEY, "true");
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="experience-gate"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55 } }}
        >
          <motion.div
            className="experience-panel"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
          >
            <p className="eyebrow">DE&apos;JERI Experience</p>
            <h1 className="gate-title">Enter the world of DE&apos;JERI</h1>
            <p>
              A cinematic storefront inspired by motion-led digital experiences. Designed for drops,
              storytelling, and culture.
            </p>
            <div className="cta-row">
              <button className="btn primary" type="button" onClick={enterExperience}>
                Enter Experience
              </button>
              <button className="btn" type="button" onClick={enterExperience}>
                Enter Without Audio
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

