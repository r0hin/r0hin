acontinue = true

function newLogo() {



    fop = storageRef.child(u().uid + '/logo')
    fop.listAll().then(function (res) {
        res.prefixes.forEach(function (folderRef) { });

        res.items.forEach(function (itemRef) {

            itemRef.delete()

        })

        filelist = document.getElementById('newImg').files
        file = filelist[0]

        var mountainImagesRef = storageRef.child(user() + "/logo/" + file.name);
        mountainImagesRef.put(file).then(function () {
            snackbar('Logo successfully replaced with ' + file.name + '.', '', '', '5000')
        })

    })


}

function authStateObserver(user) {
    if (user) {


        var profilePicUrl = getProfilePicUrl();

        db.collection('users').doc(user.uid).get().then(function(doc) {
            document.getElementById('portname').innerHTML = doc.data().name + "'s Portfolio"
            document.getElementById('username').innerHTML = doc.data().name
        })

        var userEmail = getUserEmail();

        document.getElementById('useremail').innerHTML = userEmail

        db.collection('portfolios').doc(u().uid).get().then(function (doc) {
            if (doc.exists) {
                document.getElementById('notcreated').style.display = 'none'
                document.getElementById('created').style.display = 'block'
                document.getElementById('created').classList.add('fadeIn')
                document.getElementById('deleteaccountbtn').onclick = function () {
                    deleteaccountfalse()
                };

                fop = storageRef.child(u().uid + '/logo')
                fop.listAll().then(function (res) {
                    res.prefixes.forEach(function (folderRef) { });

                    res.items.forEach(function (itemRef) {
                        fulllogopath = itemRef.fullPath; storage.ref(fulllogopath).getDownloadURL().then(function (url) {

                            f = document.createElement('img')
                            f.src = url
                            f.style.height = '75px';
                            document.getElementById('logocontainer').appendChild(f)





                        })

                    })
                })




            }

            else {
                document.getElementById('deleteaccountbtn').onclick = function () {
                    deleteaccounttrue()
                };
                document.getElementById('created').style.display = 'none'
                document.getElementById('notcreated').style.display = 'block'
                document.getElementById('notcreated').classList.add('fadeIn')
            }

        }).then(function () {





            document.getElementById('loaderbg').classList.add('fadeOut')
            window.setTimeout(function () {
                document.getElementById('loaderbg').style.display = 'none'
                document.getElementById('loader').style.display = 'none'
            }, 700)
            document.getElementById('loader').classList.add('zoomOut')
            refresh()



        })



    }
    else {


        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider).then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;
            snackbar('You are signed in.', '', '', '4000')
            // ...
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            alert(errorCode + ' - ' + errorMessage)
            // ...
        });





    }


}






initFirebaseAuth();


$('#chooseFile').bind('change', function () {
    var filename = $("#chooseFile").val();
    if (/^\s*$/.test(filename)) {
        $(".file-upload").removeClass('active');
        $("#noFile").text("No file chosen...");
    }
    else {
        $(".file-upload").addClass('active');
        $("#noFile").text(filename.replace("C:\\fakepath\\", ""));
    }
});



var storageRef = firebase.storage().ref();
db = firebase.firestore()


