import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, User as UserIcon, Brain, Sparkles, Target, Zap, Shield, ChevronRight } from 'lucide-react';
import { GlassContainer } from '../shared/components/GlassContainer';
import { Button } from '../shared/components/Button';
import { Input } from '../shared/components/Input';
import { useUserStore } from '../store/useUserStore';

export const LandingPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const login = useUserStore(state => state.login);

  const handleEnter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter a username to continue.');
      return;
    }
    login(username.trim());
  };

  const features = [
    { icon: Brain, title: "AI Generation", desc: "Generate complex quizzes on any topic instantly using Gemini 2.0 Flash." },
    { icon: Target, title: "Dynamic Scoring", desc: "Track progress with advanced behavioral analysis and tier-based systems." },
    { icon: Zap, title: "Instant Feedback", desc: "Get real-time insights and explanations for every answer choice." },
    { icon: Shield, title: "Local Persistence", desc: "Your progress stays with you, no complex authentication required." }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[160px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 blur-[160px] rounded-full animate-pulse style={{ animationDelay: '2s' }}" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.03)_0%,transparent_70%)]" />
      </div>

      <nav className="relative z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 group cursor-default">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Quiz<span className="text-blue-400">AI</span></span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowLogin(true)}
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Sign In
          </button>
          <Button 
            onClick={() => setShowLogin(true)}
            variant="secondary" 
            className="hidden md:flex !py-2 !px-4 text-sm"
          >
            Start Learning
          </Button>
        </div>
      </nav>

      <main className="relative z-10 pt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          {/* Hero Section */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-inner"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-100/70">Powered by Gemini 2.0 Flash</span>
            </motion.div>

            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase"
              >
                MASTER ANY<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">SUBJECT</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-lg text-gray-400 text-xl leading-relaxed font-light"
              >
                Experience the next generation of AI-driven education. Generate personalized quizzes, track your behavioral insights, and level up your knowledge with our advanced scoring engine.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                onClick={() => setShowLogin(true)}
                icon={ChevronRight}
                iconPosition="right"
                className="!text-lg !px-8 !py-4"
              >
                Get Started Free
              </Button>
              <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#050505] bg-gray-800 flex items-center justify-center text-[10px] font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-400 font-medium">Join 500+ daily learners</span>
              </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            <div className="absolute inset-0 bg-blue-500/5 blur-[100px] -z-10" />
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all cursor-default"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Login Modal / Overlay */}
      <AnimatePresence>
        {showLogin && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogin(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md"
            >
              <GlassContainer className="w-full space-y-8 p-10 !bg-white/[0.02]" border opacity={0.5}>
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-black tracking-tight uppercase">Enter Experience</h2>
                  <p className="text-gray-500 text-sm">Choose a username to persist your progress and AI insights.</p>
                </div>

                <form onSubmit={handleEnter} className="space-y-6">
                  <Input
                    label="Username"
                    icon={UserIcon}
                    placeholder="e.g. quantum_learner"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError('');
                    }}
                    error={error}
                    required
                  />
                  
                  <Button
                    type="submit"
                    icon={ChevronRight}
                    iconPosition="right"
                    className="w-full !py-4"
                  >
                    Launch Dashboard
                  </Button>
                </form>

                <p className="text-center text-[10px] text-gray-600 uppercase tracking-[0.2em] font-medium">
                  Privacy First • No Password Needed • AI Driven
                </p>
              </GlassContainer>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer Branding */}
      <footer className="relative z-10 border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-gray-500 text-sm font-medium">© 2026 QuizAI. All rights reserved.</p>
          <div className="flex gap-8">
            {['Privacy', 'Terms', 'Support'].map(item => (
              <a key={item} href="#" className="text-sm text-gray-500 hover:text-white transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};
