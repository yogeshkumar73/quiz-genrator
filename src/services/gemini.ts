import { GoogleGenAI, Type } from "@google/genai";
import { QuizData, Difficulty } from "../types";


const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || ""
});



export async function generateQuiz(
  topic: string,
  difficulty: Difficulty = "medium",
  numQuestions: number = 5,
  context?: string
): Promise<QuizData> {


const prompt = `

You are an advanced AI quiz generator for a React learning application.

Generate a high quality MCQ quiz.

INPUT:

Topic:
${topic}

Difficulty:
${difficulty}

Number of Questions:
${numQuestions}

Additional Context:
${context || "No context provided"}



RULES:

1. Generate exactly ${numQuestions} questions.
2. Every question must have exactly 4 options.
3. Only one answer can be correct.
4. Questions must not repeat.
5. Match difficulty level.
6. Keep explanations short and educational.
7. If context is provided, ONLY use that information.
8. Return JSON only.
9. Never return markdown.
10. Never return null values.



Each question must contain:

- id
- question
- options
- correctAnswerId
- correctAnswerText
- explanation
- difficulty
- tags



Evaluation:

The frontend checks:

selectedOptionId === correctAnswerId



Return format:

{
 "quiz":{
   "topic":"string",
   "difficulty":"string",
   "questions":[
     {
       "id":1,
       "question":"string",
       "options":[
          {
            "id":0,
            "text":"string"
          }
       ],
       "correctAnswerId":0,
       "correctAnswerText":"string",
       "explanation":"string",
       "difficulty":"string",
       "tags":[
          "string"
       ]
     }
   ]
 },
 "evaluationLogic":{
   "rule":"Compare selectedOptionId with correctAnswerId",
   "correctMessage":"Correct answer 🎉",
   "wrongMessage":"Wrong answer ❌",
   "showExplanation":true
 }
}

`;



const response = await ai.models.generateContent({

model:"gemini-3-flash-preview",

contents:prompt,

config:{

responseMimeType:"application/json",


responseSchema:{

type:Type.OBJECT,


properties:{


quiz:{

type:Type.OBJECT,

properties:{


topic:{
type:Type.STRING
},


difficulty:{
type:Type.STRING
},


questions:{

type:Type.ARRAY,


items:{

type:Type.OBJECT,


properties:{


id:{
type:Type.INTEGER
},


question:{
type:Type.STRING
},


options:{

type:Type.ARRAY,

items:{

type:Type.OBJECT,

properties:{

id:{
type:Type.INTEGER
},

text:{
type:Type.STRING
}

},

required:[
"id",
"text"
]

}

},


correctAnswerId:{
type:Type.INTEGER
},


correctAnswerText:{
type:Type.STRING
},


explanation:{
type:Type.STRING
},


difficulty:{
type:Type.STRING
},


tags:{

type:Type.ARRAY,

items:{
type:Type.STRING
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

type:Type.OBJECT,


properties:{


rule:{
type:Type.STRING
},


correctMessage:{
type:Type.STRING
},


wrongMessage:{
type:Type.STRING
},


showExplanation:{
type:Type.BOOLEAN
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




try{


const result = JSON.parse(response.text);



if(
 !result.quiz ||
 !result.quiz.questions ||
 result.quiz.questions.length === 0
){

throw new Error(
"Invalid quiz generated"
);

}



return result;



}catch(error){


console.error(
"Gemini Quiz Error:",
error
);


throw new Error(
"Unable to generate quiz"
);


}

}