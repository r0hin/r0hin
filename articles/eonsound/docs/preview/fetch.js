// fetch.js 
// Code readability functions for fetching spotify data.

async function goFetch(url) {
  return new Promise(async (resolve, reject) => {

    const result = await fetch(`https://api.spotify.com/v1/${url}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${spotifyCode}`,
      },
    });

    const data = await result.json();

    resolve(data)
    return data

  })  
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