// app.js
// App related content such as user handling, account management and UI optimizations.
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
window.db = firebase.firestore();

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
		window.user = user;

    if (!user.emailVerified) {
      $("#unverified").removeClass("hidden");
      return;
    }

    appContent(false);

  } else {
    window.location.replace("welcome.html");
  }
});


async function sendVerification(el) {
  await user.sendEmailVerification()
  
  $(el).addClass("hidden");
  $("#sentEmail").removeClass("hidden");
}

async function appContent(first) {
  if (window.location.href.includes('firebaseapp')) {
    // Production version: show browse
    if (!localStorage.getItem('firstTimeOpen')) {
      localStorage.setItem('firstTimeOpen', '.')
      tabe('first')
    }
    else {
      tabe('browse')
    }
  }
  else {
    tabe('dev')
  }

  initSpotifyCode();
  msgListener()

  doc = await db.collection("app").doc("details").get();
  window.cachedetails = doc.data();

  doc = await db.collection("users").doc(user.uid).get();
  if (!doc.exists) {
    $("#finish_profile").removeClass("hidden");
    return;
  }

  window.cacheUserTutorial = doc.data().tutorial
  if (!doc.data().tutorial) {
    cacheUserTutorial = []
  }
  window.cacheuser = doc.data();
  window.cacheUserFriendsMap = {[user.uid]: cacheuser.url}
  loadUserPlaylists(cacheuser.playlistsPreview);
  loadLibrary()

  if (first) {
    $("#userpfp1").get(0).src = 'https://firebasestorage.googleapis.com/v0/b/eonsound.appspot.com/o/app%2Fdefault.png?alt=media';
    $("#userpfp2").get(0).src = 'https://firebasestorage.googleapis.com/v0/b/eonsound.appspot.com/o/app%2Fdefault.png?alt=media'
  }
  else {
    $("#userpfp1").get(0).src = cacheuser.url;
    $("#userpfp2").get(0).src = cacheuser.url;
  }

  $("#usercard").imagesLoaded(function () {
    $("#usercard").removeClass("hidden");
  })
  $("#username1").html(`<b>${cacheuser.name}</b>${cacheuser.username}`);
}

async function createUser() {
  // Much to dangerous processes to create user locally. Refer to cloud function.
  // Duplicate formatting as to not take long for returning errors.

  if (/\s/g.test($("#usernamebox").val().toLowerCase())) {
    $("#createAccFeedback").removeClass("hidden");
    $("#createAccFeedback").html("Your username contains whitespace.");
    return;
  }

  if (cachedetails.usernames.includes($("#usernamebox").val().toLowerCase())) {
    $("#createAccFeedback").removeClass("hidden");
    $("#createAccFeedback").html("That username is taken!");
    return;
  }

  name = $("#namebox").val();
  username = $("#usernamebox").val().toLowerCase();

  await user.updateProfile({
    displayName: name,
  });

  toggleloader();
  $("#finish_profile").removeClass("fadeIn");
  $("#finish_profile").addClass("fadeOut");

  var createAccount = firebase.functions().httpsCallable("createAccount");
  createAccount({ username: username, displayname: name }).then((result) => {
    if (result.data) {
      toggleloader(); showcomplete();
      window.setTimeout(() => {
        appContent(true);
        window.setTimeout(() => {
          $("#finish_profile").addClass("hidden");
        }, 800);
      }, 1200);
    } else {
      alert("Error occured.");
      window.location.replace("404.html");
    }
  });
}

function logout() {
  Snackbar.show({pos: 'top-center', text: "Logging out..." });
  window.setTimeout(async () => {
    await firebase.auth().signOut()
  }, 500);
}

function preparenpicchange() {
  $("#pfpghost").empty();
  h = document.createElement("input");
  h.id = "newpicel";
  h.style.display = "none";
  h.setAttribute("type", "file");
  h.setAttribute("accept", "image/*");
  document.getElementById("pfpghost").appendChild(h);
  $("#newpicel").change(function () {
    changepfp();
  });
  $("#newpicel").click();
}

async function changepfp() {
  toggleloader();
  file = document.getElementById("newpicel").files[0];
  ext = file.name.split(".").pop();

  var storageRef = firebase.storage().ref();
  var fileRef = storageRef.child(`logos/${user.uid}.${ext}`);

  await fileRef.put(file);

  window.setTimeout(() => {
    toggleloader();
    showcomplete();

    // Change existing records
    document.getElementById("userpfp1").src = "https://firebasestorage.googleapis.com/v0/b/eonsound.appspot.com/o/logos%2F" + user.uid + "." + ext + "?alt=media&" + new Date().getTime();
    document.getElementById("userpfp2").src = "https://firebasestorage.googleapis.com/v0/b/eonsound.appspot.com/o/logos%2F" + user.uid + "." + ext + "?alt=media&" + new Date().getTime();
  }, 800);

  $("#newpicel").remove();
}

function shuffled(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}

async function copyText(text) {
  return new Promise((resolve, reject) => {
    navigator.clipboard.writeText(text).then(function() {
      Snackbar.show({pos: 'top-center', text: "Copied link to clipboard."})
      resolve('Yes')
    }, function(err) {
      alert("Unable to copy to clipboard. Text is shown below: \n\n" + text)
      resolve('yes')
    });
  })
}

function saveDefaultVolume() {
  localStorage.setItem('defaultVolume', $('#defaultVolume').html().split('%').shift())
  Snackbar.show({text: "Saved default volume and current volume set.", pos: 'top-center'})
  setDefaultVolume()
}

function setDefaultVolume() {
  var vol = localStorage.getItem('defaultVolume')
  if (!vol || vol == '100') {
    player.decreaseVolume(1)
    player.increaseVolume(1)
    $('#defaultvolumetext').html('Default Volume: 100%')
    return;
  }

  $('#defaultvolumetext').html('Default Volume: ' + vol + '%')

  var vol = parseFloat(`0.${vol}`)

  player.decreaseVolume(1)
  player.increaseVolume(vol)

}