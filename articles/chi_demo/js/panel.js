storageRef = firebase.storage().ref();
db = firebase.firestore()
firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
        // Stuff
        window.user = user

        doc = await db.collection('users').doc(user.uid).get()
        $('#username').html(doc.data().username)
        $('#email').html(user.email)

        loadowndata()

    } else {
      // Go away
      window.location.replace('index.html')
    }
})

function uploadfile() {
    file = document.getElementById('inputfile').files[0]
    if (!file.name.includes('.csv') && !file.name.includes('.xlsx')) {
      alert('Please upload a .csv or .xlxs file.')
      return;
    }
    if (file.name.includes('.csv')) {
      lat = window.prompt('CSV detected. \n\nPlease enter the latitude:')
      long = window.prompt('\n\n\nPlease enter the longitude:')
    }
    var uploadTask = storageRef.child('data/' + user.uid + '/' + file.name).put(file);
    uploadTask.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
        document.getElementById('progress').innerHTML = progress
      }, function(error) {
        alert(error)
      }, function() {
        document.getElementById('progress').innerHTML = ''
        Snackbar.show({text: "File uploaded and is being processed..."})
        window.setTimeout(() => {
          Snackbar.show({text: "Reload the page in a few moments to view your uploaded file."})
        }, 3000)


        uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
          db.collection('users').doc(user.uid).set({
            data: firebase.firestore.FieldValue.arrayUnion({name: file.name, url: url})
          }, {merge: true})
          db.collection('data').doc('data').update({
            data: firebase.firestore.FieldValue.arrayUnion({
                user: user.uid,
                file: file.name,
                url: url,
            })
          }).then(function() {

            // Invoke cloud function with lat and long variables
            $('#inputfile').val("");

          })
        });
    })  
}

async function deleteFile(id, el) {

  $(`#${el}`).remove()

  oldUser = await db.collection('users').doc(user.uid).get()

  for (let i = 0; i < oldUser.data().data.length; i++) {
    if (oldUser.data().data[i].name == id) {

      tempArray = oldUser.data().data.splice(i, 0);

      // tempArray is new array 

      await db.collection('users').doc(user.uid).update({
        data: tempArray,
      })

      await db.collection('data').doc('data').update({
        data: firebase.firestore.FieldValue.arrayRemove({
          url: oldUser.data().data[i].url,
          file: oldUser.data().data[i].name,
          user: user.uid
        })
      })

      await db.collection("parsed").doc(oldUser.data().data[i].name).delete()

      await storageRef.child('data/' + user.uid + '/' + oldUser.data().data[i].name).delete()

      alert(oldUser.data().data[i].name + ' deleted.')

    }
  }
}

