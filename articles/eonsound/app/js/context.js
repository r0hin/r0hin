// context.js
// Right-click context menu related scripts

sessionStorage.setItem("menuOpen", "false");
contextMenuListener();

function getPosition(e) {
  var posx = 0; var posy = 0;

  if (!e) var e = window.event;
  if (e.pageX || e.pageY) {
    posx = e.pageX; posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }

  return { x: posx, y: posy };
}

function clickInsideElement(e, className) {
  var el = e.srcElement || e.target;

  if (el.classList.contains(className)) {
    return el;
  } else {
    while ((el = el.parentNode)) {
      if (el.classList && el.classList.contains(className)) {
        return el;
      }
    }
  }

  return false;
}

async function contextMenuListener() {
  document.addEventListener("contextmenu", (e) => {
    checkElements(e)
  });
}

function checkElements(e) {
  el = clickInsideElement(e, "song");
    if (el) {
      trackContext(e, el)
      toggleMenuOff('track');
    } else {
      el = clickInsideElement(e, "album");
      if (el) {
        albumContext(e, el)
        toggleMenuOff('album');
      } else {
        el = clickInsideElement(e, "artist")
        if (el) {
          artistContext(e, el)
          toggleMenuOff('artist');
        }
        else {
          el = clickInsideElement(e, 'spotifyPlaylist')
          if (el) {
            playlistContext(e, el)
            toggleMenuOff('spotifyPlaylist')
          }
          else {
            el = clickInsideElement(e, 'category')
            if (el) {
              categoryContext(e, el)
              toggleMenuOff('category')
            }
            else {
              el = clickInsideElement(e, 'userPlaylist')
              if (el) {
                userPlaylistContext(e, el)
                toggleMenuOff('userPlaylist')
              }
              else {
                el = clickInsideElement(e, 'friend')
                if (el) {
                  friendContext(e, el)
                  toggleMenuOff('friend')
                }
                else {
                  el = clickInsideElement(e, 'otherUserBPlaylist')
                  if (el) {
                    otherUserBPlaylistContext(e, el)
                    toggleMenuOff('otherUserBPlaylist')
                  }
                }
              }
            }
          }
        }
      }
    }
}

function toggleMenuOff(ignore) {
  sessionStorage.setItem("menuOpen", "false");
  document.getElementById("track_context").classList.remove("context_active");
  document.getElementById("category_context").classList.remove("context_active");
  document.getElementById("album_context").classList.remove("context_active");
  document.getElementById("artist_context").classList.remove("context_active");
  document.getElementById("spotifyPlaylist_context").classList.remove("context_active");
  document.getElementById("userPlaylist_context").classList.remove("context_active");
  document.getElementById("friend_context").classList.remove("context_active");
  document.getElementById("otherUserBPlaylist_context").classList.remove("context_active");

  if (ignore) {
    // Toggle off everything except for ignore
    sessionStorage.setItem("menuOpen", "true");
    document.getElementById(ignore + "_context").classList.add("context_active");
  }
}

document.addEventListener("click", function (e) {
  if (sessionStorage.getItem("menuOpen") == "true") {
    toggleMenuOff();
  }
});

function positionMenu(e, menu) {
  clickCoords = getPosition(e);
  clickCoordsX = clickCoords.x;
  clickCoordsY = clickCoords.y;

  menuWidth = menu.offsetWidth + 4;
  menuHeight = menu.offsetHeight + 4;

  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;

  if ( (windowWidth - clickCoordsX) < menuWidth ) {
    menu.style.left = windowWidth - menuWidth + "px";
  } else {
    menu.style.left = clickCoordsX + "px";
  }

  if ( (windowHeight - clickCoordsY) < menuHeight ) {
    menu.style.top = windowHeight - menuHeight + "px";
  } else {
    menu.style.top = clickCoordsY + "px";
  }
}


