window.presearch = true
window.usersearch = []

// OOOOHGOD THEY DONT HAVE BASIC USER STUFF SETUP
function checkfirsttime() {
  if (user.displayName == null) {
    document.getElementById('doprofile').style.display = 'block'
  }
  if (!user.emailVerified) {
    document.getElementById('doemail').style.display = 'block'
    document.getElementById('doprofile').style.display = 'none'
  }
  
  if (user.displayName && user.emailVerified) {
    addappcontent()
    loaddirect()
    updateStatus()
  }
}


function verifyemail() {
  user.sendEmailVerification().then(function() {
    document.getElementById('verifybutton').remove()
    document.getElementById('status').style.display = 'block'
    document.getElementById('verifyresponse').innerHTML = "We've sent " + user.email + " an email containing a verification link. <b>After verifying</b>, click the button below."
  }).catch(function(error) {
    document.getElementById('verifyresponse').innerHTML = error
  });
}

function checkverification() {
  document.getElementById('verifyresponse').innerHTML = 'Checking...'
  window.setTimeout(function() {
    window.location.reload()
  }, 1000)
}

async function profilesetup1() {
  username = efilter(document.getElementById('usernamefield').value)
  taken = false
  
  if (hasWhiteSpace(username) || username == "") {
    document.getElementById('usernametaken').style.display = 'inline-block'
    document.getElementById('usernametaken').innerHTML = 'Your username contains whitespace.'
    return;
  }
  doc = await db.collection('app').doc('details').get()
  
  if (doc.data().usernames.includes(username)) {
    document.getElementById('usernametaken').style.display = 'inline-block'
    document.getElementById('usernametaken').innerHTML = 'This username already taken.'
    return;
  }
  
  document.getElementById('profilesetup1').classList.remove('fadeIn')    
  document.getElementById('profilesetup1').classList.add('fadeOut')
  document.getElementById('profilesetup2').style.display = 'block'
}

async function profilesetup2() {
  toggleloader()
  
  username = document.getElementById('usernamefield').value.toLowerCase()
  displayname = document.getElementById('namefield').value
  
  await user.updateProfile({
    displayName: displayname,
  })
  
  var createAccount = firebase.functions().httpsCallable('createAccount');
  createAccount({username: username, displayname: displayname}).then((result) => {
    if (result.data) {
      toggleloader()
      showcomplete()
      window.setTimeout(() => {
        window.location.reload()
      }, 1200)
    }
    else {
      alert('Error occured.')
      window.location.replace('404.html')
    }
  })
}

function hasWhiteSpace(s) {
  return /\s/g.test(s);
}

