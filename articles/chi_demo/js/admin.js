var storageRef = firebase.storage().ref();
db = firebase.firestore()
firebase.auth().onAuthStateChanged(async function(user) {

    if (user) {

        approved = ['rohinarya12@gmail.com']


        if (!approved.includes(user.email)) {
            window.location.replace('index.html')
        }

        // Stuff
        window.user = user

        loadadmin()

    } else {
      // Go away
      window.location.replace('index.html')
    }


})

function selectFile() {
    y = $('#n').val()
    $('.alldatacard').addClass('hidden')
    $(`#${y}cord`).removeClass('hidden')
}

async function loadadmin() {

    // Similar to panel but this time load 

    window.k = 1

    query = await db.collection('parsed').get()

    for (let i = 0; i < query.docs.length; i++) {
        
        name = query.docs[i].id
        data = query.docs[i].data().data

        if (data.length == false) {
            // its [] so
            continue;
        }

        if (query.docs[i].id.includes('.')) {
            // It is a file doc
            lat = query.docs[i].data().meta.lat
            long = query.docs[i].data().meta.long
            datetag = 'Date'
            preciptag = 'Precip in.'
            latlongcontenteditable = false

        }

        else {
            // It is a user doc
            datetag = 'date'
            preciptag = 'precip'
            lat = query.docs[i].data().data[0].lat
            long = query.docs[i].data().data[0].long
            latlongcontenteditable = true
            
        }

        u = document.createElement('option')
        u.value = i
        u.innerHTML = query.docs[i].id
        document.getElementById('n').appendChild(u)

        b = document.createElement('div')
        b.classList.add('card')
        b.classList.add('alldatacard')
        b.classList.add('hidden')
        b.id = i + 'cord'
        b.innerHTML = `
            <div class="card-body">
                <h4>
                    <b>${query.docs[i].id}</b>
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
        
                    <tbody id="tablebody${i}"> </tbody>
                </table>
            </div>
        `

        document.getElementById('tables').appendChild(b)
        
        for (let o = 0; o < data.length; o++) {
            if (data[o][datetag] == 'Totals :') {
                continue;
            }
        
            a = document.createElement('tr')
            a.innerHTML = `<th scope="row"><center>${k}</center></th><th contenteditable="false" scope="row">${data[o][datetag]}</center></th><th contenteditable="true"scope="row"><center>${data[o][preciptag]}</center></th><th contenteditable="${latlongcontenteditable}" scope="row"><center>${lat}</center></th><th contenteditable="${latlongcontenteditable}"scope="row"><center>${long}</center></th><th scope="row"><center><button id="${k}rowsave${o}" onclick="save('${o}', '${name}', '${k}')" class="eon-text">save</button></center></th><th scope="row"><center><button id="${k}row${o}" onclick="deleteRow('${o}', '${name}', '${k}')" class="eon-text iconbtn deletebtn"><i class="material-icons">delete</i></button></center></th>`
            document.getElementById(`tablebody${i}`).appendChild(a)
            k++
        }

    }
  
  addWaves()

}

async function deleteRow(a, b, c) {
    index = a

    $(`#${c}row${index}`).parent().parent().parent().parent().find('.deletebtn').each(function(i, obj) {
        // None are user items
        lastParameter = obj.onclick.toString().split("deleteRow(")[1].split(', ')[0].split("'")[1]
        // Last parameter is index of regular file - first param i think too

        if (parseInt(lastParameter) >  parseInt(index)) {
            // If index is larger than what's deleted, shift everything down
            lastParamMinusOne = parseInt(lastParameter - 1)

            // Change ID
            obj.id = `${parseInt(obj.id.split('row')[0])}row${lastParamMinusOne}`  
            

            obj.setAttribute('onclick', obj.onclick.toString().replace(`('${parseInt(lastParameter)}'`, `('${lastParamMinusOne}'`).split('function onclick(event) {')[1].replace(new RegExp('}' + '$'), ''))
        }
    })

    doc = await db.collection('parsed').doc(b).get()

    await db.collection('parsed').doc(b).update({
      data: firebase.firestore.FieldValue.arrayRemove(doc.data().data[a])
    })

    $(`#${c}row${index}`).parent().parent().parent().remove()

}

async function save(a, b, c) {

    index = a

    prec = $(`#${c}rowsave${index}`).parent().parent().parent().find('th:nth-child(3)').first().first().html().split('<center>').pop().split('</center>').shift()
    lat = $(`#${c}rowsave${index}`).parent().parent().parent().find('th:nth-child(4)').first().first().html().split('<center>').pop().split('</center>').shift()
    long = $(`#${c}rowsave${index}`).parent().parent().parent().find('th:nth-child(5)').first().first().html().split('<center>').pop().split('</center>').shift()

    doc = await db.collection('parsed').doc(b).get()

    tempdate = doc.data().data

    if (tempdate[index]['precip']) {
        // User file 
        tempdate[index]['precip'] = prec
        tempdate[index].lat = lat
        tempdate[index].long = long
    }
    else {
        // File file
        tempdate[index]['Precip in.'] = prec
    }

    await db.collection("parsed").doc(b).update({
        data: tempdate,
    })

    Snackbar.show({text: "Updated."})

    return;

}