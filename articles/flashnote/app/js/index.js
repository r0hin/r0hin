
function signGoogle() {
  try {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider)
  }
  catch (err) {
    $('#errorModal').modal('toggle')
    document.getElementById('errMsg').innerHTML = err
  }

}

function signOut() {
  firebase.auth().signOut();
  location.reload()
}

function signEmail() {
  email = document.getElementById('email1').value
  password = document.getElementById('password1').value
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorMessage = error.message;

    $('#errorModal').modal('toggle')
    document.getElementById('errMsg').innerHTML = errorMessage
    // ...
  });

}

function createEmail() {
  name = document.getElementById('name2323').value
  email = document.getElementById('email2').value
  password = document.getElementById('password2').value
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorMessage = error.message;

    $('#errorModal').modal('toggle')
    document.getElementById('errMsg').innerHTML = errorMessage
    // ...
  }).then(function () {
    firebase.auth().currentUser.updateProfile({
      displayName: name2323
    })
  });

}


var userPicElement = document.getElementById('user-pic');
var userNameElement = document.getElementById('user-name');
var userNameElement2 = document.getElementById('user-name2');
var userEmailElement = document.getElementById('user-email');
var userDateCreatedElement = document.getElementById('user-date-created');
var signedIn = document.getElementById('Signed');
var signedOut = document.getElementById('unSigned');


function getProfilePicUrl() {
  return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
}

// Returns the signed-in user's display name.
function getUserName() {
  return firebase.auth().currentUser.displayName;
}

function getUserEmail() {
  return firebase.auth().currentUser.email;
}

function getUserDateCreated() {

  return 'deprecated'
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
  return !!firebase.auth().currentUser;
}


function initFirebaseAuth() {
  // Listen to auth state changes.
  firebase.auth().onAuthStateChanged(authStateObserver);
}

function addSizeToGoogleProfilePic(url) {
  if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
    return url + '?sz=150';
  }
  return url;
}

function user() {
  return firebase.auth().currentUser.uid
}

