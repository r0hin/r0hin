db = firebase.firestore()

function switchtosignin() {
    $('#signin').removeClass('hidden')
    $('#signup').addClass('hidden')
}

function switchtosignup() {
    $('#signin').addClass('hidden')
    $('#signup').removeClass('hidden')
}

function signin() {
    email = document.getElementById('signinemail').value
    password = document.getElementById('signinpassword').value

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        alert(error.message)
    });      
}

function signup() {
    email = document.getElementById('signupemail').value
    password = document.getElementById('signuppassword').value
    sessionStorage.setItem('justcreated', 'true')

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        alert(error.message)
    });
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        if (sessionStorage.getItem('justcreated') == 'true') {
            sessionStorage.removeItem('justcreated')

            // Set username
            username = document.getElementById('signupusername').value
            db.collection('app').doc('details').get().then(function(doc) {
                taken = false
                for (let i = 0; i < doc.data().usernames.length; i++) {
                    if (doc.data().usernames[i] == username) {
                        taken = true
                    }
                }

                if (taken) {
                    alert('This username is taken.')
                    return;
                }
                else {
                    db.collection('app').doc('details').update({
                        usernames: firebase.firestore.FieldValue.arrayUnion(username),
                        map: firebase.firestore.FieldValue.arrayUnion(user.uid)
                    }).then(function() {
                        window.location.replace('app.html')
                    })
                }
            })
        }
        else {
            window.location.replace('app.html')
        }
    } else {
        // Signed out; Do nothing.
    }
  })