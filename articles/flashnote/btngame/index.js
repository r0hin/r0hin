
function signin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(function (result) {

        window.location.replace('home.html')

    })



}

function signOut() {
    firebase.auth().signOut();
    location.reload()
}


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


function user() {
    return firebase.auth().currentUser.uid
}

function authStateObserver(user) {
    if (user) {

        window.location.replace('home.html')

    }
    else {

        console.log('Not signed in')
    }

}




initFirebaseAuth();