function createPortfolio() {


    if (!document.getElementById('curl').value.replace(/\s/g, '').length) {
        error('URL contains whitespace (spaces, line breaks, etc).')
    }

    else {



        document.getElementById('loaderbg').classList.add('fadeIn')
        document.getElementById('loaderbg').classList.remove('fadeOut')
        document.getElementById('loaderbg').style.display = 'block'
        document.getElementById('loader').classList.add('zoomIn')
        document.getElementById('loader').classList.remove('zoomOut')
        document.getElementById('loader').style.display = 'block'



        db.collection('portfolios').doc(user()).get().then(function (doc) {
            if (doc.exists) {

                window.setTimeout(function () {
                    document.getElementById('loaderbg').classList.add('fadeOut')
                    document.getElementById('loaderbg').classList.remove('fadeIn')
                    window.setTimeout(function () {
                        document.getElementById('loaderbg').style.display = 'none'
                        document.getElementById('loader').style.display = 'none'
                    }, 700)
                    document.getElementById('loader').classList.add('zoomOut')
                    document.getElementById('loader').classList.remove('zoomIn')
                    snackbar('Error whilst creating portfolio.', '', '', "5000")
                }, 1000)

                window.setTimeout(() => {
                    error('You have already created a portfolio.')
                }, 1200);




            }
            else {
                url = document.getElementById('curl').value
                db.collection('urls').doc(url).get().then(function (doc) {
                    if (doc.exists) {



                        window.setTimeout(function () {
                            document.getElementById('loaderbg').classList.add('fadeOut')
                            document.getElementById('loaderbg').classList.remove('fadeIn')
                            window.setTimeout(function () {
                                document.getElementById('loaderbg').style.display = 'none'
                                document.getElementById('loader').style.display = 'none'
                            }, 700)
                            document.getElementById('loader').classList.add('zoomOut')
                            document.getElementById('loader').classList.remove('zoomIn')
                            snackbar('Error whilst creating portfolio.', '', '', "5000")
                        }, 1000)

                        window.setTimeout(() => {
                            error('This URL Tag is already taken.')
                        }, 1200);




                    }
                    else {



                        window.setTimeout(function () {
                            try {
                                var file = document.getElementById('chooseFile').files
                                file = file[0]
                                var mountainImagesRef = storageRef.child(user() + "/logo/" + document.getElementById('chooseFile').files[0].name);
                                mountainImagesRef.put(file).then(function () {

                                })
                            }
                            catch{ }



                            db.collection('urls').doc(url).set({
                                owner: user(),

                            })

                            db.collection('portfolios').doc(user()).set({
                                uname: u().displayName,
                                uemail: u().email,
                                upfp: u().photoURL,
                                name: document.getElementById('cname').value,
                                job: document.getElementById('cjob').value,
                                phone: document.getElementById('cphone').value,
                                social1: document.getElementById('csocial1').value,
                                social2: document.getElementById('csocial2').value,
                                social3: document.getElementById('csocial3').value,
                                url: document.getElementById('curl').value,



                            }).then(function () {
                                db.collection('users').doc(user()).update({

                                    portfolio: true,
                                    portfolioName: document.getElementById('curl').value

                                }).then(function () {
                                    document.getElementById('loaderbg').classList.add('fadeOut')
                                    document.getElementById('loaderbg').classList.remove('fadeIn')
                                    window.setTimeout(function () {
                                        document.getElementById('loaderbg').style.display = 'none'
                                        document.getElementById('loader').style.display = 'none'
                                    }, 700)
                                    document.getElementById('loader').classList.add('zoomOut')
                                    document.getElementById('loader').classList.remove('zoomIn')
                                    snackbar('Portfolio Successfully Created.', '', '', "5000")
                                    window.location.reload()

                                })
                            }).catch(function (err) {
                                error(err)

                            })


                        }, 2000)







                    }
                })






            }
        })







    }

}


