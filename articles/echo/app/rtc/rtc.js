firebase.initializeApp({
  apiKey: 'AIzaSyDyiJGiWlgFaMtJA2lerw4lUkGK76Qoxvs',
  authDomain: 'eongram-87169.firebaseapp.com',
  databaseURL: 'https://eongram-87169.firebaseio.com',
  projectId: 'eongram-87169',
  storageBucket: 'eongram-87169.appspot.com',
  messagingSenderId: '725793838303',
  appId: '1:725793838303:web:f23c748b3985225c5c056a',
});

window.db = firebase.firestore();
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

sessionStorage.setItem('muted', 'false')
sessionStorage.setItem('deafened', 'false')
sessionStorage.setItem('skiponeu', 'false');
sessionStorage.setItem('skiponeu2', 'false');
sessionStorage.setItem('justsent', 'false')
window.setInterval(() => {
  sessionStorage.setItem('skiponeu', 'false');
  sessionStorage.setItem('skiponeu2', 'false');
  sessionStorage.setItem('justsent', 'false')
}, 30000);

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    window.user = firebase.auth().currentUser;
    doconnect();
  } else {
    transfer('index.html?return=' + window.location.href);
  }
});

function doconnect() {
  window.peer = new Peer({host: '34.75.0.77', port:3000, secure: true});
  peer.on('open', function (id) {
    console.log('ECP | Opened connection with ID: ' + id);
    console.log('------ STATUS EVENTS BELOW --------');

    var urlParams = new URLSearchParams(window.location.search);
    window.uid = urlParams.get('target');
    window.type = urlParams.get('type');

    if (uid == null || uid == undefined) {
      transferdark('app.html');
      return;
    }

    alphabeticalized = [];
    alphabeticalized.push(user.uid);
    alphabeticalized.push(uid);
    alphabeticalized.sort(function (a, b) {
      var textA = a.toUpperCase();
      var textB = b.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    window.string = alphabeticalized[0].toString() + alphabeticalized[1].toString();

    db.collection('rtc')
      .doc(string + type)
      .onSnapshot(function (doc) {
        if (doc.data().skiddy == 'GONE') {
          showcomplete();
        }
        db.collection('rtc').doc(string + type).update({
          lfg: 'na'
        })
        if (doc.data().lfg == 'ya') {
          if (sessionStorage.getItem('skiponeu') == 'true') {
            sessionStorage.setItem('skiponeu2', 'false');
            sessionStorage.setItem('skiponeu', 'false');
          } else {
            db.collection('rtc')
              .doc(string + type)
              .update({
                lfg: 'na',
              })
              .then(function () {
                if (sessionStorage.getItem('skiponeu2') == 'true') {
                  sessionStorage.setItem('skiponeu2', 'false');
                  console.log('ECP | Avoided reload loop with sessionStorage: ' + sessionStorage.getItem('skiponeu2') + ' and ' + sessionStorage.getItem('skiponeu') );
                } else {
                  window.location.reload();
                }
              });
          }
        }

        if (doc.data().sent !== 'nothing') {
          if (doc.data().sent == undefined) {
            db.collection('rtc').doc(string + type).update({
              sent: 'nothing',
            })
          }
          else {
            if (sessionStorage.getItem('justsent') == 'true') {
              sent(doc.data().sent)
              sessionStorage.setItem('justsent', 'false');
            } else {
              db.collection('rtc').doc(string + type).update({
                sent: 'nothing',
              })
              receiveda(doc.data().sent)
            }

          }
        }
      });

    checkstrangestuf(string + type);

    $('#waitingtext').removeClass('hidden');
    $('#loadingtext').removeClass('fadeIn');
    $('#loadingtext').addClass('fadeOutUp');

    $('#waitingid').html('Private Room ID: ' + string + type);
    if (type == 'av') {
      $('#waitingtype').html('Private Room Type: Video & Audio Chat');
    } else {
      $('#waitingtype').html('Private Room Type: Audio Chat');
    }

    if (alphabeticalized[0] == user.uid) {
      // I am the host because I have a more alphabeticalized name
      db.collection('rtc')
        .doc(string + type)
        .set({
          hostready: false,
        })
        .then(function () {
          window.setTimeout(function () {
            db.collection('rtc')
              .doc(string + type)
              .set({
                hostready: id,
              })
              .then(function () {
                peer.on('disconnected', function () {
                  window.close();
                });
                peer.on('connection', (conn) => {
                  showconnected();

                  videoya = true;
                  if (type == 'a') {
                    videoya = false;
                  } else {
                    // Stream for client
                    navigator.getUserMedia({
                        video: true,
                        audio: false
                      },
                      function (stream) {
                        window.mystreamfinal = stream
                        document.getElementById('mine').srcObject = stream;
                        document.getElementById('mine').play();
                      }
                    );
                  }

                  // Stream for peer
                  navigator.getUserMedia({
                      video: videoya,
                      audio: true
                    },
                    function (stream) {
                      window.mystreamfinal = stream
                      call = peer.call(conn.peer, stream);
                      call.on('stream', function (stream) {
                        window.theirstreamfinal = stream
                        // `stream` is the MediaStream of the remote peer.
                        // Here you'd add it to an HTML video/canvas element.
                        document.getElementById('theirs').srcObject = stream;
                        document.getElementById('theirs').play();
                        window.bstream = stream;
                        setInterval(() => {
                          if (bstream.active == false) {
                            clearInterval();
                            showcomplete();
                          }
                        }, 1000);
                      });
                    }
                  );

                  window.conn = conn;
                  conn.on('data', (data) => {
                    console.log(data);
                  });
                  conn.on('open', () => {});
                });
              });
          }, 2500);
        });
    } else {
      // I am not the host, so wait until the host is ready.
      listener = db
        .collection('rtc')
        .doc(string + type)
        .onSnapshot(function (doc) {
          if (doc.exists == false) {
            db.collection('rtc')
              .doc(string + type)
              .set({
                enabled: true,
              })
              .then(function () {
                window.location.reload();
              });
          }
          if (doc.data().hostready !== false) {
            console.log('bop');
            // Host is ready (set it to false again)
            window.conn = peer.connect(doc.data().hostready);
            conn.on('open', () => {
              listener();
            });
            conn.on('data', (data) => {
              console.log(data);
            });
            peer.on('disconnected', function () {
              showcomplete();
            });
            peer.on('call', function (call) {
              showconnected();

              // Answer the call, providing our mediaStream
              videoya = true;
              if (window.type == 'a') {
                videoya = false;
              } else {
                // Stream for client
                navigator.getUserMedia({
                  video: true,
                  audio: false
                }, function (stream) {
                  window.mystreamfinal = stream
                  document.getElementById('mine').srcObject = stream;
                  document.getElementById('mine').play();
                });
              }

              // Stream for peer
              navigator.getUserMedia({
                video: videoya,
                audio: true
              }, function (stream) {
                window.mystreamfinal = stream
                call.answer(stream);
                call.on('stream', function (stream) {
                  window.theirstreamfinal = stream
                  document.getElementById('theirs').srcObject = stream;
                  window.astream = stream;
                  setInterval(() => {
                    if (astream.active == false) {
                      clearInterval();
                      peer.disconnect();
                      showcomplete();
                    }
                  }, 1000);
                  document.getElementById('theirs').play();
                });
              });
            });

            // doc.data().hostready is the other person peer ID
            db.collection('rtc')
              .doc(string + type)
              .set({
                hostready: false,
              });
          }
        });
    }
  });
}

function showconnected() {
  $('#unconnected').addClass('animated');
  $('#unconnected').addClass('fadeOutUp');
  $('#connected').removeClass('hidden');

  if (type == 'a') {
    $('#cameorabtn').addClass('hidden');
  }

  db.collection('users').doc(user.uid).get().then(function(doc) {
    document.getElementById('userimgme').setAttribute('src', doc.data().url)
    document.getElementById('userimgme').classList.remove('hidden')
    document.getElementById('usertextme').innerHTML = doc.data().name
  })

  db.collection('users').doc(uid).get().then(function (doc) {
    document.getElementById('userimgthem').setAttribute('src', doc.data().url)
    document.getElementById('userimgthem').classList.remove('hidden')
    document.getElementById('usertextthem').innerHTML = doc.data().name

    $('#disconnectbtn').get(0).onclick = function () {
      peer.disconnect();
      db.collection('rtc')
        .doc(string + type)
        .update({
          skiddy: 'GONE',
        })
        .then(function () {
          window.setTimeout(function () {
            db.collection('rtc')
              .doc(string + type)
              .update({
                skiddy: 'PAPA',
              });
          }, 500);
        });
      showcomplete();
    };
    addWaves();
  });
}

function showcomplete() {
  $('#complete').removeClass('hidden');
  $('#connected').addClass('animated');
  $('#connected').addClass('fadeOutUp');
}

function checkstrangestuf(str) {
  db.collection('rtc').doc(str).update({
    lfg: 'ya',
  }).then(function () {
    sessionStorage.setItem('skiponeu', 'true');
    sessionStorage.setItem('skiponeu2', 'true');
  })
}

function send(sentitem) {
  sessionStorage.setItem('justsent', 'true');
  db.collection('rtc').doc(string + type).update({
    sent: sentitem,
  }).then(function() {
    window.setTimeout(function() {
      db.collection('rtc').doc(string + type).update({
        sent: 'nothing',
      })
    })
  })
}

function receiveda(exp, sent) {
  if (sent) {
    console.log('ECP | Playing sent expression: ' + exp);
  }
  else {
    console.log('ECP | Received expression: ' + exp);
  }

  switch (exp) {
    case 'echo-code-mute':
        document.getElementById('theirs').muted = true
        $('#mutethem').removeClass('hidden')
        $('#mutethem').addClass('zoomIn')
        $('#mutethem').removeClass('zoomOut')
      break;
    case 'echo-code-unmute':
      $('#mutethem').removeClass('hidden')
      $('#mutethem').addClass('zoomOut')
      $('#mutethem').removeClass('zoomIn')
      document.getElementById('theirs').muted = false
      break;
    case 'echo-code-deafen':
        $('#deafenthem').removeClass('hidden')
        $('#deafenthem').addClass('zoomIn')
        $('#deafenthem').removeClass('zoomOut')
        document.getElementById('theirs').muted = true
      break;
    case 'echo-code-undeafen':
      $('#deafenthem').removeClass('hidden')
      $('#deafenthem').addClass('zoomOut')
      $('#deafenthem').removeClass('zoomIn')
      $('#mutethem').removeClass('hidden')
      $('#mutethem').addClass('zoomOut')
      $('#mutethem').removeClass('zoomIn')
      document.getElementById('theirs').muted = false
      break;
    default:
      EXPRESSION_Default(exp, sent)
      break;
  }
}

function sent(exp) {
  if (exp !== 'echo-code-unmute' && exp !== 'echo-code-mute' && exp !== 'echo-code-undeafen' && exp !== 'echo-code-deafen') {
    console.log('ECP | Sent expression: ' + exp);
    Snackbar.show({showAction: false,pos: 'bottom-center',text: "You sent expression: " + exp.charAt(0).toUpperCase() + exp.slice(1)})
    receiveda(exp, true)
  }
}

function togglemute(hide, fromdeafen) {
  $('#muteme').removeClass('hidden')
  sessionStorage.setItem('justsent', 'true');
  if (sessionStorage.getItem('muted') == 'true') {
    if (!hide) {
      Snackbar.show({showAction: false,pos: 'bottom-center',text: "You have been unmuted."})
      $('#muteme').addClass('zoomOut')
      $('#muteme').removeClass('zoomIn')
    }
    // If unmuting and deafened, undeafen
    if (sessionStorage.getItem('deafened') == 'true') {
      toggledeafen('true')
    }

    $('#mutebtn').html('<i class="material-icons animate bounceIn">mic</i>')
    sessionStorage.setItem('muted', 'false') 
    if (!fromdeafen) {
      db.collection('rtc').doc(string + type).update({
        sent: 'echo-code-unmute'
      }).then(function() {
        console.log('ECP | Unmuted client'); 
      })
    }
  }
  else {
    if (!hide) {
      $('#muteme').addClass('zoomIn')
      $('#muteme').removeClass('zoomOut')
      Snackbar.show({showAction: false,pos: 'bottom-center',text: "You have been muted."})
    }
    $('#mutebtn').html('<i class="material-icons animate bounceIn">mic_off</i>')
    sessionStorage.setItem('muted', 'true') 
    if (!fromdeafen) {
      db.collection('rtc').doc(string + type).update({
        sent: 'echo-code-mute'
      }).then(function() {
        console.log('ECP | Muted client'); 
      })
    }
  }
}

function toggledeafen(hide) {
  $('#deafenme').removeClass('hidden')
  if (sessionStorage.getItem('deafened') == 'true') {
    $('#deafenme').addClass('zoomOut')
    $('#deafenme').removeClass('zoomIn')
    $('#deafenbtn').html('<i class="material-icons animated bounceIn">hearing</i>')
    if (!hide) {
      Snackbar.show({showAction: false,pos: 'bottom-center',text: "You have been undeafened and unmuted."})
    }
    sessionStorage.setItem('deafened', 'false') 
    document.getElementById('theirs').muted = false

    // If muted trying to undeafen, mute them, then toggle mute
    sessionStorage.setItem('muted', 'true')
    togglemute(true, true)
    $('#muteme').addClass('zoomOut')
    $('#muteme').removeClass('zoomIn')

    sessionStorage.setItem('justsent', 'true');
    db.collection('rtc').doc(string + type).update({
      sent: 'echo-code-undeafen'
    })
  }
  else {
    $('#deafenme').addClass('zoomIn')
    $('#deafenme').removeClass('zoomOut')
    $('#deafenbtn').html('<i class="material-icons animated bounceIn">hearing_disabled</i>')
    if (!hide) {
      Snackbar.show({showAction: false,pos: 'bottom-center',text: "You have been deafened and muted."})
    }
    sessionStorage.setItem('deafened', 'true') 
    document.getElementById('theirs').muted = true

    // If unmuted trying to deafen, mute 
    if (sessionStorage.getItem('muted') == 'false') {
      togglemute(true, true)
    }
    sessionStorage.setItem('justsent', 'true');
    db.collection('rtc').doc(string + type).update({
      sent: 'echo-code-deafen'
    })
  }
}

function getinfo() {
  $("#infoModal").modal('toggle')
  $('#roomid').html(string)
  if (type == 'a') {
    $('#roomtype').html('Audio Only')
    return;
  }
  $('#roomtype').html('Video & Audio')
}