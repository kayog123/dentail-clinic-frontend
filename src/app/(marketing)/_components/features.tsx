"use client";

import { motion } from "framer-motion";
import {
  LucideClock,
  LucideShield,
  LucideUsers,
  LucideHeart,
  LucideZap,
  LucideAward,
} from "lucide-react";

const features = [
  {
    icon: LucideClock,
    title: "Flexible Scheduling",
    description:
      "Early morning, evening, and weekend appointments available to fit your busy lifestyle.",
  },
  {
    icon: LucideShield,
    title: "Advanced Technology",
    description:
      "State-of-the-art equipment and digital imaging for precise, comfortable treatments.",
  },
  {
    icon: LucideUsers,
    title: "Family-Friendly",
    description:
      "Welcoming environment for patients of all ages, from toddlers to seniors.",
  },
  {
    icon: LucideHeart,
    title: "Gentle Care",
    description:
      "Compassionate approach with sedation options for anxious patients.",
  },
  {
    icon: LucideZap,
    title: "Same-Day Emergency",
    description:
      "24/7 emergency care with same-day appointments for urgent dental needs.",
  },
  {
    icon: LucideAward,
    title: "Insurance Friendly",
    description:
      "We work with all major insurance providers and offer flexible payment plans.",
  },
];

export default function Features() {
  return (
    <motion.section
      id="why_choose_us"
      className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-sky-700 bg-clip-text text-transparent">
          Why Choose Us
        </h2>
        <p className="mt-3 sm:mt-4 text-lg sm:text-xl text-slate-600 font-medium">
          Experience the difference that modern, compassionate dental care makes
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.02,
              y: -5,
            }}
            className="text-center p-6 sm:p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-sky-100"
          >
            <motion.div
              className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-sky-100 to-cyan-100 rounded-2xl mb-4 sm:mb-6 mx-auto"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-sky-600" />
            </motion.div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">
              {feature.title}
            </h3>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
