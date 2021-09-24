

//Firebase Functions


function signOut() {
  firebase.auth().signOut();
  location.reload()
}

var userPicElement = document.getElementById('user-pic');
var userNameElement = document.getElementById('user-name');
var userEmailElement = document.getElementById('user-email');

function getProfilePicUrl() {
  return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
}

function getUserName() {
  return firebase.auth().currentUser.displayName;
}

function getUserEmail() {
  return firebase.auth().currentUser.email;
}

function isUserSignedIn() {
  return !!firebase.auth().currentUser;
}

function initFirebaseAuth() {
  firebase.auth().onAuthStateChanged(authStateObserver);
}

function addSizeToGoogleProfilePic(url) {
  if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
    return url + '?sz=150';
  }
  return url;
}

function user() {
  return firebase.auth().currentUser.uid
}

function authStateObserver(user) {
  if (user) {
    console.log('User is signed in')

    var profilePicUrl = getProfilePicUrl();
    var userName = getUserName();
    var userEmail = getUserEmail();

    document.getElementById('username222').innerHTML = getUserName();
    userPicElement.src = addSizeToGoogleProfilePic(profilePicUrl)
    userNameElement.textContent = userName;
    userEmailElement.textContent = userEmail;

    refresh()



  }
  else {
    window.location.replace('index.html')
  }
  document.getElementById('loader').classList.add('fadeOutUp')

}


function error(error) {
  $('#errorModal').modal('toggle')
  document.getElementById('errMsg').innerHTML = error
}



initFirebaseAuth();

// NOTES


var input = document.getElementById("errorModal");
input.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("errorDismiss").click();
  }
});

var input = document.getElementById("taskcreateInput");
input.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("taskCreateBtn").click();
  }
});

var input = document.getElementById("createInput");
input.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("noteCreateBtn").click();
  }
});

function checkExisting(x) {

  aoie = document.getElementById("createInput").value
  if (aoie.includes("'") || aoie.includes("#") || aoie.includes('"') || aoie.includes("@") || aoie.includes("#") || aoie.includes("$") || aoie.includes("%") || aoie.includes("^") || aoie.includes("&") || aoie.includes("*") || aoie.includes("(") || aoie.includes(")") || aoie.includes("{") || aoie.includes("[") || aoie.includes("]") || aoie.includes("}") || aoie.includes("|") || aoie.includes(';') || aoie.includes(":") || aoie.includes("<") || aoie.includes(",") || aoie.includes(">") || aoie.includes(".") || aoie.includes("?") || aoie.includes("/") || aoie.includes("~") || aoie.includes("`") || aoie.includes("+") || aoie.includes("=")) {
    error('Cannot contain special characters.')
  }
  else {

    db.collection("users").doc(user()).collection('notes').where("enabled", "==", true).get().then(function (querySnapshot) {
      if (querySnapshot.size == 0) {
        var contents = "This is your note!"
        db.collection('users').doc(user()).collection('notes').doc(x).set({
          name: x,
          displayname: x,
          enabled: true,
          starred: false,
          collaborators: [],
          owner: user(),
          created: firebase.firestore.Timestamp.fromDate(new Date()),
          contents: contents
        })
        document.getElementById("createInput").value = '';
        document.getElementById('notewarning').style.display = 'none'
      }
    })

    db.collection("users").doc(user()).collection('notes').where("enabled", "==", true).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots

          if (x == doc.id) {
            error('An existing note already exists. Note was <b>NOT</b> created.')
            document.getElementById("createInput").value = '';
          }
          else {


            var contents = "This is your note!"
            db.collection('users').doc(user()).collection('notes').doc(x).set({
              name: x,
              displayname: x,
              enabled: true,
              starred: false,
              collaborators: [],
              owner: user(),
              created: firebase.firestore.Timestamp.fromDate(new Date()),
              contents: contents
            })
            document.getElementById("createInput").value = '';
            document.getElementById('notewarning').style.display = 'none';
            snackbar('Successfully created note ' + x, '', "", "4000")

          }



        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

}

function refresh() {
  updateCheck()
  window.setTimeout(function () {
    document.getElementById('notescontainer').classList.add('fadeOut')
    document.getElementById('notesboxbox').classList.add('fadeOut')
    document.getElementById('taskscontainer').classList.add('fadeOut')
    document.getElementById('tasksboxbox').classList.add('fadeOut')
    document.getElementById('communitycontainer').classList.add('fadeOut')
    document.getElementById('flashcards').classList.add('fadeOut')
    document.getElementById('flashcardmodalbody').classList.add('fadeOut')
    document.getElementById('commcontainer2container').classList.add('fadeOut')
    document.getElementById('commcontainer').classList.add('fadeOut')
    document.getElementById('messages').classList.add('fadeOut')






  }, 10)

  window.setTimeout(function () {
    notes()
    tasks()
    findColabDoc()
    getPosts()
    getflashcards()
    updateFont()
    getMessages()


  }, 500)
}



function updateFont() {

  a = db.collection('users').doc(user()).get().then(function (doc) {

    if (doc.data().font == 'typewriter') {
      document.getElementById('body').style.fontFamily = "alegreya"
    }
    else {
      document.getElementById('body').style.fontFamily = "roboto"
    }

  })


}




// NOTES SECTION


function createNote() {
  var x = document.getElementById("createInput").value


  checkExisting(x)
  refresh()
}

function quill(athingha) {
  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons

    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent

    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'align': [] }],

    ['link', 'image'],

    ['clean']                                         // remove formatting button
  ];
  new Quill('#' + athingha + 'textEl', { modules: { toolbar: toolbarOptions }, theme: 'snow' });

}

function notes() {


  var data = db.collection('users').doc(user()).collection('notes').doc('example').get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        console.log('Doc exists. Building Notes')

        buildNotes()
      } else {
        db.collection('users').doc(user()).collection('notes').doc('example').set({ init: "init" })
        console.log('Doc doesnt exists. Created & building notes.')
        document.getElementById('notewarning').style.display = 'block';

        buildNotes()
      }
    })

  var data = db.collection('users').doc(user()).collection('notes').get()
    .then((docSnapshot) => {

      if (docSnapshot.size == 1) {
        document.getElementById('notewarning').style.display = 'block';

      } else {
        return

      }
    })



}



