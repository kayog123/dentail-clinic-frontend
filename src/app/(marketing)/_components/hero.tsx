"use client";

import { motion } from "framer-motion";
import HeroBannerLeft from "./hero-banner/hero-banner-left";
import HeroBannerRight from "./hero-banner/hero-banner-right";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mx-auto max-w-7xl px-4 pt-14 md:pt-20 pb-14"
      data-oid="qjk_e.q"
    >
      <div
        className="grid md:grid-cols-2 gap-10 items-center"
        data-oid="s2siifb"
      >
        <HeroBannerLeft
          //titleHeader="Gentle, modern care for all ages"
          title="Your family's smile, our priority."
          desc="Comprehensive dentistry in a calm, caring setting. Accepting new patients. Most insurances welcome."
        />
        <HeroBannerRight />
      </div>
    </motion.section>
  );
}