async function categoryContext(e, el) {
  e.preventDefault();
  sessionStorage.setItem("menuOpen", "true");
  
  menu = document.getElementById("category_context");
  menu.classList.add("context_active");
  positionMenu(e, menu)

  id = el.getAttribute("category_details")

  document.getElementById('openbtncategory').onclick = async () => {
    openCategory(id)
  }

  // document.getElementById('copybtncategory').onclick = async () => {
  //   console.log('copy link of' + id);
  // } ""Should I add this??""

  document.getElementById('infobtncategory').onclick = async () => {
    categoryInfo(id)
  }
}


async function trackContext(e, el) {
  e.preventDefault();
  sessionStorage.setItem("menuOpen", "true");
  
  menu = document.getElementById("track_context");
  menu.classList.add("context_active");
  positionMenu(e, menu)

  id = el.getAttribute("track_details")
  contextArtist = el.getAttribute("track_artist")
  contextPlaylist = el.getAttribute("track_playlist")
  activeQueue = el.getAttribute("active_queue")
  otherPerson = el.getAttribute("other")

  // TRACK TO ALBUM/ARTIST

  document.getElementById('tracktoartist').onclick = async () => {
    // Get artist from track
    if (contextArtist) {
      openArtist(contextArtist)
    }

    if (musicData[id]) { 
      data = musicData[id]  
    }
    else {
      data = await goFetch(`tracks/${id}`)
      window.musicData[id] = data
    }
    openArtist(data.artists[0].id)
    
  }

  document.getElementById('tracktoalbum').onclick = async () => {
    // Get artist from track
    if (musicData[id]) { 
      data = musicData[id]  
    }
    else {
      data = await goFetch(`tracks/${id}`)
      window.musicData[id] = data
      openAlbum(data.album.id)
    }
  }

  // PLAY BUTTON
  document.getElementById("playbtn").onclick = () => {
    window.musicQueue = [];
    window.musicHistory = [];
    window.musicActive = { none: "none" };
    playSongWithoutData(id);
  };
  
  // QUEUE BUTTON
  document.getElementById("queuebtn").onclick = () => {
    queueSongWithoutData(id);
  };

  // ADD PLAYLIST  
  document.getElementById("0addbtn").onclick = async () => {
    // Get track details
    if (musicData[id]) {
      data = musicData[id]  
    }

    else {
      data = await goFetch(`tracks/${id}`)
      window.musicData[id] = data
    }

    // This is all the data you need to add to playlist.
    window.prepare_library_changes = data

    $('#playlistSelect').modal('toggle')
    initButtonsText()
  };

  // ADD or remove LIBRARY
  if (cacheUserTracks.includes(id)) {
    document.getElementById('1addbtn').innerHTML = 'remove from library'
    document.getElementById('1addbtn').onclick = async () => {
      // Call ONLY with ID
      removeTrackFromLibrary(id)
    }
  }
  else {
    document.getElementById('1addbtn').innerHTML = 'add to library'
    document.getElementById('1addbtn').onclick = async () => {
      // Call ONLY with ID
      addTrackToLibrary(id, true, true)
    }
  }

  // ADD LIKED
  if (cacheLikedTracks.includes(id)) {
    // Already liked
    document.getElementById('2addbtn').onclick = async () => {
      unfavTrack(id)
    }
    document.getElementById('2addbtn').innerHTML = "Remove from Favorites"
  }
  else {
    document.getElementById('2addbtn').onclick = async () => {
      favTrack(id)
    }
    document.getElementById('2addbtn').innerHTML = "Add to Favorites"
  }

  // SONG INFO
  document.getElementById('infobtn').onclick = async () => {
    trackInfo(id)
  }

  // Copy link
  document.getElementById('copybtn').onclick = async () => {
    await copyText(`https://r0hin.github.io/eonsound/preview?type=track&id=${id}`)
  }

  if (contextPlaylist && otherPerson !== 'true' && otherPerson !== true) {
    // We know this track is in a playlist. Offer button to remove it
    $('#trackdeletecontent').html(`
      <div class="context_divider"></div>
      <button onclick="removeTrackFromPlaylist('${id}', '${contextPlaylist}')" class="btn-text-danger contextbtn contextbtndanger">Remove from Playlist</button>
    `)
    initButtonsText()
  }
  else {
    $('#trackdeletecontent').html(``)
  }

  if (activeQueue) {
    // Show queue button 
    $('#queueactioncontent').html(`
      <div class="context_divider"></div>
      <button onclick="removeFromQueueByIndex('${activeQueue}')" class="btn-text-danger contextbtn contextbtndanger">Remove from Queue</button>
    `)
    initButtonsText()
  }
  else {
    $('#queueactioncontent').html(``)
  }

}

