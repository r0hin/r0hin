// views.js
// Important scripts relating to displaying artists, albums, tracks, playlists and more.
// Usually, these create a fullscreen element which is overlayed on top of the previous items.

window.musicData = {}
window.activeMediaIndex = 3
window.cacheUserPlaylistData = {}
window.cacheotherUserBPlaylistData = {}
window.activeLoading = false
sessionStorage.removeItem('activeView')

function hideCurrentView(id) {
  if (id) {
    // Was manually pressed:
    sessionStorage.setItem('activeView', id)
    $(`#${id}`).removeClass('fadeIn')
    $(`#${id}`).addClass('fadeOut')
    window.setTimeout(() => {
      $(`#${sessionStorage.getItem('activeView')}`).addClass('hidden')
    }, 400)
    return;
  }
  // Do it all:
  $('.media_view').removeClass('fadeIn')
  $('.media_view').addClass('fadeOut')
  window.setTimeout(() => {
    $('.media_view').addClass('hidden')
  }, 400)
}

async function openAlbum(id, library) {
  if (activeLoading) {
    console.error('Trying to load too fast. Stopped an action.')
    return
  }
  else {
    activeLoading = true
    window.setTimeout(() => {
      activeLoading = false
    }, 1500)
  }
  // Open spotify album of id
  sessionStorage.setItem('activeView', id + 'AlbumView')
  console.log('Opening album of ' + id);

  if (library) {
    openAlbumLibraryStatus = 'lib'
    showFullAbum = `<button data-toggle="tooltip" data-placement="top" title="Show Full Album" onclick="openAlbum('${id}')" class="animated fadeInUp btn-text-primary"> <i class='bx bx-list-plus'></i> </button>`
  }
  else {
    openAlbumLibraryStatus = ''
    showFullAbum = ''
  }

  if ($(`#${id}${openAlbumLibraryStatus}AlbumView`).length) {
    $(`#${id}${openAlbumLibraryStatus}AlbumView`).addClass('hidden')
    $(`#${id}${openAlbumLibraryStatus}AlbumView`).removeClass('fadeIn')
    $(`#${id}${openAlbumLibraryStatus}AlbumView`).removeClass('fadeOut')
    window.setTimeout(() => {
      $(`#${id}${openAlbumLibraryStatus}AlbumView`).addClass('fadeIn')
      $(`#${id}${openAlbumLibraryStatus}AlbumView`).removeClass('hidden')
    }, 80)
    $(`#${id}${openAlbumLibraryStatus}AlbumView`).get(0).setAttribute('style', `z-index: ${activeMediaIndex} !important`)
    activeMediaIndex++
    activeLoading = false
    return;
  }

  window.aeo = id
  window.apo = cacheUserAlbums

  // Album info
  if (!library) {
    // Get required data from API.
    data = await goFetch(`albums/${id}`)
    musicData[id] = data
    openAlbumData = {
      id: data.id,
      artists: artistToString(data.artists),
      artists_code: data.artists[0].id,
      art: data.images[0].url,
      name: data.name,
    }
  }
  else {
    // Get required data from cache.

    // Get index of item in map...
    match = undefined
    for (let i = 0; i < cacheUserAlbums.length; i++) {
      if (cacheUserAlbums[i] == id) {
        match = i
      } 
    }
    if (match == undefined) {
      alert("Internal Error")
    }

    openAlbumData = {
      id: cacheUserAlbumsData[match].id,
      artists: cacheUserAlbumsData[match].artists,
      artists_code: cacheUserAlbumsData[match].artists_code,
      art: cacheUserAlbumsData[match].art,
      name: cacheUserAlbumsData[match].name,
    }
  }
  
  // Build the album
  g = document.createElement('div')
  g.setAttribute('class', 'animated hidden fadeIn media_view fastest ' + id + openAlbumLibraryStatus + 'AlbumView')
  g.setAttribute('id', id + openAlbumLibraryStatus + 'AlbumView')
  g.setAttribute('style', `z-index: ${activeMediaIndex} !important`)
  activeMediaIndex++
  g.innerHTML = `
    <button class="closePlaylistButton btn-contained-primary" onclick="hideCurrentView('${id}${openAlbumLibraryStatus}AlbumView')"><i class='bx bx-x'></i></button>
    <button class="detailsButton btn-contained-primary album" album_details="${id}" onclick="rightClickSelf(this)"><i class='bx bx-dots-vertical-rounded'></i></button>
    <center class="albumSide0">
      <div class="content">
        <img crossOrigin="Anonymous" id="${id}cover" class="albumImg ${id}cover" src="${openAlbumData.art}"></img>
        <br><br>
        <div id="${id}Librarychip${openAlbumLibraryStatus}" class="hidden animated fadeInUp">
          <span class="chip">Library</span>
        </div>
      </div>
    </center>

    <div class="row">
      <div class="col-4">
      </div>
      <div class="col-8">
        <div class="albumHeader">
          <h1>${openAlbumData.name}</h1>
          <p>${openAlbumData.artists}</p>
        </div>
        <center class="playlistActions">
          <button data-toggle="tooltip" data-placement="top" title="Show Artist" onclick="openArtist('${openAlbumData.artists_code}')" class="animated fadeInUp btn-text-primary">
            <i class='bx bx-user-voice'></i>
          </button>
          <button data-toggle="tooltip" data-placement="top" title="Album Info" onclick="albumInfo('${id}')" class="animated fadeInUp btn-text-primary">
            <i class='bx bx-info-circle'></i>
          </button>
          <button data-toggle="tooltip" data-placement="top" title="Add to Library" id="addLibraryCol${id}" onclick="addAlbumToLibrary('${id}')" class="hidden animated fadeInUp btn-text-primary">
            <i class='bx bx-add-to-queue'></i>
          </button>
          ${showFullAbum}
        </center>
        <br>
        <div class="row">
          <div class="col-sm"><center><button onclick="playSongs('${id}${openAlbumLibraryStatus}')" class="btn-contained-primary playPlaylistBtn">Play</button><br><br></center></div>
          <div class="col-sm"><center><button onclick="shuffleSongs('${id}${openAlbumLibraryStatus}')" class="btn-text-primary shufflePlaylistBtn">Shuffle</button><br><br></center></div>
        </div>
        <div class="songList ${id}AlbumSongs${openAlbumLibraryStatus}" id="${id}AlbumSongs${openAlbumLibraryStatus}"></div>
      </div>
    </div>
    <br><br><br>
  `
  document.getElementById('album_view').appendChild(g)
  $(`#${id}${openAlbumLibraryStatus}AlbumView`).removeClass('hidden')

  // Two different track algorithms required if library or not:

  if (!library) {
    // Get from data
    for (let j = 0; j < data.tracks.items.length; j++) {
      const openAlbumSong = data.tracks.items[j];
      await albumSong(openAlbumSong.id, openAlbumSong, id + openAlbumSong.id, id + 'AlbumSongs' + openAlbumLibraryStatus, j, id, data.images[0].url)
    }
    queueData[id] = data.tracks.items
  }
  else {
    // Get from list of library tracks
    dataToBuild = []
    for (let j = 0; j < cacheUserTracksData.length; j++) {
      if (cacheUserTracksData[j].album == id) {
        dataToBuild.push({
          id: cacheUserTracksData[j].id,
          name: cacheUserTracksData[j].name,
          artists: cacheUserTracksData[j].artists,
          item_num: cacheUserTracksData[j].item_num,
          album: {
            id: cacheUserTracksData[j].album,
            images: [
              {
                url: cacheUserTracksData[j].art
              }
            ]
          }
        })
      }      
    }

    // Build it sequentially
    dataToBuild.forEach(async dataToBuildItem => {
      await albumSong(dataToBuildItem.id, dataToBuildItem, id + dataToBuildItem.id + openAlbumLibraryStatus, id + 'AlbumSongs' + openAlbumLibraryStatus, 0, id + openAlbumLibraryStatus, dataToBuildItem.album.images[0].url)
    });

    // Reorder also redefines potential queue
    reOrderAlbumLibrary(id)

  }

  $(`#${id}AlbumView`).imagesLoaded(() => {
    // colorThiefify('userPlaylistView', playlistId + 'cover', playlistId + 'userplaylistgradientelement')

    if (library) {
      $(`#${id}Librarychip${openAlbumLibraryStatus}`).removeClass('hidden')
    }
    else {
      $(`#${id}Librarychip${openAlbumLibraryStatus}`).addClass('hidden')
    }

    if (cacheUserAlbums.includes(id)) {
      // Added, don't show add button
      $(`#addLibraryCol${id}`).addClass('hidden')
    }
    else {
      // Not added, show add button
      $(`#addLibraryCol${id}`).removeClass('hidden')
    }
  })

  activeLoading = false;
  
  initButtonsContained()
  initButtonsText()
  $('[data-toggle="tooltip"]').tooltip({ trigger : 'hover' });
  return;

}

