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

    default:
        break;
}
