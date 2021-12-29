// index.js
// Sign in / sign up page.

var firebaseConfig = {
  apiKey: "AIzaSyBNf1JpByuDebVLq_lns8fYv4Pyo3kzvoM",
  authDomain: "eonsound.firebaseapp.com",
  databaseURL: "https://eonsound.firebaseio.com",
  projectId: "eonsound",
  storageBucket: "eonsound.appspot.com",
  messagingSenderId: "824179683788",
  appId: "1:824179683788:web:81830e10e40b4b887ded69",
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // Authenticate via spotify
    window.location.replace('auth.html');
  } else {
    // Do nothing and allow them to sign in.
  }
});

function switchLogup(el) {
  $(el).attr("onclick", "switchLogin(this)");
  $(el).html("Login");
  $("#signtitle").html("Create an account");
  $("#submitbtn").attr("onclick", "signup()");
}

function switchLogin(el) {
  $(el).attr("onclick", "switchLogup(this)");
  $(el).html("Create an Account");
  $("#signtitle").html("Sign In");
  $("#submitbtn").attr("onclick", "login()");
}

function login() {
  email = $("#emailbox").val();
  pass = $("#passbox").val();

  firebase.auth().signInWithEmailAndPassword(email, pass).catch(function (error) {
    alert(error.message + "\n\n" + ">: " + error.code);
  });
}

function signup() {
  email = $("#emailbox").val();
  pass = $("#passbox").val();

  firebase.auth().createUserWithEmailAndPassword(email, pass).then(() => {
    alert(`
      Welcome, new user!\n\n
      EonSound requires authentication with Spotify to allow songs to be discovered.\n Ensure you have a Spotify account and sign in once you are redirected. 
    `)
  }).catch(function (error) { 
    alert(error.message + "\n\n" + ">: " + error.code);
  });
}