async function openotherUserBPlaylist(id, owner) {
  playlistId = id
  if (activeLoading) {
    console.error('Trying to load too fast. Stopped an action.')
    return
  }
  else {
    activeLoading = true
    window.setTimeout(() => {
      activeLoading = false
    }, 1500)
  }

  sessionStorage.setItem('activeView', id + 'otherUserBPlaylistView')

  if ($(`#${id}otherUserBPlaylistView`).length) {
    $(`#${id}otherUserBPlaylistView`).addClass('hidden')
    $(`#${id}otherUserBPlaylistView`).removeClass('fadeIn')
    $(`#${id}otherUserBPlaylistView`).removeClass('fadeOut')
    window.setTimeout(() => {
      $(`#${id}otherUserBPlaylistView`).addClass('fadeIn')
      $(`#${id}otherUserBPlaylistView`).removeClass('hidden')
    }, 80)
    $(`#${id}otherUserBPlaylistView`).get(0).setAttribute('style', `z-index: ${activeMediaIndex} !important`)
    activeMediaIndex++
    activeLoading = false
    return;
  }

  if (cacheotherUserBPlaylistData[playlistId]) {
    // Cache exists
    nopenPlaylist = cacheotherUserBPlaylistData[playlistId]
  }
  else {
    // Cache doesnt exist
    doc = await db.collection('users').doc(owner).collection('library').doc(playlistId).get()
    cacheUserPlaylistData[playlistId] = doc.data()
    nopenPlaylist = doc.data()
  }

  // Build the playlist
  f = document.createElement('div')
  f.setAttribute('class', 'animated hidden fadeIn media_view fastest ' + id + 'otherUserBPlaylistView')
  f.setAttribute('id', playlistId + 'otherUserBPlaylistView')
  f.setAttribute('style', `z-index: ${activeMediaIndex} !important`)
  activeMediaIndex++

  description = nopenPlaylist.description
  if (nopenPlaylist.description == '') {
    description = 'No description set.'
  }

  f.innerHTML = `
    <div class="playViewGradient" id="${playlistId}userplaylistgradientelement"></div>
    <button class="detailsButton detailsShifted btn-contained-primary otherUserBPlaylist" playlist_details="${id}" onclick="rightClickSelf(this)"><i class='bx bx-dots-vertical-rounded'></i></button>
    <button class="closePlaylistButton btn-contained-primary" onclick="hideCurrentView('${playlistId}otherUserBPlaylistView')"><i class='bx bx-x'></i></button>
    <div class="playlistHeader row">
      <div class="col-sm">
        <center>
          <img crossOrigin="Anonymous" id="${playlistId}cover" class="myPlaylistImg ${playlistId}cover" src="${nopenPlaylist.cover}"></img>
        </center>
      </div>
    </div>
    <br>

    <center class="playlistHeader2">
      <h1 id="${playlistId}name0">${nopenPlaylist.name}</h1>
      <p class="playlistDescription">${description}</p>
    </center>
    <br>
    <div class="row">
      <div class="col-sm"><center><button onclick="playSongs('${playlistId}')" class="btn-contained-primary playPlaylistBtn">Play</button></center></div>
      <div class="col-sm"><center><button onclick="shuffleSongs('${playlistId}')" class="btn-text-primary shufflePlaylistBtn">Shuffle</button></center></div>
    </div>
    <br><br>
    <div class="songList ${playlistId}playlistSongs animated fadeIn" id="${playlistId}playlistSongs"></div>
    <br><br><br>
  `
  document.getElementById('userplaylist_view').appendChild(f)
  $(`#${id}otherUserBPlaylistView`).removeClass('hidden')

  for (let j = 0; j < nopenPlaylist.songs.length; j++) {
    const openPlaylistSong = nopenPlaylist.songs[j];
    await userPlaylistSong(openPlaylistSong.id, openPlaylistSong, playlistId + openPlaylistSong.id, playlistId + 'playlistSongs', j, playlistId, true)
  }
  
  queueData[playlistId] = nopenPlaylist.songs
  $(`#${playlistId}otherUserBPlaylistView`).imagesLoaded(() => {
    colorThiefify('userPlaylistView', playlistId + 'cover', playlistId + 'userplaylistgradientelement')
  })
  initButtonsContained()
  initButtonsText()

  activeLoading = false
}

