$(window).ready(function () {
  if (localStorage.getItem('theme_name') !== undefined && localStorage.getItem('theme_name') !== null) {
    document.getElementById('colorthemeinp').value = localStorage.getItem('theme_name')
  }
  
  window.setTimeout(function() {
    // LOAD SCROLLING REGARDLESS OF TAB
    loadscrolling()
  }, 3500)
  
  sessionStorage.removeItem('viewTrend')
  sessionStorage.removeItem('viewComments')
  sessionStorage.removeItem('viewInfo')
  sessionStorage.removeItem('fullInfo')
  sessionStorage.removeItem('viewUser')
  sessionStorage.removeItem('viewPost')
  sessionStorage.removeItem('currenDM')
  
  var urlParams = new URLSearchParams(window.location.search);
  sessionStorage.setItem('currenDM', urlParams.get('dm'))
  
  sessionStorage.setItem('first-time-home', 'true')
  sessionStorage.setItem('first-time-account', 'true')
  sessionStorage.setItem('first-time-inbox', 'true')
  sessionStorage.setItem('first-time-explore', 'true')
  sessionStorage.setItem('first-time-credits', 'true')
  sessionStorage.setItem('first-time-home', 'true')
  
  
  var urlParams = new URLSearchParams(window.location.search);
  tab = urlParams.get('tab')
  
  switch (tab) {
    case "returnstatusemail":
      Snackbar.show({showAction: false,pos: 'bottom-center',text: "Your email was successfully changed."})
      tab = 'account'
      break;
    case "returnstatuspass":
      Snackbar.show({showAction: false,pos: 'bottom-center',text: "Your password was successfully changed."})
      tab = 'account'
      break;
    case "returnstatusprivate":
      Snackbar.show({showAction: false,pos: 'bottom-center',text: "Your visibility was successfully changed to private."})
      tab = 'account'
      break;
    case "returnstatuspublic":
      Snackbar.show({showAction: false,pos: 'bottom-center',text: "Your visibility was successfully changed to public."})
      tab = 'account'
      break;
    case "checkStripe":
      Snackbar.show({text: "Processing credits..."})
      checkStripe()
      tab = 'credits'
      break;
    case "cancelStripe":
      Snackbar.show({text: "Cancelled purchase."})
      tab = 'credits'
      break;
    default:
      break;
  }
  
  if (tab == null || tab == undefined) {
    sessionStorage.setItem('viewComments', urlParams.get('comments'))
    sessionStorage.setItem('viewInfo', urlParams.get('info'))
    sessionStorage.setItem('fullInfo', urlParams.get('fullscreen'))
    sessionStorage.setItem('viewUser', urlParams.get('user'))
    sessionStorage.setItem('viewPost', urlParams.get('post'))
    sessionStorage.setItem('currenDM', urlParams.get('dm'))
    sessionStorage.setItem('viewTrend', urlParams.get('trend'))
    
    if (urlParams.get('dm') !== null) {
      // A DM is active so don't load home and go straight to DMs
      tabe('inbox')
      return;
    }
    
    if (urlParams.get('trend') !== null) {
      // A trend is active so don't load home and go straight to explore tab.
      tabe('explore')
      return;
    }
    
    if (urlParams.get('info') == null && 
    urlParams.get('fullscreen') == null &&
    urlParams.get('user') == null && 
    urlParams.get('comments') == null && 
    urlParams.get('post') == null) {
      // No URL Params 
      // Go to home
      tabe('home') 
    }
    else {
      tabe("Waiting...")
      $('#notab').removeClass('hidden')
      Snackbar.show({text: "Checking link..."})
      window.setTimeout(() => {
        checkUrls()
      }, 1200)
    }   
  }
  else {
    tabe(tab)
  }
})

function tabe(tab) {
  // Do this incase tab after explore / home
  
  sessionStorage.setItem('view', 'notanything')
  try {
    // Remove active trend view
    closeTrend()   
  } catch (error) { }
  
  document.getElementById('title').innerHTML = tab.charAt(0). toUpperCase() + tab.replace(tab[0], '') + ' | Echo'
  sessionStorage.setItem("currentab", tab)
  
  if (sidebarexpanded) {
    document.getElementById('expandbtn').click()
  }
  
  try {
    $('.navthing').removeClass('navthing')
    $('.iconactive').each(function(i, obj) {
      obj.classList.remove('iconactive')
    })
    $('.navbarbuttontextactive').each(function() {this.classList.remove('navbarbuttontextactive')})
    document.getElementById(tab + '-tab').classList.add('navthing')
    document.getElementById(tab + '-icon').classList.add('iconactive')
    document.getElementById(tab + '-text').classList.add('navbarbuttontextactive')
    document.getElementById(tab + '-tab').click()
    Waves.ripple('#' + tab + '-tab');
    history.pushState(null, '', 'app.html?tab=' + tab);   
    $('#notab').addClass('hidden')
  } catch (error) {
    $('#notab').removeClass('hidden')
  }
  val = sessionStorage.getItem('first-time-' + tab)
  if (val == 'false') {
    switch (tab) {
      case "home":
      window.setTimeout(() => {
        addWaves()
        document.getElementById('grid_rel').style.removeProperty('display');
        $('#grid_rel').imagesLoaded( function() {
          resizeAllRelGridItems()
        });
        sessionStorage.setItem('view', 'rel')
      }, 200)
      break;
      case "explore":
      window.setTimeout(() => {
        addWaves()
        document.getElementById('grid_rel').style.removeProperty('display');
        $('#grid_rel').imagesLoaded( function() {
          resizeAllGridItems()
        });
        sessionStorage.setItem('view', 'all')
      }, 200)
      break;
      case "inbox":
      leavedm()
      // Run when its not first time
      window.setInterval(() => {
        
      }, 350)
      break;
    }    
  }
  if (val == 'true') {
    sessionStorage.setItem('first-time-' + tab, 'false')
    
    switch (tab) {
      case "home":
      interval = window.setInterval(function () {
        if (typeof (user) != "undefined" && typeof (user) != null) {
          clearInterval(interval)
          load_rel()
          window.setTimeout(function() {
            loadscrolling_rel()
          }, 3500)
        }
      }, 200);
      break;
      case "explore":
      interval = window.setInterval(function () {
        if (typeof (user) != "undefined" && typeof (user) != null) {
          clearInterval(interval)
          load()
        }
      }, 200);
      
      case "inbox":
      // Everything is automatically loaded to enable in-app notifications. Slows down app loading however...
      intervalinbox = window.setInterval(function () {
        if (typeof (user) != "undefined" && typeof (user) != null) {
          clearInterval(intervalinbox)
          loadpending()
        }
      }, 200);
      window.setTimeout(function() {
        
      }, 800)
      break;
      case "credits":
        loadCredits()
        break;
      case "account":
      //
      break;
      default:
      break;
    }
  }
}