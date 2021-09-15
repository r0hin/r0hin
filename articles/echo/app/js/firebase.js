firebase.initializeApp({
    apiKey: "AIzaSyDyiJGiWlgFaMtJA2lerw4lUkGK76Qoxvs",
    authDomain: "eongram-87169.firebaseapp.com",
    databaseURL: "https://eongram-87169.firebaseio.com",
    projectId: "eongram-87169",
    storageBucket: "eongram-87169.appspot.com",
    messagingSenderId: "725793838303",
    appId: "1:725793838303:web:f23c748b3985225c5c056a",
    measurementId: "G-RZPV84YFHM"
});

window.db = firebase.firestore()
window.storage = firebase.storage();
firebase.analytics();

firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {

        window.functions = firebase.functions();
        window.storageRef = firebase.storage().ref();
        window.db = firebase.firestore()

        console.log('Personal Token: ' + user.uid);

        window.user = firebase.auth().currentUser

        checkfirsttime()
        preesearch()

        doc = await db.collection('app').doc('verified').get()
        window.cacheverify = doc.data().verified
        window.verifySnippet = doc.data().verifiedSnippet

    } else {
        transfer('index.html?return=' + window.location.href)

    }
});



function signout() {
    Snackbar.show({showAction: false,pos: 'bottom-center', text: 'Signing out...' })
    window.setTimeout(function () {
        firebase.auth().signOut()
    }, 2000)
}