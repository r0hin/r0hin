// social.js
// The file includes all the details associated with the social section of EonSound.
// Things like accounts, following, timelines, etc will be managed here.

window.cacheUserFriends = []
window.cacheUserFriendsUIDs = []
window.cacheFriendData = {}
window.timers = {}

window.db = firebase.firestore();
document.getElementById("addFriendBox").addEventListener("keyup", function (event) { if (event.keyCode === 13) { event.preventDefault(); addFriend($('#addFriendBox').val());$('#addFriendBox').val('') }});
async function loadFriends() {
  if (typeof(cacheuser) == 'undefined') {
    window.setTimeout(() => {
      loadFriends()
    }, 2000)
    return;
  }
  loadRequests()
  loadActivity()
}

async function loadRequests() {
  // Setup a listener and adjust elements accordingly
  db.collection('requests').doc(user.uid).onSnapshot(async (doc) => {
    if (!doc.exists) {
      await db.collection('requests').doc(user.uid).set({
        requests: []
      })
      return;
    }
    if (typeof(doc.data().requests) == 'undefined') {
      doc.data().requests = []
    }
    $('#requests').empty()
    $('#incNum').html(doc.data().requests.length)
    if (doc.data().requests.length === 0) {
      $('#incNum').html('')
      $('#requests').html('<center>You have no incoming friend requests 😭.</center>')
    }
    for (let i = 0; i < doc.data().requests.length; i++) {
      const activeRequest = doc.data().requests[i];
      k = document.createElement('div')
      k.setAttribute('class', 'card userRequestCard')
      k.setAttribute('id', activeRequest.id + 'rqcard')
      k.innerHTML = `
        <img src="${activeRequest.p}" />
        <h4>${activeRequest.u}</h4>
        <button onclick="denyRequest('${activeRequest.id}', '${activeRequest.p}', '${activeRequest.u}')" class="btn-text-danger"><i class='bx bx-message-square-x'></i></button>
        <button onclick="approveRequest('${activeRequest.id}', '${activeRequest.p}', '${activeRequest.u}')" class="btn-contained-success"><i class='bx bx-message-square-check'></i></button>
      `
      $('#requests').get(0).appendChild(k)
    }
    initButtonsText()
    initButtonsContained()
  });

  db.collection('users').doc(user.uid).onSnapshot(function(doc) {

    // No friends lolol
    if (typeof(doc.data().friends) == 'undefined' || doc.data().friends.length == 0) {
      $('#horizontal_friends_list').html(`<center class="animated zoomIn">You have no friends :(. Click the <i class='bx bx-message-square-add'></i> button to add some.</center>`)
    }

    // Someone removed you
    if (cacheUserFriends.length !== 0 && cacheUserFriends.length > doc.data().friends.length) {
      // Empty everything and rebuild
      Snackbar.show({text: "Friends list updated.", pos: 'top-center'})
      cacheUserFriends = doc.data().friends
      buildFriends(doc.data().friends)
      $('#user_content').empty()
    }

    if (doc.data().friends && cacheUserFriends.length !== doc.data().friends.length) {
      cacheUserFriends = doc.data().friends
      buildFriends(doc.data().friends)
    }
    window.cacheuser = doc.data()
    $('#requested').empty()
    if (typeof(cacheuser.requested) == 'undefined') {
      cacheuser.requested = []
    }
    $('#outNum').html(cacheuser.requested.length)
    if (cacheuser.requested.length === 0) {
      $('#outNum').html('')
      $('#requested').html('<center>You have no outgoing friends requests 😪.</center>')
    }
    for (let i = 0; i < cacheuser.requested.length; i++) {
      const activeRequest = cacheuser.requested[i];
      k = document.createElement('div')
      k.setAttribute('class', 'card userRequestCard')
      k.setAttribute('id', activeRequest.id + 'rqcard')
      k.innerHTML = `
        <img src="${activeRequest.p}" />
        <h4>${activeRequest.u}</h4>
        <button onclick="cancelRequest('${activeRequest.id}', '${activeRequest.p}', '${activeRequest.u}')" class="btn-text-danger"><i class='bx bx-message-square-x'></i></button>
      `
      $('#requested').get(0).appendChild(k)
    }
    initButtonsText()
    initButtonsContained()
  });
}

async function loadActivity() {
  window.setTimeout(() => {
    db.collection('app').doc('activity').onSnapshot((doc) => {
      $('.musicSpan').addClass('hidden')
      var friendsActivity = []
      for (let i = 0; i < doc.data().data.length; i++) {
        if (cacheUserFriendsUIDs.includes(doc.data().data[i])) {
          friendsActivity.push(doc.data().data[i])
        }
      }
      loadFriendActivity(friendsActivity, doc.data())
    })
  }, 1085)
}

