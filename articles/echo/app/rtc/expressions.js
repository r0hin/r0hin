function EXPRESSION_Default(exp, isentit) {
    switch (exp) {
        case "heart":
            heartel = document.createElement('div')
            heartel.classList.add('heartbefore')
            heartel.classList.add('centered')
            heartel.innerHTML = '<i class="material-icons animated heartBeat infinite">favorite</i>'
            heartel.id = 'heartel'
            document.getElementById('body').appendChild(heartel)
            window.setTimeout(function() {
              document.getElementById('heartel').classList.add('heartafter')
            }, 100)
            window.setTimeout(function() {
              document.getElementById('heartel').classList.add('animated')
              document.getElementById('heartel').classList.add('bounceOut')
              window.setTimeout(function() {
                $('#heartel').remove()
              }, 1000)
            }, 1000)
            break;      
        case "happy":
            happyel = document.createElement("div")
            happyel.id = 'happyglyph'
            happyel.innerHTML = '<i class="material-icons iconactivehappy">insert_emoticon</i>'
            happyel.classList.add('happyglyph'); happyel.classList.add('animated'); happyel.classList.add('zoomIn')
            
            if (isentit) {
              document.getElementById('mecontainer').appendChild(happyel)
            }
            else {
              document.getElementById('themcontainer').appendChild(happyel)
            }

            window.setTimeout(function() {
              document.getElementById('happyglyph').classList.remove('zoomIn')
              document.getElementById('happyglyph').classList.add('zoomOutUp')
              window.setTimeout(function() {
                $('#happyglyph')[0].remove()
              }, 1500)
            }, 2000)
            break;
        default:
            console.log('ECP | Unknown expression.');
            break;
    }
}