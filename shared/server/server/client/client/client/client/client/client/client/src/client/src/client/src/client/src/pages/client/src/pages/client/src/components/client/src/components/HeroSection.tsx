import { motion } from "framer-motion";
import { ArrowDown, Camera, Video, Palette } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

const taglineText = "Creative Visual Storyteller";

export default function HeroSection() {
  // Typewriter effect for tagline
  const [displayText, setDisplayText] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(taglineText.slice(0, i));
      i++;
      if (i > taglineText.length) clearInterval(interval);
    }, 70);
    return () => clearInterval(interval);
  }, []);

  const scrollToPortfolio = () => {
    const element = document.getElementById("portfolio");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden hero-gradient"
      aria-label="Hero Section"
    >
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply animate-float"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply animate-float" style={{ animationDelay: "4s" }}></div>
      </div>

      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <img
              src="https://bhimshahi.com.np/Profile.jpg"
              alt="Bhim Shahi Thakuri Profile"
              loading="lazy"
              onError={e => (e.currentTarget.src = "/default-profile.jpg")}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto mb-6 object-cover border-4 border-white/20 shadow-2xl"
            />
            <div
              className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white animate-pulse"
              aria-label="Online Status"
            ></div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight"
        >
          Bhim Shahi Thakuri
        </motion.h1>

        {/* Typewriter effect for tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl sm:text-2xl md:text-3xl mb-8 font-light opacity-90 min-h-[2.5rem]"
          aria-label="Tagline"
        >
          {displayText}
          <span className="animate-blink inline-block w-2 ml-1 bg-white h-[1.6rem] align-middle"></span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-10"
        >
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <Camera size={20} aria-label="Photography" />
            <span className="text-sm font-medium">Photography</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <Video size={20} aria-label="Video Editing" />
            <span className="text-sm font-medium">Video Editing</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <Palette size={20} aria-label="Design" />
            <span className="text-sm font-medium">Design</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <Button
            size="lg"
            onClick={scrollToPortfolio}
            aria-label="View My Work"
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            View My Work
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToContact}
            aria-label="Get In Touch"
            className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 text-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Get In Touch
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        aria-label="Scroll Down"
      >
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            type: "spring",
            stiffness: 70,
          }}
          className="cursor-pointer"
          onClick={scrollToPortfolio}
        >
          <ArrowDown size={32} className="text-white/70 hover:text-white transition-colors" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* Add this to your CSS/tailwind config (global styles or tailwind plugin):
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.animate-blink {
  animation: blink 1s steps(1) infinite;
}
*/