async function loadowndata() {
  window.k = 1

  userdata = await db.collection('parsed').doc(user.uid).get()
  if (userdata.exists) {
    window.i = 0
    for (let i = 0; i < userdata.data().data.length; i++) {

      a = document.createElement('tr');
      a.innerHTML = `<th scope="row"><center>${k}</center></th><th scope="row"><center>${userdata.data().data[i].date}</center></th><th contenteditable="true" scope="row"><center>${userdata.data().data[i].precip}</center></th><th contenteditable="true"scope="row"><center>${userdata.data().data[i].lat}</center></th><th contenteditable="true"scope="row"><center>${userdata.data().data[i].long}</center></th><th scope="row"><center><button id="${k}rowsave${i}" onclick="save('${k}', '${i}')" class="eon-text">save</button></center></th><th scope="row"><center><button id="${k}row${i}" onclick="deleteRow('${k}', '${i}')" class="eon-text iconbtn deletebtn"><i class="material-icons">delete</i></button></center></th>`
      document.getElementById('tablebody').appendChild(a)
      k++
      
    }    
  }

  doc = await db.collection('users').doc(user.uid).get()  
  files = doc.data().data
  if (!files) {
    files = []
  }
  for (let i = 0; i < files.length; i++) {

    datadoc = await db.collection('parsed').doc(files[i].name).get()
    if (!datadoc.exists) {
      alert('A file is being processed. Please wait.\n\n\nIf you see this message after 2 minutes, contact support.')
      return;
    }

    b = document.createElement('div')
    b.classList.add('card')
    b.id = 'file' + i
    b.classList.add('alldatacard')
    b.innerHTML = `
    <div class="card-body">
      <h4>
        <b>${datadoc.id}</b>
        <b style="float: right; font-size: 12px; padding-right: 64px;"><button onclick="deleteFile('${datadoc.id}', 'file${i}')" class="eon-contained iconbtn"><i class="material-icons">delete</i></button></b>
      </h4>
      
      <table class="table">
        <thead>
          <tr>
            <th scope="col"><center>#</center></th>
            <th scope="col"><center>Date</center></th>
            <th scope="col"><center>Precipitation</center></th>
            <th scope="col"><center>Latitude</center></th>
            <th scope="col"><center>Longitude</center></th>
            <th scope="col"><center>Save</center></th>
            <th scope="col"><center>Remove</center></th>
          </tr>
        </thead>
        
        <tbody id="tablebody${i}">
        </tbody>
      </table>

    </div>`
    document.getElementById('tables').appendChild(b)
    document.getElementById('tables').appendChild(document.createElement('br'))
    document.getElementById('tables').appendChild(document.createElement('br'))

    meta = datadoc.data().meta
    parsed = datadoc.data().data 
    for (let o = 0; o < parsed.length; o++) {

      if (parsed[o].Date == 'Totals :') {
        continue;
      }

      a = document.createElement('tr')
      a.innerHTML = `<th scope="row"><center>${k}</center></th><th contenteditable="false" scope="row">${parsed[o].Date}</center></th><th contenteditable="true"scope="row"><center>${parsed[o][ 'Precip in.' ]}</center></th><th contenteditable="false" scope="row"><center>${meta.lat}</center></th><th contenteditable="false" scope="row"><center>${meta.long}</center></th><th scope="row"><center><button id="${k}rowsave${o}" onclick="save('${o}', '${datadoc.id}', '${k}')" class="eon-text">save</button></center></th><th scope="row"><center><button id="${k}row${o}" onclick="deleteRow('${o}', '${datadoc.id}', '${k}')" class="eon-text iconbtn deletebtn"><i class="material-icons">delete</i></button></center></th>`
      document.getElementById(`tablebody${i}`).appendChild(a)
      k++
      
    }
  
  }

  addWaves()

}

async function uploadEntry() {
  var date = $('#dateinput').val()
  var precip = $('#precipinput').val()
  var lat = $('#latinput').val()
  var long = $('#longinput').val()

  $('#dateinput').get(0).value = '' 
  $('#precipinput').get(0).value = '' 
  $('#latinput').get(0).value = '' 
  $('#longinput').get(0).value = '' 

  a = document.createElement('tr')
  i = i + 1
  a.innerHTML = `<th scope="row"><center>${k}</center></th><th scope="row"><center>${date}</center></th><th contenteditable="true"scope="row"><center>${precip}</center></th><th contenteditable="true"scope="row"><center>${lat}</center></th><th contenteditable="true"scope="row"><center>${long}</center></th><th><center><button  id="${k}rowsave${i}" onclick="save('${k}', '${i}')" class="eon-text">save</button></center></th><th scope="row"><center><button id="${k}row${i}" onclick="deleteRow('${k}', '${i}')" class="eon-text iconbtn deletebtn"><i class="material-icons">delete</i></button></center></th>`
  document.getElementById('tablebody').appendChild(a)
  k++
  addWaves()

  await db.collection('parsed').doc(user.uid).set({
    data: firebase.firestore.FieldValue.arrayUnion({
      date: date,
      lat: lat,
      long: long,
      precip: precip,
    })
  }, {merge: true})

  Snackbar.show({
    text: 'Added.'
  })

}

