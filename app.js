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
let profileImg = document.getElementById("profile-id");
let userDetails = document.getElementById("details");
let loggedUserNameDiv = document.getElementById("logged-username");
let showDetails = true;
const logoutBtn = document.getElementById("logoutBtn");

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
      profileImg.classList.remove("hide");

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
      swal("success", "Logged Out Successfully", "info");
      profileImg.classList.add("hide");
      userDetails.classList.add("hide");
    })
    .catch((error) => {
      // An error happened.
      console.log("log out nh hua ");
    });
}
logoutBtn.addEventListener("click", logUserOut);

// check current user
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;

    openLoginBtn.style.display = "none";
    profileImg.style.display = "block";
    loggedUserNameDiv.innerText = uid;
    console.log("user login he");

    // ...
  } else {
    // User is signed out
    openLoginBtn.style.display = "block";
    profileImg.style.display = "none";
    console.log("user dafa hogya he");
    // ...
  }
});

profileImg.addEventListener("click", () => {
  if (showDetails) {
    userDetails.classList.remove("hide");
    showDetails = false;
  } else {
    userDetails.classList.add("hide");
    showDetails = true;
  }
});
