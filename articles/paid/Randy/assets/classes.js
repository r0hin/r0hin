let data = [
  {
    title: 'Debate',
    img: './assets/images/speaking.png', // Path to image on the side.
    description: 'A crash course on the basics of building confidence, speaking to peers, public speaking, enunciation, and much more. This workshop will cover everything you will need to know and everything you will want to know to become a confident speaker no matter the circumstance.',
    date: 'TBD', // Placed next to calendar icon.
    author: 'Randy', // Placed next to user icon
    location: 'https://example.com', // button goes to this link if not disabled.
    disabled: true, // Disables the details button and adds (soon) to the end.
  },
  {
    title: 'DECA',
    img: './assets/images/speaking.png', // Path to image on the side.
    description: 'A business case competition that builds foundational presentation skills and business fundamentals. This workshop will teach students everything they need to know and more about the groundworks of the business world and also aid them in giving engaging and effective pitches.',
    date: 'TBD', // Placed next to calendar icon.
    author: 'Will', // Placed next to user icon
    location: 'https://example.com', // button goes to this link if not disabled.
    disabled: true, // Disables the details button and adds (soon) to the end.
  },
  {
    title: 'Public Speaking',
    img: './assets/images/speaking.png', // Path to image on the side.
    description: 'A crash course on the basics of building confidence, speaking to peers, public speaking, enunciation, and much more. This workshop will cover everything you will need to know and everything you will want to know to become a confident speaker no matter the circumstance.',
    date: 'TBD', // Placed next to calendar icon.
    author: 'Randy & Will', // Placed next to user icon
    location: 'https://example.com', // button goes to this link if not disabled.
    disabled: true, // Disables the details button and adds (soon) to the end.
  },

]

// Code to build data[] into elements.

const shouldSwap = true;

data.map((item, index) => {
  const a = document.createElement('div');
  a.setAttribute('class', `container containerClass`);

  const sectionA = `
    <div class="col-md-6 textSection">
      <h2>${item.title}</h2>
      <hr>
      <div class="details">
        <i class="bx bx-user"></i> ${item.author}
        <i class="bx bx-calendar"></i> ${item.date}
      </div>
      <p>${item.description}</p>
      <button class="button ${item.disabled ? 'disabled' : ''}" onclick="${item.disabled ? `window.open('mailto:projarticulate@gmail.com')` : `window.open('${item.url}')`}">Details</button>
    </div>
  `;

  const sectionB = `
    <div class="col-md-6">
      <img src="${item.img}" alt="Speaking Image">
    </div>
  `;

  a.innerHTML = `
    <div class="row">
      ${shouldSwap ? `
        ${index % 2 == 0 ? `${sectionB}${sectionA}` : `${sectionA}${sectionB}`}
      ` : `${sectionB}${sectionA}`}
    </div>
  `;
  document.querySelector('#classes').appendChild(a);
});