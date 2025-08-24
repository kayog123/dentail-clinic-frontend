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
      className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-8 sm:pb-12 md:pb-16"
      data-oid="qjk_e.q"
    >
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center"
        data-oid="s2siifb"
      >
        <HeroBannerLeft
          titleHeader="Gentle, modern care for all ages"
          title="Expert dental care for your entire family"
          desc="Experience comfortable, comprehensive dentistry in a welcoming environment. Our team combines advanced technology with gentle care to ensure your smile stays healthy and beautiful."
        />
        <HeroBannerRight />
      </div>
    </motion.section>
  );
}
