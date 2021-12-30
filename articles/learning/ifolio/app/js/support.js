db = firebase.firestore()

function postmsg() {
    msg = document.getElementById('exampleFloatingBox1').value

    db.collection('messages').add({
        name: u().displayName,
        email: u().email,
        photourl: u().photoURL,
        content: msg,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(function () {
        document.getElementById('exampleFloatingBox1').value = ''
        snackbar('Message posted.', '', '', '1500')
    })
}


db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(function (querySnapshot) {
    $('#messages').empty()
    querySnapshot.forEach(function (doc) {

        a = document.createElement('div')
        a.innerHTML = '<div style=" width: 100%; background-color: #f5f5f5"><h4 style="padding: 4px; display: inline-block" >' + doc.data().name + '<br><p style="font-size: 12px;display: inline-block">' + doc.data().content + '</p></h4></div>'
        document.getElementById('messages').appendChild(a)


    })
})