function get() {

    db.collection('portfolios').doc(user()).collection("content").onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {




            actualid = doc.id.replace(/ /g, "_");
            a = document.createElement('div')
            a.classList.add("accordion")
            a.id = 'accordianExample' + actualid
            imgId = "'" + actualid + "chooseFile'"
            docQuote = "'" + doc.id + "'"
            deletefunc2 = "if (confirm('Delete Collection?')) {db.collection('portfolios').doc('" + user() + "').collection('content').doc('" + doc.id + "').delete().then(function() {refresh(); snackbar('Collection successfully deleted.', ' ', ' ', '6000');})}"

            renameFunc = "catdescription('" + doc.id + "')"
            docidstr = "'" + doc.id + "'"
            var coverFunc = "setcatcover(" + docidstr + ")"
            var renameColFunc = "renamecollection('" + doc.id + "')"
            a.innerHTML = '<div style="border-radius: 5px;" class="card"> <div class="card-header" id="' + actualid + 'headingOne"> <center><button class="waves-flat-button btn-text-primary" style="width: 100%" type=" button" data-toggle="collapse" data-target="#' + actualid + 'collapseOne" aria-expanded="false" aria-controls="' + actualid + 'collapseOne"> ' + doc.id + '</button></center> </div> <div id="' + actualid + 'collapseOne" class="collapse" aria-labelledby="' + actualid + 'headingOne" data-parent="#accordionExample' + actualid + '"> <div id="' + actualid + 'contentOne" class="card-body"> <input style="display: none" onchange="upload(this.id, ' + docQuote + ')" accept="image/*" multiple="multiple" type="file" name="chooseFile" id="' + actualid + 'chooseFile"> <button onclick="document.getElementById(' + imgId + ').click()" class="waves-flat-button btn-raised-primary">Add Images to ' + doc.id + '</button>  <div style="display: inline-block;" class="dropdown"> <button class="waves-flat-button btn-text-primary dropdown-toggle" type="button" id="dropdownMenuButton' + actualid + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Collection Settings </button> <div class="dropdown-menu" aria-labelledby="dropdownMenuButton' + actualid + '"> <a style="display: none;" onclick="' + renameColFunc + '" class="waves-flat-button dropdown-item" href="#">Rename Collection</a> <a onclick="' + renameFunc + '" class="waves-flat-button dropdown-item" >Edit Description</a> <a class="waves-flat-button dropdown-item" onclick="' + coverFunc + '">Set Cover Image</a> <a style="color: black; "onclick="' + deletefunc2 + '" class="waves-flat-button dropdown-item">Delete Collection</a>  </div> </div> <button onclick="refresh()" style="display: inline-block;" class="waves-flat-button btn-text-primary">Repair / Refresh</button> <hr> <div id="images' + actualid + '"></div> </div> </div> </div>'
            c = "images" + doc.id
            document.getElementById('manager').appendChild(a)
            document.getElementById('manager').appendChild(document.createElement("br"))






            fop = storageRef.child(user() + '/content/' + doc.id)
            fop.listAll().then(function (res) {
                res.prefixes.forEach(function (folderRef) { });


                res.items.forEach(function (itemRef) {
                    path = itemRef.fullPath; storage.ref(path).getDownloadURL().then(function (url) {


                        b = document.createElement('div')

                        beforeId = itemRef.name + 'el'
                        beforeId2 = beforeId.replace(/\./g, '-')
                        b.id = beforeId2.replace(/ /g, "_");
                        bid_copy = beforeId2.replace(/ /g, "_");
                        elIdBefore = beforeId.replace(/\./g, '-')
                        elId = elIdBefore.replace(/ /g, "_");

                        actualid = doc.id.replace(/ /g, "_");
                        deleteFunc = 'deleteImage("' + bid_copy + '", "' + itemRef.fullPath + '")'

                        var filename = itemRef.toString().replace(/^.*[\\\/]/, '')
                        filename = filename.replace(/ /g, "_")
                        filename = filename.replace(/-/g, "_")
                        firelane = filename.replace(/\./g, '10982c190248jc01k8c209k18lz0918j2094')
                        captionFunc = 'x = prompt("Enter a new caption:"); db.collection("portfolios").doc(user()).collection("content").doc("' + doc.id + '").update({' + firelane + ': x}).then(function(){refresh();snackbar("Caption changed successfully.","","","4000")})'

                        if (itemRef.name.includes("coverimage98139871876237869387187")) {
                            b.innerHTML = "<img style='display: none; width: 150px' src='" + url + "'<br><br><button style='display: none;' onclick='" + deleteFunc + "' class='waves-flat-button btn-text-primary'><i class='material-icons'>delete</i></button>"
                        }
                        else {
                            b.innerHTML = "<img style='width: 150px' src='" + url + "'<br><br><br><button onclick='" + deleteFunc + "' class='waves-flat-button btn-text-primary'><i class='material-icons'>delete</i></button><button onclick='" + captionFunc + "' class='waves-flat-button btn-text-primary'>Caption</button>"
                        }



                        b.style.padding = "6px"
                        b.style.display = "inline-block"


                        document.getElementById("images" + actualid).appendChild(b)

                        addWaves()

                    });
                })
            })

            addWaves()
        })







    })

    document.getElementById('manager').classList.remove('fadeOut')
    document.getElementById('manager').classList.add('animated')
    document.getElementById('manager').classList.add('fadeIn')

}



