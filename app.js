import { auth } from "./config.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "./methods.js";
import { hideLoader, showLoader, openLoginBtn } from "./modal.js";

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
      swal("Error", `${errorCode} => ${errorMessage}`, "error");
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
      swal("Error", `${errorCode} => ${errorMessage}`, "error");
    });
});

// Logout Function
function logUserOut() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      alert("User log out ho chuka he");
    })
    .catch((error) => {
      // An error happened.
      console.log("log out nh hua ");
    });
}

// check current user
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
