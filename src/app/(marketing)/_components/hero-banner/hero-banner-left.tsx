import Badge from "@/app/components/common/badge";
import { motion } from "framer-motion";
import { LucideCalendar, LucidePhone, LucideSparkle } from "lucide-react";
import { bannerLeftItems, PHONE_NUMBER } from "../../_utils/const";

type HeroBannerLeftProps = {
  titleHeader?: string;
  title: string;
  desc: string;
};
export default function HeroBannerLeft(props: HeroBannerLeftProps) {
  const { title, desc, titleHeader } = props;
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      {titleHeader && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-50 to-cyan-50 text-sky-700 px-4 py-2 text-sm font-bold ring-2 ring-sky-100 shadow-sm"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <LucideSparkle className="h-4 w-4" data-oid="flyywh:" />
          </motion.div>
          {titleHeader}
        </motion.div>
      )}

      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-6 text-5xl md:text-7xl font-[800] tracking-tight bg-gradient-to-r from-slate-800 via-sky-700 to-cyan-600 bg-clip-text text-transparent leading-tight text-left"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-6 text-xl text-slate-600 font-medium leading-relaxed"
      >
        {desc}
      </motion.p>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="mt-8 flex flex-col sm:flex-row items-center gap-4"
        data-oid="n0f1tt9"
      >
        <motion.a
          href="#schedule"
          className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-sky-600 to-cyan-600 px-8 py-4 text-white font-bold shadow-xl w-full sm:w-auto text-lg"
          data-oid="21egn8b"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(14, 165, 233, 0.4)",
            background: "linear-gradient(to right, #0ea5e9, #06b6d4)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <LucideCalendar className="h-6 w-6" data-oid="m_y96u." />
          Schedule online
        </motion.a>
        <motion.a
          href="tel:+15551234567"
          className="inline-flex items-center justify-center gap-3 rounded-full border-2 border-sky-200 bg-white px-8 py-4 text-sky-700 font-bold hover:bg-sky-50 transition w-full sm:w-auto text-lg shadow-lg"
          data-oid="-cfx2pe"
          whileHover={{
            scale: 1.05,
            borderColor: "#0ea5e9",
            boxShadow: "0 10px 25px rgba(14, 165, 233, 0.2)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <LucidePhone className="h-6 w-6" data-oid="pvl.493" />
          Call {PHONE_NUMBER}
        </motion.a>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm"
      >
        {bannerLeftItems.map(({ text, Icon }) => (
          <motion.div
            key={text}
            whileHover={{ scale: 1.05, y: -2 }}
            data-oid="t7tedv4"
          >
            <Badge
              icon={<Icon className="h-5 w-5" data-oid="sskjj8z" />}
              text={text}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
