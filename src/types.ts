import { GoogleGenAI, Type } from "@google/genai";
import { QuizData, Difficulty } from "../types";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

function validateQuizData(data: QuizData): QuizData {
  if (!data.quiz || !Array.isArray(data.quiz.questions)) {
    throw new Error("Invalid quiz structure");
  }

  data.quiz.questions.forEach((q) => {
    if (
      !q.question ||
      !Array.isArray(q.options) ||
      q.options.length !== 4 ||
      typeof q.correctAnswerId !== "number"
    ) {
      throw new Error("Invalid question format");
    }
  });

  return data;
}

export async function generateQuiz(
  topic: string,
  difficulty: Difficulty = "medium",
  numQuestions: number = 5,
  context?: string
): Promise<QuizData> {

  const prompt = `
You are an advanced AI quiz generator for a React learning application.

Generate a ${difficulty} level MCQ quiz.

INPUT:
Topic: ${topic}
Difficulty: ${difficulty}
Questions: ${numQuestions}

Additional Context:
${context || "No context provided"}

RULES:
- Create exactly ${numQuestions} questions.
- Each question must contain exactly 4 options.
- Only one answer is correct.
- Questions must be educational and non ambiguous.
- Keep explanations short and useful.
- If context is provided, use ONLY that context.
- Do not repeat questions.
- Return JSON only.

The response must follow this structure:

{
 "quiz":{
   "topic":"",
   "difficulty":"",
   "questions":[]
 },
 "evaluationLogic":{
   "rule":"",
   "correctMessage":"",
   "wrongMessage":"",
   "showExplanation":true
 }
}
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

              topic:{
                type: Type.STRING
              },

              difficulty:{
                type: Type.STRING
              },

              questions:{
                type: Type.ARRAY,

                items:{
                  type: Type.OBJECT,

                  properties:{

                    id:{
                      type: Type.INTEGER
                    },

                    question:{
                      type: Type.STRING
                    },

                    options:{
                      type: Type.ARRAY,

                      items:{
                        type: Type.OBJECT,

                        properties:{
                          id:{
                            type: Type.INTEGER
                          },

                          text:{
                            type: Type.STRING
                          }
                        },

                        required:[
                          "id",
                          "text"
                        ]
                      }
                    },


                    correctAnswerId:{
                      type: Type.INTEGER
                    },

                    correctAnswerText:{
                      type: Type.STRING
                    },


                    explanation:{
                      type: Type.STRING
                    },


                    difficulty:{
                      type: Type.STRING
                    },


                    tags:{
                      type: Type.ARRAY,

                      items:{
                        type: Type.STRING
                      }
                    }

                  },


                  required:[
                    "id",
                    "question",
                    "options",
                    "correctAnswerId",
                    "correctAnswerText",
                    "explanation",
                    "difficulty",
                    "tags"
                  ]
                }
              }

            },

            required:[
              "topic",
              "difficulty",
              "questions"
            ]
          },


          evaluationLogic:{
            type: Type.OBJECT,

            properties:{

              rule:{
                type: Type.STRING
              },

              correctMessage:{
                type: Type.STRING
              },

              wrongMessage:{
                type: Type.STRING
              },

              showExplanation:{
                type: Type.BOOLEAN
              }

            },

            required:[
              "rule",
              "correctMessage",
              "wrongMessage",
              "showExplanation"
            ]
          }

        },


        required:[
          "quiz",
          "evaluationLogic"
        ]
      }
    }
  });


  try {

    const json =
      typeof response.text === "string"
        ? JSON.parse(response.text)
        : response.text;


    return validateQuizData(json as QuizData);


  } catch(error){

    console.error(
      "Gemini quiz generation failed:",
      error
    );

    throw new Error(
      "Unable to generate quiz. Please try again."
    );
  }
}