async function openUserPlaylist(id) {
  if (activeLoading) {
    console.error('Trying to load too fast. Stopped an action.')
    return
  }
  else {
    activeLoading = true
    window.setTimeout(() => {
      activeLoading = false
    }, 1500)
  }

  console.log('Opening playlist of ' + id);
  playlistId = id
  sessionStorage.setItem('activeView', playlistId + 'UserPlaylistView')

  if ($(`#${id}UserPlaylistView`).length) {
    $(`#${id}UserPlaylistView`).addClass('hidden')
    $(`#${id}UserPlaylistView`).removeClass('fadeIn')
    $(`#${id}UserPlaylistView`).removeClass('fadeOut')
    window.setTimeout(() => {
      $(`#${id}UserPlaylistView`).addClass('fadeIn')
      $(`#${id}UserPlaylistView`).removeClass('hidden')
    }, 80)
    $(`#${id}UserPlaylistView`).get(0).setAttribute('style', `z-index: ${activeMediaIndex} !important`)
    activeMediaIndex++
    activeLoading = false
    return;
  }

  if (cacheUserPlaylistData[playlistId]) {
    // Cache exists
    nopenPlaylist = cacheUserPlaylistData[playlistId]
  }
  else {
    // Cache doesnt exist
    doc = await db.collection('users').doc(user.uid).collection('library').doc(playlistId).get()
    cacheUserPlaylistData[playlistId] = doc.data()
    nopenPlaylist = doc.data()
  }

  // Build the playlist
  f = document.createElement('div')
  f.setAttribute('class', 'animated hidden fadeIn media_view fastest ' + id + 'UserPlaylistView')
  f.setAttribute('id', playlistId + 'UserPlaylistView')
  f.setAttribute('style', `z-index: ${activeMediaIndex} !important`)
  activeMediaIndex++

  description = nopenPlaylist.description
  if (nopenPlaylist.description == '') {
    description = 'No description set. Click to change.'
  }

  f.innerHTML = `
    <div class="playViewGradient" id="${playlistId}userplaylistgradientelement"></div>
    <button class="detailsButton btn-contained-primary userPlaylist" playlist_details="${id}" onclick="rightClickSelf(this)"><i class='bx bx-dots-vertical-rounded'></i></button>
    <button class="closePlaylistButton btn-contained-primary" onclick="hideCurrentView('${playlistId}UserPlaylistView')"><i class='bx bx-x'></i></button>
    <div class="playlistHeader row">
      <div class="col-sm">
        <center>
          <img crossOrigin="Anonymous" id="${playlistId}cover" class="myPlaylistImg ${playlistId}cover" src="${nopenPlaylist.cover}"></img>
          <div class="myPlaylistOverlay">
            <a onclick="changePlayCover('${playlistId}')" class="btn-contained-primary animated fadeInUp">Change Cover</a>
          </div>
        </center>
      </div>
    </div>
    <br>

    <center class="playlistHeader2">
      <h1 id="${playlistId}name0">${nopenPlaylist.name}</h1>
      <p class="playlistDescription" oninput="try {window.clearTimeout(descTimer)} catch(error) {}; descTimer = window.setTimeout(async () => {await db.collection('users').doc(user.uid).collection('library').doc('${playlistId}').update({description: this.innerHTML, last_updated: firebase.firestore.FieldValue.serverTimestamp() }); cacheUserPlaylistData['${playlistId}'].last_updated = new Date().toDateString(); Snackbar.show({pos: 'top-center',text: 'Description updated.'})}, 3000)" contentEditable='true'>${description}</p>
    </center>

    <center class="playlistActions">
      <button onclick="userPlaylistInfo('${id}')" class="animated fadeInUp btn-text-primary">
        <i class='bx bx-info-circle'></i>
      </button>
      <button onclick="deleteUserPlaylist('${id}')" class="animated fadeInUp btn-text-primary">
        <i class='bx bx-trash'></i>
      </button>
      <button onclick="renameUserPlaylist('${id}')" class="animated fadeInUp btn-text-primary">
        <i class='bx bx-pencil'></i>
      </button>
      <div class="dropdown">
      <button data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="animated fadeInUp btn-text-primary">
      <i class='bx bx-export'></i>
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a onclick="exportToJSON('${id}')" class="dr-item" href="#">Export to JSON</a>
        <a onclick="exportToGroovy('${id}')" class="dr-item" href="#">Export to Groovy</a>
      </div>
    </div>
    </center>

    <br>

    <div class="row">
      <div class="col-sm"><center><button onclick="playSongs('${playlistId}')" class="btn-contained-primary playPlaylistBtn">Play</button></center></div>
      <div class="col-sm"><center><button onclick="shuffleSongs('${playlistId}')" class="btn-text-primary shufflePlaylistBtn">Shuffle</button></center></div>
    </div>
    <br><br>
    <div class="songList ${playlistId}playlistSongs animated fadeIn" id="${playlistId}playlistSongs"></div>
    <center id="${playlistId}recommend" class="animated fadeIn hidden">
      <br>
      <button onclick="playlistRecommend('${playlistId}')" class="btn-contained-primary recommendbtn"> <i class="bx bx-brain"></i> Generate Recommendations </button>
    </center>
    <br><br><br>
  `
  document.getElementById('userplaylist_view').appendChild(f)
  $(`#${id}UserPlaylistView`).removeClass('hidden')

  if (nopenPlaylist.songs.length) {
    $(`#${playlistId}recommend`).removeClass('hidden')
  }

  for (let j = 0; j < nopenPlaylist.songs.length; j++) {
    const openPlaylistSong = nopenPlaylist.songs[j];
    await userPlaylistSong(openPlaylistSong.id, openPlaylistSong, playlistId + openPlaylistSong.id, playlistId + 'playlistSongs', j, playlistId)
  }
  const sortablePlaylist = new Sortable.default(document.getElementById(`${playlistId}playlistSongs`), {
    draggable: '.Song'
  });
  
  sortablePlaylist.on('sortable:sorted', (sortData) => {
    sortPlaylistCorrectly(sortData, playlistId)
  });

  queueData[playlistId] = nopenPlaylist.songs
  $(`#${playlistId}UserPlaylistView`).imagesLoaded(() => {
    colorThiefify('userPlaylistView', playlistId + 'cover', playlistId + 'userplaylistgradientelement')
  })
  initButtonsContained()
  initButtonsText()
  initButtonsDropdown()

  activeLoading = false
}

