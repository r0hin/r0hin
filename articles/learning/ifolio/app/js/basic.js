var firebaseConfig = {
    apiKey: "AIzaSyCIlx2gttCjPdwJI0dibigwtwicGiBzVmI",
    authDomain: "ifolio-11bc7.firebaseapp.com",
    projectId: "ifolio-11bc7",
    storageBucket: "ifolio-11bc7.appspot.com",
    messagingSenderId: "933332687581",
    appId: "1:933332687581:web:b2cd29440447006397d934"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
var storageRef = storage.ref();

function signOut() {
    firebase.auth().signOut();
    window.location.replace('index.html?val=a')
}

//var userPicElement = document.getElementById('user-pic');
//var userNameElement = document.getElementById('user-name');
//var userEmailElement = document.getElementById('user-email');

function getProfilePicUrl() {
    return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
}

function getUserName() {
    return firebase.auth().currentUser.displayName;
}

function getUserEmail() {
    return firebase.auth().currentUser.email;
}

function isUserSignedIn() {
    return !!firebase.auth().currentUser;
}

function initFirebaseAuth() {
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

function u() {
    return firebase.auth().currentUser
}


function signout() {
    firebase.auth().signOut()
    window.location.replace('index.html?val=a')
}

function doublecheck(theme) {
db.collection('users').doc(user()).get().then(function(doc) {

if (doc.data().theme == theme) {
    console.log('Correct theme');
}
else {
    console.log('Wrong theme, redirecting');
    window.setTimeout(function() {
        window.location.replace('redirect.html')
    },200)
    
}

})

}



function goredirect() {

if (sessionStorage.getItem('yes') == 'yes') {
    window.location.replace('redirect.html')
}
else {
    snackbar('You are not signed in. Sign in to continue.', 'Sign In', 'signin()', '5000')
}

}