let map;
async function initMap() {
  query = await db.collection('parsed').get()
  datas = []

  for (let i = 0; i < query.docs.length; i++) {
    console.log(query.docs[i].id);
    for (let k = 0; k < query.docs[i].data().data.length; k++) {
      if (!query.docs[i].data().data[k].lat) { 
        date = new Date(moment(query.docs[i].data().data[k].Date, "MM/DD/YY").format('YYYY-MM-DD'))
        if (query.docs[i].data().data[k]["Precip in."] !== 'T' && date.toString() !== 'Invalid Date') {
          datas.push({
            long: parseInt(query.docs[i].data().meta.long),
            lat: parseInt(query.docs[i].data().meta.lat),
            weight: parseInt(query.docs[i].data().data[k]["Precip in."]),
            date: date,
          })
        }
      }
      else {
        // Regular (From user file)
        datas.push({
          long: parseInt(query.docs[i].data().data[k].long),
          lat: parseInt(query.docs[i].data().data[k].lat),
          weight: parseInt(query.docs[i].data().data[k].precip),
          date:  new Date(moment(query.docs[i].data().data[k].date, "MM/DD/YY").format('YYYY-MM-DD')),
          
        })
      }
    }
  }

  // console.log(heatMapData);

  datas.sort((a, b) => b.date - a.date)
  
  uniqueDates = []

  $.each(datas, function(i, el){
    if($.inArray(el.date, uniqueDates) === -1) uniqueDates.push(el.date);
  });

  for (let i = 0; i < uniqueDates.length; i++) {
    a = document.createElement('option')
    a.innerHTML = moment(uniqueDates[i]).format('MMMM Do YYYY')
    a.value = uniqueDates[i]
    document.getElementById('beforeDate').appendChild(a)
    b = document.createElement('option')
    b.innerHTML = moment(uniqueDates[i]).format('MMMM Do YYYY')
    b.value = uniqueDates[i]
    document.getElementById('afterDate').appendChild(b)
  }

}

async function save(a, b, c,) {


  if (parseInt(b) || b == '0') {
    index = b

    // Get new values
    prec = $(`#${a}rowsave${index}`).parent().parent().parent().find('th:nth-child(3)').first().first().html().split('<center>').pop().split('</center>').shift()
    lat = $(`#${a}rowsave${index}`).parent().parent().parent().find('th:nth-child(4)').first().first().html().split('<center>').pop().split('</center>').shift()
    long = $(`#${a}rowsave${index}`).parent().parent().parent().find('th:nth-child(5)').first().first().html().split('<center>').pop().split('</center>').shift()
  }
  else {
    index = a

     // Get new values
    prec = $(`#${c}rowsave${index}`).parent().parent().parent().find('th:nth-child(3)').first().first().html().split('<center>').pop().split('</center>').shift()
    lat = $(`#${c}rowsave${index}`).parent().parent().parent().find('th:nth-child(4)').first().first().html().split('<center>').pop().split('</center>').shift()
    long = $(`#${c}rowsave${index}`).parent().parent().parent().find('th:nth-child(5)').first().first().html().split('<center>').pop().split('</center>').shift()
  }

  
  if (parseInt(b) || b == '0') {

    doc = await db.collection('parsed').doc(user.uid).get()

    tempdate = doc.data().data
    tempdate[index].precip = prec
    tempdate[index].lat = lat
    tempdate[index].long = long

    await db.collection("parsed").doc(user.uid).update({
      data: tempdate,
    })

    Snackbar.show({text: "Updated."})

    return;

  }

  // Regular file

  doc = await db.collection('parsed').doc(b).get()

  tempdate = doc.data().data
  tempdate[index]['Precip in.'] = prec

  await db.collection("parsed").doc(b).update({
    data: tempdate,
  })

  Snackbar.show({text: "Updated."})

  return;
 
}

