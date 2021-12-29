window.targetAppVersion = '160'
window.activeWebVersion = '1.7.0'
$('#version').html(activeWebVersion)

try {
  eval(`window.ipc = require('electron').ipcRenderer`)
} 
catch(error) {
  console.log('Unable to initalize Electron IPC Renderer.');
}

try {
  ipc.on('open-link', (event, message) => {
    // Handle links here
    type = message.split('b=').pop().split('a=').shift()
    content = message.split('a=').pop()

    if (type == message || content == message || !content || !type) {
      Snackbar.show({text: "Unknown link properties.", pos: 'top-right'})
      return;
    }

    switch (type) {
      case '0190i2uwsoildjuakh':
        // Album
        openAlbum(content, false)
        break;
      case '0912897812edhxkjba':
        // Playlist
        openPlaylist(content)
        break;
      case '0s29ieu08jidsoja2s':
        // Artist
        openArtist(content)
        break;
      case '092ei0192jiwosdncs':
        // Track
        queueSongWithoutData(content, false)
        break;
      default:
        Snackbar.show({text: "Unknown link properties.", pos: 'top-right'})
        break;
    }

    console.log(type, content, message)
  })
} catch (error) {
  
}

window.setTimeout(() => {
  try {
    ipc.send('app_version');
    ipc.on('app_version', (event, arg) => {
      ipc.removeAllListeners('app_version');
      var ver = arg.version.replace('.', "");
      ver = ver.replace('.', '');ver = ver.replace('.', '');ver = ver.replace('.', '');localAppVersion = ver.replace('.', '')
      if (targetAppVersion > localAppVersion) {
        // Outdated
        showOutdated()
      }
  
    });
  } catch (error) { }
}, 250)


function openUpdate() {
  ipc.send('invokeAction', `close`);
}