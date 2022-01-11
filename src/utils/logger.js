
export default async (errorMessage, level, req) => {
  let log = {
    level: level,
    errorMessage: errorMessage,
  };


  console.log(log);
}
