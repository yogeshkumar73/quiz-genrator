import { motion } from "framer-motion";
import { useState } from "react";

import {
  Brain,
  Code2,
  Database,
  Layers,
  Users,
  Zap,
  ShieldCheck,
  Cpu,
  Sparkles,
  Github,
  Linkedin,
  Mail,
  Globe,
  UserRound,
  Headset,
  Search,
  X
} from "lucide-react";



export default function Developer() {

const [selectedMember, setSelectedMember] = useState(null);
  const technologies = [
    {
      icon: Code2,
      title:"React + Vite",
      description:
      "Modern frontend architecture focused on speed, performance and scalable UI development."
    },

    {
      icon: Brain,
      title:"AI MCQ Generation",
      description:
      "Uses Generative AI to create intelligent MCQs with answers, explanations and evaluation."
    },

    {
      icon: Database,
      title:"RAG Architecture",
      description:
      "Retrieval Augmented Generation creates questions from custom learning materials."
    },

    {
      icon: Users,
      title:"Multi User System",
      description:
      "Designed for multiple learners with personalized quiz experiences."
    },

    {
      icon: Zap,
      title:"High Performance",
      description:
      "Optimized for fast quiz generation during exam preparation."
    },

    {
      icon: ShieldCheck,
      title:"Secure Platform",
      description:
      "Future-ready architecture with secure authentication and data protection."
    }
  ];




  return (

<main
className="
min-h-screen
bg-[#050816]
text-white
px-6
py-20
">


<section
className="
max-w-6xl
mx-auto
">


{/* Developer Profile */}

<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="mb-20 flex justify-center"
>

<div
className="
max-w-4xl
w-full
bg-white/5
backdrop-blur-xl
border
border-white/10
rounded-3xl
p-8
md:p-12
shadow-2xl
"
>


<div
className="
flex
flex-col
md:flex-row
items-center
gap-10
"
>


{/* Profile Image */}

<motion.div
whileHover={{ scale:1.05 }}
transition={{duration:0.3}}
className="relative"
>


<img

src="https://i.ibb.co/999n7wN5/yogesh-profile-under-1-MB2.jpg"

alt="Yogesh Kumar"

className="
w-40
h-40
rounded-full
object-cover
border-4
border-blue-500/40
shadow-2xl
"

/>



{/* Online Status */}

<div
className="
absolute
bottom-3
right-3
flex
items-center
justify-center
"
>


<motion.span

className="
absolute
w-5
h-5
rounded-full
bg-green-400
"

animate={{
scale:[1,2.5],
opacity:[0.8,0]
}}

transition={{
duration:1.5,
repeat:Infinity,
ease:"easeOut"
}}

/>



<span
className="
relative
w-5
h-5
rounded-full
bg-green-500
border-2
border-[#050816]
"
/>


</div>


</motion.div>







{/* Developer Info */}

<div
className="
text-center
md:text-left
flex-1
"
>


<h1
className="
text-4xl
font-black
"
>
Yogesh Kumar
</h1>



<p
className="
text-blue-400
text-lg
mt-2
"
>
Full Stack Developer
</p>




<p
className="
text-gray-400
mt-5
leading-8
"
>

Yogesh Kumar is a Full Stack Developer focused on building
modern web applications with scalable architecture, clean UI,
and efficient backend systems. Passionate about Artificial
Intelligence, problem solving, and creating technology solutions
that improve user experiences.

</p>







{/* Social Buttons */}

<div
className="
flex
justify-center
md:justify-start
gap-4
mt-8
"
>



{/* Github */}

<motion.a

href="https://github.com/yogeshkumar73"

target="_blank"

rel="noreferrer"

whileHover={{
scale:1.15,
rotate:5
}}

className="
p-3
rounded-xl
bg-white/10
hover:bg-blue-500/20
transition
"

>

<Github size={22}/>

</motion.a>






{/* Linkedin */}

<motion.a

href="https://www.linkedin.com/in/yogesh737930"

target="_blank"

rel="noreferrer"

whileHover={{
scale:1.15,
rotate:-5
}}

className="
p-3
rounded-xl
bg-white/10
hover:bg-blue-500/20
transition
"

>

<Linkedin size={22}/>

</motion.a>







{/* Email */}

<motion.a

href="mailto:yogeshkumar737930@gmail.com"

whileHover={{
scale:1.15
}}

className="
p-3
rounded-xl
bg-white/10
hover:bg-blue-500/20
transition
"

>

<Mail size={22}/>

</motion.a>



</div>


</div>


</div>


</div>


</motion.div>








{/* Hero */}

{/* Team Section */}

<section className="mb-20">

  <h2
    className="
    text-4xl
    font-bold
    text-center
    mb-12
    "
  >
    Meet Our Team
  </h2>


  <div
    className="
    grid
    md:grid-cols-3
    gap-8
    "
  >


    {/* Team Head */}

    <motion.div
  whileHover={{ y:-10 }}

  onClick={() =>
    setSelectedMember({

      title: "Dr. Kuldeep Prajapatee",

      role: "Manager • Education Professional",

      image:
      "https://i.ibb.co/4wJW4QH1/Gemini-Generated-Image-v0tey6v0tey6v0te.png",

      icon: UserRound,

      color: "text-green-400",


      skills: [
        "Educational Management",
        "Leadership",
        "Student Guidance",
        "Teaching & Learning",
        "Strategic Planning",
        "Philosophical Thinking"
      ],


      description:
      "Dr. Kuldeep Prajapatee is the Manager of the AI MCQ Generator initiative, bringing educational experience, leadership qualities, and a strong understanding of learning systems. With a background in Bachelor of Education (B.Ed), he focuses on improving educational processes and supporting innovative approaches to learning.",


      education:
      "Bachelor of Education (B.Ed) graduate with a deep interest in education, teaching methodologies, student development, and modern learning approaches.",


      vision:
      "A thoughtful education professional and philosopher who believes knowledge, technology, and human values should work together to create a better learning environment."

    })
  }


  className="
  cursor-pointer
  min-h-[330px]
  bg-white/5
  border
  border-white/10
  rounded-3xl
  p-10
  backdrop-blur-xl
  hover:border-green-500/50
  transition
  shadow-xl
  "
>


{/* Profile Image */}

<div className="flex justify-center mb-6">

<img
src="https://i.ibb.co/mF5pqtS4/Whats-App-Image-2025-11-03-at-12-39-19-PM-1.jpg"
alt="Dr. Kuldeep Prajapatee"
className="
w-24
h-24
rounded-full
object-cover
border-4
border-green-500/40
shadow-lg
"
/>

</div>



<h3 className="text-2xl font-bold">
Dr. Kuldeep Prajapatee
</h3>



<p className="text-green-400 mt-3">
Manager • Education Professional
</p>



<p className="text-gray-400 mt-6 leading-7">
Click to view profile, educational background, vision and responsibilities.
</p>



</motion.div>







    {/* Team Support */}

    <motion.div
  whileHover={{ y:-10 }}

  onClick={() =>
    setSelectedMember({

      title: "Team Support Member",

      role: "Community Support • Problem Solver",

      image:
      "https://i.ibb.co/d4ySB4k5/Whats-App-Image-2026-06-07-at-5-11-25-PM.jpg",

      icon: Headset,

      color: "text-green-400",


      skills: [
        "Communication Skills",
        "Problem Solving",
        "Community Management",
        "Team Coordination",
        "Creative Thinking",
        "Learning Support"
      ],


      description:
      "A dedicated Team Support member who contributes to the AI MCQ Generator project through communication, coordination, and problem-solving. Currently a 12th-grade student and Polytechnic student, he brings curiosity, dedication, and a practical mindset to support the team and improve the user experience.",


      education:
      "Completed 12th standard and pursuing Polytechnic education with an interest in technology, innovation, and practical learning.",


      vision:
      "A motivated learner who believes continuous improvement, teamwork, and problem-solving skills are essential for building successful projects and helping others."

    })
  }


  className="
  cursor-pointer
  min-h-[330px]
  bg-white/5
  border
  border-white/10
  rounded-3xl
  p-10
  backdrop-blur-xl
  hover:border-green-500/50
  transition
  shadow-xl
  "
>


{/* Profile Image */}

<div className="flex justify-center mb-6">

<img
src="https://i.ibb.co/d4ySB4k5/Whats-App-Image-2026-06-07-at-5-11-25-PM.jpg"
alt="Team Support"
className="
w-24
h-24
rounded-full
object-cover
border-4
border-green-500/40
shadow-lg
"
/>

</div>

<h2 className="text-2xl font-bold">
Abhishek Prajapati
</h2>

<h3 className="text-2xl font-bold">
Team Support
</h3>



<p className="text-green-400 mt-3">
Community Support • Problem Solver
</p>



<p className="text-gray-400 mt-6 leading-7">
Click to view profile, education background, skills and contribution.
</p>



</motion.div>




{/* Query Analyzer */}

<motion.div
  whileHover={{ y:-10 }}

  onClick={() =>
    setSelectedMember({

      title: "Pradeep Prajapati",

      role: "Query Analyzer • AI Support",

      image:
      "https://i.ibb.co/3X7P3WK/assets-task-01jy8w8kfqfa1vfbgs54cfhg2x-1750497340-img-2.webp",

      icon: Search,

      color: "text-purple-400",


      skills: [
        "Query Analysis",
        "Problem Solving",
        "Technical Support",
        "AI Learning",
        "Team Collaboration",
        "Creative Thinking"
      ],


      description:
      "Pradeep Prajapati works as the Query Analyzer for the AI MCQ Generator project. He focuses on understanding user queries, analyzing requirements, and helping improve the quality of generated questions. With a practical mindset and learning attitude, he supports the team in solving problems and improving system performance.",


      education:
      "12th Pass Out and ITI completed. Based in Hamirpur, Uttar Pradesh, with an interest in technology, practical skills, and continuous learning.",


      vision:
      "A dedicated learner who believes practical knowledge, curiosity, and problem-solving skills help create better solutions. He focuses on improving himself while contributing positively to innovative projects."

    })
  }


  className="
  cursor-pointer
  min-h-[330px]
  bg-white/5
  border
  border-white/10
  rounded-3xl
  p-10
  backdrop-blur-xl
  hover:border-purple-500/50
  transition
  shadow-xl
  "
>


{/* Profile Image */}

<div className="flex justify-center mb-6">

<img
src="https://i.ibb.co/3X7P3WK/assets-task-01jy8w8kfqfa1vfbgs54cfhg2x-1750497340-img-2.webp"
alt="Pradeep Prajapati"
className="
w-24
h-24
rounded-full
object-cover
border-4
border-purple-500/40
shadow-lg
"
/>

</div>



<h3 className="text-2xl font-bold">
Pradeep Prajapati
</h3>



<p className="text-purple-400 mt-3">
Query Analyzer • AI Support
</p>



<p className="text-gray-400 mt-6 leading-7">
Click to view profile, education background, skills and project contribution.
</p>



</motion.div>

  </div>
  {/* Team Details Modal */}

{
selectedMember && (

<div
className="
fixed
inset-0
z-50
bg-black/70
flex
items-center
justify-center
px-6
"
>


<motion.div
initial={{
scale:0.7,
opacity:0
}}

animate={{
scale:1,
opacity:1
}}

className="
relative
max-w-xl
w-full
bg-[#111827]
border
border-white/10
rounded-3xl
p-10
shadow-2xl
"
>


<button
onClick={() => setSelectedMember(null)}
className="
absolute
right-5
top-5
p-2
rounded-xl
bg-white/10
hover:bg-red-500/20
"
>

<X size={22}/>

</button>



<h2
className="
text-3xl
font-bold
"
>
{selectedMember.title}
</h2>



<p
className={`
mt-3
text-lg
${selectedMember.color}
`}
>
{selectedMember.role}
</p>



<p
className="
text-gray-300
leading-8
mt-6
"
>
{selectedMember.description}
</p>



<button
onClick={() => setSelectedMember(null)}
className="
mt-8
px-8
py-3
rounded-xl
bg-gradient-to-r
from-blue-600
to-purple-600
font-semibold
"
>
Close
</button>



</motion.div>


</div>

)
}


</section>


{/* Problem Solution */}


<div
className="
grid
md:grid-cols-2
gap-8
mb-20
"
>



<div
className="
bg-white/5
border
border-white/10
rounded-3xl
p-8
"
>


<h2
className="
text-3xl
font-bold
flex
gap-3
items-center
mb-5
"
>

<Cpu className="text-blue-400"/>

Problem

</h2>



<p
className="
text-gray-300
leading-8
"
>

Students and teachers spend a lot of time
creating MCQs manually. During exam preparation,
this process becomes slow and inefficient.

</p>


</div>







<div
className="
bg-white/5
border
border-white/10
rounded-3xl
p-8
"
>


<h2
className="
text-3xl
font-bold
flex
gap-3
items-center
mb-5
"
>

<Brain className="text-purple-400"/>

Solution

</h2>



<p
className="
text-gray-300
leading-8
"
>

This application generates high quality MCQs
instantly using AI and RAG technology from
custom learning content.

</p>


</div>


</div>









{/* Technology */}



<h2
className="
text-4xl
font-bold
text-center
mb-12
"
>

Technology Stack

</h2>




<div
className="
grid
md:grid-cols-3
gap-6
"
>


{
technologies.map((item,index)=>{


const Icon=item.icon;


return(


<motion.div

key={index}

whileHover={{
scale:1.05
}}

className="
bg-[#111827]
border
border-white/10
rounded-3xl
p-7
"

>


<Icon
size={35}
className="
text-blue-400
mb-5
"
/>


<h3
className="
text-xl
font-bold
mb-3
"
>

{item.title}

</h3>



<p
className="
text-gray-400
leading-7
"
>

{item.description}

</p>



</motion.div>


)


})

}



</div>









{/* Future */}



<motion.div

className="
mt-20
bg-gradient-to-r
from-blue-600/20
to-purple-600/20
border
border-white/10
rounded-3xl
p-10
"

>


<h2
className="
text-3xl
font-bold
flex
gap-3
items-center
mb-5
"
>


<Layers className="text-purple-400"/>

Future Vision


</h2>



<p
className="
text-gray-300
leading-8
"
>

The goal is to create a complete AI learning
ecosystem with quiz analytics, user profiles,
multi-user collaboration, AI assistance and
scalable cloud infrastructure.

</p>



</motion.div>





</section>


</main>

  );
}