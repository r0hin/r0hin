function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {

    for (var i = 0; i < arraytosearch.length; i++) {

    if (arraytosearch[i][key] == valuetosearch) {
    return i;
    }
    }
    return null;
}

function linktwitter() {
    var provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().currentUser.linkWithPopup(provider).then(function(result) {

        index = functiontofindIndexByKeyValue(user.providerData, "providerId", "twitter.com");
        db.collection('users').doc(user.uid).update({
            twitter: {
                name: user.providerData[index].displayName,
                id: user.providerData[index].uid,
                enabled: true,

            }
        }).then(function() {
            Snackbar.show({showAction: false,pos: 'bottom-center',text: 'Twitter linked successfully.'})
            goFunc = "gotwitter('" + user.providerData[index].uid + "')"
            document.getElementById('twitterlinktext').innerHTML = 'Your account is linked to <a href="#" onclick="' + goFunc + '">' + user.providerData[index].displayName + '</a>.'
            document.getElementById('twitterlinkbutton').innerHTML = 'unlink twitter ->'
            document.getElementById('twitterlinkbutton').onclick = function() {
                unlinktwitter()
            }
        })

      }).catch(function(error) {
        document.getElementById('erorrModalMsg').innerHTML = error.message + '<br><br>Try logging out of Twitter then logging back in. If this does not work, contact us.'
        $('#errorModal').modal('toggle')
      });
}

function unlinktwitter() {
    user.unlink("twitter.com").then(function() { 
        db.collection('users').doc(user.uid).update({
            twitter: firebase.firestore.FieldValue.delete()
        }).then(function() {
            document.getElementById('twitterlinktext').innerHTML = 'Link your Twitter account to Echo. You will have the option to show or hide your Twitter on your profile!'
            document.getElementById('twitterlinkbutton').innerHTML = 'link twitter ->'
            document.getElementById('twitterlinkbutton').onclick = function() {
                linktwitter()
            }
            Snackbar.show({showAction: false,pos: 'bottom-center',text: "Twitter unlinked successfully."})
        })
      }).catch(function(error) {
        document.getElementById('erorrModalMsg').innerHTML = error.message + '<br><br>Try logging out of Twitter then logging back in. If this does not work, contact us.'
        $('#errorModal').modal('toggle')
      });
}

function gotwitter(uid) {
    youareleaving('https://twitter.com/intent/user?user_id=' + uid)
}

function linkgithub() {
    var provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().currentUser.linkWithPopup(provider).then(function(result) {
        var index = functiontofindIndexByKeyValue(user.providerData, "providerId", "github.com");

        db.collection('users').doc(user.uid).update({
            github: {
                id: user.providerData[index].uid,
                enabled: true,

            }
        }).then(function() {
            Snackbar.show({showAction: false,pos: 'bottom-center',text: 'GitHub linked successfully.'})
            goFunc = "gogithub('" + user.providerData[index].uid + "')"
            getgithubprofile(user.providerData[index].uid).then(function(data) {
                document.getElementById('githublinktext').innerHTML = 'Your account is linked to <a href="#" onclick="' + goFunc + '">' + data.login + '</a>.'
            })
            document.getElementById('githublinkbutton').innerHTML = 'unlink github ->'
            document.getElementById('githublinkbutton').onclick = function() {
                unlinkgithub()
            }
        })

      }).catch(function(error) {
        document.getElementById('erorrModalMsg').innerHTML = error.message + '<br><br>Try logging out of GitHub then logging back in. If this does not work, contact us.'
        $('#errorModal').modal('toggle')
      });
}

function unlinkgithub() {
    user.unlink("github.com").then(function() { 
        db.collection('users').doc(user.uid).update({
            github: firebase.firestore.FieldValue.delete()
        }).then(function() {
            document.getElementById('githublinktext').innerHTML = 'Link your GitHub account to Echo. You will have the option to show or hide your GitHub on your profile!'
            document.getElementById('githublinkbutton').innerHTML = 'link github ->'
            document.getElementById('githublinkbutton').onclick = function() {
                linkgithub()
            }
            Snackbar.show({showAction: false,pos: 'bottom-center',text: "GitHub unlinked successfully."})
        })
      }).catch(function(error) {
        document.getElementById('erorrModalMsg').innerHTML = error.message + '<br><br>Try logging out of GitHub then logging back in. If this does not work, contact us.'
        $('#errorModal').modal('toggle')
      });
}

function gogithub(uid) {
    getgithubprofile(uid).then(function(data) {
        youareleaving('https://github.com/' + data.login)  
    })
}

function getgithubprofile(uid) {

    return     $.ajax({
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", 'token 37f01be351d5ee933b166bdc9514993487d23157');
        },
        dataType: "json",
        url: "https://api.github.com/user/" + uid,
        success: function(data) {}
    });
}

