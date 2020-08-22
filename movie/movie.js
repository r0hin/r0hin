var input = document.getElementById("exampleFloatingBox1");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("myBtn").click();
    }
});

function searchmovies() {
    nothing = false
    document.getElementById('myBtn').onclick = function () {
        Snackbar.show({ text: "Please slow down..." })
    }
    window.setTimeout(function () {
        document.getElementById('myBtn').onclick = function () {
            searchmovies()
        }
    }, 3500)
    name = document.getElementById('exampleFloatingBox1').value
    document.getElementById('exampleFloatingBox1').value = ''
    if (name == '' | name == " ") {
        Snackbar.show({ text: 'You must enter a name' })
    }
    else {

        toggleloader()

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/" + name,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com",
                "x-rapidapi-key": "f25776e273mshdeac69e2098339fp19fd7bjsne2f245613497"
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
            $('#movies').empty()
            $('#message').empty()

            if (response.titles.length == 0) {
                d = document.createElement('div')
                d.innerHTML = '<center><br><h1><i class="material-icons">movie</i></h1><h3><br>No Results for: <b>' + name + '</b></h3></center>'
                document.getElementById('message').appendChild(d)
                document.getElementById('message').classList.remove('animated')
                document.getElementById('message').classList.remove('fadeInUp')
                document.getElementById('message').classList.add('animated')
                document.getElementById('message').classList.add('fadeInUp')
            }

            else {
                e = document.createElement('div')
                e.innerHTML = '<h3>Search results for: <b>' + name + '</b></h3><br><br>'
                document.getElementById('message').appendChild(e)
                document.getElementById('message').classList.remove('animated')
                document.getElementById('message').classList.remove('fadeInUp')
                document.getElementById('message').classList.add('animated')
                document.getElementById('message').classList.add('fadeInUp')
            }

            for (let i = 0; i < response.titles.length; i++) {
                const element = response.titles[i];

                animated = i * 250


                a = document.createElement('div')
                infoFunc = "info('" + element.id + "')"
                a.innerHTML = '<div style="color: black; animation-delay: ' + animated + "ms" + '; background-color: #353535; color: white" class="card animated zoomInUp">   <img style="width: 100%; height: 450px; object-fit: cover;" class="card-img-top" src="' + element.image + '" alt="Card image cap">   <div class="card-body">     <h5 class="card-title">' + element.title + '</h5> <a onclick="' + infoFunc + '" class="eon-text">View Movie</a>   </div > </div > '
                document.getElementById('movies').appendChild(a)
                addWaves()



            }

            window.setTimeout(function () {
                toggleloader()
                history.pushState(null, null, 'index.html?search=' + name)
                back()
                document.getElementById('viewer').style.display = 'grid'
            }, 2000)

        });
    }
}

function info(id) {
    toggleloader()
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/" + id,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com",
            "x-rapidapi-key": "f25776e273mshdeac69e2098339fp19fd7bjsne2f245613497"
        }
    }

    $.ajax(settings).done(function (response) {


        document.getElementById('viewer').classList.add('animated')
        document.getElementById('viewer').classList.add('fadeOut')
        window.setTimeout(function () {
            document.getElementById('viewer').style.display = 'none'
            document.getElementById('viewer').classList.remove('animated')
            document.getElementById('viewer').classList.remove('fadeOut')
        }, 1000)


        if (response.title == '' || response.title == " " || response.title == null || response.title == undefined) {


            Snackbar.show({ text: 'This movie could not be loaded. There is likely not enough information yet.' })
            window.setTimeout(function () {
                toggleloader()
                back()
            }, 1000)

        }
        else {

            console.log(response);

            document.getElementById('title').innerHTML = response.title
            document.getElementById('description').innerHTML = response.plot
            document.getElementById('year').innerHTML = response.year
            document.getElementById('length').innerHTML = response.length
            document.getElementById('rating').innerHTML = response.rating
            document.getElementById('votes').innerHTML = response.rating_votes
            document.getElementById('poster').src = response.poster

            document.getElementById('imdbbutton').onclick = function () {
                window.open('https://www.imdb.com/title/' + response.id)
            }

            window.setTimeout(function () {
                toggleloader()
                history.pushState(null, null, 'index.html?info=' + response.id)
                document.getElementById('infopanel').style.display = 'block'
            }, 1000)


        }
    });
}

function back() {
    console.log('backed');
    document.getElementById('viewer').style.display = 'block'
    document.getElementById('infopanel').classList.add('animated')
    document.getElementById('infopanel').classList.add('fadeOut')
    try {
        if (nothing) {
            history.pushState(null, null, 'index.html')
            document.getElementById('viewer').style.display = 'none'
        }
        else {
            history.pushState(null, null, 'index.html?search=' + name)
        }
    } catch (error) {
        history.pushState(null, null, 'index.html?search=' + name)
    }
    window.setTimeout(function () {
        document.getElementById('infopanel').style.display = 'none'
        document.getElementById('infopanel').classList.remove('animated')
        document.getElementById('infopanel').classList.remove('fadeOut')
    }, 1000)
}
checkurl()
function checkurl() {
    const urlParams = new URLSearchParams(window.location.search);
    const info = urlParams.get('info');
    const search = urlParams.get('search');

    if (info == null || info == undefined) {
    }
    else {
        getinfo(info)
    }
    if (search == null || search == undefined) {
    }
    else {
        document.getElementById('exampleFloatingBox1').value = search
        searchmovies()

    }
}

function getinfo(value) {
    info(value)
    nothing = true
}
