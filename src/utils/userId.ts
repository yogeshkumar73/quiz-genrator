export function getUserId(){

  let userId = localStorage.getItem(
    "quiz_user_id"
  );


  if(!userId){

    userId =
      "#" +
      crypto.randomUUID()
      .slice(0,8)
      .toUpperCase();


    localStorage.setItem(
      "quiz_user_id",
      userId
    );

  }


  return userId;

}