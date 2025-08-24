"use client";

import { motion } from "framer-motion";
import { LucideStar, LucideQuote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Patient",
    content:
      "The best dental experience I've ever had! Dr. Smith and the team made me feel so comfortable. My smile has never looked better.",
    rating: 5,
    image: "/api/placeholder/60/60",
  },
  {
    name: "Michael Chen",
    role: "Patient",
    content:
      "Professional, gentle, and caring. They took the time to explain everything and made sure I was comfortable throughout the entire process.",
    rating: 5,
    image: "/api/placeholder/60/60",
  },
  {
    name: "Emily Rodriguez",
    role: "Patient",
    content:
      "Amazing family dentistry! My kids actually look forward to their dental visits. The staff is wonderful and the facility is beautiful.",
    rating: 5,
    image: "/api/placeholder/60/60",
  },
];

export default function Testimonials() {
  return (
    <motion.section
      id="testimonials"
      className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 md:py-20 bg-white"
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
          What Our Patients Say
        </h2>
        <p className="mt-3 sm:mt-4 text-lg sm:text-xl text-slate-600 font-medium">
          Don&apos;t just take our word for it - hear from our satisfied
          patients
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.02,
              y: -5,
            }}
            className="bg-gradient-to-br from-sky-50 to-cyan-50 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <LucideStar
                  key={i}
                  className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            <div className="relative mb-6">
              <LucideQuote className="h-6 w-6 sm:h-8 sm:w-8 text-sky-600 mb-4" />
              <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sky-200 rounded-full flex items-center justify-center">
                <span className="text-sky-700 font-bold text-base sm:text-lg">
                  {testimonial.name.charAt(0)}
                </span>
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm sm:text-base">
                  {testimonial.name}
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