function buildNotes() {
  $("#contentcontainer").empty();
  $("#notescontainer").empty();
  $("#starrednotescontainer").empty();

  db.collection("users").doc(user()).collection('notes').where("enabled", "==", true)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {

        a = document.createElement('li')
        c = document.createElement('br')

        a.classList.add('list-group-item')
        a.style.backgroundColor = '#313131'
        a.classList.add('d-flex')
        a.classList.add('justify-content-between')
        a.classList.add('align-items-center')
        a.classList.add('animated')
        a.classList.add('faster')

        a.id = doc.data().name + 'ButtonEl'

        nonspacename = doc.data().name.split(' ').join('-');

        nonspacenamebacc = doc.data().name.split(' ').join('-');


        e = document.createElement('i')

        if (doc.data().starred == true) {

          e.classList.add('material-icons')
          e.innerHTML = 'star'
          e.style.color = '#6200EE'

        }


        var deleteFunc = "document.getElementById('" + doc.data().name + 'ButtonEl' + "').classList.add('fadeOutUp');db.collection('users').doc(user()).collection('notes').doc('" + doc.data().name + "').delete().then(function() {refresh()});snackbar('Successfully deleted note " + doc.data().displayname + "', '', '', '4000')"
        var starFunc = "db.collection('users').doc(user()).collection('notes').doc('" + doc.data().name + "').get().then(function(doc) {if(doc.data().starred == false) {snackbar('Successfully starred note " + doc.data().name + "', '', '', '4000');db.collection('users').doc(user()).collection('notes').doc('" + doc.data().name + "').update({starred: true})} else {;snackbar('Successfully unstarred note " + doc.data().displayname + "', '', '', '4000'); db.collection('users').doc(user()).collection('notes').doc('" + doc.data().name + "').update({starred: false})}});refresh()"
        a.innerHTML = '<a style="color: white"></a><div style="position: absolute; left: 0px; width: 100%; text-align: left;height: 100%";" class="btn-text-primary waves-float-button "><div style="position: absolute; width: 100%; top: 0;bottom: 0;left: 20px;right: 0;height: 30%;margin: auto;"><div id="' + doc.data().name + 'btnEl">' + doc.data().displayname + '<div style="display: inline-block;" id="' + doc.data().name + 'starredEl"></div></div> </div></div><div><button style="color: black;" onclick="' + deleteFunc + '" class="waves-flat-button btn-outline-primary" type="button"><i class="material-icons">delete</i></button><div style="height: 8px;"> </div><button style="color: black;" onclick="' + starFunc + '" class="waves-flat-button btn-outline-primary" type="button"><i class="material-icons">star</i></button></div>'
        a.onclick = function () {



          document.getElementById('notesboxbox').style.display = 'block'
          document.getElementById('notesboxbox').classList.remove('fadeOut')
          document.getElementById('notesboxbox').classList.add('fadeIn')

          var parent = document.getElementById('contentcontainer')

          // Remove all elements from content div
          for (var i = 0, len = parent.childElementCount; i < len; ++i) { parent.children[i].style.display = 'none'; parent.children[i].classList.remove('animated'); parent.children[i].classList.remove('fadeIn') }

          //Show content element

          document.getElementById(doc.data().name.split(' ').join('-') + 'textEl').style.display = 'block';
          document.getElementById(doc.data().name.split(' ').join('-') + 'textEl').classList.add('animated')
          document.getElementById(doc.data().name.split(' ').join('-') + 'textEl').classList.add('fadeIn')

          document.getElementById(doc.data().name + 'titleEl').style.display = 'block';
          document.getElementById(doc.data().name + 'titleEl').classList.add('animated')
          document.getElementById(doc.data().name + 'titleEl').classList.add('fadeIn');

          document.getElementById('addColabbtnEl').onclick = function () {
            addColab(doc.data().name)
          }

          document.getElementById(doc.data().name + 'saveEl').style.display = 'block'

          quill(doc.data().name.split(' ').join('-'))

        };

        b = document.createElement('div')
        b.innerHTML = doc.data().contents
        b.id = nonspacename + 'textEl'
        b.style.display = 'none'
        b.contentEditable = 'true'
        b.addEventListener('keydown', function (e) {


          document.getElementById(doc.data().name + 'saveElEl').innerHTML = "Save (Unsaved)"
          console.log('unsaved')
        })


        d = document.createElement('h3')
        d.innerHTML = doc.data().displayname
        d.id = doc.data().name + 'titleEl'
        d.style.display = 'none'
        d.contentEditable = 'true'
        d.addEventListener('keydown', function (e) {

          document.getElementById(doc.data().name + 'saveElEl').innerHTML = "Save (Unsaved)"
          console.log('unsaved')
        })


        f = document.createElement('center')


        var fonclick = 'var content = document.getElementById("' + nonspacename + "textEl" + '").innerHTML;db.collection("users").doc(user()).collection("notes").doc("' + doc.data().name + '").update({contents: content });snackbar("Successfully saved ' + doc.data().displayname + '.", "", "", "1800"); document.getElementById("' + doc.data().name + 'saveElEl").innerHTML = "Save";var content = document.getElementById("' + doc.data().name + 'titleEl").innerHTML;document.getElementById("' + doc.data().name + 'btnEl").innerHTML = content;db.collection("users").doc("' + user() + '").collection("notes").doc("' + doc.data().name + '").update({displayname: content})'

        f.innerHTML = "<br><br> <button id='" + doc.data().name + "saveElEl' onclick='" + fonclick + "' style='display: inline-block;' class='waves-flat-button btn-outline-primary'>Save</button><div style='width: 12px; display: inline-block'></div>"

        f.id = doc.data().name + 'saveEl'

        g = document.createElement('button')
        g.style.display = "inline-block"
        g.onclick = function () {
          colab(doc.data().displayname, doc.data().name)
        }
        g.classList.add('waves-flat-button')
        g.classList.add('btn-outline-primary')
        g.innerHTML = 'Collaborators'
        g.id = doc.data().name + 'colabBtn'



        if (doc.data().starred == true) {

          document.getElementById('starrednotescontainer').appendChild(a)
          document.getElementById('starrednotescontainer').appendChild(c)
          document.getElementById(doc.data().name + 'starredEl').appendChild(e)

        }

        else {
          document.getElementById('notescontainer').appendChild(a)
          document.getElementById('notescontainer').appendChild(c)
        }

        document.getElementById('contentcontainer').appendChild(d)
        document.getElementById('contentcontainer').appendChild(b)
        document.getElementById('contentcontainer').appendChild(f)
        document.getElementById(doc.data().name + 'saveEl').appendChild(g)


        textElement = nonspacename + 'textEl'



        nonspacename = doc.data().name.split(' ').join('-');


        var docName = doc.data().name


        db.collection("users").doc(user()).collection('notes').doc(doc.data().name)
          .onSnapshot(function (doc) {
            if (sessionStorage.getItem('a') == '1') {

            }
            else {

              document.getElementById(doc.data().name.split(' ').join('-') + 'textEl').innerHTML = doc.data().contents


            }
          });



        addWaves()










      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });


  document.getElementById('starrednotescontainer').classList.remove('fadeOut')
  document.getElementById('notescontainer').classList.remove('fadeOut')
  document.getElementById('starrednotescontainer').classList.add('fadeIn')
  document.getElementById('notescontainer').classList.add('fadeIn')



}


function addColab(name) {
  x = document.getElementById('addcolabinput').value
  document.getElementById('addcolabinput').value = ""
  db.collection('users').doc(user()).collection('notes').doc(name).update({
    collaborators: firebase.firestore.FieldValue.arrayUnion(x)
  })

  $('#usersNotes').empty()

  db.collection('users').doc(user()).collection('notes').doc(name).get().then(function (doc) {

    for (let i = 0; i < doc.data().collaborators.length; i++) {

      x = document.createElement('li')
      x.id = doc.data().collaborators[i] + 'El'
      x.classList.add('animated'); x.classList.add('list-group-item'); x.classList.add('d-flex'); x.classList.add('justify-content-between'); x.classList.add('align-items-center')




      var deleteFunc = "db.collection('users').doc('" + user() + "').collection('notes').doc('" + name + "').update({collaborators: firebase.firestore.FieldValue.arrayRemove('" + doc.data().collaborators[i] + "')});document.getElementById('" + doc.data().collaborators[i] + 'El' + "').classList.add('fadeOutUp')"
      x.innerHTML = doc.data().collaborators[i] + '<div><button onclick="' + deleteFunc + '" class="waves-flat-button btn-text-primary"><i class="material-icons">delete</i></button></div>'

      document.getElementById('usersNotes').appendChild(x)

    }

  })

}

function colab(displayname, name) {
  document.getElementById('colabTopItem').innerHTML = "Collaborators - " + displayname
  content = document.getElementById('usersNotes')
  $('#usersNotes').empty()

  db.collection('users').doc(user()).collection('notes').doc(name).get().then(function (doc) {

    for (let i = 0; i < doc.data().collaborators.length; i++) {

      x = document.createElement('li')
      x.id = doc.data().collaborators[i] + 'El'
      x.classList.add('animated'); x.classList.add('list-group-item'); x.classList.add('d-flex'); x.classList.add('justify-content-between'); x.classList.add('align-items-center')




      var deleteFunc = "db.collection('users').doc('" + user() + "').collection('notes').doc('" + name + "').update({collaborators: firebase.firestore.FieldValue.arrayRemove('" + doc.data().collaborators[i] + "')});document.getElementById('" + doc.data().collaborators[i] + 'El' + "').classList.add('fadeOutUp')"
      x.innerHTML = doc.data().collaborators[i] + '<div><button onclick="' + deleteFunc + '" class="waves-flat-button btn-text-primary"><i class="material-icons">delete</i></button></div>'

      document.getElementById('usersNotes').appendChild(x)
      addWaves()

    }

  })

  $('#collabModal').modal('toggle')
  addWaves()
}


