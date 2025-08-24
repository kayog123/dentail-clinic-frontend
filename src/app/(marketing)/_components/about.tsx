"use client";

import { motion } from "framer-motion";
import {
  LucideHeart,
  LucideUsers,
  LucideAward,
  LucideClock,
} from "lucide-react";

const stats = [
  { number: "15+", label: "Years of Experience", icon: LucideAward },
  { number: "5000+", label: "Happy Patients", icon: LucideHeart },
  { number: "24/7", label: "Emergency Care", icon: LucideClock },
  { number: "100%", label: "Patient Satisfaction", icon: LucideUsers },
];

const values = [
  {
    title: "Compassionate Care",
    description:
      "We treat every patient like family, ensuring comfort and understanding throughout their dental journey.",
    icon: LucideHeart,
  },
  {
    title: "Advanced Technology",
    description:
      "State-of-the-art equipment and modern techniques for precise, comfortable treatments.",
    icon: LucideAward,
  },
  {
    title: "Family-Focused",
    description:
      "Creating a welcoming environment where patients of all ages feel safe and cared for.",
    icon: LucideUsers,
  },
];

export default function About() {
  return (
    <motion.section
      id="about"
      className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-b from-white to-slate-50/50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 md:mb-20"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-sky-700 bg-clip-text text-transparent mb-4 sm:mb-6"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Your Trusted Dental Care Partner
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-slate-600 font-medium leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            We deliver tailored{" "}
            <span className="bg-gradient-to-r from-sky-100 to-cyan-100 px-2 sm:px-3 py-1 rounded-lg font-semibold text-sky-700">
              services
            </span>{" "}
            for individuals and families with disabilities to empower
            independence and help them achieve their personal goals with
            compassionate{" "}
            <span className="bg-gradient-to-r from-sky-100 to-cyan-100 px-2 sm:px-3 py-1 rounded-lg font-semibold text-sky-700">
              expert care
            </span>
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-sky-100 to-cyan-100 rounded-2xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-sky-600" />
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-1 sm:mb-2">
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Values Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          viewport={{ once: true }}
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="text-center p-6 sm:p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-sky-100 group"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.02,
                y: -5,
              }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-sky-100 to-cyan-100 rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <value.icon className="h-8 w-8 sm:h-10 sm:w-10 text-sky-600" />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3 sm:mb-4">
                {value.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
