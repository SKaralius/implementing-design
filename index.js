const albums = [
  { name: "The Placeholder Blues, Vol. 1", cover: "img/placeholder.jpg" },
  { name: "The Placeholder Blues, Vol. 2", cover: "img/placeholder.jpg" },
  { name: "The Placeholder Blues, Vol. 3", cover: "img/placeholder.jpg" },
  { name: "The Placeholder Blues, Vol. 4", cover: "img/placeholder.jpg" },
  { name: "The Placeholder Blues, Vol. 5", cover: "img/placeholder.jpg" },
  { name: "The Placeholder Blues, Vol. 6", cover: "img/placeholder.jpg" },
  { name: "The Placeholder Blues, Vol. 7", cover: "img/placeholder.jpg" },
  { name: "The Placeholder Blues, Vol. 8", cover: "img/placeholder.jpg" },
  { name: "The Placeholder Blues, Vol. 9", cover: "img/placeholder.jpg" },
  { name: "The Placeholder Blues, Vol. 10", cover: "img/placeholder.jpg" },
];

const lorem = `This website is designed by Masudur Rahman <a href="https://dribbble.com/uigeek/projects/983583-Music-Desktop-App">checkout his Dribbble page</a> for more creative designs.
</br>
Implemented by Simonas Karalius, <a href="https://github.com/SKaralius">checkout my Github</a> for more projects.`;

const artists = [
  { name: "Barry Blue", description: lorem, tags: ["Pop", "Glam Rock"] },
  { name: "Jeff Redd", description: lorem, tags: ["R&B", "Swingbeat"] },
  { name: "James White", description: lorem, tags: ["Jazz", "Avant-funk"] },
  { name: "Bunky Green", description: lorem, tags: ["Jazz"] },
];

let selectedCategory = "Artists";

const albumsContainer = document.getElementsByClassName("albums")[0];
const artistHeading = document.getElementsByClassName("artist-heading")[0];
const chevrons = document.getElementsByClassName("album-control");

makeAlbums();

let mainContent = "";

window.onload = () => {
  mainContent = document.getElementsByTagName("main")[0].innerHTML;
  checkDimensions();
};

window.addEventListener("resize", () => {
  checkDimensions();
});

function checkDimensions() {
  let main = document.getElementsByTagName("main")[0];
  if (window.innerWidth < 900 || window.innerHeight < 550) {
    main.innerHTML = `
    <div class='mobile'>
        <h1>This is a showcase of a desktop application and it does not support mobile screens.</h1>
        <i class="fas fa-sad-tear fa-5x"></i>
        <a href="https://github.com/SKaralius">Checkout my Github for other projects.</a>
        <a href="https://ksimo.com">Visite my website for more about me.</a>
    </div>
    `;
  } else if (
    window.innerWidth > 900 &&
    window.innerHeight > 550 &&
    main.innerHTML != mainContent
  ) {
    main.innerHTML = mainContent;
  }
}

function makeTags(tags) {
  let generatedTags = "";
  tags.forEach((tag) => {
    generatedTags += `<button>${tag}</button>`;
  });
  return generatedTags;
}

function makeAlbums() {
  albums.forEach((album) => {
    albumsContainer.innerHTML += `         
          <div class="album">
              <img src=${album.cover} alt=${album.name}>
              <h5>${album.name}</h5>
          </div>
      `;
  });
}

let slideIndex = 1;
showSlides(slideIndex);

// Artist image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("artist-image-container");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "flex";
  dots[slideIndex - 1].className += " active";
  updateArtistHeading(artists[n - 1]);
}

function move(direction) {
  const albumsContainer = document.getElementsByClassName("albums")[0];
  albumsContainer.classList = direction
    ? "albums move-right"
    : "albums move-left";
}

function updateArtistHeading(artist) {
  artistHeading.innerHTML = `
    <h1>${artist.name}</h1>
    <p>${artist.description}</p>
    <div class='tags'>
        ${makeTags(artist.tags)}
    </div>`;
}

function selectMenuItem(event) {
  const oldSelectedItems = [...document.getElementsByClassName("selectedItem")];
  if (oldSelectedItems) {
    oldSelectedItems.forEach((item) => {
      const splitClass = item.className.split("selectedItem");
      item.className = splitClass[1];
    });
  }
  event.target.parentNode.classList += " selectedItem";
}
