db = firebase.firestore()
sessionStorage.setItem('signedin', 'false')

firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {

        if (sessionStorage.getItem('newUser') == 'true') {
            
            sessionStorage.removeItem('newUser')
            // Set username because user just created their account
            username = document.getElementById('signupusernameform').value
            await db.collection('app').doc('usernames').update({
                usernames: firebase.firestore.FieldValue.arrayUnion(username),
                map: firebase.firestore.FieldValue.arrayUnion(user.uid)
            })
            
            await db.collection('users').doc(user.uid).set({
                username: $('#signupusernameform').val()
            })
                
            Snackbar.show({text: "Account successfully created."})

        }

        doc = await db.collection('users').doc(user.uid).get()
        $('#username').html(doc.data().username)
        $('#email').html(user.email)

        sessionStorage.setItem('signedin', 'true')
        $('#signedin').removeClass('hidden')
        $('#signedout').addClass('hidden')
        $('#signin').addClass('hidden')
        $('#signup').addClass('hidden')
        $('#home').removeClass('hidden')

    } else {
        sessionStorage.setItem('signedin', 'false')
        $('#signedin').addClass('hidden')
        $('#signedout').removeClass('hidden')
        $('#signin').addClass('hidden')
        $('#signup').addClass('hidden')
        $('#home').removeClass('hidden')
    }
})

function signin() {
    $('#home').addClass('hidden')
    $('#signin').removeClass('hidden')
    $('#signup').addClass('hidden')
}
function signup() {
    $('#home').addClass('hidden')
    $('#signin').addClass('hidden')
    $('#signup').removeClass('hidden')
}

function confirmsignin() {
    email = document.getElementById('loginemailform').value
    password = document.getElementById('loginpasswordform').value
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(`Error ${errorCode}: ${errorMessage}`)
    });
}

function confirmsignup() {
    email = document.getElementById('signupemailform').value
    password = document.getElementById('signuppasswordform').value
    sessionStorage.setItem('newUser', 'true')

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(`Error ${errorCode}: ${errorMessage}`)
    })

}

function goPanel() {
    if (sessionStorage.getItem('signedin') == 'true') {
        a = document.createElement("a")
        a.href = 'panel.html'
        a.id = 'gopanelbtn'
        a.style.display = 'none'
        document.getElementById('body').appendChild(a)
        document.getElementById('gopanelbtn').click()
    }
    else {
        $('#singinbtn').click()
        // Snackbar.show({text: "You are not signed in."})
    }
}

function getStarted() {
    if (sessionStorage.getItem('signedin') == 'true') {
        a = document.createElement("a")
        a.href = 'panel.html'
        a.id = 'gopanelbtn'
        a.style.display = 'none'
        document.getElementById('body').appendChild(a)
        document.getElementById('gopanelbtn').click()
    }
    else {
        signup()
    }
}

function logout() {
    firebase.auth().signOut().then(function() {
        Snackbar.show({text: "Signed out."})
      }).catch(function(error) {
        alert(error)
      });
}


$("#loginpasswordform").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#signinbtn").click();
    }
});

$("#signuppasswordform").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#signupbtn").click();
    }
});
