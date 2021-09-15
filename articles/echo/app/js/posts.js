sessionStorage.setItem('fullscreenon', 'no')
sessionStorage.setItem('view', 'relevant')
sessionStorage.setItem('viewing', 'stoplookinghere')
sessionStorage.setItem('currentlyviewinguser', 'uwu')
sessionStorage.setItem('currentlyviewingpost', 'owooo ❤️')
sessionStorage.setItem('skiponce', 'false')
sessionStorage.setItem('skiponce2', 'false')
sessionStorage.setItem('skiponce3', 'false')
sessionStorage.setItem('skiponce123', 'false')
sessionStorage.setItem('skiponce1234', 'false')

async function build_posts_user(query) {
  
  // Query array contains documents
  for (let i = 0; i < query.length; i++) {
    // query[i].data()
    
    if (query[i].data().file_url == 'echo-home-text_post') {
      w = document.createElement('div')
      w.classList.add('usershell')
      w.classList.add(query[i].id + 'shell')
      
      switch (query[i].data().url_theme) {
        case 'deep':
        textCardClass = 'superdeepcard'
        textStuff = '<div class="card-body"><p class="relative""><b class="posttextclass">' + query[i].data().url_content + '</b></p></div>'
        break;
        case 'light':
        textCardClass = 'lightcard'
        textStuff = '<div class="card-body"><h5 class="posttextclass">' + query[i].data().url_content + '</h5></div>'
        break;
        case 'dark':
        textCardClass = 'darkcard'
        textStuff = '<div class="card-body"><h5 class="posttextclass">' + query[i].data().url_content + '</h5></div>'
        break;
        default:
        break;
      }
      
      
      userlikedoc = await db.collection('new_posts').doc(query[i].id).collection('likes').doc(user.uid).get()
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
      
      w.innerHTML = `<div class="content"><img style="z-index: 200;"><div onclick="$('#userModal').modal('hide');sessionStorage.setItem('skiponce3', 'true'); viewpost('${query[i].id}')" class="card ${textCardClass}">${textStuff}</div><nav class="navbar navbar-expand-sm"><button id="${query[i].id}userlikebtn" onclick="${desiredLikeAction}('${query[i].id}')" class="eon-text ${desiredLikeAction2} postbuttons heart"><i id="${query[i].id}userlikebtnicon" class="material-icons posticon animated">${desiredLikeAction3}</i> <span id="${query[i].id}userlikeCount">${query[i].data().likes}</span></button><ul class="navbar-nav mr-auto"> </ul> <button id="${query[i].id}usercommentBtn" onclick="$('#userModal').modal('hide');sessionStorage.setItem('skiponce3', 'true');loadComments('${query[i].id}', '${query[i].data().uid}')" class="eon-text postbuttons"><i class="material-icons posticon">chat_bubble_outline</i> <span id="${query[i].id}usercommentCount">${query[i].data().comments}</span> </button></nav></div><button onclick="$('#userModal').modal('hide');sessionStorage.setItem('skiponce3', 'true'); info('${query[i].id}')" class="postbuttons postinfo"><i class="material-icons-outlined posticon infobtn">info</i></button></div>`
      document.getElementById('usergrid').appendChild(w)
      continue;
    }
    
    w = document.createElement('div')
    w.classList.add('usershell')
    w.classList.add(query[i].id + 'shell')
    
    userlikedoc = await db.collection('new_posts').doc(query[i].id).collection('likes').doc(user.uid).get()
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
    shadow = ''
    if (query[i].data().colorMap) {
      shadow = `style="box-shadow: 0px 4px 49px -8px ${query[i].data().colorMap} !important" `
    }

    w.innerHTML = `<div class="content"><img ${shadow}onclick="$('#userModal').modal('hide');sessionStorage.setItem('skiponce3', 'true'); viewpost('${query[i].id}')" id="${query[i].id}userimg" class="postimage" src="${query[i].data().file_url}"><nav class="navbar navbar-expand-sm"><button id="${query[i].id}userlikebtn" onclick="${desiredLikeAction}('${query[i].id}')" class="eon-text ${desiredLikeAction2} postbuttons heart"><i id="${query[i].id}userlikebtnicon" class="material-icons posticon animated">${desiredLikeAction3}</i> <span id="${query[i].id}userlikeCount">${query[i].data().likes}</span></button><ul class="navbar-nav mr-auto"> </ul> <button id="${query[i].id}usercommentbtn" onclick="$('#userModal').modal('hide');sessionStorage.setItem('skiponce3', 'true'); loadComments('${query[i].id}', '${query[i].data().uid}')" class="eon-text postbuttons"><i class="material-icons posticon">chat_bubble_outline</i><span id="${query[i].id}usercommentCount">${query[i].data().comments}</span></button></nav><button onclick="fullscreen('${query[i].id}')" class="postbuttons postfullscreen"><i class="material-icons">fullscreen</i></button><button onclick="$('#userModal').modal('hide');sessionStorage.setItem('skiponce3', 'true'); info('${query[i].id}')" class="postbuttons postinfo"><i class="material-icons-outlined posticon infobtn">info</i></button></div>`
    document.getElementById('usergrid').appendChild(w)
    
  }
  $('#usergrid').imagesLoaded( () => {
    addWaves()
    resizeUserGridItems()
  })
  
}

async function load_posts_user(uid) {
  
  userQuery = await db.collection('new_posts')
  .orderBy("timestamp", "desc")
  .where('status', '==', true)
  .where('uid', '==', uid)
  .limit(8)
  .get()
  
  window.lastVisibleUser = userQuery.docs[userQuery.docs.length - 1]
  build_posts_user(userQuery.docs)
  
}

async function load_next_posts_user() {
  query = await db.collection("new_posts")
  .orderBy("timestamp", "desc")
  .where("uid", "==", sessionStorage.getItem('currentlyviewinguser'))
  .startAfter(lastVisibleUser)
  .limit(8)
  .get()
  
  window.lastVisibleUser = query.docs[query.docs.length - 1]
  build_posts_user(query.docs)
}

