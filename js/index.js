function tabe(tab, el) {

    $(`.page`).addClass('hidden')
    $(`#${tab}`).removeClass('hidden')

    $(`.nav_buttonactive`).removeClass('nav_buttonactive')
    $(el).addClass('nav_buttonactive')

}