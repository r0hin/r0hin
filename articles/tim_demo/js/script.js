function expand(el) {
    $('#sidebar').removeClass('collapsed')
    $('#content').removeClass('collapsed2')
    $(el).get(0).onclick = function() {
        collapse(this)
    }
}

function collapse(el) {
    $('#sidebar').addClass('collapsed')
    $('#content').addClass('collapsed2')
    $(el).get(0).onclick = function() {
        expand(this)
    }
}

function go(url) {
    a = document.createElement('a')
    a.href = url
    a.id = 'goEl'
    document.getElementsByTagName('body')[0].appendChild(a)
    document.getElementById('goEl').click()

}

function updateKeys(ey) {
    a = document.getElementsByClassName('game')

    ey = ey.value
    if (ey == ' ' || ey == ' ') {
        for (let i = 0; i < a.length; i++) {
            a[i].classList.remove('hidden')
        }
    }

    for (let i = 0; i < a.length; i++) {
        if (!a[i].getAttribute('gameName').includes(ey)) {
            a[i].classList.add('hidden')
        }
        else {
            a[i].classList.remove('hidden')
        }        
    }
}