async function addappcontent() {
  document.getElementById('viewprofilebtn').onclick = function() {
    usermodal(user.uid)
  }
  
  doc = await db.collection('users').doc(user.uid).get()
  
  window.cacheuser = doc.data()
  
  // Quick replies
  
  if (cacheuser.quickreplies !== undefined) {
    $('#reply1box').attr('value', cacheuser.quickreplies[0])
    $('#reply2box').attr('value', cacheuser.quickreplies[1])
    $('#reply3box').attr('value', cacheuser.quickreplies[2])
    
    $('#qr-1btn').html(cacheuser.quickreplies[0])
    $('#qr-1btn').get(0).onclick = () => {
      quickreply(`${cacheuser.quickreplies[0]}`)
    }
    $('#qr-2btn').html(cacheuser.quickreplies[1])
    $('#qr-2btn').get(0).onclick = () => {
      quickreply(`${cacheuser.quickreplies[1]}`)
    }
    $('#qr-3btn').html(cacheuser.quickreplies[2])
    $('#qr-3btn').get(0).onclick = () => {
      quickreply(`${cacheuser.quickreplies[2]}`)
    }
  }
  
  document.getElementsByClassName('main-avatar')[0].src = doc.data().url
  document.getElementById('pfp3').src = doc.data().url
  document.getElementsByClassName('main-avatar')[0].style.display = 'block'
  document.getElementById('pfcard').style.display = 'block'
  
  if (doc.data().name == null || doc.data().name == undefined) {
    db.collection('users').doc(user.uid).update({
      name: user.displayName
    })
  }
  
  $('#cardconnections').empty()
  
  if (doc.data().twitter !== null && doc.data().twitter !== undefined) {
    
    var index = functiontofindIndexByKeyValue(user.providerData, "providerId", "twitter.com");
    goFunc = "gotwitter('" + user.providerData[index].uid + "')"
    document.getElementById('twitterlinktext').innerHTML = 'Your account is linked to <a href="#" onclick="' + goFunc + '">' + user.providerData[index].displayName + '</a>.'
    document.getElementById('twitterlinkbutton').innerHTML = 'unlink twitter ->'
    document.getElementById('twitterlinkbutton').onclick = function() {
      unlinktwitter()
    }
    hs = document.createElement('button')
    hs.classList.add('eon-text')
    hs.classList.add('connectionbtn')
    hs.onclick = function() {
      gotwitter(user.providerData[index].uid)
    }
    hs.innerHTML = '<img class="imginbtn" src="assets/Twitter_Logo_Blue.png"></img>'
    document.getElementById("cardconnections").appendChild(hs)
  }
  
  if (doc.data().github == null && doc.data().twitter == undefined) {
  }
  else {
    var index = functiontofindIndexByKeyValue(user.providerData, "providerId", "github.com");
    goFunc = "gogithub('" + user.providerData[index].uid + "')"
    getgithubprofile(user.providerData[index].uid).then(function(data) {
      document.getElementById('githublinktext').innerHTML = 'Your account is linked to <a href="#" onclick="' + goFunc + '">' + data.login + '</a>.'
    })
    document.getElementById('githublinkbutton').innerHTML = 'unlink github ->'
    document.getElementById('githublinkbutton').onclick = function() {
      unlinkgithub()
    }
    hs = document.createElement('button')
    hs.classList.add('eon-text')
    hs.classList.add('connectionbtn')
    hs.onclick = function() {
      gogithub(user.providerData[index].uid)
    }
    var customProps = window.getComputedStyle(document.documentElement);
    hs.innerHTML = '<img class="imginbtn" src="assets/GitHub-Mark-' + customProps.getPropertyValue('--content-primary').replace(/\s/g, '').charAt(0).toUpperCase() + customProps.getPropertyValue('--content-primary').slice(1) + '.png"></img>'
    document.getElementById("cardconnections").appendChild(hs)
  }
  
  document.getElementById('sidebarname').innerHTML = user.displayName + '<br><span class="badge badge-dark userbadge">@' + doc.data().username + '</span>'
  
  document.getElementById('name5').innerHTML = user.displayName
  if (doc.data().bio == undefined || doc.data().bio == null) {
    document.getElementById('bio5').innerHTML = 'Your bio is empty.'
  }
  else {
    document.getElementById('bio5').innerHTML = doc.data().bio
  }
  
  
  // REPUTATION
  
  // Pending algorithm cloud function maybe.

  db.collection('dealt').doc(user.uid).onSnapshot((doc) => {
    if (doc.exists) {
      $('#creditCount').html(`You have <b class="creditEmphasis">${doc.data().cOUNT}</b> credits.`)
      $('#usercred').html(`<b class="creditEmphasis">${doc.data().cOUNT}</b>`)
    }
    else {
      $('#creditCount').html(`You have <b class="creditEmphasis">0</b> credits.`)
      $('#usercred').html(`<b class="creditEmphasis">0</b>`)
    }
  })
  
  db.collection('follow').doc(user.uid).onSnapshot((doc) => {
    // Live updates

    if(!doc.data().following) {
      $('#following1').html('0')
    }
    
    else {
      $('#following1').html(nFormatter(doc.data().following, 1))
    }
    
    if(!doc.data().followers) {
      $('#followers1').html('0')
    }
    
    else {
      $('#followers1').html(nFormatter(doc.data().followers, 1))
    }    
  })
  
}

