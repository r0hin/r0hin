$("#imgInp").change(function(){if(this.files&&this.files[0]){var e=new FileReader;e.onload=function(e){$("#blah").attr("src",e.target.result)},e.readAsDataURL(this.files[0])}document.getElementById("blah").style.display="block",document.getElementById("captionel").style.display="block",document.getElementById("captionelel").style.display="block"});

async function newpost() {
  
  var caption = document.getElementById('captioninput').value
  
  if (caption == '' || caption == " " || caption == null) {
    error('You must include a caption.')
    $('#uploadmodal').modal('toggle')
    return;
  }
  
  if (document.getElementById('captioninput').value.length > 100) {
    error('Caption contains more than 100 characters.')
    $('#uploadmodal').modal('toggle')
    return;
  }
  
  // Image Tags
  tags = $("#tagsinput1").tagsinput('items')
  
  if (tags.length > 8) {
    error('You have added more than 8 tags.')
    $('#uploadmodal').modal('toggle')
    return;
  }
  
  // Approved, create records.
  
  document.getElementById('tagsinput1').value = ''
  document.getElementById('captioninput').value = ''
  
  file = document.getElementById('imgInp').files[0]
  filenoext = file.name.replace(/\.[^/.]+$/, "")
  ext = file.name.split('.').pop();
  valuedate = new Date().valueOf()
  filename = filenoext + valuedate + '.' + ext
  
  var fileRef = storageRef.child('users/' + user.uid + '/' + filename);
  
  await fileRef.put(file)
  
  url = await fileRef.getDownloadURL()
  
  doc = await db.collection('new_posts').add({
    caption: caption,
    comments: 0,
    file_url: url,
    file_name: filename,
    latest_comment: "null",
    latest_comment_photo: "null",
    likes: 0,
    photo_url: cacheuser.url,
    private: document.getElementById('privateinp').checked,
    tags: tags,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    uid: user.uid,
    username: cacheuser.username,
    reported: false,
    report_weight: 0,
    name: cacheuser.username,
    status: true,
  })
  
  await db.collection('new_posts').doc(doc.id).collection('comments').doc('a').set({
    status: false,
  })
  
  await db.collection('new_posts').doc(doc.id).collection('likes').doc('a').set({
    status: false,
  })
  
  // Post uploaded.
  
  Snackbar.show({
    showAction: false,
    pos: 'bottom-center',
    text: 'Your photo was uploaded.'
  })
  
  $('#uploadmodal').modal('toggle')
  
  document.getElementById('captionel').style.display = 'none'
  document.getElementById('blah').style.display = 'none'
  document.getElementById('captionel').style.display = 'none'
  
  // document.getElementById('rereshtbn').click()
  query = await db.collection('new_posts')
  .orderBy("timestamp", "desc")
  .where('status', '==', true)
  .where("uid", '==', user.uid)
  .limit(1)
  .get()
  
  build_posts_all(query.docs, true)
  build_posts_rel(query.docs, true)
}

async function newTextPost(theme) {
  text = document.getElementById('textpostbox').value
  
  if (text == '' || text == " " || text == null || text == undefined) {
    error('You must include a caption.')
    $('#uploadmodal').modal('toggle')
    return;
  }
  
  if (document.getElementById('textpostbox').value.length > 320) {
    error('Your text contains more than 320 characters.')
    $('#uploadmodal').modal('toggle')
    return
  }
  
  // Text Tags
  tags = $("#tagsinput2").tagsinput('items')
  if (tags.length > 8) {
    // More than 8 tags
    error('You have added more than 8 tags.')
    $('#uploadmodal').modal('toggle')
    return;
  }
  
  // All good
  
  document.getElementById('tagsinput2').value = ''
  document.getElementById('textpostbox').value = ''
  
  $('#uploadmodal').modal('toggle')
  
  doc = await db.collection('new_posts').add({
    comments: 0,
    file_url: 'echo-home-text_post',
    url_theme: theme,
    url_content: text,
    file: 'echo-home-text_post',
    latest_comment: "null",
    latest_comment_photo: "null",
    likes: 0,
    photo_url: cacheuser.url,
    private: document.getElementById('privateinp2').checked,
    tags: tags,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    uid: user.uid,
    username: cacheuser.username,
    reported: false,
    report_weight: 0,
    name: cacheuser.username,
    status: true,
  })
  
  await db.collection('new_posts').doc(doc.id).collection('comments').doc('a').set({
    status: false
  })
  
  await db.collection('new_posts').doc(doc.id).collection('likes').doc('a').set({
    status: false
  })
  
  Snackbar.show({
    showAction: false,
    pos: 'bottom-center',
    text: 'Your text was uploaded.'
  })
  
  edittext()
  newpost_back()
  
  $('#selecttext').addClass('hidden')
  $('#captionel').css('display', 'none')
  $('#blah').css('display', 'none')
  $('#captionel').css('display', 'none')
  
  // document.getElementById('rereshtbn').click()
  query = await db.collection('new_posts')
  .orderBy("timestamp", "desc")
  .where('status', '==', true)
  .where("uid", '==', user.uid)
  .limit(1)
  .get()
  
  build_posts_all(query.docs, true)
  build_posts_rel(query.docs, true)
}

