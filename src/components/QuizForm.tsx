import { ChevronRight, Layout, Settings2 } from "lucide-react";
import { Difficulty } from "../types";

interface QuizFormProps {
  topic: string;
  setTopic: React.Dispatch<React.SetStateAction<string>>;

  difficulty: Difficulty;
  setDifficulty: React.Dispatch<React.SetStateAction<Difficulty>>;

  numQuestions: number;
  setNumQuestions: React.Dispatch<React.SetStateAction<number>>;

  context: string;
  setContext: React.Dispatch<React.SetStateAction<string>>;

  loading: boolean;
  error: string | null;

  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function QuizForm({
  topic,
  setTopic,
  difficulty,
  setDifficulty,
  numQuestions,
  setNumQuestions,
  context,
  setContext,
  loading,
  error,
  onSubmit,
}: QuizFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-[#141414] border border-white/10 rounded-3xl p-8 space-y-8 shadow-xl"
    >
      {/* Topic */}
      <div>
        <label className="block text-sm font-semibold text-gray-400 mb-3">
          Quiz Topic
        </label>

        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="React, Java, Operating System..."
          className="w-full rounded-xl bg-[#1b1b1b] border border-gray-700 px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Difficulty + Questions */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Difficulty */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-400 mb-3">
            <Settings2 size={18} />
            Difficulty
          </label>

          <div className="grid grid-cols-3 gap-3">
            {(["easy", "medium", "hard"] as Difficulty[]).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setDifficulty(level)}
                className={`rounded-xl py-3 font-semibold transition ${
                  difficulty === level
                    ? "bg-blue-600 text-white"
                    : "bg-[#1c1c1c] border border-gray-700 text-gray-400 hover:border-blue-500"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Number of Questions */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-400 mb-3">
            <Layout size={18} />
            Questions
          </label>

          <input
            type="range"
            min={1}
            max={20}
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
            className="w-full accent-blue-500"
          />

          <p className="text-center mt-3 text-white font-semibold text-lg">
            {numQuestions} Questions
          </p>
        </div>
      </div>

      {/* Context */}
      <div>
        <label className="block text-sm font-semibold text-gray-400 mb-3">
          Context (Optional)
        </label>

        <textarea
          rows={6}
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Paste notes, PDF content, or study material here..."
          className="w-full rounded-xl bg-[#1b1b1b] border border-gray-700 px-5 py-4 text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-500 bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || !topic.trim()}
        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50 flex justify-center items-center gap-2"
      >
        {loading ? "Generating..." : "Generate Quiz"}

        {!loading && <ChevronRight size={20} />}
      </button>
    </form>
  );
}