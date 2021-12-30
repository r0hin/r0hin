db = firebase.firestore()

function checkNews() {
 
    db.collection('app').doc("events").get().then(function(doc) {
        firebasedate = doc.data().news.toDate()
        currentdate = new Date()
        var diffMinutes = parseInt((currentdate - firebasedate) / (1000 * 60), 10); 
        if (diffMinutes > 15) {
            
            $.getJSON("https://gnews.io/api/v3/search?q=covid&token=680ac56e2ada01d1bfa9bf67ec40bb40&max=50&lang=en", function( json ) {
            
            NEWS = json
            buildNews(NEWS)

            db.collection("app").doc('events').update({
                newscache: NEWS,
                news: currentdate
            })
        });

        }
        else {
            db.collection("app").doc('events').get().then(function(doc) {
                NEWS = doc.data().newscache
                buildNews(NEWS)
            })
        }    
        
    })
}

function buildNews(NEWS) {
    $('#articles').empty()
        for (let i = 0; i < NEWS.articles.length; i++) {
            article = NEWS.articles[i];

            e = document.createElement('div')
            e.classList.add('card')
            e.classList.add('newscard')
            e.classList.add('animated')
            e.classList.add('fadeInUp')
            e.classList.add('card-body')
            viewFunc = "viewArticle('" + i + "')"
            e.innerHTML = '<div class="content"><h4>' + article.title + '</h4> <button onclick="' + viewFunc + '" class="eon-text">More Info</button></div>'

            document.getElementById('articles').appendChild(e)                    
        }
        addWaves()
        interval = window.setInterval(function() {
            resizeAllGridItems()
        }, 500)
}

function viewArticle(num) {
    $('#newsmodal').modal('toggle')

    document.getElementById('newstitle').innerHTML = NEWS.articles[num].title
    document.getElementById('newsdate').innerHTML = NEWS.articles[num].publishedAt
    document.getElementById('newsdescription').innerHTML = NEWS.articles[num].description
    document.getElementById('newsbanner').src = NEWS.articles[num].image
    document.getElementById('newsbutton').innerHTML = NEWS.articles[num].source.name
    document.getElementById('newsbutton').onclick = function() {
        window.open(NEWS.articles[num].source.url)
    }
    
}

function closenews() {
    $('#newsmodal').modal('toggle')
}


function resizeAllGridItems() {
    allItems = document.getElementsByClassName("newscard");
    for (x = 0; x < allItems.length; x++) {
        resizeGridItem(allItems[x]);
    }
}
function resizeGridItem(item) {
    try {
        grid = document.getElementById('articles')
        rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
        rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
        rowSpan = Math.ceil((item.querySelector('.content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
        item.style.gridRowEnd = "span " + rowSpan;   
    } catch (error) {
        console.log(error);
    }
}