import { GoogleGenAI } from "@google/genai";
import { QuizData, Difficulty } from "../types";

// Standard Vite environment variable handling
// Note: In AI Studio, GEMINI_API_KEY is usually available via process.env or defined in vite.config
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export async function generateQuiz(
  topic: string,
  difficulty: Difficulty = 'medium',
  numQuestions: number = 10,
  context?: string
): Promise<QuizData> {
  const model = "gemini-2.0-flash";
  
  const prompt = `
You are a smart MCQ quiz engine. Generate a quiz on "${topic}" with ${difficulty} difficulty.
Return ONLY valid JSON in the format specified.
${context ? `Use this context: ${context}` : ''}
`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    if (!response || !response.text) {
      throw new Error("No response from AI");
    }

    const data = JSON.parse(response.text);
    return data;
  } catch (e) {
    console.error("Gemini Quiz Generation failed:", e);
    throw new Error(e instanceof Error ? e.message : "Failed to generate quiz.");
  }
}

export async function generateInsights(
  username: string,
  stats: any,
  events: any[]
): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Analyze this user's behavior: User ${username}, Score ${stats.score}, Tier ${stats.tier}. Provide a 1-sentence insight.`,
    });
    return response.text.trim();
  } catch (e) {
    console.error("AI Insight failed:", e);
    return "Your progress shows consistent engagement. Keep it up!";
  }
}
