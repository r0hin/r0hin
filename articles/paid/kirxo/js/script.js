$(window).scroll(function() {
    if ($(document).scrollTop() > 300) {
        document.getElementById('nav').classList.add('shrink')
        document.getElementById('ul').style.Color = "#fff"
        document.getElementById('1').style.color = "#000"
        document.getElementById('2').style.color = "#000"
        document.getElementById('3').style.color = "#000"
        document.getElementById('4').style.color = "#000"
        document.getElementById('5').style.color = "#000"
        document.getElementById('6').style.color = "#000"
    } else {
        document.getElementById('nav').classList.remove('shrink')
        document.getElementById('ul').style.Color = "#000"
        document.getElementById('1').style.color = "#fff"
        document.getElementById('2').style.color = "#fff"
        document.getElementById('3').style.color = "#fff"
        document.getElementById('4').style.color = "#fff"
        document.getElementById('5').style.color = "#fff"
        document.getElementById('6').style.color = "#fff"
        
    }
  });