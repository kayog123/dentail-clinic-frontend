import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroBannerRight() {
  const IMAGE_LIST = [
    {
      src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=450&fit=crop&crop=face",
      alt: "Happy child patient",
      delay: 0.6,
    },
    {
      src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=600&fit=crop&crop=face",
      alt: "Dr. Smith",
      delay: 0.8,
    },
    {
      src: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=600&fit=crop&crop=face",
      alt: "Dr. Johnson",
      delay: 1,
    },
  ];
  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="bg-red-700  flex justify-center items-center relative w-full"
    >
      <div className="flex flex-col w-full h-100 md:h-120 lg:h-140 bg-white">
        <div className="flex  w-full h-40 lg:h-60 bg-white">
          <div className="flex-6 h-full bg-sky-300 rounded-t-4xl "></div>
          <div className="flex-1 h-full bg-sky-300">
            <div className="w-full h-full bg-white rounded-bl-4xl flex items-center justify-center">
              <motion.div
                className="lg:w-18 lg:h-18  rounded-full bg-white/90 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-xl"
                initial={{ scale: 0, x: -20 }}
                animate={{ scale: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=600&fit=crop&crop=face"
                  alt="Dr. Johnson"
                  className="w-10 h-10 lg:w-16 lg:h-16 rounded-full object-cover"
                  height={120}
                  width={120}
                />
              </motion.div>
            </div>
          </div>
        </div>
        <motion.div className="flex w-full h-full bg-sky-300 rounded-tr-4xl rounded-bl-4xl"></motion.div>
        <div className="flex bg-white lg:h-100">
          <div className="bg-sky-300 w-20 sm:w-30 md:w-40">
            <div className="bg-white w-full h-full rounded-tr-4xl flex items-center justify-center flex-col space-y-4 py-4">
              {IMAGE_LIST.map(({ src, alt, delay }, index) => (
                <motion.div
                  key={index}
                  className=" lg:w-18 lg:h-18 rounded-full bg-white/90 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-xl"
                  initial={{ scale: 0, x: -20 }}
                  animate={{ scale: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: delay }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Image
                    src={src}
                    alt={alt}
                    className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full object-cover"
                    height={500}
                    width={500}
                  />
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div className="flex w-full h-full bg-sky-300 rounded-br-3xl flex-stretch rounded-bl-4xl"></motion.div>
        </div>
      </div>
      <Image
        src="/dentist.png"
        alt="Dr. Johnson"
        className="w-[400px] lg:w-[1200px]  rounded-full object-cover absolute bottom-0 "
        height={600}
        width={600}
      />
    </motion.div>
  );
}
