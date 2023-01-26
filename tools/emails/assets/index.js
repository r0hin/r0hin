let client;
let access_token;

function initClient() {
  client = google.accounts.oauth2.initTokenClient({
    client_id: '184624619387-tij6ipkiq70gqe0nci2d65br299oojfs.apps.googleusercontent.com',
    
    scope: 'https://www.googleapis.com/auth/gmail.settings.basic',
    callback: (tokenResponse) => {
      access_token = tokenResponse.access_token;
      document.getElementById('buttonRefresh').style.color = "lime";
      document.getElementById('buttonRefresh').innerHTML = "refreshed token"
      document.getElementById('buttonRefresh').style.pointerEvents = "none";
    },
  });
}

function getToken() {
  client.requestAccessToken();
}

function addFilter() {
  let target = document.getElementById('target_input').value
  if (target) {
    target = `delete+${target}@r0h.in`
  }
  else {
    target = document.getElementById('target_input_alt').value
  }

  document.getElementById('button').innerHTML = "adding filter..."
  document.getElementById('button').style.pointerEvents = "none";

  const filter = {
    criteria: {
      to: target,
    },
    action: {
      addLabelIds: ['TRASH']
    }
  };

  const url = `https://gmail.googleapis.com/gmail/v1/users/me/settings/filters?access_token=${access_token}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(filter)
  };

  fetch(url, options).then(response => {document.getElementById('button').innerHTML = "sent!"; document.getElementById('button').style.pointerEvents = "auto";}).catch(() => {
    document.getElementById('button').innerHTML = "error"
    document.getElementById('button').style.pointerEvents = "auto";
  })
}