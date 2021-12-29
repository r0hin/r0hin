// display.js
// Display optimization scripts.

console.log("%cEonSound Dev Tools", "background: white; color: purple; font-size: x-large");
console.log('Playing around with unofficial JavaScript could get your account permanently deleted as a fail-safe.')
console.log('If you have any questions or need help with something, please contact us. Report errors below this line')
console.log("%c--------------------------", "background: black; color: white;");

// Masonry will happen when different sizes exist

// function masonryAlbums() {
//   allItems = $('#collectionAlbums').get(0).getElementsByClassName('album')
//   for (x = 0; x < allItems.length; x++) {
//     masonryAlbum(allItems[x]);
//   }
// }

// function masonryAlbum(item) {
//   grid = document.getElementById("collectionAlbums");
//   rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
//   rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
//   rowSpan = Math.ceil((item.querySelector('.content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
//   item.style.gridRowEnd = "span " + rowSpan;  
//   item.style.transition = "all 0.5s";   
// }

// function masonryArtists() {
//   allItems = $('#collectionArtists').get(0).getElementsByClassName('artist')
//   for (x = 0; x < allItems.length; x++) {
//     masonryArtist(allItems[x]);
//   }
// }

// function masonryArtist(item) {
//   grid = document.getElementById("collectionArtists");
//   rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
//   rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
//   rowSpan = Math.ceil((item.querySelector('.content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
//   item.style.gridRowEnd = "span " + rowSpan;  
//   item.style.transition = "all 0.5s";   
// }

function calculatePlayerWidths() {
  textWidth = $('#playing_track_details').width()
  
  // + 32 - padding
  // + 50 - album image
  songActionWidth = textWidth + 32 + 50
  // + 185 - song action width
  // + 24 - padding
  contentWidth = songActionWidth + 185 + 24
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
}

function showPlayer() {
  $('#InjectedPlayer').get(0).innerHTML = `
  #usercard {
    bottom: 86px !important;
    transition: all 0.5s !important;
  }
  #fakeusercard {
    bottom: 86px !important;
    transition: all 0.5s !important;
  }
  #loader {
    
  }
  `
  $('#player').removeClass('fadeOutDown')
  $('#player').addClass('fadeInUp')
  $('#player').removeClass('hidden')
  $('#fakeplayer').removeClass('hidden')
}

