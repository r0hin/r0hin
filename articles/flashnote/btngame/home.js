
function signin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {

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

        start()

    }
    else {

        window.location.replace('index.html')
    }

}




initFirebaseAuth();


var mousedownID = -1;  //Global ID of mouse down interval
function mousedown(event) {
    snackbar('Hold down the button to gain time! Try for the leaderboards. Created by', 'rohin', 'epic()', '8000')
    if (mousedownID == -1)  //Prevent multimple loops!
        mousedownID = setInterval(whilemousedown, 1000 /*execute every 100ms*/);


}
function mouseup(event) {
    if (mousedownID != -1) {  //Only stop if exists
        clearInterval(mousedownID);
        mousedownID = -1;



        db.collection('users').doc(user()).update({
            timestamp: y
        })
        us = firebase.auth().currentUser.displayName
        db.collection('highscores').doc('highscores').update({
            [us]: y
        })

    }

}
function whilemousedown() {
    /*here put your code*/


    var given_seconds = y
    y = y + 1

    hours = Math.floor(given_seconds / 3600);
    minutes = Math.floor((given_seconds - (hours * 3600)) / 60);
    seconds = given_seconds - (hours * 3600) - (minutes * 60);

    timeString = hours.toString().padStart(2, '0') + ':' +
        minutes.toString().padStart(2, '0') + ':' +
        seconds.toString().padStart(2, '0');

    document.getElementById('displayNum').innerHTML = timeString



}
//Assign events
document.getElementById('buttonm').addEventListener("mousedown", mousedown);
document.getElementById('buttonm').addEventListener("mouseup", mouseup);
//Also clear the interval when user leaves the window with mouse
document.getElementById('buttonm').addEventListener("mouseout", mouseup);

function start() {
    db = firebase.firestore()
    let ref = db.collection('users').doc(user());
    let getDoc = ref.get()
        .then(doc => {
            if (!doc.exists) {

                db.collection('users').doc(user()).set({
                    timestamp: 0
                })
                us = firebase.auth().currentUser.displayName
                db.collection('highscores').doc('highscores').update({
                    [us]: 0
                })

            } else {

                db.collection('users').doc(user()).get().then(function (doc) {
                    given_seconds = doc.data().timestamp


                    y = given_seconds


                    hours = Math.floor(given_seconds / 3600);
                    minutes = Math.floor((given_seconds - (hours * 3600)) / 60);
                    seconds = given_seconds - (hours * 3600) - (minutes * 60);

                    timeString = hours.toString().padStart(2, '0') + ':' +
                        minutes.toString().padStart(2, '0') + ':' +
                        seconds.toString().padStart(2, '0');

                    document.getElementById('displayNum').innerHTML = timeString

                    document.getElementById('cover').classList.add('fadeOutUp')

                })


            }
        })
        .catch(err => {
            console.log('Error getting document', err);
        });


}
function leaderboard() {

    db.collection('highscores').doc('highscores').get().then(function (doc) {


        x = doc.data()


        var pairs = Object.keys(x).map(function (key) {
            return [key, x[key]];
        });

        pairs.sort(function (a, b) {
            return a[1] - b[1];
        });

        var x = pairs.slice(-3).reduce(function (obj, pair) {
            obj[pair[0]] = pair[1];
            return obj;
        }, {});

        $('#leaderboard').empty()

        for (var key in x) {

            if (key == 'example') {

            }
            else {

                a = document.createElement('div')
                a.classList.add('card')
                a.innerHTML = '<div style="color: black;" class="card-body"><h3 style="display: inline-block" >' + key + ' </h3> <h2 style="display: inline-block"> - ' + x[key] + '</h2></div>'
                a.classList.add('waves-float-box')


                document.getElementById('leaderboard').appendChild(a)
                document.getElementById('leaderboard').appendChild(document.createElement('br'))
                addWaves()

            }
        }


        $('#leaderboardmo').modal('toggle')



    })


}
function showpar() {
    snackbar('You stopped holding the button! Your time has been updated.', '', '', '5000')
}
function epic() {
    window.open('github.com/r0hin')
}