function sortPlaylistCorrectly(sortData, playlistId) {
  // redo queue buttons
  if (sortData.data.oldIndex == sortData.data.newIndex) {
    return;
  }
  cacheUserPlaylistData[playlistId].songs.move(sortData.data.oldIndex, sortData.data.newIndex)
  if (queueData[playlistId]) {
    queueData[playlistId].move(sortData.data.oldIndex, sortData.data.newIndex)
  }
  try {
    window.clearTimeout(sortTimer)
  } catch(error) {}; 
  sortTimer = window.setTimeout(async () => {
    $(`#${playlistId}playlistSongs`).children().each((index, item) => {
      item.onclick = () => {
        playSongsAtIndex(index, playlistId)
      }
    })
    await db.collection('users').doc(user.uid).collection('library').doc(playlistId).update({
      last_updated: firebase.firestore.FieldValue.serverTimestamp(),
      songs: cacheUserPlaylistData[playlistId].songs
    }); 
    cacheUserPlaylistData[playlistId].last_updated = new Date().toDateString(); 
    Snackbar.show({pos: 'top-center',text: 'Playlist order updated.'})
  }, 1200)
}

async function openArtist(id) {
  if (activeLoading) {
    console.error('Trying to load too fast. Stopped an action.')
    return
  }
  else {
    activeLoading = true
    window.setTimeout(() => {
      activeLoading = false
    }, 1500)
  }

  // Open spotify album of id
  sessionStorage.setItem('activeView', id + 'ArtistView')
  console.log('Opening artist of ' + id);

  if ($(`#${id}ArtistView`).length) {
    $(`#${id}ArtistView`).addClass('hidden')
    $(`#${id}ArtistView`).removeClass('fadeIn')
    $(`#${id}ArtistView`).removeClass('fadeOut')
    window.setTimeout(() => {
      $(`#${id}ArtistView`).removeClass('hidden')
      $(`#${id}ArtistView`).addClass('fadeIn')
    }, 80)
    $(`#${id}ArtistView`).get(0).setAttribute('style', `z-index: ${activeMediaIndex} !important`)
    activeMediaIndex++
    activeLoading = false
    return;
  }

  // Artist info
  if (musicData[id]) {
    data = musicData[id]
  }
  else {
    data = await goFetch(`artists/${id}`)
    musicData[id] = data
  }


  dataTracks = await goFetch(`artists/${id}/top-tracks?country=us`)
  dataAlbums = await goFetch(`artists/${id}/albums?include_groups=album,single`)

  // Build the album
  g = document.createElement('div')
  g.setAttribute('class', 'animated hidden fadeIn media_view fastest ' + id + 'ArtistView')
  g.setAttribute('id', id + 'ArtistView')
  g.setAttribute('style', `z-index: ${activeMediaIndex} !important`)
  activeMediaIndex++
  popularity = data.followers.total / 2000000
  if (popularity >= 1)  {
    popularity = 100
  }
  else {
    popularity = popularity.toString().split('0.').pop()
    popularity = popularity.substring(0, 2)
    if (popularity[0] == '0') {
      popularity = popularity[1]
    }
  }
  g.innerHTML = `
    <button class="closePlaylistButton btn-contained-primary" onclick="hideCurrentView('${id}ArtistView')"><i class='bx bx-x'></i></button>
    <button class="detailsButton btn-contained-primary artist" artist_details="${id}" onclick="rightClickSelf(this)"><i class='bx bx-dots-vertical-rounded'></i></button>
    <img class="artistHero" src="${data.images[0].url}"></img>
    <div class="artistHeaderLeft">
      <h1>${data.name}</h1>
      <p>${popularity}% EonSound Popularity</p>
    </div>
    <div class="artistHeaderRight">
      <button onclick="shuffleSongs('${id}')" class="btn-contained-primary shuffleArtistBtn"><i class='bx bx-shuffle'></i></button>
      <button onclick="$('#${id}artistSongs').children().first().click()" class="btn-contained-primary playArtistBtn"><i class='bx bx-play'></i></button>
    </div>
    <br><br><br><br><br>
    <h4>Featured Albums</h4>
    <div class="artist_albums" id="artist_albums_${data.id}"></div>
    <br>
    <center class="playlistActions">
      <button data-toggle="tooltip" data-placement="top" title="Artist Info" onclick="artistInfo('${id}')" class="animated fadeInUp btn-text-primary">
        <i class='bx bx-info-circle'></i>
      </button>
      <button data-toggle="tooltip" data-placement="top" title="Add to Library" id="addLibraryCol${id}" onclick="addArtistToLibrary('${id}', true)" class="hidden animated fadeInUp btn-text-primary">
        <i class='bx bx-add-to-queue'></i>
      </button>
    </center>
    <div class="row artist_content">
      <div class="col-sm">
        <h3>Popular</h3>
        <div class="songList ${id}artistSongs" id="${id}artistSongs"></div>
        <br><br><br>
      </div>
      <div class="col-sm">
        <h3>Details</h3>
        <center>
          <div class="card artist_details">
            <div class="card_body">
              <img src="${data.images[0].url}"></img>
              <h3>${data.name}</h3>
              <p>${genresToString(data.genres)}.</p>

              <div class="row">
                <div class="col-sm">
                  <h2>${nFormatter(data.followers.total, 1)}</h2>
                  <h4>Followers</h4>
                </div>
                <div class="col-sm">
                  <h2>${data.popularity}%</h2>
                  <h4>Popularity</h4>
                </div>
              </div>
            </div>
          </div>
          <br><br><br>
        </center>
      </div>
    </div>
  `
  document.getElementById('artist_view').appendChild(g)
  $(`#${id}ArtistView`).removeClass('hidden')
  
  // Fill up artist albums
  // Remove possible duplices cause some records reupload albums basically just wasting space.....
  preventDuplicateArtistAlbumsCache = []
  for (let i = 0; i < dataAlbums.items.length; i++) {
    if (preventDuplicateArtistAlbumsCache.includes(dataAlbums.items[i].name)) {
      continue;
    }
    else {
      preventDuplicateArtistAlbumsCache.push(dataAlbums.items[i].name)
    }
    
    await album(dataAlbums.items[i].id, dataAlbums.items[i], dataAlbums.items[i].id + 'albumItem', `artist_albums_${data.id}`)
    $('#' + dataAlbums.items[i].id + 'albumItem').imagesLoaded(() => {
      // colorThiefify('userPlaylistView', playlistId + 'cover', playlistId + 'userplaylistgradientelement')
      $('#' + dataAlbums.items[i].id + 'albumItem').removeClass('hidden')
    })
  }

  // Fill up artist tracks
  compressedTrackList = []
  for (let j = 0; j < dataTracks.tracks.length; j++) {
    const openArtistSong = dataTracks.tracks[j];
    compressedTrackList.push(openArtistSong)
    await albumSong(openArtistSong.id, openArtistSong, id + openArtistSong.id, id + 'artistSongs', j, id, openArtistSong.album.images[0].url)
  }

  queueData[id] = compressedTrackList

  if (cacheUserArtists.includes(id)) {
    // Added, don't show add button
    $(`#addLibraryCol${id}`).addClass('hidden')
  }
  else {
    // Not added, show add button
    $(`#addLibraryCol${id}`).removeClass('hidden')
  }

  initButtonsContained()
  initButtonsText()
  $('[data-toggle="tooltip"]').tooltip({ trigger : 'hover' });

  activeLoading = false
}