function hidePlayer() {
  $('#InjectedPlayer').get(0).innerHTML = ``
  $('#player').addClass('fadeOutDown')
  $('#player').removeClass('fadeInUp')
  $('#fakeplayer').addClass('hidden')
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

function colorThiefify(TYPE, imageID, containerID) {
  
  colors = colorThief.getColor(document.getElementById(imageID))
  
  switch (TYPE) {
    case 'userPlaylistPreview':
      document.getElementById(containerID).setAttribute('style', 'background-color: rgba(' + colors[0] + ',' + colors[1] + ',' + colors[2] + ', 0.6)')
      document.getElementById(containerID).setAttribute('style', 'background-image: linear-gradient(180deg, rgba(' + colors[0] + ',' + colors[1] + ',' + colors[2] + ', 0.6), rgba(' + colors[0] + ',' + colors[1] + ',' + colors[2] + ', 0.2)')
      break;
    case 'userPlaylistView':
      document.getElementById(containerID).setAttribute('style', 'background-image: linear-gradient(180deg, rgba(' + colors[0] + ',' + colors[1] + ',' + colors[2] + ', 1) -30%, var(--bg-primary) 100%)')  
      break;
    case 'albumPreview':
      document.getElementById(containerID).setAttribute('style', 'background-color: rgba(' + colors[0] + ',' + colors[1] + ',' + colors[2] + ', 0.9)')
      default:
    break;
  }
  
}

$('[data-toggle="tooltip"]').tooltip({ trigger : 'hover' });

function refreshTheme() {
  color = localStorage.getItem('es_theme_color') // Blue, etc
  light = localStorage.getItem('es_theme_light') // Light, etc

  if (light == 'auto') {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      light = 'dark'
    }
    else {
      light = 'light'
    }
  }

  // We've got color and light, now make changes:

  if (light == 'light') {
    injectLight()
    $('#navimg').attr('src', 'assets/text-only-dark.png')
    $('#navimg').removeClass('hidden')
    partone = '--bg-primary: #f9f9f9;  --bg-secondary: #fff; --bg-tertiary: #ededed; --bg-quaternary: #e7e7e7; --glass: rgba(255, 255, 255, 0.3);'
    partthree = '--content-primary: black; --content-secondary: #0f0f0f; --content-tertiary: #3b3b3b; --contrast-primary: white; --glow: rgba(125, 125, 125, 0.2);'
  }
  else if (light == 'dark') {
    injectDark()
    $('#navimg').attr('src', 'assets/text-only-light.png')
    $('#navimg').removeClass('hidden')
    partone = '--bg-primary: #181c3a; --bg-secondary: #090d28; --bg-tertiary: #1b263b; --bg-quaternary: #2F2E36; --glass: rgba(0, 0, 0, 0.3);'
    partthree = '--content-primary: white; --content-secondary: #c8c8c8; --content-tertiary: #5c5c5c; --contrast-primary: black; --glow: rgba(125, 125, 125, 0.2);'
  }

  else {
    switchAuto(true)
    return;
  }

  switch (color) {
    case 'blue':
      parttwo = '--eon-primary: rgb(51, 147, 226); --eon-secondary: #3495eb; '
      partfour = '--ripple-primary: rgba(51, 147, 226, 0.3); --ripple-secondary: rgba(51, 147, 226, 0.1); --button-primary: rgb(76, 110, 204); '
      break;
    case 'red':
      parttwo = '--eon-primary: rgb(226, 51, 51); --eon-secondary: #eb5334; '
      partfour = '--ripple-primary: rgba(226, 51, 51, 0.3); --ripple-secondary: rgba(226, 51, 51, 0.1); --button-primary: rgb(212, 57, 57); '
      break;
    case 'orange':
      parttwo = '--eon-primary: rgb(226, 86, 51); --eon-secondary: #ebb42a; '
      partfour = '--ripple-primary: rgba(226, 86, 51, 0.3); --ripple-secondary: rgba(226, 86, 51, 0.1); --button-primary: rgb(212, 100, 35); '
      break;
    case 'lime':
      parttwo = '--eon-primary: rgb(185, 226, 51); --eon-secondary: #2ee882; '
      partfour = '--ripple-primary: rgba(185, 226, 51, 0.3); --ripple-secondary: rgba(185, 226, 51, 0.1); --button-primary: rgb(91, 212, 35);'
      break;
    case 'aqua':
      parttwo = '--eon-primary: rgb(51, 226, 211); --eon-secondary: #2ee5e8; '
      partfour = '--ripple-primary: rgba(51, 226, 211, 0.3); --ripple-secondary: rgba(51, 226, 211, 0.1); --button-primary: rgb(19, 124, 194); '
      break;
    case 'purple':
      parttwo = '--eon-primary: rgb(98, 51, 226); --eon-secondary: #7a3de3; '
      partfour = '--ripple-primary: rgba(98, 51, 226, 0.3);  --ripple-secondary: rgba(98, 51, 226, 0.1); --button-primary: rgb(109, 19, 194); '
      break;
    case 'hotpink':
      parttwo = '--eon-primary: rgb(226, 51, 124); --eon-secondary: #c9208e; '
      partfour = '--ripple-primary: rgba(226, 51, 159, 0.3); --ripple-secondary: rgba(226, 51, 159, 0.1); --button-primary: rgb(216, 48, 138); '
      break;
    default:
      parttwo = '--eon-primary: rgb(226, 51, 124); --eon-secondary: #c9208e; '
      partfour = '--ripple-primary: rgba(226, 51, 159, 0.3); --ripple-secondary: rgba(226, 51, 159, 0.1); --button-primary: rgb(216, 48, 138); '
      break;
  }
  
  $('#appTheme').html(':root {' + partone + parttwo + partthree + partfour + '}')
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  refreshTheme()
});

function switchDark() {
  localStorage.setItem('es_theme_light', 'dark')
  refreshTheme()
}

function switchLight() {
  localStorage.setItem('es_theme_light', 'light')
  refreshTheme()
}

function checkTutorialSysTeme() {
  if (!cacheUserTutorial.includes('autotheme')) {
    // Show tutorial
    showTutorial('autotheme')
    $('#tutorial').html(`
      <div class="card">
        <div class="card-body">
          <h4>Themes</h4>
          <p>Change EonSound's color scheme by selecting a theme from your account page. If your theme is auto, it will update depending on your OS theme.</p>
          <br><br>
          <button onclick="hideTutorial()" class="btn-contained-primary">Continue</button>
          <br>
          <small>This message will only be shown once.</small>
        </div>
      </div>
    `)
    initButtonsContained()
  } 
}

async function switchAuto(skipMSG) {
  localStorage.setItem('es_theme_light', 'auto')
  refreshTheme()
}

