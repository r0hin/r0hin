const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const spawn = require("child-process-promise").spawn;
const request = require("request");
const fs = require("fs");
const path = require("path");
const os = require("os");
const mkdirp = require("mkdirp");
const tmpdir = os.tmpdir();
const fetch = require("node-fetch");
const cheerio = require('cheerio');
const scrapeYt = require("scrape-yt");

const JPEG_EXTENSION = ".png";

exports.albumPhoto = functions.https.onCall(async (data, context) => {
  const db = admin.firestore();
  const uid = context.auth.uid;
  const id = data.id;

  // Upload Photo
  return request(
    "https://firebasestorage.googleapis.com/v0/b/eonsound.appspot.com/o/app%2Fempty_album.png?alt=media"
  )
    .pipe(fs.createWriteStream(path.join(tmpdir, "default.png")))
    .on("close", async () => {
      const bucket = admin.storage().bucket();

      await bucket.upload(path.join(tmpdir, "default.png"), {
        destination: `covers/${id}.png`,
      });

      await db.collection("users").doc(uid).collection("library").doc(id).update({
        cover: "https://firebasestorage.googleapis.com/v0/b/eonsound.appspot.com/o/covers%2F" + id + ".png?alt=media",
      });

      fs.unlink(path.join(tmpdir, "default.png"), () => {
        return { data: true };
      });
    });
});

exports.createAccount = functions.https.onCall(async (data, context) => {
  const uid = context.auth.uid;
  const name = data.displayname;
  const username = data.username;
  const db = admin.firestore();

  function hasWhiteSpace(s) {
    return /\s/g.test(s);
  }

  // Username verification
  if (hasWhiteSpace(username) || username == "") {
    return { data: false };
  }

  doc = await db.collection("app").doc("details").get();

  if (doc.data().usernames.includes(username)) {
    return { data: false };
  }

  // Approved, create account.

  await db
    .collection("app")
    .doc("details")
    .update({
      usernames: admin.firestore.FieldValue.arrayUnion(data.username),
      map: admin.firestore.FieldValue.arrayUnion(uid),
    });


  await db
    .collection("users")
    .doc(uid)
    .set(
      {
        username: username,
        name: name,
        enabled: true,
        type: "public",
        emailchange: admin.firestore.FieldValue.serverTimestamp(),
        passchange: admin.firestore.FieldValue.serverTimestamp(),
        created: admin.firestore.FieldValue.serverTimestamp(),
        uid: uid,
        url:
          "https://firebasestorage.googleapis.com/v0/b/eonsound.appspot.com/o/logos%2F" +
          uid +
          ".png?alt=media",
      },
      { merge: true }
    );

  // Upload Profile Photo

  return request(
    "https://firebasestorage.googleapis.com/v0/b/eonsound.appspot.com/o/app%2Fdefault.png?alt=media"
  )
    .pipe(fs.createWriteStream(path.join(tmpdir, "default.png")))
    .on("close", async () => {
      const bucket = admin.storage().bucket();

      await bucket.upload(path.join(tmpdir, "default.png"), {
        destination: `logos/${uid}.png`,
      });

      fs.unlink(path.join(tmpdir, "default.png"), () => {
        return { data: true };
      });
    });
});

