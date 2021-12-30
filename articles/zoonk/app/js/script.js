firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

function doit() {

    url = document.getElementById('urlbox').value

    if (/\s/g.test(url)) {
        error('Please enter a valid URL.')
    }
    else {
        if (url == '') {
            error('Please enter a valid URL.')
        }
        else {

            document.getElementById('notmade').classList.add('fadeOut')
            document.getElementById('notmade').classList.remove('fadeIn')

            db.collection('urls').add({
                used: 0,
                target: url,
                enabled: true,
                passcode: document.getElementById('passbox').value,
            }).then(function (docRef) {
                document.getElementById('made').classList.add('fadeIn')
                document.getElementById('made').classList.remove('fadeOut')
                document.getElementById('made').style.display = 'block'

                document.getElementById('daurl').innerHTML = 'https://r0h.in/articles/zoonk/app/i.html?s=' + docRef.id
                document.getElementById('daurl').href = 'https://r0h.in/articles/zoonk/app/i.html?s=' + docRef.id
                document.getElementById('dastatsurl').innerHTML = 'https://r0h.in/articles/zoonk/app/analytics.html?s=' + docRef.id
                document.getElementById('dastatsurl').href = 'https://r0h.in/articles/zoonk/app/analytics.html?s=' + docRef.id
            })

        }
    }

}

function doit2() {

    paste = document.getElementById('exampleFloatingBox4').value

    if (paste == '' || paste.includes("<script>") || paste.includes("<style>")) {
        error('Please enter a valid paste.')
    }
    else {

        document.getElementById('notmade2').classList.add('fadeOut')
        document.getElementById('notmade2').classList.remove('fadeIn')

        db.collection('pastes').add({
            used: 0,
            paste: paste,
            enabled: true,
            passcode: document.getElementById('passbox2').value,
        }).then(function (docRef) {
            document.getElementById('made2').classList.add('fadeIn')
            document.getElementById('made2').classList.remove('fadeOut')
            document.getElementById('made2').style.display = 'block'

            document.getElementById('daurl2').innerHTML = 'https://r0h.in/articles/zoonk/app/i.html?s=' + docRef.id
            document.getElementById('daurl2').href = 'https://r0h.in/articles/zoonk/app/i.html?s=' + docRef.id
            document.getElementById('dastatsurl2').innerHTML = 'https://r0h.in/articles/zoonk/app/analytics.html?s=' + docRef.id
            document.getElementById('dastatsurl2').href = 'https://r0h.in/articles/zoonk/app/analytics.html?s=' + docRef.id
        })

    }

}

function again() {
    document.getElementById('notmade').classList.remove('fadeOut')
    document.getElementById('notmade').classList.add('fadeIn')

    document.getElementById('made').classList.remove('fadeIn')
    document.getElementById('made').classList.add('fadeOut')
    document.getElementById('made').style.display = 'none'

    document.getElementById('urlbox').value = ''
    document.getElementById('passbox').value = ''
}
function again2() {
    document.getElementById('notmade2').classList.remove('fadeOut')
    document.getElementById('notmade2').classList.add('fadeIn')

    document.getElementById('made2').classList.remove('fadeIn')
    document.getElementById('made2').classList.add('fadeOut')
    document.getElementById('made2').style.display = 'none'

    document.getElementById('exampleFloatingBox4').value = ''
    document.getElementById('passbox2').value = ''
}

checkurl()
function checkurl() {
    urlParams = new URLSearchParams(window.location.search);
    myParam = urlParams.get('s');

    if (myParam == null || myParam == 'null') {
        console.log('No url');
        endloading()
    }
    else {
        db.collection('urls').doc(myParam).get().then(function (doc) {
            if (doc.exists) {

                if (doc.data().enabled == true) {

                    prev = doc.data().used
                    newv = prev + 1

                    db.collection('urls').doc(myParam).update({
                        used: newv
                    }).then(function () {
                        window.location.replace(doc.data().target)
                    })
                }

                else {

                    alert('That URL is disabled.')
                    window.location.replace('http://r0h.in/articles/zoonk/app/')

                }

            }
            else {


                db.collection('pastes').doc(myParam).get().then(function (doc) {
                    if (doc.exists) {

                        if (doc.data().enabled == true) {
                            document.getElementById('displaypaste').style.display = 'block'
                            document.getElementById('contentcontent').innerHTML = doc.data().paste
                            document.getElementById('stuff').style.display = 'none'
                            prev = doc.data().used
                            newv = prev + 1

                            db.collection('pastes').doc(myParam).update({
                                used: newv
                            })

                            endloading()
                        }
                        else {
                            alert('That URL is disabled.')
                            window.location.replace('http://r0h.in/articles/zoonk/app')
                        }


                    }
                    else {
                        alert('That URL is invalid.')
                        window.location.replace('http://r0h.in/articles/zoonk/app')
                    }
                })

            }
        })

    }
}

function endloading() {
    document.getElementById('loaderbg').classList.add('fadeOut')
    document.getElementById('loaderbg').classList.add('faster')

    window.setTimeout(function () {
        document.getElementById('loaderbg').style.display = 'none'
        document.getElementById('loader').style.display = 'none'
    }, 800)
    document.getElementById('loader').classList.add('fadeOut')
    document.getElementById('loader').classList.add('faster')
}