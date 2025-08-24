"use client";

import { motion } from "framer-motion";
import {
  LucideMail,
  LucideMapPin,
  LucidePhone,
  LucideShield,
  LucideClock,
  LucideBuilding2,
  LucideCalendar,
} from "lucide-react";

export default function OfficeInfo() {
  return (
    <motion.section
      id="office"
      className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-10 md:py-14"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="text-center max-w-3xl mx-auto mb-6 sm:mb-8"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-sky-700 bg-clip-text text-transparent">
          Visit Our Office
        </h2>
        <p className="mt-2 sm:mt-3 text-base sm:text-lg text-slate-600 font-medium">
          Conveniently located with flexible hours to fit your schedule
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-stretch">
        {/* Office Information Card - Redesigned */}
        <motion.div
          className="rounded-xl bg-gradient-to-br from-white to-slate-50/50 p-4 sm:p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100/50"
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          whileHover={{ y: -2, scale: 1.005 }}
        >
          {/* Header Section */}
          <div className="text-center mb-4 sm:mb-5">
            <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-sky-100 to-cyan-100 rounded-lg mb-2 sm:mb-3">
              <LucideBuilding2 className="h-5 w-5 sm:h-6 sm:w-6 text-sky-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-1">
              Dental Clinic
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm">
              Professional & Caring Dental Care
            </p>
          </div>

          {/* Address Section */}
          <div className="mb-4 sm:mb-5">
            <div className="flex items-start gap-2.5 p-2.5 sm:p-3 bg-gradient-to-r from-sky-50 to-cyan-50 rounded-lg border border-sky-100/50">
              <div className="flex-shrink-0 w-6 h-6 bg-sky-100 rounded-md flex items-center justify-center">
                <LucideMapPin className="h-3 w-3 text-sky-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800 text-xs sm:text-sm mb-1">
                  Office Location
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm mb-1.5">
                  123 Smile Ave, Suite 200
                  <br />
                  Springfield, ST 00000
                </p>
                <a
                  href="https://maps.google.com/?q=123+Smile+Ave+Springfield"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sky-600 hover:text-sky-700 font-medium text-xs sm:text-sm transition-colors duration-200"
                >
                  <span>Get Directions</span>
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mb-4 sm:mb-5">
            <h4 className="font-semibold text-slate-800 text-sm sm:text-base mb-2 sm:mb-3 flex items-center gap-1.5">
              <LucidePhone className="h-3 w-3 sm:h-4 sm:w-4 text-sky-600" />
              Contact Information
            </h4>
            <div className="space-y-1.5 sm:space-y-2">
              <motion.a
                href="tel:+15551234567"
                className="flex items-center gap-2 p-2 sm:p-2.5 bg-white rounded-md border border-slate-100 hover:border-sky-200 hover:bg-sky-50 transition-all duration-200 group"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-5 h-5 bg-sky-100 rounded flex items-center justify-center group-hover:bg-sky-200 transition-colors duration-200">
                  <LucidePhone className="h-2.5 w-2.5 text-sky-600" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-600 text-xs">Phone</p>
                  <p className="font-semibold text-slate-800 text-xs sm:text-sm">
                    (555) 123-4567
                  </p>
                </div>
              </motion.a>

              <motion.a
                href="mailto:hello@brightsmile.example"
                className="flex items-center gap-2 p-2 sm:p-2.5 bg-white rounded-md border border-slate-100 hover:border-sky-200 hover:bg-sky-50 transition-all duration-200 group"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-5 h-5 bg-sky-100 rounded flex items-center justify-center group-hover:bg-sky-200 transition-colors duration-200">
                  <LucideMail className="h-2.5 w-2.5 text-sky-600" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-600 text-xs">Email</p>
                  <p className="font-semibold text-slate-800 text-xs sm:text-sm">
                    hello@brightsmile.example
                  </p>
                </div>
              </motion.a>
            </div>
          </div>

          {/* Office Hours Section */}
          <div className="mb-4 sm:mb-5">
            <h4 className="font-semibold text-slate-800 text-sm sm:text-base mb-2 sm:mb-3 flex items-center gap-1.5">
              <LucideClock className="h-3 w-3 sm:h-4 sm:w-4 text-sky-600" />
              Office Hours
            </h4>
            <div className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-lg p-2.5 sm:p-3 border border-sky-100/50">
              <div className="grid grid-cols-1 gap-1.5 text-xs sm:text-sm">
                <div className="flex justify-between items-center py-1 border-b border-sky-100/50 last:border-b-0">
                  <span className="text-slate-600">Monday - Thursday</span>
                  <span className="font-semibold text-slate-800">
                    8:00 AM - 5:00 PM
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-sky-100/50 last:border-b-0">
                  <span className="text-slate-600">Friday</span>
                  <span className="font-semibold text-slate-800">
                    8:00 AM - 2:00 PM
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-sky-100/50 last:border-b-0">
                  <span className="text-slate-600">Saturday</span>
                  <span className="font-semibold text-slate-800">
                    By Appointment
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-600">Sunday</span>
                  <span className="font-semibold text-slate-800">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Insurance & Services Info */}
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-2.5 sm:p-3 border border-slate-200/50">
            <div className="flex items-center gap-1.5 mb-1.5">
              <LucideShield className="h-3 w-3 sm:h-4 sm:w-4 text-sky-600" />
              <h5 className="font-semibold text-slate-800 text-xs sm:text-sm">
                Insurance & Services
              </h5>
            </div>
            <div className="space-y-1 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 bg-sky-500 rounded-full"></div>
                <span>Most PPO insurance plans accepted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 bg-sky-500 rounded-full"></div>
                <span>Flexible financing options available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 bg-sky-500 rounded-full"></div>
                <span>Emergency appointments available</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Google Maps */}
        <motion.div
          className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-md hover:shadow-lg transition-all duration-300"
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          whileHover={{ y: -2, scale: 1.005 }}
        >
          <iframe
            title="Dental Clinic Map"
            className="h-[250px] sm:h-[300px] lg:h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=123%20Smile+Ave+Springfield&output=embed"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
