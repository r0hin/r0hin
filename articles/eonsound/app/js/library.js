// library.js
// Scripts relating to the user library and managing it.
// Called from various elements to interact with the library.
// Some stuff here is sensitive as it directly influences the database.

async function loadLibrary() {
  window.cacheUserArtists = []
  window.cacheUserAlbums = []
  window.cacheUserTracks = []
  window.cacheLikedAlbums = []
  window.cacheLikedArtists = []
  window.cacheLikedTracks = []

  doc = await db.collection('users').doc(user.uid).collection('spotify').doc('artists').get()
  if (doc.exists) {
    window.cacheUserArtists = doc.data().map
    window.cacheUserArtistsData = doc.data().artists
    window.cacheLikedArtists = doc.data().liked
    if (!doc.data().liked) {
      window.cacheLikedArtists = []
    }
  }
  else {
    window.cacheUserArtists = []
    window.cacheUserArtistsData = []
  }

  doc = await db.collection('users').doc(user.uid).collection('spotify').doc('albums').get()
  if (doc.exists) {
    window.cacheUserAlbums = doc.data().map
    window.cacheLikedAlbums = doc.data().liked
    if (!doc.data().liked) {
      window.cacheLikedAlbums = []
    }
    window.cacheUserAlbumsData = doc.data().albums
  }
  else {
    window.cacheUserAlbums = []
    window.cacheUserAlbumsData = []
  }

  doc = await db.collection('users').doc(user.uid).collection('spotify').doc('tracks').get()
  if (doc.exists) {
    window.cacheUserTracks = doc.data().map
    window.cacheUserTracksData = doc.data().tracks
    window.cacheLikedTracks = doc.data().liked
    if (!doc.data().liked) {
      window.cacheLikedTracks = []
    }
  }
  else {
    window.cacheUserTracks = []
    window.cacheUserTracksData = []
  }
}

async function loadLibraryTracks() {
  // data is cacheUserTracksData
  if (typeof(cacheUserTracksData) == "undefined") {
    // User not definted yet, library not defined yet...
    interval = window.setInterval(() => {
      if (typeof(cacheUserTracksData) !== "undefined") {
        window.clearInterval(interval)
        loadLibraryTracks()
      }
    }, 200)
    return;
  }

  if (cacheLikedTracks.length) {
    $('#favtext3').removeClass('hidden')
  }

  if (!cacheLikedTracks.length && !cacheUserTracks.length) {
    // no items
    $('#nothingInSongs').removeClass('hidden')
  }

  for (let i = 0; i < cacheUserTracksData.length; i++) {
    const temporaryTrackItem = cacheUserTracksData[i];
    if (cacheLikedTracks.includes(temporaryTrackItem.id)) {
      destinationID = 'favTracks'
    }
    else {
      destinationID = 'collectionTracks'
    }

    await track(temporaryTrackItem.id, temporaryTrackItem, 'libraryItem' + temporaryTrackItem.id, destinationID, 'tracks')

    musicData['tracks'] = cacheUserTracksData

    $('#songs').imagesLoaded(() => {
      $('#libraryItem' + temporaryTrackItem.id).removeClass("hidden");
    })   
  }

  updateTrackViews()
}

async function loadLibraryArtists() {
  // data is cacheUserAlbumsData
  if (typeof(cacheUserArtistsData) == "undefined") {
    // User not definted yet, library not defined yet...
    interval = window.setInterval(() => {
      if (typeof(cacheUserArtistsData) !== "undefined") {
        window.clearInterval(interval)
        loadLibraryArtists()
      }
    }, 200)
    return;
  }

  if (cacheLikedArtists.length) {
    $('#favtext2').removeClass('hidden')
  }

  if (!cacheLikedArtists.length && !cacheUserArtists.length) {
    // no items
    $('#nothingInArtists').removeClass('hidden')
  }

  for (let i = 0; i < cacheUserArtistsData.length; i++) {
    const temporaryArtistItem = cacheUserArtistsData[i];
    if (cacheLikedArtists.includes(temporaryArtistItem.id)) {
      destinationID = 'favArtists'
    }
    else {
      destinationID = 'collectionArtists'
    }
    await artist(temporaryArtistItem.id, {
      images: [{url: temporaryArtistItem.pfp}],
      name: temporaryArtistItem.name,
      id: temporaryArtistItem.id,
    }, 'libraryItem' + temporaryArtistItem.id, destinationID)

    $('#artists').imagesLoaded(() => {
      $('#libraryItem' + temporaryArtistItem.id).removeClass("hidden");
    })   
  }

  updateArtistViews()
}

