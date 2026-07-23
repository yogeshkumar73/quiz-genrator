import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  ChevronRight,
  BookOpen,
  ArrowLeft,
} from "lucide-react";


interface Option {
  id: number;
  text: string;
}


interface Question {
  question: string;
  options: Option[];
  correctAnswerId: number;
  explanation: string;
  correctAnswerText?: string;
}


interface QuizCardProps {

  question: Question;

  questionNumber: number;

  totalQuestions: number;

  score: number;

  selectedOptionId: number | null;

  onOptionSelect: (id:number)=>void;

  onNext: ()=>void;

  onPrevious: ()=>void;

  showPrevious: boolean;

}



export default function QuizCard({

  question,

  questionNumber,

  totalQuestions,

  score,

  selectedOptionId,

  onOptionSelect,

  onNext,

  onPrevious,

  showPrevious,

}: QuizCardProps){


  const answered =
    selectedOptionId !== null;



  return (

    <div className="
    max-w-4xl
    mx-auto
    px-6
    py-12
    ">


      {/* Header */}

      <div className="
      flex
      justify-between
      items-center
      mb-8
      ">


        <div>

          <p className="
          text-blue-400
          font-semibold
          uppercase
          tracking-wider
          ">

            Question {questionNumber} of {totalQuestions}

          </p>


          <h2 className="
          text-3xl
          font-bold
          text-white
          mt-2
          ">

            Test Your Knowledge

          </h2>


        </div>




        <div className="
        bg-white/5
        border
        border-white/10
        px-5
        py-3
        rounded-xl
        text-center
        ">

          <p className="
          text-sm
          text-gray-400
          ">

            Score

          </p>


          <h3 className="
          text-2xl
          font-bold
          text-blue-400
          ">

            {score}

          </h3>


        </div>


      </div>





      {/* Progress Bar */}

      <div className="
      w-full
      h-2
      bg-white/10
      rounded-full
      mb-8
      overflow-hidden
      ">


        <motion.div

          initial={{
            width:0
          }}

          animate={{
            width:`${(questionNumber / totalQuestions) * 100}%`
          }}

          transition={{
            duration:0.4
          }}

          className="
          h-full
          bg-gradient-to-r
          from-blue-500
          to-purple-500
          "

        />


      </div>







      <AnimatePresence mode="wait">


        <motion.div


          key={questionNumber}


          initial={{
            opacity:0,
            x:40
          }}


          animate={{
            opacity:1,
            x:0
          }}


          exit={{
            opacity:0,
            x:-40
          }}


          className="
          bg-[#141414]
          border
          border-white/10
          rounded-3xl
          p-8
          shadow-2xl
          "


        >




          {/* Question */}

          <h2 className="
          text-2xl
          md:text-3xl
          font-semibold
          text-white
          leading-relaxed
          mb-8
          ">

            {question.question}

          </h2>







          {/* Options */}


          <div className="space-y-4">


            {
              question.options.map((option)=>{


                const correct =
                option.id === question.correctAnswerId;


                const selected =
                option.id === selectedOptionId;



                let style = `

                w-full
                rounded-2xl
                border
                p-5
                flex
                justify-between
                items-center
                text-left
                text-white
                transition-all
                duration-300

                `;




                if(!answered){


                  style += `

                  bg-[#1b1b1b]
                  border-white/10
                  text-white
                  hover:bg-blue-500/10
                  hover:border-blue-500
                  cursor-pointer

                  `;


                }


                else if(correct){


                  style += `

                  bg-green-500/10
                  border-green-500
                  text-green-400
                  font-semibold

                  `;


                }


                else if(selected){


                  style += `

                  bg-red-500/10
                  border-red-500
                  text-red-400
                  font-semibold

                  `;


                }


                else{


                  style += `

                  bg-[#1b1b1b]
                  border-white/5
                  text-gray-400
                  opacity-60

                  `;


                }






                return (

                  <button


                    key={option.id}


                    disabled={answered}


                    onClick={()=>onOptionSelect(option.id)}


                    className={style}


                  >



                    <span>

                      {option.text}

                    </span>





                    {
                      answered &&
                      correct &&
                      (

                        <CheckCircle2
                        className="
                        text-green-400
                        "
                        />

                      )
                    }





                    {
                      answered &&
                      selected &&
                      !correct &&
                      (

                        <XCircle
                        className="
                        text-red-400
                        "
                        />

                      )
                    }



                  </button>


                );


              })

            }



          </div>









          {/* Explanation */}


          {
            answered && (


              <motion.div


              initial={{
                opacity:0,
                y:20
              }}


              animate={{
                opacity:1,
                y:0
              }}


              className="mt-8"


              >




                <div className="
                rounded-2xl
                border
                border-blue-500/20
                bg-blue-500/5
                p-6
                ">



                  <div className="
                  flex
                  items-center
                  gap-2
                  mb-3
                  text-blue-400
                  ">


                    <BookOpen size={18}/>


                    <span className="font-semibold">

                      Explanation

                    </span>


                  </div>




                  <p className="
                  text-gray-300
                  leading-7
                  ">

                    {question.explanation}

                  </p>



                </div>









                {/* Buttons */}


                <div className="
                flex
                gap-4
                mt-8
                ">



                  {
                    showPrevious &&

                    <button

                    onClick={onPrevious}


                    className="
                    flex-1
                    py-4
                    rounded-xl
                    bg-white/10
                    hover:bg-white/20
                    text-white
                    flex
                    justify-center
                    items-center
                    gap-2
                    "

                    >

                      <ArrowLeft size={20}/>

                      Previous


                    </button>

                  }





                  <button


                  onClick={onNext}


                  className="
                  flex-1
                  py-4
                  rounded-xl
                  bg-gradient-to-r
                  from-blue-600
                  to-purple-600
                  text-white
                  font-semibold
                  flex
                  justify-center
                  items-center
                  gap-2
                  "


                  >


                    {
                      questionNumber === totalQuestions
                      ?
                      "Finish Quiz"
                      :
                      "Next Question"
                    }



                    <ChevronRight size={20}/>



                  </button>



                </div>





              </motion.div>


            )
          }





        </motion.div>


      </AnimatePresence>


    </div>

  );

}