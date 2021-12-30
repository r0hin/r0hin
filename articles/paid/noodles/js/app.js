db = firebase.firestore()

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      window.user = user
      preload()
    } else {
      // User is signed out.
      window.location.replace('index.html')
    }
})

async function preload() {
    doc = await db.collection('users').doc(user.uid).get()
    if (doc.exists) {
        load()
        return;
    }
    // Doc doesn't exist
    $('#unconfirmed').removeClass('hidden')
}

function completeprofile() {
    displayName = document.getElementById('displaynameinput').value 
    document.getElementById('displaynameinput').value = ''
    username = document.getElementById('usernameinput').value
    document.getElementById('usernameinput').value = '' 
    
    db.collection('app').doc('details').get().then(function(doc) {
        taken = false
        for (let i = 0; i < doc.data().usernames.length; i++) { if (doc.data().usernames[i] == username) { taken = true } }
        if (taken) { alert('This username is taken.'); return; }

        else {
            // Update app details with username
            db.collection('app').doc('details').update({
                usernames: firebase.firestore.FieldValue.arrayUnion(username),
                map: firebase.firestore.FieldValue.arrayUnion(user.uid)
            })

            // Update user document
            db.collection('users').doc(user.uid).set({
                name: displayName,
                email: user.email,
                following: [],
                followers: [],
                bio: '',
                username: username,
                url: 'assets/example.jpg'
            }).then(function() {
                // Remove semi-transparent fields
                $('#unconfirmed').removeClass('hidden')
                $('#unconfirmed').removeClass('fadeIn')
                $('#unconfirmed').addClass('fadeOut')
                window.setTimeout(function() {
                    $('#unconfirmed').remove()
                    Snackbar.show({
                        text: "Profile set up!"
                    })
                }, 1500)
                preload()
            })
        }
    })
}

async function load() {
    doc = await db.collection('users').doc(user.uid).get()
    window.usercache = doc.data()

    doc = await db.collection('app').doc('details').get()
    window.verifiedcache = doc.data()

    load_user_card()

}

function load_user_card() {
    document.getElementById('userpfp1').src = usercache.url
    document.getElementById('username1').innerHTML = '<b>' + usercache.name + '</b><br>' + usercache.username
}

function loaduserprofile() {
    // On (self profile)
}

function load_account_details() {
    
}