import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  ChevronRight, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  Settings2,
  Trophy,
  BookOpen,
  Layout
} from 'lucide-react';
import { generateQuiz } from './services/gemini';
import { QuizData, Difficulty } from './types';

export default function App() {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [numQuestions, setNumQuestions] = useState(5);
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await generateQuiz(topic, difficulty, numQuestions, context);
      setQuizData(data);
      setCurrentQuestionIndex(0);
      setScore(0);
      setSelectedOptionId(null);
      setShowResults(false);
    } catch (err) {
      setError('Failed to generate quiz. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (optionId: number) => {
    if (selectedOptionId !== null) return;
    
    setSelectedOptionId(optionId);
    if (optionId === quizData?.quiz.questions[currentQuestionIndex].correctAnswerId) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!quizData) return;

    if (currentQuestionIndex < quizData.quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionId(null);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setQuizData(null);
    setTopic('');
    setContext('');
    setError(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="relative">
            <div className="absolute inset-0 blur-3xl bg-blue-500/20 rounded-full" />
            <Loader2 className="w-16 h-16 animate-spin text-blue-500 mx-auto relative" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Generating your quiz...</h2>
            <p className="text-gray-400">Gemini is crafting questions for "{topic}"</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (showResults && quizData) {
    const percentage = Math.round((score / quizData.quiz.questions.length) * 100);
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white p-6 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl bg-[#141414] border border-white/10 rounded-3xl p-8 md:p-12 text-center space-y-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/10 text-blue-500 mb-4">
            <Trophy className="w-10 h-10" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-4xl font-bold">Quiz Complete!</h2>
            <p className="text-gray-400">Here's how you performed on {quizData.quiz.topic}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 py-8">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
              <div className="text-3xl font-bold text-blue-500">{score}/{quizData.quiz.questions.length}</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold mt-1">Score</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
              <div className="text-3xl font-bold text-blue-500">{percentage}%</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold mt-1">Accuracy</div>
            </div>
          </div>

          <button
            onClick={resetQuiz}
            className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Try Another Topic
          </button>
        </motion.div>
      </div>
    );
  }

  if (quizData) {
    const currentQuestion = quizData.quiz.questions[currentQuestionIndex];
    const isAnswered = selectedOptionId !== null;

    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white p-6 flex flex-col items-center">
        <div className="w-full max-w-3xl space-y-8 mt-12">
          {/* Progress Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs font-bold text-blue-500 uppercase tracking-widest">Question {currentQuestionIndex + 1} of {quizData.quiz.questions.length}</div>
              <h1 className="text-xl font-semibold text-gray-300">{quizData.quiz.topic}</h1>
            </div>
            <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-sm font-medium">
              Score: {score}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / quizData.quiz.questions.length) * 100}%` }}
              className="h-full bg-blue-500"
            />
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-[#141414] border border-white/10 rounded-3xl p-8 md:p-10 space-y-8"
            >
              <h2 className="text-2xl md:text-3xl font-medium leading-tight">
                {currentQuestion.question}
              </h2>

              <div className="grid gap-3">
                {currentQuestion.options.map((option) => {
                  const isCorrect = option.id === currentQuestion.correctAnswerId;
                  const isSelected = selectedOptionId === option.id;
                  
                  let buttonClass = "w-full p-5 text-left rounded-2xl border transition-all duration-200 flex items-center justify-between group ";
                  
                  if (!isAnswered) {
                    buttonClass += "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20";
                  } else {
                    if (isCorrect) {
                      buttonClass += "bg-green-500/10 border-green-500/50 text-green-500";
                    } else if (isSelected) {
                      buttonClass += "bg-red-500/10 border-red-500/50 text-red-500";
                    } else {
                      buttonClass += "bg-white/5 border-white/5 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleOptionSelect(option.id)}
                      disabled={isAnswered}
                      className={buttonClass}
                    >
                      <span className="text-lg">{option.text}</span>
                      {isAnswered && isCorrect && <CheckCircle2 className="w-6 h-6 shrink-0" />}
                      {isAnswered && isSelected && !isCorrect && <XCircle className="w-6 h-6 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 pt-4"
                >
                  <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl">
                    <div className="flex items-center gap-2 text-blue-500 mb-2">
                      <BookOpen className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">Explanation</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>

                  <button
                    onClick={handleNextQuestion}
                    className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    {currentQuestionIndex === quizData.quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <main className="relative max-w-4xl mx-auto px-6 py-20 md:py-32">
        <div className="space-y-12">
          {/* Hero Section */}
          <div className="space-y-6 text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold uppercase tracking-widest"
            >
              <Brain className="w-4 h-4" />
              AI-Powered Learning
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.9]"
            >
              GENERATE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">SMART QUIZZES</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 max-w-xl"
            >
              Create professional multiple-choice quizzes on any topic in seconds. 
              Powered by Gemini AI for accuracy and depth.
            </motion.p>
          </div>

          {/* Configuration Form */}
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleStartQuiz}
            className="grid gap-8 bg-[#141414] border border-white/10 rounded-[32px] p-8 md:p-10"
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="topic" className="text-xs font-bold text-gray-500 uppercase tracking-widest">Topic</label>
                <input
                  id="topic"
                  type="text"
                  placeholder="e.g. Quantum Physics, World History, React Hooks..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-600"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <Settings2 className="w-3 h-3" />
                    Difficulty
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDifficulty(d)}
                        className={`py-3 rounded-xl border text-sm font-medium capitalize transition-all ${
                          difficulty === d 
                            ? 'bg-blue-500 border-blue-400 text-white shadow-lg shadow-blue-500/20' 
                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <Layout className="w-3 h-3" />
                    Questions
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[3, 5, 10].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setNumQuestions(n)}
                        className={`py-3 rounded-xl border text-sm font-medium transition-all ${
                          numQuestions === n 
                            ? 'bg-blue-500 border-blue-400 text-white shadow-lg shadow-blue-500/20' 
                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="context" className="text-xs font-bold text-gray-500 uppercase tracking-widest">Context (Optional)</label>
                <textarea
                  id="context"
                  placeholder="Paste text here to generate questions specifically from it..."
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-600 min-h-[120px] resize-none"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!topic.trim()}
              className="w-full py-5 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group"
            >
              Generate Quiz
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.form>
        </div>
      </main>
    </div>
  );
}