async function loadLibraryAlbums() {
  // data is cacheUserAlbumsData
  if (typeof(cacheUserAlbumsData) == "undefined") {
    // User not definted yet, library not defined yet...
    interval = window.setInterval(() => {
      if (typeof(cacheUserAlbumsData) !== "undefined") {
        window.clearInterval(interval)
        loadLibraryAlbums()
      }
    }, 200)
    return;
  }

  if (cacheLikedAlbums.length) {
    $('#favtext').removeClass('hidden')
  }

  if (!cacheLikedAlbums.length && !cacheUserAlbums.length) {
    // no items
    $('#nothingInAlbums').removeClass('hidden')
  }

  for (let i = 0; i < cacheUserAlbumsData.length; i++) {
    const temporaryAlbumItem = cacheUserAlbumsData[i];
    if (cacheLikedAlbums.includes(temporaryAlbumItem.id)) {
      destinationID = 'favAlbums'
    }
    else {
      destinationID = 'collectionAlbums'
    }
    await album(temporaryAlbumItem.id, {
      images: [{url: temporaryAlbumItem.art}],
      // Only do first artist for now
      artists: temporaryAlbumItem.artists,
      name: temporaryAlbumItem.name,
      id: temporaryAlbumItem.id,
    }, 'libraryItem' + temporaryAlbumItem.id, destinationID, true)

    $('#albums').imagesLoaded(() => {
      $('#libraryItem' + temporaryAlbumItem.id).removeClass("hidden");
    })   
  }

  updateAlbumViews()
  
}

async function addTrackToPlaylist(playlistID) {
  // GET TRACK INFO
  var prepareTrackPlaylistTrack = prepare_library_changes

  if (!prepare_library_changes.art) {
    var prepareTrackPlaylistTrack = {
      name: prepareTrackPlaylistTrack.name,
      id: prepareTrackPlaylistTrack.id,
      art: prepareTrackPlaylistTrack.album.images[0].url,
      artists: artistToString(prepareTrackPlaylistTrack.artists),
      artistID: prepareTrackPlaylistTrack.artists[0].id,
      length: prepareTrackPlaylistTrack.duration_ms
    }
  }

  // GET TRACK DOWNLOAD URL
  if (!prepareTrackPlaylistTrack.url) {
    prepareTrackPlaylistTrack.url = await downloadSong(prepareTrackPlaylistTrack.id, prepareTrackPlaylistTrack.spotifyURL, prepareTrackPlaylistTrack.name)
  }

  if (prepareTrackPlaylistTrack.url == 'no') {
    alert('Could not add to playlist because the audio URL returned is invalid. \n\nThis track cannot be added to a playlist or played. Our apologies.')
    return;
  }
  
  // ADD TRACK TO PLAYLIST
  await db.collection('users').doc(user.uid).collection('library').doc(playlistID).update({
    songs: firebase.firestore.FieldValue.arrayUnion(prepareTrackPlaylistTrack),
    last_updated: firebase.firestore.FieldValue.serverTimestamp()
  })

  if (cacheUserPlaylistData[playlistID]) {
    cacheUserPlaylistData[playlistID].last_updated = new Date().toDateString();
    cacheUserPlaylistData[playlistID].songs.push(prepareTrackPlaylistTrack)
  }

  // ADD TRACK TO LIBRARY
  addTrackToLibrary(prepareTrackPlaylistTrack.id, true, false)

  // REFLECT IN UI
  if (cacheUserPlaylistData[playlistID]) {
    // If its loaded, you update the UI and use the cache data as the queue idnex.
    await userPlaylistSong(prepareTrackPlaylistTrack.id, prepareTrackPlaylistTrack, playlistID + prepareTrackPlaylistTrack.id, playlistID + 'playlistSongs', cacheUserPlaylistData[playlistID].songs.length, playlistId )
    // If it's not loaded, theres no problem since it will get loaded next time you view it.
    // Now update potentail queue
    if (queueData[playlistID]) {
      queueData[playlistID].push(prepareTrackPlaylistTrack)
    }
  }

  $(`#${playlistID}recommend`).removeClass('hidden')

  Snackbar.show({pos: 'top-center',text: "Added '" + prepareTrackPlaylistTrack.name + "' to a playlist."})
}

