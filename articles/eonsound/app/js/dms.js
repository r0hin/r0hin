// DMs.js
// Direct messaging section of the social platform.
window.previousUID = 'ski';
window.cacheMsgListen = undefined;
sessionStorage.setItem('firstTimeDirect', 'true');

// Activate listeners
async function msgListener() {
  doc = await db.collection("directlisteners").doc(user.uid).get()
  if (doc.exists) {
    msgListenerConfirm()
  } 
  else {
    await db.collection("directlisteners").doc(user.uid).set({
      most_recent_sender: "none",
      unreadTOTAL: [],
    })
    msgListenerConfirm()
  }
}
function msgListenerConfirm() {
  db.collection("directlisteners").doc(user.uid).onSnapshot((doc) => {
    updateUnread(doc.data().iHaveRead)
    $(`.pingSpan`).html('')
    cacheMsgListen = doc.data()
    updatePings(doc.data())
  });
}

function updateUnread(readList) {
  if (typeof(readList) == 'undefined') {
    readList = []
  }
  $(`.readNotice`).addClass('invisible')
  $(`.readNotice`).removeClass('fadeIn')
  window.setTimeout(() => {
    for (let i = 0; i < readList.length; i++) {
      $(`#unread${readList[i]}`).removeClass('invisible')
      $(`.readNotice`).addClass('fadeIn')
    }
  }, 240)
}

function updatePings(data) {
  var pingData = data;
  if (!data) {
    var pingData = cacheMsgListen
  }
  if (!pingData.unreadTOTAL.length) {
    $('#friendsText').html('Friends')
  }
  else {
    if (sessionStorage.getItem('firstTimeDirect') == 'true') {
      Snackbar.show({text: "You have unread messages awaiting you!", pos: 'bottom-right'})
    }
  }
  for (let i = 0; i < pingData.unreadTOTAL.length; i++) {
    $(`#${pingData.unreadTOTAL[i]}unread`).html('UNREAD')
    $('#friendsText').html('Friends (!)')
  }

  if (pingData.most_recent_sender !== "none" && pingData.most_recent_sender !== "read" && sessionStorage.getItem('firstTimeDirect') !== 'true') {
    // On listener change, enact recent changes if a DM was changed and it was not the client
    ENACT_CHANGES(pingData);
  }
  sessionStorage.setItem('firstTimeDirect', 'false')
}

async function ENACT_CHANGES(data) {
  string = dmstringify(user.uid, data.most_recent_sender)
  
  if (sessionStorage.getItem('CURRENTAB') !== 'friends') {
    Snackbar.show({text: `${data.username} says ${data.msg}.`, pos: 'bottom-right'})
  }
  
  // If the chat window exists
  if ($(`#messagecontent${data.most_recent_sender}`).length) {
    BUILD_MESSAGE(data.username, data.msg, data.most_recent_sender, data.most_recent_sender, true);
    scrollBottom(data.most_recent_sender)
    
    // If its actively in view
    if (!$(`#${data.most_recent_sender}UserView`).hasClass('hidden') && sessionStorage.getItem('CURRENTAB') == 'friends') {
      db.collection("directlisteners").doc(user.uid).update({
        most_recent_sender: "none",
        unreadTOTAL: firebase.firestore.FieldValue.arrayRemove(data.most_recent_sender)
      })
      // Tell other user that you have read it.
      db.collection("directlisteners").doc(data.most_recent_sender).update({
        iHaveRead: firebase.firestore.FieldValue.arrayUnion(user.uid),
        most_recent_sender: "read",
      })
    }
  }
}

async function ADD_MESSAGE(uid, msg) {
  $(`delivered${uid}`).addClass('invisible')
  $(`delivered${uid}`).removeClass('fadeIn')
  if (msg == ' ' || !msg) {
    return
  }

  BUILD_MESSAGE(cacheuser.username, msg, user.uid, uid, true)

  $(`#newdmmsg${uid}`).val('')
  
  string = dmstringify(user.uid, uid)
  
  await db.collection('direct').doc(string).set({
    messages: firebase.firestore.FieldValue.arrayUnion({
      user: user.uid,
      username: cacheuser.username,
      msg: msg,
      unique: Math.random(0, 100000000000),
    })
  }, {merge: true})

  await db.collection('directlisteners').doc(uid).set({
    most_recent_sender: user.uid,
    photo_url: cacheuser.url,
    username: cacheuser.username,
    msg: msg,
    unique: Math.random(0, 100000000000),
    unreadTOTAL: firebase.firestore.FieldValue.arrayUnion(user.uid),
  }, {merge: true})

  await db.collection('directlisteners').doc(user.uid).update({
    most_recent_sender: 'none',
    iHaveRead: firebase.firestore.FieldValue.arrayRemove(uid)
  })
  
  window.setTimeout(() => {
    $(`delivered${uid}`).removeClass('invisible')
    $(`delivered${uid}`).addClass('fadeIn')
  }, 380)

  // scrollBottom(uid)
}

function BUILD_MESSAGE(name, msg, sender, uid, anim) {
  p = document.createElement("div");
  if (anim) {anim = ' animated fadeInUp'} else {anim = ''}
  p.setAttribute('class', 'messagecontainer' + anim)

  p.innerHTML = `
  <img src="${cacheUserFriendsMap[sender]}" />
  <span><b>${name}</b></span>
  <span>${msg}</span>
  `

  if (previousUID === sender) {
    // Attach it to bottommost element
    $(`#messagecontent${uid}`).children().last().get(0).innerHTML += `<span>${msg}</span>`
  }
  else {
    $(`#messagecontent${uid}`).get(0).appendChild(p)
  }

  if (anim) {
    // Live updating so scroll to bottom
    scrollBottom(uid)
  }

  previousUID = sender
}

async function loadMessages(id) {
  previousUID = 'ski'
  var doc = await db.collection('direct').doc(dmstringify(user.uid, id)).get()
  if (!doc.exists || !doc.data().messages || !doc.data().messages.length) {
    $(`#messagecontainers${id}`).removeClass('hidden')
    return;
  }

  if (doc.data().messages.length > 120) {
    // Clear up to 50
    newMessages = doc.data().messages.splice(doc.data().messages.length - 50, doc.data().messages.length)
    await db.collection('direct').doc(dmstringify(user.uid, id)).update({
      messages: newMessages
    })
  }

  for (let i = 0; i < doc.data().messages.length; i++) {
    const element = doc.data().messages[i];
    BUILD_MESSAGE(element.username, element.msg, element.user, id, false)
  }
  $(`#messagecontainers${id}`).removeClass('hidden')
  await db.collection('directlisteners').doc(id).set({
    most_recent_sender: 'none',
    iHaveRead: firebase.firestore.FieldValue.arrayUnion(user.uid)
  }, {merge: true})
  await db.collection('directlisteners').doc(user.uid).set({
    most_recent_sender: 'none',
    unreadTOTAL: firebase.firestore.FieldValue.arrayRemove(id)
  }, {merge: true})
  
  updatePings(cacheMsgListen)
  updateUnread(cacheMsgListen.iHaveRead)

  scrollBottom(id)
}

function scrollBottom(id) {
  $(`#messagecontainers${id}`).scrollTop($(`#messagecontainers${id}`)[0].scrollHeight);
}