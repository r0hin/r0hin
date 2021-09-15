firebase.initializeApp({apiKey: "AIzaSyDyiJGiWlgFaMtJA2lerw4lUkGK76Qoxvs",authDomain: "eongram-87169.firebaseapp.com",databaseURL: "https://eongram-87169.firebaseio.com",projectId: "eongram-87169",storageBucket: "eongram-87169.appspot.com",messagingSenderId: "725793838303",appId: "1:725793838303:web:f23c748b3985225c5c056a"});
var auth = firebase.auth();
var db = firebase.firestore()

firebase.auth().onAuthStateChanged(function (user) {
    load()
    loadarticles()
    if (user) {
        console.log('Personal Token: ' + user.uid);
        window.user = firebase.auth().currentUser
        window.signIn = true
    } else {
        window.signIn = false
    }
});

function load() {
    var urlParams = new URLSearchParams(window.location.search);
    article = urlParams.get('help')

    if (article == undefined || article == null || article == "") {
        $('#waiting').addClass('hidden')
        $('#home').removeClass('hidden')
        return;
    }

    readArticle(article)
}

function loadarticles() { 
    $('#articleList').empty()
    for (let i = 0; i < articles.length; i++) {
        const element = articles[i];

        a = document.createElement('div')
        a.classList.add('col-sm')
        readFunc = "readArticle('" + element.id + "')"
        a.innerHTML = '<div class="card articlecard"><div class="card-body"><h3>' + element.title + '</h3><p>' + element.subtitle + '</p><small class="dateEl">' + element.updated + '</small><button onclick="' + readFunc + '" class="goEl eon-text">read article</button></div></div>'
        document.getElementById('articleList').appendChild(a)
    }
    addWaves()
}

function readArticle(id) {
    for (let i = 0; i < articles.length; i++) {
        if (articles[i].id == id) {
            date = articles[i].updated
            title = articles[i].title
            subtitle = articles[i].subtitle
        }
    }
    history.pushState(null, '', 'support.html?help=' + id);
    $('#waiting').addClass('hidden')
    $('#home').addClass('hidden')
    $('#article').removeClass('hidden')

    $('.article').addClass('hidden')
    $('#' + id).removeClass('hidden')
    document.getElementById(id).getElementsByClassName("date")[0].innerHTML = date
}

function closeArticle() {
    $('#waiting').addClass('hidden')
    $('#home').removeClass('hidden')
    $('#article').addClass('hidden')
    history.pushState(null, '', 'support.html');
}


function passreset() {
    email = document.getElementById('emailadressbox').value
    document.getElementById('emailadressbox').value = ''
    if (email == '' || email == " " || email == undefined || email == null) {
        Snackbar.show({showAction: false,pos: 'bottom-center',text: 'Error sending confirmation email.'})
        return;
    }
    else {
        auth.sendPasswordResetEmail(email).then(function() {
            Snackbar.show({showAction: false,pos: 'top-center',text: 'Password reset email was sent'})
            closeArticle()
          }).catch(function(error) {
            alert(error)
          });
    }
}

function checksesh() {
    pass = document.getElementById('passwordbox').value
    const credential = firebase.auth.EmailAuthProvider.credential(
        user.email, 
        pass
    );

    user.reauthenticateWithCredential(credential).then(function() {
        $('#status').html("You were re-authenticated successfully.")
      }).catch(function(error) {
        $('#status').html(error)
      });
}

function changeemail() {
    email = document.getElementById('emailbox2').value
    user.updateEmail(email).then(function() {
        Snackbar.show({showAction: false,pos: 'top-center',text: 'Your email was changed successfully.'})
        closeArticle()
    }).catch(function(error) {
        alert(error)
    });
}

function checksesh0() {
    if (signIn) {
        $('#statussign').html('You are signed in!')
    }
    else {
        $('#statussign').html('You are not signed in. <a href="#" onclick="signinnow()">Click here</a> to sign in.')
    }
}

function signinnow() {
    transfer('index.html?return=' + window.location.href)
}

function dubby() {
    window.setTimeout(function() {
        document.getElementById('emailbtn').onclick = function() {
            alert('Feel free to email us at: \n\nsupport@r0h.in')
        }
        document.getElementById('emailbtn').href = '#'
    }, 1000)
}