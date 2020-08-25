function submit() {


    x = document.getElementById('exampleTextfieldBox2').value 
localStorage.setItem('name', x)
x = document.getElementById('exampleTextfieldBox1').value 
if (x == "rohinstudios123lolololpoop94817") {
    localStorage.setItem('login', 'true')
    setTimeout(function(){ window.location.replace('9yb189274b819c2ny982bb4y182i4612h78d4i6.html') }, 200);

    
    
}
else {
    document.getElementById('alert').style.display = "block"
}
}