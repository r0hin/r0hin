

function deleteTask() {
        
  x = sessionStorage.getItem('selectedTask')
  
  if (x == "nothing" || x == "null") {
    alert('Select a task first;')
  }
  else {
  
  
  x = x.replace('-', ' ')
  
  localStorage.removeItem('98791823719283798' + x)
  localStorage.removeItem(x + 'description')
  localStorage.removeItem(x + 'bold')
  localStorage.removeItem(x + 'important')
  localStorage.removeItem(x + 'date')
  localStorage.removeItem(x + 'tag')
  refresh()
  
  }
  
  
  
  }
  function deleteTaskItem(el_id) {
  key = el_id.replace('719851y98thr129891827412424','');
  
  localStorage.removeItem('98791823719283798'  + key)
  localStorage.removeItem(key + 'bold')
  localStorage.removeItem(key + 'date')
  localStorage.removeItem(key + 'description')
  localStorage.removeItem(key + 'important')
  localStorage.removeItem(key + 'tag')
  
  refresh()
  sessionStorage.setItem('editingTask', 'nothing')
  
  }
  
  function createTask() {
  
  name = document.getElementById('sample3Task').value
  if (name == "") {
    document.getElementById('err').innerHTML = 'Name cannot be blank.'
    $('#errorModal').modal('toggle')
    return;
  }
  if( name.indexOf('-') >= 0){
    document.getElementById('err').innerHTML = 'Name cannot contain a -.'
    $('#errorModal').modal('toggle')
    return;
  }
  description = document.getElementById('sample4Task').value
  bold = document.getElementById('switch-1').checked
  important = document.getElementById('switch-2').checked
  date = document.getElementById('exampleInputDatePicker1').value
  tag = document.getElementById('exampleFloatingBox3').value
  
  localStorage.setItem('98791823719283798' + name, 'randomtext')
  localStorage.setItem(name + 'description', description)
  localStorage.setItem(name + 'bold', bold)
  localStorage.setItem(name + 'important', important)
  localStorage.setItem(name + 'date', date)
  localStorage.setItem(name + 'tag', tag)
  refresh()
  
  }
  
  task()
  
  function task() {
  
    for(var i=0, len=localStorage.length; i<len; i++) {
      var key = localStorage.key(i);
      var value = localStorage[key];
      var res = (key.startsWith('98791823719283798'))
  
      if (res == true) {
        //stuff here;
        oKey = key.replace('98791823719283798','');
        name = oKey
  
  
  
        // Got button
        a = document.createElement('button');
        a.innerHTML = name;
        a.id = name
        a.classList.add('btn')
        a.classList.add('btn-primary')
        a.style.backgroundColor = "#242424"
        a.style.color = "white"
        a.style.borderRadius = "5px"
        a.style.textDecoration = "none"
        a.style.width = "100%"
        document.getElementById('taskList').appendChild(a);
        // Got bold
  
        b = localStorage.getItem(name + 'bold');
        if (b == 'true') {
          document.getElementById(name).style.fontWeight = 'bold';
          bold = "<b>" + name + "</b>"
        }
        else {  
          bold = name
        }
  
        // Got Description
        d = localStorage.getItem(name + 'description');
  
        // Got importance
        e = localStorage.getItem(name + 'important');
        if (e == 'true') {
          var e = "<div style='position: absolute; right: 10px; top: 10px;'> <i style='color: rgb(255, 145, 0); display: inline-block;' class='material-icons'>stars</i>Important </div>"
  
        }
        else {
          var e = "<div style='position: absolute; right: 10px; top: 10px;'> <i style='color: grey; display: inline-block;' class='material-icons'>stars</i>Not Important </div>"
  
        }
        document.getElementById(name).innerHTML += e
  
        // expansion panel including description
  
  
        
        c = document.getElementById(name)
        c.setAttribute("data-toggle", "collapse");
        var oName = name
        var name = name.replace(/\s/g , "-");
        c.setAttribute("data-target", "#collapse" + name);
        var href = "#collapse" + name
  
        c.classList.add('animated')
        c.setAttribute("onclick", "document.getElementById('" + oName + "').classList.add('fadeOutDown'); sessionStorage.setItem('selectedTask', '" + name + "'); change(this.id) ");
        c.href = href
        c.role = "button"
        
        //random unique name identifier to not affect others
        var namer = name + "19847174981029381029381924712323"
        var namerer = name + "1974821637125435832974382647388"
        var namererer = name + "8174981273812649821749812748124"
        var namerererer = name + "8914712631596374671937612987992"
        var namererererer = name + "971851294723851893465378257823"
        var namerererererer = name + "42887498518894871741729847248"
        var namererererererer = name + "16576986289461724685716q4812"
        var namerererererererer = name + "596775329572938572893579823"
        var namererererererererer = oName + "719851y98thr129891827412424"
        
  
        
        var collapseItems = "<br><br> <div class='collapse transition' id='collapse" + name + "'>" 
        var collapseItems = collapseItems + "<div style='color: white; background-color: #242424; padding-top: 10px; padding-left: 20px; width: 100%; padding-right: 10px;' class='card card-body'><div id='" + namerer + "' > </div><p style='font-size: 16px;'>" + bold + "</p><br><p style='width: 100%; color: rgb(24, 24, 24)' >" + d + "</p><br><div id='" + namererer + "'></div><div id='" + namerererer + "'></div><div id='" + namererererer + "'></div><div id='" + namerererererer + "'></div><div></div></div>"
        var collapseItems = collapseItems + "</div>"
  
        document.getElementById('taskList').innerHTML += collapseItems
  
          // Restore the original key name and keep the old key name. Set the orginal key name to oName and keep the modified key name to Name.
        oName = key.replace('98791823719283798','');
  
     // Date
  
     f = localStorage.getItem(oName + 'date')
     f = f.replace('.', '/');
     f = f.replace('.', '/');
     f = f.replace('.', ' ');

     var g = new Date();
  var dd = String(g.getDate()).padStart(2, '0');
  var mm = String(g.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = g.getFullYear();
  g = mm + '/' + dd + '/' + yyyy;
  var fe = f.split("/");
  var ge = g.split("/");
  diff = fe[0] - ge[1]
  
  
        
  // Add date to element
        
    var sTag = "<p style='color: black;'>"
    var eTag = " '</p>' "
     x = document.getElementById(name + '1974821637125435832974382647388')
     x.innerHTML = '<button style="font-size: 16px; position: absolute; top: 10px; right: 10px; border-radius: 120px; height: 35px; width: 60px; background-color: white; color: black;" data-trigger="focus" data-container="body" data-toggle="popover" data-placement="left" data-content="' + sTag + oName + " is for " + f + "." + " That is currently about " + diff + " days away." + eTag + 'type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off"><i class="material-icons">today</i></p></button>'
    // Tags
  
  
     x = document.getElementById(name + '8174981273812649821749812748124')
  
     y = localStorage.getItem(oName + 'tag')
  
    if (y == 'Work') {
     h = "<a data-container='body' data-toggle='popover' data-placement='right' data-trigger='focus' data-content='" + localStorage.getItem('mWork') + "' style='width: 100px; height: 40px; border-radius: 50px; background-color: white; color: black; border: 0.5px solid black' class='chip chip-action' href='#'><i class='material-icons'>work</i>Work</a>"
    }
  else if (y == 'Personal') {
    h = "<a data-container='body' data-toggle='popover' data-placement='right' data-trigger='focus' data-content='" + localStorage.getItem('mPersonal') + "' style='width: 100px; height: 40px; border-radius: 50px; background-color: white; color: black; border: 0.5px solid black' class='chip chip-action' href='#'><i class='material-icons'>person</i>Personal</a>"
  }
  else if (y == 'Optional') {
    h = "<a data-container='body' data-toggle='popover' data-placement='right' data-trigger='focus' data-content='" + localStorage.getItem('mOptional') + "' style='width: 100px; height: 40px; border-radius: 50px; background-color: white; color: black; border: 0.5px solid black' class='chip chip-action' href='#'><i class='material-icons'>pan_tool</i>Optional</a>"
  }
  else if (y == 'Family') {
    h = "<a data-container='body' data-toggle='popover' data-placement='right' data-trigger='focus' data-content='" + localStorage.getItem('mFamily') + "' style='width: 100px; height: 40px; border-radius: 50px; background-color: white; color: black; border: 0.5px solid black' class='chip chip-action' href='#'><i class='material-icons'>group</i>Family</a>"
  }
  else if (y == 'Plan') {
    h = "<a data-container='body' data-toggle='popover' data-placement='right' data-trigger='focus' data-content='" + localStorage.getItem('mAnytime') + "' style='width: 100px; height: 40px; border-radius: 50px; background-color: white; color: black; border: 0.5px solid black' class='chip chip-action' href='#'><i class='material-icons'>list</i>Plan</a>"
  }
  else if (y == 'Anytime') {
    h = "<a data-container='body' data-toggle='popover' data-placement='right' data-trigger='focus' data-content='" + localStorage.getItem('mPlan') + "'' style='width: 100px; height: 40px; border-radius: 50px; background-color: white; color: black; border: 0.5px solid black' class='chip chip-action' href='#'><i class='material-icons'>timer_off</i>Anytime</a>"
  }
  else if (y == 'Soon') {
    h = "<a data-container='body' data-toggle='popover' data-placement='right' data-trigger='focus' data-content='" + localStorage.getItem('mSoon') + "' style='width: 100px; height: 40px; border-radius: 50px; background-color: white; color: black; border: 0.5px solid black' class='chip chip-action' href='#'><i class='material-icons'>access_time</i>Soon</a>"
  }
    else {
      
      h = '<p>No tag selected. Modify this task to select a note.</p>'
  
    }
  
     x.innerHTML = h
  
  
  // cancel button
  var oNameo = '"' + oName + '"'
  var fadeInDown = '"fadeOutDown"'
  x = "<center><button onclick='document.getElementById(" + oNameo + ").classList.remove(" + fadeInDown + "); document.getElementById(" + oNameo + ").click(); ' class='btn btn-light' style='background-color: white; border-radius: 20px; top: 10px;'><i class='material-icons'>expand_less</i></button></center>"
  document.getElementById(namerererer).innerHTML = x
  
  
  
  
  
  // complete button
  x = document.getElementById(namererererer)
     x.innerHTML = '<button id="' + namererererererererer + '" onclick="deleteTaskItem(this.id)" style="font-size: 16px; position: absolute; bottom: 10px; right: 10px; border-radius: 120px; height: 35px; width: 60px; background-color: white; color: black;" type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off"><i class="material-icons">done</i></p></button>'
  
  // modify button
  x = document.getElementById(namerererererer)
     var button = '<button id="' + namerererererererer + '" style="font-size: 16px; position: absolute; top: 27%; right: 10px; border-radius: 120px; height: 35px; width: 60px; background-color: white; color: black;" type="button" class="btn btn-primary"><i class="material-icons">edit</i></p></button>'
     var beggining = "<br><br> <div class='collapse transition' id='collapse" + namererererererer + "'>" 
      var inContent = "<center>Click the button below to open the dialog prompting for new values. Unmodified values will be illegible <br><br><button id='" + name + " ' data-toggle='modal' onclick='modifyTask(this.id)' class='btn btn-float btn-light btn-sm' type='button'><i class='material-icons'>edit</i></button></center>"
        var content = beggining + "<div style='color: #191919; padding-top: 10px; padding-left: 20px; width: 100%; padding-right: 10px;' class='card card-body'>" + inContent + " </div>"
    var collapse = content + "</div>"
    x.innerHTML = button + collapse
    c = document.getElementById(namerererererererer)
    c.setAttribute("data-toggle", "collapse");
        c.setAttribute("data-target", "#collapse" + namererererererer);
  
  
        br = document.createElement('br');
        document.getElementById('taskList').appendChild(br);
        br = document.createElement('br');
        document.getElementById('taskList').appendChild(br);
      }
      else {
        continue;
      };}
      
      document.getElementById('taskListBox').style.display = 'block'
    
    };


      function change(selected_element) {
      
          d = document.getElementById('ModalBodyDelete')
          f = "Are you sure you want to delete <b>" + selected_element + "</b>?"
          d.innerHTML = f
          c = document.getElementById(selected_element)
          c.setAttribute("onclick", "sessionStorage.setItem('selectedTask', 'nothing'); unChange(this.id) ");
        
        }
        function unChange(selected_element) {
          d = document.getElementById('ModalBodyDelete')
          d.innerHTML = "Nothing will be deleted. Please select a task first then choose delete."
        c = document.getElementById(selected_element)
        var fadeInDown = '"fadeOutDown"'
        var oNameo = '"' + selected_element + '"'
        c.setAttribute("onclick", "document.getElementById(" + oNameo + ").classList.add(" + fadeInDown + "); sessionStorage.setItem('selectedTask', '" + selected_element + "'); change(this.id)");
        
        }

        function modifyTask(click_id) {
          id = click_id.replace('-',' ');
                  
        id = id.slice(0, -1);
        id = id.replace(/-/g, ' ');
          sessionStorage.setItem('editingTask', id)
        
          document.getElementById('sample3Task2').value = id
          document.getElementById('sample4Task2').value = localStorage.getItem(id + 'description')
        
          document.getElementById('exampleInputDatePicker2').value = localStorage.getItem(id + 'date')
        
          document.getElementById('sample5Task2').value = localStorage.getItem(id + 'tag')
        
        
        
          $('#exampleModalTaskModfy').modal('show')
        }

        function Modify(){

          x = sessionStorage.getItem('editingTask')
          console.log(x)
          sessionStorage.removeItem('editingTask')
          
          
          name = document.getElementById('sample3Task2').value
          if (name == "") {
            document.getElementById('err').innerHTML = 'Name cannot be blank.'
            $('#errorModal').modal('toggle')
            return;
          }
          if( name.indexOf('-') >= 0){
            document.getElementById('err').innerHTML = 'Name cannot contain a -.'
            $('#errorModal').modal('toggle')
            return;
          }
          description = document.getElementById('sample4Task2').value
          bold = document.getElementById('switch-12').checked
          important = document.getElementById('switch-22').checked
          date = document.getElementById('exampleInputDatePicker2').value
          tag = document.getElementById('sample5Task2').value
          x = x.replace('-', ' ')
          localStorage.removeItem('98791823719283798' + x)
          localStorage.setItem('98791823719283798' + name, 'rohinmadethis')
          localStorage.setItem(name + 'description', description)
          localStorage.setItem(name + 'bold', bold)
          localStorage.setItem(name + 'important', important)
          localStorage.setItem(name + 'date', date)
          localStorage.setItem(name + 'tag', tag)
          
          sessionStorage.setItem('editingTask', 'nothing')
          
          refresh()
          
          
          }
          function changeTag() {

              x = document.getElementById('ePersonal').value
              localStorage.setItem('mPersonal', x)
              x = document.getElementById('eOptional').value
              localStorage.setItem('mOptional', x)
              x = document.getElementById('eWork').value
              localStorage.setItem('mWork', x)
              x = document.getElementById('eFamily').value
              localStorage.setItem('mFamily', x)
              x = document.getElementById('ePlan').value
              localStorage.setItem('mPlan', x)
              x = document.getElementById('eAnytime').value
              localStorage.setItem('mAnytime', x)
              setTags()
              refresh()
            }
            setTags()
            function setTags() {
           x = localStorage.getItem('mPersonal')
          if (x == null || x == ""){
            localStorage.setItem('mPersonal', 'This is for you and your close friends and family, this is personal only..')
            document.getElementById('ePersonal').value = x
          } else {document.getElementById('ePersonal').value = x}
          x = localStorage.getItem('mOptional')
          if (x == null || x == ""){
            localStorage.setItem('mOptional', 'You dont have to do this! Its optional.')
            document.getElementById('eOptional').value = x
          } else {document.getElementById('eOptional').value = x}
          x = localStorage.getItem('mWork')
          if (x == null || x == ""){
            localStorage.setItem('mWork', 'You need to do this for your work-related activites.')
            document.getElementById('eWork').value = x
          } else {document.getElementById('eWork').value = x}
          x = localStorage.getItem('mFamily')
          if (x == null || x == ""){
            localStorage.setItem('mFamily', 'Family related business, dont miss this!.')
            document.getElementById('eFamily').value = x
          } else {document.getElementById('eFamily').value = x}
          x = localStorage.getItem('mPlan')
          if (x == null || x == ""){
            localStorage.setItem('mPlan', 'This is a plan for a future date, start getting excited!')
            document.getElementById('ePlan').value = x
          } else {document.getElementById('ePlan').value = x}
          x = localStorage.getItem('mAnytime')
          if (x == null || x == ""){
            localStorage.setItem('mAnytime', 'You can do this anytime you would like to. Maybe get started now ... ?')
            document.getElementById('eAnytime').value = x
          } else {document.getElementById('eAnytime').value = x}
            }

if( $('#taskList').is(':empty') ) {
document.getElementById('taskListBox').style.display = "none"
}