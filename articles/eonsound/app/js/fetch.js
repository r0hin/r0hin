// fetch.js 
// Code readability functions for fetching spotify fetchData.

async function goFetch(url) {
  return new Promise(async (resolve, reject) => {

    fetchResult = await fetch(`https://api.spotify.com/v1/${url}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${spotifyCode}`,
      },
    });

    fetchData = await fetchResult.json();

    if (fetchData.error) {
      console.log(fetchData.error);
      refreshCode()

      result = await fetch(`https://api.spotify.com/v1/${url}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${spotifyCode}`,
        },
      });
  
      fetchData = await result.json();

      if (fetchData.error) {
        Snackbar.show({pos: 'top-center',text: "Error occured. Please try again later."})
        refreshCode()
        reject(fetchData)
        return;
      }

      refreshCode()
      resolve(fetchData)
      return fetchData
    }

    refreshCode()
    resolve(fetchData)
    return fetchData

  })  
}

async function refreshCode() {
  result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic YjJiMGU0MWQwYTNlNDQ2NGIxMmViYTY2NmExZGUzNmQ6Y2MwMWM3OTExYjRjNDE2ODliOTcxMDM0ZmY5NzM1ODc=",
    },
    body: `grant_type=refresh_token&refresh_token=${spotifyToken}`,
  });

  fetchData = await result.json();
  window.spotifyCode = fetchData.access_token;
}

async function initSpotifyCode() {
  // Check if access token stored in database is valid

  doc = await db.collection("users").doc(user.uid).collection("access").doc("spotify").get();

  if (!doc.exists) {
    window.location.replace("auth.html");
  }

  // data.access is the refresh token, so exchange it for an actual token
  token = doc.data().access;
  window.spotifyToken = token;

  // Exchange refresh token for a new token
  try {
    const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic YjJiMGU0MWQwYTNlNDQ2NGIxMmViYTY2NmExZGUzNmQ6Y2MwMWM3OTExYjRjNDE2ODliOTcxMDM0ZmY5NzM1ODc=",
    },
    body: `grant_type=refresh_token&refresh_token=${token}`,
  });
  
  if (result.status >= 400 && result.status < 600) {
    throw new Error("Bad response from server");
  }

  const data = await result.json();

  window.spotifyCode = data.access_token;

  } catch (error) {
    Snackbar.show({pos: 'top-center',text: "If your password was changed, please reauthenticate <a href='auth.html'>here</a>."})
  }
}