async function like(post) {
  
  likebtns = document.getElementsByClassName(post + 'likebtntrend')
  for (var i = 0; i < likebtns.length; i++) {
    // likebtns[i] is element
    likebtns[i].onclick = () => {
      $(`.${post}likebtnicontrend`).addClass('shake')
      window.setTimeout(() => {
        $(`.${post}likebtnicontrend`).removeClass('shake')
      }, 600)
    }
  }
  try {
    document.getElementById(post + 'likebtn').onclick = () => {
      $(`#${post}likebtnicon`).addClass('shake')
      window.setTimeout(() => {
        $(`#${post}likebtnicon`).removeClass('shake')
      }, 600)
    }
  } catch (error) { }
  
  try {
    document.getElementById(post + 'userlikebtn').onclick = () => {
      $(`#${post}userlikebtnicon`).addClass('shake')
      window.setTimeout(() => {
        $(`#${post}userlikebtnicon`).removeClass('shake')
      }, 600)
    }
  } catch (error) { }
  try {
    document.getElementById(post + 'userlikebtn').onclick = () => {
      $(`#${post}likebtniconrel`).addClass('shake')
      window.setTimeout(() => {
        $(`#${post}likebtniconrel`).removeClass('shake')
      }, 600)
    }
  } catch (error) { }
  
  
  $(`.${post}likebtntrend`).toggleClass('heartactive')
  $(`#${post}likebtn`).toggleClass('heartactive');
  $(`#${post}likebtnrel`).toggleClass('heartactive');
  $(`#${post}userlikebtn`).toggleClass('heartactive');
  
  $(`.${post}likebtnicontrend`).html('favorite')
  $(`#${post}likebtnicon`).html('favorite');
  $(`#${post}likebtniconrel`).html('favorite');
  $(`#${post}userlikebtnicon`).html('favorite');
  
  $(`.${post}likebtnicontrend`).addClass('rubberBand')
  $(`#${post}likebtnicon`).addClass('rubberBand')
  $(`#${post}likebtniconrel`).addClass('rubberBand')
  $(`#${post}userlikebtnicon`).addClass('rubberBand')
  
  window.setTimeout(() => {
    $(`.${post}likebtnicontrend`).removeClass('rubberBand')
    $(`#${post}likebtnicon`).removeClass('rubberBand')
    $(`#${post}likebtniconrel`).removeClass('rubberBand')        
    $(`#${post}userlikebtnicon`).removeClass('rubberBand')   
  }, 600);
  
  $(`.${post}likeCounttrend`).html(parseInt($(`.${post}likeCounttrend`).html()) + 1)
  $(`#${post}likeCount`).html(parseInt($(`#${post}likeCount`).html()) + 1)
  $(`#${post}likeCountrel`).html(parseInt($(`#${post}likeCountrel`).html()) + 1)
  $(`#${post}userlikeCount`).html(parseInt($(`#${post}userlikeCount`).html()) + 1)
  
  await db.collection('new_posts').doc(post).collection('likes').doc(user.uid).set({
    status: true,
  })
  
  window.setTimeout(() => {
    likebtns = document.getElementsByClassName(post + 'likebtntrend')
    for (var i = 0; i < likebtns.length; i++) {
      likebtns[i].onclick = () => {
        unlike(post)
      }
    }
    
    try {
      document.getElementById(post + 'likebtn').onclick = () => {
        unlike(post)
      }
    } catch (error) { }
    
    
    try {
      document.getElementById(post + 'userlikebtn').onclick = () => {
        unlike(post)
      }
    } catch (error) { }
    
    try {
      document.getElementById(post + 'likebtnrel').onclick = () => {
        unlike(post)
      }
    } catch (error) { }
    
  }, 1750);
  
}

async function unlike(post) {
  
  likebtns = document.getElementsByClassName(post + 'likebtntrend')
  for (var i = 0; i < likebtns.length; i++) {
    // likebtns[i] is element
    likebtns[i].onclick = () => {
      $(`.${post}likebtnicontrend`).addClass('shake')
      window.setTimeout(() => {
        $(`.${post}likebtnicontrend`).removeClass('shake')
      }, 600)
    }
  }
  try {
    document.getElementById(post + 'likebtn').onclick = () => {
      $(`#${post}likebtnicon`).addClass('shake')
      window.setTimeout(() => {
        $(`#${post}likebtnicon`).removeClass('shake')
      }, 600)
    }
  } catch (error) { }
  
  try {
    document.getElementById(post + 'userlikebtn').onclick = () => {
      $(`#${post}userlikebtnicon`).addClass('shake')
      window.setTimeout(() => {
        $(`#${post}userlikebtnicon`).removeClass('shake')
      }, 600)
    }
  } catch (error) { }
  
  
  try {
    document.getElementById(post + 'likebtnrel').onclick = () => {
      $(`#${post}likebtniconrel`).addClass('shake')
      window.setTimeout(() => {
        $(`#${post}likebtniconrel`).removeClass('shake')
      }, 600)
    }
  } catch (error) { }
  
  $(`.${post}likebtntrend`).toggleClass('heartactive')
  $(`#${post}likebtn`).toggleClass('heartactive');
  $(`#${post}likebtnrel`).toggleClass('heartactive');
  $(`#${post}userlikebtn`).toggleClass('heartactive');
  
  $(`.${post}likebtnicontrend`).html('favorite_border')
  $(`#${post}likebtnicon`).html('favorite_border');
  $(`#${post}likebtniconrel`).html('favorite_border');
  $(`#${post}userlikebtnicon`).html('favorite_border');
  
  $(`.${post}likebtnicontrend`).addClass('jello')
  $(`#${post}likebtnicon`).addClass('jello')
  $(`#${post}likebtniconrel`).addClass('jello')
  $(`#${post}userlikebtnicon`).addClass('jello')
  
  window.setTimeout(() => {
    $(`.${post}likebtnicontrend`).removeClass('jello')
    $(`#${post}likebtnicon`).removeClass('jello')  
    $(`#${post}likebtniconrel`).removeClass('jello')  
    $(`#${post}userlikebtnicon`).removeClass('jello')    
  }, 600);
  
  
  $(`.${post}likeCounttrend`).html(parseInt($(`.${post}likeCounttrend`).html()) - 1)
  $(`#${post}likeCount`).html(parseInt($(`#${post}likeCount`).html()) - 1)
  $(`#${post}likeCountrel`).html(parseInt($(`#${post}likeCountrel`).html()) - 1)
  $(`#${post}userlikeCount`).html(parseInt($(`#${post}likeCount`).html()) - 1)
  
  await db.collection('new_posts').doc(post).collection('likes').doc(user.uid).set({
    status: false,
  })
  
  window.setTimeout(() => {
    likebtns = document.getElementsByClassName(post + 'likebtntrend')
    for (var i = 0; i < likebtns.length; i++) {
      likebtns[i].onclick = () => {
        like(post)
      }
    }
    
    try {
      document.getElementById(post + 'likebtn').onclick = () => {
        like(post)
      }
    } catch (error) { }
    
    try {
      document.getElementById(post + 'userlikebtn').onclick = () => {
        like(post)
      }
    } catch (error) { }
    
    try {
      document.getElementById(post + 'userlikebtnrel').onclick = () => {
        like(post)
      }
    } catch (error) { }
  }, 1750);
}

async function info(post) {
  loader = $('#infoLoader')
  loader.removeClass('fadeOut');
  loader.removeClass('hidden');
  
  $('#infoModal').modal('toggle')
  doc = await db.collection('new_posts').doc(post).get()
  
  $('#infoa').html(doc.data().file_name)
  $('#infob').html(doc.data().timestamp.toDate())
  $('#infoc').html(doc.id)
  $('#infod').html(doc.data().uid)
  $('#infoe').html(doc.data().caption)
  
  if (doc.data().caption == undefined) {
    $('#infoe').html('No Caption')
  }
  
  document.getElementById('postbtnfrominfo').onclick = function () {
    sessionStorage.setItem('tocomments', true)
    viewpost(post)
  }
  
  document.getElementById('commentbtnfrominfo').onclick = function () {
    sessionStorage.setItem('tocomments', true)
    loadComments(post, doc.data().uid)
  }
  
  document.getElementById('userbtnfrominfo').onclick = function () {
    sessionStorage.setItem('touser', true)
    usermodal(doc.data().uid)
  }
  
  if (doc.data().uid == user.uid) {
    document.getElementById('deletebtnfrominfo').onclick = function () {
      document.getElementById('deletebtnfrominfo').innerHTML = '<i class="material-icons gradicon">delete_forever</i> confirm';
      document.getElementById('deletebtnfrominfo').classList.add('deletebtnexpanded')
      document.getElementById('deletebtnfrominfo').classList.add('fadeIn')
      document.getElementById('deletebtnfrominfo').onclick = function () {
        deletepost(`${post}`, `${doc.data().uid}`)
      }
    }
    document.getElementById('deletebtnfrominfo').style.display = 'inline-block'
  } else {
    document.getElementById('deletebtnfrominfo').setAttribute('style', 'display:none !important');
  }
  
  document.getElementById('reportbtnfrominfo').onclick = function () {
    x = confirm('Are you sure you would like to report this post?')
    if (x) {
      // reportpost() maybe
    } else {
      window.setTimeout(function () {
        info(post)
      }, 500)
    }
  }
  
  window.history.pushState(null, '', 'app.html?info=' + post);
  
  loader.addClass('fadeOut');
  window.setTimeout(() => {
    loader.addClass('hidden');
  }, 450)
  
  
}

