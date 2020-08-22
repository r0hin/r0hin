get()
function get() {

  for(var i=0, len=localStorage.length; i<len; i++) {
    var key = localStorage.key(i);
    var res = (key.startsWith('n0t3b4r1d88892481924812837127'))
    if (res == true) {


// Create sidebar elements


var pop = document.createElement('div')
pop.classList.add('listItemContainer')
pop.id = key + '098120ndh'
document.getElementById('docList').appendChild(pop)

  var k = document.createElement('h3')
  k.id = i + "1"
  k.style.display = "none";
  k.style.padding = "20px";
  k.classList.add("animated");
  k.classList.add("fadeInUp");
  oKey = localStorage.key(i).replace('n0t3b4r1d88892481924812837127','');
  k.innerHTML = oKey
    var y = document.createElement("BUTTON");
    y.innerHTML = oKey
    y.classList.add('noteItem')
    y.id = i
    y.classList.add('waves-flat-button')
    y.classList.add('waves-effect')
    y.classList.add('waves-button')

    document.getElementById(key + '098120ndh').appendChild(y);
    y.onclick = function() {

      //what each sidebar element will do when clicked: 
      document.getElementById('notebox').style.display = 'block'
      document.getElementById('controls').style.display = "block"
for(var i=0, len=localStorage.length; i<len; i++) {



  var key = localStorage.key(i);
  var value = localStorage[key];
try {
a2 = document.getElementById(key);
a2.style.display = "none";
a2 = document.getElementById(i + "1");
a2.style.display = "none";
}
catch {
  
}
}

var pppp = document.getElementById(localStorage.key(this.id));

pppp.style.display = "block";
var pp = document.getElementById(this.id + "1")

pp.style.display = "block";


};


// Create value elements
    var z = document.createElement("p");

    z.id = localStorage.key(i);
    z.classList.add("animated");
    z.classList.add("fadeIn");
    z.contentEditable = "true";
    z.setAttribute("contenteditable", "true");
    z.onkeyup = function() {

x = document.getElementById(this.id).innerHTML
localStorage.setItem(this.id, x)





    };
    z.style = "display: none"
    z.style.paddingLeft = "20px"
document.getElementById('docList2').appendChild(k);
    document.getElementById('docList2').appendChild(z);


 //extras
    var key = localStorage.key(i);
    var value = localStorage[key];
    z.innerHTML = value;
    var res = (key.startsWith('98791823719283798'))
    if (key == "font" || key == "mode" || key == "pass" || key == "securityquestion" || res == true) {
      x = document.getElementById(key)
      x.style.display = "none";
      x = document.getElementById(i)
      x.style.display = "none";

    }

else {
continue;
}

}


}


}
function modify() {
   var x = document.getElementById('sample4').value 
  if (x == '' || x == ' ' || x == '  ' || x == '   ') {
    document.getElementById('err').innerHTML = 'Name cannot be blank.'
    $('#errorModal').modal('toggle')
    return;
  }


    for(var i=0, len=localStorage.length; i<len; i++) {
      var key = localStorage.key(i);
      var value = localStorage[key];
      var res = (key.startsWith('n0t3b4r1d88892481924812837127'))
        if (res == true) {
    
      console.log(key + 'key')
      x = document.getElementById(key)
      if (x.style.display == "block") {
        y = x.id
        b = document.getElementById('sample4').value
        a = x.innerHTML
        localStorage.removeItem(y)
        localStorage.setItem('n0t3b4r1d88892481924812837127' + b, a)
        document.getElementById('sample4').value = "";
        document.getElementById('notebox').style.display = 'none'
        document.getElementById('controls').style.display = "none"
        refresh()
        return;
      }
        }
      else {
    
    
    
    }} 
    document.getElementById('err').innerHTML = 'No note selected'
    $('#errorModal').modal('toggle')
    return;
    
      }
    
    
      function deleteItem() {
  
var localLength = localStorage.length

        for(var i=0, len=localStorage.length; i<len; i++) {
    
    
    
    var key = localStorage.key(i);
    
    if (key.startsWith('n0t3b4r1d88892481924812837127')) {
    
    x =document.getElementById(key)
    
    if (x.style.display == "block") {
    
    y = x.id
    localStorage.removeItem(y)
    document.getElementById('notebox').style.display = 'none'
    document.getElementById('controls').style.display = "none"
    refresh()
    return;
    
    }
    
    }
     
        
      }
    
var newLocalLength = localStorage.length

if (localLength == newLocalLength) {
  document.getElementById('err').innerHTML = 'No note selected'
  $('#errorModal').modal('toggle')
}


      
    
      }
    
    
    
    
    
       function create() {
    



        x = document.getElementById('sample3').value
        if (x == '' || x == ' ' || x == '  ' || x == '   ') {
          x = "Untitled Note"
          document.getElementById('err').innerHTML = 'Name cannot be blank. It has been renamed to Untitled Note. I strongly advise to rename this note to avoid corruptions.'
          $('#errorModal').modal('toggle')
          return;
        }

        for(var i=0, len=localStorage.length; i<len; i++) {
          var key = localStorage.key(i);

          y = 'n0t3b4r1d88892481924812837127' + x

          if (key == y) {
            document.getElementById('err').innerHTML = 'Name matches a previous note'
            $('#errorModal').modal('toggle')
            return;
          }

          

        }

        localStorage.setItem('n0t3b4r1d88892481924812837127' + x, 'Click this text to edit it!');
    
    document.getElementById('sample3').value = "";
    
    
    
    
        refresh()
    
        document.getElementById('notenotebox').style.display = "block"
    
        // Retrieve
    
      }
      function saveItem() {
    
        for(var i=0, len=localStorage.length; i<len; i++) {
    
    
    
    var key = localStorage.key(i);
    
    if (key.startsWith('n0t3b4r1d88892481924812837127')) {
    
    x = document.getElementById(key)
    
    if (x.style.display == "block") {
    z = x.innerHTML
    y = x.id
    localStorage.setItem(y, z)
console.log(y)
console.log(x)
    
    }
    
    }
            
        
      }
    

    
      }
function hyperLink() {



    
  for(var i=0, len=localStorage.length; i<len; i++) { var key = localStorage.key(i);  
    if (key.startsWith('n0t3b4r1d88892481924812837127')) { x =document.getElementById(key)
    if (x.style.display == "block") {
  
    y = x.id
    // x is p element
    // y is key name
    
     var before = x.innerHTML
     name = document.getElementById('hlname').value
     link = document.getElementById('hllink').value
     linka = "'" + link + "'"
document.getElementById(y).click()

  document.execCommand('insertHTML', false, '<a id="yo" style="cursor: pointer" href="' + link + '">' + name + '</a>');
        document.getElementById('yo').contentEditable = 'false';

    saveItem()
    }};
      }};

if( $('#docList').is(':empty') ) {
  document.getElementById('notenotebox').style.display = "none"
  }

var input = document.getElementById('sample3')
  input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("clickable").click();
    }
  });


  var input = document.getElementById('sample4')
  input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("modify22").click();
    }
  });
  