async function deleteRow(a, b, c) {

  if (parseInt(b) || b == '0') {
    index = b
    parent = $(`#${a}row${index}`).parent().parent().parent().parent()
    $(`#${a}row${index}`).parent().parent().parent().remove()
  }
  else {
    index = a
    parent = $(`#${c}row${index}`).parent().parent().parent().parent()
    $(`#${c}row${index}`).parent().parent().parent().remove()
  }

  $(parent).find('.deletebtn').each(function(i, obj) {
    // If user item
    if (!obj.onclick.toString().split("',")[2]) {
      // This is a user item

      lastParameter = obj.onclick.toString().split("',")[1].split(')').shift().split(' ').pop().split("'")[1]
      // Last paremeter is the index of user file

      if (parseInt(lastParameter) >  parseInt(index)) {
        // If lastparam is larger than what's deleted, shift everything down
        lastParamMinusOne = parseInt(lastParameter - 1)

        // Change ID
        obj.id = `${parseInt(obj.id.split('row')[0])}row${lastParamMinusOne}`    

        // Change onclick
        obj.setAttribute('onclick', obj.onclick.toString().replace(`'${parseInt(lastParameter)}')`, `'${lastParamMinusOne}')`).split('function onclick(event) {')[1].replace(new RegExp('}' + '$'), ''))

      }

    }
    else {
      // This is a file item
      lastParameter = obj.onclick.toString().split("deleteRow(")[1].split(', ')[0].split("'")[1]
      // Last parameter is index of regular file - first param i think too

      if (parseInt(lastParameter) >  parseInt(index)) {
        // If index is larger than what's deleted, shift everything down
        lastParamMinusOne = parseInt(lastParameter - 1)

        // Change ID
        obj.id = `${parseInt(obj.id.split('row')[0])}row${lastParamMinusOne}`  
        

        obj.setAttribute('onclick', obj.onclick.toString().replace(`('${parseInt(lastParameter)}'`, `('${lastParamMinusOne}'`).split('function onclick(event) {')[1].replace(new RegExp('}' + '$'), ''))

      }
    }

  });

  if (parseInt(b) || b == '0') {

    doc = await db.collection('parsed').doc(user.uid).get()

    await db.collection('parsed').doc(user.uid).update({
      data: firebase.firestore.FieldValue.arrayRemove(doc.data().data[b])
    })

    return;

  }

  // Regular file

  doc = await db.collection('parsed').doc(b).get()

  await db.collection('parsed').doc(b).update({
    data: firebase.firestore.FieldValue.arrayRemove(doc.data().data[a])
  })

}

// button is id of k + index

function build() {
  beforeDate = $('#beforeDate').val()
  afterDate = $('#afterDate').val()

  if (moment(afterDate).isAfter(beforeDate, 'day')) {
    before = beforeDate
    after = afterDate
  }
  else {
    after = beforeDate
    before = afterDate
  }

  buildData = []

  if (before == 'nope' || after == 'nope') {
    Snackbar.show({text: "Invalid Dates."})
    return;
  }
  
  range = moment().range(before, after);


  for (let i = 0; i < datas.length; i++) {
    window[`${datas[i].lat}x${datas[i].long}`] = undefined
  }

  for (let i = 0; i < datas.length; i++) {

    if (range.contains(datas[i].date)) {
      if (window[`${datas[i].lat}x${datas[i].long}`]) {
        window[`${datas[i].lat}x${datas[i].long}`].push(datas[i].weight)
      }
      else {
        window[`${datas[i].lat}x${datas[i].long}`] = [datas[i].weight]
        buildData.push({
          coords_lat: datas[i].lat,
          coords_long: datas[i].long,
        })
      }
    }

  }

  // window[latxlong] = [values]
  heatMapData = []
  // Average of that goes into buildData

  for (let i = 0; i < buildData.length; i++) {
    
    if (buildData[i] == undefined) {
      continue;
    }

    // Calculate the weight
    avg = 0
    for (let k = 0; k < window[`${buildData[i].coords_lat}x${buildData[i].coords_long}`].length; k++) {
      avg = avg + window[`${buildData[i].coords_lat}x${buildData[i].coords_long}`][k]
    }
    avg = avg / window[`${buildData[i].coords_lat}x${buildData[i].coords_long}`].length

    heatMapData.push({
      location: new google.maps.LatLng(buildData[i].coords_lat, buildData[i].coords_long), weight: avg,
    })
  }

    
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  });

  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatMapData
  });

  heatmap.setMap(map);

  
}

function logout() {
    firebase.auth().signOut().then(function() {
        Snackbar.show({text: "Signed out."})
    }).catch(function(error) {
      alert(error)
    });
}