/**
 * This waits until the webpage loads and then it calls the
 * anonymous function, which calls main.
 */
window.onload = function () { main(); }

/**
 * function main() adds pictures to the carousel.
 */
function main() {
  addToLandingCarousel();
}

/**
 * function addToLandingCarousel() adds fresh pictures to the carousel featured
 * on the landing page of the website.
 */
function addToLandingCarousel() {
  fetch('/retrieve-photos').then(response => response.json()).then(pictures => {
    pictures.hits.forEach(pictureInfo => {
      buildCarouselDiv(pictureInfo.webformatURL);
    });
  });
}

/**
 * Builds a carousel image div given a url pointing to an image.
 * @param {string} urlOfImage 
 */
function buildCarouselDiv(urlOfImage) {
  const /**HTMLDivElement*/ carouselDiv = document.createElement('div');
  carouselDiv.className = 'carousel-item';
  const /**HTMLImageElement*/ carouselImage = document.createElement('img');
  carouselImage.src = urlOfImage;
  carouselImage.className = 'd-block w-100';
  carouselDiv.appendChild(carouselImage);
  $('carousel-home-page').append(carouselDiv);
}