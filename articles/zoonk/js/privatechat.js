db = firebase.firestore()

function createchatroom() {
    $('#createModal').modal('toggle')
}

function joinchatroom() {
    $('#joinModal').modal('toggle')
}

function createchatroombutton() {
    name = document.getElementById('createinp').value
        if (name == '' || name == " ") {
            error('We were unable to process this name. Please modify the name of the chatroom to continue.')
        }
        else {
                db.collection('privatechat').add({
                    name: name,
                }).then(function (doc) {
                    window.history.pushState('page3', 'Title', '/privatechat.html?chat=' + doc.id);
                    window.location.reload()
                })
            }
}

function unloadchatroom() {
    document.getElementById('home').style.display = 'block'
    document.getElementById('chat').style.display = 'none'
    document.getElementById('home').classList.add('animated')
    document.getElementById('home').classList.add('fadeIn')

    window.history.pushState('page3', 'Title', '/privatechat.html');


}

function loadchatroom(id) {

    document.getElementById('chat').style.display = 'block'
    document.getElementById('home').style.display = 'none'
    document.getElementById('chat').classList.add('animated')
    document.getElementById('chat').classList.add('fadeIn')

    document.getElementById('bop').onclick = function() {
        deltechat(id)
    }
    document.getElementById('bopp').onclick = function() {
        leavechat(id)
    }

    db.collection('privatechat').doc(id).get().then(function (doc) {
        if (doc.exists) {
            window.history.pushState('page3', 'Title', 'privatechat.html?chat=' + id);
            document.getElementById('chatroomtitle').innerHTML = doc.data().name
            document.getElementById('sendmessagebutton').onclick = function () {
                addmessage(id)
            }

            loadmessages(id)

        }
        else { unloadchatroom(); error('No chatroom with this ID exists.'); }
    })
}


function leavechat(id){

    db.collection('privatechat').doc(id).update({
        messages: firebase.firestore.FieldValue.arrayUnion({
            timestamp: new Date().valueOf(),
            senderdistinguish: navigator.userAgent + ' // ' + navigator.platform,
            sendername: 'status',
            content: 'a user has left the chat.'
        })
    }).then(function() {
        window.location.replace('privatechat.html')
    })
}

function addmessage(id) {
    newmessage = document.getElementById('messageinput1').value
    backupmessage = document.getElementById('messageinput1').value
    document.getElementById('messageinput1').value = ''

    if (newmessage == '') {
    }

    else {
            db.collection('privatechat').doc(id).update({
                messages: firebase.firestore.FieldValue.arrayUnion({
                    timestamp: new Date().valueOf(),
                    senderdistinguish: navigator.userAgent + ' // ' + navigator.platform,
                    sendername: 'anonymous',
                    content: backupmessage
                })
            })
    }

addWaves()
}

var urlParams = new URLSearchParams(window.location.search);
var myParam = urlParams.get('chat');

if (myParam == null) {
    document.getElementById('home').style.display = 'block'
    document.getElementById('chat').style.display = 'none'
    document.getElementById('home').classList.add('animated')
    document.getElementById('home').classList.add('fadeIn')

}
else {
    loadchatroom(myParam)
}


sessionStorage.setItem('skiparefresh', 'nono')
sessionStorage.setItem('iclearedit', 'false')