async function addArtistToLibrary(id, verbose) {
  return new Promise(async (resolve, reject) => {
    $(`#addLibraryCol${id}`).addClass('hidden')
    if (cacheUserArtists.includes(id)) {
      resolve('Exists')
      return;
    }

    // Gather data
    data = await goFetch(`artists/${id}`)

    dataToPush = {
      id: id,
      pfp: data.images[0].url,
      name: data.name
    }
    
    await db.collection('users').doc(user.uid).collection('spotify').doc('artists').set({
      artists: firebase.firestore.FieldValue.arrayUnion(dataToPush),
      map: firebase.firestore.FieldValue.arrayUnion(id)
    }, {merge: true})

    await artist(id, {
      images: [{url: data.images[0].url}],
      name: data.name,
      id: id,
    }, 'libraryItem' + id, 'collectionArtists')

    $('#artists').imagesLoaded(() => {
      $('#libraryItem' + id).removeClass("hidden");
      $('#nothingInArtists').addClass('hidden')
      $('#coltext2').removeClass('hidden')
    }) 

    cacheUserArtistsData.push(dataToPush)
    cacheUserArtists.push(id)

    if (verbose) {
      Snackbar.show({text: "Artist added to your library", pos: 'top-center'})
    }

    resolve('successo expresso')
    return;
  })
}

async function addAlbumToLibrary(id, skipUI, SKIPTRACKSFORINFINITELOOP) {
  return new Promise(async (resolve, reject) => {
    if (cacheUserArtists.includes(id)) {
      // Already contains
      resolve('gottempopot')
      return;
    }

    if (!skipUI) {
      Snackbar.show({pos: 'top-center',text: "Adding album to library..."})
    }
    // Gather album details
    // Album info


    atoldata = await goFetch(`albums/${id}`)
    console.log(atoldata);

    // Add it to all the artists
    for (let i = 0; i < atoldata.artists.length; i++) {
      await addArtistToLibrary(atoldata.artists[i].id)
    }  

    // For each song, add record in firebase
    if (!SKIPTRACKSFORINFINITELOOP) {
      // If its coming from track to library, do not add tracks in library omg.
      for (let i = 0; i < atoldata.tracks.items.length; i++) {
        musicData[atoldata.tracks.items[i].id] = atoldata.tracks.items[i]
        await addTrackToLibrary(atoldata.tracks.items[i].id, false, false)
      }
    }

    thisAlbumDataSnippet = {
      art: atoldata.images[0].url,
      artists: artistToString(atoldata.artists),
      artists_code: atoldata.artists[0].id,
      name: atoldata.name,
      id: atoldata.id,
    }

    await db.collection('users').doc(user.uid).collection('spotify').doc('albums').set({
      albums: firebase.firestore.FieldValue.arrayUnion(thisAlbumDataSnippet),
      map: firebase.firestore.FieldValue.arrayUnion(atoldata.id)
    }, {merge: true})
  
    // Added, now build

    cacheUserAlbumsData.push(thisAlbumDataSnippet)
    cacheUserAlbums.push(atoldata.id)

    await album(atoldata.id, atoldata, 'libraryItem' + atoldata.id, 'collectionAlbums', true)
    $('#albums').imagesLoaded(() => {
      $('#libraryItem' + atoldata.id).removeClass("hidden");
      $('#nothingInAlbums').addClass('hidden')
    })   
    updateAlbumViews()

    if (!skipUI) {
      showcomplete()
    }

    // Remove button
    $(`#addLibraryCol${id}`).addClass('hidden')

    if (!skipUI) {
      Snackbar.show({pos: 'top-center',text: "Added " + atoldata.name + " to library"})
    }
    resolve('skiddooo')
  })
}