function findColabDoc() {
  var array = []; db.collection('users').get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) { array.push(doc.id); })
    for (i = 0; i < array.length; i++) {
      db.collection('users').doc(array[i]).collection('notes').get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          if (doc.data().collaborators == undefined) { } else {
            for (let i = 0; i < doc.data().collaborators.length; i++) {

              if (doc.data().collaborators[i] == firebase.auth().currentUser.email) {



                a = document.createElement('li')
                c = document.createElement('br')

                a.classList.add('list-group-item')
                a.classList.add('d-flex')
                a.classList.add('justify-content-between')
                a.classList.add('align-items-center')
                a.classList.add('animated')
                a.classList.add('faster')

                a.id = doc.data().name + 'ButtonEl'

                nonspacename = doc.data().name.split(' ').join('-');

                nonspacenamebacc = doc.data().name.split(' ').join('-');


                e = document.createElement('i')

                t = document.createElement('i')
                t.classList.add('material-icons')
                t.innerHTML = 'group'
                t.style.color = '#6200EE'


                if (doc.data().starred == true) {

                  e.classList.add('material-icons')
                  e.innerHTML = 'star'
                  e.style.color = '#6200EE'

                }


                var deleteFunc = "document.getElementById('" + doc.data().name + 'ButtonEl' + "').classList.add('fadeOutUp');db.collection('users').doc('" + doc.data().owner + "').collection('notes').doc('" + doc.data().name + "').delete().then(function() {refresh()});snackbar('Successfully deleted note " + doc.data().displayname + "', '', '', '4000')"
                var starFunc = "db.collection('users').doc(" + doc.data().owner + ").collection('notes').doc('" + doc.data().name + "').get().then(function(doc) {if(doc.data().starred == false) {snackbar('Successfully starred note " + doc.data().name + "', '', '', '4000');db.collection('users').doc('" + doc.data().owner + "').collection('notes').doc('" + doc.data().name + "').update({starred: true})} else {;snackbar('Successfully unstarred note " + doc.data().displayname + "', '', '', '4000'); db.collection('users').doc('" + doc.data().owner + "').collection('notes').doc('" + doc.data().name + "').update({starred: false})}});refresh()"
                a.innerHTML = '<a style="color: white"></a><div style="position: absolute; left: 0px; width: 100%; text-align: left;height: 100%";" class="btn-text-primary waves-float-button "><div style="position: absolute; width: 100%; top: 0;bottom: 0;left: 20px;right: 0;height: 30%;margin: auto;"><div id="' + doc.data().name + 'btnEl">' + doc.data().displayname + ' <div style="display: inline-block;" id="' + doc.data().name + 'starredEl"></div></div> </div></div><div><button style="color: black;" onclick="' + deleteFunc + '" class="waves-flat-button btn-outline-primary" type="button"><i class="material-icons">delete</i></button><div style="height: 8px;"> </div><button style="color: black;" onclick="' + starFunc + '" class="waves-flat-button btn-outline-primary" type="button"><i class="material-icons">star</i></button></div>'
                a.onclick = function () {



                  document.getElementById('notesboxbox').style.display = 'block'
                  document.getElementById('notesboxbox').classList.remove('fadeOut')
                  document.getElementById('notesboxbox').classList.add('fadeIn')

                  var parent = document.getElementById('contentcontainer')

                  // Remove all elements from content div
                  for (var i = 0, len = parent.childElementCount; i < len; ++i) { parent.children[i].style.display = 'none'; parent.children[i].classList.remove('animated'); parent.children[i].classList.remove('fadeIn') }

                  //Show content element

                  document.getElementById(doc.data().name.split(' ').join('-') + 'textEl').style.display = 'block';
                  document.getElementById(doc.data().name.split(' ').join('-') + 'textEl').classList.add('animated')
                  document.getElementById(doc.data().name.split(' ').join('-') + 'textEl').classList.add('fadeIn')

                  document.getElementById(doc.data().name + 'titleEl').style.display = 'block';
                  document.getElementById(doc.data().name + 'titleEl').classList.add('animated')
                  document.getElementById(doc.data().name + 'titleEl').classList.add('fadeIn');

                  document.getElementById('addColabbtnEl').onclick = function () {
                    addColab(doc.data().name)
                  }

                  document.getElementById(doc.data().name + 'saveEl').style.display = 'block'

                  quill(doc.data().name.split(' ').join('-'))

                };

                b = document.createElement('div')
                b.innerHTML = doc.data().contents
                b.id = nonspacename + 'textEl'
                b.style.display = 'none'
                b.contentEditable = 'true'
                b.addEventListener('keydown', function (e) {


                  document.getElementById(doc.data().name + 'saveElEl').innerHTML = "Save (Unsaved)"
                })


                d = document.createElement('h3')
                d.innerHTML = doc.data().displayname
                d.id = doc.data().name + 'titleEl'
                d.style.display = 'none'
                d.contentEditable = 'true'
                d.addEventListener('keydown', function (e) {
                  document.getElementById(doc.data().name + 'saveElEl').innerHTML = "Save (Unsaved)"

                })


                f = document.createElement('center')


                var fonclick = 'var content = document.getElementById("' + nonspacename + "textEl" + '").innerHTML;db.collection("users").doc("' + doc.data().owner + '").collection("notes").doc("' + doc.data().name + '").update({contents: content });snackbar("Successfully saved ' + doc.data().displayname + '.", "", "", "1800"); document.getElementById("' + doc.data().name + 'saveElEl").innerHTML = "Save";var content = document.getElementById("' + doc.data().name + 'titleEl").innerHTML;document.getElementById("' + doc.data().name + 'btnEl").innerHTML = content;db.collection("users").doc("' + doc.data().owner + '").collection("notes").doc("' + doc.data().name + '").update({displayname: content})'

                f.innerHTML = "<br><br> <button id='" + doc.data().name + "saveElEl' onclick='" + fonclick + "' style='display: inline-block;' class='waves-flat-button btn-outline-primary'>Save</button><div style='width: 12px; display: inline-block'></div>"

                f.id = doc.data().name + 'saveEl'

                g = document.createElement('button')
                g.style.display = "inline-block"
                g.onclick = function () {
                  colab(doc.data().displayname, doc.data().name)
                }
                g.classList.add('waves-flat-button')
                g.classList.add('btn-outline-primary')
                g.innerHTML = 'Collaborators'
                g.id = doc.data().name + 'colabBtn'

                m = document.createElement('div')
                m.style.display = "inline-block"
                m.style.width = '12px'


                j = document.createElement('button')
                j.classList.add('waves-flat-button')
                j.classList.add('btn-outline-primary')
                j.style.display = 'inline-block'
                j.innerHTML = 'Leave'
                j.onclick = function () {
                  db.collection('users').doc(doc.data().owner).collection('notes').doc(doc.data().name).update({
                    collaborators: firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.email)
                  }).then(function () {
                    refresh()
                  })

                }


                if (doc.data().starred == true) {

                  document.getElementById('starrednotescontainer').appendChild(a)
                  document.getElementById('starrednotescontainer').appendChild(c)
                  document.getElementById(doc.data().name + 'starredEl').appendChild(e)


                }

                else {
                  document.getElementById('notescontainer').appendChild(a)
                  document.getElementById('notescontainer').appendChild(c)
                }

                document.getElementById('contentcontainer').appendChild(d)
                document.getElementById('contentcontainer').appendChild(b)
                document.getElementById('contentcontainer').appendChild(f)
                document.getElementById(doc.data().name + 'saveEl').appendChild(g)
                document.getElementById(doc.data().name + 'saveEl').appendChild(m)
                document.getElementById(doc.data().name + 'saveEl').appendChild(j)
                document.getElementById(doc.data().name + 'btnEl').appendChild(t)





                textElement = nonspacename + 'textEl'



                nonspacename = doc.data().name.split(' ').join('-');


                var docName = doc.data().name


                db.collection("users").doc(doc.data().owner).collection('notes').doc(doc.data().name)
                  .onSnapshot(function (doc) {
                    if (sessionStorage.getItem('a') == '1') {

                    }
                    else {
                      console.log('recieved data')
                      document.getElementById(nonspacename + 'textEl').innerHTML = doc.data().contents

                    }
                  });

                db.collection("users").doc(doc.data().owner).collection('notes').doc(doc.data().name)
                  .onSnapshot(function (doc) {
                    if (sessionStorage.getItem('b') == '1') {

                    }
                    else {
                      console.log('recieved data')
                      document.getElementById(docName + 'titleEl').innerHTML = doc.data().displayname
                    }
                  });


                addWaves()









              }
            }
          }
        })
      })
    }



  })

}




















