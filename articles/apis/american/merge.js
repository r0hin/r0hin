var firebaseConfig = {
    apiKey: "AIzaSyD4I8vEcbKk9DYv7vnvesPhAs9gOaLzbDA",
    authDomain: "picture-mergifyinator.firebaseapp.com",
    databaseURL: "https://picture-mergifyinator.firebaseio.com",
    projectId: "picture-mergifyinator",
    storageBucket: "picture-mergifyinator.appspot.com",
    messagingSenderId: "1002843165748",
    appId: "1:1002843165748:web:2bada24176b25e493e2661"
  };

firebase.initializeApp(firebaseConfig);

function preupload() {
    document.getElementById('fileupload').click()
}

$("#fileupload").change(function(){

    files = document.getElementById('fileupload').files
    console.log(files[0]);

    var storageRef = firebase.storage().ref();
    var fileRef = storageRef.child(files[0].name);

    fileRef.put(files[0]).then(function(snapshot) {
        fileRef.getDownloadURL().then(function(url) {
            document.getElementById('img2').src = url
            // fileRef.delete().then(function() {
            //     Snackbar.show({text: "Done"})
            // })
            document.getElementById('waiting').innerHTML = 'Processing...'
            window.setTimeout(function() {
                doit()
            }, 2000)
        })
    })

});




function doit() {
    var img1 = document.getElementById('img1');
    document.getElementById('img1').style.height = document.getElementById('img2').height + 'px'
    document.getElementById('img1').style.overflow = 'cover'
    var img2 = document.getElementById('img2');
    var canvas = document.getElementById('canvas');
    canvas.height = img1.height
    canvas.width = img1.width
    var context = canvas.getContext('2d');
    context.globalAlpha = 1.0;
    context.drawImage(img1, 0, 0, 100, document.getElementById('img1').height);
    context.globalAlpha = 0.5;
    context.drawImage(img2, 0, 0, 100, document.getElementById('img1').height);
    document.getElementById('waiting').innerHTML = 'Done. Right click the above image and save it.'
}