async function addTrackToLibrary(trackID, showFeedback, showAlbumToo) {
  // TrackID: the id of the track. Data will be handled here optimized.
  // We don't know the album ID of the song in some scenarios so make sure the album is fkijgnj included
  // Show feedback: to show feedback thats it added.
  // Show album too: To add the album of track to library as well. Should be to false if we're adding all songs in an album.

  return new Promise(async(resolve, reject) => {
    // First, get the track data
    if (!musicData[trackID]) {
      trackLibraryData = await goFetch('tracks/' + trackID)
      musicData[trackID] = trackLibraryData
    }
    else {
      trackLibraryData = musicData[trackID]
      if (!trackLibraryData.album) {
        trackLibraryData = await goFetch('tracks/' + trackID)
        musicData[trackID] = trackLibraryData
        trackLibraryData = musicData[trackID]
      }
    }

    // Now, format the artists
    artists = artistToString(trackLibraryData.artists)

    // Update the database
    dataToPush = {
      art: trackLibraryData.album.images[0].url,
      album: trackLibraryData.album.id,
      artists: artists,
      explicit: trackLibraryData.explicit,
      item_num: trackLibraryData.track_number,
      name: trackLibraryData.name,
      id: trackID,
    }
    await db.collection("users").doc(user.uid).collection('spotify').doc('tracks').set({
      tracks: firebase.firestore.FieldValue.arrayUnion(dataToPush),
      map: firebase.firestore.FieldValue.arrayUnion(trackID)
    }, {merge: true})

    // Reflect in the UI
    cacheUserTracks.push(trackID)
    cacheUserTracksData.push(dataToPush)

    if (showAlbumToo) {
      // Try to add the album if its requested
      console.log('Adding album as well from track');
      await addAlbumToLibrary(trackLibraryData.album.id, true, true)
    }

    console.log(trackLibraryData);

    await track(trackID, trackLibraryData, 'libraryItem' + trackID, 'collectionTracks', 'tracks')
    await albumSong(trackID, trackLibraryData, trackLibraryData.album.id + trackID + 'lib', trackLibraryData.album.id + 'AlbumSongslib', 0, trackLibraryData.album.id + 'lib', trackLibraryData.album.images[0].url)
    reOrderAlbumLibrary(trackLibraryData.album.id)

    $('#songs').imagesLoaded(() => {
      $('#libraryItem' + trackID).removeClass("hidden");
      $('#nothingInSongs').addClass('hidden')
      $('#coltext3').removeClass('hidden')
    })  

    if (showFeedback) {
      Snackbar.show({text: data.name + ' added to your library.', pos: 'top-center'})
    }
  
    resolve('potpot')
    return;
  })
}

async function addSpotifyPlaylistToLibrary(id) {
  yc = confirm(`-= Convert Spotify Playlist of ID ${id} to EonSound Playlist =-\n\nThis will create an EonSound playlist and sequentially add each song to the playlist. This will run in the background. \n\nClick to confirm:`)
  if (!yc) {
    return;
  }
  // Spotify playlists to library:
  // Get playlist data, convert it, add the playlist. For each song, add the song, artist and album.
  return new Promise(async (resolve, reject) => {
    Snackbar.show({pos: 'top-center',text: "Converting Spotify playlist to EonSound..."})

    // Grab playlist data
    sptoldata = await goFetch(`playlists/${id}`)
    
    await db.collection('users').doc(user.uid).collection('library').doc(id).set({
      name: sptoldata.name,
      publicity: "public",
      description: sptoldata.description,
      status: true,
      owner: {
        name: cacheuser.name,
        username: cacheuser.username,
        photo: cacheuser.url,
      },
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      last_updated:firebase.firestore.FieldValue.serverTimestamp(),
      songs: [],
      cover: "https://firebasestorage.googleapis.com/v0/b/eonsound.appspot.com/o/app%2Fempty_album.png?alt=media",
    })

    await db.collection('users').doc(user.uid).set({
      playlistsPreview: firebase.firestore.FieldValue.arrayUnion({
        cover: "https://firebasestorage.googleapis.com/v0/b/eonsound.appspot.com/o/covers%2F" + id + ".png?alt=media",
        name: sptoldata.name,
        status: true,
        id: id
      })
    }, {merge: true})

    var albumPhoto = firebase.functions().httpsCallable("albumPhoto");
    await albumPhoto({ id: id })
    
    // For each track
    console.log(sptoldata);

    for (let i = 0; i < sptoldata.tracks.items.length; i++) {
      const temporaryTrackItem = sptoldata.tracks.items[i].track;

      // Add to playlist...
      console.log(temporaryTrackItem);

      url = await downloadSong(temporaryTrackItem.id, temporaryTrackItem.external_urls.spotify, temporaryTrackItem.name)
      if (url === 'no') { continue; }

      // Added to playlist
      await db.collection('users').doc(user.uid).collection('library').doc(id).set({
        songs: firebase.firestore.FieldValue.arrayUnion({
          art: temporaryTrackItem.album.images[0].url,
          artists: artistToString(temporaryTrackItem.artists),
          id: temporaryTrackItem.id,
          name: temporaryTrackItem.name,
          url: url,
        })
      }, {merge: true})

      // Add album to library

      await addAlbumToLibrary(temporaryTrackItem.album.id, true, true)

      Snackbar.show({pos: 'top-center',text: `Added ${i}/${sptoldata.tracks.items.length} tracks.`})

    }

    window.setTimeout(() => {
      showcomplete()
      Snackbar.show({pos: 'top-center',text: "Saved playlist to library. Refreshing..."})
      $('#user_library_playlists').empty()
      loadUserPlaylists()
    }, 500)
    resolve('ayo')
  }) 
}