async function fullscreen(post) {
  $('body').css('overflow', 'hidden');
  
  doc = await db.collection('new_posts').doc(post).get()
  
  a = document.createElement('div')
  a.id = 'fullscreenel'
  a.classList.add('fullscreenelement')
  a.classList.add('animated')
  a.classList.add('fadeInUp')
  source = doc.data().file_url
  a.innerHTML = '<img class="fullscreenimageelement centered" src="' + source + '"> <button onclick="unfullscreen()" class="fullscreenbutton centeredx "><i class="material-icons">fullscreen_exit</i></button>'
  document.getElementById('body').appendChild(a)
  window.history.pushState(null, '', 'app.html?fullscreen=' + post);
  addWaves()
  sessionStorage.setItem('fullscreenon', 'yes')
}

function unfullscreen() {
  $('body').css('overflow', 'auto');
  
  sessionStorage.setItem('fullscreenon', 'no')
  document.getElementById('fullscreenel').classList.remove('fadeInUp')
  document.getElementById('fullscreenel').classList.add('fadeOutDown')
  window.setTimeout(() => {
    $('#fullscreenel').remove()
    window.history.pushState(null, '', 'app.html');
  }, 700);
}

async function usermodal(uid) {
  
  loader = $('#userLoader');
  loader.removeClass('fadeOut');
  loader.removeClass('hidden');
  
  previousview = sessionStorage.getItem("currentlyviewinguser")
  
  if (previousview == uid) {
    $('#userModal').modal('show')
    addWaves()
    
    loader.addClass('fadeOut');
    window.setTimeout(() => {
      loader.addClass('hidden');
    }, 450)
    window.history.pushState(null, '', 'app.html?user=' + uid);
    return;
  } 
  
  sessionStorage.setItem('currentlyviewinguser', uid)
  window.history.pushState(null, '', 'app.html?user=' + uid);
  
  $('#followerscontainer').empty()
  $('#followingcontainer').empty()
  $('#usergrid').empty()
  $('#userModal').modal('show')
  $('#connections').empty()
  
  doc = await db.collection('users').doc(uid).get()
  userdoc = doc
  
  verify = ''; 
  if (typeof(cacheverify) == 'undefined') {
    verifyDoc = await db.collection('app').doc('verified').get()
    window.cacheverify = verifyDoc.data().verified;
    window.verifySnippet = doc.data().verifiedSnippet;
  }
  if (cacheverify.includes(doc.data().uid)) {
    verify = verifySnippet
  }
  
  document.getElementById('usermodaltitle').innerHTML = doc.data().name + verify + '<span class="badge badge-dark userbadge">@' + doc.data().username + '</span>'
  document.getElementById('usermodalpfp').src = doc.data().url
  
  if (doc.data().gradient == undefined) {
    document.getElementById('usermodalpfp').classList.remove('customgradientprofileimg')
  } else {
    document.getElementById('usermodalpfp').classList.add('customgradientprofileimg')
    document.getElementById('dynamicstyle3').innerHTML = '.customgradientprofileimg {background-image: linear-gradient(white, white), linear-gradient(45deg, #' + doc.data().gradient.a + ', #' + doc.data().gradient.b + ') !important}'
  }
  
  if (doc.data().bio == undefined || doc.data().bio == null || doc.data().bio == "" || doc.data().bio == " ") {
    document.getElementById('usermodalbio').innerHTML = ""
  } else {
    document.getElementById('usermodalbio').innerHTML = doc.data().bio
  }
  
  // Connections -> Twitter
  if (doc.data().twitter !== undefined) {
    if (doc.data().twitter.enabled) {
      hs = document.createElement('button')
      hs.classList.add('eon-text')
      hs.classList.add('connectionbtn')
      hs.onclick = function () {
        $('#userModal').modal('toggle')
        gotwitter(doc.data().twitter.id)
      }
      hs.innerHTML = '<img class="imginbtn" src="assets/Twitter_Logo_Blue.png"></img>'
      document.getElementById("connections").appendChild(hs)
    }
  }
  
  // Connections -> GitHub
  if (doc.data().github !== undefined) {
    if (doc.data().github.enabled) {
      hs = document.createElement('button')
      hs.classList.add('eon-text')
      hs.classList.add('connectionbtn')
      hs.onclick = function () {
        $('#userModal').modal('toggle')
        gogithub(doc.data().github.id)
      }
      var customProps = window.getComputedStyle(document.documentElement);
      hs.innerHTML = '<img class="imginbtn" src="assets/GitHub-Mark-' + customProps.getPropertyValue('--content-primary').replace(/\s/g, '').charAt(0).toUpperCase() + customProps.getPropertyValue('--content-primary').slice(1) + '.png"></img>'
      document.getElementById("connections").appendChild(hs)
    }
  }
  
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
  
  // FOLLOW STUFF
  
  userfollowdoc = await db.collection('follow').doc(uid).get()
  
  $('#userfollowing').html('0')
  $('#userfollowers').html('0')
  
  if (userfollowdoc.exists) {
    $('#userfollowing').html(nFormatter(userfollowdoc.data().following, 1))
    $('#userfollowers').html(nFormatter(userfollowdoc.data().followers, 1))
    
    if(typeof(userfollowdoc.data().following) !== 'number') {
      $('#userfollowing').html('0')
    }
    if(typeof(userfollowdoc.data().followers) !== 'number') {
      $('#userfollowers').html('0')
    }
  }
  
  followdoc = await db.collection('follow').doc(uid).collection('followers').doc(user.uid).get()
  isFollow = false
  if (followdoc.exists && followdoc.data().status) {
    isFollow = true
  }
  
  if (isFollow && user.uid !== uid) {
    $('#followbtn').html('unfollow')
    $('#usermodalfollowtext').removeClass('fadeInUp')
    $('#usermodalfollowtext').removeClass('fadeOutDown')
    $('#usermodalfollowtext').css('visiblity', 'hidden')
    window.setTimeout(() => {
      $('#usermodalfollowtext').addClass('fadeInUp')
      $('#usermodalfollowtext').removeClass('hidden')
      $('#usermodalfollowtext').css('visiblity', 'visible')
      $('#usermodalfollowtext').css('display', 'block')
    }, 50);
    
    document.getElementById('followbtn').onclick = function () {
      unfollow(uid, userdoc.data().username, userdoc.data().url, userdoc.data().name)
    }
    
    load_posts_user(uid)
  } else {
    if (user.uid !== uid) {
      // Not following
      
      $('#usermodalfollowtext').removeClass('fadeInUp')
      $('#usermodalfollowtext').removeClass('fadeOutDown')
      
      window.setTimeout(() => {
        $('#usermodalfollowtext').addClass('fadeInUp')
        $('#usermodalfollowtext').css('visiblity', 'hidden')
      }, 50);
      
      $('#followbtn').html('follow')
      
      document.getElementById('followbtn').onclick = (() => {
        follow(uid, userdoc.data().username, userdoc.data().url, userdoc.data().name)
      })
      
      if (userdoc.data().type == 'private') {
        requesteddoc = await db.collection('follow').doc(uid).collection('requested').doc(user.uid).get()
        isRequested = false
        if (doc.exists && followdoc.exists && followdoc.data().status) {
          if (followdoc.data().status) {
            isRequested = true
          }
        }
        $('#privatewarning').css('display', 'block')
        if (isRequested) {
          
          $('#usermodalfollowtext').removeClass('fadeInUp')
          $('#usermodalfollowtext').removeClass('fadeOutDown')
          
          window.setTimeout(() => {
            $('#usermodalfollowtext').addClass('fadeInUp')
            $('#usermodalfollowtext').css('visiblity', 'visible')
            $('#usermodalfollowtext').css('display', 'block')
            $('#usermodalfollowtext').html(`<i class="material-icons" id="followicon">access_time</i> Requested`)
          }, 50);
          
          $('#followbtn').html('cancel request')
          
          document.getElementById('followbtn').onclick = function () {
            cancel_request(uid, userdoc.data().username, userdoc.data().url, userdoc.data().name)
          }
        } else {
          $('#followbtn').html('request')
          
          document.getElementById('followbtn').onclick = function () {
            request(uid, userdoc.data().username, userdoc.data().url, userdoc.data().name)
          }
        }
      } else {
        // User is not private, and you are not following
        if (user.uid !== uid) {
          load_posts_user(uid)
        }
      }
    }
  }
  
  try {
    if (user.uid == uid) {
      $('#ownwarning').css('display', 'block')
      $('#followbtn').html('unfollow')
      document.getElementById('followbtn').onclick = function () {
        // Why they tryna unfollow themselves
        $('#followbtn').addClass('animated')
        $('#followbtn').addClass('heartBeat')
        window.setTimeout(() => {
          $('#followbtn').removeClass('heartBeat')
          $('#followbtn').removeClass('heartBeat')
        }, 800);
      }
      
      load_posts_user(uid)
    }
  } catch {
    // USER IS NOT DEFINED
  }
  addWaves()
  $('#poststab-tab').get(0).click()
  
  loader.addClass('fadeOut');
  window.setTimeout(() => {
    loader.addClass('hidden');
  }, 450)
}