function deleteImage(id, path) {

    console.log(id)
    $("#" + id).remove()
    var desertRef = storageRef.child(path);
    desertRef.delete().then(function () {
        snackbar("Image deleted." + " " + " " + "3000")
    }).catch(function (error) {
        console.log(error)
    });

}



function openPort() {

    db.collection('users').doc(user()).get().then(function (doc) {
        window.open('site.html?s=' + doc.data().portfolioName)
    })


}



function createCat() {



    db.collection('portfolios').doc(user()).collection("content").doc(document.getElementById('ccategory').value).set({
        description: "Edit this text in your panel."
    })
    document.getElementById('ccategory').value = ''
    snackbar("Category successfully created.", "", "", "4000")
    refresh()
}

function upload(id, category) {


    filelist = document.getElementById(id).files

    fop = storageRef.child(user() + '/content/' + category)


    for (let i = 0; i < filelist.length; i++) {

        fop.listAll().then(function (res) {

            res.prefixes.forEach(function (folderRef) { });

            res.items.forEach(function (itemRef) {
                acontinue = true

                if (itemRef.name == filelist[i].name) {
                    error('A file exists in that section with that name.')
                    acontinue = false

                }

            })

            if (acontinue == true) {
                finalRef = storageRef.child(user() + '/content/' + category + "/" + filelist[i].name)
                finalRef.put(filelist[i]).then(function () {
                    snackbar('Successfully uploaded file(s).', " ", " ", "4500")
                    refresh()
                })
                if (i == filelist.length) {
                    refresh()
                }
            }



        }).catch(function (err) {
            error(err)

        })

    }

}



function refresh() {

    document.getElementById('blogsposts').classList.remove('fadeIn')
    document.getElementById('blogpostscontent').classList.remove('fadeIn')
    document.getElementById('blogsposts').classList.add('fadeOut')
    document.getElementById('blogpostscontent').classList.add('fadeOut')

    window.setTimeout(() => {
        $('#blogsposts').empty()
        $('#blogspostscontent').empty()
        $('#blogpostscontent').empty()
        $('#blogtitle').html('')
        blog()

    }, 200);




    document.getElementById('manager').classList.remove('fadeIn')
    document.getElementById('manager').classList.add('animated')
    document.getElementById('manager').classList.add('fadeOut')
    try {
        db.collection('portfolios').doc(user()).get().then(function (doc) {
            if (!doc.exists) {
                return;
            }
            if (doc.data().enabled == false) {
                document.getElementById('disablebtn').innerHTML = 'Enable'
                document.getElementById('disablebtn').onclick = function () { enablePort() }

                document.getElementById('statusicon').innerHTML = 'cancel'
                document.getElementById('statusicon').style.color = '#cc2727'
                document.getElementById('statustext').innerHTML = 'Portfolio Offline'
            }
        })

        window.setTimeout(() => {
            $('#manager').empty()
            get()
        }, 200);
    }

    catch (err) {
        console.log('error happened');
    }

}


function catdescription(docid) {
    db.collection("portfolios").doc(user()).collection("content").doc(docid).get().then(function (doc) {
        previous = doc.data().description
        var person = prompt('Enter new description', previous);
        if (person == null || person == '') {
            snackbar('You cancelled the prompt; nothing was changed.', '', '', '4000')
        }
        else {
            x = confirm('========================\nConfirm Description Change\n\nPrevious: \n' + previous + "\n\nNew: \n" + person + "\n\n========================\nContinue?")
            if (x == true) {
                db.collection('portfolios').doc(user()).collection("content").doc(docid).update({
                    description: person,
                }).then(function () {
                    snackbar('Description changed.', '', '', '4000')
                    refresh()
                })
            }
            else {
                snackbar('You cancelled the prompt; nothing was changed.', '', '', '4000')
            }
        }
    })

}