async function loadFriendActivity(friendsActivity, data) {
  for (let i = 0; i < friendsActivity.length; i++) {
    const uid = friendsActivity[i];
    var userLength = data[uid].l
    var userStart = dayjs(data[uid].t)
    var currentDate = dayjs(calcTime('+0'))

    var predictedEnd = userStart.add(userLength, 'seconds')

    // Check if it is before predicted end.
    if (currentDate.isBefore(predictedEnd)) {
      window.clearTimeout(timers[uid + 'timer'])
      var gonnaEndIn = predictedEnd.diff(currentDate, 'ms')
      $(`#${uid}listening`).removeClass('hidden') // User is listening and it will end in gonnaEndIn
      // Show some tooltips and stuff about the current song.
      $(`#${uid}listening2`).removeClass('hidden')
      $(`#${uid}listening`).tooltip({ trigger : 'hover' })
      $(`#${uid}listening`).attr('title', `Now listening to ${data[uid].n} by ${data[uid].a}`).tooltip('_fixTitle');

      $(`#${uid}listening2`).empty()
  
      trackQueueData = {
        name: data[uid].n,
        artists: data[uid].a,
        art: data[uid].c,
        id: data[uid].id,
      }
      if ($(`#${uid}listening2`).length == 0) {
        // Thing doesnt exsist to queue it
        timers["toBuild_" + uid] = {
          a: data[uid].id,
          b: trackQueueData,
          c: uid + data[uid].id,
          d: `${uid}listening2`,
          e: 'none'
        }
      }
      else {
        await track(data[uid].id, trackQueueData, uid + data[uid].id, `${uid}listening2`, 'none')
        $(`#${uid + data[uid].id}`).imagesLoaded(() => {
          $(`#${uid + data[uid].id}`).removeClass('hidden')
        })
      }

      timers[uid + 'timer'] = window.setTimeout(() => {
        $(`#${uid}listening`).addClass('hidden') // User is no longer listening
        $(`#${uid}listening2`).addClass('hidden')
      }, gonnaEndIn + 1000)
    }
    else {
      window.clearTimeout(timers[uid + 'timer'])
      $(`#${uid}listening`).addClass('hidden') // User is not listening
      $(`#${uid}listening2`).addClass('hidden')
    }
    
  }
}

async function addFriend(username) {
  // Gather info from username
  $('#friendPreview').empty()
  if (typeof(appDoc) == 'undefined') {
    window.appDoc = await db.collection('app').doc('details').get()
  }

  friendIndex = appDoc.data().usernames.indexOf(username)
  if (friendIndex == -1) {
    Snackbar.show({text: "No one exists with this username.", pos: 'top-center'})
    return;
  }

  var doc = await db.collection('users').doc(appDoc.data().map[friendIndex]).get()
  var data = doc.data()

  g = document.createElement('div')
  g.setAttribute('class', 'card previewLargeCard animated fadeIn')
  g.innerHTML = `
  <img src="${data.url}">
  <div class="content">
    <h3>${data.name}</h3> <span class="chip">${data.username}</span>
  </div>
  <div class="actions">
    <button onclick="confirmFriend('${data.uid}', '${data.username}', '${data.url}', '${data.name}')" class="btn-text-primary">Send Follow Request</button>
  </div>
  `
  $('#friendPreview').get(0).appendChild(g)
  initButtonsText()
}

async function confirmFriend(uid, username, url) {
  $('#friendPreview').empty()

  if (username == cacheuser.username) {
    Snackbar.show({text: "You cannot send a friend request to yourself!", pos: 'top-center'})
    return;
  }

  await db.collection('requests').doc(uid).set({
    requests: firebase.firestore.FieldValue.arrayUnion({
      u: cacheuser.username,
      p: cacheuser.url,
      id: user.uid,
    })
  }, {merge: true})

  await db.collection('users').doc(user.uid).set({
    requested: firebase.firestore.FieldValue.arrayUnion({
      u: username,
      p: url,
      id: uid,
    })
  }, {merge: true})

  Snackbar.show({text: `Friend request sent to ${username}.`, pos: 'top-center'})
}

async function cancelRequest(id, url, username) {
  await db.collection('users').doc(user.uid).update({
    requested: firebase.firestore.FieldValue.arrayRemove({
      id: id,
      p: url,
      u: username,
    })
  })
  await db.collection('requests').doc(id).update({
    requests: firebase.firestore.FieldValue.arrayRemove({
      id: user.uid,
      p: cacheuser.url,
      u: cacheuser.username,
    })
  })

  Snackbar.show({text: `Cancelled request to ${username}.`, pos: 'top-center'})
}

