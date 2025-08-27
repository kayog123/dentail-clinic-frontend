import Badge from "@/app/components/common/badge";
import { motion } from "framer-motion";
import {
  LucideCalendar,
  LucidePhone,
  LucideSparkle,
  LucideCheckCircle,
} from "lucide-react";
import { bannerLeftItems, PHONE_NUMBER } from "../../_utils/const";
import Link from "next/link";

type HeroBannerLeftProps = {
  titleHeader?: string;
  title: string;
  desc: string;
};
export default function HeroBannerLeft(props: HeroBannerLeftProps) {
  const { title, desc, titleHeader } = props;
  const MotionLink = motion(Link);
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="text-center lg:text-left w-full"
    >
      {titleHeader && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="inline-flex text-xs items-center gap-2 rounded-full bg-gradient-to-r from-sky-50 to-cyan-50 text-sky-700 px-3 sm:px-4 py-1   sm:text-sm font-semibold ring-1 ring-sky-200 shadow-sm"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <LucideSparkle className="h-3 w-3 sm:h-4 sm:w-4" />
          </motion.div>
          {titleHeader}
        </motion.div>
      )}

      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-4 sm:mt-6 text-2xl  md:text-5xl sm:text-4xl   lg:text-6xl xl:text-7xl font-[800] tracking-tight bg-gradient-to-r from-slate-900 via-sky-700 to-cyan-600 bg-clip-text text-transparent leading-tight"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl lg:text-2xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0"
      >
        {desc}
      </motion.p>

      {/* Trust indicators */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs sm:text-sm text-slate-600"
      >
        <div className="flex items-center gap-1">
          <LucideCheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-sky-600" />
          <span>New patients welcome</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideCheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-sky-600" />
          <span>Most insurances accepted</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="mt-6 sm:mt-8 flex flex-col sm:flex-row  sm:gap-4 items-center justify-center  lg:justify-start"
      >
        <div className="flex gap-3">
          <MotionLink
            href="/booking"
            className="text-sm md:text-2xl inline-flex items-center justify-center gap-2 sm:gap-3 rounded-full bg-gradient-to-r from-sky-600 to-cyan-600 px-4 sm:px-8 py-2 sm:py-2 text-white font-bold shadow-xl w-full sm:w-auto  sm:text-lg hover:shadow-2xl transition-all duration-300"
            data-oid="21egn8b"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(14, 165, 233, 0.4)",
              background: "linear-gradient(to right, #0ea5e9, #06b6d4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <LucideCalendar className="h-5 w-5 sm:h-6 sm:w-6 " />
            Book Your Visit
          </MotionLink>
          <motion.a
            href="tel:+15551234567"
            className="inline-flex items-center justify-center gap-2 sm:gap-3 rounded-full border-2 border-sky-200 bg-white px-4 sm:px-4 py-1 sm:py-4 text-sky-700 font-bold hover:bg-sky-50 transition w-full sm:w-auto text-base sm:text-lg shadow-lg"
            whileHover={{
              scale: 1.05,
              borderColor: "#0ea5e9",
              boxShadow: "0 10px 25px rgba(14, 165, 233, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <LucidePhone className="h-5 w-5 sm:h-6 sm:w-6" data-oid="pvl.493" />
            Call {PHONE_NUMBER}
          </motion.a>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm"
      >
        {bannerLeftItems.map(({ text, Icon }) => (
          <motion.div
            key={text}
            whileHover={{ scale: 1.05, y: -2 }}
            data-oid="t7tedv4"
          >
            <Badge
              icon={
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" data-oid="sskjj8z" />
              }
              text={text}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
