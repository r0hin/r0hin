import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, serverTimestamp, doc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNuiHb0Pp-ccdqrkUrpICvFAM6SiJLBqY",
  authDomain: "re-app0.firebaseapp.com",
  projectId: "re-app0",
  storageBucket: "re-app0.appspot.com",
  messagingSenderId: "683468001343",
  appId: "1:683468001343:web:5aabcd6a486ec426cc288a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

redirect();
async function redirect() {
  // Get query param from current href.
  const tgt = new URLSearchParams(window.location.search).get('u');
  if (tgt) {
    // Increment target.
    // http://localhost:1234/?u=o8YXE9GPLZhu8BLpehly
    const docData = await getDoc(doc(db, `shortenedLinks/${tgt}`));
    
    if (docData.exists) {
      await updateDoc(doc(db, `shortenedLinks/${tgt}`), {
        numUsed: docData.data().numUsed + 1,
        lastUsed: serverTimestamp(),
      });

      window.location.replace(docData.data().url);
      return;
    }
  }

  $(`#body`).removeClass("hidden");
  $(`#body`).addClass("flex");
}


$("#urlInput").get(0).focus();
window.timeout = null;
window.timeoutError = null;
window.snapshot = null;

$(`#generateButton`).get(0).onclick = () => { shorten($("#urlInput").val()) };
$(`#viewAnalyticsButton`).get(0).onclick = () => { analytics($("#urlInput").val()) };
$(`#backButton`).get(0).onclick = () => { toGenerate() };

window.onload = function() {
  $("#urlInput").get(0).focus();

  $("#urlInput").get(0).addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      shorten($("#urlInput").val());
    }
  });  
}

function toGenerate() {
  $(`#stats`).addClass('hidden');
  $(`#generate`).removeClass('hidden');
  snapshot();
}

async function analytics(urlInput) {
  let url = urlInput;

  url = url.trim(); // Remove leading and trailing spaces.
  url = url.split(`r0h.in/re?u=`)[1];

  if (!url) {
    displayError("Invalid URL.");
    return;
  }

  $("#urlInput").val('');
  $("#urlInput").attr('placeholder', 'Gathering analytics...');

  // Get data
  snapshot = onSnapshot(doc(db, `shortenedLinks/${url}`), (doc) => {
    $("#urlInput").attr('placeholder', 'Paste a URL');
    if (doc.exists()) {
      $(`#stats`).removeClass('hidden');
      $(`#generate`).addClass('hidden');

      $(`#totalUses`).html(doc.data().numUsed);
      $(`#lastUsed`).html(doc.data().lastUsed.toDate().toLocaleString('default', {month: 'short', day: 'numeric'}));
      $(`#dateCreated`).html(doc.data().createdAt.toDate().toLocaleString('default', {month: 'short', day: 'numeric'}));
      $(`#targetURL`).html(doc.data().url);
      $(`#targetURL`).get(0).href = doc.data().url;
      
    }
    else {
      displayError('URL register not found.');
    }
  })
}

function displayError(text) {
  $(`#errorPillText`).html(text);
  $(`#errorPill`).removeClass('hidden');
  $(`#errorPill`).addClass('flex');
  $(`#errorPill`).removeClass('animationOut');
  $(`#errorPill`).addClass('animationIn');

  window.clearInterval(timeoutError);
  timeoutError = window.setTimeout(() => {
    $(`#errorPill`).removeClass('animationIn');
    $(`#errorPill`).addClass('animationOut');
  }, 4000);
}

async function shorten(urlInput) {
  let url = urlInput;

  url = url.trim(); // Remove leading and trailing spaces.

  if (!url.startsWith("http") && !url.startsWith("https") && !url.includes(':')) {
    url = "https://" + url; // Add "https://" if it's missing and it's not a custom link handler.
  }

  if (!url.endsWith("/")) {
    url = url + "/"; // Add trailing "/" if it's missing.
  }

  if (!url.includes('.')) {
    displayError("Invalid URL.");
    return;
  }

  if (url.length > 999) {
    displayError("Invalid URL.");
    return;
  }


  $("#urlInput").val('');
  $("#urlInput").attr('placeholder', 'Shortening...');

  // Shorten.

  const doc = await addDoc(collection(db, `shortenedLinks`), {
    url: url,
    numUsed: 0,
    lastUsed: serverTimestamp(),
    createdAt: serverTimestamp(),
  });

  // Copy doc.id to clipboard.
  try {
    await navigator.clipboard.writeText(`https://r0h.in/re?u=${doc.id}`);
    $(`#successPill`).removeClass('hidden');
    $(`#successPill`).addClass('flex');
    $(`#successPill`).removeClass('animationOut');
    $(`#successPill`).addClass('animationIn');
  
    window.clearInterval(timeout);
    timeout = window.setTimeout(() => {
      $(`#successPill`).removeClass('animationIn');
      $(`#successPill`).addClass('animationOut');
    }, 4000);
  }
  catch (err) {
    $("#urlInput").attr('placeholder', 'Paste a URL');
    alert(`Failed to copy to clipboard. Your URL is: https://r0h.in/re?u=${doc.id}.`);
  }


  $("#urlInput").attr('placeholder', 'Paste a URL');
}