async function favAlbum(id) {
  $(`#libraryItem${id}`).removeClass('fadeIn')
  $(`#libraryItem${id}`).addClass('fadeOutUp')

  window.setTimeout(async () => {

    if (!cacheUserAlbums.includes(id)) {
      await addAlbumToLibrary(id)
    }

    await db.collection('users').doc(user.uid).collection('spotify').doc('albums').set({
      liked: firebase.firestore.FieldValue.arrayUnion(id)
    }, {merge: true})
    
    $(`#libraryItem${id}`).addClass('fadeIn')
    $(`#libraryItem${id}`).removeClass('fadeOutUp')

    $(`#favAlbums`).append($(`#libraryItem${id}`))
    cacheLikedAlbums.push(id)

    updateAlbumViews()
  }, 650)

}

async function unfavAlbum(id) {
  $(`#libraryItem${id}`).removeClass('fadeIn')
  $(`#libraryItem${id}`).addClass('fadeOutDown')

  window.setTimeout(async () => {    
    await db.collection('users').doc(user.uid).collection('spotify').doc('albums').set({
      liked: firebase.firestore.FieldValue.arrayRemove(id)
    }, {merge: true})

    $(`#libraryItem${id}`).addClass('fadeIn')
    $(`#libraryItem${id}`).removeClass('fadeOutDown')

    $(`#collectionAlbums`).append($(`#libraryItem${id}`))
    cacheLikedAlbums.splice(cacheLikedAlbums.indexOf(id), 1);

    updateAlbumViews()
  }, 650)
}

async function favTrack(id) {
  $(`#libraryItem${id}`).removeClass('fadeIn')
  $(`#libraryItem${id}`).addClass('fadeOutUp')

  window.setTimeout(async () => {

    if (!cacheUserTracks.includes(id)) {
      await addTrackToLibrary(id)
    }

    await db.collection('users').doc(user.uid).collection('spotify').doc('tracks').set({
      liked: firebase.firestore.FieldValue.arrayUnion(id)
    }, {merge: true})
    
    $(`#libraryItem${id}`).addClass('fadeIn')
    $(`#libraryItem${id}`).removeClass('fadeOutUp')

    $(`#favTracks`).append($(`#libraryItem${id}`))
    cacheLikedTracks.push(id)

     
    updateTrackViews()
  }, 650)

}

async function unfavTrack(id) {
  $(`#libraryItem${id}`).removeClass('fadeIn')
  $(`#libraryItem${id}`).addClass('fadeOutDown')

  window.setTimeout(async () => {    
    await db.collection('users').doc(user.uid).collection('spotify').doc('tracks').set({
      liked: firebase.firestore.FieldValue.arrayRemove(id)
    }, {merge: true})

    $(`#libraryItem${id}`).addClass('fadeIn')
    $(`#libraryItem${id}`).removeClass('fadeOutDown')

    $(`#collectionTracks`).append($(`#libraryItem${id}`))
    cacheLikedTracks.splice(cacheLikedTracks.indexOf(id), 1);

     
    updateTrackViews()
  }, 650)
}

async function favArtist(id) {
  $(`#libraryItem${id}`).removeClass('fadeIn')
  $(`#libraryItem${id}`).addClass('fadeOutUp')

  window.setTimeout(async () => {

    if (!cacheUserArtists.includes(id)) {
      await addArtistToLibrary(id)
    }

    await db.collection('users').doc(user.uid).collection('spotify').doc('artists').set({
      liked: firebase.firestore.FieldValue.arrayUnion(id)
    }, {merge: true})
    
    $(`#libraryItem${id}`).addClass('fadeIn')
    $(`#libraryItem${id}`).removeClass('fadeOutUp')

    $(`#favArtists`).append($(`#libraryItem${id}`))
    cacheLikedArtists.push(id)

    updateArtistViews()
  }, 650)

}

