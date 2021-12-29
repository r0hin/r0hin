// music.js
// Code for the music side of EonSound.
// Includes things such as building music components, playing songs, managing song details, etc.
window.musicQueue = [];
window.musicActive = {none: 'none'};
window.musicHistory = [];
window.queueData = {};
window.player = new Plyr("audio", {})
setDefaultVolume()

$("#main_player").bind("ended", function () {
  endedSong();
});

function artistToString(artists) {
  if (artists.length == 1) { return artists[0].name }
  snippet = ''; for (let i = 0; i < artists.length; i++) { const artist = artists[i].name; if (i == artists.length - 1) { snippet = snippet + 'and ' + artist } else {snippet = snippet + artist + ', ' } }
  return snippet
}

function category(id, data, objectID, destinationID) {
  return new Promise((resolve, reject) => {
    o = document.createElement('div')
    o.setAttribute('category_details', id)
    o.setAttribute('class', 'hidden animated fadeIn faster category')
    o.id = objectID
    
    o.innerHTML = `
    <img onclick="openCategory('${id}')" src="${data.icons[0].url}">
    <h3>${data.name}</h3>
    `
    
    $(`#${destinationID}`).get(0).appendChild(o)
    resolve('banger')
  })
}

function album(id, data, objectID, destinationID, library) {
  return new Promise((resolve, reject) => {
    
    a = document.createElement('div')
    a.setAttribute('class', 'hidden animated fadeIn faster album')
    a.setAttribute('album_details', id)
    a.id = objectID
    
    if (typeof(data.artists) == 'string') {
      artists = data.artists
    }
    else {
      artists = artistToString(data.artists)
    }
    
    if (!data.images || !data.images.length) {
      console.log('Minor issue. No image found. Skipping.');
      resolve('Nope');
    }
    
    if (data.total_tracks && data.total_tracks == 1) {
      data.name = data.name + ' - Single'
    }
    
    a.innerHTML = `
    <div class="content shadow">
    <img id="${data.id}PreviewImage" crossOrigin="Anonymous" onclick="openAlbum('${data.id}', ${library})" src="${data.images[0].url}">
    <div id="${data.id}PreviewFooter" class="albumFooter">
    <h4>${data.name}</h4>
    <p>${artists}</p>
    </div>
    </div>
    `;
    
    $(`#${destinationID}`).get(0).appendChild(a)
    $(`#${objectID}`).imagesLoaded(() => {
      window.setTimeout(() => {
        // Some browsers will take a while to finish.
        colorThiefify('albumPreview', data.id + 'PreviewImage', data.id + 'PreviewFooter')
      }, 500)
    })
    
    resolve('Success')
  })
}

function artist(id, data, objectID, destinationID) {
  return new Promise((resolve, reject) => {
    b = document.createElement('div')
    b.setAttribute('class', 'hidden animated fadeIn faster artist')
    b.setAttribute('artist_details', id)
    b.id = objectID
    
    if (!data.images || !data.images.length) {
      console.log('Minor issue. No image found. Skipping.');
      resolve('Nope');
    }
    
    b.innerHTML = `
    <div class="content">
    <img onclick="openArtist('${id}')" src="${data.images[0].url}">
    <h4>${data.name}</h4>
    </div>
    `;
    
    $(`#${destinationID}`).get(0).appendChild(b)
    resolve('Success')
  })
}

function playlist(id, data, objectID, destinationID) {
  return new Promise((resolve, reject) => {
    c = document.createElement('div')
    c.setAttribute('class', 'hidden animated fadeIn faster playlist spotifyPlaylist')
    c.setAttribute('playlist_details', id)
    c.id = objectID
    
    if (!data.images || !data.images.length) {
      console.log('Minor issue. No image found. Skipping.');
      resolve('Nope');
    }
    
    c.innerHTML = `
    <img onclick="openPlaylist('${id}')" src="${data.images[0].url}">
    <h4>${data.name}</h4>
    <p>${data.owner.display_name}</p>
    `;
    
    $(`#${destinationID}`).get(0).appendChild(c)
    resolve('Success')
  })
}

