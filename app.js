import { auth } from "./config.js";
import { createUserWithEmailAndPassword } from "./methods.js";

let signupBtn = document.getElementById("signupBtn");

// Sign Up Logic

signupBtn.addEventListener("click", (e) => {
  let username = document.getElementById("signup-username");
  let email = document.getElementById("signup-email");
  let password = document.getElementById("signup-password");
  // create User

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, "=>", errorMessage);
      // ..
    });
});