async function unfavArtist(id) {
  $(`#libraryItem${id}`).removeClass('fadeIn')
  $(`#libraryItem${id}`).addClass('fadeOutDown')

  window.setTimeout(async () => {    
    await db.collection('users').doc(user.uid).collection('spotify').doc('artists').set({
      liked: firebase.firestore.FieldValue.arrayRemove(id)
    }, {merge: true})

    $(`#libraryItem${id}`).addClass('fadeIn')
    $(`#libraryItem${id}`).removeClass('fadeOutDown')

    $(`#collectionArtists`).append($(`#libraryItem${id}`))
    cacheLikedArtists.splice(cacheLikedArtists.indexOf(id), 1);

    updateArtistViews()
  }, 650)
}

function updateAlbumViews() {
  if (cacheLikedAlbums.length) {
    // Favourites exist
    $('#favtext').removeClass('hidden')
  }
  else {
    // Favourites don't exist
    $('#favtext').addClass('hidden')
  }

  if ($('#collectionAlbums').children().length) {
    // Collection items exist
    $('#coltext').removeClass('hidden')
  }
  else {
    // Collection items dont exist
    $('#coltext').addClass('hidden')
  }
}

function updateArtistViews() {
  if (cacheLikedArtists.length) {
    // Favourites exist
    $('#favtext2').removeClass('hidden')
  }
  else {
    // Favourites don't exist
    $('#favtext2').addClass('hidden')
  }

  if ($('#collectionArtists').children().length) {
    // Collection items exist
    $('#coltext2').removeClass('hidden')
  }
  else {
    // Collection items dont exist
    $('#coltext2').addClass('hidden')
  }
}

function updateTrackViews() {
  if (cacheLikedTracks.length) {
    // Favourites exist
    $('#favtext3').removeClass('hidden')
  }
  else {
    // Favourites don't exist
    $('#favtext3').addClass('hidden')
  }

  if ($('#collectionTracks').children().length) {
    // Collection items exist
    $('#coltext3').removeClass('hidden')
  }
  else {
    // Collection items dont exist
    $('#coltext3').addClass('hidden')
  }
}

async function removeArtistFromLibrary(artistID) {
  // Search artist in cache for index...

  match = undefined
  for (let i = 0; i < cacheUserArtists.length; i++) {
    if (cacheUserArtists[i] == artistID) {
      match = i
    }
  }

  if (match == undefined) {
    alert('Internal Error.')
    return;
  }

  // Data is cacheUserArtistsData[match]

  // Update db
  db.collection('users').doc(user.uid).collection('spotify').doc('artists').update({
    artists: firebase.firestore.FieldValue.arrayRemove(cacheUserArtistsData[match]),
    liked: firebase.firestore.FieldValue.arrayRemove(artistID),
    map: firebase.firestore.FieldValue.arrayRemove(artistID),
  })

  // Update UI
  $(`#libraryItem${artistID}`).remove()

  // Update Cache
  cacheUserArtistsData.splice(match, 1)
  cacheUserArtists.splice(match, 1)
  cacheLikedArtists.splice(cacheLikedArtists.indexOf(artistID), 1)

  Snackbar.show({text: "Artist removed from your library.", pos: 'top-center'})
  updateArtistViews()
}

async function removeAlbumFromLibrary(albumID) {
  // Search album in cache for index...

  match = undefined
  for (let i = 0; i < cacheUserAlbums.length; i++) {
    if (albumID == cacheUserAlbums[i]) {
      match = i
    }
  }

  if (match == undefined) {
    alert('Internal Error.')
    return;
  }

  // Update db
  db.collection('users').doc(user.uid).collection('spotify').doc('albums').update({
    albums: firebase.firestore.FieldValue.arrayRemove(cacheUserAlbumsData[match]),
    liked: firebase.firestore.FieldValue.arrayRemove(albumID),
    map: firebase.firestore.FieldValue.arrayRemove(albumID),
  })

  // Update UI
  $(`#libraryItem${albumID}`).remove()

  // Update Cache
  cacheUserAlbumsData.splice(match, 1)
  cacheUserAlbums.splice(match, 1)
  cacheLikedAlbums.splice(cacheLikedAlbums.indexOf(albumID), 1)

  Snackbar.show({text: "Album removed from your library.", pos: 'top-center'})
  updateAlbumViews()
}

