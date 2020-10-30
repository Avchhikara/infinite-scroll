const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = "m7_Pb_4nAhZiVih5_umxLqt_dDKEZpQc0wY_rAsgLtI";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all the images are loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    loader.hidden = true;
    ready = true;
    count = 30;
  }
}

// Create Elements for links and photos, add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    // Create anchor tage
    const a = document.createElement("a");
    a.setAttribute("href", photo.links.html);
    a.setAttribute("target", "_blank");
    // Create image taget
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);
    // Event listener, check when image loaded
    img.addEventListener("load", imageLoaded);
    // Put image in anchor
    a.appendChild(img);
    imageContainer.appendChild(a);
  });
}

// Get Photos from unsplash API
async function getPhotos() {
  try {
    const res = await fetch(apiURL);
    photosArray = await res.json();
    displayPhotos();
  } catch (err) {
    // Catch error here
  }
}

// Check to see if scrolling near bottom of the page, load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
