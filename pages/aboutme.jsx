import Head from "next/head";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import CustomCursor from "@components/CustomCursor";

/**
 * About Me page
 * @returns {JSX.Element} The About Me page
 */
export default function AboutMe() {
  const containerRef = useRef(null);
  const [headerTransform, setHeaderTransform] = useState({ y: 0, opacity: 1 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const threshold = window.innerHeight * 0.25;

      if (scrollPos > threshold) {
        const translateY = -(scrollPos - threshold) * 0.3;
        const opacity = Math.max(0.2, 1 - (scrollPos - threshold) / 500);
        setHeaderTransform({ y: translateY, opacity });
      } else {
        setHeaderTransform({ y: 0, opacity: 1 });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <CustomCursor />
      <Head>
        <title>Mr. Natural • About</title>
        <meta name="description" content="About me" />
      </Head>

      <div ref={containerRef} className="py-8 max-w-6xl mx-auto px-5">
        {/* Header with parallax effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            transform: `translateY(${headerTransform.y}px)`,
            opacity: headerTransform.opacity,
          }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-coffee-900 dark:text-white mb-4">
            About Me
          </h1>
          <p className="text-lg text-coffee-600 dark:text-gray-400">
            Developer • Student • Severe Coffee Addict
          </p>
        </motion.div>

        {/* Main Layout - Photo + Bio */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Left: Photo with torn effect + Resume button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-shrink-0"
            >
              {/* Torn Photo Effect */}
              <div className="relative mb-6">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-64 h-80 bg-gradient-to-br from-coffee-400 to-coffee-600 dark:from-coffee-600 dark:to-coffee-800 relative overflow-hidden cursor-pointer"
                  style={{
                    clipPath:
                      "polygon(0% 0%, 100% 0%, 100% 95%, 95% 97%, 90% 95%, 85% 98%, 80% 96%, 75% 99%, 70% 97%, 65% 99%, 60% 96%, 55% 98%, 50% 97%, 45% 99%, 40% 96%, 35% 98%, 30% 97%, 25% 99%, 20% 96%, 15% 98%, 10% 96%, 5% 98%, 0% 97%)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* Placeholder for photo - replace with actual image */}
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-full h-full flex items-center justify-center text-white/30 text-6xl"
                  >
                    <i className="fas fa-user"></i>
                  </motion.div>

                  {/* Tape effect on top */}
                  <motion.div
                    animate={{ rotate: [2, 4, 2] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-yellow-100/40 dark:bg-yellow-200/20 blur-[0.5px]"
                  ></motion.div>
                </motion.div>

                {/* Shadow underneath torn edge */}
                <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-black/20 to-transparent blur-sm"></div>
              </div>

              {/* Resume Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled
                className="w-64 flex items-center justify-center gap-2 px-6 py-3 bg-coffee-200 dark:bg-neutral-800/50 text-coffee-500 dark:text-gray-500 rounded-lg font-medium cursor-not-allowed border border-coffee-300 dark:border-neutral-700"
              >
                <i className="fas fa-file-pdf"></i>
                Download Resume
              </motion.button>
            </motion.div>

            {/* Right: Bio Text wrapping from top to bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-1 text-coffee-800 dark:text-gray-300 text-lg leading-relaxed space-y-4"
            >
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                So, I don't have much to write here. But I guess welcome to my site. I'll fix this
                section one day, hopefully.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Experience Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-heading font-bold text-coffee-900 dark:text-white mb-8">
            Experience
          </h2>
          <div className="space-y-6">
            {[
              {
                title: "Personal Projects",
                period: "2019 - Present",
                description:
                  "Developed multiple applications using python, this web stack, etc. Experimenting with different technologies and frameworks.",
              },
            ].map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                }}
                className="bg-coffee-100 dark:bg-white/5 rounded-lg p-6 border border-coffee-300 dark:border-white/10 cursor-default"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                  <h3 className="text-xl font-semibold text-coffee-900 dark:text-white">
                    {exp.title}
                  </h3>
                  <span className="text-coffee-600 dark:text-coffee-400 font-medium mt-1 md:mt-0">
                    {exp.period}
                  </span>
                </div>
                <p className="text-coffee-700 dark:text-gray-300">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-heading font-bold text-coffee-900 dark:text-white mb-8">
            Education
          </h2>
          <div className="space-y-6">
            {[
              {
                institution: "National Institute Of Technology, Delhi",
                degree: "B.Eng. — Computer Science & Engineering",
                period: "2025 - Present",
                description:
                  "Pursuing my engineering course from this institution. Let's see what this journey entails.",
              },
              {
                institution: "Self-taught Developer",
                degree: "Web Development & Programming",
                period: "2019 - Present",
                description:
                  "Self-learnt through online courses, documentation, and hands-on approach. Trying and learning strange languages.",
              },
            ].map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                }}
                className="bg-coffee-100 dark:bg-white/5 rounded-lg p-6 border border-coffee-300 dark:border-white/10 cursor-default"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-coffee-900 dark:text-white">
                      {edu.institution}
                    </h3>
                    <p className="text-coffee-600 dark:text-coffee-400 mt-1">{edu.degree}</p>
                  </div>
                  <span className="text-coffee-600 dark:text-coffee-400 font-medium mt-2 md:mt-0">
                    {edu.period}
                  </span>
                </div>
                <p className="text-coffee-700 dark:text-gray-300">{edu.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Connect Section at the bottom */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-gradient-to-br from-coffee-600 to-coffee-800 dark:from-coffee-800 dark:to-coffee-950 rounded-xl p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Let's Connect</h2>
          <p className="text-coffee-100 dark:text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
            I'm always open to discussing new opportunities, collaborations, or just having a
            conversation about technology and development.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:itsmrnatural@duck.com"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white hover:bg-gray-100 text-coffee-900 rounded-lg font-medium transition-colors"
            >
              <i className="fas fa-envelope"></i>
              Email Me
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/itsmrnatural"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-lg font-medium transition-colors"
            >
              <i className="fab fa-github"></i>
              GitHub
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              href="https://linkedin.com/in/imdhananjay/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-lg font-medium transition-colors"
            >
              <i className="fab fa-linkedin"></i>
              Linkedin
            </motion.a>
          </div>
        </motion.section>
      </div>
    </>
  );
}
