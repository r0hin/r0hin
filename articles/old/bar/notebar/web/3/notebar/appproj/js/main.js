preflight()
function preflight() {
  popover()
  font()
  getDate()

  if ($('#docList').is(':empty')){
    document.getElementById('notenotebox').style.display = "none"
  }

}


function getDate() {



}
function refresh() {

    $('#docList').empty();
    $('#docList2').empty();
    $('#buttonContainer').empty();
    $('#readContainer').empty();
    $('#taskList').empty();

    get()
    task()
    preflight()


};

function deleteAll() {
  alert("Your data will be irreversibly cleared, continue?");
  var r = confirm("This WILL clear all data. Upon deletion, you will be greeted with the new-user experience.");
  if (r == true) {
    alert("This is your final warning, if you would like to cancel now, you must force quit this app without clicking OK.");
    localStorage.clear();
    window.location.replace('clear.html')
  } else {
    alert("Data clearance aborted.")
  }
}

    function popover() {
    $(function () {
      $('[data-toggle="popover"]').popover({
      
        html:true
        })
    })
    }

function settings() {
        localStorage.setItem('mode', 'null')
        localStorage.setItem('pass', 'null')
        window.location.replace("indexnopass.html");
    
      }

      
      function font() {
    x = document.getElementById('docList2')
    y = localStorage.getItem("font")
    z = document.getElementById('bodd')
    if (y == "typewriter") {
      x.style.fontFamily = "Alegreya"
      z.style.fontFamily = "Alegreya"
    }
    else {
      x.style.fontFamily = "Roboto"
      z.style.fontFamily = "Roboto"
    }
      }

      function removePass() {
        localStorage.setItem('pass', 'null')
      }
      function changePass() {
        x = document.getElementById('sample5').value
        localStorage.setItem('pass', x)
        x = document.getElementById('sample6').value
        localStorage.setItem('securityquestion', x)
      }

function exportData() {
  var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
} 

if(mm<10) {
    mm = '0'+mm
} 

today = mm + '/' + dd + '/' + yyyy;

  download(today + '.txt', JSON.stringify(localStorage));
}


function download(filename, text) {
  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  pom.setAttribute('download', filename);

  if (document.createEvent) {
      var event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      pom.dispatchEvent(event);
  }
  else {
      pom.click();
  }
}
document.getElementById('input-file').addEventListener('change', getFile)

function getFile(event) {
	const input = event.target
  if ('files' in input && input.files.length > 0) {
	  placeFileContent(
      document.getElementById('content-target'),
      input.files[0])
  }
}

function placeFileContent(target, file) {
	readFileContent(file).then(content => {
  	target.value = content
  }).catch(error => console.log(error))
}

function readFileContent(file) {
	const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result)
    reader.onerror = error => reject(error)
    reader.readAsText(file)
  })
}

function importData() {
    var r = confirm('Are you sure you would like to import this dataset? All your current data and preferences will be cleared. Are you sure?')
    if (r == true) {
      localStorage.clear()
    x = document.getElementById('content-target').value
    var data = JSON.parse(x);
    Object.keys(data).forEach(function (k) {
      localStorage.setItem(k, data[k]);
      console.log('localstoragedone')
    });
    alert("Your dataset has been successfully imported.")
    refresh()
    window.location.replace('index.html')
    }
    else {
      alert('Input Data Cancelled')
    }

  

}