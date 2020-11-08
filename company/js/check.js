const urlParams = new URLSearchParams(window.location.search);

bam = window.location.href
if (bam.includes('rohin12.gitlab.io')) {
  window.location.replace('https://r0h.in')
}

const myParam = urlParams.get('a');

switch (myParam) {
  case "urban":
    window.location.replace('urban/d35rzt6y1iu2juis.html')
    break;
  case "emojify":
    window.location.replace('emojify/456788mu82y41s.html')
    break;
  case "joke":
    window.location.replace('joke/7aw8ueosidah.html')
    break;
  case "movie":
    window.location.replace('movie/283nuwsjalksjs.html')
    break;
  case "qr":
    window.location.replace('qr/8923usjoibdsa.html')
    break;
  case "trumpy":
    window.location.replace('quote/16t72yuiwdshazna.html')
    break;
  case "freedom":
    window.location.replace('picture-mergifyinator/y9418hwushd.html')
    break;
    
  
  
  case "echo":
    window.setTimeout(() => {
      tabe('echo')
    }, 500)
    break;

  case "contact":
    window.setTimeout(() => {
      tabe('contact')
    }, 500)
    break;

  case "eonnotes":
    window.setTimeout(() => {
      tabe('eonnotes')
    }, 500)
    break;

  case "eonsound":
    window.setTimeout(() => {
      tabe('eonsound')
    }, 500)
    break;

  case "payment":
    window.setTimeout(() => {
      tabe('payment')
    }, 500)
    break;

  case "terms":
    window.setTimeout(() => {
      tabe('terms')
    }, 500)
    break;

  case "privacy":
    window.setTimeout(() => {
      tabe('privacy')
    }, 500)
    break;
  
  default:
  break;
}
