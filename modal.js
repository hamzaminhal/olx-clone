// Element selectors
const modalOverlay = document.getElementById("modalOverlay");
const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");

const openLoginBtn = document.getElementById("openLoginBtn");
const openSignupBtn = document.getElementById("openSignupBtn");

const closeLoginBtn = document.getElementById("closeLoginBtn");
const closeSignupBtn = document.getElementById("closeSignupBtn");

const switchToSignup = document.getElementById("switchToSignup");
const switchToLogin = document.getElementById("switchToLogin");

// Open modal
openLoginBtn.addEventListener("click", () => {
  modalOverlay.style.display = "flex";
  loginModal.style.display = "block";
  signupModal.style.display = "none";
});

openSignupBtn.addEventListener("click", () => {
  modalOverlay.style.display = "flex";
  loginModal.style.display = "none";
  signupModal.style.display = "block";
});

// Close modal
closeLoginBtn.addEventListener("click", () => {
  modalOverlay.style.display = "none";
});

closeSignupBtn.addEventListener("click", () => {
  modalOverlay.style.display = "none";
});

// Switch forms
switchToSignup.addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.style.display = "none";
  signupModal.style.display = "block";
});

switchToLogin.addEventListener("click", (e) => {
  e.preventDefault();
  signupModal.style.display = "none";
  loginModal.style.display = "block";
});
