db = firebase.firestore()

function loadlist() {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://covid-193.p.rapidapi.com/countries",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key": "f25776e273mshdeac69e2098339fp19fd7bjsne2f245613497"
        }
    }
    
    $.ajax(settings).done(function (aresponse) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://covid-193.p.rapidapi.com/statistics",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "covid-193.p.rapidapi.com",
                "x-rapidapi-key": "f25776e273mshdeac69e2098339fp19fd7bjsne2f245613497"
            }
        }
        
        $.ajax(settings).done(function (response) {

            if (user.uid == undefined || user.uid == null) {
                    for (let i = 0; i < response.response.length; i++) {
                        const element = response.response[i];
                
                        a = document.createElement('a')
                        a.classList.add('list-group-item')
                        a.classList.add('flex-column')
                        a.classList.add('animated')
                        a.classList.add('fadeInUp')
                        a.classList.add('align-items-start')
                
                        if (element.deaths.new == null) {
                            element.deaths.new = '+0'
                        }
                        if (element.cases.new == null) {
                            element.cases.new = '+0'
                        }
                        
                            favFunc = "star('" + element.country + "', this)"
    
                        isCountry = false
                        for (let i = 0; i < aresponse.response.length; i++) {
                            if (aresponse.response[i] == element.country) {
                                isCountry = true
                            }
                        }
            
                        if (isCountry) {
                            a.innerHTML = '<div class="d-flex w-100 justify-content-between">         <h5 class="mb-1"><b>' + element.country + '</b></h5>   <small>Updated on ' + element.day + '.</small>       </div>       <center>           <br>       <div class="row">           <div style="color: var(--list-item-one)" class="col-sm">               <h3 class="leadnum">' + element.cases.active + '</h3>               <p>Active Cases</p><h4>' + element.cases.new + '</h4>           </div>           <div style="color: lime;" class="col-sm">             <h3 class="leadnum">' + element.cases.recovered + '</h3>              <p>Recovered</p>      <button onclick="' + favFunc + '" class="eon-text"><i class="material-icons">star_border</i></button>    </div>         <div style="color: rgb(255, 96, 96);" class="col-sm">             <h3 class="leadnum">' + element.deaths.total + '</h3>   <p>Deaths</p> <h4>' + element.deaths.new + '</h4></div> </div></center>'
                            document.getElementById('regionlist').appendChild(a)
                            
                        }
                    }
                    addWaves()
            }
            else {
                db.collection('users').doc(user.uid).get().then(function(doc) {
                    userpinned = doc.data().favs
                    if (userpinned == undefined || userpinned == null) {
                        userpinned = []
                    }
                    for (let i = 0; i < response.response.length; i++) {
                        const element = response.response[i];
                
                        a = document.createElement('a')
                        a.classList.add('list-group-item')
                        a.classList.add('flex-column')
                        a.classList.add('animated')
                        a.classList.add('fadeInUp')
                        a.classList.add('align-items-start')
                
                        if (element.deaths.new == null) {
                            element.deaths.new = '+0'
                        }
                        if (element.cases.new == null) {
                            element.cases.new = '+0'
                        }
                        
                        ispinned = false
                        for (let i = 0; i < userpinned.length; i++) {
                            if (userpinned[i] == element.country) {
                                ispinned = true
                                document.getElementById('pinnedtext').style.display = 'block'
                            }
                        }
    
                        if (ispinned) {
                            favFunc = "unstar('" + element.country + "', this)"
                        }
                        else {
                            favFunc = "star('" + element.country + "', this)"
                        }
    
                        isCountry = false
                        for (let i = 0; i < aresponse.response.length; i++) {
                            if (aresponse.response[i] == element.country) {
                                isCountry = true
                            }
                        }
            
                        if (isCountry) {
                            if (ispinned) {
                                a.innerHTML = '<div class="d-flex w-100 justify-content-between">         <h5 class="mb-1"><b>' + element.country + '</b></h5>   <small>Updated on ' + element.day + '.</small>       </div>       <center>           <br>       <div class="row">           <div style="color: var(--list-item-one)" class="col-sm">               <h3 class="leadnum">' + element.cases.active + '</h3>               <p>Active Cases</p><h4>' + element.cases.new + '</h4>           </div>           <div style="color: lime;" class="col-sm">             <h3 class="leadnum">' + element.cases.recovered + '</h3>              <p>Recovered</p>      <button onclick="' + favFunc + '" class="eon-text"><i class="material-icons">star</i></button>    </div>         <div style="color: rgb(255, 96, 96);" class="col-sm">             <h3 class="leadnum">' + element.deaths.total + '</h3>   <p>Deaths</p> <h4>' + element.deaths.new + '</h4></div> </div></center>'
                                document.getElementById('pinnedlist').appendChild(a)
                            }
                            else {
                                a.innerHTML = '<div class="d-flex w-100 justify-content-between">         <h5 class="mb-1"><b>' + element.country + '</b></h5>   <small>Updated on ' + element.day + '.</small>       </div>       <center>           <br>       <div class="row">           <div style="color: var(--list-item-one)" class="col-sm">               <h3 class="leadnum">' + element.cases.active + '</h3>               <p>Active Cases</p><h4>' + element.cases.new + '</h4>           </div>           <div style="color: lime;" class="col-sm">             <h3 class="leadnum">' + element.cases.recovered + '</h3>              <p>Recovered</p>      <button onclick="' + favFunc + '" class="eon-text"><i class="material-icons">star_border</i></button>    </div>         <div style="color: rgb(255, 96, 96);" class="col-sm">             <h3 class="leadnum">' + element.deaths.total + '</h3>   <p>Deaths</p> <h4>' + element.deaths.new + '</h4></div> </div></center>'
                                document.getElementById('regionlist').appendChild(a)
                            }
                            
                        }
                    }
                    addWaves()
                })
            }
        });
    });
}

function star(id, elei) {
    if (firebase.auth().currentUser) {

        db.collection('users').doc(user.uid).update({
            favs: firebase.firestore.FieldValue.arrayUnion(id)
        }).then(function() {
            Snackbar.show({text: id + ' pinned successfully.', pos: 'top-center'})
            elei.onclick = function() {
                unstar(id, this)
            }
            elei.innerHTML = '<i class="material-icons">star</i>'
            $( "#pinnedlist" ).append( $(elei).parent().parent().parent().parent() );
            document.getElementById('pinnedtext').style.display = 'block'
        })

    }
    else {
        Snackbar.show({text: "You must be signed in to use this feature.", pos: 'top-center'})
    }
}
function unstar(id, elei) {
    if (firebase.auth().currentUser) {

        db.collection('users').doc(user.uid).update({
            favs: firebase.firestore.FieldValue.arrayRemove(id)
        }).then(function() {
            Snackbar.show({text: id + ' unpinned successfully.', pos: 'top-center'})
            elei.onclick = function() {
                star(id, this)
            }
            elei.innerHTML = '<i class="material-icons">star_border</i>'
            $( "#regionlist").prepend( $(elei).parent().parent().parent().parent() );
                
            if($.trim($("#pinnedlist").html())=='') {
                document.getElementById('pinnedtext').style.display = 'none'    
            }
        })

    }
    else {
        Snackbar.show({text: "You must be signed in to use this feature.", pos: 'top-center'})
    }
}