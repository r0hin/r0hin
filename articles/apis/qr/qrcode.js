check()
function check() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('api-target');
    const myParam2 = urlParams.get('api-typeof');
    const myParam3 = urlParams.get('api-return');
    const myParam4 = urlParams.get('api-return-site');
    if (myParam !== null && myParam !== undefined) {
        window.history.pushState(null, null ,'/')
        document.getElementById('secnondoption').onclick = function() {
            window.location.replace(myParam3)
        }
        sessionStorage.setItem('stopselect', 'true')
        $('#page1').remove()
        $('#page2').remove()
        $('#page3').remove()
        document.getElementById('secnondoption').innerHTML = 'Return To ' + myParam4

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://pierre2106j-qrcode.p.rapidapi.com/api?backcolor=fffff&pixel=10&ecl=H&forecolor=000000&type=" + myParam2 + "&text=" + myParam,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "pierre2106j-qrcode.p.rapidapi.com",
                "x-rapidapi-key": "f25776e273mshdeac69e2098339fp19fd7bjsne2f245613497"
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response)
            window.open(response)
            document.getElementById('page4').classList.remove('zoomOutDown')
            document.getElementById('page4').style.display = 'block'

        });        
    }
}

function sendrq() {

    select = selectValue.innerHTML
    if (select == 'Text') {
        select = 'text'
    }
    if (select == 'URL') {
        select = 'url'
    }
    if (select == 'Tel') {
        select = 'tel'
    }
    if (select == 'Email') {
        select = 'email'
    }
    if (select == 'SMS') {
        select = 'sms'
    }

    string = document.getElementById('exampleFloatingBox1').value

    if (string == '', string == " ") {
        error('Enter a valid string')
    }
    else {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://pierre2106j-qrcode.p.rapidapi.com/api?backcolor=fffff&pixel=10&ecl=H&forecolor=000000&type=" + selectValue.innerHTML + "&text=" + string,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "pierre2106j-qrcode.p.rapidapi.com",
                "x-rapidapi-key": "f25776e273mshdeac69e2098339fp19fd7bjsne2f245613497"
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
            window.open(response)
            finaly()

        });
    }
}

function start() {
    document.getElementById('page1').classList.add('fadeOutLeftBig')
    document.getElementById('page2').classList.add('fadeInRightBig')
    document.getElementById('page2').classList.remove('fadeOutRightBig')
    document.getElementById('page2').style.display = 'block'
}


function next() {

    document.getElementById('page2').classList.add('fadeOutLeftBig')
    document.getElementById('page3').classList.add('fadeInRightBig')
    document.getElementById('page3').classList.remove('fadeOutRightBig')
    document.getElementById('page3').style.display = 'block'

    document.getElementById('previouselectiontext').innerHTML = 'Now, enter the content of the QR Code based on your previous selection: ' + selectValue.innerHTML + '.'
    document.getElementById('speciallabel').innerHTML = 'Enter ' + selectValue.innerHTML + '.'


}

function backone() {
    document.getElementById('page3').classList.add('fadeOutRightBig')
    document.getElementById('page2').classList.add('fadeInLeftBig')
    document.getElementById('page2').classList.remove('fadeInRightBig')
    document.getElementById('page2').classList.remove('fadeOutLeftBig')
    document.getElementById('page2').style.display = 'block'

}

function backtwo() {
    document.getElementById('page2').classList.add('fadeOutRightBig')
    document.getElementById('page1').classList.add('fadeInLeftBig')
    document.getElementById('page1').classList.remove('fadeOutLeftBig')
    document.getElementById('page1').style.display = 'block'

}

function finaly() {

    document.getElementById('page3').classList.add('zoomOutDown')
    document.getElementById('page4').classList.add('zoomInUp')
    document.getElementById('page4').classList.remove('zoomOutDown')
    document.getElementById('page4').style.display = 'block'

}

function another() {
    document.getElementById('page3').classList.add('zoomInUp')

    document.getElementById('exampleFloatingBox1').value = ''

    document.getElementById('page4').classList.add('zoomOutDown')


    window.setTimeout(function () {
        backone()
        window.setTimeout(function () {
            backtwo()
            document.getElementById('page3').classList.remove('zoomInUp')
            document.getElementById('page3').classList.remove('zoomOutDown')
        }, 500)
    }, 2500)
}



function test(data) {
    document.querySelector('#test').textContent = data.value;
}
var one = lmSelect(document.querySelector('#one'), test);


/**
 * Like material select
 * @select html element
 * @onChange callback
 */
function lmSelect(select, onChange) {
    if (sessionStorage.getItem('stopselect')) {
        return;
    }
    selectValue = select.querySelector('.lm-select-value');
    var options = select.querySelector('.lm-select-options');
    var list = select.querySelector('.lm-select-list');
    var items = select.querySelectorAll('.lm-select-item');
    var overflow = select.querySelector('.lm-select-overflow');
    var bodyScroll;

    function selectItem(selected, isUpdate) {
        var value = selected.getAttribute('data-value') || selected.textContent;
        selected.classList.add('lm-select-selected');
        selectValue.textContent = selected.textContent;
        selectValue.setAttribute('data-value', value);
        if (onChange && isUpdate) {
            onChange(getData());
        }
    }

    function getData() {
        return { text: selectValue.textContent, value: selectValue.getAttribute('data-value') };
    }

    function hideSelect() {
        select.classList.remove("lm-select-active");
        removeDScroll();
        setTimeout(function () {
            select.classList.remove("lm-select-animating");
        }, 400);
    }

    function handleChange(event) {
        var old = select.querySelector('.lm-select-selected');
        if (old) {
            old.classList.remove('lm-select-selected');
        }

        selectItem(event.target, true);
        hideSelect();
    }

    function handleOpen() {
        setDScroll();
        var selected = select.querySelector('.lm-select-selected');
        select.classList.add("lm-select-animating");
        var scrollTop = (selected.offsetTop + (selected.offsetHeight / 2)) - list.offsetHeight / 2;
        list.scrollTop = Math.max(0, scrollTop);
        var listTop = Math.min(select.offsetTop - 10, selected.offsetTop - list.scrollTop) * -1
        options.style.top = listTop + "px";

        setTimeout(function () {
            select.classList.add("lm-select-active");
        }, 10);
    }

    function setDScroll() {
        bodyScroll = document.body.scrollTop;
        if (document.documentElement.clientHeight < document.documentElement.offsetHeight) {
            document.documentElement.style.overflowY = "scroll";
        }
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
        document.body.style.top = bodyScroll * -1 + "px";
    }
    function removeDScroll() {
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.style.top = "";
        document.body.scrollTop = bodyScroll;
        document.documentElement.style.overflowY = "";
    }

    selectItem(select.querySelector('.lm-select-selected') ||
        select.querySelector('.lm-select-item'));

    selectValue.addEventListener('click', handleOpen);

    for (var i = 0, l = items.length; i < l; i++) {
        items[i].addEventListener('click', handleChange);
    }

    overflow.addEventListener('click', hideSelect);

    return {
        get: getData
    }
}

function download() {
    url = document.getElementById('output').src
    window.open(url)


}