async function friendContext(e, el) {
  e.preventDefault();
  sessionStorage.setItem("menuOpen", "true");
  
  menu = document.getElementById("friend_context");
  menu.classList.add("context_active");
  positionMenu(e, menu)

  id = el.getAttribute("user_details")
  // TRACK TO ALBUM/ARTIST

  document.getElementById('openfriend').onclick = async () => {
    $(`#${id}iconElement`).click()
  }

  // FRIEND INFO
  document.getElementById('infofriend').onclick = async () => {
    friendInfo(id)
  }

  // Remove Friend
  document.getElementById('deletefriend').onclick = async () => {
    removeFriend(id)
  }
}


async function userPlaylistContext(e, el) {
  e.preventDefault();
  sessionStorage.setItem("menuOpen", "true");
  
  menu = document.getElementById("userPlaylist_context");
  menu.classList.add("context_active");
  positionMenu(e, menu)

  id = el.getAttribute("playlist_details")


  // CTX BTNS

  document.getElementById('openbtnuplay').onclick = async () => {
    // Get artist from track
    openUserPlaylist(id)
  }

  // PLAYLIST INFO
  document.getElementById('infobtnuplay').onclick = async () => {
    userPlaylistInfo(id)
  }

  // Playlist rename

  document.getElementById('infobtnurename').onclick = async () => {
    renameUserPlaylist(id)
  }

  // // Copy link
  // document.getElementById('copybtnuplay').onclick = async () => {
  //   await copyText(`https://r0hin.github.io/eonsound/preview?type=userPlaylist&id=${id}`)
  // } fuuture maybe

  document.getElementById('deletebtnuplay').onclick = async () => {
    deleteUserPlaylist(id)
  }

}

async function otherUserBPlaylistContext(e, el) {
  e.preventDefault();
  sessionStorage.setItem("menuOpen", "true");
  
  menu = document.getElementById("otherUserBPlaylist_context");
  menu.classList.add("context_active");
  positionMenu(e, menu)

  id = el.getAttribute("playlist_details")
  owner = el.getAttribute("owner_details")

  // CTX BTNS
  document.getElementById('openotherbtn').onclick = async () => {
    // Get artist from track
    openotherUserBPlaylist(id, owner)
  }

  // PLAYLIST INFO
  document.getElementById('infootherbtn').onclick = async () => {
    otherUserBPlaylistInfo(id)
  }

  // Playlist rename
}

async function albumContext(e, el) {
  e.preventDefault();
  sessionStorage.setItem("menuOpen", "true");
  
  menu = document.getElementById("album_context");
  menu.classList.add("context_active");
  positionMenu(e, menu)

  id = el.getAttribute("album_details");

  // OPEN BUTTON
  document.getElementById("openbtn").onclick = () => {
    openAlbum(id);
  };

  // Add or remove LIBRARY
  if (cacheUserAlbums.includes(id)) {
    document.getElementById("0addbtn2").innerHTML = 'remove from library'
    document.getElementById("0addbtn2").onclick = async () => {
      // Call function directly
      await removeAlbumFromLibrary(id)
    };
  }
  else {
    document.getElementById("0addbtn2").innerHTML = 'add to library'
    document.getElementById("0addbtn2").onclick = async () => {
      // Call function directly
      await addAlbumToLibrary(id)
    };
  }

  // ADD LIKED
  if (cacheLikedAlbums.includes(id)) {
    // Already liked
    document.getElementById('1addbtn2').onclick = async () => {
      unfavAlbum(id)
    }
    document.getElementById('1addbtn2').innerHTML = "Remove from Favorites"
  }
  else {
    document.getElementById('1addbtn2').onclick = async () => {
      favAlbum(id)
    }
    document.getElementById('1addbtn2').innerHTML = "Add to Favorites"
  }


  // SONG INFO
  document.getElementById('infobtn2').onclick = async () => {
    albumInfo(id)
  }

  // Copy link
  document.getElementById('copybtn2').onclick = async () => {
    await copyText(`https://r0hin.github.io/eonsound/preview?type=album&id=${id}`)
  }
}

