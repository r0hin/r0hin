function expand(el) {
    $('#sidebar').removeClass('collapsed')
    $('#content').removeClass('collapsed2')
    $(el).get(0).onclick = function() {
        collapse(this)
    }


    $('#servicestext').toggleClass('hidden')
    $('#homebtn').html('<i class="material-icons">home</i> HOME')
    $('#gamebtn').html('<i class="material-icons">games</i> GAME SERVERS')
    $('#contactbtn').html('<i class="material-icons">contact_page</i> CONTACT')
    $('#loginbtn').html('<i class="material-icons">login</i> LOGIN')
}

function collapse(el) {
    $('#sidebar').addClass('collapsed')
    $('#content').addClass('collapsed2')
    $(el).get(0).onclick = function() {
        expand(this)
    }

    $('#servicestext').toggleClass('hidden')
    $('#homebtn').html('<i class="material-icons">home</i>')
    $('#gamebtn').html('<i class="material-icons">games</i>')
    $('#contactbtn').html('<i class="material-icons">contact_page</i>')
    $('#loginbtn').html('<i class="material-icons">login</i>')
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

    eys = ey.value.split(';')
    console.log(eys);

    ey = ey.value
    if (ey == ' ' || ey == ' ') {
        for (let i = 0; i < a.length; i++) {
            a[i].classList.remove('hidden')
        }
    }

    for (let i = 0; i < a.length; i++) {

        val = false

        for (let k = 0; k < a[i].getAttribute('gameName').split(', ').length; k++) {
            if (a[i].getAttribute('gameName').split(', ')[k].includes(ey)) {
                val = true
            }
        }

        if (!val) {
            a[i].classList.add('hidden')
        }
        else {
            a[i].classList.remove('hidden')
        }
    }
}