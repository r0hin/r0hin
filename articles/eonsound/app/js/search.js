// search.js
// Includes code for searching for songs and managing the presentation of it.

document.getElementById("searchbox").addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    performSearch(document.getElementById("searchbox").value);
  }
});

async function performSearch(q) {
  $('#searchbox').val('')
  data = await goFetch(`search?q=${q}&type=album,artist,playlist,track&limit=10`)
  buildSearch(data);
}

async function buildSearch(data) {
  // Data is an object containing fields: albums, artists, playlists, tracks
  $("#search_albums").empty();
  $("#search_artists").empty();
  $("#search_playlists").empty();
  $("#search_tracks").empty();

  if (!data.albums.items.length) { $('#albumSearchText').addClass('hidden') } else { $('#albumSearchText').removeClass('hidden') }
  if (!data.artists.items.length) { $('#artistSearchText').addClass('hidden') } else { $('#artistSearchText').removeClass('hidden') }
  if (!data.playlists.items.length) { $('#playlistSearchText').addClass('hidden') } else { $('#playlistSearchText').removeClass('hidden') }
  if (!data.tracks.items.length) { $('#trackSearchText').addClass('hidden') } else { $('#trackSearchText').removeClass('hidden') }

  for (let i = 0; i < data.albums.items.length; i++) {
    // For each album
    await album(data.albums.items[i].id, data.albums.items[i], 'album_search_index_' + i, 'search_albums')
    
    $("#album_search_index_" + i).imagesLoaded(() => {
      $("#album_search_index_" + i).removeClass("hidden");
    })
  }

  for (let i = 0; i < data.artists.items.length; i++) {
    // For each artist
    await artist(data.artists.items[i].id, data.artists.items[i], 'artist_search_index_' + i, 'search_artists')
    
    $("#artist_search_index_" + i).imagesLoaded(() => {
      $("#artist_search_index_" + i).removeClass("hidden");
    });
  }

  for (let i = 0; i < data.tracks.items.length; i++) {
    // For each episode
    await searchTrack(data.tracks.items[i].id, data.tracks.items[i], 'track_search_index_' + i, 'search_tracks')
    
    $("#track_search_index_" + i).imagesLoaded(() => {
      $("#track_search_index_" + i).removeClass("hidden");
    });
  }

  for (let i = 0; i < data.playlists.items.length; i++) {
    // For each album
    await playlist(data.playlists.items[i].id, data.playlists.items[i], 'playlist_search_index_' + i, 'search_playlists')
    
    $("#playlist_search_index_" + i).imagesLoaded(() => {
      $("#playlist_search_index_" + i).removeClass("hidden");
    });
  }

  addWaves();
}

