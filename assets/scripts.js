function openSection(sectionName, button) {
  hideElement(`.mainButton`, 'fadeInLeft', 'fadeOutLeft');
  hideElement(`#wave`, 'zoomIn', 'zoomOut');

  $(button).addClass('mainButtonActive');
  $(`#body`).addClass('sectionActive')

  window.setTimeout(() => {
    showElement(`.${sectionName}_section`, 'fadeInUp', 'fadeOutDown');
  }, 501);
}

function closeSection() {
  hideElement(`.section`, 'fadeInUp', 'fadeOutDown');
  
  $(`#body`).removeClass('sectionActive')
  
  window.setTimeout(() => {
    showElement(`#wave`, 'zoomIn', 'zoomOut');
    showElement(`.mainButton`, 'fadeInLeft', 'fadeOutLeft');
    $('.mainButtonActive').removeClass('mainButtonActive');
  }, 501);
}

function hideElement(elementSelector, animationIn, animationOut) {
  $(`${elementSelector}`).addClass('animated');
  $(`${elementSelector}`).removeClass(animationIn);
  $(`${elementSelector}`).addClass(animationOut);

  window.setTimeout(() => {
    $(`${elementSelector}`).addClass('hidden');
  }, 1001);
}

function showElement(elementSelector, animationIn, animationOut) {
  $(`${elementSelector}`).addClass('animated');
  $(`${elementSelector}`).removeClass('hidden');
  $(`${elementSelector}`).removeClass(animationOut);
  $(`${elementSelector}`).addClass(animationIn);
}

if (window.location.href.includes('r0hin.github.io')) { window.location.replace('https://r0h.in') }
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('a');

switch (myParam) {
  case "urban":
    window.location.replace('articles/apis/urban/d35rzt6y1iu2juis.html')
    break;
  case "emojify":
    window.location.replace('articles/apis/emojify/456788mu82y41s.html')
    break;
  case "joke":
    window.location.replace('articles/apis/joke/7aw8ueosidah.html')
    break;
  case "movie":
    window.location.replace('articles/apis/movie/283nuwsjalksjs.html')
    break;
  case "qr":
    window.location.replace('articles/apis/qr/8923usjoibdsa.html')
    break;
  case "trumpy":
    window.location.replace('articles/apis/quote/16t72yuiwdshazna.html')
    break;
  case "freedom":
    window.location.replace('articles/apis/picture-mergifyinator/y9418hwushd.html')
    break;
  default:
  break;
}