import { useEffect,useState } from "react";


interface Result{

userId:string;
topic:string;
percentage:number;
difficulty:string;

}


export default function ScoreWall(){


const [results,setResults]=
useState<Result[]>([]);



useEffect(()=>{


const data =
JSON.parse(
localStorage.getItem(
"quiz_results"
) || "[]"
);


setResults(
data.reverse()
);


},[]);



return (

<section className="
py-16
bg-[#050816]
">


<h2 className="
text-4xl
font-black
text-white
text-center
mb-10
">

🏆 Recent Quiz Scores

</h2>



<div className="
max-w-4xl
mx-auto
space-y-5
px-6
">


{
results.length===0 ?

<p className="
text-center
text-gray-400
">

No quiz attempts yet

</p>


:

results.map((item,index)=>(


<div

key={index}

className="
bg-white/5
border
border-white/10
rounded-2xl
p-6
flex
justify-between
text-white
backdrop-blur-xl
"


>


<div>


<h3 className="
text-blue-400
font-bold
">

{item.userId}

</h3>


<p className="
text-gray-400
">

{item.topic}

</p>


<p className="
text-sm
text-gray-500
">

{item.difficulty}

</p>


</div>



<div className="
text-right
">


<h2 className="
text-4xl
font-black
text-green-400
">

{item.percentage}%

</h2>


</div>



</div>


))

}



</div>


</section>


);


}