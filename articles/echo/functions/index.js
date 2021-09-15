const functions = require('firebase-functions');
const admin = require('firebase-admin');
const getJSON = require('get-json');
const cors = require('cors')({origin: true});

const fetch = require('node-fetch');
const mkdirp = require('mkdirp');
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const tmpdir = os.tmpdir();
const fs = require('fs')
const request = require('request');
const keys = require('./keys.js')
const { linkPreview } = require(`link-preview-node`);
const ColorThief = require('colorthief');


admin.initializeApp();

const JPEG_EXTENSION = '.png';

exports.aggregatePosts = functions.firestore.document('new_posts/{postId}').onCreate(async (change, context) => {
  
  const db = admin.firestore();
  const postId = context.params.postId;
  
  // While at it, get color from image and ahahahahha save it (IF PHOTO NOT TEXT)
  if (change.data().file_url !== 'echo-home-text_post') {
    colors = await ColorThief.getColor(change.data().file_url)
    color = `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`
    await db.collection('new_posts').doc(postId).update({
      colorMap: color
    })
  }

  // Copy to own ID
  await db.collection('timelines').doc(change.data().uid).collection('posts').doc(change.id).set({
    uid: change.data().uid,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    id: change.id
  })
  
  querySnapshot = await db.collection('follow').doc(change.data().uid).collection('followers').where("status", '==', true).get()
  
  for (let i = 0; i < querySnapshot.docs.length; i++) {
    await db.collection('timelines').doc(querySnapshot.docs[i].data().uid).collection('posts').doc(change.id).set({
      uid: change.data().uid,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      id: change.id
    })
  }
})

exports.createAccount = functions.https.onCall(async (data, context) => {
  
  const uid = context.auth.uid;
  const name = data.displayname;
  const username = data.username
  const db = admin.firestore()
  
  function hasWhiteSpace(s) {
    return /\s/g.test(s);
  }
  
  // Username verification
  if (hasWhiteSpace(username) || username == "") {
    return {data: false};
  }
  
  doc = await db.collection('app').doc('details').get()
  
  if (doc.data().usernames.includes(username)) {
    return {data: false};
  }
  
  // Approved, create account.
  
  await db.collection('app').doc('details').update({
    usernames: admin.firestore.FieldValue.arrayUnion(data.username),
    map: admin.firestore.FieldValue.arrayUnion(uid)
  })
  
  await db.collection('follow').doc(uid).collection('followers').doc('a').set({
    status: false,
  })
  
  await db.collection('follow').doc(uid).collection('following').doc('a').set({
    status: false,
  })
  await db.collection('follow').doc(uid).collection('requested').doc('a').set({
    status: false,
  })
  await db.collection('follow').doc(uid).collection('requesting').doc('a').set({
    status: false,
  })
  await db.collection('follow').doc(uid).collection('direct').doc('a').set({
    status: false,
  })
  
  await db.collection('follow').doc(uid).set({
    following: 0,
    followers: 0,
    requested: 0,
    requesting: 0,
  })
  
  await db.collection('timelines').doc(uid).collection('posts').doc('a').set({
    status: false,
  })
  
  await db.collection('users').doc(uid).set({
    username: username,
    name: name,
    enabled: true,
    type: 'public',
    emailchange: admin.firestore.FieldValue.serverTimestamp(),
    passchange: admin.firestore.FieldValue.serverTimestamp(),
    created: admin.firestore.FieldValue.serverTimestamp(),
    repcheck: admin.firestore.FieldValue.serverTimestamp(),
    url: 'https://firebasestorage.googleapis.com/v0/b/eongram-87169.appspot.com/o/logos%2F' + uid + '.png?alt=media',
    rep: 0,
    direct_active: [],
    direct_activity: admin.firestore.FieldValue.serverTimestamp(),
  }, {merge: true})
  
  // Upload Profile Photo
  
  return request("https://firebasestorage.googleapis.com/v0/b/eongram-87169.appspot.com/o/app%2Flogo.png?alt=media").pipe(fs.createWriteStream(path.join(tmpdir,'default.png'))).on('close', async () => {
  const bucket = admin.storage().bucket();
  
  await bucket.upload(path.join(tmpdir,'default.png'), {
    destination: `logos/${uid}.png`,
  });
  
  fs.unlink(path.join(tmpdir,'default.png'), () => {
    return {data: true};
  })
});

});

