function go() {
    if (document.getElementById('customCheck1').checked) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://joke3.p.rapidapi.com/v1/joke?nsfw=true",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "joke3.p.rapidapi.com",
                "x-rapidapi-key": "f25776e273mshdeac69e2098339fp19fd7bjsne2f245613497"
            }
        }
    }
    else {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://joke3.p.rapidapi.com/v1/joke?nsfw=false",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "joke3.p.rapidapi.com",
                "x-rapidapi-key": "f25776e273mshdeac69e2098339fp19fd7bjsne2f245613497"
            }
        }
    }

    $.ajax(settings).done(function (response) {

        document.getElementById('joke').innerHTML = response.content
        document.getElementById('upvotes').innerHTML = response.upvotes
        document.getElementById('downvotes').innerHTML = response.downvotes

        document.getElementById('upvotebtn').onclick = function () {
            upvote(response.id)
        }
        document.getElementById('downvotebtn').onclick = function () {
            downvote(response.id)
        }

        document.getElementById('voted').style.display = 'none'
        document.getElementById('unvoted').style.display = 'block'
        document.getElementById("id").innerHTML = '<b>ID</b>: <small>' + response.id + '</small'
        document.getElementById("nsfw").innerHTML = '<b>NSFW</b>: ' + response.nsfw


    });
}

function upvote(id) {
    document.getElementById('unvoted').style.display = 'none'
    document.getElementById('feedback').innerHTML = '<i class="material-icons">check_circle</i> Upvoted'


    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://joke3.p.rapidapi.com/v1/joke/" + id + "/upvote",
        "method": "POST",
        "headers": {
            "x-rapidapi-host": "joke3.p.rapidapi.com",
            "x-rapidapi-key": "f25776e273mshdeac69e2098339fp19fd7bjsne2f245613497",
            "content-type": "application/x-www-form-urlencoded"
        },
        "data": {}
    }

    $.ajax(settings).done(function (response) {
        document.getElementById('voted').style.display = 'block';
        before = document.getElementById('upvotes').innerHTML
        before = parseInt(before)
        after = before + 1
        document.getElementById('upvotes').innerHTML = after
    });

}
function downvote(id) {
    document.getElementById('unvoted').style.display = 'none'
    document.getElementById('feedback').innerHTML = '<i class="material-icons">check_circle</i> Downvoted'



    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://joke3.p.rapidapi.com/v1/joke/" + id + "/downvote",
        "method": "POST",
        "headers": {
            "x-rapidapi-host": "joke3.p.rapidapi.com",
            "x-rapidapi-key": "f25776e273mshdeac69e2098339fp19fd7bjsne2f245613497",
            "content-type": "application/x-www-form-urlencoded"
        },
        "data": {}
    }

    $.ajax(settings).done(function (response) {
        document.getElementById('voted').style.display = 'block';
        before = document.getElementById('downvotes').innerHTML
        before = parseInt(before)
        after = before + 1
        document.getElementById('downvotes').innerHTML = after
    });
}

go()
