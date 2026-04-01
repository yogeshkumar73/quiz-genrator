import { GoogleGenAI, Type } from "@google/genai";
import { QuizData, Difficulty } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateQuiz(
  topic: string,
  difficulty: Difficulty = 'medium',
  numQuestions: number = 50,
  context?: string
): Promise<QuizData> {
  const prompt = `
You are a smart MCQ quiz engine designed for a frontend React application.

Your job is to:
1. Generate multiple-choice questions (MCQs)
2. Provide correct answers
3. Include explanations
4. Include evaluation-ready data so the frontend can instantly check answers

INPUT:
- Topic: ${topic}
- Difficulty: ${difficulty}
- Number of Questions: ${numQuestions}
- Context (optional for RAG): ${context || "None provided"}

INSTRUCTIONS:
- If CONTEXT is provided, generate questions ONLY from that context.
- Otherwise, use your general knowledge based on the topic.
- Generate high-quality, non-ambiguous questions.
- Each question must have exactly 4 options.
- Only ONE option is correct.
- Keep options similar in length and realistic.
- Avoid repetition.
- Difficulty should match the input.

OUTPUT FORMAT (STRICT JSON ONLY, NO EXTRA TEXT):
{
  "quiz": {
    "topic": "${topic}",
    "difficulty": "${difficulty}",
    "questions": [
      {
        "id": 1,
        "question": "string",
        "options": [
          { "id": 0, "text": "option A" },
          { "id": 1, "text": "option B" },
          { "id": 2, "text": "option C" },
          { "id": 3, "text": "option D" }
        ],
        "correctAnswerId": 0,
        "correctAnswerText": "option A",
        "explanation": "Short explanation (1–2 lines)",
        "difficulty": "${difficulty}",
        "tags": ["topic-related", "keywords"]
      }
    ]
  },
  "evaluationLogic": {
    "rule": "Compare selectedOptionId with correctAnswerId",
    "correctMessage": "Correct answer 🎉",
    "wrongMessage": "Wrong answer ❌",
    "showExplanation": true
  }
}

STRICT RULES:
- Return ONLY valid JSON (no markdown, no text outside JSON)
- correctAnswerId must match one of the option ids (0–3)
- explanation must be concise
- questions must be unique
- Do NOT include null or undefined values
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          quiz: {
            type: Type.OBJECT,
            properties: {
              topic: { type: Type.STRING },
              difficulty: { type: Type.STRING },
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.INTEGER },
                    question: { type: Type.STRING },
                    options: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          id: { type: Type.INTEGER },
                          text: { type: Type.STRING }
                        },
                        required: ["id", "text"]
                      }
                    },
                    correctAnswerId: { type: Type.INTEGER },
                    correctAnswerText: { type: Type.STRING },
                    explanation: { type: Type.STRING },
                    difficulty: { type: Type.STRING },
                    tags: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    }
                  },
                  required: ["id", "question", "options", "correctAnswerId", "correctAnswerText", "explanation", "difficulty", "tags"]
                }
              }
            },
            required: ["topic", "difficulty", "questions"]
          },
          evaluationLogic: {
            type: Type.OBJECT,
            properties: {
              rule: { type: Type.STRING },
              correctMessage: { type: Type.STRING },
              wrongMessage: { type: Type.STRING },
              showExplanation: { type: Type.BOOLEAN }
            },
            required: ["rule", "correctMessage", "wrongMessage", "showExplanation"]
          }
        },
        required: ["quiz", "evaluationLogic"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    throw new Error("Invalid response from AI");
  }
}
