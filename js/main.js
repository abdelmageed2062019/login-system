var registerBtn = document.getElementById("register-btn");
var loginBtn = document.getElementById("login-btn");
var logoutBtn = document.getElementById("logout-btn");

var homePageUserName = document.getElementById("user-name");

var homePageContent = document.querySelector(".homePage");

var storedUsers = JSON.parse(localStorage.getItem("users")) || [];
var currUser = JSON.parse(localStorage.getItem("currentUser"));

//redirect
showLoading();
if (!currUser) {
  if (window.location.pathname === "/home.html") {
    window.location.href = "index.html";
  }
} else {
  if (
    window.location.pathname === "/index.html" ||
    window.location.pathname === "/register.html"
  ) {
    window.location.href = "home.html";
  }
}
hideLoading();

//home content
if (currUser != null) {
  homePageUserName.innerHTML = `${currUser.username}`;
}
//regex
var emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var usernameRegex = /^[a-zA-Z0-9]+$/;

function isValidEmail(email) {
  return emailRegex.test(email);
}

function isValidUserName(username) {
  return usernameRegex.test(username);
}
//auth fns
function register() {
  var username = document.getElementById("registerUsername").value;
  var password = document.getElementById("registerPassword").value;
  var email = document.getElementById("registerEmail").value;
  var success = document.querySelector(".valid-feedback");

  if (username.trim() === "" || password.trim() === "" || email.trim() === "") {
    document.getElementById("validationEmpty").style.display = "block";
    return;
  }

  if (!isValidUserName(username)) {
    document.getElementById("validationName").style.display = "block";
    return;
  }

  if (password.length < 8) {
    document.getElementById("validationPassword").style.display = "block";
    return;
  }

  if (!isValidEmail(email)) {
    document.getElementById("validationRegisterEmail").style.display = "block";
    return;
  }

  var existingUser = storedUsers.find((user) => user.email === email);
  if (existingUser) {
    document.getElementById("validationExist").style.display = "block";
    return;
  }

  var user = {
    username,
    password,
    email,
  };
  storedUsers.push(user);
  localStorage.setItem("users", JSON.stringify(storedUsers));
  success.style.display = "block";
  document.getElementById("validationName").style.display = "none";
  document.getElementById("validationRegisterEmail").style.display = "none";
  document.getElementById("validationPassword").style.display = "none";
  document.getElementById("validationEmpty").style.display = "none";
  document.getElementById("validationExist").style.display = "none";
}

function login() {
  var password = document.getElementById("loginPassword").value;
  var email = document.getElementById("loginEmail").value;

  if (email.trim() === "" || password.trim() === "") {
    document.getElementById("validationEmpty").style.display = "block";
    return;
  }

  var user = storedUsers.find((u) => u.email === email);

  if (user && user.password === password) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "home.html";
  } else {
    document.getElementById("validationLogin").style.display = "block";
  }
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

function showLoading() {
  var loadingOverlay = document.getElementById("loading-overlay");
  if (loadingOverlay) {
    loadingOverlay.style.display = "flex";
  }
}

function hideLoading() {
  var loadingOverlay = document.getElementById("loading-overlay");
  if (loadingOverlay) {
    loadingOverlay.style.display = "none";
  }
}

//events
if (registerBtn != null) {
  registerBtn.addEventListener("click", register);
}
if (loginBtn != null) {
  loginBtn.addEventListener("click", login);
}

if (logoutBtn != null) {
  logoutBtn.addEventListener("click", logout);
}

//cursor fn
const updateCursor = ({ x, y }) => {
  document.documentElement.style.setProperty("--x", x);
  document.documentElement.style.setProperty("--y", y);
};

document.body.addEventListener("pointermove", updateCursor);
