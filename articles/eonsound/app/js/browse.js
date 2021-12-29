// browse.js
// Browse tab functions to build random / currated music.

async function loadBrowse() {
  console.log('Loading browse');

  releases = await goFetch(`browse/new-releases?limit=10`)
  for (let i = 0; i < releases.albums.items.length; i++) {
    await album(releases.albums.items[i].id, releases.albums.items[i], releases.albums.items[i].id + 'browseItem', 'browse_new')
    $(`#${releases.albums.items[i].id}browseItem`).imagesLoaded(() => {
      $(`#${releases.albums.items[i].id}browseItem`).removeClass("hidden");
    })
  }

  playlists = await goFetch(`browse/featured-playlists?limit=10`)
  for (let i = 0; i < playlists.playlists.items.length; i++) {
    await playlist(playlists.playlists.items[i].id, playlists.playlists.items[i], 'playlist_browse_index_' + i, 'browse_play')
    $("#playlist_browse_index_" + i).imagesLoaded(() => {
      $("#playlist_browse_index_" + i).removeClass("hidden");
    });
  }

  categories = await goFetch(`browse/categories`)
  for (let i = 0; i < categories.categories.items.length; i++) {
    console.log('here');
    await category(categories.categories.items[i].id, categories.categories.items[i], categories.categories.items[i].id + 'categorybrowse', 'browse_categories')
    $(`#${categories.categories.items[i].id}categorybrowse`).imagesLoaded(() => {
      $(`#${categories.categories.items[i].id}categorybrowse`).removeClass("hidden");
    });
  }

  $('#browse_load').addClass('hidden')

}