
          // Returns true if a user is signed-in.
          function isUserSignedIn() {
            return !!firebase.auth().currentUser;
          }


          function initFirebaseAuth() {
            // Listen to auth state changes.
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
            if (user) { // User is signed in!
                console.log('User is signed in')

                db.collection('users').get().then((snapshot) => {
                    console.log(snapshot.docs)
                });
              
                x = db.collection('users').doc(firebase.auth().currentUser.uid).get().then(function(doc) {
                  if (doc.data().dark == 'dark') {
                    document.getElementById('body').classList.add('darken')
                    window.setTimeout(function() {
                      window.location.replace('landingdark.html')
                    },500)
                    
                  }
                  else {
                    window.location.replace('landing.html')
                  }
                })




              // We save the Firebase Messaing Device token and enable notifications.

            } else { // User is signed out!
              // Hide user's profile and sign-out button.
              window.location.replace('landing.html')
            }

          }
          
        

initFirebaseAuth();