function loadmessages(id) {
    postmessages = []
    localStorage.setItem('first', 'true')

    bopper = db.collection('privatechat').doc(id).onSnapshot(function (doc) {
        if (doc.data().messages.length == 0) {
            if (sessionStorage.getItem('iclearedit') == 'true') {
                sessionStorage.setItem('iclearedit', 'false')
                return;
            }
            if (sessionStorage.getItem('skiparefresh') == 'yesyes') {
                sessionStorage.setItem('skiparefresh', 'nono')
            }
            else {
            toggleloader()
            window.setTimeout(function() {
                showcomplete()
                
            }, 500)
            window.setTimeout(function() {
                $('#messages').empty()
                $('#eonloaderelement').modal('hide')
            }, 1000)

            return true;
            }

        }


        if (sessionStorage.getItem('skiparefresh') == 'yesyes') {
            sessionStorage.setItem('skiparefresh', 'nono')
        }
        else {

            if (localStorage.getItem('first') == 'true') {
                localStorage.setItem('first', 'false')

                postmessages = doc.data().messages

                if (postmessages == undefined || doc.data().messages.length == 0) {
                    postmessages = []



                }
                else {



                    for (let i = 0; i < postmessages.length; i++) {
                        var element = postmessages[i];

                        a = document.createElement('div')
                        a.style.position = 'relative'
                        a.classList.add('messageelement')
                        a.id = i + 'el'
                        infoFunc = "chatinfomodal('" + id + "','" + i + "')"
                        a.innerHTML = '<div style=" width: 100%; display: inline-block;"><center><div style="text-align: left; max-width: 90%; padding: 12px; border-radius: 12px; background-color: #404040"><p style="max-width: 80%;"><b>' + element.sendername + ' » </b>' + element.content + '</p> <div style="right: 52px" class="centeredy"><button onclick="' + infoFunc + '" class="waves-effect waves-button"><i class="material-icons">info</i></button></div></div></center></div>'
                        document.getElementById('messages').appendChild(a)
                        b = document.createElement('br')
                        b.id = i + 'elel'
                        b.classList.add('breakelement')
                        document.getElementById('messages').appendChild(b)
                        addWaves()
                    }
                    var objDiv = document.getElementById("messages");
                    objDiv.scrollTop = objDiv.scrollHeight;
                }
            }

            else {


                    element = doc.data().messages[doc.data().messages.length - 1]
                    idi = doc.data().messages.length - 1

                    // I believe it's the latest array element regardless of array length

                a = document.createElement('div')
                a.style.position = 'relative'
                a.id = idi + 'el'

                a.classList.add('animated')
                a.classList.add('fadeInUp')
                infoFunc = "chatinfomodal('" + id + "','" + idi + "')"

                a.innerHTML = '<div style=" width: 100%; display: inline-block;"><center><div style="text-align: left; max-width: 90%; padding: 12px; border-radius: 12px; background-color: #404040"><p style="max-width: 90%;"><b>' + element.sendername + ' » </b>' + element.content + '</p> <div style="right: 52px" class="centeredy"><button onclick="' + infoFunc + '" class="waves-effect waves-button"><i class="material-icons">info</i></button></div></div></center></div>'

                document.getElementById('messages').appendChild(a)
                b = document.createElement('br')
                b.id = idi + 'elel'

                document.getElementById('messages').appendChild(b)
                addWaves()

                var objDiv = document.getElementById("messages");
                objDiv.scrollTop = objDiv.scrollHeight;


                if (postmessages.length > 20) {
                    sessionStorage.setItem('skiparefresh', 'yesyes')

                    db.collection('privatechat').doc(id).update({
                        messages: firebase.firestore.FieldValue.arrayRemove({
                            timestamp: doc.data().messages[0].timestamp,
                            senderdistinguish: doc.data().messages[0].senderdistinguish,
                            sendername: 'anonymous',
                            content: doc.data().messages[0].content,
                    })
                    }).then(function () {
                        $('#0el').remove()
                        $('#0elel').remove()

                        msgels = document.getElementsByClassName('messageelement')
                        var msgels = [].slice.call(msgels);

                        for (let i = 0; i < msgels.length; i++) {
                            const element = msgels[i];
                            oldoldid = element.id
                            oldid = element.id.split("el")[0]

                            newid = parseInt(oldid) - 1
                            i = newid
                            id = id

                            document.getElementById(oldoldid).id = newid + 'el'
                            document.getElementById(newid + 'el').onclick = function () {
                                chatinfomodal(id, i)
                            }
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
                }
            }
        }

    })

}



function chatinfomodal(id, i) {
    db.collection('privatechat').doc(id).get().then(function (doc) {

        data = doc.data().messages[i]
        document.getElementById('infoa').innerHTML = data.content
        document.getElementById('infob').innerHTML = data.timestamp
        document.getElementById('infod').innerHTML = data.senderuid
            $('#messageinfomodal').modal('toggle')
    })
}

function joinchatroombutton() {
    foo = document.getElementById('joininput').value
    window.history.pushState('page3', 'Title', 'privatechat.html?chat=' + foo);
    window.location.reload()
}

function chatroomsinfo() {
    $('#chatroomsinfoModal').modal('toggle')
}

function chatroomrules() {
    $('#rulesModal').modal('toggle')
}

$("#messageinput1").keypress(function (event) {
    if (event.keyCode == 13) {
        $("#sendmessagebutton").click();
    }
});

function particles() {
    db.collection('users').doc(firebase.auth().currentUser.uid).get().then(function (doc) {
        if (doc.data().particles == true) {

            document.addEventListener('mousemove', function (e) {
                let body = document.querySelector('body');
                let circle = document.createElement('span');
                circle.classList.add('span')
                let x = e.pageX;
                let y = e.pageY;
                circle.style.left = x + "px";
                circle.style.top = y + "px";
                let size = Math.random() * 10;
                circle.style.width = 10 + size + "px";
                circle.style.height = 10 + size + "px";
                body.appendChild(circle);
                setTimeout(function () {
                    circle.remove();
                }, 1600);
            });

        }
        else {

        }
    })
}

function deltechat(id) {
    toggleloader()
    sessionStorage.setItem('iclearedit', 'true')
    db.collection('privatechat').doc(id).get().then(function(doc) {
        db.collection('archive').doc(id).set({
            messages: doc.data().messages
        }).then(function() {
            db.collection('privatechat').doc(id).update({
                messages: []
            }).then(function() {
                window.setTimeout(function() {
                    showcomplete()
                }, 500)
                window.setTimeout(function() {
                    $('#messages').empty()
                    $('#eonloaderelement').modal('hide')
                }, 1000)
            })
        })
    })
}