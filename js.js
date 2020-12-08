alert("HELLLLO")
// const button = document.getElementsByClassName("serving_button").addEventListener("serving_button", console.log("Button!!"))
const buttonContainer = document.getElementsByClassName('serving_button');

Array.from(buttonContainer).forEach(b => {
  b.addEventListener("click", function() {
    console.log("clicked");
  });
});
console.log("test");