function modifyPortfolio() {

    document.getElementById('loaderbg').classList.add('fadeIn')
    document.getElementById('loaderbg').classList.remove('fadeOut')
    document.getElementById('loaderbg').style.display = 'block'
    document.getElementById('loader').classList.add('zoomIn')
    document.getElementById('loader').classList.remove('zoomOut')
    document.getElementById('loader').style.display = 'block'




    window.setTimeout(function () {

        db.collection('portfolios').doc(user()).update({
            uname: u().displayName,
            uemail: u().email,
            upfp: u().photoURL,
            name: document.getElementById('ccname').value,
            job: document.getElementById('ccjob').value,
            phone: document.getElementById('ccphone').value,
            social1: document.getElementById('ccsocial1').value,
            social2: document.getElementById('ccsocial2').value,
            social3: document.getElementById('ccsocial3').value,



        }).then(function () {
            db.collection('users').doc(user()).update({

                portfolio: true,

            }).then(function () {
                document.getElementById('loaderbg').classList.add('fadeOut')
                document.getElementById('loaderbg').classList.remove('fadeIn')
                window.setTimeout(function () {
                    document.getElementById('loaderbg').style.display = 'none'
                    document.getElementById('loader').style.display = 'none'
                }, 700)
                document.getElementById('loader').classList.add('zoomOut')
                document.getElementById('loader').classList.remove('zoomIn')
                snackbar('Portfolio successfully modified.', '', '', "5000")

            }).catch(function (err) {
                error(err)
            })
        }).catch(function (err) {
            error(err)
        })
    }, 2000)
}

function buttonmodify() {

    db.collection('portfolios').doc(user()).get().then(function (doc) {


        document.getElementById('floatinglabelhasvalue1').classList.add('has-value')
        document.getElementById('floatinglabelhasvalue2').classList.add('has-value')
        document.getElementById('floatinglabelhasvalue3').classList.add('has-value')
        document.getElementById('floatinglabelhasvalue4').classList.add('has-value')
        document.getElementById('floatinglabelhasvalue5').classList.add('has-value')
        document.getElementById('floatinglabelhasvalue6').classList.add('has-value')






        document.getElementById('ccname').value = doc.data().name
        document.getElementById('ccjob').value = doc.data().job
        document.getElementById('ccphone').value = doc.data().phone
        document.getElementById('ccsocial1').value = doc.data().social1
        document.getElementById('ccsocial2').value = doc.data().social2
        document.getElementById('ccsocial3').value = doc.data().social3

        $('#editportfolio').modal('toggle')
    })
}
function disablePort() {

    x = confirm("======= Disable Portfolio Confirmation ======\n\nAre you sure you would like to disable your portfolio. Nobody will be able to access it until you renable it. No data will be deleted and you will be able to modify the portfolio content while it's disabled.\n \n====================================\n\nClick OK to confirm:")
    if (x == true) {

        db.collection('portfolios').doc(user()).update({
            enabled: false,
        }).then(function () {
            refresh()
            snackbar('Your portfolio was successfully disabled.', '', '', '4000')
        })


    }
    else {
        snackbar('You cancelled the prompt; nothing was changed.', '', '', '4000')
    }
}

function enablePort() {

    x = confirm("======= Enable Portfolio Confirmation ======\n\nAre you sure you would like to enable your portfolio. Everyone will be able to access it again until you disable it.\n \n====================================\n\nClick OK to confirm:")
    if (x == true) {

        db.collection('portfolios').doc(user()).update({
            enabled: true,
        }).then(function () {
            window.location.reload()
        })


    }
    else {
        snackbar('You cancelled the prompt; nothing was changed.', '', '', '4000')
    }
}