async function removeTrackFromLibrary(trackID) {
// Search track in cache for index...

  match = undefined
  for (let i = 0; i < cacheUserTracks.length; i++) {
    if (trackID == cacheUserTracks[i]) {
      match = i
    }
  }

  if (match == undefined) {
    alert('Internal Error.')
    return;
  }

   // Rebuild existing queue

  // Update db
  db.collection('users').doc(user.uid).collection('spotify').doc('tracks').update({
    tracks: firebase.firestore.FieldValue.arrayRemove(cacheUserTracksData[match]),
    liked: firebase.firestore.FieldValue.arrayRemove(trackID),
    map: firebase.firestore.FieldValue.arrayRemove(trackID),
  })

  // Update UI
  $(`#libraryItem${trackID}`).remove()
  $(`.${trackID}`).remove()

  // Rebuild album queue
  reBuildAlbumQueue(cacheUserTracksData[match].album)

  var tempoalbumyo = cacheUserTracksData[match].album

  // Update Cache
  cacheUserTracksData.splice(match, 1)
  cacheUserTracks.splice(match, 1)
  cacheLikedTracks.splice(cacheLikedTracks.indexOf(trackID), 1)

  Snackbar.show({text: "Track removed from your library.", pos: 'top-center'})
  updateTrackViews()

  // Do a final check in case theres still a track in the album
  match = false
  for (let i = 0; i < cacheUserTracksData.length; i++) {
    if (cacheUserTracksData[i].album == tempoalbumyo) {
      match = true
    }
  }
  if (!match) {
    // No songs in library part of the album so just delete it:
    hideCurrentView()
    removeAlbumFromLibrary(tempoalbumyo)
  }
}

async function artistInfo(id) {
  if (musicData[id]) {
    data = musicData[id]
  }
  else {
    data = await goFetch(`artists/${id}`)
    musicData[id] = data
  }

  $('#mediaInfo').modal('toggle')
  $('#mediainfolist').empty()
  newMediaInfo('Name', data.name)
  newMediaInfo('Type', 'Artist')
  newMediaInfo('ID', id)
}

async function albumInfo(id) {
  if (musicData[id]) {
    data = musicData[id]
  }
  else {
    data = await goFetch(`albums/${id}`)
    musicData[id] = data
  }

  $('#mediaInfo').modal('toggle')
  $('#mediainfolist').empty()
  newMediaInfo('Name', data.name)
  newMediaInfo('Type', 'Album')
  newMediaInfo('Artist', data.artists[0].name)
  newMediaInfo('Release Date', data.release_date)
  newMediaInfo('Songs', data.tracks.items.length)
  newMediaInfo('Spotify Popularity', data.popularity)
  newMediaInfo('Artist ID', data.artists[0].id)
  newMediaInfo('ID', id)
}

async function playlistInfo(id) {
  if (musicData[id]) {
    data = musicData[id]
  }
  else {
    data = await goFetch(`playlists/${id}`)
    musicData[id] = data
  }

  $('#mediaInfo').modal('toggle')
  $('#mediainfolist').empty()
  newMediaInfo('Name', data.name)
  newMediaInfo('Type', 'Playlist')
  newMediaInfo('Owner', data.owner.id)
  newMediaInfo('Release Date', data.release_date)
  newMediaInfo('Songs', data.tracks.items.length)
  newMediaInfo('ID', id)
}

async function trackInfo(id) {
  if (musicData[id]) {
    data = musicData[id]
  }
  else {
    data = await goFetch(`tracks/${id}`)
    musicData[id] = data
  }

  $('#mediaInfo').modal('toggle')
  $('#mediainfolist').empty()
  newMediaInfo('Name', data.name)
  newMediaInfo('Type', 'Track')
  newMediaInfo('Artist', data.artists[0].name)
  newMediaInfo('Explicit', data.explicit)
  newMediaInfo('Duration', data.duration_ms)
  newMediaInfo('Album', data.album.name)
  newMediaInfo('Spotify Popularity', data.popularity)
  newMediaInfo('ID', id)
}