exports.profilePhoto = functions.storage.object().onFinalize(async (object) => {
  const filePath = object.name;
  const baseFileName = path.basename(filePath, path.extname(filePath));
  const fileDir = path.dirname(filePath);
  const JPEGFilePath = path.normalize(path.format({dir: fileDir, name: baseFileName, ext: JPEG_EXTENSION}));
  const tempLocalFile = path.join(os.tmpdir(), filePath);
  const tempLocalDir = path.dirname(tempLocalFile);
  const tempLocalJPEGFile = path.join(os.tmpdir(), JPEGFilePath);
  
  if (filePath.includes('logos/')) {
    if (object.contentType.startsWith('image/png')) {
      return null;
    }
    
    const bucket = admin.storage().bucket(object.bucket);
    
    await mkdirp(tempLocalDir);
    
    await bucket.file(filePath).download({destination: tempLocalFile});
    
    await spawn('convert', [tempLocalFile, tempLocalJPEGFile]);
    
    await bucket.upload(tempLocalJPEGFile, {destination: JPEGFilePath});
    
    await bucket.upload(tempLocalJPEGFile, {destination: JPEGFilePath});
    
    fs.unlinkSync(tempLocalJPEGFile);
    fs.unlinkSync(tempLocalFile);;
    functions.logger.log("Converted Image")
  }
})

exports.aggregateLikes = functions.firestore.document('new_posts/{postId}/likes/{likeId}').onWrite(async (change, context) => {
  const likeId = context.params.likeId;
  const postId = context.params.postId;
  const db = admin.firestore()
  
  const likeDoc = change.after
  
  if (likeId == 'a') {
    return;
  }
  
  if (likeDoc.data().status) {
    // increment likes
    return await db.collection('new_posts').doc(postId).update({
      likes: admin.firestore.FieldValue.increment(1)
    })
  }
  
  else {
    return await db.collection('new_posts').doc(postId).update({
      likes: admin.firestore.FieldValue.increment(-1)
    })
  }
  
})

exports.aggregateCommentsLikes = functions.firestore.document('new_posts/{postId}/comments/{commentId}/likes/{likeId}').onWrite(async (change, context) => {
  
  const postId = context.params.postId;
  const commentId = context.params.commentId;
  const likeId = context.params.likeId;
  const db = admin.firestore()
  
  if (commentId == 'a' || likeId == 'a') {
    return;
  }
  
  // Status
  if (change.after.data().status) {
    // Liked
    if (change.after.data().bookStatus && !change.before.data().status) {
      // Added bookmark only. logic pending
    }
    else {
      // Added like only
      // increment likes
      return await db.collection('new_posts').doc(postId).collection('comments').doc(commentId).update({
        likes: admin.firestore.FieldValue.increment(1),
      })
    }
  }
  else {
    if (change.after.data().bookStatus && !change.before.data().status) {
      // Removed bookmark only. logic pending
    }
    else {
      // Removed like only
      // decrement likes
      return await db.collection('new_posts').doc(postId).collection('comments').doc(commentId).update({
        likes: admin.firestore.FieldValue.increment(-1),
      })
    }
    
  }
})

exports.aggregateCommentsReplies = functions.firestore.document('new_posts/{postId}/comments/{commentId}/replies/{replyId}').onCreate(async (change, context) => {
  
  const postId = context.params.postId;
  const commentId = context.params.commentId;
  const replyId = context.params.replyId;
  const db = admin.firestore()
  
  if (replyId == 'a') {
    return;
  }
  
  // get latest reply and increment reply count
  return await db.collection('new_posts').doc(postId).collection('comments').doc(commentId).update({
    replies: admin.firestore.FieldValue.increment(1),
    latest_reply_content: change.data().content,
    latest_reply_photo: change.data().photo_url,
    latest_reply_name: change.data().name,
    latest_reply_uid: change.data().uid,
  })
  
})

exports.aggregateComments = functions.firestore.document('new_posts/{postId}/comments/{commentId}').onCreate(async (change, context) => {
  
  const postId = context.params.postId;
  const commentId = context.params.commentId;
  const db = admin.firestore()
  
  if (commentId == 'a') {
    return;
  }
  
  // increment comments count
  return await db.collection('new_posts').doc(postId).update({
    comments: admin.firestore.FieldValue.increment(1),
    latest_comment_content: change.data().content,
    latest_comment_photo: change.data().photo_url,
    latest_comment_name: change.data().name,
    latest_comment_uid: change.data().uid,
  })
  
})

exports.aggregateCommentsDelete = functions.firestore.document('new_posts/{postId}/comments/{commentId}').onDelete(async (change, context) => {
  
  const postId = context.params.postId;
  const commentId = context.params.commentId;
  const db = admin.firestore()
  
  if (commentId == 'a') {
    return;
  }
  
  // decrement comments count
  return await db.collection('new_posts').doc(postId).update({
    comments: admin.firestore.FieldValue.increment(-1),
    latest_comment_content: null,
    latest_comment_photo: null,
    latest_comment_name: null,
    latest_comment_uid: null,
  })
  
})