async function load_rel() {
  doc = await db.collection('app').doc('verified').get()
  window.cacheverify = doc.data().verified
  window.verifySnippet = doc.data().verifiedSnippet
  
  query = await db.collection('timelines')
  .doc(user.uid)
  .collection('posts')
  .orderBy("timestamp", "desc")
  .limit(8)
  .get()
  
  window.lastVisibleRel = query.docs[query.docs.length - 1]
  build_posts_rel(query.docs, false)
}

async function load_next_rel() {
  if (typeof(lastVisibleRel) == 'undefined') {
    // Auto scroll happened before regular load
    return;
  }
  
  query = await db.collection("timelines")
  .doc(user.uid)
  .collection('posts')
  .orderBy("timestamp", "desc")
  .startAfter(lastVisibleRel)
  .limit(8)
  .get()
  
  if (query.docs.length !== 0) {
    window.lastVisibleRel = query.docs[query.docs.length - 1]
    build_posts_rel(query.docs, false)
  }
}

async function build_posts_rel(query, self) {
  
  console.log(query);
  
  if (self) {
    savedQuery = query;
    query = ['peepeepoopoomenou']
  }
  for (let i = 0; i < query.length; i++) {
    // Query array contains documents with references to original posts
    
    if (query[i] !== 'peepeepoopoomenou') {
      doc = await db.collection('new_posts').doc(query[i].data().id).get()
      if (!doc.exists || !doc.data().status) {
        continue;
      }
    }
    else {
      doc = savedQuery[0]
    }
    
    if (doc.data().file_url == 'echo-home-text_post') {
      a = document.createElement('div')
      a.classList.add('shell_rel')
      a.classList.add(doc.id + 'shell')
      
      switch (doc.data().url_theme) {
        case 'deep':
        textCardClass = 'superdeepcard'
        textStuff = '<div class="card-body"><p class="relative""><b class="posttextclass">' + doc.data().url_content + '</b></p></div>'
        break;
        case 'light':
        textCardClass = 'lightcard'
        textStuff = '<div class="card-body"><h5 class="posttextclass">' + doc.data().url_content + '</h5></div>'
        break;
        case 'dark':
        textCardClass = 'darkcard'
        textStuff = '<div class="card-body"><h5 class="posttextclass">' + doc.data().url_content + '</h5></div>'
        break;
        default:
        continue;
        break;
      }
      
      userlikedoc = await db.collection('new_posts').doc(doc.id).collection('likes').doc(user.uid).get()
      
      if (userlikedoc.exists && userlikedoc.data().status) {
        desiredLikeAction = 'unlike'
        desiredLikeAction2 = 'heartactive'
        desiredLikeAction3 = 'favorite'
      }
      
      else {
        desiredLikeAction = 'like'
        desiredLikeAction2 = 'heart'
        desiredLikeAction3 = 'favorite_border'
      }
      
      verify = ''; if (typeof(cacheverify) == 'undefined') {verifyDoc = await db.collection('app').doc('verified').get()
      window.cacheverify = verifyDoc.data().verified; window.verifySnippet = verifyDoc.data().verifiedSnippet}
      if (cacheverify.includes(doc.data().uid)) {
        verify = verifySnippet
      }
      
      a.innerHTML = `<div class="content"><img style="z-index: 200;"><div onclick="viewpost('${doc.id}')" class="card ${textCardClass}">${textStuff}</div><nav class="navbar navbar-expand-sm"><img onclick="usermodal('${doc.data().uid}')" class="postpfp" id="${doc.id}pfp" src="${doc.data().photo_url}"><h4 class="postname centeredy">${doc.data().name}${verify}</h4><ul class="navbar-nav mr-auto"> </ul> <button id="${doc.id}likebtnrel" onclick="${desiredLikeAction}('${doc.id}')" class="eon-text ${desiredLikeAction2} postbuttons heart"><i id="${doc.id}likebtniconrel" class="material-icons posticon animated">${desiredLikeAction3}</i> <span id="${doc.id}likeCountrel">${doc.data().likes}</span></button><button id="${doc.id}commentBtnrel" onclick="loadComments('${doc.id}', '${doc.data().uid}')" class="eon-text postbuttons"><i class="material-icons posticon">chat_bubble_outline</i> <span id="${doc.id}commentCountrel">${doc.data().comments}</span> </button></nav></div><button onclick="info('${doc.id}')" class="postbuttons postinfo"><i class="material-icons-outlined posticon infobtn">info</i></button></div>`
      
      if (self) {
        a.classList.add('animated')    
        a.classList.add('backInDown')   
        
        
        window.setTimeout(() => {
          addWaves()
          document.getElementById('grid_rel').style.removeProperty('display');
          $('#grid_rel').imagesLoaded( function() {
            console.log('Status: All relevant photos loaded.\n');
            resizeAllRelGridItems()
            $(function () {
              $('[data-toggle="tooltip"]').tooltip()
            })
          });
        }, 1200)
        
        document.getElementById('grid_rel').prepend(a)                 
        return;
      }
      
      document.getElementById('grid_rel').appendChild(a)
      continue;
    }
    
    a = document.createElement('div')
    a.classList.add('shell_rel')
    a.classList.add(doc.id + 'shell')
    
    userlikedoc = await db.collection('new_posts').doc(doc.id).collection('likes').doc(user.uid).get()
    
    if (userlikedoc.exists && userlikedoc.data().status) {
      desiredLikeAction = 'unlike'
      desiredLikeAction2 = 'heart heartactive'
      desiredLikeAction3 = 'favorite'
    }
    else {
      desiredLikeAction = 'like'
      desiredLikeAction2 = 'heart'
      desiredLikeAction3 = 'favorite_border'
    }
    
    verify = ''; if (typeof(cacheverify) == 'undefined') {verifyDoc = await db.collection('app').doc('verified').get()
    window.cacheverify = verifyDoc.data().verified; window.verifySnippet = verifyDoc.data().verifiedSnippet}
    if (cacheverify.includes(doc.data().uid)) {
      verify = verifySnippet
    }
    
    shadow = ''
    if (doc.data().colorMap) {
      shadow = `style="box-shadow: 0px 4px 49px -8px ${doc.data().colorMap} !important" `
    }
    
    a.innerHTML = `<div class="content"><img ${shadow}onclick="viewpost('${doc.id}')" id="${doc.id}img" class="postimagerel" src="${doc.data().file_url}"><nav class="navbar navbar-expand-sm"><img onclick="usermodal('${doc.data().uid}')" class="postpfp" id="${doc.id}pfp" src="${doc.data().photo_url}"><h4 class="postname centeredy">${doc.data().name}${verify}</h4><ul class="navbar-nav mr-auto"> </ul> <button id="${doc.id}likebtnrel" onclick="${desiredLikeAction}('${doc.id}')" class="eon-text ${desiredLikeAction2} postbuttons heart"><i id="${doc.id}likebtniconrel" class="material-icons posticon animated">${desiredLikeAction3}</i> <span id="${doc.id}likeCountrel">${doc.data().likes}</span></button> <button id="${doc.id}commentbtnrel" onclick="loadComments('${doc.id}', '${doc.data().uid}')" class="eon-text postbuttons"><i class="material-icons posticon">chat_bubble_outline</i> <span id="${doc.id}commentCountrel">${doc.data().comments}</span></button></nav><button onclick="fullscreen('${doc.id}')" class="postbuttons postfullscreen"><i class="material-icons">fullscreen</i></button><button onclick="info('${doc.id}')" class="postbuttons postinfo"><i class="material-icons-outlined posticon infobtn">info</i></button></div>`
    
    document.getElementById('grid_rel').appendChild(a)
    
    if (self) {
      a.classList.add('animated')    
      a.classList.add('backInDown')    
      window.setTimeout(() => {
        addWaves()
        document.getElementById('grid_rel').style.removeProperty('display');
        $('#grid_rel').imagesLoaded( function() {
          console.log('Status: All relevant photos loaded.\n');
          resizeAllRelGridItems()
          $(function () {
            $('[data-toggle="tooltip"]').tooltip()
          })
        });
      }, 1200)
      document.getElementById('grid_rel').prepend(a)    
      return;
    }
    
    addWaves()
    
    document.getElementById('grid_rel').style.removeProperty('display');
  }
  
  
  window.setTimeout(() => {
    addWaves()
    document.getElementById('grid_rel').style.removeProperty('display');
    $('#grid_rel').imagesLoaded( function() {
      console.log('Status: All photos loaded.\n');
      resizeAllRelGridItems()
      $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
    });
  }, 200)
}