function userPlaylist(id, data, objectID, destinationID) {
  return new Promise((resolve, reject) => {
    e = document.createElement('div')
    e.setAttribute('class', 'hidden animated fadeIn faster shadow userPlaylist')
    e.setAttribute('playlist_details', id)
    e.setAttribute('onclick', "openUserPlaylist('" + id + "')")
    e.id = objectID
    
    e.innerHTML = `
    <img id="${objectID}image" class="${id}cover" crossOrigin="Anonymous" src="${data.cover}&${new Date().getTime()}">
    <h4 id="${id}name1">${data.name}</h4>
    `;
    
    g = document.createElement('button')
    g.id = 'playlistSelectItem' + id
    g.setAttribute('class', 'animated fadeIn btn-text-primary playlistButton')
    g.innerHTML = data.name
    g.onclick = () => {
      addTrackToPlaylist(id);
      $('#playlistSelect').modal('hide')
      toggleBottomSheet('librarySheet')
    }
    $(`#playlistSelectItem`).get(0).appendChild(g)
    
    $(`#${destinationID}`).get(0).appendChild(e)
    resolve('Success')
  })
}

function otherUserBPlaylist(id, data, objectID, destinationID, owner) {
  return new Promise((resolve, reject) => {
    p = document.createElement('div')
    p.setAttribute('class', 'hidden animated fadeIn faster shadow otherUserBPlaylist otherUserBPlaylistItem') 
    p.setAttribute('playlist_details', id)
    p.setAttribute('owner_details', owner)
    p.setAttribute('onclick', "openotherUserBPlaylist('" + id + "', '" + owner + "')")
    p.id = objectID
    
    p.innerHTML = `
    <img id="${objectID}image" class="${id}cover" crossOrigin="Anonymous" src="${data.cover}&${new Date().getTime()}">
    <h4 id="${id}name1">${data.name}</h4>
    `;

    $(`#${destinationID}`).get(0).appendChild(p)
    resolve('Success')
  })
}

function track(id, data, objectID, destinationID, playlist) {
  return new Promise((resolve, reject) => {
    o = document.createElement('div')
    if (playlist == 'tracks') {
      desintationSpecific = ' trackLibraryItem'
    }
    else {
      desintationSpecific = ''
    }
    o.setAttribute('class', 'hidden animated fadeIn faster Song song' + desintationSpecific + ' '  + id)
    o.setAttribute('track_details', id)
    o.id = objectID
    
    if (typeof(data.artists) == 'string') {
      artists = data.artists
    }
    else {
      artists = artistToString(data.artists)
    }
    
    if (data.art) {
      art = data.art
    }
    else {
      if (!data.album.images || !data.album.images.length) {
        console.log('Minor issue. No image found. Skipping.');
        resolve('Nope');
      }
      else {
        art = data.album.images[0].url
      }
    }
    
    o.onclick = () => {
      queueSongWithoutData(id)
    }
    
    o.innerHTML = `
    <div class="content">
      <img src="${art}"></img>
      <div class="track_data">
        <b>${data.name}</b>
        <p>${artists}</p>
      </div>
    </div>
    `
    
    $(`#${destinationID}`).get(0).appendChild(o)
    resolve('Success')
  })
}

function searchTrack(id, data, objectID, destinationID) {
  return new Promise((resolve, reject) => {
    d = document.createElement('div')
    d.setAttribute('class', 'hidden animated fadeIn faster track song')
    d.setAttribute('track_details', id)
    d.id = objectID
    
    artists = artistToString(data.artists)
    
    if (!data.album.images || !data.album.images.length) {
      console.log('Minor issue. No image found. Skipping.');
      resolve('Nope');
    }
    
    d.innerHTML = `
    <img onclick="queueSongWithoutData('${id}')" src="${data.album.images[0].url}">
    <h4>${data.name}</h4>
    <p>${artists}</p>
    `;
    
    $(`#${destinationID}`).get(0).appendChild(d)
    resolve('Success')
  })
}

