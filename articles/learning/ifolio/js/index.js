db = firebase.firestore()

function signin() {
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    alert(error.message)
  });
}

function signup() {
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    alert(error.message)
  });
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      db.collection('users').doc(user.uid).get().then(function(doc) {
        if (!doc.exists) {
          name = prompt("Name")
          db.collection('users').doc(user.uid).set({
            name: name
          }).then(function() {
            window.location.replace('redirect.html')
          })
        }
        else {
          window.location.replace('redirect.html')
        }
      })
    } else {
    }
     
})

var urlParams = new URLSearchParams(window.location.search);
status = urlParams.get('val')
if (status == "a") {
  alert('You are not signed in.')
  window.location.replace('index.html')
}