async function artistContext(e, el) {
  e.preventDefault();
  sessionStorage.setItem("menuOpen", "true");
  
  menu = document.getElementById("artist_context");
  menu.classList.add("context_active");
  positionMenu(e, menu)

  id = el.getAttribute("artist_details");

  // OPEN BUTTON
  document.getElementById("openbtnartist").onclick = () => {
    openArtist(id);
  };

  // Add / remove library

  if (cacheUserArtists.includes(id)) {
    // Remove LIBRARY
    document.getElementById("0addbtnartist").innerHTML = 'remove from library'
    document.getElementById("0addbtnartist").onclick = async () => {
      // CAll function directly
      removeArtistFromLibrary(id)
    };
  }
  else {
    // ADD LIBRARY
    document.getElementById("0addbtnartist").innerHTML = 'add to library'
    document.getElementById("0addbtnartist").onclick = async () => {
      // CAll function directly
      addArtistToLibrary(id, true)
    };
  }
  // ADD LIKED
  if (cacheLikedArtists.includes(id)) {
    // Already liked
    document.getElementById('1addbtnartist').onclick = async () => {
      unfavArtist(id)
    }
    document.getElementById('1addbtnartist').innerHTML = "Remove from Favorites"
  }
  else {
    document.getElementById('1addbtnartist').onclick = async () => {
      favArtist(id)
    }
    document.getElementById('1addbtnartist').innerHTML = "Add to Favorites"
  }


  // SONG INFO
  document.getElementById('infobtnartist').onclick = async () => {
    artistInfo(id)
  }

  // Copy link
  document.getElementById('copybtnartist').onclick = async () => {
    await copyText(`https://r0hin.github.io/eonsound/preview?type=artist&id=${id}`)
  }
}

async function playlistContext(e, el) {
  e.preventDefault();
  sessionStorage.setItem("menuOpen", "true");
  
  menu = document.getElementById("spotifyPlaylist_context");
  menu.classList.add("context_active");
  positionMenu(e, menu)

  id = el.getAttribute("playlist_details");

  // OPEN BUTTON
  document.getElementById("openbtnplaylist").onclick = () => {
    openPlaylist(id);
  };

  // ADD LIBRARY
  document.getElementById("0addbtnplaylist").onclick = async () => {
    // CAll function directly
    addSpotifyPlaylistToLibrary(id)
  };

  // PLAY INFO
  document.getElementById('infobtnplaylist').onclick = async () => {
    playlistInfo(id)
  }

  // Copy link
  document.getElementById('copybtnplaylist').onclick = async () => {
    await copyText(`https://r0hin.github.io/eonsound/preview?type=playlist&id=${id}`)
  }
}

function rightClickSelf(element) {
  window.setTimeout(() => {
    var e = element.ownerDocument.createEvent('MouseEvents');
    e.initMouseEvent('contextmenu', true, true,
       element.ownerDocument.defaultView, 0, 0, 0, element.getBoundingClientRect().x, element.getBoundingClientRect().y, false,
       false, false, false,2, null);
  
  
    !element.dispatchEvent(e);
  }, 150)

  // Source: stackoverflow questions:7914684
}

