import { motion } from "framer-motion";
import { Brain, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Blur */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24">
        <div className="max-w-3xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400"
          >
            <Sparkles size={16} />
            Intelligent Quiz Generation Powered by AI
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-bold leading-tight md:text-7xl"
          >
            Create
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-500 bg-clip-text text-transparent">
              Professional AI Quizzes
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 max-w-2xl text-lg leading-8 text-gray-400"
          >
            Design high-quality multiple-choice quizzes on any subject in
            seconds. Our AI-powered platform generates accurate questions,
            detailed explanations, and customizable difficulty levels to
            support effective learning, assessment, and professional training.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-5"
          >
            <Link
              to="/quiz"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold transition hover:bg-blue-700"
            >
              Start Quiz
              <ArrowRight size={20} />
            </Link>

            <Link
              to="/about"
              className="rounded-xl border border-white/20 px-8 py-4 text-lg font-semibold transition hover:border-blue-500 hover:text-blue-400"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-20 grid grid-cols-3 gap-8 border-t border-white/10 pt-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-blue-400">AI</h2>
              <p className="mt-2 text-gray-500">
                Powered by advanced language models.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-blue-400">100+</h2>
              <p className="mt-2 text-gray-500">
                Configurable question generation.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-blue-400">Instant</h2>
              <p className="mt-2 text-gray-500">
                Generate quizzes within seconds.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Side Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="hidden flex-1 justify-end lg:flex"
        >
          <div className="flex h-80 w-80 items-center justify-center rounded-full border border-blue-500/20 bg-white/5 backdrop-blur-xl">
            <Brain className="h-40 w-40 text-blue-500" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}