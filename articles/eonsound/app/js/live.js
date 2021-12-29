// live.js
// Includes all scripts for EonSound listening parties and live listening. 

try {
  eval(`window.ipc = require('electron').ipcRenderer`)
} catch(error) {console.log('Unable to initalize Electron IPC Renderer.');}

window.musicQueue = [];
window.musicActive = {none: 'none'};
window.musicHistory = [];
window.player = new Plyr("audio", {settings: []})
window.firstLoad = true
window.activeParty = null
window.animateMsgs = false
window.owner = false
window.ignoreSeek = false
window.datae = {}

$("#main_player").bind("ended", function () {
  endedSong();
});

$("#main_player").bind("seeked", async (event) => {
  if (owner) {
    if (ignoreSeek) {
      ignoreSeek = false
    }
    await db.collection('parties').doc(activeParty).update({
      messages: firebase.firestore.FieldValue.arrayUnion({
        name: cacheuser.name,
        art: cacheuser.url,
        content: player.currentTime,
        eonsound: 'seek',
        skiddyo: Math.random(100000),
      }) 
    })
  }
});

// Input enter key listeners
try {
  document.getElementById("searchbox1").addEventListener("keyup",function(e){13===e.keyCode&&(e.preventDefault(),document.getElementById("sbuton").click())}),document.getElementById("partyfield1").addEventListener("keyup",function(e){13===e.keyCode&&(e.preventDefault(),document.getElementById("gobtnjoin").click())}),document.getElementById("newmsgbox").addEventListener("keyup",function(e){13===e.keyCode&&(e.preventDefault(),sendMessage(document.getElementById("newmsgbox").value),$("#newmsgbox").val(""))});
} catch (error) {
  console.log('Prob Discussion')
}

function artistToString(artists) {
  if (artists.length == 1) {
    return artists[0].name
  }
  
  snippet = ''

  for (let i = 0; i < artists.length; i++) {
    const artist = artists[i].name;
    if (i == artists.length - 1) {
      // Last item
      snippet = snippet + 'and ' + artist
    }
    else {
      // Regular item
      snippet = snippet + artist + ', '
    }
  }

  return snippet
}

var firebaseConfig = {
  apiKey: "AIzaSyBNf1JpByuDebVLq_lns8fYv4Pyo3kzvoM",
  authDomain: "eonsound.firebaseapp.com",
  databaseURL: "https://eonsound.firebaseio.com",
  projectId: "eonsound",
  storageBucket: "eonsound.appspot.com",
  messagingSenderId: "824179683788",
  appId: "1:824179683788:web:81830e10e40b4b887ded69",
};

firebase.initializeApp(firebaseConfig);
window.db = firebase.firestore();

firebase.auth().onAuthStateChanged(async function (user) {
  if (user) {
    // User is signed in.

		window.user = user;

    if (!user.emailVerified) {
      window.location.replace("app.html");
      return;
    }

    doc = await db.collection('users').doc(user.uid).get()
    cacheuser = doc.data()

    left()

    try {
      initDiscussions()
    } catch (error) {
      console.log('Not discussionsP')
    }

  } else {
    window.location.replace("welcome.html");
  }
});

async function createParty() {
  // Generate ID, show ID, open the ID.

  docRef = await db.collection('parties').add({
    owner: user.uid,
    messages: [],
    queue: [],
    requested: [],
    map: [],
    userData: [],
    playing: {none: 'none'},
    startedSong: firebase.firestore.FieldValue.serverTimestamp(),
  })

  Snackbar.show({pos: 'top-center',text: "Party created."})

  joinParty(docRef.id)
}

function showPending() {
  $('#unjoined').addClass('hidden')
  $('#joined').addClass('hidden')
  $('#pending').removeClass('hidden')
}

