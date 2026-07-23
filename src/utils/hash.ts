export function generateUserHash(){

  return (
    "#" +
    Math.random()
      .toString(36)
      .substring(2,6)
      .toUpperCase()
    +
    "-" +
    Math.random()
      .toString(36)
      .substring(2,6)
      .toUpperCase()
  );

}