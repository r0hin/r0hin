function preflight_browse() {
    var input = document.getElementById("searchBox").addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            search_music(document.getElementById("searchBox").value)
            document.getElementById("searchBox").value = ''
        }
    });
}

function searchsheet_on() {
    $('#searchsheet').removeClass('hidden')
}

function searchsheet_off() {

}

function getDurations(videos) {
    videosresponse = videos
    videos = videos.result.items
    results = []
    for (let i = 0; i < videos.length; i++) {
        gapi.client.youtube.videos.list({
            "part": [
                "snippet",
                "contentDetails",
                "statistics"
            ],
            "maxResults": 12,
            "id": [
                videos[i].id.videoId
            ]
            }).then(function(response) {
            results.push(response)
            if (results.length == videos.length) {
                // Done
                build_results(videosresponse, results)
                return;
            }
        })
    }
}

function build_results(response, videoinfo) {
    $('#searchResults').empty()
    for (let i = 0; i < response.result.items.length; i++) {
        const element = response.result.items[i];
        if (videoinfo[i].result.items[0] !== undefined) {
            a = document.createElement('div')
            a.classList.add('searchResultDiv')
            a.classList.add('card')
            a.id = element.id.videoId + 'boxel'
            // Playerel is second line
            playerel = `<nav class="navbar navv navbar-expand-lg navbar-dark">Date: ${videoinfo[i].result.items[0].contentDetails.duration}<ul class="navbar-nav mr-auto"></ul><button onclick="playSong('${element.id.videoId}', '${element.snippet.title}')" class="eon-text">Play</button></nav>`
            a.innerHTML = '<div class="card-body"><div class="imgcontainer"><img src="' + element.snippet.thumbnails.default.url + '" class="thumbnail"/></div><div class="cardcontent"><b class="cardtitle">' + element.snippet.title + '</b><br>' + playerel + '</div></div>'
            if (element.id.kind == "youtube#video" || element.id.kind == "youtube#searchListResponse") {
                document.getElementById('searchResults').appendChild(a)
                colortheifsearch(element.id.videoId)
                addWaves()
            }
        }
    }
}

function colortheifsearch(id) {

}

function search_music(term) {
    gapi.client.youtube.search.list({
        "part": [
          "snippet",
        ],
        "maxResults": 12,
        "q": term
      })
      .then(function(response) {
            getDurations(response)
      }, function(err) { 
          console.error("Execute error", err); 
      });
}

function playSong(id, title) {
    db.collection('music').doc('downloaded').get().then(function(doc) {
        if (doc.data().list.includes(title + '.mp3')) {
            // Song is downloaded. Get the download URL of the music file.
            url = `https://firebasestorage.googleapis.com/v0/b/swizzle-music.appspot.com/o/music%2Fout%2F${title}.mp3?alt=media`
            console.log(url);
        }
        else {
            var playSong = firebase.functions().httpsCallable('playSong');
            toggleloader()
            playSong({song: id}).then(function(result) {
              // Read result of the Cloud Function.
                var songURL = result;
                console.log(songURL);
                toggleloader()
                showcomplete()
            });
        }
    })
}