async function joinParty(id) {
  // Opening party
  window.activeParty = id

  listener = db.collection('parties').doc(id).onSnapshot(async (doc) => {

    if (!doc.exists) {
      Snackbar.show({pos: 'top-center',text: "No party exists with this ID."})
      return;
    }

    if (!doc.data().map.includes(user.uid) && doc.data().owner !== user.uid) {
      // Not allowed, make a request
      await db.collection('parties').doc(id).update({
        requested: firebase.firestore.FieldValue.arrayUnion({
          name: cacheuser.name,
          photo: cacheuser.url,
          uid: user.uid,
        })
      })
      showPending()
      return;
    }

    buildUsers(doc.data().userData, doc.data().requested)

    if (doc.data().messages.length > 96) {
      // Clear em
      await db.collection('parties').doc(id).update({
        messages: [],
      })
      return;
    }

    tempMsgs = doc.data().messages
    tempMsgs.splice(0, tempMsgs.length - 12)
    buildMessages(tempMsgs)

    animateMsgs = true

    if (firstLoad) {
      firstLoad = false
      if (doc.data().owner == user.uid) {
        window.owner = true
        $('#owner').removeClass('hidden')
        $('#nonowner').addClass('hidden')
        loadOwner(doc)
      }
      else {
        window.owner = false
        $('#nonowner').removeClass('hidden')
        $('#owner').addClass('hidden')
        loadNonOwner(doc)
      }

      await db.collection('parties').doc(activeParty).update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          name: cacheuser.name,
          art: cacheuser.url,
          content: '',
          eonsound: 'joined',
          skiddyo: Math.random(100000)
        }) 
      })

      joined()
    }
  
  })
}

async function joined() {
  $('#unjoined').addClass('hidden')
  $('#pending').addClass('hidden')
  $('#joined').removeClass('hidden')
}

async function left() {
  $('#unjoined').removeClass('hidden')
  $('#pending').addClass('hidden')
  $('#joined').addClass('hidden')
}

async function loadNonOwner(doc) {

}

async function loadOwner(doc) {
  initSpotifyCode();
}

async function initSpotifyCode() {
  // Check if access token stored in database is valid
  doc = await db.collection("users").doc(user.uid).collection("access").doc("spotify").get();
  if (!doc.exists) {
    alert('Cannot authenticate.'); window.location.replace("auth.html");
  }

  token = doc.data().access; window.spotifyToken = token;
  // Exchange refresh token for a new token
  refreshCode()
}

async function search(term) {
  $('#searchbox1').val('')
  if (term == '') {
    return;
  }

  data = await goFetch(`search?q=${term}&type=track`)

  $('#musicSearch').empty()

  for (let i = 0; i < data.tracks.items.length; i++) {
    // Build search element.
    element = data.tracks.items[i]

    a = document.createElement('div')
    a.setAttribute('class', 'track')
    a.setAttribute('onclick', `queueSongWithoutData('${element.id}')`)

    a.innerHTML = `
      <img src="${element.album.images[0].url}"></img>
      <h3>${element.name}</h3>
      <p>${artistToString(element.artists)}</p>
    `
    
    $('#musicSearch').get(0).appendChild(a)
  }
  
}

async function downloadSong(trackID, spotifyURL, trackName) {
  return new Promise(async (resolve, reject) => {
    var requestSong = await firebase.functions().httpsCallable("requestSong");
    try {
      downloadedTrack = await requestSong({ trackID: trackID, trackURL: spotifyURL});
    } catch (error) {
      Snackbar.show({pos: 'top-center',text: `${trackName} could not be downloaded.`})
      resolve('no')
    }
    if(typeof(downloadedTrack.data) == 'string') {
      // default
      resolve(downloadedTrack.data)
    }
    else{
      resolve(downloadedTrack.data.song)
    }
    resolve(downloadedTrack)
  })
}

async function queueSongWithoutData(id, skipMsg) {
  return new Promise(async (resolve, reject) => {
    // Gather data, then queue

    data = await goFetch(`tracks/${id}`)

    savedData = {
      art: data.album.images[0].url,
      album_name: data.album.name,
      artists: artistToString(data.artists),
      id: data.id,
      name: data.name,
      url: null,
      spotifyURL: data.external_urls.spotify,
    }

    await queueSong(savedData, skipMsg)    
    resolve('Skidop freshski')
  })
}

async function endedQueue() {
  $('#queueProgress').addClass('zoomOut')
  $('#playing_album_cover').removeClass('zoomIn')
  $('#playing_album_cover').addClass('zoomOut')
  $('#InjectedWidth').get(0).innerHTML = ``
  hidePlayer()
  visualQ_build()
  $('#showQueue').addClass('hidden')
  try {
    ipc.send('invokeAction', `queueDidEnd`); 
  } catch (error) { console.log('Unable to push invokeAction to Electron process. Browser?'); }
}

async function queueSong(data, skipMsg) {
  return new Promise((resolve, reject) => {
    if (musicActive.none !== 'none') {
      // There's a song playing so add it to queue
      musicQueue.push(data)
      if (!skipMsg) {
        Snackbar.show({pos: 'top-center',text: "Added " + data.name + " to queue."})
        $('#showQueue').removeClass('hidden')
        visualQ_build()
      }
      resolve('Skiddyo potpot')
    }
    else {
      // Just play it
      resolve(loadSong(data))
      $('#showQueue').addClass('hidden')
    }
  })
}