function userPlaylistSong(id, data, objectID, destinationID, index, playlist, elses) {
  return new Promise((resolve, reject) => {
    f = document.createElement('div')
    f.setAttribute('class', 'Song song ')
    f.setAttribute('id', objectID)
    f.setAttribute('track_details', id)
    f.setAttribute('track_playlist', playlist)
    f.setAttribute('other', elses)
    f.onclick = () => {
      playSongsAtIndex(index, playlist)
    }
    
    f.innerHTML = `
    <img src="${data.art}"></img>
    <div class="track_data">
      <b>${data.name}</b>
      <p>${data.artists}</p>
    </div>
    `
    $(`#${destinationID}`).get(0).appendChild(f)
    resolve('Success')
  })
}

function albumSong(id, data, objectID, destinationID, index, album, art) {
  return new Promise((resolve, reject) => {
    h = document.createElement('div')
    h.setAttribute('class', 'Song animated flipInX song '  + id)
    h.setAttribute('id', objectID)
    h.setAttribute('track_details', id)
    num = undefined; if (data.track_number) { num = data.track_number } else { num = data.item_num }
    h.setAttribute('track_album_index', num)
    h.onclick = () => {
      playSongsAtIndex(index, album)
    }
    
    // Artist formatting
    if (typeof(data.artists) == 'string') { albumsongartists = data.artists }
    else { albumsongartists = artistToString(data.artists) }

    h.innerHTML = `
    <div class="content">
      <img src="${art}"></img>
      <div class="track_data">
        <b>${data.name}</b>
        <p>${albumsongartists}</p>
      </div>
    </div>
    `

    try {
      $(`#${destinationID}`).get(0).appendChild(h)
    } catch(err) {}
    resolve('Success')
  })
}

function playSongsAtIndex(index, content) {
  songSelection = [...queueData[content]]
  for (let i = 0; i < index; i++) {
    songSelection.shift()
  }  
  
  playSongs(false, songSelection)
}

async function playSongs(Id, externalData) {
  // Playlists will have sufficient data
  // Albums wont
  if (externalData) {
    // Allow for passing in external data
    musicDataPlay = externalData
  }
  else {
    // Use data from ID
    musicDataPlay = queueData[Id]
  }
  
  for (let n = 0; n < musicDataPlay.length; n++) {
    const playSongsSong = musicDataPlay[n];
    if (playSongsSong.url) {
      if (n == 0) {
        // Play it. (Clear queue and play first song)
        await playSong(playSongsSong)
      }
      else {
        // Queue it
        await queueSong(playSongsSong, true)
      }
    }
    else {
      if (n == 0) {
        // Play it. (Clear queue and play first song)
        await playSongWithoutData(playSongsSong.id)
      }
      else {
        // Queue it
        await queueSongWithoutData(playSongsSong.id, true)
      }
    }
  }
  
  if (musicQueue.length > 0) {
    $('#showQueue').removeClass('hidden') 
  }
  
  visualQ_build()
  
}

function shuffleSongs(Id) {
  shuffleSongsData = shuffled(queueData[Id])
  playSongs(Id, shuffleSongsData)
}

async function downloadSong(trackID, spotifyURL, trackName) {
  return new Promise(async (resolve, reject) => {

    if (!cacheUserTutorial.includes('downloadSong')) {
      // Show tutorial
      showTutorial('downloadSong')
      $('#tutorial').html(`
        <div class="card">
          <div class="card-body">
            <h4>Downloading</h4>
            <p>Playing a song for the first time will take slightly longer as we download it. All subsequent playback will be lightning fast. No device storage is used.</p>
            <br><br>
            <button onclick="hideTutorial()" class="btn-contained-primary">Continue</button>
            <br>
            <small>This message will only be shown once.</small>
          </div>
        </div>
      `)
      initButtonsContained()
    }

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
    
    if (musicData[id]) { 
      data = musicData[id]  
    }
    else {
      data = await goFetch(`tracks/${id}`)
    }
    
    savedData = {
      art: data.album.images[0].url,
      album_name: data.album.name,
      artists: artistToString(data.artists),
      id: data.id,
      name: data.name,
      url: undefined,
      spotifyURL: data.external_urls.spotify,
    }
    
    await queueSong(savedData, skipMsg)    
    resolve('Skidop freshski')
  })
}