async function approveRequest(id, url, username) {
  var acceptFriend = firebase.functions().httpsCallable("acceptFriend");
  acceptFriend({ uid: id, myurl: cacheuser.url, myusername: cacheuser.username })

  await db.collection("users").doc(user.uid).update({
    requested: firebase.firestore.FieldValue.arrayRemove({
      id: id,
      p: url,
      u: username
    }),
    friends: firebase.firestore.FieldValue.arrayUnion({
      id: id,
      p: url,
      u: username
    }),
  })

  await db.collection("requests").doc(user.uid).update({
    requests: firebase.firestore.FieldValue.arrayRemove({
      id: id,
      p: url,
      u: username
    })
  })
  
  Snackbar.show({text: `Accepted friend request from ${username}.`})
}

async function denyRequest(id, url, username) {
  var denyFriend = firebase.functions().httpsCallable("denyFriend");
  denyFriend({ uid: id, url: cacheuser.url, username: cacheuser.username })

  await db.collection("users").doc(user.uid).update({
    requested: firebase.firestore.FieldValue.arrayRemove({
      id: id,
      p: url,
      u: username
    }),
  });

  await db.collection("requests").doc(user.uid).update({
    requests: firebase.firestore.FieldValue.arrayRemove({
      id: id,
      p: url,
      u: username
    }),
  });

  Snackbar.show({text: `Denied friend request from ${username}.`})
}

async function buildFriends(friends) {
  $('#horizontal_friends_list').empty()
  console.log(friends);
  for (let i = 0; i < friends.length; i++) {
    const friend = friends[i];
    cacheUserFriendsUIDs.push(friend.id)
    cacheUserFriendsMap[friend.id] = friend.p
    o = document.createElement('div')
    o.setAttribute('class', 'hidden animated zoomIn friendItem friend')
    o.setAttribute('id', friend.id + 'iconElement')
    o.setAttribute('user_details', friend.id)
    o.onclick = () => {
      openSocial(friend.id, i)
    }
    o.innerHTML = `
    <img src="${friend.p}" />
    <h4>${friend.u}</h4>
    <span class="musicSpan animated zoomIn hidden" data-toggle="tooltip" data-placement="top" title="Listening to Music" id="${friend.id}listening"> <i class='bx bx-music animated'></i> </span>
    <span class="pingSpan" id="${friend.id}unread"></span>
    `
    $('#horizontal_friends_list').get(0).appendChild(o)
    $(`#${friend.id}iconElement`).imagesLoaded(() => {
      $(`#${friend.id}iconElement`).removeClass('hidden');
      var animationDelay = i * 1000
      var animationDelay = animationDelay / 8
      $(`#${friend.id}iconElement`).get(0).setAttribute('style', 'animation-delay: ' + animationDelay + 'ms')
    })
  }

  $('#horizontal_friends_list').imagesLoaded(() => {
    updatePings()
  })

}

async function openSocial(id, index) {
  // Remove all the others
  $('.friendView').addClass('hidden')

  // Check if view exists
  if ($(`#${id}UserView`).length) {
    // Show and ensure unread if it does
    $(`#${id}UserView`).removeClass('hidden')

    await db.collection('directlisteners').doc(id).set({
      most_recent_sender: 'none',
      iHaveRead: firebase.firestore.FieldValue.arrayUnion(user.uid)
    }, {merge: true})
    await db.collection('directlisteners').doc(user.uid).set({
      most_recent_sender: 'none',
      unreadTOTAL: firebase.firestore.FieldValue.arrayRemove(id)
    }, {merge: true})

    updateUnread(cacheMsgListen.iHaveRead)
    return;
  }

  // Build if it doesn't
  h = document.createElement('div')
  h.setAttribute('class', 'animated fadeIn fastest friendView')
  h.setAttribute('id', id + 'UserView')
  h.innerHTML = `
    <div class="userviewcol">
      <center>
        <div class="card frcard centeredx">
          <div class="card-body">
            <img class="img" src="${cacheUserFriends[parseInt(index)].p}"/>
            <h2>${cacheUserFriends[parseInt(index)].u}</h2>
            <br><br>
            <div id="${id}listening2" class="listening2"></div>
            <br>
            <button onclick="showUserPlaylists('${id}')" class="btn-outlined-primary">Show Playlists</button>
            <div class="dropdown">
              <button aria-haspopup="false" class="btn-text-primary froptions" data-toggle="dropdown">
                <i class='bx bx-dots-vertical-rounded' ></i>
              </button>
              <div class="dropdown-menu menu">
                <a onclick="showUserPlaylists('${id}')" class="dr-item">View Playlists</a>
                <div class="dropdown-divider"></div>
                <a onclick="friendInfo('${id}')" class="dr-item">Info</a>
                <a onclick="removeFriend('${id}')" class="dr-item danger">Remove Friend</a>
              </div>
            </div>
            <br><br>
            <div id="user_playlists_${id}" class="socialUserPlaylistView hidden"></div>
          </div>
        </div>
      </center>
    </div>
    <div class="msgcontainer msgcol animated fadeIn hidden" id="messagecontainers${id}">
      <div id="messagecontent${id}">  
      </div>
      <br>
      <div class="relative2">
        <div id="unread${id}" class="invisible animated fadeIn fastest readNotice">
          <i class="bx bx-check-double"></i> Read
        </div>
        <div id="delivered${id}" class="animated fadeIn fastest deliveredNotice">
          <i class="bx bx-check"></i> Delivered
        </div>
        <div class="floating-label textfield-box newmsgbox">
          <label for="newdmmsg${id}">New Message</label>
          <input class="form-control" id="newdmmsg${id}" placeholder="" type="text">
        </div>
          <div id="dimensions_calculations_box"></div>
        </div>
      </div>
      <!-- Out of the viewport. User can scroll down whilst image loads.  -->
    </div>
  `
  $('#user_content').get(0).appendChild(h)
  if (timers["toBuild_" + id]) {
    // To build not there
    await track(timers["toBuild_" + id]['a'], timers["toBuild_" + id]['b'], timers["toBuild_" + id]['c'], timers["toBuild_" + id]['d'], timers["toBuild_" + id]['e'])
    $(`#${timers["toBuild_" + id]['c']}`).imagesLoaded(() => {
      $(`#${timers["toBuild_" + id]['c']}`).removeClass('hidden')
    })
  }
  initButtonsOutlined()
  initButtonsText()
  initButtonsDropdown()
  loadMessages(id)
  document.getElementById("newdmmsg" + id).addEventListener("keyup", function (event) { if (event.keyCode === 13) { event.preventDefault(); ADD_MESSAGE(id, event.target.value) }});
  
}