// TASKS SECTION






















function checkExistingTask(x) {

  var x = document.getElementById("taskcreateInput").value
  var y = document.getElementById("taskdescriptionInput").value
  var z = document.getElementById("taskImportantInput").checked
  var b = document.getElementById("taskDateInput").value

  db.collection("users").doc(user()).collection('tasks').where("enabled", "==", true).get().then(function (querySnapshot) {
    if (querySnapshot.size == 0) {
      db.collection('users').doc(user()).collection('tasks').doc(x).set({
        name: x,
        displayname: x,
        description: y,
        important: z,
        date: b,
        enabled: true,
      })
      document.getElementById("taskcreateInput").value = '';
      document.getElementById('taskwarning').style.display = 'none'
      document.getElementById("taskdescriptionInput").value = '';
    }
  })

  db.collection("users").doc(user()).collection('tasks').where("enabled", "==", true).get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots

        if (x == doc.id) {
          error('An existing task already exists. Task was <b>NOT</b> created.')
          document.getElementById("taskcreateInput").value = '';
        }
        else {


          var contents = "This is your task!"
          db.collection('users').doc(user()).collection('tasks').doc(x).set({
            name: x,
            displayname: x,
            description: y,
            important: z,
            date: b,
            enabled: true,
          })
          document.getElementById("taskcreateInput").value = '';
          document.getElementById("taskdescriptionInput").value = '';
          document.getElementById('taskwarning').style.display = 'none';
          snackbar('Successfully created task ' + x, '', "", "4000")

        }



      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });


}

function createTask() {
  var x = document.getElementById("taskcreateInput").value


  checkExistingTask(x)
  refresh()
}


function tasks() {


  var data = db.collection('users').doc(user()).collection('tasks').doc('example').get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        console.log('Doc exists. Building Tasks')

        buildTasks()
      } else {
        db.collection('users').doc(user()).collection('tasks').doc('example').set({ init: "init" })
        console.log('Doc doesnt exists. Created & building tasks.')
        document.getElementById('taskwarning').style.display = 'block';

        buildTasks()
      }
    })

  var data = db.collection('users').doc(user()).collection('tasks').get()
    .then((docSnapshot) => {

      if (docSnapshot.size == 1) {
        document.getElementById('taskwarning').style.display = 'block';

      } else {
        return

      }
    })



}



function buildTasks() {
  $("#taskcontentcontainer").empty();
  $("#taskscontainer").empty();

  db.collection("users").doc(user()).collection('tasks').where("enabled", "==", true)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {

        a = document.createElement('li')
        c = document.createElement('br')

        a.classList.add('list-group-item')
        a.classList.add('d-flex')
        a.classList.add('justify-content-between')
        a.classList.add('align-items-center')
        a.classList.add('animated')
        a.classList.add('faster')

        a.id = doc.data().name + 'ButtonElTask'
        e = document.createElement('i')

        if (doc.data().important == "true") {
          e.classList.add('material-icons')
          e.innerHTML = 'outlined_flag'
          e.style.color = '#6200EE'

        }


        var deleteFunc = "document.getElementById('" + doc.data().name + 'ButtonElTask' + "').classList.add('fadeOutUp');db.collection('users').doc(user()).collection('tasks').doc('" + doc.data().name + "').delete().then(function() {refresh()});snackbar('Successfully deleted task " + doc.data().name + "', '', '', '4000')"
        if (doc.data().important == true) {
          a.innerHTML = '<a style="color: white"></a><div style="position: absolute; left: 0px; width: 100%; text-align: left;height: 100%";" class="btn-text-primary waves-float-button "><div style="position: absolute; width: 100%; top: 0;bottom: 0;left: 20px;right: 0;height: 22%;margin: auto;"><b id="btnElThing' + doc.data().name + '" style="color: purple">' + doc.data().displayname + '</b><div style="display: inline-block; padding-left: 20px; color: #4f4f4f;" class="animated fadeIn" id="' + doc.data().name + 'daysAway"></div> <div style="display: inline-block;" id="' + doc.data().name + 'starredElTask"></div></div></div><div><button style="color: black;" onclick="' + deleteFunc + '" class="waves-flat-button btn-outline-primary" type="button"><i class="material-icons">delete</i></button> </div></div>'
        }
        else {
          a.innerHTML = '<a style="color: white"></a><div style="position: absolute; left: 0px; width: 100%; text-align: left;height: 100%";" class="btn-text-primary waves-float-button "><div style="position: absolute; width: 100%; top: 0;bottom: 0;left: 20px;right: 0;height: 22%;margin: auto;"><b id="btnElThing' + doc.data().name + '">' + doc.data().displayname + '</b><div style="display: inline-block; padding-left: 20px; color: #4f4f4f;" class="animated fadeIn" id="' + doc.data().name + 'daysAway"></div> <div style="display: inline-block;" id="' + doc.data().name + 'starredElTask"></div></div></div><div><button style="color: black;" onclick="' + deleteFunc + '" class="waves-flat-button btn-outline-primary" type="button"><i class="material-icons">delete</i></button> </div></div>'
        }
        a.onclick = function () {

          document.getElementById('tasksboxbox').style.display = 'block'
          document.getElementById('tasksboxbox').classList.remove('fadeOut')
          document.getElementById('tasksboxbox').classList.add('fadeIn')



          var parent = document.getElementById('taskcontentcontainer')

          // Remove all elements from content div
          for (var i = 0, len = parent.childElementCount; i < len; ++i) {

            parent.children[i].style.display = 'none'; parent.children[i].classList.remove('animated'); parent.children[i].classList.remove('fadeIn')
          }

          //Show content element
          document.getElementById(doc.data().name + 'textElTask').style.display = 'block';
          document.getElementById(doc.data().name + 'textElTask').classList.add('animated')
          document.getElementById(doc.data().name + 'textElTask').classList.add('fadeIn')

          document.getElementById(doc.data().name + 'titleElTask').style.display = 'block';
          document.getElementById(doc.data().name + 'titleElTask').classList.add('animated')
          document.getElementById(doc.data().name + 'titleElTask').classList.add('fadeIn');

          document.getElementById(doc.data().name + 'dateElinContent').style.display = 'block'
          document.getElementById(doc.data().name + 'saveElTask').style.display = 'block'

        };

        b = document.createElement('h5')
        b.innerHTML = doc.data().description
        b.id = doc.data().name + 'textElTask'
        b.style.display = 'none'
        b.contentEditable = 'true'
        b.addEventListener('keydown', function (e) {

          document.getElementById(doc.data().name + 'tasksaveElEl').innerHTML = 'Save (Unsaved)'

        })

        d = document.createElement('h3')
        d.contentEditable = 'true'
        d.addEventListener('keydown', function (e) {

          document.getElementById(doc.data().name + 'tasksaveElEl').innerHTML = 'Save (Unsaved)'
          window.setTimeout(function () {
            document.getElementById('btnElThing' + doc.data().name).innerHTML = document.getElementById(doc.data().name + 'titleElTask').innerHTML
          }, 10)


        })
        d.innerHTML = doc.data().displayname
        d.id = doc.data().name + 'titleElTask'
        d.style.display = 'none'



        f = document.createElement('center')


        var fonclick = 'var content = document.getElementById("' + doc.data().name + "textElTask" + '").innerHTML;db.collection("users").doc("' + user() + '").collection("tasks").doc("' + doc.data().name + '").update({description: content });document.getElementById("' + doc.data().name + 'tasksaveElEl").innerHTML = "Save";var content = document.getElementById("' + doc.data().name + 'titleElTask").innerHTML;document.getElementById("' + doc.data().name + 'tasksaveElEl").innerHTML = "Save";var content = document.getElementById("' + doc.data().name + "titleElTask" + '").innerHTML;db.collection("users").doc("' + user() + '").collection("tasks").doc("' + doc.data().name + '").update({displayname: content });snackbar("Successfully saved " + content + ".", "", "", "1800");'

        f.innerHTML = "<br><br> <button id='" + doc.data().name + "tasksaveElEl' onclick='" + fonclick + "' style='display: inline-block;' class='waves-flat-button btn-outline-primary'>Save</button><div style='width: 12px; display: inline-block'></div>"

        f.id = doc.data().name + 'saveElTask'

        g = document.createElement('p')
        taskDate = doc.data().date

        var currentDateDate = new Date();
        var currentDate = currentDateDate.getFullYear() + '-' + (currentDateDate.getMonth() + 1) + '-' + currentDateDate.getDate();

        var taskBefore = moment(taskDate, 'YYYY/MM/DD');
        var taskAfter = moment(currentDate, 'YYYY/MM/DD');
        var diffDays = taskAfter.diff(taskBefore, 'days');
        diff = diffDays + ''
        diff = diff.split('-').join('');
        if (diff == '1') {
          g.innerHTML = diff + ' day.'
        }
        else {
          g.innerHTML = diff + ' days.'
        }



        h = document.createElement('p')

        h.style.display = 'none'
        h.classList.add('animated')
        h.classList.add('fadeIn')

        taskDate = doc.data().date

        var currentDateDate = new Date();
        var currentDate = currentDateDate.getFullYear() + '-' + (currentDateDate.getMonth() + 1) + '-' + currentDateDate.getDate();

        var taskBefore = moment(taskDate, 'YYYY/MM/DD');
        var taskAfter = moment(currentDate, 'YYYY/MM/DD');
        var diffDays = taskAfter.diff(taskBefore, 'days');
        diff = diffDays + ''
        diff = diff.split('-').join('');
        h.id = doc.data().name + 'dateElinContent'
        if (diff == '1') {
          h.innerHTML = diff + ' day.'
        }
        else {
          h.innerHTML = diff + ' days.'
        }



        document.getElementById('taskscontainer').appendChild(a)
        document.getElementById('taskscontainer').appendChild(c)
        document.getElementById(doc.data().name + 'daysAway').appendChild(g)



        document.getElementById('taskcontentcontainer').appendChild(d)
        document.getElementById('taskcontentcontainer').appendChild(b)
        document.getElementById('taskcontentcontainer').appendChild(h)
        document.getElementById('taskcontentcontainer').appendChild(f)

        if (doc.data().important == "true") {
          document.getElementById(doc.data().name + 'starredElTask').appendChild(e)
        }

        addWaves()










      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });


  document.getElementById('taskscontainer').classList.remove('fadeOut')
  document.getElementById('taskscontainer').classList.add('fadeIn')

}



















