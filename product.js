import { auth, db } from "./config.js";
import { collection, getDocs } from "./methods.js";

let id = new URLSearchParams(window.location.search);
let postId = id.get("pid");
let addData;
let allPosts = [];
let addOwner;

let displayImage = document.getElementById("display-image");
let priceContainer = document.getElementById("priceContainer");
let titleContainer = document.getElementById("addTitle");
let detailContainer = document.getElementById("productDetails");
let ownerNameContainer = document.getElementById("ownerName");
console.log(postId);

// GET AND SHOW ADDS
async function showAdd() {
  const querySnapshot = await getDocs(collection(db, "allPosts"));
  querySnapshot.forEach((doc) => {
    allPosts.push({ postId: doc.id, ...doc.data() });
    console.log(allPosts);
  });
  allPosts.forEach((post) => {
    if (postId === post.postId) {
      console.log("matched");
      addData = post;
    }
  });
}
showAdd().then(() => {
  displayComponents(addData);
});

// GET OWNER DETAILS
const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  // console.log(`${doc.id} =>`, doc.data());
  // console.log(addData);

  if (addData.uid === doc.data().uid) {
    addOwner = doc.data();
    console.log("owner=", doc.data().firstName);
    ownerNameContainer.innerText = addOwner.firstName;
  }
});

console.log(addOwner.firstName);
// DISPLAY COMPONENTS
function displayComponents(addData) {
  displayImage.innerHTML = `<img src="${addData.Img}" alt=${addData.title} />`;
  priceContainer.innerHTML = `RS ${addData.price}`;
  titleContainer.innerText = addData.title;
  detailContainer.innerHTML = `
          <h2 class="section-title">Details</h2>
          <div>${addData.description}</div>
          <hr />

          <div class="ad-info">
            <p><strong>Ad ID: 1104487363</strong></p>
            <a href="#" class="report-link">Report this ad</a>
          </div>`;
}