async function openPlaylist(id) {
  if (activeLoading) {
    console.error('Trying to load too fast. Stopped an action.')
    return
  }
  else {
    activeLoading = true
    window.setTimeout(() => {
      activeLoading = false
    }, 1500)
  }

  // Open Spotify Playlist of ID
  sessionStorage.setItem('activeView', id + 'PlaylistView')
  console.log('Opening playlist of ' + id);

  if ($(`#${id}PlaylistView`).length) {
    $(`#${id}PlaylistView`).addClass('hidden')
    $(`#${id}PlaylistView`).removeClass('fadeIn')
    $(`#${id}PlaylistView`).removeClass('fadeOut')
    window.setTimeout(() => {
      $(`#${id}PlaylistView`).removeClass('hidden')
      $(`#${id}PlaylistView`).addClass('fadeIn')
    }, 80)
    $(`#${id}PlaylistView`).get(0).setAttribute('style', `z-index: ${activeMediaIndex} !important`)
    activeMediaIndex++
    activeLoading = false
    return;
  }

  // Playlist info
  data = await goFetch(`playlists/${id}`)
  
  // Build the album
  p = document.createElement('div')
  p.setAttribute('id', id + 'PlaylistView')
  p.setAttribute('class', 'animated hidden fadeIn media_view fastest ' + id + 'PlaylistView')
  p.setAttribute('style', `z-index: ${activeMediaIndex} !important`)
  activeMediaIndex++

  p.innerHTML = `
    <div class="playViewGradient" id="${id}playlistgradientelement"></div>
    <button class="closePlaylistButton btn-contained-primary" onclick="hideCurrentView('${id}PlaylistView')"><i class='bx bx-x'></i></button>
    <div class="playlistHeader row">
      <div class="col-sm">
        <center>
          <img crossOrigin="Anonymous" id="${id}cover" class="myPlaylistImg ${id}cover" src="${data.images[0].url}"></img>
        </center>
      </div>
      <div class="col-sm">
        <center>
          <h1>${data.name}</h1>
          <br>
          <p class="playlistDescription">${data.description}</p>
        </center>
      </div>
    </div>
    <br><br>
    <div class="row">
      <div class="col-sm"><center><button onclick="playSongs('${id}')" class="btn-contained-primary playPlaylistBtn">Play</button></center></div>
      <div class="col-sm"><center><button onclick="shuffleSongs('${id}')" class="btn-text-primary shufflePlaylistBtn">Shuffle</button></center></div>
      <div class="col-sm"><center><button onclick="addSpotifyPlaylistToLibrary('${id}')" class="btn-contained-primary albumLibraryBtn">Add to Library</button></center></div>
    </div>
    <br><br>
    <div class="songList ${id}playlistSongs" id="${id}songList"></div>
    <br><br><br>
  `
  document.getElementById('playlist_view').appendChild(p)
  $(`#${id}PlaylistView`).removeClass('hidden')

  for (let j = 0; j < data.tracks.items.length; j++) {
    const openNonUserPlaylistSong = data.tracks.items[j];
    await albumSong(openNonUserPlaylistSong.track.id, openNonUserPlaylistSong.track, openNonUserPlaylistSong.track.id + 'playlistItem', id + 'songList', j, id, openNonUserPlaylistSong.track.album.images[0].url)
  }
  
  compressedTrackList = []
  for (let y = 0; y < data.tracks.items.length; y++) {
    compressedTrackList.push(data.tracks.items[y].track)
  }
  queueData[id] = compressedTrackList

  $(`#${id}PlaylistView`).imagesLoaded(() => {
    colorThiefify('userPlaylistView', id + 'cover', id + 'playlistgradientelement')
  })
  initButtonsContained()
  initButtonsText()

  activeLoading = false
}

