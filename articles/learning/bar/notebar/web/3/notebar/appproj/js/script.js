function go() {
    isDark = document.getElementById('customCheck1').checked
    isFont = document.getElementById('customCheck2').checked

    if (isFont == true) {
        localStorage.setItem('font', 'minimal')
    }
    else if (isFont == false) {
        localStorage.setItem('font', 'typewriter')
    }
 
    localStorage.setItem('mode', isDark)

    start()
}
start()
function start() {
    x = localStorage.getItem('mode')
    if (x == 'true') {
        window.location.replace('homedark.html')
    }
    else if (x == 'false') {
        window.location.replace('home.html')
    }
    else if (x == undefined) {
        $('#exampleModal').modal('toggle')
    }
}