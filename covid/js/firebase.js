var firebaseConfig = {
    apiKey: "AIzaSyBq5C3cnAk6XbF2UuEeI9HY3GNrutkGLIk",
    authDomain: "cdash-ff1e4.firebaseapp.com",
    databaseURL: "https://cdash-ff1e4.firebaseio.com",
    projectId: "cdash-ff1e4",
    storageBucket: "cdash-ff1e4.appspot.com",
    messagingSenderId: "18068404487",
    appId: "1:18068404487:web:b9ba545313e63c5a0c2da2"
  };

firebase.initializeApp(firebaseConfig);
db = firebase.firestore()

firebase.auth().onAuthStateChanged(function (user) {
    loadmessages()
    if (user) {
        window.user = firebase.auth().currentUser
        loadprofile(true)
    } else {
        window.setTimeout(function() {
            Snackbar.show({text: "We strongly suggest you create an account to utilize all our features :D", pos: 'top-center'})
        }, 1000)
        window.user = false
        loadprofile(false)
    }
});

function signin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        window.location.reload()
      }).catch(function(error) {
        alert(error.message)
      });
}

function signout() {
    firebase.auth().signOut().then(function() {
      }).catch(function(error) {
          alert(error.message)
      });
}

function loadprofile(status) {
    if (status) {
        document.getElementById('usercardfalse').style.display = 'none'
        document.getElementById('usercardtrue').style.display = 'block'

        document.getElementById('pfp1').src = user.photoURL
        document.getElementById('pfptext').innerHTML = user.displayName

    db.collection('users').doc(user.uid).get().then(function(doc) {
        if (!doc.exists) {
            db.collection('users').doc(user.uid).set({
                enabled: true
            })
        }
        else {
            if (doc.data().light) {
                //kms lmao
                golight()
            }
            else {
                godark()
            }
            if (doc.data().enabled == false) {
                window.location.replace('banned.html')
            }
            getmusic(doc.data().music)
        }
    })

    }
    else {
        getmusic(false)
        document.getElementById('usercardtrue').style.display = 'none'
        document.getElementById('usercardfalse').style.display = 'block'
    }
}

$(function () {
    $('[data-toggle="popover"]').popover({
        trigger: 'focus'
    })
})

 // MUSIC

function getmusic(yes) {
if (yes == false) {
    document.getElementById('player').removeAttribute('autoplay')
}

musicindex = Math.floor(Math.random() * 4);
switch (musicindex) {
    case 0:
        file = 'halseygasolineoscartrapremix'
        break;
    case 1:
        file = 'halseygasolineoscartrapremix'
    case 2:
        file = 'unknown'
        break;
    case 3:
        file = 'unknown'
        break;
    default:
        file = 'unknown'
        break;
}

document.getElementById('player').src = 'assets/music/' + file + '.mp3'
$('#popout2').show()
$('#musicbtn').show()

}


function settings() {

    if (user.uid == undefined || user.uid == null) {
        Snackbar.show({text: 'You are not signed in.', pos: 'top-center'})
        return true;
    }

    db.collection('users').doc(user.uid).get().then(function(doc) {
        
        if (doc.data().music == false) {
            // autoplay off
            document.getElementById('customSwitch').checked = false
        }
        else {
            document.getElementById('customSwitch').checked = true
        }

        if (doc.data().light == true) {
            document.getElementById('customSwitch2').checked = true
        }
        else {
            document.getElementById('customSwitch2').checked = false
        }

        $('#settingsmodal').modal('toggle')
    })
}

function savesettings() {

    db.collection('users').doc(user.uid).update({
        music: document.getElementById('customSwitch').checked,
        light: document.getElementById('customSwitch2').checked,
    }).then(function() {
        refreshprefs()
        $('#settingsmodal').modal('toggle')
    })
    
}

function godark() {
    localStorage.setItem('quicker', 'dark')
    document.getElementById('lightinjection').innerHTML = ''
}

function golight() {
    localStorage.setItem('quicker', 'light')
    document.getElementById('lightinjection').innerHTML = ':root {--bg-primary: rgb(240, 240, 240) !important;--bg-secondary: rgb(255, 255, 255) !important;--bg-tertiary: #d8d7ff !important;--bg-quaternary: #5B39DB !important;--eon-primary: rgb(255, 100, 247) !important;--eon-secondary: rgb(255, 0, 0) !important;--content-primary: rgb(0, 0, 0) !important;--content-secondary: rgb(31, 24, 110) !important;--contrast-primary: #000 !important;--list-item-one: rgb(229, 255, 0) !important;}'
}

function refreshprefs() {
    db.collection('users').doc(user.uid).get().then(function(doc) {
        if (doc.data().light) {
            //kms lmao
            golight()
        }
        else {
            godark()
        }
    })
}

function homestats() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "f25776e273mshdeac69e2098339fp19fd7bjsne2f245613497"
        }
    }
    
    $.ajax(settings).done(function (response) {
        response = JSON.parse(response)
        document.getElementById('globalcases').innerHTML = intToString(parseInt(response.active_cases.replace(/,/g, '')))
        document.getElementById('globalcasestime').innerHTML = 'Updated on ' + response.statistic_taken_at
        document.getElementById('globaldeaths').innerHTML = intToString(parseInt(response.total_deaths.replace(/,/g, '')))
        document.getElementById('globaldeathstime').innerHTML = 'Updated on ' + response.statistic_taken_at
    });

}

function intToString (num) {
    fixed = 0
    if (num === null) { return null; } // terminate early
    if (num === 0) { return '0'; } // terminate early
    fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
    var b = (num).toPrecision(2).split("e"), // get power
        k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
        c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3) ).toFixed(1 + fixed), // divide by power
        d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
        e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
    return e;
}