async function playSongWithoutData(id) {
  return new Promise(async (resolve, reject) => {
    // Gather data, then queue
    if (musicData[id]) { 
      data = musicData[id]  
    }
    else {
      data = await goFetch(`tracks/${id}`)
    }
    
    savedData = {
      art: data.album.images[0].url,
      album_name: data.album.name,
      artists: artistToString(data.artists),
      id: data.id,
      name: data.name,
      url: undefined,
      spotifyURL: data.external_urls.spotify,
    }
    
    await playSong(savedData)
    resolve('Skiddopot')
  })
}

async function endedQueue() {
  $('#title').html(`EonSound Music Player`)
  $('#queueProgress').addClass('zoomOut')
  $('#playing_album_cover').removeClass('zoomIn')
  $('#playing_album_cover').addClass('zoomOut')
  $('#nowplayingbutton').get(0).setAttribute('disabled', 'true')
  $('#nowplayingbutton').addClass('btn-disabled')
  $('#InjectedWidth').get(0).innerHTML = ``
  hidePlayer()
  visualQ_build()
  $('#showLyrics').addClass('hidden') 
  $('#showQueue').addClass('hidden')
  try {
    ipc.send('invokeAction', `queueDidEnd`); 
  } catch (error) { console.log('Unable to push invokeAction to Electron process. Browser?'); }
  await db.collection('app').doc('activity').update({
    data: firebase.firestore.FieldValue.arrayRemove(user.uid),
    [user.uid]: {}
  })
}

