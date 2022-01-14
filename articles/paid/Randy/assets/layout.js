// Create header
function loadHeader(activePage) {
  const a = document.createElement('div');
  a.innerHTML = `
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container-fluid">
      <img class="navbar-brand" src="./assets/images/logo.webp">Project Articulate</img>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <div style="width: 100%"></div>
        <ul class="navbar-nav me-auto mb-lg-0">
          <li class="nav-item">
            <a id="homeLink" class="nav-link" onclick="goToPage('index')">Home</a>
          </li>
          <li class="nav-item">
            <a id="aboutLink" class="nav-link" onclick="goToPage('about')">About</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Our Impact
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a id="pastLink" class="dropdown-item" onclick="goToPage('past')">Past Action</a></li>
              <li><a id="futureLink" class="dropdown-item" onclick="goToPage('future')">Future Plans</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a id="workshopsLink" class="nav-link" onclick="goToPage('workshops')">Community Workshops</a>
          </li>
          <li class="nav-item">
            <a id="resourcesLink" class="nav-link" onclick="goToPage('resources')">Resources</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>  
  `

  document.getElementById('header').appendChild(a);
  document.getElementById(`${activePage}Link`).classList.add('active')
}

function loadBackground(titleText, src) {
  const a = document.createElement('div');
  a.classList.add('backgroundHeader');
  a.setAttribute(`style`, `background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('${src}')`)
  a.innerHTML = `
    <h1>${titleText}</h1>
 `
  document.getElementById('background').appendChild(a);
}

function goToPage(page) {
  document.body.classList.remove('fadeIn');
  document.body.classList.add('fadeOut');
  window.setTimeout(() => {
    const a = document.createElement('a');
    a.id = 'link'
    a.href = `${page}.html`;
    document.body.appendChild(a);
    document.getElementById('link').click();
  }, 299)
}