async function friendInfo(uid) {
  // Soon
  if (!cacheFriendData[uid]) {
    var data = await db.collection('users').doc(uid).get()
    cacheFriendData[uid] = data.data()
    var data = data.data()
  }
  else {
    var data = cacheFriendData[uid]
  }

  $('#mediaInfo').modal('toggle')
  $('#mediainfolist').empty()
  newMediaInfo('Name', data.name)
  newMediaInfo('Username', data.username)
  newMediaInfo('Type', 'User')
  newMediaInfo('Date Created', data.created.toDate().toString().split('GMT').shift())
  newMediaInfo('Friends', data.friends.length)
  newMediaInfo('Publicity', data.type)
  newMediaInfo('ID', data.uid)
}

async function removeFriend(uid) {
  // Grab match
  var match = undefined
  for (let i = 0; i < cacheUserFriends.length; i++) {
    if (cacheUserFriends[i].id == uid) { match = i }
  }
  if (typeof(match) == "undefined") {
    alert('Internal error.')
  }

  await db.collection("users").doc(user.uid).update({
    friends: firebase.firestore.FieldValue.arrayRemove({
      id: uid,
      p: cacheUserFriends[match].p,
      u: cacheUserFriends[match].u
    }),
  })

  var removeFriend = firebase.functions().httpsCallable("removeFriend");
  removeFriend({ uid: uid, url: cacheuser.url, username: cacheuser.username })


  Snackbar.show({text: `Updated friends list.`, pos: 'top-center'})
}

async function showUserPlaylists(uid) {
  $('#user_playlists_' + uid).toggleClass('hidden')
  if (!$('#user_playlists_' + uid).children().length) {
    console.log('Empty');

    // Get user playlists
    if (!cacheFriendData[uid]) {
      var playlistUserdDoc = await db.collection('users').doc(uid).get()
      var playlistUserdDoc = playlistUserdDoc.data()
    }
    else {
      var playlistUserdDoc = cacheFriendData[uid]
    }
    var userPlaylists8 = playlistUserdDoc.playlistsPreview

    if (typeof(userPlaylists8) == 'undefined') {
      $('#user_playlists_' + uid).html('No playlists.')
      return;
    }

    for (let i = 0; i < userPlaylists8.length; i++) {
      await otherUserBPlaylist(userPlaylists8[i].id, userPlaylists8[i], userPlaylists8[i].id + 'otheruserlibraryplaylistelement', 'user_playlists_' + uid, uid)
      $(`#${userPlaylists8[i].id}otheruserlibraryplaylistelement`).imagesLoaded(() => {
        $(`#${userPlaylists8[i].id}otheruserlibraryplaylistelement`).removeClass('hidden')
        window.setTimeout(() => {
        // Some browsers will take a while to finish.
        colorThiefify('userPlaylistPreview', userPlaylists8[i].id + 'otheruserlibraryplaylistelementimage', userPlaylists8[i].id + 'otheruserlibraryplaylistelement')
      }, 100)
    })
      
    }

  }
}