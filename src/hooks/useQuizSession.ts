const SESSION_KEY="ai_quiz_session";


export function saveQuizSession(data:any){

 sessionStorage.setItem(
   SESSION_KEY,
   JSON.stringify(data)
 );

}



export function getQuizSession(){

 const data =
 sessionStorage.getItem(
   SESSION_KEY
 );

 return data 
 ? JSON.parse(data)
 : null;

}



export function clearQuizSession(){

 sessionStorage.removeItem(
   SESSION_KEY
 );

}