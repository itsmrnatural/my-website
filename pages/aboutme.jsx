import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * About Me page component displaying personal information
 * @returns {JSX.Element} The About Me page
 */
export default function AboutMe() {
  return (
    <>
      <Head>
        <title>Mr. Natural • About Me</title>
        <meta
          name="description"
          content="Learn more about Mr. Natural - student, programmer, and coffee addict."
        />
      </Head>
      <div className="py-20 px-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl text-white font-bold mb-2">About Me</h1>
          <p className="text-xl text-white/50 font-normal mb-8">
            Get to know the person behind the code.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col md:flex-row gap-8 mb-12"
          >
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-emerald-500/30 shadow-lg shadow-emerald-500/20">
                <Image
                  src="https://i.imgur.com/isKXF9Q.gif"
                  alt="Mr. Natural"
                  width={192}
                  height={192}
                  className="object-cover"
                />
              </div>
              <h2 className="text-center text-xl font-semibold text-white mt-4">Mr. Natural</h2>
              <p className="text-center text-sm text-emerald-400">
                Student • Developer • Coffee Enthusiast
              </p>
            </div>

            {/* Bio Section */}
            <div className="flex-1">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-user text-emerald-400"></i>
                  Introduction
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  [Add your personal introduction here - tell visitors who you are, what you do, and
                  what drives you.]
                </p>
                <p className="text-gray-300 leading-relaxed">
                  [Share your story, your passions, and what makes you unique. This is your space to
                  connect with readers on a personal level.]
                </p>
              </div>
            </div>
          </motion.div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-8"
          >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <i className="fas fa-graduation-cap text-emerald-400"></i>
              Education
            </h3>
            <div className="space-y-4">
              <div className="border-l-2 border-emerald-500/30 pl-4">
                <p className="text-white font-medium">[University/School Name]</p>
                <p className="text-emerald-400 text-sm">[Degree/Program]</p>
                <p className="text-gray-400 text-sm">[Year] - [Year/Present]</p>
                <p className="text-gray-300 text-sm mt-2">
                  [Add details about your studies, achievements, or interesting courses]
                </p>
              </div>
            </div>
          </motion.div>

          {/* Friends & Community Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-8"
          >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <i className="fas fa-users text-emerald-400"></i>
              Friends & Community
            </h3>
            <p className="text-gray-300 mb-4">
              [Share photos or mention friends who have been important in your journey]
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Placeholder for friend photos */}
              <div className="aspect-square bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                <i className="fas fa-image text-gray-600 text-2xl"></i>
              </div>
              <div className="aspect-square bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                <i className="fas fa-image text-gray-600 text-2xl"></i>
              </div>
              <div className="aspect-square bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                <i className="fas fa-image text-gray-600 text-2xl"></i>
              </div>
              <div className="aspect-square bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                <i className="fas fa-image text-gray-600 text-2xl"></i>
              </div>
            </div>
          </motion.div>

          {/* Interests & Hobbies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-8"
          >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <i className="fas fa-heart text-emerald-400"></i>
              Interests & Hobbies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-l-2 border-emerald-500/30 pl-4">
                <h4 className="text-white font-medium mb-2">
                  <i className="fas fa-code text-emerald-400 mr-2"></i>
                  Programming
                </h4>
                <p className="text-gray-300 text-sm">
                  [Describe your coding interests and favorite projects]
                </p>
              </div>
              <div className="border-l-2 border-teal-500/30 pl-4">
                <h4 className="text-white font-medium mb-2">
                  <i className="fas fa-coffee text-teal-400 mr-2"></i>
                  Coffee
                </h4>
                <p className="text-gray-300 text-sm">
                  [Share your love for coffee and favorite brews]
                </p>
              </div>
              <div className="border-l-2 border-cyan-500/30 pl-4">
                <h4 className="text-white font-medium mb-2">
                  <i className="fas fa-music text-cyan-400 mr-2"></i>
                  Music
                </h4>
                <p className="text-gray-300 text-sm">[Talk about your musical interests]</p>
              </div>
              <div className="border-l-2 border-emerald-500/30 pl-4">
                <h4 className="text-white font-medium mb-2">
                  <i className="fas fa-book text-emerald-400 mr-2"></i>
                  Reading
                </h4>
                <p className="text-gray-300 text-sm">[Share your favorite books or manga]</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-lg p-6 border border-emerald-500/30"
          >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <i className="fas fa-envelope text-emerald-400"></i>
              Let's Connect
            </h3>
            <p className="text-gray-300 mb-4">
              Interested in collaborating or just want to say hi? Feel free to reach out!
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:something.mrnatural@gmail.com"
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-all flex items-center gap-2"
              >
                <i className="fas fa-envelope"></i>
                Email Me
              </a>
              <a
                href="https://github.com/itsmrnatural"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all flex items-center gap-2"
              >
                <i className="fab fa-github"></i>
                GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