exports.aggregateFollowers = functions.firestore.document('follow/{followId}/followers/{userId}').onWrite(async (change, context) => {
  
  db = admin.firestore()
  const followId = context.params.followId
  const userId = context.params.userId
  
  // Get all followers and DO NOT aggregate
  // IF IT WAS QUERY.size it could get thousands of reads per action
  
  const doc = change.after
  
  if (userId == "a") {
    return;
  }
  
  if (doc.data().status) {
    // Following
    return db.collection('follow').doc(followId).set({
      followers: admin.firestore.FieldValue.increment(1)
    }, {merge: true})
    
  }
  else {
    return db.collection('follow').doc(followId).set({
      followers: admin.firestore.FieldValue.increment(-1)
    }, {merge: true})
  }
})

exports.aggregateFollowing = functions.firestore.document('follow/{followId}/following/{userId}').onWrite(async (change, context) => {
  
  db = admin.firestore()
  const followId = context.params.followId
  const userId = context.params.userId
  
  const doc = change.after
  
  if (userId == "a") {
    return;
  }
  
  if (doc.data().status) {
    // Following
    // On start following, copy latest 16 post of folowee to follower timeline
    query = await db.collection('new_posts')
    .where('status', '==', true)
    .where('uid', '==', userId)
    .limit(16)
    .get()
    for (let i = 0; i < query.docs.length; i++) {
      await db.collection('timelines').doc(followId).collection('posts').doc(query.docs[i].id).set({
        uid: query.docs[i].data().uid,
        timestamp:  query.docs[i].data().timestamp,
        id: query.docs[i].id,
      })
    }
    
    return db.collection('follow').doc(followId).set({
      following: admin.firestore.FieldValue.increment(1)
    }, {merge: true})
  }
  else {
    
    // Remove all instances of userId of followerId's feed
    query = await db.collection('timelines').doc(followId).collection('posts').where('uid', '==', userId).get()
    for (let i = 0; i < query.docs.length; i++) {
      await db.collection('timelines').doc(followId).collection('posts').doc(query.docs[i].id).delete()
    }
    
    return db.collection('follow').doc(followId).set({
      following: admin.firestore.FieldValue.increment(-1)
    }, {merge: true})
  }
})

exports.aggregateRequesters = functions.firestore.document('follow/{followId}/requested/{userId}').onWrite(async (change, context) => {
  
  db = admin.firestore()
  const followId = context.params.followId
  const userId = context.params.userId
  
  const doc = change.after
  
  if (userId == "a") {
    return;
  }
  
  if (doc.data().status) {
    // Requested. On start requested
    return db.collection('follow').doc(followId).set({
      requested: admin.firestore.FieldValue.increment(1)
    }, {merge: true})
  }
  else {
    
    return db.collection('follow').doc(followId).set({
      requested: admin.firestore.FieldValue.increment(-1)
    }, {merge: true})
  }
})

exports.aggregateRequesting = functions.firestore.document('follow/{followId}/requesting/{userId}').onWrite(async (change, context) => {
  
  db = admin.firestore()
  const followId = context.params.followId
  const userId = context.params.userId
  
  const doc = change.after
  
  if (userId == "a") {
    return;
  }
  
  if (doc.data().status) {
    // Requesting. On start requesting
    return db.collection('follow').doc(followId).set({
      requesting: admin.firestore.FieldValue.increment(1)
    }, {merge: true})
  }
  else {
    
    return db.collection('follow').doc(followId).set({
      requesting: admin.firestore.FieldValue.increment(-1)
    }, {merge: true})
  }
})