async function queueSong(data, skipMsg) {
  return new Promise((resolve, reject) => {
    if (musicActive.none !== 'none') {
      // There's a song playing so add it to queue
      musicQueue.push(data)
      if (!skipMsg) {
        Snackbar.show({pos: 'top-center',text: "Added to queue."})
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

async function playSong(data) {
  return new Promise(async (resolve, reject) => {
    if (musicActive.none !== 'none') {
      // Song is playing while loading new song so move it to history
      // Move active song to history
      musicHistory.push(musicActive);
    }
    
    // Empty queue and play
    window.musicQueue = [];
    window.musicActive = {none: 'none'};
    await loadSong(data)
    resolve('Skiddyo')
  })
}

async function loadSong(data) {
  return new Promise(async (resolve, reject) => {
    url = data.url
    showPlayer()
    $('#showLyrics').removeClass('hidden') 
    $('#queueProgress').removeClass('zoomOut')
    $('#queueProgress').removeClass('hidden')
    $('#queueProgress').addClass('zoomIn')
    $('#playing_album_cover').removeClass('zoomIn')
    $('#playing_album_cover').addClass('zoomOut')
    $('#nowplayingbutton').get(0).setAttribute('disabled', 'true')
    $('#nowplayingbutton').addClass('btn-disabled')
    if (!data.url) {
      loadertimer = window.setTimeout(() => {
        showLoader()
      }, 1500)
      url = await downloadSong(data.id, data.spotifyURL, data.name)
      window.clearInterval(loadertimer)
      hideLoader()
    }
    
    musicActive = data
    musicActive.url = url
    
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

    $('#main_player').get(0).setAttribute('src', url)
    $('#playing_album_cover').get(0).setAttribute('src', data.art)
    $('#playing_track_details').get(0).innerHTML = `<b>${data.name}</b>${data.artists}`
    $('#nowplayingbutton').get(0).onclick = () => {
      // More options button to set library changes to song
      window.prepare_library_changes = data
    }

    $('#goInfo0').get(0).onclick = async() => {
      trackInfo(data.id)
    }

    // Track to library
    $('#addLibrary0').get(0).onclick = async() => {
      addTrackToLibrary(data.id)
    }

    // Copy link
    $('#goLink0').get(0).onclick = async() => {
      await copyText(`https://r0hin.github.io/eonsound/preview?type=track&id=${data.id}`)
    }

    $('#playingaddplaylistbtn').get(0).onclick = async() => {
      // Get track details
      window.prepare_library_changes = musicActive
      $('#playlistSelect').modal('toggle')
    }

    // Track to album/artist
    $('#goAlbum0').get(0).onclick = async () => {
      if (musicData[data.id]) { 
        data = musicData[data.id]  
      }
      else {
        data = await goFetch(`tracks/${data.id}`)
        window.musicData[data.id] = data
      }
      openAlbum(data.album.id)
    }

    $('#goArtist0').get(0).onclick = async () => {
      if (musicData[data.id]) { 
        data = musicData[data.id]  
      }
      else {
        data = await goFetch(`tracks/${data.id}`)
        window.musicData[data.id] = data
      }
      openArtist(data.artists[0].id)
    }
    
    $('#queueProgress').removeClass('zoomIn')
    $('#queueProgress').addClass('zoomOut')
    $('#playing_album_cover').removeClass('zoomOut')
    $('#playing_album_cover').removeClass('hidden')
    $('#playing_album_cover').addClass('zoomIn')
    $('#nowplayingbutton').get(0).removeAttribute('disabled')
    $('#nowplayingbutton').removeClass('btn-disabled')
    calculatePlayerWidths()
    player.play()
    visualQ_build()

    $('#title').html(`${data.name} by ${data.artists} on EonSound`)

    // ELCTRON / DISCORD RPC
    try {
      ipc.send('invokeAction', `${musicActive.name};;${data.artists}`); 
    } catch (error) { console.log('Unable to push invokeAction to Electron process. Browser?'); }
    
    // Finally, update database for friends to notice
    window.setTimeout(async () => {
      if (typeof($('#main_player').get(0).duration) !== 'undefined') {
        await db.collection('app').doc('activity').update({
          data: firebase.firestore.FieldValue.arrayUnion(user.uid),
          [user.uid]: {n: data.name, a: data.artists, c: data.art, id: data.id, l: $('#main_player').get(0).duration, t: calcTime('+0')}
        })
      }
    }, 800)

    resolve('successo expresso')
  })
}

async function endedSong() {
  // Song did end
  player.pause()
  $('#title').html(`Waiting...`)
  
  // Move active song to history
  musicHistory.push(musicActive);

  hideDisplayLyrics()
  
  musicActive = {none: 'none'}
  if (musicQueue.length > 0) {
    // Check if hide queue btn
    if (musicQueue.length == 1) {
      $('#showQueue').addClass('hidden')
    }
    
    // Next song
    loadSong(musicQueue[0])
    musicQueue.splice(0, 1)
    visualQ_build()
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

try {
  const sortable = new Sortable.default(document.querySelectorAll('#queueItems'), {
    draggable: '.Song'
  });
  
  Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
  };
  
  sortable.on('sortable:sorted', (sortData) => {
    // Rebuild queue from visualqbuild items
    musicQueue.move(sortData.data.oldIndex, sortData.data.newIndex)
  }); 
} catch (error) {
  console.log('Probably on forums.')
}

function visualQ_build() {
  $('#queueItems').empty()
  
  if (musicQueue.length == 0) {
    $('#upnexttitle').addClass('hidden')
  }
  else {
    $('#upnexttitle').removeClass('hidden')
  }

  if (musicActive.none !== 'none') {
    document.getElementById('queueNow').innerHTML = `
    <div class="Song animated fadeInUp song" track_details="${musicActive.id}">
      <img src="${musicActive.art}"></img>
      <div class="track_data">
        <b>${musicActive.name}</b>
        <p>${musicActive.artists}</p>
      </div>
    </div>
    `
  }
  else {
    document.getElementById('queueNow').innerHTML = ''
  }
  
  for (let i = 0; i < musicQueue.length; i++) {
    const data = musicQueue[i]
    p = document.createElement('div')
    p.setAttribute('class', 'Song song')
    p.setAttribute('active_queue', i)
    p.setAttribute('track_details', data.id)
    p.onclick = () => {
      playSongsAtQueueIndex(i)
    }
    
    p.innerHTML = `
    <img src="${data.art}"></img>
    <div class="track_data">
      <b>${data.name}</b>
      <p>${data.artists}</p>
    </div>
    `
    
    document.getElementById('queueItems').appendChild(p)
  }
  
}

async function playSongsAtQueueIndex(index) {
  musicQueue.splice('0', index)
  skipForward() 
}

function removeFromQueueByIndex(index) {
  musicQueue.splice(index, 1)
  visualQ_build()


  $('#showQueue').addClass('hidden')
  if (musicQueue.length > 1) {
    // Check if hide queue btn
    $('#showQueue').removeClass('hidden')
  }
}

function bitForward() {
  player.forward(10)
}

function bitBackward() {
  player.rewind(10)
}