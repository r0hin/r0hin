$(window).ready(function () {
    openNav2()

    sessionStorage.setItem('first-time-home', 'true')
    sessionStorage.setItem('first-time-map', 'true')
    sessionStorage.setItem('first-time-news', 'true')
    sessionStorage.setItem('first-time-list', 'true')
    // ADD THIS FOR EACH TAB ADDED 👀

    var urlParams = new URLSearchParams(window.location.search);
    tab = urlParams.get('tab')

    if (tab == null || tab == undefined) {

        urlParams = new URLSearchParams(window.location.search);
        document.getElementById('home-tab').click()
        
    }
    else {
        $('#' + tab + '-tab').tab('show');
        tabe(tab)
    }

})

function tabe(tab) {
    //sessionStorage.setItem("currentviewingdm", 'not')
    //unshowdm()

    sessionStorage.setItem("currentab", tab)
    $('#justifiedTab').children('a').each(function () { this.classList.remove('navthing'); })
    $('.iconactive').each(function(i, obj) {
        obj.classList.remove('iconactive')
    })
    $('#justifiedTab').children('h4').each(function () { this.classList.remove('navbarbuttontextactive'); })
    document.getElementById(tab + '-tab').classList.add('navthing')
    document.getElementById(tab + '-icon').classList.add('iconactive')


    Waves.ripple('#' + tab + '-tab');
    history.pushState(null, null, '?tab=' + tab);

    val = sessionStorage.getItem('first-time-' + tab)
    if (val == 'true') {
        sessionStorage.setItem('first-time-' + tab, 'false')

        switch (tab) {
            case "home":
                homestats()
                try {window.clearInterval(interval)    } catch (error) {}
                
                break;
            case "map":
                try {window.clearInterval(interval)    } catch (error) {}
                resizeChat()
                closeNav()
                interval = window.setInterval(function () {
                if (typeof (google) != "undefined" && typeof (google) != null) {clearInterval(interval);initMap()}
                }, 200);
                break;
            case "news":
                try {window.clearInterval(interval)    } catch (error) {}
                checkNews()
                resizeAllGridItems()
                break;
            case "list":
                try {window.clearInterval(interval)    } catch (error) {}
                loadlist()
                break;
            case "info":
                try {window.clearInterval(interval)    } catch (error) {}
                break;
            default:
                try {window.clearInterval(interval)    } catch (error) {}
                break;
        }
    }
}

function openNav() {
    document.getElementById("overlaychat").style.width = "280px";
    document.getElementById("overlaychat").classList.add('overlaypadding')
    document.getElementById("tabs").style.marginRight = "280px";
    document.getElementById('chatbtnicon').innerHTML = 'keyboard_arrow_right'
    document.getElementById('chatbtn').classList.add('chatbtnactive')
    document.getElementById('chatbtn').onclick = function() {
        closeNav()
    }
    resizeChat()
  }
  
  function closeNav() {
    document.getElementById("overlaychat").style.width = "0";
    document.getElementById("overlaychat").classList.remove('overlaypadding')
    document.getElementById("tabs").style.marginRight= "0";
    document.getElementById('chatbtnicon').innerHTML = 'keyboard_arrow_left'
    document.getElementById('chatbtn').classList.remove('chatbtnactive')
    document.getElementById('chatbtn').onclick = function() {
        openNav()
    }
  }

  function openNav2() {
    document.getElementById("popout2").style.height = "184px";
    document.getElementById("tabs").style.marginBottom = "184px";
    document.getElementById('musicbtnicon').innerHTML = 'keyboard_arrow_down'
    document.getElementById('musicbtn').classList.add('musicbtnactive')
    document.getElementById('musicbtn').onclick = function() {
        closeNav2()
    }
    resizeChat()
  }
  
  function closeNav2() {
    document.getElementById("popout2").style.height = "0";
    document.getElementById("tabs").style.marginBottom= "0";
    document.getElementById('musicbtnicon').innerHTML = 'keyboard_arrow_up'
    document.getElementById('musicbtn').classList.remove('musicbtnactive')
    document.getElementById('musicbtn').onclick = function() {
        openNav2()
    }
  }