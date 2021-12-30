sessionStorage.setItem('first-time-discover', 'true')
sessionStorage.setItem('first-time-browse', 'true')
sessionStorage.setItem('first-time-social', 'true')
sessionStorage.setItem('first-time-account', 'true')
sessionStorage.setItem('currentab', 'nothing')

function tabe(tab) {
    document.getElementById('title').innerHTML = tab.charAt(0). toUpperCase() + tab.split(tab.charAt(0))[1] + ' | Swizzle'
    if (sessionStorage.getItem('currentab') == tab) {
        return;
    }
    sessionStorage.setItem("currentab", tab)

    $('.tabactive').removeClass('tabactive')
    document.getElementById(tab + '-tab').classList.add('tabactive')
    val = sessionStorage.getItem('first-time-' + tab)

    if (tab !== "account") {
        // Reestablish account as an inactive tab
        document.getElementById('account-tab').classList.remove('active')
        document.getElementById('account-tab').classList.remove('show')
    }


    // Ensure all other tabs are inactive
    $('.active').each(function(i, obj) {
        if (obj.id !== tab + '-tab') {
            $(this).removeClass('active')
            $(this).removeClass('show')
        }
    })
    $('.tab-pane').each(function(i, obj) {
        if (obj.id !== tab) {
            $(this).removeClass('active')
            $(this).removeClass('show')
        }
    })

    if (val == 'false') {
        switch (tab) {
            case "discover":
                // Run every time discover tab is selected.
                break;
            case "browse":
                // Run every time browse tab is selected.
                break;
            case "social":
                // Run every time social tab is selected.
                break;
            case "account":
                // Run every time account tab is selected.
                break;
        }    
    }

    if (val == 'true') {
        sessionStorage.setItem('first-time-' + tab, 'false')

        switch (tab) {
            case "discover":
                // Run first time discover tab is selected.
                break;
            case "browse":
                preflight_browse()
                // Run first time browse tab is selected.
                break;
            case "social":
                // Run first time social tab is selected.
                break;
            case "account":
                // Run first time social tab is selected.
                load_account_details()
            break;
        }
    }
}