async function loadSong(data) {
  return new Promise(async (resolve, reject) => {
    try {
      openDiscussion(data.id)
    } catch (error) {
      console.log('Not discussions')
    }

    url = data.url
    showPlayerLive()
    $('#queueProgress').removeClass('zoomOut')
    $('#queueProgress').removeClass('hidden')
    $('#queueProgress').addClass('zoomIn')
    $('#playing_album_cover').removeClass('zoomIn')
    $('#playing_album_cover').addClass('zoomOut')
    if (!data.url) {
      loadertimer = window.setTimeout(() => {
        showLoader()
      }, 1500)
      url = await downloadSong(data.id, data.spotifyURL, data.name)
      window.clearInterval(loadertimer)
      hideLoader()
    }
  
    $('#title').html(`${data.name} by ${data.artists} on EonSound`)

    if ('mediaSession' in navigator) {

      navigator.mediaSession.metadata = new MediaMetadata({
        title: data.name,
        artist: data.artists,
        album: data.album_name,
        artwork: [
          { src: data.art, sizes: '940x940', type: 'image/png'},
        ]
      });
    
      navigator.mediaSession.setActionHandler('play', function() {player.play()});
      navigator.mediaSession.setActionHandler('pause', function() {player.pause()});
      navigator.mediaSession.setActionHandler('seekbackward', function() {player.rewind(9999)});
      navigator.mediaSession.setActionHandler('seekforward', function() {player.forward(9999)});
      navigator.mediaSession.setActionHandler('previoustrack', function() {skipPrevious()});
      navigator.mediaSession.setActionHandler('nexttrack', function() {skipForward()});
    }

    musicActive = data
    musicActive.url = url
  
    $('#main_player').get(0).setAttribute('src', url)
    $('#playing_album_cover').get(0).setAttribute('src', data.art)
    $('#playing_track_details').get(0).innerHTML = `<b>${data.name}</b>${data.artists}`
  
    $('#queueProgress').removeClass('zoomIn')
    $('#queueProgress').addClass('zoomOut')
    $('#playing_album_cover').removeClass('zoomOut')
    $('#playing_album_cover').removeClass('hidden')
    $('#playing_album_cover').addClass('zoomIn')
    window.setTimeout(() => {

      textWidth = $('#playing_track_details').width()

      // + 32 - padding
      // + 50 - album image
      songActionWidth = textWidth + 32 + 50
      // + 185 - song action width
      // + 24 - padding
      contentWidth = songActionWidth + 110 + 24
      playerWidth = 'calc(100% - ' + contentWidth + 'px)'
    
      $('#InjectedWidth').get(0).innerHTML = `
      .songactions {
        left: ${songActionWidth}px !important;
        transition: all 1s !important;
      }
    
      #player .plyr {
        width: ${playerWidth} !important;
        transition: all 1s !important;
      }
      `
    }, 1250)

    try {
      confirmSongPlayed()
    } catch (error) {}

    // TE STATUS PLAYING SOOOOOOOOOOOOOOONG
    console.log({
      name: cacheuser.name,
      art: cacheuser.url,
      content: musicActive,
      eonsound: 'addSong',
      skiddyo: Math.random(100000)
    });
    if (owner) {
      await db.collection('parties').doc(activeParty).update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          name: cacheuser.name,
          art: cacheuser.url,
          content: musicActive,
          eonsound: 'addSong',
          skiddyo: Math.random(100000)
        }) 
      })
    }

    player.play()
    window.setTimeout(() => {
      visualQ_build(true)
    }, 800)

    try {
      ipc.send('invokeAction', `${musicActive.name};;${data.artists}`); 
    } catch (error) { console.log('Unable to push invokeAction to Electron process. Browser?'); }

    resolve('successo expresso')
  })
}

async function endedSong() {
  // Song did end
  player.pause()

  if (!owner) {
    return;
  }

  // Move active song to history
  musicHistory.push(musicActive);

  musicActive = {none: 'none'}
  if (musicQueue.length > 0) {
    // Check if hide queue btn
    if (musicQueue.length == 1) {
      $('#showQueue').addClass('hidden')
    }

    // Next song
    loadSong(musicQueue[0])
    musicQueue.splice(0, 1)
  }
  else {
    // End queue
    endedQueue()
  }
}