function deletePort() {

    x = confirm("======= Delete Portfolio ======\n\nAre you sure you would like to PERMANENTLY DELETE your portfolio. Once deleted, all content will be removed and it will be impossible to be restored. We are not responsible for any loss of content upon deleting your portfolio.\n \n====================================\n\nClick OK to confirm:"); if (x == true) {
        y = confirm("======= Delete Portfolio ======\n\nAre you sure you would like to PERMANENTLY DELETE your portfolio. Once deleted, all content will be removed and it will be impossible to be restored. We are not responsible for any loss of content upon deleting your portfolio.\n \n====================================\n\nClick OK to confirm:"); if (y == true) {

            db.collection('users').doc(user()).get().then(function (doc) {
                oldurl = doc.data().portfolioName
                deleteFolderContents(u().uid + '/logo')


                db.collection('portfolios').doc(user()).collection('content').get().then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        deleteFolderContents(u().uid + '/content/' + doc.id)
                    })


                    db.collection('portfolios').doc(user()).delete().then(function () {
                        db.collection('users').doc(user()).delete().then(function () {
                            db.collection('urls').doc(oldurl).delete().then(function () {



                                window.setTimeout(function () {
                                    snackbar('Logo deleted.', '', '', '1000')
                                    window.setTimeout(function () {
                                        snackbar('All content deleted.', '', '', '1000')
                                        window.setTimeout(function () {
                                            snackbar('Portfolio deleted.', '', '', '1000')
                                            window.setTimeout(function () {
                                                snackbar('User deleted.', '', '', '1000')
                                                window.setTimeout(function () {
                                                    snackbar('URL traces deleted.', '', '', '1000')
                                                    window.setTimeout(function () {
                                                        snackbar('Updating preferences...', '', '', '1000')
                                                        window.setTimeout(function () {
                                                            window.location.reload()
                                                        }, 1000)
                                                    }, 1000)
                                                }, 1000)
                                            }, 1000)
                                        }, 1000)
                                    }, 1000)
                                }, 1000)





                            })
                        })
                    })
                })


            })




        } else { snackbar('You cancelled the prompt; nothing was changed.', '', '', '4000') }
    } else { snackbar('You cancelled the prompt; nothing was changed.', '', '', '4000') }




}

function deleteFolderContents(path) {
    ref = storageRef.child(path)
    ref.listAll().then(function (res) {
        res.items.forEach(function (itemRef) {
            tempName = itemRef.name
            itemRef.delete().then(function () {
                snackbar('Deleted file ' + tempName + '.', '', '', '1000')
            })


        });
    }).catch(function (error) {

    });



}





function deleteaccountfalse() {
    alert('Please delete your portfolio first.')
}
function deleteaccounttrue() {
    alert('Warning: Deleting your account requires you to have signed in recently. This action is irreversible but you will be able to recreate your account by signing in with Google again..')
    var provider = new firebase.auth.GoogleAuthProvider();


    firebase.auth().signOut().then(function () {
        alert('Account successfully deleted.')
        window.location.replace('index.html?val=a')

    }).catch(function (error) {
        error('An error occured. Please sign out and sign back in.')
    });




}

function setcatcover(id) {
    sessionStorage.setItem('currentid', id)
    document.getElementById('newcover').click();
}
function updatecover() {
    id = sessionStorage.getItem('currentid')
    files = document.getElementById('newcover').files


    ext = files[0].name.split('.').pop();

    var coverref = storageRef.child(user() + '/content/' + id + '/coverimage98139871876237869387187.png');

    coverref.put(files[0]).then(function (snapshot) {
        snackbar('Cover image uploaded / replaced.', '', '', '4000')
    });

}

function settings() {

    $('#settingsModal').modal('toggle')



}

function light() {
    $('#settingsModal').modal('toggle')
    db.collection('users').doc(user()).update({
        theme: 'light',
    }).then(function () {
        snackbar('Theme changed; redirecting.', '', '', '1500')
        window.setTimeout(() => {
            window.location.replace('redirect.html')
        }, 1500);
    })
}

