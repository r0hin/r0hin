var url_string = window.location.href
var url = new URL(url_string);
var tag = url.searchParams.get("s");
if (tag == null) {
    window.location.replace('index.html')
}

else {
    db = firebase.firestore()
    db.collection("urls").doc(tag).get().then(function (doc) {
        if (doc.exists) {
            x = doc.data().owner
            db.collection('portfolios').doc(x).get().then(function (doc) {


                if (doc.data().enabled == false) {
                    alert('Sorry, this portfolio is currently disabled.')
                    window.location.replace('index.html')
                }




                db.collection('portfolios').doc(x).collection('blogs').doc('meta').get().then(function (doc) {
                    if (doc.exists) {
                        if (doc.data().enabled == true) {
                            startblog()
                        }
                    }
                    else {
                        console.log("Blog not enabled.");
                    }
                })



                document.getElementById('a').innerHTML = doc.data().name
                document.getElementById('a').classList.add('animated'); document.getElementById('a').classList.add('fadeIn');
                document.getElementById('b').innerHTML = doc.data().job
                document.getElementById('b').classList.add('animated'); document.getElementById('b').classList.add('fadeIn');

                db.collection('portfolios').doc(x).get().then(function (doc) {

                    if (doc.data().social1 == '') {

                    }
                    else {
                        document.getElementById('d').href = doc.data().social1
                        document.getElementById('d').style.display = 'inline-block'
                        document.getElementById('d').classList.add('fadeInDown');
                    }

                    if (doc.data().social2 == '') {

                    }
                    else {
                        document.getElementById('e').href = doc.data().social2
                        document.getElementById('e').style.display = 'inline-block'
                        document.getElementById('e').classList.add('fadeInDown');
                    }

                    if (doc.data().social3 == '') {

                    }
                    else {
                        document.getElementById('f').href = doc.data().social3
                        document.getElementById('f').style.display = 'inline-block'
                        document.getElementById('f').classList.add('fadeInDown');
                    }

                    if (doc.data().phone == '') {

                    }
                    else {
                        document.getElementById('g').onclick = function () { alert('Phone Number: ' + doc.data().phone) }
                        document.getElementById('g').style.display = 'inline-block'
                        document.getElementById('g').classList.add('fadeInDown');
                    }


                })






                db.collection('portfolios').doc(x).collection('content').get().then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {


                        a = document.createElement('div')
                        a.classList.add('animated'); a.classList.add('fadeIn');
                        a.style = "display: inline-block; padding: 15px; border-radius: 5px; width: 30%;"
                        modalToggleFunc = "$('#" + doc.id.split(' ').join('-') + "Modal').modal('toggle')"
                        a.innerHTML = '<div style="border-radius: 15px; width: 100%;" class="card"><div style="padding: 0px;" class="card-body"><br><img class="shadow-sm" style="width: 90%;height: 240px;object-fit:cover;" id="' + doc.id.split(' ').join('-') + 'image" src="" alt=""><br><br><center><h3>' + doc.id + '</h3><h5>' + doc.data().description + '</h5><a onclick="' + modalToggleFunc + '" class="waves-flat-button btn-text-primary">view collection</a><br><br></center></div></div>'
                        document.getElementById('contentdivs').appendChild(a)

                        storageRef.child(x + '/content/' + doc.id + '/coverimage98139871876237869387187.png').getDownloadURL().then(function (url) {

                            document.getElementById(doc.id.split(' ').join('-') + 'image').src = url

                        }).catch(function (error) {
                            url = "https://dummyimage.com/600x400/000/fff&text=no+cover+image"
                            document.getElementById(doc.id.split(' ').join('-') + 'image').src = url
                        });

                        b = document.createElement('div')
                        b.innerHTML = '        <div class="modal fade" id="' + doc.id.split(' ').join('-') + 'Modal" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h3>' + doc.id + '</h3></div><div class="modal-body"><center><div id="' + doc.id.split(' ').join('-') + 'contentdiv"></div></center></div><div class="modal-footer"><button type="button" class="waves-flat-button btn-text-primary" data-dismiss="modal">done</button></div></div></div></div>'
                        document.getElementById('modals').appendChild(b)

                        fop = storageRef.child(x + '/content/' + doc.id)
                        fop.listAll().then(function (res) {
                            res.prefixes.forEach(function (folderRef) { });
                            res.items.forEach(function (itemRef) {
                                path = itemRef.fullPath; storage.ref(path).getDownloadURL().then(function (url) {
                                    var filename = itemRef.toString().replace(/^.*[\\\/]/, '')
                                    firelane = filename.replace(/\./g, '10982c190248jc01k8c209k18lz0918j2094')
                                    if (firelane.includes('coverimage98139871876237869387187')) {
                                        console.log('Skipping cover image');
                                    }

                                    else {



                                        c = document.createElement('div')
                                        c.innerHTML = '<img src="' + url + '" style="width: 90%; border-radius: 5px;">'
                                        var firepane = itemRef.toString().replace(/^.*[\\\/]/, '')
                                        firepane = firepane.replace(/ /g, "_")
                                        firepane = firepane.replace(/-/g, "_")
                                        firepane = firepane.replace(/\./g, '10982c190248jc01k8c209k18lz0918j2094')
                                        c.id = firepane
                                        document.getElementById(doc.id.split(' ').join('-') + 'contentdiv').appendChild(c)



                                        db.collection('portfolios').doc(x).collection('content').doc(doc.id).get().then(function (doc) {

                                            data = doc.data()

                                            var filename = itemRef.toString().replace(/^.*[\\\/]/, '')
                                            filename = filename.replace(/ /g, "_")
                                            filename = filename.replace(/-/g, "_")
                                            firelane = filename.replace(/\./g, '10982c190248jc01k8c209k18lz0918j2094')

                                            x = doc.data()[firelane]

                                            j = document.createElement('center')
                                            if (x == undefined || x == 'undefined') {
                                                j.innerHTML = '<h5></h5>'
                                            }
                                            else {
                                                j.innerHTML = '<h5>' + x + '</h5>'
                                            }

                                            document.getElementById(doc.id.split(' ').join('-') + 'contentdiv').appendChild(document.createElement('br'))
                                            document.getElementById(firepane).appendChild(j)
                                            document.getElementById(doc.id.split(' ').join('-') + 'contentdiv').appendChild(document.createElement('br'))

                                        })



                                        addWaves()
                                    }
                                });
                            })
                        })



                        addWaves()

                    });



                    fop = storageRef.child(x + '/logo')
                    fop.listAll().then(function (res) {
                        res.prefixes.forEach(function (folderRef) { });

                        res.items.forEach(function (itemRef) {
                            fulllogopath = itemRef.fullPath; storage.ref(fulllogopath).getDownloadURL().then(function (url) {


                                document.getElementById('c').src = url

                                document.getElementById('c').style.display = 'block'
                                document.getElementById('c').classList.add('animated')
                                document.getElementById('c').classList.add('zoomIn')




                            })

                        })
                    })







                });










            })
        }
        else {
            error('Specified portfolio does not exist.')
        }
    })

}


