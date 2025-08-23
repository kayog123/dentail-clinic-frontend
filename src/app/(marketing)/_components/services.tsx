"use client";

import { motion } from "framer-motion";
import { items } from "../_utils/const";

export default function Services() {
  return (
    <motion.section
      id="services"
      className="mx-auto max-w-7xl px-4 py-14 md:py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      data-oid="457ynbd"
    >
      <motion.div
        className="text-center max-w-2xl mx-auto"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        data-oid="q7rvegy"
      >
        <h2
          className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-slate-800 to-sky-700 bg-clip-text text-transparent"
          data-oid="q5jfo5i"
        >
          Services tailored to you
        </h2>
        <p
          className="mt-4 text-xl text-slate-600 font-medium"
          data-oid="wp4ehl."
        >
          Comfort-first care with the latest technology.
        </p>
      </motion.div>

      <div
        className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
              scale: 1.05,
              y: -5,
              boxShadow: "0 20px 40px rgba(14, 165, 233, 0.15)",
            }}
            className="rounded-2xl border border-sky-100 bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            data-oid="jh7jslu"
          >
            <div className="flex items-start gap-4" data-oid="yf6crfx">
              <motion.div
                className="rounded-xl bg-gradient-to-br from-sky-50 to-cyan-50 p-3 text-sky-600 shadow-sm"
                whileHover={{ rotate: 5, scale: 1.1 }}
                data-oid="mr8pc81"
              >
                <Icon className="h-6 w-6" data-oid="0u:nn4l" />
              </motion.div>
              <div data-oid="fkir2u9">
                <h3
                  className="font-bold text-lg text-slate-800"
                  data-oid=":g6ij4z"
                >
                  {title}
                </h3>
                <p
                  className="mt-2 text-slate-600 font-medium leading-relaxed"
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
