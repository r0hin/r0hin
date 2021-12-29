// Tabs.js
// Manages the general layout of the app and properly loading sections as the user requires it.
sessionStorage.setItem('CURRENTAB', '')

sessionStorage.setItem('first-time-playlists', 'true')
sessionStorage.setItem('first-time-artists', 'true')
sessionStorage.setItem('first-time-albums', 'true')
sessionStorage.setItem('first-time-songs', 'true')
sessionStorage.setItem('first-time-browse', 'true')
sessionStorage.setItem('first-time-search', 'true')
sessionStorage.setItem('first-time-activity', 'true')
sessionStorage.setItem('first-time-friends', 'true')

// interval = window.setInterval(() => {
//   if (typeof(user) !== "undefined") {
//     // Do something once user is loaded
//     window.clearInterval(interval)
//   }
// }, 200)

function tabe(tab) {
  sessionStorage.setItem('CURRENTAB', tab)
  $('.tab-btn').removeClass('tab-btn-active')
  $(`#${tab}-tab`).addClass('tab-btn-active')
  $('.tab').addClass("hidden")
  $(`#${tab}`).removeClass("hidden")

  hideCurrentView()
  hideDisplayLyrics()
  $('.friendView').addClass('hidden')

  if (sessionStorage.getItem('first-time-' + tab) == 'true') {
    sessionStorage.setItem('first-time-' + tab, 'false')

    switch (tab) {
      case 'playlists':
        break;
      case 'albums':
        loadLibraryAlbums()
        break;
      case 'artists':
        loadLibraryArtists()
        break;
      case 'songs':
        loadLibraryTracks()

        try {
          if (!cacheUserTutorial.includes('songs')) {
            // Show tutorial
            showTutorial('songs')
            $('#tutorial').html(`
              <div class="card">
                <div class="card-body">
                  <h4>Library</h4>
                  <p>Welcome to your library. This tab shows all the songs you have in your library.</p>
                  <p>You can add songs to your library by updating playlists, adding albums to your library or adding them individually.</p>
                  <br><br>
                  <button onclick="hideTutorial()" class="btn-contained-primary">Continue</button>
                  <br>
                  <small>This message will only be shown once.</small>
                </div>
              </div>
            `)
            initButtonsContained()
          } 
        } catch (error) { }
        break;
      case 'browse':
        interval = window.setInterval(() => { if (typeof(spotifyCode) !== "undefined") {
          loadBrowse()
          window.clearInterval(interval)
        }}, 200)
        break;
      case 'activity':
        loadActivity()
        break;
      case 'friends':
        loadFriends()

        // Tutorial friends
        try {
          if (!cacheUserTutorial.includes('friends')) {
            // Show tutorial
            showTutorial('friends')
            $('#tutorial').html(`
              <div class="card">
                <div class="card-body">
                  <h4>Friends</h4>
                  <p>Interact with other users by using the friends system. With this suite of features, you're able to message them, view their playlists, see what song they're listening to and much more.</p>
                  <p>Add your friends by clicking the plus button and then typing in their username.</p>
                  <br><br>
                  <button onclick="hideTutorial()" class="btn-contained-primary">Continue</button>
                  <br>
                  <small>This message will only be shown once.</small>
                </div>
              </div>
            `)
            initButtonsContained()
          }
        } catch (error) { }
    
        break;
      default:
        break;
    }
  }
}