async function follow(uid, username, url, name) {
  $('#userfollowers').html(parseInt($('#userfollowers').html()) + 1)
  // Profile public and boutta follow
  
  await db.collection('follow').doc(uid).collection('followers').doc(user.uid).set({
    status: true,
    name: cacheuser.username,
    uid: user.uid,
    username: cacheuser.username,
    photo_url: cacheuser.url
  })
  await db.collection('follow').doc(user.uid).collection('following').doc(uid).set({
    status: true,
    name: username,
    uid: uid,
    username: username,
    photo_url: url
  })
  
  Snackbar.show({
    pos: 'bottom-center',
    text: `Started following ${name}.`
  })
  
  $('#followbtn').html('unfollow')
  
  document.getElementById('followbtn').onclick = function () {
    unfollow(uid, username, url, name)
  }
  
  $('#usermodalfollowtext').removeClass('fadeInUp')
  $('#usermodalfollowtext').removeClass('fadeOutDown')
  $('#usermodalfollowtext').css('visibility', 'hidden')
  
  window.setTimeout(() => {
    $('#usermodalfollowtext').addClass('fadeInUp')
    $('#usermodalfollowtext').removeClass('hidden')
    $('#usermodalfollowtext').css('visibility', 'visible')
    $('#usermodalfollowtext').html('<i class="material-icons" id="followicon">done</i> Following')
  }, 50)
  
}

async function unfollow(uid, username, url, name) {
  $('#userfollowers').html(parseInt($('#userfollowers').html()) - 1)
  
  await db.collection('follow').doc(uid).collection('followers').doc(user.uid).set({
    status: false,
    name: cacheuser.username,
    uid: user.uid,
    username: cacheuser.username,
    photo_url: cacheuser.url
  })
  await db.collection('follow').doc(user.uid).collection('following').doc(uid).set({
    status: false,
    name: username,
    uid: uid,
    username: username,
    photo_url: url
  })
  Snackbar.show({
    pos: 'bottom-center',
    text: 'Stopped following ' + name + '.'
  })
  $('#followbtn').html('follow')
  
  document.getElementById('followbtn').onclick = function () {
    follow(uid, username, url, name)
  }
  
  $('#usermodalfollowtext').removeClass('fadeInUp')
  $('#usermodalfollowtext').removeClass('fadeOutDown')
  
  window.setTimeout(() => {
    $('#usermodalfollowtext').addClass('fadeOutDown')
    $('#usermodalfollowtext').css('visibility', 'visible')
    $('#usermodalfollowtext').html('<i class="material-icons" id="followicon">done</i> Following')
    $('usermodalfollowtext').css('display', 'block')
  }, 50)
  
}

async function request(uid, username, url, name) {
  
  await db.collection('follow').doc(uid).collection('requested').doc(user.uid).set({
    status: true,
    name: cacheuser.username,
    uid: user.uid,
    username: cacheuser.username,
    photo_url: cacheuser.url
  })
  await db.collection('follow').doc(user.uid).collection('requesting').doc(uid).set({
    status: true,
    name: username,
    uid: uid,
    username: username,
    photo_url: url
  })
  
  $('#followbtn').html('cancel request')
  
  document.getElementById('followbtn').onclick = () => {
    cancel_request(uid, username, url, name)
  }
  
  $('#usermodalfollowtext').removeClass('fadeInUp');
  $('#usermodalfollowtext').removeClass('fadeOutDown');
  $('#usermodalfollowtext').css('visibility', 'hidden');
  window.setTimeout(() => {
    $('#usermodalfollowtext').css('visibility', 'visible');
    $('#usermodalfollowtext').css('display', 'block');
    $('#usermodalfollowtext').addClass('fadeInUp');
    $('#usermodalfollowtext').html('<i class="material-icons" id="followicon">access_time</i> Requested');
  }, 50)
  
}

async function cancel_request(uid, username, url, name) {
  
  await db.collection('follow').doc(uid).collection('requested').doc(user.uid).set({
    status: false,
    name: cacheuser.username,
    uid: user.uid,
    username: cacheuser.username,
    photo_url: cacheuser.url
  })
  
  await db.collection('follow').doc(user.uid).collection('requesting').doc(uid).set({
    status: false,
    name: username,
    uid: uid,
    username: username,
    photo_url: url
  })
  
  $('#followbtn').html('request');
  
  document.getElementById('followbtn').onclick = () => {
    follow(uid, username)
  }
  $('#usermodalfollowtext').removeClass('fadeInUp');
  $('#usermodalfollowtext').removeClass('fadeOutDown');
  window.setTimeout(() => {
    $('#usermodalfollowtext').addClass('fadeOutDown')
    $('#usermodalfollowtext').css('visibility', 'visible')
    $('#usermodalfollowtext').css('display', 'block')
  }, 50)
  
}

