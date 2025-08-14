import { auth, db } from "./config.js";
import {
  addDoc,
  collection,
  createUserWithEmailAndPassword,
  getDocs,
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
let loggedEmailDiv = document.getElementById("logged-email");
let showDetails = true;
const logoutBtn = document.getElementById("logoutBtn");
let allUsers = [];

// FETCH USERS
const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  allUsers.push(doc.data());
  console.log(`${doc.id} => `, doc.data());
});

// CLASS FOR MAKING NEW USERS
class registerUser {
  constructor(uid, username, email) {
    this.uid = uid;
    this.username = username;
    this.email = email;
    this.createdAt = new Date().toISOString();
    this.myPosts = [];
  }
}

// SIGN UP FUNCTION
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
      let newUser = new registerUser(user.uid, username.value, email.value);
      addDatatoDb(newUser);

      // addUserToDb(email.value, username.value, user.uid);
      hideLoader();
      swal("success", "Signed Up Successfully", "success");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      swal("Error", errorMessage, "error").then(() => {
        location.reload();
      });
      console.log(errorCode, "=>", errorMessage);
      // ..
    });
});

//LLOGIN FUNCTION
loginBtn.addEventListener("click", () => {
  let email = document.getElementById("login-email");
  let password = document.getElementById("login-password");
  showLoader();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      swal("success", "Logged In Successfully", "success");
      profileImg.classList.remove("hide");
      loginBtn.classList.add("hide");
      hideLoader();
      modalOverlay.style.display = "none";
      // ...
    })
    .catch((error) => {
      //An error happened.
      const errorCode = error.code;
      const errorMessage = error.message;
      swal("Error", errorMessage, "error").then(() => {
        location.reload();
      });
    });
});

// LOGOUT FUNCTION
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

// CHECK CURRENT USER
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    openLoginBtn.style.display = "none";
    profileImg.style.display = "block";
    loggedUserNameDiv.innerText = uid;
    loggedEmailDiv.innerText = user.email;
    // console.log(user);
  } else {
    // User is signed out
    openLoginBtn.style.display = "block";
    profileImg.style.display = "none";
    // ...
  }
});

//TOGGLE BUTTON ON PROFILE IMAGE
profileImg.addEventListener("click", () => {
  if (showDetails) {
    userDetails.classList.remove("hide");
    showDetails = false;
  } else {
    userDetails.classList.add("hide");
    showDetails = true;
  }
});

// ADDING DATA TO FIRESTORE
async function addDatatoDb(newUser) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      username: newUser.username,
      email: newUser.email,
      createdTime: newUser.createdAt,
      myPosts: newUser.myPosts,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
