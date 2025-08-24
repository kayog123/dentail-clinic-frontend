"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      id="about"
      className=" px-4 py-14 md:py-20 bg-slate-100/40"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="text-center max-w-6xl mx-auto"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="mt-4 text-3xl text-slate-600 font-medium text-center">
          we deliver tailored{" "}
          <span className="bg-sky-300 px-2 rounded-md"> services</span> for
          individuals and families with disabilities to empower independene and
          help them achieve their personal goals with compassionate{" "}
          <span className="bg-sky-300 px-2 rounded-md"> expert care</span>
        </p>
      </motion.div>
    </motion.section>
  );
}
