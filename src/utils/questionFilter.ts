export function removeDuplicateQuestions(
questions:any[]
){


const map=new Map();


return questions.filter(q=>{

const key=
q.question
.toLowerCase()
.trim();


if(map.has(key))
{
return false;
}


map.set(key,true);

return true;


});


}