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
import {
  hideLoader,
  showLoader,
  openLoginBtn,
  postsModelOverly,
} from "./modal.js";

let signupBtn = document.getElementById("signupBtn");
let loginBtn = document.getElementById("login-Btn");
let profileImg = document.getElementById("profile-id");
let userDetails = document.getElementById("details");
let loggedUserNameDiv = document.getElementById("logged-username");
let loggedEmailDiv = document.getElementById("logged-email");
let showDetails = true;
const logoutBtn = document.getElementById("logoutBtn");
const postBtn = document.getElementById("post-Btn");
let productsCardContainer = document.getElementById("products-container");
let allPosts = [];
let currentUser;

// FETCH DATA
async function fetchData() {
  showLoader();
  // CHECK CURRENT USER

  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser = user;
      // console.log(currentUser);

      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      openLoginBtn.style.display = "none";
      profileImg.style.display = "block";
      // loggedUserNameDiv.innerText = user.firstName;
      loggedEmailDiv.innerText = user.email;
    } else {
      // User is signed out
      openLoginBtn.style.display = "block";
      profileImg.style.display = "none";
      // ...
    }
  });
  // FETCH DATA
  const querySnapshot = await getDocs(collection(db, "allPosts"));
  querySnapshot.forEach((doc) => {
    allPosts.push({ id: doc.id, ...doc.data() });
    let post = doc.data();
    // console.log(`${doc.id} => `, doc.data());

    if (productsCardContainer) {
      productsCardContainer.innerHTML += `
    <a href="./product.html?pid=${doc.id}" target="_blank">
  <div class="product-card">
        <div class="product-image">
          <img
            src=${post.Img}
            alt="${post.title}"
          />
          <div class="product-price">Rs ${post.price}</div>
        </div>
        <div class="product-details">
          <h3 class="product-title">
            ${post.title}
          </h3>
          
          <div class="product-location">
            <i class="fas fa-map-marker-alt"></i>
            DHA Phase 8, Lahore
          </div>
          <div class="product-time">Post Time: ${new Date(post.postTime)}</div>
        </div>
      </div>
      </a>
  `;
    }
  });
  hideLoader();
}
fetchData();

// console.log(allUsers);

// CLASS FOR MAKING NEW USERS
class registerUser {
  constructor(uid, firstName, lastName, email, phoneNumber) {
    this.uid = uid;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.createdAt = new Date().toISOString();
    this.myPosts = [];
  }
}

// CLASS FOR MAKING POSTS
class post {
  constructor(image, title, price, description) {
    (this.img = image),
      (this.title = title),
      (this.price = price),
      (this.description = description);
    this.createdAt = new Date().toISOString();
  }
}

// SIGN UP FUNCTION
signupBtn.addEventListener("click", (e) => {
  let firstName = document.getElementById("first-name");
  let lastName = document.getElementById("last-name");
  let phoneNumber = document.getElementById("phone-number");
  let email = document.getElementById("signup-email");
  let password = document.getElementById("signup-password");
  // create User
  showLoader();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      let newUser = new registerUser(
        user.uid,
        firstName.value,
        lastName.value,
        email.value,
        phoneNumber.value
      );
      addDatatoDb(newUser);

      // addUserToDb(email.value, username.value, user.uid);
      hideLoader();
      swal("success", "Signed Up Successfully", "success").then(() => {
        location.reload();
      });
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

//LOGIN FUNCTION
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
    });
}

logoutBtn.addEventListener("click", logUserOut);

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
      uid: newUser.uid,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      createdTime: newUser.createdAt,
      myPosts: newUser.myPosts,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

postBtn.addEventListener("click", () => {
  if (currentUser) {
    console.log("entered");
    let image =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGw-k4MBGl_0dBibfnePkOnq6sBsUHCnnAsA&s";
    let title = document.getElementById("Add-title");
    let price = document.getElementById("price");
    let description = document.getElementById("post-details");
    let newPost = new post(image, title.value, price.value, description.value);
    console.log(newPost);
    addPostsToDb(newPost);
    showLoader();
  } else {
    swal("Error", "Please Login first!", "error");
  }
});

async function addPostsToDb(post) {
  try {
    const docRef = await addDoc(collection(db, "allPosts"), {
      uid: currentUser.uid,
      Img: post.img,
      title: post.title,
      price: post.price,
      description: post.description,
      postTime: post.createdAt,
    });
    swal("success", "Add posted successfully", "success").then(() => {
      location.reload();
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export { currentUser };
