window.authenticated = false
window.loadingClient = false

function loadClient() {
    window.loadingClient = true
    
    gapi.client.setApiKey("AIzaSyBE60yZ4TnayPIzKIwDKU-A1dDYpXItzDA");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest").then(function() { 
        console.log("GAPI client loaded for API");

        window.loadingClient = true
        window.clearInterval(timer2)    
    },
    function(err) { 
        console.error("Error loading GAPI client for API", err); 
    });
  }

gapi.load("client:auth2", () => {
    gapi.auth2.init({
        client_id: "768780101962-ga6v1200gbliqts54dbgnss8ns40aa0s.apps.googleusercontent.com"
    });
})

timer2 = window.setInterval(() => {
    try { 
        if (loadingClient == false) {
            loadClient()
        }
    } catch (error) {
        window.loadingClient = false
    }
}, 500)  