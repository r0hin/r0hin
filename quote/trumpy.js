function go() {
    document.getElementById('quote').classList.remove('animated')
    document.getElementById('quote').classList.remove('fadeIn')
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://matchilling-tronald-dump-v1.p.rapidapi.com/random/quote",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "matchilling-tronald-dump-v1.p.rapidapi.com",
            "x-rapidapi-key": "f25776e273mshdeac69e2098339fp19fd7bjsne2f245613497",
            "accept": "application/hal+json"
        }
    }

    $.ajax(settings).done(function (response) {

        console.log(response);

        document.getElementById('quote').innerHTML = response.value
        document.getElementById('quote').classList.add('animated')
        document.getElementById('quote').classList.add('fadeIn')
        document.getElementById('infobox').style.display = 'inline-block'

        document.getElementById('source').href = response._embedded.source[0].url
        document.getElementById('source').innerHTML = response._embedded.source[0].url.split('https://twitter.com/').pop()
        document.getElementById('appearedat').innerHTML = response.appeared_at

        $('#tags').empty()

        if (response.tags.length == 0) {
            document.getElementById('tags').innerHTML = 'none'
        }

        for (let i = 0; i < response.tags.length; i++) {
            const element = response.tags[i];
            a = document.createElement('span')
            a.classList.add('chip')
            a.style.fontFamily = 'Roboto'
            a.innerHTML = element
            document.getElementById('tags').appendChild(a)

            b = document.createElement('div')
            b.style.padding = '8px'
            b.style.display = 'inline-block'
            document.getElementById('tags').appendChild(b)

        }

    });
}