function skipPrevious() {
  // Delete last element of history, to move it to first of queue
  // Twice as a dummy element to keep active song in front of next song.

  if (!musicHistory.length) {
    // Stop if there is no history to play.
    return;
  }

  if (musicActive.none !== "none") {
    // Song is playing, move it to first of queue
    musicQueue.unshift(musicActive);
  }

  // Play last element of history
  loadSong(musicHistory[musicHistory.length - 1], true);

  // Delete last element of history
  musicHistory.splice(musicHistory.length - 1, 1);
}

function skipForward() {
  endedSong();
}

async function visualQ_build(skipMsg) {
  if (!skipMsg) {
    skip = false
  }
  else {
    skip = true
  }
  if (owner) {
    await db.collection('parties').doc(activeParty).update({
      messages: firebase.firestore.FieldValue.arrayUnion({
        name: cacheuser.name,
        art: cacheuser.url,
        content: musicQueue,
        skip: skip,
        eonsound: 'updateQueue',
        skiddyo: Math.random(100000)
      }) 
    })
  }  

  try {
    $('#queueItems').empty()

  document.getElementById('queueNow').innerHTML = `
    <div class="userSong animated fadeInUp song" track_details="${musicActive.id}">
      <img src="${musicActive.art}"></img>
      <b>${musicActive.name}</b>
      <p>${musicActive.artists}</p>
    </div>
  `

  if (musicQueue.length || musicActive.none !== 'none') {
    $('#qesit').removeClass('hidden')
    $('#quenot').addClass("hidden")
  }
  else {
    $('#qesit').addClass('hidden')
    $('#quenot').removeClass("hidden")
  }

  for (let i = 0; i < musicQueue.length; i++) {
    const data = musicQueue[i]
    p = document.createElement('div')
    p.setAttribute('class', 'userSong animated flipInX song')
    p.setAttribute('track_details', data.id)
    p.onclick = () => {
      playSongsAtQueueIndex('0', 'queue')
    }
  
    p.innerHTML = `
      <img src="${data.art}"></img>
      <b>${data.name}</b>
      <p>${data.artists}</p>
    `
    
    document.getElementById('queueItems').appendChild(p)
    } 
  } catch (error) {
    console.log('Discusisons')
  }

}

function visualQ_build2(queue) {
  $('#queueItems2').empty()

  document.getElementById('queueNow2').innerHTML = `
    <div class="userSong animated fadeInUp song" track_details="${musicActive.id}">
      <img src="${musicActive.art}"></img>
      <b>${musicActive.name}</b>
      <p>${musicActive.artists}</p>
    </div>
  `

  if (queue.length || musicActive.none !== 'none') {
    $('#qesit2').removeClass('hidden')
    $('#quenot2').addClass("hidden")
  }
  else {
    $('#qesit2').addClass('hidden')
    $('#quenot2').removeClass("hidden")
  }

  for (let i = 0; i < queue.length; i++) {
    const data = queue[i]
    p = document.createElement('div')
    p.setAttribute('class', 'userSong animated flipInX song')
    p.setAttribute('track_details', data.id)
    p.onclick = () => {
      playSongsAtQueueIndex('0', 'queue')
    }
  
    p.innerHTML = `
      <img src="${data.art}"></img>
      <b>${data.name}</b>
      <p>${data.artists}</p>
    `
    
    document.getElementById('queueItems2').appendChild(p)
  }

}

function showPlayerLive() {
  $('#InjectedPlayer').get(0).innerHTML = `
    #usercard {
      bottom: 86px !important;
      transition: all 0.5s !important;
    }
    #loader {

    }
    
    #content {
      height: calc(100% - 131px) !important;
      transition: all 0.5s;
    }

    #chat {
      height: calc(100% - 95px) !important;
      transition: all 0.5s;
    }
  `
  $('#player').removeClass('fadeOutDown')
  $('#player').addClass('fadeInUp')
  $('#player').removeClass('hidden')

  if (!owner) {
    $('.plyr__progress__container').get(0).style.pointerEvents = 'none';
    $('[data-plyr="play"]').get(0).style.pointerEvents = 'none';
  }
  else {
    $('.plyr__progress__container').get(0).removeAttribute('style');
    $('[data-plyr="play"]').get(0).removeAttribute('style');
  }
  
}

function hidePlayer() {
  $('#InjectedPlayer').get(0).innerHTML = ``
  $('#player').addClass('fadeOutDown')
  $('#player').removeClass('fadeInUp')
}

function showLoader() {
  $('#loader').removeClass('fadeOutRight')
  $('#loader').addClass('fadeInRight')
  $('#loader').removeClass('hidden')
}

function hideLoader() {
  $('#loader').removeClass('fadeInRight')
  $('#loader').addClass('fadeOutRight')
}


