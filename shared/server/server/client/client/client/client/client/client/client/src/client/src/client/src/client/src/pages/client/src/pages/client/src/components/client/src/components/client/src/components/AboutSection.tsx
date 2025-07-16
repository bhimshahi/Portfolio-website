```typescript
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Users, Coffee, Heart } from "lucide-react";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { icon: Award, label: "Years Experience", value: "5+" },
    { icon: Users, label: "Happy Clients", value: "100+" },
    { icon: Coffee, label: "Projects Done", value: "200+" },
    { icon: Heart, label: "Passion Level", value: "100%" },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <img
                src="https://bhimshahi.com.np/Profile.jpg"
                alt="Bhim Shahi Thakuri"
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto lg:mx-0"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Camera className="w-10 h-10 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Creative Visual Storyteller & Digital Artist
            </h3>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              I'm a passionate creative professional specializing in photography, video editing, and graphic design. 
              With over 5 years of experience, I help individuals and businesses bring their visual stories to life 
              through compelling imagery and innovative design solutions.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed">
              My approach combines technical expertise with artistic vision to create content that not only looks 
              stunning but also communicates your message effectively. Whether it's capturing the perfect moment 
              or crafting a brand identity, I'm dedicated to delivering exceptional results.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="text-center p-4 bg-white rounded-xl shadow-lg"
                >
                  <stat.icon className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