// COMMUNITY SECTION


function newPost() {
  title = document.getElementById('communityPostTitleInput').value
  description = document.getElementById('communityPostDescriptionInput').value
  attachment = document.getElementById('communityPostAttachedInput').value

  document.getElementById('communityPostTitleInput').value = ''
  document.getElementById('communityPostDescriptionInput').value = ''
  document.getElementById('communityPostAttachedInput').value = ''

  db.collection('posts').add({
    title: title,
    content: description,
    attachment: attachment,
    upvotes: 0,
    downvotes: 0,
    comments: [],
    author: firebase.auth().currentUser.displayName,
    authorurl: firebase.auth().currentUser.photoURL,
    enabled: true,
    created: firebase.firestore.Timestamp.fromDate(new Date())
  }).then(function (doc) {
    console.log('Doc written with id: ' + doc.id)
    refresh()
  })




}



function getPosts() {

  for (let i = 0; i < 20; i++) {

    $("#commcontainer").empty();
    $("#commcontainer1pinned").empty();
    $("#commcontainer2").empty();


  }


  var f = 2;
  var i = 0;
  var o = 0
  db.collection('posts').where("enabled", "==", true).get().then(function (querySnapshop) {
    querySnapshop.forEach(function (doc) {


      if (o == 0 || o == 1 || o == 2 || o == 3 || o == 4) {

        if (f % 1 === 0) {
          crow = document.createElement('div')
          crow.classList.add('row')
          i++
          crow.id = 'row' + i + '137232ujdisji'
          document.getElementById('commcontainer').appendChild(crow)

        }




      }

      else {


        if (f % 2 === 0) {
          crow = document.createElement('div')
          crow.classList.add('row')
          crow.classList.add('justify-content-center')

          i++
          crow.id = 'row' + i + '137232ujdisji'
          document.getElementById('commcontainer2').appendChild(crow)

        }


      }









      c = document.createElement('div')
      c.classList.add('dropdown')
      c.innerHTML = '<button class="waves-flat-button btn-text-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="material-icons">delete</i></button><div id="' + doc.data().title + 'deleteThingContainer" class="dropdown-menu" aria-labelledby="dropdownMenuButton">  </div>'


      d = document.createElement('a')
      d.classList.add('dropdown-item')
      d.classList.add('waves-flat-button')
      d.classList.add('btn-text-primary')
      d.innerHTML = '<i class="material-icons">delete</i> confirm'
      d.onclick = function () {




        db.collection('posts').doc(doc.id).get().then(function (doc) {

          db.collection('archive').add({
            title: doc.data().title,
            content: doc.data().content,
            attachment: doc.data().attachment,
            author: doc.data().author,
            authorurl: doc.data().authorurl,
            upvotes: doc.data().upvotes,
            downvotes: doc.data().downvotes,
            comments: doc.data().comments,
            enabled: true,
            created: doc.data().created
          }).then(function (doc) {
            refresh()
          })


          db.collection('posts').doc(doc.id).delete()

        })
      }

      a = document.createElement('div')
      a.style.paddingRight = '10px'
      a.style.paddingBottom = '20px'
      if (o == 0 || o == 1 || o == 2 || o == 3 || o == 4) {
        a.style.width = '100%'
      }
      else {
        a.style.width = '48%'
      }


      upvotefunc = "'" + doc.id + "', '" + doc.data().title + "'"
      downvotefunc = "'" + doc.id + "', '" + doc.data().title + "'"
      commentfunc = "'" + doc.id + "', '" + doc.data().title + "'"

      a.innerHTML = '<div style="text-align: left;background-color: #212121; width: 100%;" class="card"><div class="card-body"><div style="position: absolute; text-align: left"> <img style="border-radius: 42px; width: 42px;" src="' + doc.data().authorurl + '"/> <b> ' + doc.data().author + '</b></div><center><div style="display: inline-block;"  id="' + doc.data().title + 'deletebtn' + '"><br><br><br></div></center><h4 style="display: inline-block;" >' + doc.data().title + '</h4><hr style="background-color: white"><h5 style="text-align: left;">' + doc.data().content + '</h5><hr style="background-color: white"><button onclick="upvotepost(' + upvotefunc + ')" class="waves-flat-button btn-text-primary"><i class="material-icons">thumb_up</i> <div style="display: inline-block" id="' + doc.data().title + 'upvotes"></div></button> <button onclick="downvotepost(' + downvotefunc + ')" class="waves-flat-button btn-text-primary"><i class="material-icons">thumb_down</i> <div style="display: inline-block" id="' + doc.data().title + 'downvotes"></div></button> <button onclick="comments(' + commentfunc + ')" class="waves-flat-button btn-text-primary"><i class="material-icons">comment</i> <div style="display: inline-block" id="' + doc.data().title + 'comments"></div></button></div></div>'


      if (doc.id == 'W52L1CDH1h8zVMbjEAKI' || doc.id == 'maXelvI9pLmOFUpUP9xc') {
        a.innerHTML = '<div style="width: 100%; background-color: #212121;" class="card"><div class="card-body"><div style="position: absolute; text-align: left"> <img style="border-radius: 42px; width: 42px;" src="' + doc.data().authorurl + '"/> <b> ' + doc.data().author + '</b></div><center><div style="display: inline-block;"  id="' + doc.data().title + 'deletebtn' + '"><br><br><br></div></center><h4 style="display: inline-block;" >' + doc.data().title + ' (Pinned) </h4><hr style="background-color: white"><h5 style="text-align: left;">' + doc.data().content + '</h5><hr style="background-color: white"><button onclick="upvotepost(' + upvotefunc + ')" class="waves-flat-button btn-text-primary"><i class="material-icons">thumb_up</i> <div style="display: inline-block" id="' + doc.data().title + 'upvotes"></div></button> <button onclick="downvotepost(' + downvotefunc + ')" class="waves-flat-button btn-text-primary"><i class="material-icons">thumb_down</i> <div style="display: inline-block" id="' + doc.data().title + 'downvotes"></div></button> <button onclick="comments(' + commentfunc + ')" class="waves-flat-button btn-text-primary"><i class="material-icons">comment</i> <div style="display: inline-block" id="' + doc.data().title + 'comments"></div></button></div></div>'
        document.getElementById('commcontainer1pinned').appendChild(a)


      }
      else {

        document.getElementById('row' + i + '137232ujdisji').appendChild(a)
        f++
      }







      if (doc.data().authorurl == firebase.auth().currentUser.photoURL) {
        document.getElementById(doc.data().title + 'deletebtn').appendChild(c)
        document.getElementById(doc.data().title + 'deleteThingContainer').appendChild(d)


      }
      document.getElementById(doc.data().title + 'upvotes').innerHTML = " " + doc.data().upvotes
      document.getElementById(doc.data().title + 'downvotes').innerHTML = " " + doc.data().downvotes
      document.getElementById(doc.data().title + 'comments').innerHTML = " " + doc.data().comments.length

      o++

    })
  }).then(function () {



    document.getElementById('communitycontainer').classList.remove('fadeOut')
    document.getElementById('communitycontainer').classList.add('fadeIn')
    document.getElementById('commcontainer2container').classList.remove('fadeOut')
    document.getElementById('commcontainer2container').classList.add('fadeIn')
    document.getElementById('commcontainer').classList.remove('fadeOut')
    document.getElementById('commcontainer').classList.add('fadeIn')

    addWaves()

  })

}





