import { useState, useEffect } from "react";
import { getUserId } from "../utils/userId";
import { motion } from "framer-motion";
import {
  Loader2,
  Trophy,
  RotateCcw,
  ArrowLeft
} from "lucide-react";

import QuizForm from "../components/QuizForm";
import QuizCard from "../components/QuizCard";

import { generateQuiz } from "../services/gemini";
import { Difficulty, QuizData } from "../types";


export default function Quiz() {


  const [topic,setTopic] =
  useState("");


  const [difficulty,setDifficulty] =
  useState<Difficulty>("medium");


  const [numQuestions,setNumQuestions] =
  useState(5);


  const [context,setContext] =
  useState("");


  const [loading,setLoading] =
  useState(false);


  const [error,setError] =
  useState<string|null>(null);


  const [quizData,setQuizData] =
  useState<QuizData|null>(null);


  const [currentQuestionIndex,setCurrentQuestionIndex] =
  useState(0);


  const [selectedOptionId,setSelectedOptionId] =
  useState<number|null>(null);


  const [score,setScore] =
  useState(0);


  const [quizFinished,setQuizFinished] =
  useState(false);


  const [resultSaved,setResultSaved] =
  useState(false);



  // Save score dynamically

  const saveQuizResult = (
    finalScore:number,
    totalQuestions:number,
    percentage:number
  )=>{


    const userId =
    getUserId();


    const result = {

      id:
      crypto.randomUUID(),

      userId,

      topic:
      quizData?.quiz.topic,

      difficulty,

      score:
      finalScore,

      totalQuestions,

      percentage,

      createdAt:
      new Date().toISOString()

    };



    const oldResults =
    localStorage.getItem(
      "quiz_results"
    );


    const results =
    oldResults
    ?
    JSON.parse(oldResults)
    :
    [];


    results.push(result);



    localStorage.setItem(
      "quiz_results",
      JSON.stringify(results)
    );


  };





  // Save result after quiz finish

  useEffect(()=>{


    if(
      quizFinished &&
      quizData &&
      !resultSaved
    ){


      const percentage =
      Math.round(
        (
          score /
          quizData.quiz.questions.length
        )
        *
        100
      );



      saveQuizResult(
        score,
        quizData.quiz.questions.length,
        percentage
      );



      setResultSaved(true);


    }


  },[
    quizFinished,
    quizData,
    resultSaved
  ]);






  // Start Quiz

  const handleStartQuiz =
  async(
    e:React.FormEvent<HTMLFormElement>
  )=>{


    e.preventDefault();


    if(!topic.trim())
      return;



    setLoading(true);

    setError(null);



    try{


      const data =
      await generateQuiz(
        topic,
        difficulty,
        numQuestions,
        context
      );



      setQuizData(data);

      setCurrentQuestionIndex(0);

      setSelectedOptionId(null);

      setScore(0);

      setQuizFinished(false);

      setResultSaved(false);



    }
    catch(error){


      console.error(error);


      setError(
        "Unable to generate quiz. Try again."
      );


    }
    finally{


      setLoading(false);


    }


  };






  // Select answer

  const handleOptionSelect =
  (
    optionId:number
  )=>{


    if(
      !quizData ||
      selectedOptionId!==null
    )
    return;



    setSelectedOptionId(optionId);



    const currentQuestion =
    quizData.quiz.questions[
      currentQuestionIndex
    ];



    if(
      optionId ===
      currentQuestion.correctAnswerId
    ){


      setScore(
        previous =>
        previous + 1
      );


    }


  };






  // Next Question

  const handleNextQuestion =
  ()=>{


    if(!quizData)
      return;



    const total =
    quizData.quiz.questions.length;



    if(
      currentQuestionIndex <
      total - 1
    ){


      setCurrentQuestionIndex(
        previous =>
        previous + 1
      );


      setSelectedOptionId(null);


    }
    else{


      setQuizFinished(true);


    }

    


  };




  // Previous Question

  const handlePreviousQuestion =
  ()=>{


    if(
      currentQuestionIndex > 0
    ){


      setCurrentQuestionIndex(
        previous =>
        previous - 1
      );


      setSelectedOptionId(null);


    }


  };


  // New Quiz

 // New Quiz

const generateMoreQuiz = () => {

  setQuizData(null);

  setQuizFinished(false);

  setTopic("");

  setContext("");

  setDifficulty("medium");

  setScore(0);

  setCurrentQuestionIndex(0);

  setSelectedOptionId(null);

  setResultSaved(false);

};





// Loading Screen

if(loading){

  return (

    <main className="
    min-h-screen
    bg-[#050816]
    flex
    items-center
    justify-center
    text-white
    ">

      <div className="text-center">

        <Loader2
          size={60}
          className="
          mx-auto
          text-blue-400
          animate-spin
          "
        />

        <h2 className="text-3xl font-bold mt-6">
          Creating Quiz...
        </h2>

      </div>

    </main>

  );

}






// Result Screen

if(
  quizFinished &&
  quizData
){

const percentage =
Math.round(
(score / quizData.quiz.questions.length) * 100
);


return (

<main className="
min-h-screen
bg-[#050816]
flex
items-center
justify-center
px-6
">


<motion.div

initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

className="
max-w-xl
w-full
bg-white/5
border
border-white/10
rounded-3xl
p-10
text-center
text-white
"

>


<Trophy
size={70}
className="mx-auto text-yellow-400"
/>


<h1 className="
text-4xl
font-bold
mt-6
">

Quiz Completed

</h1>


<p className="text-gray-400 mt-3">
Your Final Performance
</p>



<div className="
mt-8
text-5xl
font-black
text-blue-400
">

{percentage}%

</div>



<p className="text-gray-300 mt-3">

Score {score} /
{quizData.quiz.questions.length}

</p>



<div className="
flex
gap-4
mt-10
">


<button

onClick={()=>{

setQuizFinished(false);

setCurrentQuestionIndex(0);

setSelectedOptionId(null);

}}

className="
flex-1
py-4
rounded-xl
bg-white/10
text-white
flex
justify-center
items-center
gap-2
"

>

<ArrowLeft size={20}/>

Review

</button>



<button

onClick={generateMoreQuiz}

className="
flex-1
py-4
rounded-xl
bg-gradient-to-r
from-blue-600
to-purple-600
text-white
flex
justify-center
items-center
gap-2
"

>

<RotateCcw size={20}/>

New Quiz

</button>


</div>



</motion.div>


</main>

);

}






// Quiz Screen

if(quizData){

return (

<main className="
min-h-screen
bg-[#050816]
py-16
">


<QuizCard

question={
quizData.quiz.questions[currentQuestionIndex]
}

questionNumber={
currentQuestionIndex + 1
}

totalQuestions={
quizData.quiz.questions.length
}

score={score}

selectedOptionId={
selectedOptionId
}

onOptionSelect={
handleOptionSelect
}

onNext={
handleNextQuestion
}

onPrevious={
handlePreviousQuestion
}

showPrevious={
currentQuestionIndex > 0
}

/>


</main>

);

}






// Form Screen

return (

<main className="
min-h-screen
bg-[#050816]
text-white
px-6
py-20
">


<section className="
max-w-5xl
mx-auto
">


<div className="text-center mb-12">


<h1 className="
text-6xl
font-black
">

Generate

<span className="
block
text-transparent
bg-gradient-to-r
from-blue-400
to-purple-500
bg-clip-text
">

Smart Quizzes

</span>


</h1>


</div>




<QuizForm

topic={topic}

setTopic={setTopic}

difficulty={difficulty}

setDifficulty={setDifficulty}

numQuestions={numQuestions}

setNumQuestions={setNumQuestions}

context={context}

setContext={setContext}

loading={loading}

error={error}

onSubmit={handleStartQuiz}

/>


</section>


</main>

);


}