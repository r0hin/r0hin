var firebaseConfig = {
    apiKey: "AIzaSyBVCgI3v-rUOKDeY2XhQi8Q04fe4zmh1SQ",
    authDomain: "ifolio-9e7f3.firebaseapp.com",
    databaseURL: "https://ifolio-9e7f3.firebaseio.com",
    projectId: "ifolio-9e7f3",
    storageBucket: "ifolio-9e7f3.appspot.com",
    messagingSenderId: "580192910150",
    appId: "1:580192910150:web:1de82e4e37c08564a74347"
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