function dark() {
    $('#settingsModal').modal('toggle')
    db.collection('users').doc(user()).update({
        theme: 'dark',
    }).then(function () {
        snackbar('Theme changed; redirecting.', '', '', '1500')
        window.setTimeout(() => {
            window.location.replace('redirect.html')
        }, 1500);
    })
}

function renamecollection(docid) {

    newName = window.prompt('Enter new collection name:')
    db.collection('portfolios').doc(user()).collection('content').doc(docid).get().then(function (doc) {
        var data = doc.data()
        db.collection('portfolios').doc(user()).collection('content').doc(newName).set(data).then(function () {
            db.collection('portfolios').doc(user()).collection('content').doc(docid).delete().then(function () {
                refresh()
            })
        })


    })

}

function changeURL() {

    newurl = document.getElementById('newurl').value
    document.getElementById('newurl').value = ''

    if (!newurl.replace(/\s/g, '').length) {
        error('URL contains whitespace (spaces, line breaks, etc).')
    }

    else {
        db.collection('urls').doc(newurl).get().then(function (doc) {
            if (doc.exists) {
                error('URL is already taken.')
            }
            else {


                db.collection('portfolios').doc(user()).get().then(function (doc) {
                    oldurl = doc.data().url

                    db.collection('portfolios').doc(user()).update({
                        url: newurl
                    }).then(function () {

                        db.collection('urls').doc(oldurl).delete().then(function () {

                            db.collection('urls').doc(newurl).set({
                                owner: user()
                            }).then(function () {
                                db.collection('users').doc(user.uid).update({
                                    portfolioName: newurl
                                }).then(function() {
                                    snackbar('URL changed to ' + newurl, '', '', '4000')
                                })

                            }).catch(function (error) {
                                error(error)
                            })
                        }).catch(function (error) {
                            error(error)
                        })

                    }).catch(function (error) {
                        error(error)
                    })

                }).catch(function (error) {
                    error(error)
                })
            }
        }

        )
    }

}

function createblog() {
    document.getElementById('blogdisabled').classList.add('zoomOut')
    document.getElementById('blogdisabled').classList.add('slower')

    db.collection('portfolios').doc(user()).collection('blogs').doc('meta').set({
        enabled: true
    }).then(function () {
        window.location.reload()
    })


}