async function showfollowers() {
  uid = sessionStorage.getItem('currentlyviewinguser')
  
  if ($('#followerscontainer').is(':empty')) {
    doc = await db.collection('follow').doc(uid).collection('followers').where("status", "==", true).limit(12).get()
    
    
    for (let i = 0; i < doc.docs.length; i++) {
      verify = ''; 
      if (typeof(cacheverify) == 'undefined') {
        verifyDoc = await db.collection('app').doc('verified').get()
        window.cacheverify = verifyDoc.data().verified; 
        window.verifySnippet = verifyDoc.data().verifiedSnippet}
        if (cacheverify.includes(doc.docs[i].data().uid)) {
          verify = verifySnippet
        }
        u = document.createElement('div');
        u.innerHTML = `
        <img class="followCardPFP" src="${doc.docs[i].data().photo_url}">
        <div class="followCardText">
        <h4 class="bold">${doc.docs[i].data().name}${verify}</h4>
        <span class="chip">@${doc.docs[i].data().username}</span>
        </div>
        <div class="followCardActions">
        <button onclick="$('#userModal').modal('hide');window.setTimeout(() => {sessionStorage.setItem('skiponce123', 'true'); usermodal('${doc.docs[i].data().uid}')}, 920)" class="eon-text">view profile</button>
        </div>
        `
        u.classList.add('userFollowCard')
        document.getElementById('followerscontainer').appendChild(u)
      }
      $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
      addWaves()
      
    }
  }
  
  async function showfollowing() {
    uid = sessionStorage.getItem('currentlyviewinguser')
    
    if ($('#followingcontainer').is(':empty')) {
      doc = await db.collection('follow').doc(uid).collection('following').where("status", "==", true).limit(12).get()
      
      for (let i = 0; i < doc.docs.length; i++) {
        verify = ''; if (typeof(cacheverify) == 'undefined') {verifyDoc = await db.collection('app').doc('verified').get()
        window.cacheverify = verifyDoc.data().verified; window.verifySnippet = verifyDoc.data().verifiedSnippet}
        if (cacheverify.includes(doc.docs[i].data().uid)) {
          verify = verifySnippet
        }
        u = document.createElement('div');
        u.innerHTML = `
        <img class="followCardPFP" src="${doc.docs[i].data().photo_url}">
        <div class="followCardText">
        <h4 class="bold">${doc.docs[i].data().name}${verify}</h4>
        <span class="chip">@${doc.docs[i].data().username}</span>
        </div>
        <div class="followCardActions">
        <button onclick="$('#userModal').modal('hide');window.setTimeout(() => {sessionStorage.setItem('skiponce3', 'true'); usermodal('${doc.docs[i].data().uid}')}, 920)" class="eon-text">view profile</button>
        </div>
        `
        u.classList.add('userFollowCard')
        document.getElementById('followingcontainer').appendChild(u)
      }
      $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
      addWaves()
      
    }
  }
  
  async function viewpost(id) {
    $('#userModal').modal('hide')
    
    previouspost = sessionStorage.getItem("currentlyviewingpost")
    if (previouspost == id) {
      $('#postModal').modal('show')
      window.history.pushState(null, '', 'app.html?post=' + id);
    } else {
      // Generate New
      window.history.pushState(null, '', 'app.html?post=' + id);
      sessionStorage.setItem("currentlyviewingpost", id)
      $('#postfull').empty()
      
      doc = await db.collection('new_posts').doc(id).get()
      if (doc.data().private && doc.data().uid !== user.uid) {
        // Post is private, check if friends
        userdoc = await db.collection('follow').doc(doc.data().uid).collection('followers').doc(user.uid).get()
        if (userdoc.exists && userdoc.data().status) {
          approvePost(id, doc.data(), userdoc.data())
          $('#postModal').modal('show')
          return;
        }
        $('#postfull').html('<p>This post is private and you are not following them o.O</p>')
        $('#postModal').modal('show')
        return;
      } 
      approvePost(id, doc.data())
      $('#postModal').modal('show')
    }
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
  }
  
  async function approvePost(id, data) {
    // Get user details
    commentFunc = "loadComments('" + id + "', '" + data.uid + "'); sessionStorage.setItem('skiponce1234', 'true'); $('#postModal').modal('hide')"
    infoFunc = "info('" + id + "'); sessionStorage.setItem('skiponce1234', 'true'); $('#postModal').modal('hide')"
    userFunc = "usermodal('" + data.uid + "'); sessionStorage.setItem('skiponce1234', 'true'); $('#postModal').modal('hide')"
    
    caption = data.caption
    
    if (data.caption == undefined) {
      caption = data.url_content
    }
    
    if (data.file_url == 'echo-home-text_post') {
      // Text post
      if (data.url_theme == 'deep') {
        textCardClass = 'superdeepcard'
        textStuff = '<div class="card-body"><p class="relative""><b class="posttextclass">' + data.url_content + '</b></p></div>'
      } else {
        textCardClass = data.url_theme + 'card'
        textStuff = '<div class="card-body"><h5 class="posttextclass">' + data.url_content + '</h5></div>'
      }
      b = '<div class="card postfullcard ' + textCardClass + '">' + textStuff + '</div>'
    } else {
      shadow = ''
      if (data.colorMap) {
        shadow = `style="box-shadow: 0px 4px 49px -8px ${data.colorMap} !important" `
      }
      b = `<img ${shadow}src="${data.file_url}" class="postimg shadow" alt="">`
    }
    
    tags = data.tags
    if (tags == undefined || tags.length == 0) {
      tags = []
    }
    tagselement = ''
    for (let i = 0; i < tags.length; i++) {
      tagselement = tagselement + '<span class="badge badge-pill badge-primary">' + tags[i] + '</span>'
    }
    commentPreview = ''
    if (data.latest_comment_content && data.latest_comment_name && data.latest_comment_photo) {
      // Cloud function works as intended;
      verify = ''; if (typeof(cacheverify) == 'undefined') {verifyDoc = await db.collection('app').doc('verified').get()
      window.cacheverify = verifyDoc.data().verified; window.verifySnippet = verifyDoc.data().verifiedSnippet}
      if (cacheverify.includes(data.latest_comment_uid)) {
        verify = verifySnippet
      }
      commentPreview = `
      <p><b>Latest Comment</b></p>
      <div class="top_level_comment">
      <div class="content">
      <img class="comment_pfp" src="${data.latest_comment_photo}"></img>
      <div class="comment_text"><span>${data.latest_comment_name}${verify}</span></div>
      <div class="comment_meta">
      <div class="dropdown">
      <button aria-expanded="false" aria-haspopup="true" class="eon-text iconbtn" data-toggle="dropdown"><i class="material-icons">more_vert</i></button>
      <div class="dropdown-menu menu accmanagedropdown">
      <center>
      <a class="eon-text blockk" href="#"><i class="material-icons">content_copy</i></a>
      <a class="eon-text blockk" href="#"><i class="material-icons">report</i></a>
      </center>
      </div>
      </div>
      </div>
      <div class="comment_content">${data.latest_comment_content}</div>
      <div class="comment_footer">
      <button onclick="${commentFunc}" class="eon-text repliesbtn">
      <i class="material-icons">expand_more</i>
      View All Comments (${data.comments})
      </button>
      </div>
      </div>
      </div>
      `
    }
    
    share = `
    <center id="btnSharePost">
    <input type="text" value="Hello World" class="hidden" id="clipboardInput">
    
    <button onclick="var cT = document.getElementById('clipboardInput');cT.classList.remove('hidden');cT.value=window.location.href;cT.select();cT.setSelectionRange(0, 99999);document.execCommand('copy');cT.classList.add('hidden');Snackbar.show({text: 'Copied link to clipboard.'})" class="eon-text iconbtn"><i class="material-icons">link</i></button>
    </center>
    `
    
    promote = `
    <br>
    <button class="eon-text boostbtn"><i class="material-icons">assistant</i> boost post</button>
    `
    
    verify = ''; if (typeof(cacheverify) == 'undefined') {verifyDoc = await db.collection('app').doc('verified').get()
    window.cacheverify = verifyDoc.data().verified; window.verifySnippet = verifyDoc.data().verifiedSnippet}
    if (cacheverify.includes(data.uid)) {
      verify = verifySnippet
    }
    
    a = '<div class="row"><div class="col-8 fullpostcontainer"><center>' + b + share + '</center></div><div class="col-4 sidebarcontentparent"><hr id="dividerpostmodal" class="vertical-divider"><div id="sidebarcontent"> <nav class="navbar animated fadeInDown"> <button onclick="' + userFunc + '"  class="eon-text"> <img src="' + data.photo_url + '" class="postmodalpfp" alt="" > ' + data.name + verify + ' </button><ul class="navbar-nav mr-auto"></ul> <button onclick="' + commentFunc + '" class="eon-text navbtnicon posticonnavbtn animated fadeInUp delay1"><i class="material-icons">comment</i> <span>' + data.comments + '<span></button> <button onclick="' + infoFunc + '" class="eon-text navbtnicon animated fadeInUp delay2"><i class="material-icons">info</i></button> </nav><hr> <br><br><blockquote class="blockquote"><p class="mb-0">' + caption + '</p></blockquote>' + tagselement + '<br><br>' + commentPreview + promote + '</div></div></div>'
    $('#postfull').html(a)
    addWaves()
  }
  
  
  async function addComment(id) {
    text = document.getElementById('commentbox').value
    
    if (text == "" || text == " " || text == "  ") {
      Snackbar.show({showAction: false,pos: 'bottom-center', text: 'You must include content.' })
      return;
    }
    
    if (document.getElementById('commentbox').value.length > 200) {
      $('#commentModal').modal('toggle')
      error('Too many characters. The limit is 200.')
      return;
    }
    
    // Approved. Add comment.
    
    document.getElementById('commentbox').value = ''
    $('#nocomments').addClass('hidden')
    updatechars()
    updatecommentbtns(id)
    
    console.log(id);
    
    doc = await db.collection('new_posts').doc(id).collection('comments').add({
      content: text,
      name: cacheuser.username,
      uid: user.uid,
      photo_url: cacheuser.url,
      username: cacheuser.username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      likes: 0,
      replies: 0,
      status: true,
    })
    
    query = await db.collection('new_posts').doc(id)
    .collection('comments')
    .orderBy('timestamp', 'desc')
    .where('uid', '==', user.uid)
    .limit(1)
    .get()
    build_comments(query.docs, true)
    
    await db.collection('new_posts').doc(id).collection('comments').doc(doc.id).collection('likes').doc('a').set({status: false})
    await db.collection('new_posts').doc(id).collection('comments').doc(doc.id).collection('replies').doc('a').set({status: false})
  }
  
  function updatechars() { 
    window.setTimeout(()=>{length=document.getElementById('commentbox').value.length;document.getElementById('charcount').innerHTML='Post Comment ('+length+'/200 characters)';if(length>200){$('#charcount').removeClass('btn-eon-one');$('#charcount').addClass('btn-eon-four');$('#charcount').removeClass('yellow');$('#charcount').addClass('shake');$('#charcount').removeClass('infinite');} else{if(length>=190){$('#charcount').removeClass('btn-eon-one');$('#charcount').addClass('yellow');$('#charcount').removeClass('btn-eon-four');$('#charcount').addClass('pulse');$('#charcount').removeClass('shake');$('#charcount').addClass('infinite');} else{if(length>=180){$('#charcount').removeClass('btn-eon-one');$('#charcount').addClass('yellow');$('#charcount').removeClass('btn-eon-four');$('#charcount').addClass('pulse');$('#charcount').removeClass('shake');$('#charcount').removeClass('infinite');} else{$('#charcount').addClass('btn-eon-one');$('#charcount').removeClass('btn-eon-four');$('#charcount').removeClass('shake');$('#charcount').removeClass('yellow');$('#charcount').removeClass('infinite');}}}},10);    
  }
  
  function updatecommentbtns(id) {
    $(`#${id}commentCount`).html(parseInt($(`#${id}commentCount`).html()) + 1);
    $(`#${id}usercommentCount`).html(parseInt($(`#${id}usercommentCount`).html()) + 1);
    $(`.${id}commentCounttrend`).html(parseInt($(`#${id}commentCount`).html()) + 1);
    $(`#${id}commentCountrel`).html(parseInt($(`#${id}commentCountrel`).html()) + 1);
  }
  
  async function loadComments(id, poster) {
    
    loader = $('#commentLoader');
    loader.removeClass('fadeOut');
    loader.removeClass('hidden');
    
    $('#commentModal').modal('toggle')
    
    if (id == sessionStorage.getItem('viewing')) {
      // Already loaded, stop and just turn on modal (stop loading as well).
      loader.addClass('fadeOut');
      sessionStorage.setItem('viewing', id)
      window.setTimeout(() => {
        loader.addClass('hidden');
        history.pushState(null, "", "?comments=" + id)
      }, 450)
      return;
    }
    
    document.getElementById('returntouser').onclick = function () {
      sessionStorage.setItem('skiponce123', 'true')
      usermodal(poster)
    }
    
    document.getElementById('returntopost').onclick = function () {
      sessionStorage.setItem('skiponce123', 'true')
      viewpost(id)
    }
    
    document.getElementById('charcount').onclick = function () {
      addComment(id)
    }
    
    sessionStorage.setItem('viewing', id)
    
    $('#commentsbox').empty()
    
    query = await db.collection('new_posts').doc(id)
    .collection('comments')
    .where('status', '==', true)
    .limit(8)
    .get()
    window.lastVisibleComment = query.docs[query.docs.length - 1]
    build_comments(query.docs, false)
    
    history.pushState(null, "", "?comments=" + id)
    
    loader.addClass('fadeOut');
    window.setTimeout(() => {
      loader.addClass('hidden');
    }, 450)
  }
  
  async function load_next_comments() {
    query = await db.collection('new_posts').doc(id)
    .collection('comments')
    .where('status', '==', true)
    .startAfter(lastVisible)
    .limit(8)
    .get()
    window.lastVisibleComment = query.docs[query.docs.length - 1]
    build_comments(query.docs, false)
  }
  
  async function deleteComment(comment, post) {
    // Safe to have delete logic here because by design users have delete permission to their own documents.
    await db.collection('new_posts').doc(post).collection('comments').doc(comment).delete()
    $('#commentitem' + comment).addClass('animated'); $('#commentitem' + comment).addClass('zoomOut');
    window.setTimeout(() => {
      $('#commentitem' + comment).remove()
      resizeCommentGridItems()
      Snackbar.show({text: "Comment was deleted."})
    }, 800)
  }
  async function build_comments(query, self) {
    
    for (let i = 0; i < query.length; i++) {
      
      y = document.createElement('div');
      y.classList.add('top_level_comment');
      
      timeFormatted = timeago.format(query[i].data().timestamp.toDate(), 'en_US');
      
      userlikedoc = await db.collection('new_posts').doc(sessionStorage.getItem('viewing')).collection('comments').doc(query[i].id).collection('likes').doc(user.uid).get()
      if (userlikedoc.exists && userlikedoc.data().status) {
        desiredLikeAction = 'unlikeComment'
        desiredLikeAction2 = 'heartactive'
        desiredLikeAction3 = 'favorite'
      }
      else {
        desiredLikeAction = 'likeComment'
        desiredLikeAction2 = 'heart'
        desiredLikeAction3 = 'favorite_border'
      }
      // if (userlikedoc.exists && userlikedoc.data().bookmark_status) {
      //     desiredBookAction = 'unlike'
      //     desiredBookAction2 = 'heartactive'
      //     desiredBookAction3 = 'favorite'
      // }
      // else {
      //     desiredBookAction = 'like'
      //     desiredBookAction2 = 'heart'
      //     desiredBookAction3 = 'favorite_border'
      // }
      verify = ''; if (typeof(cacheverify) == 'undefined') {verifyDoc = await db.collection('app').doc('verified').get()
      window.cacheverify = verifyDoc.data().verified; window.verifySnippet = verifyDoc.data().verifiedSnippet}
      if (cacheverify.includes(query[i].data().uid)) {
        verify = verifySnippet
      }
      
      if (query[i].data().uid == user.uid) {
        deleteButton = `<a onclick="deleteComment('${query[i].id}', '${sessionStorage.getItem('viewing')}')" class="eon-text blockk" href="#"><i class="material-icons">delete</i></a>`
        reportButton = ''
      }
      else {
        deleteButton = ''
        reportButton = `<a class="eon-text blockk" href="#"><i class="material-icons">report</i></a>`
      }
      
      y.id = 'commentitem' + query[i].id
      
      y.innerHTML = `
      <div class="content">
      <img class="comment_pfp" src="${query[i].data().photo_url}"></img>
      <div class="comment_text"><span>${query[i].data().name}${verify}</span><br>${timeFormatted}</div>
      <div class="comment_meta">
      <div class="dropdown">
      <button aria-expanded="false" aria-haspopup="true" class="eon-text iconbtn" data-toggle="dropdown"><i class="material-icons">more_vert</i></button>
      <div class="dropdown-menu menu accmanagedropdown">
      <center>
      <a class="eon-text blockk" href="#"><i class="material-icons">content_copy</i></a>
      ${reportButton}
      ${deleteButton}
      </center>
      </div>
      </div>
      </div>
      <div class="comment_content">${query[i].data().content}</div>
      <div class="comment_footer">
      <button id="repliesbtn${query[i].id}" onclick="showMore('${query[i].id}')" class="eon-text repliesbtn">
      <i class="material-icons">expand_more</i>
      View Replies (${nFormatter(query[i].data().replies, 1)})
      </button>
      <button id="${query[i].id}commentlikebtn" onclick="${desiredLikeAction}('${query[i].id}')" class="eon-text ${desiredLikeAction2} postbuttons heart iconbtn">
      <i id="${query[i].id}commentlikebtnicon" class="material-icons posticon animated">${desiredLikeAction3}</i> 
      <span id="${query[i].id}commentlikeCount">${query[i].data().likes}</span>
      </button>
      </div>
      <div id="${query[i].id}_comment_replies" class="comment_replies animated fadeIn hidden">
      <div class="floating-label textfield-box">
      <label for="commentReplyField">New Reply</label>
      <input onkeydown="if (event.keyCode == 13) {addReply('${query[i].id}', this.value); this.value = ''}" class="form-control" id="commentReplyField" placeholder="Add a public reply..." type="text">
      </div>
      <div id="${query[i].id}_comment_replies_self"></div>
      </div>
      </div>`
      
      if (self) {
        y.classList.add('animated');
        y.classList.add('zoomIn');
        document.getElementById('commentsbox').prepend(y)
      }
      else {
        document.getElementById('commentsbox').appendChild(y)
      }
    }
    $('#commentsbox').imagesLoaded( () => {
      console.log('Status: All comments loaded.\n');
      addWaves()
      $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
      window.setTimeout(() => {
        // Wait for modal to finish opening.
        resizeCommentGridItems()
        window.setTimeout(() => {
          // Backup
          resizeCommentGridItems()
        }, 525)
      }, 325)
    })
  }
  
  async function likeComment(id) {
    
    document.getElementById(id + 'commentlikebtn').onclick = () => {
      $(`#${id}commentlikebtnicon`).addClass('shake')
      window.setTimeout(() => {
        $(`#${id}likebtnicon`).removeClass('shake')
      }, 600)
    }
    
    $(`#${id}commentlikebtn`).toggleClass('heartactive');
    $(`#${id}commentlikebtnicon`).html('favorite');
    $(`#${id}commentlikebtnicon`).addClass('rubberBand')
    
    window.setTimeout(() => {
      $(`#${id}commentlikebtnicon`).removeClass('rubberBand')    
    }, 600);
    
    $(`#${id}commentlikeCount`).html(parseInt($(`#${id}commentlikeCount`).html()) + 1)
    
    await db.collection('new_posts').doc(sessionStorage.getItem('viewing')).collection('comments').doc(id).collection('likes').doc(user.uid).set({
      status: true,
    }, {merge: true})
    
    window.setTimeout(() => {
      document.getElementById(id + 'commentlikebtn').onclick = () => {
        unlikeComment(post)
      }
    }, 1750);
    
  }
  
  async function unlikeComment(id) {
    document.getElementById(id + 'commentlikebtn').onclick = () => {
      $(`#${id}commentlikebtnicon`).addClass('shake')
      window.setTimeout(() => {
        $(`#${id}likebtnicon`).removeClass('shake')
      }, 600)
    }
    
    $(`#${id}commentlikebtn`).toggleClass('heartactive');
    $(`#${id}commentlikebtnicon`).html('favorite');
    $(`#${id}commentlikebtnicon`).addClass('rubberBand')
    
    window.setTimeout(() => {
      $(`#${id}commentlikebtnicon`).removeClass('rubberBand')    
    }, 600);
    
    $(`#${id}commentlikeCount`).html(parseInt($(`#${id}commentlikeCount`).html()) - 1)
    
    await db.collection('new_posts').doc(sessionStorage.getItem('viewing')).collection('comments').doc(id).collection('likes').doc(user.uid).set({
      status: false,
    }, {merge: true})
    
    window.setTimeout(() => {
      document.getElementById(id + 'commentlikebtn').onclick = () => {
        likeComment(post)
      }
    }, 1750);
  }
  
  async function addReply(id, val) {
    post = sessionStorage.getItem('viewing')
    build_reply({
      username: cacheuser.username,
      uid: user.uid,
      name: cacheuser.username,
      photo_url: cacheuser.url,
      content: val,
      status: true,
      timestamp: new Date,  
    }, id, true)
    doc = await db.collection('new_posts').doc(post).collection('comments').doc(id).collection('replies').add({
      username: cacheuser.username,
      uid: user.uid,
      photo_url: cacheuser.url,
      content: val,
      name: cacheuser.username,
      status: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
  }
  
  async function build_reply(doc, id, self) {
    g = document.createElement("div");
    g.classList.add('comment_reply')
    verify = ''; if (typeof(cacheverify) == 'undefined') {verifyDoc = await db.collection('app').doc('verified').get()
    window.cacheverify = verifyDoc.data().verified; window.verifySnippet = verifyDoc.data().verifiedSnippet}
    if (cacheverify.includes(doc.uid)) {
      verify = verifySnippet
    }
    g.innerHTML = `
    <img src="${doc.photo_url}">
    <span>${doc.content}</span>
    `
    if (self) {
      $(`#${id}_comment_replies_self`).get(0).prepend(g)  
      resizeCommentGridItems()  
      return;
    }
    $(`#${id}_comment_replies`).get(0).appendChild(g)
    resizeCommentGridItems()
  }
  
  function showReplies(id) {
    $(`#${id}_comment_replies`).removeClass('hidden')
    $(`#repliesbtn${id}`).html('<i class="material-icons">expand_less</i>View Replies')
    $(`#repliesbtn${id}`).get(0).onclick = () => {
      hideReplies(id)
    }
    resizeCommentGridItems()
  }
  
  function hideReplies(id) {
    $(`#${id}_comment_replies`).addClass('hidden')
    $(`#repliesbtn${id}`).html('<i class="material-icons">expand_more</i>View Replies')
    $(`#repliesbtn${id}`).get(0).onclick = () => {
      showReplies(id)
    }
    resizeCommentGridItems()
  }
  
  async function showMore(id) {
    $(`#${id}_comment_replies`).removeClass('hidden')
    $(`#repliesbtn${id}`).html('<i class="material-icons">expand_less</i>Hide Replies')
    $(`#repliesbtn${id}`).get(0).onclick = () => {
      hideReplies(id)
    }
    
    query = await db.collection('new_posts').doc(sessionStorage.getItem('viewing'))
    .collection('comments').doc(id).collection('replies')
    .orderBy('timestamp', 'desc')
    .where("status", "==", true).limit(8).get()
    
    window["lastVisible" + id] = query.docs[query.docs.length - 1]
    
    for (let i = 0; i < query.docs.length; i++) {
      build_reply(query.docs[i].data(), id, false)
    }
    addWaves()
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
    resizeCommentGridItems()
  }
  
  async function showNext(id) {
    // #${id}_comment_replies
    // Last visible window["lastVisible" + id]
  }
  
  $('#postModal').on('hidden.bs.modal', function () {
    if (sessionStorage.getItem('skiponce1234') == "true") {
      sessionStorage.setItem('skiponce1234', "false")
    }
    else {
      
      if (sessionStorage.getItem('currentab') == null || sessionStorage.getItem('currentab') == "null") {
        window.history.pushState(null, '', 'app.html')
      }
      else {
        window.history.pushState(null, '', 'app.html?tab=' + sessionStorage.getItem('currentab'));
      }
    }
    
  });
  
  $('#commentModal').on('hidden.bs.modal', function () {
    if (sessionStorage.getItem('skiponce123') == "true") {
      sessionStorage.setItem('skiponce123', "false")
    }
    else {
      
      if (sessionStorage.getItem('currentab') == null || sessionStorage.getItem('currentab') == "null") {
        window.history.pushState(null, '', 'app.html')
      }
      else {
        window.history.pushState(null, '', 'app.html?tab=' + sessionStorage.getItem('currentab'));
      }
    }
    
  });
  
  $('#userModal').on('hidden.bs.modal', function () {
    if (sessionStorage.getItem('skiponce3') == "true") {
      sessionStorage.setItem('skiponce3', "false")
    }
    else {
      
      if (sessionStorage.getItem('currentab') == null || sessionStorage.getItem('currentab') == "null") {
        window.history.pushState(null, '', 'app.html')
      }
      else {
        window.history.pushState(null, '', 'app.html?tab=' + sessionStorage.getItem('currentab'));
      }
    }
  });
  
  $('#infoModal').on('hidden.bs.modal', function () {
    x = sessionStorage.getItem('tocomments')
    if (x == "true") {
      sessionStorage.setItem('tocomments', false)
    }
    else {
      x = sessionStorage.getItem('touser')
      if (x == "true") {
        sessionStorage.setItem('touser', false)
      }
      else {
        if (sessionStorage.getItem('currentab') == null || sessionStorage.getItem('currentab') == "null") {
          window.history.pushState(null, '', 'app.html')
        }
        else {
          window.history.pushState(null, '', 'app.html?tab=' + sessionStorage.getItem('currentab'));
        }
      }
    }
    
  });
  
  $(function () {
    $(".heart").on("click", function () {
      $(this).toggleClass("is-active");
    });
  });
  
  async function deletepost(id, credentials) {
    if (credentials !== user.uid) {
      alert('Suspicious activity detected. Your account has been flagged.')
      reportUser(user.uid)
      return;
    }
    
    document.getElementById('deletebtnfrominfo').classList.remove('fadeIn')
    document.getElementById('deletebtnfrominfo').innerHTML = '<i class="material-icons gradicon">restore_from_trash</i> deleting...';
    document.getElementById('deletebtnfrominfo').classList.add('deletebtnexpandeddone')
    document.getElementById('deletebtnfrominfo').classList.add('fadeOutUp')
    
    await db.collection('new_posts').doc(id).update({
      status: false,
    })
    
    // Apply hinge effect to random elements.
    
    $('#infomodallist').children().each(function(i, el) {
      randomnum = Math.floor(Math.random() * 3)
      if (randomnum == 0 || randomnum == 1) {
        el.classList.add('animated'); el.classList.add('hinge'); el.classList.add('slower')
        bam = Math.floor(Math.random() * 3); el.style.animationDelay = bam + 's'
      }
    })
    
    $('#infobtngroup').children().each(function(i, el) {
      randomnum = Math.floor(Math.random() * 3)
      if (randomnum == 0 || randomnum == 1) {
        el.classList.add('animated'); el.classList.add('hinge'); el.classList.add('slower')
        bam = Math.floor(Math.random() * 3); el.style.animationDelay = bam + 's'
      }
    })
    
    // After 5 seconds, remove all hinge effect from the elements
    
    
    window.setTimeout(function() {
      $('#infobtngroup').children().each(function(index) {
        this.classList.remove('animated')
        this.classList.remove('hinge')
        this.classList.remove('slower')
      })
      
      $('#infomodallist').children().each(function(index) {
        this.classList.remove('animated')
        this.classList.remove('hinge')
        this.classList.remove('slower')
      })
    }, 5000)
    
    window.setTimeout(function() {
      $('#infoModal').modal('hide')
      
      Snackbar.show({showAction: false,pos: 'bottom-center', text: 'Your post was deleted.' })
      
      $(`.${id}shell`).addClass('animated')
      $(`.${id}shell`).addClass('zoomOut')
      
      window.setTimeout(() => {
        $(`.${id}shell`).remove()
      }, 500)
      
      localStorage.removeItem('currentlyviewinguser')
      
      document.getElementById('deletebtnfrominfo').onclick = function () {
        document.getElementById('deletebtnfrominfo').innerHTML = '<i class="material-icons gradicon">delete_forever</i> confirm';
        document.getElementById('deletebtnfrominfo').classList.add('deletebtnexpanded')
        document.getElementById('deletebtnfrominfo').classList.add('fadeIn')
        document.getElementById('deletebtnfrominfo').onclick = function() {
          deletepost(post, doc.data().uid)
        }
      }
      
      document.getElementById('deletebtnfrominfo').innerHTML = '<i class="material-icons gradicon">delete</i>'
      document.getElementById('deletebtnfrominfo').classList.remove('deletebtnexpanded')
      document.getElementById('deletebtnfrominfo').classList.remove('deletebtnexpandeddone')
      
    }, 4000)
    
  }