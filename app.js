import { auth } from "./config";
import { createUserWithEmailAndPassword } from "./methods";

let hamburger = document.querySelector("#hamburger");

function toggleMenu() {
  document.querySelector("header").classList.toggle("active");
}

hamburger.addEventListener("click", toggleMenu);

// create User
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
