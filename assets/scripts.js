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