function authStateObserver(user) {
  if (user) { // User is signed in!
    console.log('User is signed in')

    db.collection('users').doc(firebase.auth().currentUser.uid).get().then(function (doc) {
      console.log(doc.data().skipland)
      if (doc.data().skipland == true) {

        if (doc.data().dark == 'light') {
          document.getElementById('body').classList.add('fadeOut')
          window.setTimeout(function () {
            window.location.replace('home.html')
          }, 0)
        }
        else if (doc.data().dark == 'dark') {
          document.getElementById('body').classList.add('fadeOut')
          document.getElementById('body').classList.add('bodDarken')
          window.setTimeout(function () {
            window.location.replace('homedark.html')
          }, 0)

        }



      }
    })


    // Get the signed-in user's profile pic and name.
    var profilePicUrl = getProfilePicUrl();
    var userName = getUserName();
    var userEmail = getUserEmail();
    var userDateCreated = getUserDateCreated();

    // Set the user's profile pic and name.
    userPicElement.src = addSizeToGoogleProfilePic(profilePicUrl)
    userNameElement.textContent = userName;
    userNameElement2.textContent = userName;

    userEmailElement.textContent = userEmail;

    // Hide sign-in button.
    signedIn.style.display = 'block';
    signedOut.style.display = 'none';

    addPhoto()





    // We save the Firebase Messaing Device token and enable notifications.

  } else { // User is signed out!
    // Hide user's profile and sign-out button.


    signedIn.style.display = 'none';
    signedOut.style.display = 'block';






  }


  try {
    var firstTime = db.collection('users').doc(firebase.auth().currentUser.uid);
    firstTime.get().then(function (doc) {
      if (doc.exists) {
        document.getElementById('first').style.display = 'none'
        document.getElementById('returning').style.display = 'block'
        console.log("returning user.")
      } else {
        // doc.data() will be undefined in this case
        document.getElementById('first').style.display = 'block'
        document.getElementById('returning').style.display = 'none'
        console.log("first time user.")
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

  }
  catch (error) {
    console.log('some sort of error (likely not signed in):' + error)
  }
  document.getElementById('loader').classList.add('fadeOutUpBig')
}




function startFirst() {

  var light = document.getElementById('customRadioInline1').checked
  var dark = document.getElementById('customRadioInline2').checked
  var minimal = document.getElementById('customRadioInline3').checked
  var typewriter = document.getElementById('customRadioInline4').checked

  if (light == true) {
    x = 'light'
  }
  if (dark == true) {
    x = 'dark'
  }
  if (minimal == true) {
    y = 'minimal'
  }
  if (typewriter == true) {
    y = 'typewriter'
  }
  var uploadRef = db.collection('users').doc(user());
  var setWithMerge = uploadRef.set({
    dark: x,
    font: y,
    skipland: false,
  }, { merge: true });

  refresh()


}

function startReturn() {
  refresh()
}





function settings() {

  var light = document.getElementById('customRadioInline11').checked
  var dark = document.getElementById('customRadioInline22').checked
  var minimal = document.getElementById('customRadioInline33').checked
  var typewriter = document.getElementById('customRadioInline44').checked

  if (light == true) {
    x = 'light'
  }
  if (dark == true) {
    x = 'dark'
  }
  if (minimal == true) {
    y = 'minimal'
  }
  if (typewriter == true) {
    y = 'typewriter'
  }
  var uploadRef = db.collection('users').doc(user());
  var setWithMerge = uploadRef.set({
    dark: x,
    font: y,
  }, { merge: true });


}




function refresh() {


  var firstTime = db.collection('users').doc(user());
  firstTime.get().then(function (doc) {
    if (doc.exists) {
      if (doc.data().dark == 'light') {
        document.getElementById('body').classList.add('fadeOut')
        window.setTimeout(function () {
          window.location.replace('home.html')
        }, 500)
      }
      else if (doc.data().dark == 'dark') {
        document.getElementById('body').classList.add('fadeOut')
        document.getElementById('body').classList.add('bodDarken')
        window.setTimeout(function () {
          window.location.replace('homedark.html')
        }, 500)

      }
    } else {
      console.log('not sending user anywhere.')
    }
  }).catch(function (error) {
    console.log("Error getting document:", error);
  });




}












function expandSign() {
  var mainCard = document.getElementById("mainCard")
  mainCard.classList.add('mainCardExpand')
  mainCard.classList.add('height1')

  window.setTimeout(function () {
    document.getElementById('expansion').click()
  }, 1000)
  document.getElementById('getStarted').classList.add('fadeOutUp')

}

function expandIn() {

  document.getElementById('mainCard').classList.add('height')
  document.getElementById('nothometab').classList.add('fadeOutUp')
  document.getElementById('notprofiletab').classList.add('fadeOutUp')

  window.setTimeout(function () {
    document.getElementById('home-tab').click()
  }, 1000)


}
function expandUp() {


  document.getElementById('mainCard').classList.add('height')
  document.getElementById('nothometab').classList.add('fadeOutUp')
  document.getElementById('notprofiletab').classList.add('fadeOutUp')

  window.setTimeout(function () {
    document.getElementById('profile-tab').click()
  }, 1000)



}

function addPic() {
  x = document.getElementById('imgurlthing123').value

  firebase.auth().currentUser.updateProfile({
    photoURL: x
  }).then(function () {
    document.getElementById('user-pic').src = x
  })



}

function addPhoto() {
  a = document.getElementById('user-pic').src


  b = document.createElement('button')

  b.classList.add("waves-flat-button")
  b.classList.add("btn-outline-primary")
  b.innerHTML = "Change Profile Photo"

  b.onclick = function () {
    $('#profilepic').modal('toggle')
  }

  document.getElementById('profiletabcard').appendChild(document.createElement('br'))
  document.getElementById('profiletabcard').appendChild(document.createElement('br'))
  document.getElementById('profiletabcard').appendChild(b)


  addWaves()

}

initFirebaseAuth();

