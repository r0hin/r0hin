// lyrics.js
// Everything related to lyrics button and displaying lyrics via genius.

window.activeLyricsSong = undefined
loadingLyrics = false

async function showLyrics() {

  if (musicActive.none == 'none' || loadingLyrics == true) {
    return;
  }

  window.loadingLyrics = true
  window.setTimeout(() => {
    loadingLyrics = false
  }, 3500)

  if (activeLyricsSong == musicActive.name) {
    showDisplayLyrics()
    loadingLyrics = false
    return;
  }
  $('#lyricsspot').html(`<center>Gathering lyrics...</center>`)

  lyricsFetch = await fetch(`https://genius.p.rapidapi.com/search?q=${musicActive.artists} ${musicActive.name}`, {
	  "method": "GET",
	  "headers": {
		  "x-rapidapi-key": "f25776e273mshdeac69e2098339fp19fd7bjsne2f245613497",
		  "x-rapidapi-host": "genius.p.rapidapi.com"
	  }
  })

  lyricsResult = await lyricsFetch.json()

  lyricSongID = lyricsResult.response.hits[0].result.id

  finalLyricsFetch = await fetch("https://genius.p.rapidapi.com/songs/" + lyricSongID, {
	  "method": "GET",
	  "headers": {
		  "x-rapidapi-key": "f25776e273mshdeac69e2098339fp19fd7bjsne2f245613497",
		  "x-rapidapi-host": "genius.p.rapidapi.com"
	  }
  })

  finalLyricsResult = await finalLyricsFetch.json()
  console.log(finalLyricsResult);

  lyricsURL = finalLyricsResult.response.song.embed_content.split(`href='`).pop().split(`'>“`).shift()  

  var getLyrics = await firebase.functions().httpsCallable("getLyrics");
  downloadedLyics = await getLyrics({ lyricsURL: lyricsURL});

  activeLyricsSong = musicActive.name

  $('#lyricsspot').html(`<div class="lyricsFrame">${downloadedLyics.data.lyrics.replaceAll('\n', '<br>')}</div>`)
  loadingLyrics = false
}