function switchColor(color) {
  localStorage.setItem('es_theme_color', color)  
  refreshTheme()
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

function genresToString(genres) {

  if (!genres || !genres.length) {
    return "No Genres."
  }

  if (genres.length == 1) {
    return genres[0]
  }
  
  snippet = ''

  for (let i = 0; i < genres.length; i++) {
    const genre = genres[i];
    if (i == genres.length - 1) {
      // Last item
      snippet = snippet + 'and ' + genre
    }
    else {
      // Regular item
      snippet = snippet + genre + ', '
    }
  }

  return snippet
}


function nFormatter(num, digits) {
  var si = [
    { value: 1, symbol: "" },
    { value: 1E3, symbol: "k" },
    { value: 1E6, symbol: "M" },
    { value: 1E9, symbol: "G" },
    { value: 1E12, symbol: "T" },
    { value: 1E15, symbol: "P" },
    { value: 1E18, symbol: "E" }
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

function reBuildAlbumQueue(id) {
  // Rebuild potential queue!
  dataToBuild = []
  $(`#${id}AlbumSongslib`).children().each( (index, element) => {
    // Push music data of track_details id attirbute of element

    // Sync track_album_index with onclick event
    element.onclick = () => {
      playSongsAtIndex(index, id + 'lib')
    }

    // FIND THE DATA
    ind = cacheUserTracks.indexOf(element.getAttribute('track_details'))
    dataToBuild.push(cacheUserTracksData[ind])
  });
  queueData[id + 'lib'] = dataToBuild
}

function reOrderAlbumLibrary(id) {
  console.log('Sorting album based off track indexes.');

  var $wrapper = $(`#${id}AlbumSongslib`)
  $wrapper.find('.song').sort(function(a, b) {
    return +a.getAttribute('track_album_index') - +b.getAttribute('track_album_index')
  }).appendTo($wrapper);

  reBuildAlbumQueue(id)
}

(function($){
  $.fn.shuffle = function() {
    return this.each(function(){
      var items = $(this).children();
      return (items.length) 
        ? $(this).html($.shuffle(items)) 
        : this;
    });
  }
	
  $.shuffle = function(arr) {
    for(
      var j, x, i = arr.length; i; 
      j = parseInt(Math.random() * i), 
      x = arr[--i], arr[i] = arr[j], arr[j] = x
    );
    return arr;
  }	
})(jQuery);

function sortTracks(type) {
  switch (type) {
    case 'default':
      
      console.log('Sorting tracks by default');
      $('#favTracks').empty()
      $('#collectionTracks').empty()
      loadLibraryTracks()
      break;
    case 'abc':
      console.log('Sorting tracks alphabetically');
      $('#collectionTracks').html($('#collectionTracks .song').sort((a, b) => {
        if($(a).find('b').html().toLowerCase() < $(b).find('b').html().toLowerCase()) { return -1; }
        if($(a).find('b').html().toLowerCase() > $(b).find('b').html().toLowerCase()) { return 1; }
        return 0;
      }))
      $('#favTracks').html($('#favTracks .song').sort((a, b) => {
        if($(a).find('b').html().toLowerCase() < $(b).find('b').html().toLowerCase()) { return -1; }
        if($(a).find('b').html().toLowerCase() > $(b).find('b').html().toLowerCase()) { return 1; }
        return 0;
      }))
      break;
    case 'random':
      console.log('Randomizing track order');
      $('#collectionTracks').shuffle();
      $('#favTracks').shuffle();
      break;
    case 'reverse':
      console.log('Reversing tracks');
      container = $('#collectionTracks')
      container.children().each(function(i,li){container.prepend(li)})

      container = $('#favTracks')
      container.children().each(function(i,li){container.prepend(li)})
      break;
    default:
      break;
  }
}

function newMediaInfo(key, val) {
  u = document.createElement('li')
  u.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-center')
  u.innerHTML =  `${key} <span>${val}</span>`
  $('#mediainfolist').get(0).appendChild(u)
}

function showDisplayLyrics() {
  $('#lyrics').addClass('lyricsActive')
  $('#showLyrics').html(`<i class='bx bx-chevron-right'></i>`)
  $('#showLyrics').get(0).setAttribute('onclick', 'hideDisplayLyrics()')
  showLyrics()
}

function hideDisplayLyrics() {
  $('#lyrics').removeClass('lyricsActive')
  $('#showLyrics').html(`<i class='bx bx-message-detail'></i>`)
  $('#showLyrics').get(0).setAttribute('onclick', 'showDisplayLyrics()')
}

function toggleAddFriend() {
  $('#newFriendDiv').toggleClass('hidden')
}

function toggleFriendTabe(tab) {
  $('.frtab').addClass('hidden')
  $(`#friend-${tab}`).removeClass('hidden')
}

function dmstringify(u1, u2) {
  alphabeticalized = [];
  alphabeticalized.push(u1);
  alphabeticalized.push(u2);
  alphabeticalized.sort(function (a, b) {
    var textA = a.toUpperCase();
    var textB = b.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  return alphabeticalized[0].toString() + alphabeticalized[1].toString();
}

function showOutdated() {
  $('#updateNotify').removeClass('hidden')
}

function hideUpdate() {
  $("#updateNotify").removeClass("fadeIn");
  $("#updateNotify").addClass("fadeOut");
  window.setTimeout(() => {
    $("#updateNotify").addClass("hidden");
  }, 800);
}

function calcTime(offset) {
  var d = new Date();
  var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  var nd = new Date(utc + (3600000*offset));
  return `${nd.toLocaleString()}`
}

async function showTutorial(tutorialID) {
  $('#tutorial').removeClass("hidden")
  $('#tutorial').removeClass("fadeOutDown")
  $('#tutorial').addClass("fadeInUp")

  cacheUserTutorial.push(tutorialID)
  await db.collection('users').doc(user.uid).update({
    tutorial: firebase.firestore.FieldValue.arrayUnion(tutorialID)
  })
}

function hideTutorial() {
  $('#tutorial').removeClass("fadeInUp")
  $('#tutorial').addClass("fadeOutDown")
  window.setTimeout(() => {
    $('#tutorial').addClass("hidden")
  }, 450)
}