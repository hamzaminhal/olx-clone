import { auth } from "./config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "./methods.js";
import { hideLoader, showLoader } from "./modal.js";

let signupBtn = document.getElementById("signupBtn");
let loginBtn = document.getElementById("login-Btn");

// Sign Up Logic

signupBtn.addEventListener("click", (e) => {
  let username = document.getElementById("signup-username");
  let email = document.getElementById("signup-email");
  let password = document.getElementById("signup-password");
  // create User
  showLoader();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      hideLoader();
      swal("success", "Signed Up Successfully", "success");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, "=>", errorMessage);
      // ..
    });
});

//Login Logic

loginBtn.addEventListener("click", () => {
  let email = document.getElementById("login-email");
  let password = document.getElementById("login-password");
  showLoader();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      hideLoader();
      swal("success", "Logged In Successfully", "success");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      swal("Warning", `Signed Up Invalid Credentials${errorMessage}`, "error");
    });
});
