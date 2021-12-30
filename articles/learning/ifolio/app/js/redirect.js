firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        db = firebase.firestore()
        db.collection('users').doc(u().uid).get().then(function (doc) {
    
            if (doc.exists) {
    
                console.log('Done - ' + doc.data().theme);
                if (doc.data().theme == 'dark') {
                    window.location.replace('paneld.html')
                }
                else {
                    window.location.replace('panel.html')
                }
            }
    
            else {
    
                db.collection('users').doc(u().uid).set({ theme: "light" }).then(function () {
                    window.location.reload()
                })
    
            }
    
        })
    } else {
        window.location.replace('index.html?val=a')
    }
     
})