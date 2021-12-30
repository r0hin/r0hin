firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

function geturl() {
    urlParams = new URLSearchParams(window.location.search);
    myParam = urlParams.get('s');
    return myParam
}

checkurl()
function checkurl() {
    urlParams = new URLSearchParams(window.location.search);
    myParam = urlParams.get('s');
    if (myParam == null || myParam == 'null') {
        console.log('No url');
    }
    else {
        db.collection('urls').doc(myParam).get().then(function (doc) {
            if (doc.exists) {

                document.getElementById('workspacepaste').style.display = 'none'
                document.getElementById('workspace').style.display = 'block'

                document.getElementById('codeid').innerHTML = doc.id
                endloading()


            }
            else {

                db.collection('pastes').doc(myParam).get().then(function (doc) {
                    if (doc.exists) {
                        document.getElementById('codeid').innerHTML = doc.id;
                        document.getElementById('workspace').style.display = 'none'
                        document.getElementById('workspacepaste').style.display = 'block'
                        endloading()
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

function makedisable() {

    document.getElementById('disabletext2').innerHTML = 'Disable'
    document.getElementById('dissatblebt2').innerHTML = 'Disable Link'
    document.getElementById('statusel2').classList.add('badge-success')
    document.getElementById('statusel2').classList.remove('badge-danger')
    document.getElementById('statusel2').innerHTML = 'Online'

    document.getElementById('dissatblebt2').onclick = function () {
        db.collection('urls').doc(geturl()).update({
            enabled: false
        }).then(function () { makeenable() })
    }
}

function makeenable() {
    document.getElementById('disabletext2').innerHTML = 'Enable'
    document.getElementById('dissatblebt2').innerHTML = 'Enable Link'
    document.getElementById('statusel2').classList.remove('badge-success')
    document.getElementById('statusel2').classList.add('badge-danger')
    document.getElementById('statusel2').innerHTML = 'Offline'
    document.getElementById('dissatblebt2').onclick = function () {
        db.collection('urls').doc(geturl()).update({
            enabled: true
        }).then(function () { makedisable() })
    }
}

function makedisable2() {

    document.getElementById('disabletext2').innerHTML = 'Disable'
    document.getElementById('dissatblebt2').innerHTML = 'Disable Link'
    document.getElementById('statusel2').classList.add('badge-success')
    document.getElementById('statusel2').classList.remove('badge-danger')
    document.getElementById('statusel2').innerHTML = 'Online'

    document.getElementById('dissatblebt2').onclick = function () {
        db.collection('pastes').doc(geturl()).update({
            enabled: false
        }).then(function () { makeenable2() })
    }
}

function makeenable2() {
    document.getElementById('disabletext2').innerHTML = 'Enable'
    document.getElementById('dissatblebt2').innerHTML = 'Enable Link'
    document.getElementById('statusel2').classList.remove('badge-success')
    document.getElementById('statusel2').classList.add('badge-danger')
    document.getElementById('statusel2').innerHTML = 'Offline'
    document.getElementById('dissatblebt2').onclick = function () {
        db.collection('pastes').doc(geturl()).update({
            enabled: true
        }).then(function () { makedisable2() })
    }
}

function auth() {

    db.collection('urls').doc(geturl()).get().then(function (doc) {
        if (document.getElementById('pass1').value == doc.data().passcode) {

            $('#workspace').empty()

            document.getElementById('workspace2').style.display = 'block'
            document.getElementById('pasteelement1other').style.display = 'flex'

            window.oldnumber = doc.data().used
            db.collection("urls").doc(geturl()).onSnapshot(function (doc) {
                if (oldnumber == doc.data().used) {

                }
                else {
                    window.oldnumber = doc.data().used
                    document.getElementById('times2').innerHTML = doc.data().used

                    document.getElementById('times2').classList.add('animated')
                    document.getElementById('times2').classList.add('bounce')
                    window.setTimeout(function () {
                        document.getElementById('times2').classList.remove('bounce')
                        document.getElementById('times2').classList.add('animated')
                    }, 1000)
                }

            });

            document.getElementById('times2').innerHTML = doc.data().used

            document.getElementById('viewbtn').onclick = function () {
                alert(doc.data().target)
            }

            poop = doc.data().target

            document.getElementById('editbtn').onclick = function () {
                x = prompt("Paste your new link here:", "https://yourlink.ext");
                if (x == null) {
                    snackbar('Nothing changed', '', '', '4000')
                }
                else {

                    window.target = x
                    db.collection('urls').doc(geturl()).update({
                        target: x
                    }).then(function () {
                        snackbar('Updated Target URL.', '', '', '4000')
                        document.getElementById('viewbtn').onclick = function () {
                            alert(target)
                        }
                    })
                }
            }


            if (doc.data().enabled == true) {
                makedisable()
            }
            else {
                makeenable()
            }


            document.getElementById("finallnk2").innerHTML = 'https://r0h.in/articles/zoonk/app/i.html?s=' + geturl()
            document.getElementById("finallnk2").href = 'https://r0h.in/articles/zoonk/app/i.html?s=' + geturl()


        }

        else {

            document.getElementById('erroryo').style.display = 'block'

            document.getElementById('erroryo').classList.add('bounceIn');
            window.setTimeout(function () {
                document.getElementById('erroryo').classList.remove('bounceIn');
            }, 1000)

            document.getElementById('buttonel2').onclick = function () {
                snackbar('Please wait a bit.', '', '', '2000')
            }
            document.getElementById('buttonel').onclick = function () {
                snackbar('Please wait a bit.', '', '', '2000')
            }
            window.setTimeout(function () {
                document.getElementById('buttonel').onclick = function () {
                    auth()
                }
                document.getElementById('buttonel2').onclick = function () {
                    auth2()
                }
            }, 2000)


        }
    })




}

function auth2() {

    db.collection('pastes').doc(geturl()).get().then(function (doc) {
        if (document.getElementById('pass2').value == doc.data().passcode) {

            $('#workspace').empty()
            $('#workspacepaste').empty()

            document.getElementById('workspace2').style.display = 'block'

            document.getElementById('times2').innerHTML = doc.data().used
            window.oldnumber = doc.data().used
            db.collection("pastes").doc(geturl()).onSnapshot(function (doc) {
                if (oldnumber == doc.data().used) {

                }
                else {
                    window.oldnumber = doc.data().used
                    document.getElementById('times2').innerHTML = doc.data().used

                    document.getElementById('times2').classList.add('animated')
                    document.getElementById('times2').classList.add('bounce')
                    window.setTimeout(function () {
                        document.getElementById('times2').classList.remove('bounce')
                        document.getElementById('times2').classList.add('animated')
                    }, 1000)
                }

            });
            document.getElementById('pasteelement1').style.display = 'flex'
            window.paste = doc.data().paste
            document.getElementById('viewbtn2').onclick = function () {
                document.getElementById('viewpasteelement').innerHTML = paste
                $('#viewpaste').modal('toggle')
            }

            poop = doc.data().target

            document.getElementById('editbtn2').onclick = function () {
                document.getElementById('exampleFloatingBox4').value = paste
                $('#editpaste').modal('toggle')
            }


            if (doc.data().enabled == true) {
                makedisable2()
            }
            else {
                makeenable2()
            }


            document.getElementById("finallnk2").innerHTML = 'https://r0h.in/articles/zoonk/app/i.html/i?s=' + geturl()
            document.getElementById("finallnk2").href = 'https://r0h.in/articles/zoonk/app/i.html/i?s=' + geturl()


        }

        else {



            document.getElementById('erroryo2').style.display = 'block'

            document.getElementById('erroryo2').classList.add('bounceIn');
            window.setTimeout(function () {
                document.getElementById('erroryo2').classList.remove('bounceIn');
            }, 1000)

            document.getElementById('buttonel2').onclick = function () {
                snackbar('Please wait a bit.', '', '', '2000')
            }
            document.getElementById('buttonel').onclick = function () {
                snackbar('Please wait a bit.', '', '', '2000')
            }
            window.setTimeout(function () {
                document.getElementById('buttonel').onclick = function () {
                    auth()
                }
                document.getElementById('buttonel2').onclick = function () {
                    auth2()
                }
            }, 2000)



        }
    })

}

function updatepaste() {
    db.collection('pastes').doc(geturl()).update({
        paste: document.getElementById('exampleFloatingBox4').value
    }).then(function () {
        window.paste = document.getElementById('exampleFloatingBox4').value;
        snackbar('Paste modified', '', '', '4000')
    })

}


function endloading() {
    document.getElementById('loaderbg').classList.add('fadeOut')

    window.setTimeout(function () {
        document.getElementById('loaderbg').style.display = 'none'
        document.getElementById('loader').style.display = 'none'
    }, 350)
    document.getElementById('loader').classList.add('fadeOut')
}

document.getElementById("pass2").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("buttonel2").click();
    }
});

document.getElementById("pass1").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("buttonel").click();
    }
});