  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDYWS1Xgm6R4KpnQI5PrQtd8yp5RreI76w",
    authDomain: "swizzle-music.firebaseapp.com",
    databaseURL: "https://swizzle-music.firebaseio.com",
    projectId: "swizzle-music",
    storageBucket: "swizzle-music.appspot.com",
    messagingSenderId: "768780101962",
    appId: "1:768780101962:web:0c8590249c7db8e8c4b9b3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  functions = firebase.functions();
  db = firebase.firestore()