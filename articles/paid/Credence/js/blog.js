for (var i = 0; i < obj.length; i++){



    res = obj[i].title.replace(/ /g, '')

var text = '<div class="modal fade bd-example-modal-xl" tabindex="-1" role="dialog" id="' + res + 'Modal" aria-hidden="true"> <div class="modal-dialog modal-xl"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title" id="' + res + 'ModalLabel">' + obj[i].title +'</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body"> <img style="object-fit: cover; width: 100%; height: 255px;" src="' + obj[i].banner +'" class="img-fluid" alt="Responsive image unable to load"><BR><BR> <h4 style="color: grey;">' + obj[i].subtitle + '</h4> <P style="color: rgb(58, 58, 58); width: 100%;">' + obj[i].content + '</P><br> <hr> <br><h5 style="display: inline-block; color: rgb(0, 0, 0);">Author: </h5> <h5 style="display: inline-block; color: rgb(89, 177, 248);">' + obj[i].writer + '</h5><h5 style="color: grey;">' + obj[i].authortag + '</h5><br><h5 style="display: inline-block; color: rgb(0, 0, 0);">Date published: </h5> <h5 style="display: inline-block; color: rgb(44, 44, 44);">'+ obj[i].date + '</h5> </div> <div class="modal-footer"> <button type="button" class="btn btn-primary" data-dismiss="modal">Done Reading</button> </div> </div> </div> </div>'




var e = document.createElement('div')
e.innerHTML = text
document.getElementById('modals').appendChild(e)

var e = document.createElement('div')
e.style.display = "inline-block"
e.style.padding = "20px"
e.style.textAlign = "left"
var text = '<div class="card" style="width: 18rem;"> <img style="object-fit: cover; height: 180px; width: 100%;" src="' + obj[i].banner + '" class="card-img-top" alt="..."> <div class="card-body"> <h5 class="card-title">' + obj[i].title + '</h5> <p class="card-text">' + obj[i].cardtext + '<br><br>' + obj[i].date + '</p> <a style="color: white;" data-toggle="modal" data-target="#' + res + 'Modal" class="btn btn-primary">Read this issue</a> </div> </div>'
e.innerHTML = text
document.getElementById('cards').appendChild(e)
//alert(obj[i].title)
}