function upvotepost(name, title) {

  db.collection('users').doc(user()).collection('community').doc('upvotes').get().then(function (doc) {
    if (doc.exists) {
      console.log('User file exists. Continuing.')

      db.collection('users').doc(user()).collection('community').doc('upvotes').get().then(function (doc) {




        for (let i = 0; i < doc.data().upvotes.length; i++) {
          if (doc.data().upvotes[i] == name) {


            db.collection('users').doc(user()).collection('community').doc('upvotes').update({
              upvotes: firebase.firestore.FieldValue.arrayRemove(name)
            })

            oldoldNum = document.getElementById(title + 'upvotes').innerHTML
            oldNum = oldoldNum.split(' ').join('');

            Num = parseInt(oldNum) - 1

            document.getElementById(title + 'upvotes').innerHTML = " " + Num

            db.collection('posts').doc(name).update({
              upvotes: Num
            })



            return;
          }
        }
        db.collection('users').doc(user()).collection('community').doc('upvotes').update({
          upvotes: firebase.firestore.FieldValue.arrayUnion(name)
        })

        oldoldNum = document.getElementById(title + 'upvotes').innerHTML
        oldNum = oldoldNum.split(' ').join('');

        Num = parseInt(oldNum) + 1

        document.getElementById(title + 'upvotes').innerHTML = " " + Num


        db.collection('posts').doc(name).update({
          upvotes: Num
        })


      })

    }
    else {

      db.collection('users').doc(user()).collection('community').doc('upvotes').set({
        upvotes: [],
        downvotes: [],
        comments: [],
      }).then(function () {

        console.log('User file doesnt exist, created one.')

        db.collection('users').doc(user()).collection('community').doc('upvotes').update({
          upvotes: firebase.firestore.FieldValue.arrayUnion(name)
        })

        oldoldNum = document.getElementById(title + 'upvotes').innerHTML
        oldNum = oldoldNum.split(' ').join('');

        Num = parseInt(oldNum) + 1

        document.getElementById(title + 'upvotes').innerHTML = " " + Num


        db.collection('posts').doc(name).update({
          upvotes: Num
        })


      })
    }
  })


}
function downvotepost(name, title) {

  db.collection('users').doc(user()).collection('community').doc('upvotes').get().then(function (doc) {
    if (doc.exists) {
      console.log('User file exists. Continuing.')

      db.collection('users').doc(user()).collection('community').doc('upvotes').get().then(function (doc) {




        for (let i = 0; i < doc.data().downvotes.length; i++) {
          if (doc.data().downvotes[i] == name) {


            db.collection('users').doc(user()).collection('community').doc('upvotes').update({
              downvotes: firebase.firestore.FieldValue.arrayRemove(name)
            })

            oldoldNum = document.getElementById(title + 'downvotes').innerHTML
            oldNum = oldoldNum.split(' ').join('');

            Num = parseInt(oldNum) - 1

            document.getElementById(title + 'downvotes').innerHTML = " " + Num

            db.collection('posts').doc(name).update({
              downvotes: Num
            })



            return;
          }
        }
        db.collection('users').doc(user()).collection('community').doc('upvotes').update({
          downvotes: firebase.firestore.FieldValue.arrayUnion(name)
        })

        oldoldNum = document.getElementById(title + 'downvotes').innerHTML
        oldNum = oldoldNum.split(' ').join('');

        Num = parseInt(oldNum) + 1

        document.getElementById(title + 'downvotes').innerHTML = " " + Num


        db.collection('posts').doc(name).update({
          downvotes: Num
        })


      })

    }
    else {

      db.collection('users').doc(user()).collection('community').doc('upvotes').set({
        upvotes: [],
        downvotes: [],
        comments: [],
      }).then(function () {

        console.log('User file doesnt exist, created one.')

        db.collection('users').doc(user()).collection('community').doc('upvotes').update({
          downvotes: firebase.firestore.FieldValue.arrayUnion(name)
        })

        oldoldNum = document.getElementById(title + 'downvotes').innerHTML
        oldNum = oldoldNum.split(' ').join('');

        Num = parseInt(oldNum) + 1

        document.getElementById(title + 'downvotes').innerHTML = " " + Num


        db.collection('posts').doc(name).update({
          downvotes: Num
        })


      })
    }
  })


}

function comments(name, title) {
  $('#commentsModal').modal('toggle')
  document.getElementById('commentsTopItem').innerHTML = "Comments - " + title
  document.getElementById('newCommentButton').onclick = function () {
    newComment(name)
  }


  db.collection('users').doc(user()).collection('community').doc('upvotes').get().then(function (doc) {
    if (doc.exists) {
      console.log('User file exists. Continuing.')
      buildComments(name)
      db.collection('users').doc(user()).collection('community').doc('upvotes').get().then(function (doc) {

      })
    }
    else {
      db.collection('users').doc(user()).collection('community').doc('upvotes').set({
        upvotes: [],
        downvotes: [],
        comments: [],
      }).then(function () {
        console.log('User file did not exist. created & continuing.')
        buildComments(name)
      }
      )
    }

  })

}