function nFormatter(num, digits) {
  var si = [
    { value: 1, symbol: "" },
    { value: 1E3, symbol: "k" },
    { value: 1E6, symbol: "M" },
    { value: 1E9, symbol: "G" },
    { value: 1E12, symbol: "T" },
    { value: 1E15, symbol: "P" },
    { value: 1E18, symbol: "E" }
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}


function youareleaving(id) {
  if (cacheuser.skipwarning1) {
    window.open("" + id)
  }
  else {
    $('#leavingmodal').modal('toggle')
    document.getElementById('continuebtn').onclick = function() {
      if (document.getElementById('skipdialogswitch').checked) {
        db.collection('users').doc(user.uid).update({
          skipwarning1: true
        }).then(function(doc) {
          window.cacheuser = doc.data()
          window.open(id)
          $('#leavingmodal').modal('toggle')
        })
      }
      else {
        window.open(id)
        $('#leavingmodal').modal('toggle')
      }
      
    }
  }
}

function changedisplayname() {
  sessionStorage.removeItem('viewUser')
  toggleloader()
  newdisplayname = efilter(document.getElementById('newdisplayname').value)
  if (newdisplayname == '' || newdisplayname == ' ' || newdisplayname == null || newdisplayname == undefined) {
    error('Something went wrong. Please try again later.')
  }
  else {
    user.updateProfile({
      displayName: newdisplayname
    }).then(function () {
      db.collection('users').doc(user.uid).update({
        name: newdisplayname
      }).then(function() {
        window.setTimeout(function () {
          toggleloader()
          showcomplete()
          window.setTimeout(function() {
            window.location.reload()
          }, 1100)
        }, 2800)
      }).catch(function(error) {
        togglelsoader()
        alert(error.message)
      })
    }).catch(function (error) {
      toggleloader()
      alert(error.message)
    });
  }
}

function preparenamechange() {
  document.getElementById('newdisplayname').placeholder = user.displayName
  $('#changenamemodal').modal('toggle')
}

function preparebiochange() {
  db.collection('users').doc(user.uid).get().then(function(doc) {
    document.getElementById('newbio').placeholder = doc.data().bio
  }).then(function() {
    $('#changebiomodal').modal('toggle')
  })
}

function changebio() {
  sessionStorage.removeItem('currentlyviewinguser')
  toggleloader()
  newbio = document.getElementById('newbio').value
  if (newbio == '' || newbio == ' ' || newbio == null || newbio == undefined) {
    error('Something went wrong. Please try again later.')
  }
  else {
    db.collection('users').doc(user.uid).update({
      bio: newbio
    }).then(function() {
      window.setTimeout(function () {
        toggleloader()
        showcomplete()
        $('#bio5').html(newbio)
      }, 2800)
    }).catch(function(error) {
      togglelsoader()
      alert(error.message)
    })
  }
}

function confirmchangemeil() {
  toggleloader()
  db.collection('users').doc(user.uid).get().then(function(doc) {
    if (doc.data().emailchange == undefined) {
      var d = new Date();
      d.setDate(d.getDate() - 2);
      db.collection('users').doc(user.uid).update({
        emailchange: d
      }).then(function() {
        confirmchangemeil()
      })
    }
    firebasedate = doc.data().emailchange.toDate()
    currentdate = new Date()
    var diffMinutes = parseInt((currentdate - firebasedate) / (1000 * 60), 10); 
    if (diffMinutes > 120) {
      user.updateEmail(document.getElementById('newemail').value).then(function() {
        $('#changemailpopoverbtn').popover('hide');
        db.collection("users").doc(user.uid).update({
          emailchange: firebase.firestore.FieldValue.serverTimestamp()
        }).then(function() {
          window.setTimeout(function() {
            toggleloader()
            window.setTimeout(function() {
              showcomplete()
              window.setTimeout(function() {
                history.pushState(null, '', 'app.html?tab=returnstatusemail');
                window.location.reload()
              }, 3600)
              Snackbar.show({showAction: false,pos: 'bottom-center',text: "Updating records... Do not leave this page."})
            }, 200)
          }, 500)
        })
      }).catch(function(error) {
        window.setTimeout(function() {
          toggleloader()
          document.getElementById('erorrModalMsg').innerHTML = error
          $('#errorModal').modal('toggle')
        }, 800)
      });
    }
    else {
      
      
      window.setTimeout(function() {
        error('You are doing this too much! Please wait up to 2 hours or contact support.')
        toggleloader()
      }, 1000)
      
    }
  })
}

function confirmchangepass() {
  $('#changpasswordpopoverbtn').popover('hide');
  toggleloader()
  db.collection('users').doc(user.uid).get().then(function(doc) {
    firebasedate = doc.data().passchange.toDate()
    currentdate = new Date()
    var diffMinutes = parseInt((currentdate - firebasedate) / (1000 * 60), 10); 
    if (diffMinutes > 120) {
      user.updatePassword(document.getElementById('newpassword').value).then(function() {
        db.collection("users").doc(user.uid).update({
          passchange: firebase.firestore.FieldValue.serverTimestamp()
        }).then(function() {
          window.setTimeout(function() {
            toggleloader()
            window.setTimeout(function() {
              showcomplete()
              window.setTimeout(function() {
                history.pushState(null, '', 'app.html?tab=returnstatuspass');
                window.location.reload()
              }, 3600)
              Snackbar.show({showAction: false,pos: 'bottom-center',text: "Updating records... Do not leave this page."})
            }, 200)
          }, 500)
        })
      }).catch(function(error) {
        window.setTimeout(function() {
          toggleloader()
          document.getElementById('erorrModalMsg').innerHTML = error
          $('#errorModal').modal('toggle')
        }, 800)
      });
    }
    else {
      
      
      window.setTimeout(function() {
        error('You are doing this too much! Please wait up to 2 hours or contact support.')
        toggleloader()
      }, 1000)
      
    }
  })
}

function confirmchangevisibility(result) {
  $('#changpasswordpopoverbtn').popover('hide');
  toggleloader()
  
  db.collection('users').doc(user.uid).update({
    type: result,
  }).then(function(doc) {
    window.setTimeout(function() {
      toggleloader()
      window.setTimeout(function() {
        showcomplete()
        window.setTimeout(function() {
          history.pushState(null, '', 'app.html?tab=returnstatus' + result);
          window.location.reload()
        }, 3600)
        Snackbar.show({showAction: false,pos: 'bottom-center',text: "Updating records... Do not leave this page."})
      }, 200)
    }, 800)
  })
}

function preparenpicchange() {
  u = document.createElement("input")
  u.id = 'newpicel'
  u.style.display = 'none'
  u.setAttribute("type", "file");
  u.setAttribute("accept", "image/*");
  document.getElementById('profilepicdyndiv').appendChild(u)
  $("#newpicel").change(function(){
    changepfp()
  });
  $('#newpicel').click()
}

async function changepfp() {
  
  toggleloader()
  file = document.getElementById('newpicel').files[0]
  ext = file.name.split('.').pop()
  
  var storageRef = firebase.storage().ref();
  var fileRef = storageRef.child(`logos/${user.uid}.${ext}`);
  
  await fileRef.put(file)
  
  window.setTimeout(() => {
    toggleloader()
    showcomplete()
    
    // Change existing records
    document.getElementById('mainphoto').src = "https://firebasestorage.googleapis.com/v0/b/eongram-87169.appspot.com/o/logos%2F" + user.uid + ".png?alt=media&" + new Date().getTime();
    document.getElementById('pfp3').src = "https://firebasestorage.googleapis.com/v0/b/eongram-87169.appspot.com/o/logos%2F" + user.uid + ".png?alt=media&" + new Date().getTime();
    
  }, 800)
  
  $('#newpicel').remove()
}

async function updateReplies() {
  a = $('#reply1box').val()
  b = $('#reply2box').val()
  c = $('#reply3box').val()
  
  await db.collection('users').doc(user.uid).set({
    quickreplies: [a,b,c]
  }, {merge: true})
  
  $('#qr-1btn').html(a)
  $('#qr-1btn').get(0).onclick = () => {
    quickreply(`${a}`)
  }
  $('#qr-2btn').html(b)
  $('#qr-2btn').get(0).onclick = () => {
    quickreply(`${b}`)
  }
  $('#qr-3btn').html(c)
  $('#qr-3btn').get(0).onclick = () => {
    quickreply(`${c}`)
  }
  
  Snackbar.show({text: "Quick replies updated."})
}

async function checkUrls() {
  if (sessionStorage.getItem('viewComments') !== 'null') {
    doc = await db.collection('new_posts').doc(sessionStorage.getItem('viewComments')).get()
    if (doc.exists) {
      loadComments(sessionStorage.getItem('viewComments'), doc.data().uid)
    }
  }
  
  if (sessionStorage.getItem('fullInfo') !== 'null') {
    showcomplete()
    fullscreen(sessionStorage.getItem('fullInfo'))
  }
  
  if (sessionStorage.getItem('viewInfo') !== 'null') {
    info(sessionStorage.getItem('viewInfo'))
  }
  
  if (sessionStorage.getItem('viewUser') !== 'null') {
    window.setTimeout(() => {
      usermodal(sessionStorage.getItem('viewUser'))
    }, 1000)
  }
  
  if (sessionStorage.getItem('viewPost') !== 'null') {
    window.setTimeout(() => {
      viewpost(sessionStorage.getItem('viewPost'))
    }, 1000)
  }
  
}

async function deleteAccount() {
  x = confirm('Are you sure you want to delete your account?')
  if (!x) { return; }

  x = confirm('// ECHO ACCOUNT DELETION ** \n\nPreparing to delete account of ID: ' + user.uid + '\n\n, of name: ' + cacheuser.name + '\n\n\nThis action is irreversible.')
  if (!x) { return; }

  x = prompt('Please enter your password to reauthenticate. After authenticating, your account will be deleted.')

  const credential = firebase.auth.EmailAuthProvider.credential(
    user.email, 
    x
  );

  user.reauthenticateWithCredential(credential).then(function() {
    x = confirm('Reauthenticated. Final deletion confirmation:')
    if (!x) { return; }
    user.delete().then(function() {
      // User deleted.
      alert("ACCOUNT DELETED.")
    }).catch(function(error) {
      alert(error.message)
      // An error happened.
    });
  }).catch(function(error) {
    alert(error.message)
    // An error happened.
  });
}