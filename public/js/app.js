fetch("http://puzzle.mead.io/puzzle").then((responce) => {
  responce.json().then((data) => {
    console.log(data);
  });
});

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  if (location === "" || location === null) {
    console.log("Enter some address");
  } else {
    fetch("http://localhost:3000/weather?address=" + location).then(
      (responce) => {
        responce.json().then((data) => {
          if (data.error) {
            //return console.log(data.error);
            messageOne.textContent = data.error;
          } else {
            // console.log(data.location);
            // console.log(data.info);
            messageOne.textContent = data.location;
            messageTwo.textContent = data.info;
          }
        });
      }
    );
  }
});