async function sendMessage(val) {

  if (val.length < 2) {
    Snackbar.show({pos: 'top-center',text: "Your message is too short."})
    return;
  }

  await db.collection('parties').doc(activeParty).update({
    messages: firebase.firestore.FieldValue.arrayUnion({
      name: cacheuser.name,
      art: cacheuser.url,
      content: val,
      eonsound: 'default',
      skiddyo: Math.random(100000),
    }) 
  })
}

function buildMessages(data) {
  $('#messages').empty()
  for (let i = 0; i < data.length; i++) {
    msg = data[i]
    b = document.createElement('div')
    b.classList.add('message')
    b.classList.add('animated')
    datalengthminusone = data.length - 1
    latest = false
    if (animateMsgs && i == datalengthminusone) {
      latest = true
      b.classList.add('fadeIn')
    }

    b.innerHTML = `
      <img src="${msg.art}">
      <h5>${msg.name}</h5>
      <p>${msg.content}</p>
   `

    // CONDITONALS 

    if (msg.eonsound == 'addSong') {
      if (!owner && !firstLoad && latest) {
        loadSong(msg.content)
      }
      b.classList.add('SysMsg')
      b.innerHTML = `
      <img src="${msg.content.art}">
      <h5>New Track</h5>
      <p>${msg.content.name}</p>
   `
    }

    if (msg.eonsound == 'seek') {
      if (!owner && !firstLoad && latest) {
        player.restart()
        player.forward(parseFloat(msg.content)) 
      }
      b.classList.add('SysMsg')
      b.innerHTML = `
      <h5>Seeked</h5>
      <p>Timestamp: ${msg.content}</p>
      `
    }


    if (msg.eonsound == 'updateQueue') {
      if (!owner && !firstLoad && latest) {
        visualQ_build2(msg.content)
      }

      if (msg.skip) {
        continue;
      }
      b.classList.add('SysMsg')
      b.innerHTML = `
      <h5>Updated Queue</h5>
   `
    }


    if (msg.eonsound == 'joined') {
      b.classList.add('SysMsg')
      b.classList.add('joinMsg')
      b.innerHTML = `
        <h5>${msg.name} joined.</h5>
      `
    }






    document.getElementById("messages").appendChild(b)
  }


  window.setTimeout(() => {
    document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
  }, 200)
}

async function buildUsers(users, requested) {
  $('#pendingUsers').empty()
  $('#listOfUsers').empty()
  
  for (let i = 0; i < users.length; i++) {
    const element = users[i];

    c = document.createElement('div')
    c.classList.add('userItem')
    window.datae[element.uid] = {
      name: element.name,
      photo: element.photo,
      uid: element.uid
    }
    c.innerHTML = `
      <img src="${element.photo}"></img>
      <h4>${element.name}</h4>
      <button onclick="remove('${element.uid}')" class="btn-contained-primary">Remove</button>
    `
    $('#listOfUsers').get(0).appendChild(c)
    
  }

  if (requested.length == 0) {
    $('#pendingUsers').html('No requests.')
  }

  for (let i = 0; i < requested.length; i++) {
    const element = requested[i];

    c = document.createElement('div')
    c.classList.add('userItem')
    window.datae[element.uid] = {
      name: element.name,
      photo: element.photo,
      uid: element.uid
    }
    c.innerHTML = `
      <img src="${element.photo}"></img>
      <h4>${element.name}</h4>
      <button onclick="approve('${element.uid}')" class="btn-contained-primary">Approve</button>
    `
    $('#pendingUsers').get(0).appendChild(c)
    
  }

  initButtonsContained()
}

async function approve(uid) {
  db.collection("parties").doc(activeParty).update({
    requested: firebase.firestore.FieldValue.arrayRemove(datae[uid]),
    map: firebase.firestore.FieldValue.arrayUnion(uid),
    userData: firebase.firestore.FieldValue.arrayUnion(datae[uid])
  })
  // Get index of item an
}

async function remove(uid) {
  db.collection('parties').doc(activeParty).update({
    map: firebase.firestore.FieldValue.arrayRemove(uid),
    userData: firebase.firestore.FieldValue.arrayRemove(datae[uid])
  })
}

function copyCode() {
  navigator.clipboard.writeText(activeParty).then(function() {
    Snackbar.show({pos: 'top-center',text: "Copied code to clipboard!"})
  }, function(err) {
    alert('The code is: ' + activeParty)
  });
}

function leave() {
  player.pause()
  listener()
  left() 
}
