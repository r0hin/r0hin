document.getElementById('msgbox').addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addMessage()
    }
})

function addMessage() {
    newmessage = document.getElementById('msgbox').value
    backupmessage = document.getElementById('msgbox').value

    if (user.uid == undefined || user.uid == null) {
        Snackbar.show({text: 'You are not signed in.', pos: 'top-center'})
        return true;
    }
    else {
        document.getElementById('msgbox').value = ''
    }

    if (newmessage = '') {
        snackbar('You must include content.')
    }

    else {
        if (newmessage.length > 50) {
            error('This message has ' + newmessage.length + ' characters. The limit is 50.')
        }
        else {
            db.collection('app').doc("chatroom").update({
                messages: firebase.firestore.FieldValue.arrayUnion({
                    timestamp: new Date().valueOf(),
                    senderuid: firebase.auth().currentUser.uid,
                    sendername: firebase.auth().currentUser.displayName,
                    senderpic: firebase.auth().currentUser.photoURL,
                    content: backupmessage
                })
            }).then(function () {

            })
        }
    }
}

sessionStorage.setItem('skiparefresh', 'nono')

function loadmessages() {
    postmessages = []
    localStorage.setItem('first', 'true')

    db.collection('app').doc("chatroom").onSnapshot(function (doc) {
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
                        a.classList.add('messageelementparent')
                        a.id = i + 'el'
                        a.innerHTML = '<hr><div class="messageelement"><img src="' + element.senderpic + '" class="centeredy pfp2"> <div class="chatdivider1"><center><div class="chattext"><p class="chattext2"><b class="chattext3">' + element.sendername + '</b><br>' + element.content + '</p></div></center></div></div>'
                        document.getElementById('messages').appendChild(a)
                        
                    }
                    addWaves()
                    resizeChat()
                }
            }

            else {
                if (doc.data().messages.length < 21) {
                    element = doc.data().messages[doc.data().messages.length - 1]
                    idi = doc.data().messages.length - 1
                }

                else {
                    element = doc.data().messages[21]
                    idi = 20
                }

                a = document.createElement('div')
                a.style.position = 'relative'
                a.id = idi + 'el'

                a.classList.add('animated')
                a.classList.add('zoomIn')
                a.classList.add('messageelementparent')

                a.innerHTML = '<hr class="animated zoomIn"><div class="messageelement animated fadeIn"><img src="' + element.senderpic + '" class="centeredy pfp2"> <div class="chatdivider1"><center><div class="chattext"><p class="chattext2"><b class="chattext3">' + element.sendername + '</b><br>' + element.content + '</p></div></center></div></div>'

                document.getElementById('messages').appendChild(a)
                addWaves()
                resizeChat()

                postmessages = doc.data().messages
                if (doc.data().messages.length > 21) {
                    sessionStorage.setItem('skiparefresh', 'yesyes')

                    db.collection('app').doc("chatroom").update({
                        messages: firebase.firestore.FieldValue.arrayRemove({
                            timestamp: postmessages[0].timestamp,
                            senderuid: postmessages[0].senderuid,
                            sendername: postmessages[0].sendername,
                            senderpic: postmessages[0].senderpic,
                            content: postmessages[0].content,
                        })
                    }).then(function () {
                        $('#0el').remove()

                        msgels = document.getElementsByClassName('messageelementparent')
                        var msgels = [].slice.call(msgels);

                        for (let i = 0; i < msgels.length; i++) {
                            const element = msgels[i];
                            try {
                                oldoldid = element.id
                                oldid = element.id.split("el")[0]
                                newid = parseInt(oldid) - 1
                                document.getElementById(oldoldid).id = newid + 'el'   
                            } catch (error) {
                                console.log(i);
                            }
                        }
                    })
                }
            }
        }
    })
}


function resizeChat() {
    divheight = $('#messages').closest('.marginshit').height()
    parentheight = divheight
    parentheight = parseInt(parentheight) - 120
    divheight = parseInt(divheight) - 215
    $("#messages").css("height", divheight + 'px');
    $('#mapel').attr('style', function(i,s) { return (s || '') + 'height: ' + parentheight + 'px !important;' });


    var objDiv = document.getElementById("messages");
    objDiv.scrollTop = objDiv.scrollHeight;

    
}