function buildComments(name) {
  $('#commentsUl').empty()
  document.getElementById('refreshCommentsBtn').onclick = function () {
    refreshComments(name)
  }

  document.getElementById('reportCommentBtn').onclick = function () {
    alert('To report a post like this, when the email opens up once you click OK, tell me info about the post including who sent it, why it should be reported, etc.')
    window.open('mailto:me@r0h.in')
  }


  db.collection('posts').doc(name).get().then(function (doc) {

    for (let i = 0; i < doc.data().comments.length; i++) {
      a = doc.data().comments[i].split(' 124981h7498c21 ')

      // console.log(a[0]) = name
      // console.log(a[1]) = profile pic
      // console.log(a[2]) == content


      b = document.createElement('li')
      b.style.backgroundColor = "#212121"
      b.style.color = "#fff"
      b.classList.add('list-group-item'); b.classList.add('d-flex'); b.classList.add('justify-content-between'); b.classList.add('align-items-center');
      if (a[0] == firebase.auth().currentUser.displayName) {
        var deleteFunc = "db.collection('posts').doc('" + name + "').update({comments: firebase.firestore.FieldValue.arrayRemove('" + firebase.auth().currentUser.displayName + " 124981h7498c21 " + firebase.auth().currentUser.photoURL + " 124981h7498c21 " + a[2] + "')});window.setTimeout(function(){refreshComments('" + name + "')},15)"
        b.innerHTML = '<div><img style="display: inline-block; width: 24px; height: 24px; border-radius: 24px;" src="' + a[1] + '" alt=""> ' + a[0] + '<br><br><p> ' + a[2] + '</p></div> <h5><div style="right: 10px; position: absolute;" class="dropdown"> <button class="waves-flat-button btn-text-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="material-icons">more_vert</i> </button> <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"> <a style="text-align: left; width: 100%;" href="mailto:me@r0h.in" class="waves-flat-button btn-text-primary"><i class="material-icons">flag</i> Report</a><a style="text-align: left; width: 100%;" onclick="' + deleteFunc + '" class="waves-flat-button btn-text-primary"><i class="material-icons">delete</i> Delete</a> </div> </div></h5>'
      }
      else {
        b.innerHTML = '<div><img style="display: inline-block; width: 24px; height: 24px; border-radius: 24px;" src="' + a[1] + '" alt=""> ' + a[0] + '<br><br><p> ' + a[2] + '</p></div> <h5><div style="right: 10px; position: absolute;" class="dropdown"> <button class="waves-flat-button btn-text-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="material-icons">more_vert</i> </button> <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"> <a style="text-align: left; width: 100%;" href="mailto:me@r0h.in" class="waves-flat-button btn-text-primary"><i class="material-icons">flag</i> Report</a> </div> </div></h5>'
      }



      document.getElementById('commentsUl').appendChild(b)


      addWaves()

    }


  })


  console.log('build commens')
}

function newComment(name) {
  a = document.getElementById('postCommentBox').value
  db.collection('posts').doc(name).update({
    comments: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.displayName + ' 124981h7498c21 ' + firebase.auth().currentUser.photoURL + ' 124981h7498c21 ' + a)
  })
  db.collection('users').doc(user()).collection('community').doc('upvotes').update({
    comments: firebase.firestore.FieldValue.arrayUnion(a + ' 124981h7498c21 ' + name)
  })

  refreshComments(name)
  document.getElementById('postCommentBox').value = ''

}
function refreshComments(name) {

  document.getElementById('commentsUl').classList.remove('fadeIn')
  document.getElementById('commentsUl').classList.add('fadeOut')


  window.setTimeout(function () {
    $('#commentsUl').empty()
    buildComments(name)
    document.getElementById('commentsUl').classList.remove('fadeOut')
    document.getElementById('commentsUl').classList.add('fadeIn')

  }, 500)


}



// CARDS SECTION


function createFlashcard() {
  name = document.getElementById('createflashset').value
  document.getElementById('createflashset').value = ''
  aoie = document.getElementById('createflashset').value

  db.collection('users').doc(user()).collection('flashcards').doc(name).get().then(function (doc) {
    if (doc.exists) {
      error('Set with this name already exists. Please choose another name');
      return;
    }
    else {

      if (aoie.includes("'") || aoie.includes("#") || aoie.includes('"') || aoie.includes("@") || aoie.includes("#") || aoie.includes("$") || aoie.includes("%") || aoie.includes("^") || aoie.includes("&") || aoie.includes("*") || aoie.includes("(") || aoie.includes(")") || aoie.includes("{") || aoie.includes("[") || aoie.includes("]") || aoie.includes("}") || aoie.includes("|") || aoie.includes(';') || aoie.includes(":") || aoie.includes("<") || aoie.includes(",") || aoie.includes(">") || aoie.includes(".") || aoie.includes("?") || aoie.includes("/") || aoie.includes("~") || aoie.includes("`") || aoie.includes("+") || aoie.includes("=")) {
        error('Cannot contain special characters.')
      }
      else {

        db.collection('users').doc(user()).collection('flashcards').doc(name).set({
          example: ["question", "answer"]
        }).then(function () {
          getflashcards()
        })

      }

    }
  })



}

function getflashcards() {

  $('#flashcards').empty()
  $('#flashcardmodalbody').empty()


  db.collection('users').doc(user()).collection('flashcards').get().then(function (querySnapshop) {
    querySnapshop.forEach(function (doc) {

      a = document.createElement('div')
      a.classList.add('animated')
      a.classList.add('fadeIn')
      a.style.padding = '15px'
      a.style.backgroundColor = '#121212'
      a.style.Color = '#fff'
      a.style.display = 'inline-block'
      a.style.width = '30%'

      iuhdaw = doc.id


      a.onclick = function () {
        $('#flashcardmodalbody').empty()
        document.getElementById('newFlashBtn').onclick = function () {
          newFlashCard(doc.id)
        }
        addWaves()
        $('#flashcardmodal').modal('toggle')
        document.getElementById('flashcardmodaltitle').innerHTML = 'Flashcard - ' + doc.id






        db.collection('users').doc(user()).collection('flashcards').doc(doc.id).collection('flashcards').get().then(function (querySnapshop) {
          querySnapshop.forEach(function (doc) {

            b = document.createElement('div')
            b.id = doc.id + 'ccc'
            b.style.backgroundColor = '#121212'
            b.style.Color = '#fff'
            b.classList.add('card')

            var toggleFunc = "'" + doc.id + "bbb" + "', '" + doc.id + "aaa'"
            var deleteFunc = "db.collection('users').doc('" + user() + "').collection('flashcards').doc('" + iuhdaw + "').collection('flashcards').doc('" + doc.id + "').delete().then(function() {document.getElementById('" + doc.id + "ccc').classList.add('animated');document.getElementById('" + doc.id + "ccc').classList.add('fadeOutUp');window.setTimeout(function() {document.getElementById('" + doc.id + "ccc').remove()},500)})"
            b.innerHTML = '<div id="' + doc.id + 'aaa" class="card animated flipInX fast" style="position: absolute; width: 100%; height: 100%; background-color: #121212; display: none;"> <BR>   <CENTER><h2 style="color: white;">' + doc.data().answer + '</h2></CENTER>   <br> </div>  <br> <center><h2>' + doc.data().question + '</h2></center> <br> <button id="' + doc.id + 'bbb" onclick="toggleFlash(' + toggleFunc + '); addWaves()" class="waves-flat-button btn-text-primary">reveal answer</button><button id="' + doc.id + 'gh38" onclick="' + deleteFunc + '" style="    position: absolute;left: 90%;top: 50%;transform: translate(-50%,-50%);" class="waves-flat-button btn-text-primary"><i class="material-icons">delete</i> Delete</button>'
            c = document.createElement('br')
            document.getElementById('flashcardmodalbody').appendChild(b)
            document.getElementById('flashcardmodalbody').appendChild(c)
          })
        })





        addTheWaves()

      }
      var deleteFunc2 = "db.collection('users').doc('" + user() + "').collection('flashcards').doc('" + iuhdaw + "').delete().then(function() {refresh(); document.getElementById('flashcardmodaltitle').innerHTML = 'Deleted: '})"
      a.innerHTML = '<div style="background-color: #212121; display: inline-block; width: 100%; height: 220px;" class="card waves-float-box shadow-sm"><div class="card-body"><div style="position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);"><h4>' + doc.id + '</h4><button onclick="' + deleteFunc2 + '" class="waves-flat-button btn-flat-primary"><i class="material-icons">delete</i></button></div></div></div>'

      document.getElementById('flashcards').appendChild(a)


    })
  }).then(function () {
    addTheWaves()
  })

  document.getElementById('flashcards').classList.remove('fadeOut')
  document.getElementById('flashcardmodalbody').classList.remove('fadeOut')
  addTheWaves()
}