async function openCategory(id) {
  if (activeLoading) {
    console.error('Trying to load too fast. Stopped an action.')
    return
  }
  else {
    activeLoading = true
    window.setTimeout(() => {
      activeLoading = false
    }, 1500)
  }

  sessionStorage.setItem('activeView', id + 'CategoryView')
  console.log('Opening category of ', id);
  // Open Spotify Category of ID

  if ($(`#${id}CategoryView`).length) {
    $(`#${id}CategoryView`).addClass('hidden')
    $(`#${id}CategoryView`).removeClass('fadeIn')
    $(`#${id}CategoryView`).removeClass('fadeOut')
    window.setTimeout(() => {
      $(`#${id}CategoryView`).removeClass('hidden')
      $(`#${id}CategoryView`).addClass('fadeIn')
    }, 80)
    $(`#${id}CategoryView`).get(0).setAttribute('style', `z-index: ${activeMediaIndex} !important`)
    activeMediaIndex++
    activeLoading = false
    return;
  }

  // Playlist info
  data = await goFetch(`browse/categories/${id}`)
  playlistData = await goFetch(`browse/categories/${id}/playlists`)
  
  // Build the category
  p = document.createElement('div')
  p.setAttribute('id', id + 'CategoryView')
  p.setAttribute('class', 'animated hidden fadeIn media_view fastest ' + id + 'CategoryView')
  p.setAttribute('style', `z-index: ${activeMediaIndex} !important`)
  activeMediaIndex++

  p.innerHTML = `
    <div class="playViewGradient" id="${id}playlistgradientelement"></div>
    <button class="closePlaylistButton btn-contained-primary" onclick="hideCurrentView('${id}CategoryView')"><i class='bx bx-x'></i></button>
    <div class="playlistHeader row">
      <div class="col-sm">
        <center>
          <img crossOrigin="Anonymous" id="${id}cover" class="myPlaylistImg ${id}cover" src="${data.icons[0].url}"></img>
        </center>
      </div>
      <div class="col-sm">
        <center>
          <h1>${data.name}</h1>
        </center>
      </div>
    </div>
    <br><br>
    <div class="playlistList ${id}playlistSongs" id="${id}playlistList"></div>
    <br><br><br>
  `
  document.getElementById('category_view').appendChild(p)
  $(`#${id}CategoryView`).removeClass('hidden')

  for (let j = 0; j < playlistData.playlists.items.length; j++) {
    const openNonUserPlaylist = playlistData.playlists.items[j];
    await playlist(openNonUserPlaylist.id, openNonUserPlaylist, openNonUserPlaylist.id + 'categoryplaylist', id + 'playlistList')

    $(`#${openNonUserPlaylist.id}categoryplaylist`).imagesLoaded(() => {
      $(`#${openNonUserPlaylist.id}categoryplaylist`).removeClass('hidden')
    })
  }

  $(`#${id}CategoryView`).imagesLoaded(() => {
    colorThiefify('userPlaylistView', id + 'cover', id + 'playlistgradientelement')
  })

  initButtonsContained()
  initButtonsText()

  activeLoading = false
}