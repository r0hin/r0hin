presnackbar()


function error(msg) {
    document.getElementById('erorrModalMsg').innerHTML = msg
    $('#errorModal').modal('toggle')
}

function presnackbar() {

    sb = document.createElement('div')
    sb.classList.add('eonsnackbar')
    sb.id = "snacc"
    document.getElementById('body').appendChild(sb)
}

function snackbar(a, b, c, d) {
    window.setTimeout(function () {

        x = document.getElementById('snacc')
        x.classList.add('eonsnackbar-active')
        x.innerHTML = a + "<button onclick='" + c + "' style='float: right; color: #BB86FC !important;' class='waves-flat-button btn-text-snackbar-primary'> " + b + " </button>"
        addWaves()

        window.setTimeout(function () {
            document.getElementById('snacc').classList.remove('eonsnackbar-active')
        }, d)

    }, 10)
}