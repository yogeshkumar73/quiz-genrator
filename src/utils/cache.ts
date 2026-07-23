const CACHE_KEY="quiz_cache";


export function createHash(
topic:string,
difficulty:string,
amount:number
){

return `${topic}-${difficulty}-${amount}`
.toLowerCase();

}



export function saveCache(
key:string,
data:any
){

const cache =
JSON.parse(
localStorage.getItem(CACHE_KEY) || "{}"
);


cache[key]=data;


localStorage.setItem(
CACHE_KEY,
JSON.stringify(cache)
);


}




export function getCache(key:string){

const cache =
JSON.parse(
localStorage.getItem(CACHE_KEY)||"{}"
);


return cache[key] || null;

}




export function clearCache(){

localStorage.removeItem(
CACHE_KEY
);

}