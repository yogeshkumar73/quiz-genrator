import { Sparkles, Brain, Target, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
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


        {/* Hero Section */}

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
            text-center
            mb-16
          "

        >

          <div className="
            flex
            justify-center
            mb-6
          ">

            <div className="
              p-5
              rounded-full
              bg-gradient-to-r
              from-blue-500
              to-purple-600
            ">

              <Sparkles size={45}/>

            </div>

          </div>


          <h1 className="
            text-5xl
            md:text-6xl
            font-black
          ">

            About

            <span className="
              block
              text-transparent
              bg-gradient-to-r
              from-blue-400
              to-purple-500
              bg-clip-text
            ">

              AI Quiz Generator

            </span>

          </h1>


          <p className="
            mt-6
            text-lg
            text-gray-400
            max-w-3xl
            mx-auto
            leading-relaxed
          ">

            An intelligent quiz creation platform powered by Artificial
            Intelligence that helps students, educators, and professionals
            generate meaningful quizzes instantly.

          </p>


        </motion.div>





        {/* Features */}

        <div className="
          grid
          md:grid-cols-3
          gap-6
        ">


          <FeatureCard

            icon={<Brain size={32}/>}
            title="AI Powered"
            description="
            Uses advanced AI technology to create
            high-quality multiple choice questions
            based on your selected topic.
            "

          />



          <FeatureCard

            icon={<Target size={32}/>}
            title="Smart Learning"
            description="
            Helps improve knowledge retention with
            instant answers, explanations, and
            performance tracking.
            "

          />



          <FeatureCard

            icon={<Zap size={32}/>}
            title="Fast Generation"
            description="
            Generate customized quizzes in seconds
            with adjustable difficulty and question count.
            "

          />


        </div>






        {/* Mission */}

        <motion.div

          initial={{
            opacity:0
          }}

          whileInView={{
            opacity:1
          }}

          className="
            mt-16
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-10
            backdrop-blur-xl
          "

        >


          <h2 className="
            text-3xl
            font-bold
            mb-4
          ">

            Our Mission

          </h2>


          <p className="
            text-gray-300
            leading-8
          ">

            Our goal is to make learning more interactive and accessible
            by combining artificial intelligence with modern education.
            The AI Quiz Generator transforms any topic into an engaging
            learning experience with personalized questions and instant
            feedback.

          </p>


        </motion.div>



      </section>


    </main>
  );
}





function FeatureCard({
  icon,
  title,
  description
}:{
  icon:React.ReactNode;
  title:string;
  description:string;
}){

  return (

    <motion.div

      whileHover={{
        y:-8
      }}

      className="
        bg-white/5
        border
        border-white/10
        rounded-3xl
        p-8
        backdrop-blur-xl
        transition
      "

    >

      <div className="
        text-blue-400
        mb-5
      ">

        {icon}

      </div>


      <h3 className="
        text-xl
        font-bold
        mb-3
      ">

        {title}

      </h3>


      <p className="
        text-gray-400
        leading-7
      ">

        {description}

      </p>


    </motion.div>

  );

}