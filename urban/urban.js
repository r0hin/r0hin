function define() {
    a = document.getElementById('exampleFloatingBox1').value
    bam = a
    input.value = ''

    $('#definitions').empty()
    if (a == '' || a == " ") {
        error('Error defining word.')
    }
    else {
        document.getElementById('word').innerHTML = 'Urban Dictionary API Test <span class="chip">' + a + '</span>'
        max = document.getElementById('select').value
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=" + a,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
                "x-rapidapi-key": "f25776e273mshdeac69e2098339fp19fd7bjsne2f245613497"
            }
        }

        $.ajax(settings).done(function (response) {

            response = response.list

            response = response.slice(0, max);

            for (let i = 0; i < response.length; i++) {
                const element = response[i];
                console.log(element);
                numerical = i + 1
                animated = i * 250

                definition = element.definition.replace(/((\[\s*)|(\s*\]))/g, "")
                example = element.example.replace(/((\[\s*)|(\s*\]))/g, "")



                a = document.createElement('div')
                a.classList.add('card')
                a.classList.add('animated')
                a.classList.add('fadeInUp')
                a.style.animationDelay = animated + "ms"
                a.innerHTML = '<div style="text-align: left;" class="card-body"><h3>' + bam + ' definition <span class="chip">' + numerical + '</span></h3><p>' + definition + '</p><p>' + example + '</p><br><div class="row"><div class="col-sm"><center><h3>' + element.thumbs_up + '<h3><p>Upvotes</p></center></div><div class="col-sm"><center><h3>' + element.thumbs_down + '</h3><p>Downvotes</p></center></div></div><div style="text-align: right; width: 100%"><small>Definition by ' + element.author + '. <a target="_blank" href="' + element.permalink + '">Click</a> to view source. Written on ' + element.written_on + '</small></div></div>'


                document.getElementById('definitions').appendChild(a)
                document.getElementById('definitions').appendChild(document.createElement('br'))
                document.getElementById('definitions').appendChild(document.createElement('br'))



            }

        });


    }
}


var input = document.getElementById("exampleFloatingBox1");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("btn").click();

    }
});