const db = firebase.firestore()

window.musicData = {}
window.activeID = ''

document.getElementById('discussionsearchbox').addEventListener("keyup", function(event) {
  if (event.keyCode === 13) { event.preventDefault(); searchDiscussion(document.getElementById('discussionsearchbox').value)}
});

document.getElementById('msgbox').addEventListener("keyup", function(event) {
  if (event.keyCode === 13) { event.preventDefault(); addMessage(document.getElementById('msgbox').value); document.getElementById('msgbox').value = ''}
});


function setDefaultVolume() {
  var vol = localStorage.getItem('defaultVolume')
  if (!vol || vol == '100') {
    player.decreaseVolume(1)
    player.increaseVolume(1)
    $('#defaultvolumetext').html('Default Volume: 100%')
    return;
  }

  $('#defaultvolumetext').html('Default Volume: ' + vol + '%')

  var vol = parseFloat(`0.${vol}`)

  player.decreaseVolume(1)
  player.increaseVolume(vol)
}

function initDiscussions() {
  initSpotifyCode();
  setDefaultVolume();
  getTrending()
  // Get trending searches
}

async function getTrending() {
  var doc = await db.collection('discussions').doc('APP_TRENDING').get()

  for (let i = 0; i < 3; i++) {
    $(`#ts_${i}`).html(doc.data()[`${i}`].display)
    $(`#ts_${i}`).get(0).onclick = () => {
      openDiscussion(doc.data()[i].id)
    }
  }

  $('#trending_searches').removeClass('hidden')

}

async function searchDiscussion(q) {
  closeDiscussion()
  console.log('Search for discussions of ID', q)
  document.getElementById('discussionsearchbox').value = '';
  $("#theSearchResults").empty();

  var searchData = await goFetch(`search?q=${q}&type=track&limit=5`)
  if (searchData.tracks.items.length === 0) {
    $("#theSearchResults").html('No tracks found for: ' + q)
  }
  for (let i = 0; i < searchData.tracks.items.length; i++) {
    // Build search element.
    element = searchData.tracks.items[i]

    a = document.createElement('div')
    a.setAttribute('class', 'track')
    a.setAttribute('onclick', `musicActive.none = 'none'; queueSongWithoutData('${element.id}')`)

    a.innerHTML = `
      <img src="${element.album.images[0].url}"></img>
      <h3>${element.name}</h3>
      <p>${artistToString(element.artists)}</p>
    `
    
    $('#theSearchResults').get(0).appendChild(a)
  }

  $('#theSearchResults').removeClass('hidden');
  $('#trending_searches').addClass('hidden');
}

function closeSearch() {
  $('#trending_searches').removeClass('hidden')
  $('#theSearchResults').addClass('hidden');
}

function confirmSongPlayed() {
  window.setTimeout(()=>{textWidth=$("#playing_track_details").width(),songActionWidth=textWidth+0+0,contentWidth=songActionWidth+68+24,playerWidth="calc(100% - "+contentWidth+"px)",$("#InjectedWidth").get(0).innerHTML=`\n      .songactions {\n        left: ${songActionWidth}px !important;\n        transition: all 1s !important;\n      }\n    \n      #player .plyr {\n        width: ${playerWidth} !important;\n        transition: all 1s !important;\n      }\n      `},1550);
}

async function openDiscussion(id) {
  closeDiscussion()

  window.setTimeout(()=>{textWidth=$("#playing_track_details").width(),songActionWidth=textWidth+0+0,contentWidth=songActionWidth+68+24,playerWidth="calc(100% - "+contentWidth+"px)",$("#InjectedWidth").get(0).innerHTML=`\n      .songactions {\n        left: ${songActionWidth}px !important;\n        transition: all 1s !important;\n      }\n    \n      #player .plyr {\n        width: ${playerWidth} !important;\n        transition: all 1s !important;\n      }\n      `},1550);
  $("#theSearchResults").empty();
  console.log('Open discussion of ID', id)
  window.activeID = id;

  $("#theForumPanel").removeClass("hidden")
  var songData = await goFetch('tracks/' + id)
  var artistData = await goFetch('artists/' + songData.artists[0].id)
  console.log(songData)

  $('#header').get(0).setAttribute('style', `background-image: url('${artistData.images[0].url}')`)
  $('#songName').html(artistData.name + ' - ' + songData.name)

  var doc = await db.collection('discussions').doc(activeID).get()
  if (!doc.exists) {
    await db.collection('discussions').doc(activeID).set({
      messages: [{
        n: 'System',
        c: 'Welcome to the discussion! You are the first one here.'
      }]
    })
  }

  
  messageListener = db.collection('discussions').doc(activeID).onSnapshot((snapshot) => {
    // Build messages
    $('#forum').empty()

    for (let i = 0; i < snapshot.data().messages.length; i++) {
      const element = snapshot.data().messages[i];

      var m = document.createElement('div')
      m.setAttribute('class', 'msg')
      m.innerHTML = `<b>${element.n}</b> ↠ ${element.c}`
      document.getElementById('forum').appendChild(m)

    }
  })

  // Set trending

  var keyN = 'ONE'
  var random = Math.floor(Math.random() * 3);

  await db.collection("discussions").doc('APP_TRENDING').set({
    [random]: {
      display: `${artistData.name} - ${songData.name}`,
      id: id
    },
  }, {merge: true})

}

function closeDiscussion() {
  console.log('Close discussion of ID')
  $("#theForumPanel").addClass("hidden")
  window.activeID = undefined;
  try { messageListener() } catch (error) {
  }
}

async function addMessage(msg) {
  await db.collection("discussions").doc(activeID).set({
    messages: firebase.firestore.FieldValue.arrayUnion({
      n: cacheuser.name,
      c: msg,
    })
  }, {merge: true})
}