function toggleFlash(btn, el) {
  x = document.getElementById(el)
  y = document.getElementById(btn)
  if (x.style.display == 'none') {
    x.style.display = 'block'
    y.innerHTML = 'Unreveal';
  }
  else {
    x.classList.add('flipOutX')
    y.innerHTML = 'Reveal';
    window.setTimeout(function () {
      x.classList.remove('flipOutX')
      x.style.display = 'none'
    }, 500)
  }
}

function newFlashCard(set) {
  a = document.getElementById('flashcardnewquestion').value
  b = document.getElementById('flashcardnewanswer').value
  document.getElementById('flashcardnewquestion').value = ''
  document.getElementById('flashcardnewanswer').value = ''

  if (a == "" || b == "") {
    error('Fields cannot be blank.')
  }

  db.collection('users').doc(user()).collection('flashcards').doc(set).collection('flashcards').add({
    question: a,
    answer: b
  }).then(function () {
    refreshFlash(set);

    addTheWaves()

  })

}

function addTheWaves() {
  window.setTimeout(function () {
    addWaves()
  }, 200)
}


function refreshFlash(set) {

  $('#flashcardmodalbody').empty()

  db.collection('users').doc(user()).collection('flashcards').doc(set).collection('flashcards').get().then(function (querySnapshop) {
    querySnapshop.forEach(function (doc) {

      b = document.createElement('div')
      b.style.backgroundColor = '#121212'
      b.style.Color = '#fff'
      b.id = doc.id + 'ccc'
      b.classList.add('card')

      var toggleFunc = "'" + doc.id + "bbb" + "', '" + doc.id + "aaa'"
      var deleteFunc = "db.collection('users').doc('" + user() + "').collection('flashcards').doc('" + iuhdaw + "').collection('flashcards').doc('" + doc.id + "').delete().then(function() {document.getElementById('" + doc.id + "ccc').classList.add('animated');document.getElementById('" + doc.id + "ccc').classList.add('fadeOutUp');window.setTimeout(function() {document.getElementById('" + doc.id + "ccc').remove()},500)})"
      b.innerHTML = '<div id="' + doc.id + 'aaa" class="card animated flipInX fast" style="position: absolute; width: 100%; height: 100%; background-color: #121212; display: none;"> <BR>   <CENTER><h2 style="color: white;">' + doc.data().answer + '</h2></CENTER>   <br> </div>  <br> <center><h2>' + doc.data().question + '</h2></center> <br> <button id="' + doc.id + 'bbb" onclick="toggleFlash(' + toggleFunc + '); addWaves()" class="waves-flat-button btn-text-primary">reveal answer</button><button id="' + doc.id + 'gh38" onclick="' + deleteFunc + '" style="    position: absolute;left: 90%;top: 50%;transform: translate(-50%,-50%);" class="waves-flat-button btn-text-primary"><i class="material-icons">delete</i> Delete</button>'
      c = document.createElement('br')
      document.getElementById('flashcardmodalbody').appendChild(b)
      document.getElementById('flashcardmodalbody').appendChild(c)

    })
  })

}

// MESSAGING SECTION





function newMessage() {
  a = document.getElementById('messageinput').value

  if (a.length < 5) {
    error('Not enough characters. You need at least 5.')
  }
  else {

    document.getElementById('messageinput').value = ''
    db.collection('messages').add({
      sender: firebase.auth().currentUser.displayName,
      senderimg: firebase.auth().currentUser.photoURL,
      content: a,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
  }


}



function getMessages() {
  $('#messages').empty()



  var query = firebase.firestore().collection('messages').orderBy('timestamp', 'desc').limit(6);


  query
    .onSnapshot(function (querySnapshot) {
      $('#messages').empty()
      querySnapshot.forEach(function (doc) {


        a = document.createElement('div')
        a.classList.add('card')
        a.style.backgroundColor = "rgb(46, 46, 46)"
        a.classList.add('animated')
        a.style.width = '95%'
        a.id = doc.id + "aaa"

        var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        timeel = doc.data().timestamp.toDate().toLocaleDateString("en-US", options)

        if (firebase.auth().currentUser.displayName == doc.data().sender) {
          var deleteFunc = "db.collection('messages').doc('" + doc.id + "').delete().then(function() {snackbar('Message successfully deleted.', '', '', '5000');document.getElementById('" + doc.id + "aaa').classList.add('fadeOut');window.setTimeout(function() {document.getElementById('" + doc.id + "aaa').remove()},500)})"
          a.innerHTML = '<div style="padding: 20px; text-align: left;" class="card-body"><img style="display: inline-block; width: 35px; border-radius: 25px;" src="' + doc.data().senderimg + '"><h4 style="padding-left: 10px; display: inline-block;"> ' + doc.data().sender + '</h4><h5 style="padding-left: 10px; display: inline-block;"> ' + timeel + '</h5><div style="right: 10px; position: absolute;" class="dropdown"> <button class="waves-flat-button btn-text-primary dropdown-toggle waves-effect waves-button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="material-icons">more_vert</i> </button> <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" x-placement="bottom-start" style="position: absolute; transform: translate3d(0px, 34px, 0px); top: 0px; left: 0px; will-change: transform;"> <a style="text-align: left; width: 100%;" onclick="' + deleteFunc + '" class="waves-flat-button btn-text-primary waves-effect waves-button"><i class="material-icons">delete</i> Delete</a> </div> </div><br><br><p>' + doc.data().content + '</p></div>'
        }
        else {

          a.innerHTML = '<div style="padding: 20px; text-align: left;" class="card-body"><img style="display: inline-block; width: 35px; border-radius: 25px;" src="' + doc.data().senderimg + '"><h4 style="padding-left: 10px; display: inline-block;"> ' + doc.data().sender + '</h4><h5 style="padding-left: 10px; display: inline-block;"> ' + timeel + '</h5><div style="right: 10px; position: absolute;" class="dropdown"> <button class="waves-flat-button btn-text-primary dropdown-toggle waves-effect waves-button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="material-icons">more_vert</i> </button> <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" x-placement="bottom-start" style="position: absolute; transform: translate3d(0px, 34px, 0px); top: 0px; left: 0px; will-change: transform;"> <a style="text-align: left; width: 100%;" href="mailto:me@r0h.in" class="waves-flat-button btn-text-primary waves-effect waves-button"><i class="material-icons">flag</i> Report</a> </div> </div><br><br><p>' + doc.data().content + '</p></div>'

        }

        document.getElementById('messages').appendChild(a)
        document.getElementById('messages').appendChild(document.createElement('br'))


      });
    });

  document.getElementById('messages').classList.remove('fadeOut')
}


var input = document.getElementById("messageinput");
input.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("sendmsgbtn").click();
  }
});




$('#skiplanding').change(function () {
  if ($(this).is(':checked')) {

    db.collection('users').doc(user()).update({
      skipland: true
    }).then(function () {
      snackbar('User preferences saved', '', '', '5000')
    })

  } else {

    db.collection('users').doc(user()).update({
      skipland: false
    }).then(function () {
      snackbar('User preferences saved', '', '', '5000')
    })


  }
});

function updateCheck() {

  db.collection('users').doc(user()).get().then(function (doc) {
    if (doc.data().skipland == true) {
      document.getElementById('skiplanding').checked = true
    }
  })
}