function blog() {
    db.collection('portfolios').doc(user()).collection('blogs').doc('meta').get().then(function (doc) {
        if (!doc.exists) {
            return;
        }
        if (doc.data().enabled == true) {
            document.getElementById('blogdisabled').style.display = 'none'
            document.getElementById('blogenabled').style.display = 'block'
            document.getElementById('blogenabled').classList.add('fadeIn')

            db.collection('portfolios').doc(user()).collection('blogs').get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    docid = doc.id.replace(/ /g, "_");
                    if (doc.id == 'meta') {
                        console.log('skipping meta doc');
                    }
                    else {

                        docid = doc.id.replace(/ /g, "_");

                        a = document.createElement('button')
                        a.classList.add('waves-flat-button')
                        a.classList.add('btn-text-primary')
                        a.id = docid + 'btn'
                        a.style.width = '98%'
                        a.innerHTML = doc.id
                        a.onclick = function () {
                            $('#blogpostscontent').children('div').each(function () {
                                this.style.display = 'none'
                            });

                            document.getElementById(doc.id.replace(/ /g, "_") + 'contentelement').style.display = 'block'
                            document.getElementById(doc.id.replace(/ /g, "_") + 'timeelement').style.display = 'block'
                            document.getElementById(doc.id.replace(/ /g, "_") + 'saveelement').style.display = 'block'
                            document.getElementById('blogtitle').innerHTML = 'Viewing: ' + doc.id

                        }
                        document.getElementById('blogsposts').appendChild(a)

                        b = document.createElement('div')
                        b.id = docid + 'contentelement'
                        b.style.display = 'none'
                        c = document.createElement('div')
                        c.style.width = '90%'
                        c.innerHTML = '<h5>' + doc.data().time.toDate() + '</h5>'
                        c.id = docid + 'timeelement'
                        c.style.display = 'none'
                        b.innerHTML = doc.data().content
                        b.contentEditable = "true"


                        d = document.createElement('div')
                        updateblogfunc = "db.collection('portfolios').doc(user()).collection('blogs').doc('" + doc.id + "').update({content: document.getElementById('" + doc.id.replace(/ /g, "_") + "contentelement').innerHTML}).then(function(){snackbar('Updated blog post.', '', '', '3500')})"
                        renameBlogFunc = "x = prompt('Enter your new blog title:'); db.collection('portfolios').doc(user()).collection('blogs').doc('" + doc.id + "').get().then(function(doc) { old = doc.data();  db.collection('portfolios').doc(user()).collection('blogs').doc(doc.id).delete().then(function() {  db.collection('portfolios').doc(user()).collection('blogs').doc(x).set(old).then(function() {  snackbar('Blog was renamed successfully.', '', '', '4000');refresh()  }).catch(function(err) {     error(err) })  }).catch(function(err) {     error(err) })  }).catch(function(err) {     error(err) })"
                        deletefunc3 = "db.collection('portfolios').doc(user()).collection('blogs').doc('" + doc.id + "').delete().then(function(){snackbar('" + doc.id + " was deleted successfully.', '', '', '4000');refresh()})"
                        d.innerHTML = '<br><button class="waves-flat-button btn-raised-primary" onclick="' + updateblogfunc + '">save</button><div style="display: inline-block;" class="dropdown"> <button class="waves-flat-button btn-text-primary dropdown-toggle" type="button" id="dropdownMenuButton' + doc.id.replace(/ /g, "_") + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Blog Settings </button> <div class="dropdown-menu" aria-labelledby="dropdownMenuButton' + doc.id.replace(/ /g, "_") + '"> <a style="display: block;" onclick="' + renameBlogFunc + '" class="waves-flat-button dropdown-item" href="#">Change Blog Title</a> <a onclick="' + deletefunc3 + '" class="waves-flat-button dropdown-item">Delete Blog</a>  </div> </div>'
                        d.id = docid + 'saveelement'
                        d.style.display = 'none'

                        document.getElementById('blogpostscontent').appendChild(c)

                        document.getElementById('blogpostscontent').appendChild(b)
                        document.getElementById('blogpostscontent').appendChild(d)



                        addWaves()




                    }
                })
            })







        }
    })
    document.getElementById('blogsposts').classList.remove('fadeOut')
    document.getElementById('blogpostscontent').classList.remove('fadeOut')
    document.getElementById('blogsposts').classList.add('fadeIn')
    document.getElementById('blogpostscontent').classList.add('fadeIn')
}

function newBlog() {

    title = document.getElementById('exampleFloatingBox1').value
    content = document.getElementById('textareathing').value

    db.collection('portfolios').doc(user()).collection('blogs').doc(title).get().then(function (doc) {
        if (doc.exists) {
            error('You have already created a blog with this title.')
        }

        else {

            db.collection('portfolios').doc(user()).collection('blogs').doc(title).set({
                content: content,
                time: firebase.firestore.FieldValue.serverTimestamp(),
            }).then(function () {
                document.getElementById('exampleFloatingBox1').value = ""
                document.getElementById('textareathing').value = ""
                document.getElementById('btnexpand').click()
                snackbar('Blog has been created.', '', '', '5000')
                refresh()
            })

        }
    })

}



function blogimage() {
    document.getElementById('chooseFileBlog').click()

}
function uploadblogimg() {
    file = document.getElementById('chooseFileBlog').files[0]

    ref = storageRef.child(user() + '/blogcontent/' + file.name)
    ref.put(file).then(function () {

        ref = storageRef.child(user() + '/blogcontent/' + file.name).getDownloadURL().then(function (url) {

            console.log(url)

            var element = document.querySelector("trix-editor")
            element.editor.insertHTML("<img src='" + url + "'>")


        })
    })

}