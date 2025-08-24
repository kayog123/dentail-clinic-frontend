"use client";

import { motion } from "framer-motion";
import { items } from "../_utils/const";

export default function Services() {
  return (
    <motion.section
      id="services"
      className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-slate-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      data-oid="457ynbd"
    >
      <motion.div
        className="text-center max-w-3xl mx-auto"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        data-oid="q7rvegy"
      >
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-sky-700 bg-clip-text text-transparent"
          data-oid="q5jfo5i"
        >
          Comprehensive Dental Services
        </h2>
        <p
          className="mt-3 sm:mt-4 text-lg sm:text-xl text-slate-600 font-medium"
          data-oid="wp4ehl."
        >
          From routine checkups to advanced treatments, we provide complete
          dental care with comfort and precision.
        </p>
      </motion.div>

      <div
        className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        data-oid="xwnhidz"
      >
        {items.map(({ title, desc, Icon }, index) => (
          <motion.article
            key={title}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.02,
              y: -8,
              boxShadow: "0 25px 50px rgba(14, 165, 233, 0.15)",
            }}
            className="rounded-2xl border border-sky-100 bg-white p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
            data-oid="jh7jslu"
          >
            <div className="flex items-start gap-4 sm:gap-5" data-oid="yf6crfx">
              <motion.div
                className="rounded-xl bg-gradient-to-br from-sky-50 to-cyan-50 p-3 sm:p-4 text-sky-600 shadow-sm group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 5, scale: 1.1 }}
                data-oid="mr8pc81"
              >
                <Icon
                  className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"
                  data-oid="0u:nn4l"
                />
              </motion.div>
              <div data-oid="fkir2u9">
                <h3
                  className="font-bold text-base sm:text-lg md:text-xl text-slate-800 mb-2 sm:mb-3"
                  data-oid=":g6ij4z"
                >
                  {title}
                </h3>
                <p
                  className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed"
                  data-oid="9s:4xwh"
                >
                  {desc}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
