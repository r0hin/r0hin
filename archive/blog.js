for (var i = 0; i < obj.length; i++) {



    res = obj[i].title.replace(/ /g, '')

    var text = '<div class="modal fade bd-example-modal-xl" tabindex="-1" role="dialog" id="' + res + 'Modal" aria-hidden="true"> <div class="modal-dialog modal-lg"> <div class="modal-content"> <div class="modal-header"> <h2>' + obj[i].title + '</h2> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body"> <img style="object-fit: cover; width: 100%; height: 255px;" src="' + obj[i].banner + '" class="img-fluid" alt="Responsive image unable to load"><BR><BR> <h3>' + obj[i].subtitle + '</h3> <h5 style="font-family: Roboto; color: rgb(58, 58, 58); width: 90%;">' + obj[i].content + '</h5><br> <hr> <br><h5 style="display: inline-block; color: rgb(0, 0, 0);">Category: </h5> <h5 style="display: inline-block; color: black"><b>' + obj[i].category + '</b></h5><br>  </h5> <h5 style="display: inline-block; color: black">  Author: <b>' + obj[i].writer + '</b></h5><h5 style="color: grey;">' + obj[i].authortag + '</h5><br><h5 style="display: inline-block; color: rgb(0, 0, 0);">Date published: </h5> <h5 style="display: inline-block; color: rgb(44, 44, 44);">' + obj[i].date + '</h5> </div> <div class="modal-footer"> <button type="button" class="waves-flat-button" data-dismiss="modal">DONE</button> </div> </div> </div> </div>'




    var e = document.createElement('div')
    e.innerHTML = text
    document.getElementById('modals').appendChild(e)
    var ii = i + 1
    var e = document.createElement('div')
    var text = '<div data-toggle="modal" data-target="#' + res + 'Modal" class="blog-item waves-float-box waves-dark" style="text-align: left; padding: 15px; font-family: Lato;font-size: 40px; border-bottom: 1px solid black;"><b>' + obj[i].title + '</b> <div style="font-size: 20px; float: right">' + obj[i].date + '<br><b>' + ii + '</b>, ' + obj[i].category + '</div></div>'
    e.innerHTML = text
    document.getElementById('cards').appendChild(e)

    addWaves()

    document.getElementById('buttons').appendChild(document.createElement('br'))

}