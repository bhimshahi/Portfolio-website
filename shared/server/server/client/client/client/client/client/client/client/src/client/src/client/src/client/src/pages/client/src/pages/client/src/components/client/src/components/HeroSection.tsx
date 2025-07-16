```typescript
import { motion } from "framer-motion";
import { ArrowDown, Camera, Video, Palette } from "lucide-react";
import { Button } from "./ui/button";

export default function HeroSection() {
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
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply animate-float"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply animate-float" style={{ animationDelay: "4s" }}></div>
      </div>

      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <img
              src="https://bhimshahi.com.np/Profile.jpg"
              alt="Bhim Shahi Thakuri"
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto mb-6 object-cover border-4 border-white/20 shadow-2xl"
            />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
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

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl sm:text-2xl md:text-3xl mb-8 font-light opacity-90"
        >
          Creative Visual Storyteller
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-12"
        >
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <Camera size={20} />
            <span className="text-sm font-medium">Photography</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <Video size={20} />
            <span className="text-sm font-medium">Video Editing</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <Palette size={20} />
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
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg font-medium transition-all duration-300 transform hover:scale-105"
          >
            View My Work
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToContact}
            className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 text-lg font-medium transition-all duration-300 transform hover:scale-105"
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
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="cursor-pointer"
          onClick={scrollToPortfolio}
        >
          <ArrowDown size={32} className="text-white/70 hover:text-white transition-colors" />
        </motion.div>
      </motion.div>
    </section>
  );
}
```