exports.trendingTopics = functions.https.onRequest(async (req, res) => {
  db = admin.firestore()
  doc = await db.collection('functions').doc("trending").get()
  firebasedate = doc.data().last_accessed.toDate()
  currentdate = new Date()
  var diffMinutes = parseInt((currentdate - firebasedate) / (1000 * 60), 10); 
  
  if (diffMinutes > 12) {
    
    query = await db.collection('new_posts')
    .orderBy("timestamp", "desc")
    .where('status', '==', true)
    .limit(12).get()
    
    top = []
    for (let i = 0; i < query.docs.length; i++) {
      top.push(query.docs[i].data())
    }
    
    tags = []
    // Array in asc order of top tags from arr top
    top.forEach(element => {
      if (element.tags !== undefined && typeof(element.tags == 'object')) {
        for (let i = 0; i < element.tags.length; i++) {
          tags.push(element.tags[i])
        }
      }
    });
    
    var cnts = tags.reduce( function (obj, val) {
      obj[val] = (obj[val] || 0) + 1;
      return obj;
    }, {} );
    var sorted = Object.keys(cnts).sort( function(a,b) {
      return cnts[b] - cnts[a];
    });
    
    tags = sorted.splice(0, 9);
    
    final = []
    
    for (i = 0; i < tags.length; i++) {
      try {
        responsea = await getJSON('https://api.unsplash.com/search/photos/?per_page=5&client_id=mdcoi0HS_f4gxizCo-88KFeojNgqkbDYLsEHCy5Ah6Q&query=' + tags[i])                
        length = responsea.results.length
        if (length < 5) {
          p = 0
        }
        
        else {
          p = Math.floor(Math.random() * 5)
        }
        
        name = tags[i];
        image = responsea.results[p].urls.regular;
        id = responsea.results[p].id;
        photographer = responsea.results[p].user.name;
        photographer_pfp = responsea.results[p].user.profile_image;
        photographer_url = responsea.results[p].links.self;
        
        if (tags[i] == 'memes' || tags[i] == 'meme') {
          image = 'https://i.kym-cdn.com/photos/images/newsfeed/001/505/718/136.jpg'
          id = 'a'
          photographer = 'Yung Buddha'
          photographer_pfp = "https://i.ytimg.com/vi/zJrpdH5OX-U/maxresdefault.jpg"
          photographer_url = 'https://knowyourmeme.com/memes/woman-yelling-at-a-cat'
        }
        
        responseb = {
          name: name,
          image: image,
          id: id,
          photographer: photographer,
          photographer_pfp: photographer_pfp,
          photographer_url: photographer_url,
        }
        
        final.push(responseb)
        
      } catch (error) {
        responseb = {
          name: tags[i],
          image: 'nothing',
          id: 'a',
          photographer: 'Yung Buddha',
          photographer_pfp: 'https://www.ctvnews.ca/polopoly_fs/1.4691731.1574134829!/httpImage/image.png_gen/derivatives/landscape_960/image.png',
          photographer_url: 'https://www.toysrus.ca/dw/image/v2/BDFX_PRD/on/demandware.static/-/Sites-toys-master-catalog/default/dw82d5c0cb/images/E00B11C8_1.jpg',
        }
        
        final.push(responseb)
      }
    }
    
    // out of loop w arr final
    
    await db.collection("functions").doc('trending').update({
      data: final,
      last_accessed: admin.firestore.FieldValue.serverTimestamp()
    })   
    
    cors(req, res, () => {
      res.send({data: final})
    });
    
    
  }
  else {
    cors(req, res, () => {
      res.send({data: doc.data().data})
    });
  }
})

exports.previewLink = functions.https.onCall(async (data, context) => {
  
  const uid = context.auth.uid;
  const url = data.url;
  const db = admin.firestore()
  
  if (!uid) {
    return;
  }
  
  // Approved, generate preview.
  
  return linkPreview(url).then(resp => {
    return {data: resp}
  }).catch(err => {
    return {data: false, err: err}
  });
  
});

exports.manageSubAdd = functions.https.onCall(async (data, context) => {
  
  const uid = context.auth.uid;
  const db = admin.firestore()
  
  dealtDoc = await db.collection('dealt').doc(uid).get()

  if (!dealtDoc.exists) {
    await db.collection('dealt').doc(uid).set({
      status: true,
      cOUNT: 0,
    })

    dealtDoc = await db.collection('dealt').doc(uid).get()
  }

  creditsDeserve = dealtDoc.data().cOUNT
  changed = false

  return db.collection('customers').doc(uid).collection("subscriptions").get().then(async (querySnapshot) => {
    for (let i = 0; i < querySnapshot.docs.length; i++) {
      const data = querySnapshot.docs[i].data();
      
      product = data.price.path.toString().split('products/').pop().split('/prices/').shift()
      res = await fetch('https://api.stripe.com/v1/products/' + product, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + keys.sklive
        }
      })
      
      json = await res.json()

      // Number of credist
      credits = parseInt(json.description.split(" Credits").shift())

      // Check if requirement has already been satisfied

      secDifference = data.current_period_end.seconds - data.current_period_start.seconds
      months = secDifference / 60 / 60 / 24 / 31
      months = Math.round(months)

      if (!dealtDoc.data()[product]) {
        // If the field doesnt exist, it has to be your first one meaning you only get x credits amount
        creditsDeserve = creditsDeserve + credits
        await db.collection('dealt').doc(uid).update({
          [product]: 1
        })
        changed = true
      }
      else {
        // If dealt months are smaller than active months, add the difference times product value to the users credit system
        if (dealtDoc.data()[product] < months) {
          differenceInMonths = dealtDoc.data()[product] - months
          if (differenceInMonths !== 0) {
            await db.collection('dealt').doc(uid).update({
              [product]: admin.firestore.FieldValue.increment(differenceInMonths)
            })
          }
          desired = credits * differenceInMonths
          creditsDeserve = parseInt(creditsDeserve) + parseInt(desired)
          changed = true
        }
      }    
    }

    // Done, apply token changes.
    await db.collection('dealt').doc(uid).update({
      'cOUNT': creditsDeserve
    })

    return {result: [creditsDeserve, changed]}

    
  })
});