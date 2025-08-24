"use client";

import { motion } from "framer-motion";
import {
  LucideArrowRight,
  LucideCalendar,
  LucidePhone,
  LucideCheckCircle,
} from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <motion.section
      className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Clean, professional container */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-50 to-sky-50 border border-slate-200 shadow-lg">
        <div className="px-6 sm:px-8 py-10 sm:py-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Simple badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 rounded-full px-3 py-1.5 mb-6 text-sm font-medium"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <span>✨ New Patient Special</span>
            </motion.div>

            {/* Clean heading */}
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold   mb-4 leading-tight bg-gradient-to-r from-slate-900 to-sky-700 bg-clip-text text-transparent"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to Transform Your Smile?
            </motion.h2>

            {/* Professional subtitle */}
            <motion.p
              className="text-base sm:text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Experience exceptional dental care in a comfortable, modern
              environment. Book your appointment today and take the first step
              toward a healthier smile.
            </motion.p>

            {/* Action buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {/* Primary button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center gap-2  rounded-full border-2 border-sky-200 bg-gradient-to-r from-sky-600 to-cyan-600  hover:bg-sky-700 px-6 sm:px-8 py-3 sm:py-4 text-white font-semibold text-base sm:text-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <LucideCalendar className="h-4 w-4 sm:h-5 sm:w-5" />
                  Book Appointment
                  <LucideArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </motion.div>

              {/* Secondary button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <a
                  href="tel:+15551234567"
                  className="inline-flex items-center justify-center gap-2 rounded-full   border-2 border-sky-200 bg-white hover:bg-sky-50 hover:border-sky-300 px-6 sm:px-8 py-3 sm:py-4 text-sky-700 font-semibold text-base sm:text-lg transition-all duration-200"
                >
                  <LucidePhone className="h-4 w-4 sm:h-5 sm:w-5" />
                  Call Now
                </a>
              </motion.div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-slate-500"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2">
                <LucideCheckCircle className="h-4 w-4 text-sky-500" />
                <span>Free consultation for new patients</span>
              </div>
              <div className="flex items-center gap-2">
                <LucideCheckCircle className="h-4 w-4 text-sky-500" />
                <span>Most insurance plans accepted</span>
              </div>
              <div className="flex items-center gap-2">
                <LucideCheckCircle className="h-4 w-4 text-sky-500" />
                <span>Same-day emergency appointments</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
