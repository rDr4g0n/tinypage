import "./index.css";

function dang(){
  const result = "yeah"
  return Promise.resolve().then(() => result);
}

dang().then(result => console.log("work?", result));