function startblog() {

    db.collection('portfolios').doc(x).collection('blogs').get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {


            if (doc.id == 'meta') {
                console.log("Skipping meta doc");
            }
            else {

                g = document.createElement('button')
                g.innerHTML = doc.id
                g.classList.add('btn-text-primary')
                g.style.width = '100%'
                g.onclick = function () {
                    $('#' + doc.id.replace(/ /g, "_") + 'Modal').modal('toggle')
                }

                g.classList.add('waves-flat-button')
                document.getElementById('blogs').appendChild(g)
                document.getElementById('blogs').appendChild(document.createElement('br'));
                addWaves()

                document.getElementById('blogcontainer').classList.add('zoomInUp')
                document.getElementById('blogcontainer').style.display = 'block'

                h = document.createElement('div')
                h.innerHTML = '<div class="modal fade bd-example-modal-lg" id="' + doc.id.replace(/ /g, "_") + 'Modal" tabindex="-1" role="dialog" aria-hidden="true"> <div class="modal-dialog modal-lg" role="document"> <div class="modal-content"> <div class="modal-header"> <h3>' + doc.id + ' (<b>' + doc.data().time.toDate() + '</b>)</h3> </div> <div class="modal-body">' + doc.data().content + '</div> <div class="modal-footer"><button type="button" class="waves-flat-button btn-text-primary"   data-dismiss="modal">done reading</button></div>  </div>  </div>  </div>'

                document.getElementById('modals').appendChild(h)
                addWaves()
            }


        })
    })




}
function readValue(name) {
    return window[name]
}   