exports.requestSong = functions.runWith({timeoutSeconds: 300,memory: "2GB"}).https.onCall(async (data, context) => {
  // Check the storage for the song
  var db = admin.firestore();
  doc = await db.collection("music").doc(data.trackID).get();

  if (doc.exists && doc.data().downloaded) {
    return `https://firebasestorage.googleapis.com/v0/b/eonsound.appspot.com/o/music%2F${data.trackID}.mp3?alt=media`;
  }

  res = await fetch("https://accounts.spotify.com/api/token", {
    method: "post",
    body: "grant_type=client_credentials",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer.from(
          "b2b0e41d0a3e4464b12eba666a1de36d" +
            ":" +
            "cc01c7911b4c41689b971034ff973587"
        ).toString("base64"),
    },
  });

  body = await res.json();
  token = body.access_token;

  res = await fetch("https://api.spotify.com/v1/tracks/" + data.trackID, {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  body = await res.json();
  name = body.name.replace(/([^\w\s+*:;,.()/\\]+)/gi, '');
  artist = body.artists[0].name;

  res = await fetch(`http://eonsound.herokuapp.com/search?artist=${artist}&name=${name}`)
  body = await res.json()
  videoID = body.song
  
  return new Promise(async (resolve, reject) => {

    res = await fetch(`https://eonsound.herokuapp.com/redefined?potpot=${videoID}&skeeya=${data.trackID}`)
    // Don even do any downloading here
    body = await res.json()
    resolve(body)

  });
});

exports.convertPhotos = functions.storage.object().onFinalize(async (object) => {
const filePath = object.name;
const baseFileName = path.basename(filePath, path.extname(filePath));
const fileDir = path.dirname(filePath);
const JPEGFilePath = path.normalize(
  path.format({ dir: fileDir, name: baseFileName, ext: JPEG_EXTENSION })
);
const tempLocalFile = path.join(os.tmpdir(), filePath);
const tempLocalDir = path.dirname(tempLocalFile);
const tempLocalJPEGFile = path.join(os.tmpdir(), JPEGFilePath);

if (filePath.includes("logos/") || filePath.includes("covers/")) {
  if (object.contentType.startsWith("image/png")) {
    console.log("Already a PNG.");
    return null;
  }

  const bucket = admin.storage().bucket(object.bucket);

  await mkdirp(tempLocalDir);

  await bucket.file(filePath).download({ destination: tempLocalFile });

  await spawn("convert", [tempLocalFile, tempLocalJPEGFile]);

  await bucket.upload(tempLocalJPEGFile, { destination: JPEGFilePath });

  fs.unlinkSync(tempLocalJPEGFile);
  fs.unlinkSync(tempLocalFile);
  functions.logger.log("Converted Image");
}
});

exports.getLyrics = functions.runWith({timeoutSeconds: 300,memory: "2GB"}).https.onCall(async (data, context) => {
  res = await fetch(data.lyricsURL, {
    method: 'GET',
  })
  response = await res.text()

  const $ = cheerio.load(response)

  const lyrics = $('.lyrics').text()

  return { lyrics: lyrics };

})

exports.acceptFriend = functions.https.onCall(async (data, context) => {
  const useruid = context.auth.uid;
  const targetuid = data.uid;
  const myurl = data.myurl;
  const myusername = data.myusername;
  const db = admin.firestore();

  // Approved, create account.

  await db.collection("users").doc(targetuid).update({
    requested: admin.firestore.FieldValue.arrayRemove({
      id: useruid,
      p: myurl,
      u: myusername
    }),
    friends: admin.firestore.FieldValue.arrayUnion({
      id: useruid,
      p: myurl,
      u: myusername
    })
  });

  return {data: 'Successo Expresso'}

})

exports.denyFriend = functions.https.onCall(async (data, context) => {
  const useruid = context.auth.uid;
  const targetuid = data.uid;
  const url = data.url;
  const username = data.username;
  const db = admin.firestore();

  await db.collection("users").doc(targetuid).update({
    requested: admin.firestore.FieldValue.arrayRemove({
      id: useruid,
      p: url,
      u: username
    }),
  });

  return {data: 'Successo Expresso'}

})

exports.removeFriend = functions.https.onCall(async (data, context) => {
  const targetuid = data.uid;
  const useruid = context.auth.uid;
  const url = data.url;
  const username = data.username;
  const db = admin.firestore();


  // Remove each other from unread listeners to prevent infinite unread notification
  await db.collection('directlisteners').doc(targetuid).update({
    unreadTOTAL: admin.firestore.FieldValue.arrayRemove(useruid)
  })

  await db.collection('directlisteners').doc(useruid).update({
    unreadTOTAL: admin.firestore.FieldValue.arrayRemove(targetuid)
  })

  await db.collection("users").doc(targetuid).update({
    friends: admin.firestore.FieldValue.arrayRemove({
      id: useruid,
      p: url,
      u: username
    }),
  });

  return {data: 'Successo Expresso'}

})

