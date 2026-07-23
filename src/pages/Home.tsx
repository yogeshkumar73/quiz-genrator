import {
  Brain,
  Sparkles,
  Target,
  Zap,
  ShieldCheck,
  Database,
  Cpu,
  FileText,
  BarChart3,
  Rocket,
  Layers
} from "lucide-react";

import { motion } from "framer-motion";

import Hero from "../components/Hero";
import ScoreWall from "../components/ScoreWall";


export default function Home() {


const features=[

{
icon:<Brain/>,
title:"AI Question Generation",
description:
"Generate high quality MCQs instantly using advanced Artificial Intelligence models."
},

{
icon:<Database/>,
title:"RAG Based Learning",
description:
"Create questions from your own documents and learning materials using Retrieval Augmented Generation."
},

{
icon:<Target/>,
title:"Smart Difficulty Control",
description:
"Choose beginner, intermediate or advanced levels according to your preparation needs."
},

{
icon:<Zap/>,
title:"Instant Answers",
description:
"Get answers, explanations and learning insights immediately after every quiz."
},

{
icon:<BarChart3/>,
title:"Performance Analytics",
description:
"Track your progress and understand your strengths and weaknesses."
},

{
icon:<ShieldCheck/>,
title:"Secure Learning",
description:
"Designed with secure architecture for reliable educational experiences."
}

];



return (

<main
className="
min-h-screen
bg-[#050816]
text-white
overflow-hidden
"
>


{/* Hero */}

<Hero />





{/* AI Introduction */}

<section
className="
relative
py-24
px-6
"
>


<div
className="
absolute
top-10
left-1/2
-translate-x-1/2
w-[600px]
h-[300px]
bg-purple-600/20
blur-[140px]
rounded-full
"
/>



<div
className="
relative
max-w-7xl
mx-auto
"
>


<div
className="
text-center
mb-16
"
>


<ScoreWall/>


<div
className="
inline-flex
items-center
gap-2
mt-8
px-5
py-2
rounded-full
bg-blue-500/10
border
border-blue-500/20
text-blue-400
"
>

<Sparkles size={18}/>

AI Powered Education

</div>



<h1
className="
mt-8
text-5xl
md:text-7xl
font-black
"
>

Learn Faster With

<span
className="
block
text-transparent
bg-clip-text
bg-gradient-to-r
from-blue-400
via-purple-400
to-pink-500
"
>

AI MCQ Generator

</span>

</h1>



<p
className="
mt-6
max-w-3xl
mx-auto
text-gray-400
text-xl
leading-8
"
>

Generate intelligent practice questions from any topic,
save preparation time and improve learning using AI,
RAG technology and personalized assessments.

</p>


</div>





{/* Feature Cards */}

<div
className="
grid
md:grid-cols-3
gap-8
"
>


{
features.map((item,index)=>(


<motion.div

key={index}

whileHover={{
y:-10
}}

className="
rounded-3xl
p-8
bg-white/[0.05]
border
border-white/10
backdrop-blur-xl
hover:border-blue-500/40
transition
"

>


<div
className="
w-14
h-14
rounded-2xl
flex
items-center
justify-center
bg-blue-500/10
text-blue-400
mb-6
"
>

{item.icon}

</div>



<h3
className="
text-2xl
font-bold
"
>

{item.title}

</h3>



<p
className="
mt-4
text-gray-400
leading-7
"
>

{item.description}

</p>



</motion.div>


))

}


</div>


</div>


</section>







{/* AI Workflow */}

<section
className="
py-24
px-6
bg-white/[0.03]
border-y
border-white/10
"
>


<div
className="
max-w-6xl
mx-auto
"
>


<h2
className="
text-center
text-5xl
font-bold
"
>

How AI Creates Your Quiz

</h2>



<div
className="
grid
md:grid-cols-4
gap-8
mt-16
"
>


<Process
icon={<FileText/>}
title="Upload Content"
text="Add notes, PDFs or learning materials."
/>


<Process
icon={<Cpu/>}
title="AI Analysis"
text="AI understands your learning content."
/>


<Process
icon={<Layers/>}
title="Generate MCQ"
text="Creates questions with answers."
/>


<Process
icon={<Rocket/>}
title="Improve"
text="Analyze results and learn better."
/>



</div>


</div>


</section>








{/* Statistics */}


<section
className="
py-24
px-6
"
>


<div
className="
max-w-6xl
mx-auto
grid
md:grid-cols-3
gap-8
"
>


<Stat
number="95%"
text="Faster Question Creation"
/>


<Stat
number="AI"
text="Powered Learning Engine"
/>


<Stat
number="24/7"
text="Instant Quiz Generation"
/>


</div>


</section>








{/* Vision CTA */}


<section
className="
px-6
pb-24
"
>


<div
className="
max-w-5xl
mx-auto
rounded-3xl
bg-gradient-to-r
from-blue-600/20
to-purple-600/20
border
border-white/10
p-12
text-center
"
>


<Sparkles
size={50}
className="
mx-auto
text-purple-400
mb-6
"
/>


<h2
className="
text-4xl
font-bold
"
>

The Future Of Smart Learning

</h2>


<p
className="
mt-5
text-gray-300
text-lg
leading-8
"
>

Our mission is to build an intelligent education ecosystem
where students can learn faster, teachers can create assessments
easily and AI becomes a powerful learning assistant.

</p>


</div>


</section>




</main>

);

}







function Process({
icon,
title,
text
}){

return (

<motion.div

whileHover={{
scale:1.05
}}

className="
text-center
bg-white/5
border
border-white/10
rounded-3xl
p-8
"

>


<div
className="
mx-auto
w-14
h-14
rounded-2xl
bg-purple-500/10
text-purple-400
flex
items-center
justify-center
"
>

{icon}

</div>


<h3
className="
mt-5
text-xl
font-bold
"
>

{title}

</h3>


<p
className="
mt-3
text-gray-400
"
>

{text}

</p>


</motion.div>

)

}





function Stat({
number,
text
}){


return (

<div
className="
rounded-3xl
bg-white/5
border
border-white/10
p-10
text-center
"
>

<h2
className="
text-5xl
font-black
text-blue-400
"
>

{number}

</h2>


<p
className="
mt-3
text-gray-400
text-lg
"
>

{text}

</p>


</div>

)

}