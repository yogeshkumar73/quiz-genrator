import { v4 as uuid } from "uuid";


export function createSession(){

    let session =
    localStorage.getItem("quiz_session");


    if(!session){

        session = uuid();

        localStorage.setItem(
            "quiz_session",
            session
        );

    }


    return session;

}