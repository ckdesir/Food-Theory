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
    JSON.parse(pictures.toString()).hits.forEach(pictureInfo => {
      console.log(pictureInfo)
      buildCarouselDiv(
        pictureInfo.largeImageURL.substr(0, pictureInfo.largeImageURL.length-8) + '1920.jpg', pictureInfo.user, pictureInfo.user_id
      );
    });
  });
}

/**
 * function buildCarouselDiv() builds a carousel image div 
 * given a url pointing to an image.
 * @param {string} urlOfImage
 * @param {string} photographer
 * @param {string} photographerId
 */
function buildCarouselDiv(urlOfImage, photographer, photographerId) {
  const /** HTMLDivElement */ carouselDiv = document.createElement('div');
  carouselDiv.className = 'carousel-item';
  const /** HTMLImageElement */ carouselImage = document.createElement('img');
  carouselImage.src = urlOfImage;
  carouselImage.className = 'd-block w-100';
  const /** HTMLDivElement */ carouselCaptionDiv = 
      document.createElement('div');
  carouselCaptionDiv.className = 'carousel-caption d-none d-md-block';
  carouselCaptionDiv.appendChild(
      buildCarouselCaption(photographer, photographerId));
  carouselDiv.appendChild(carouselImage);
  carouselDiv.appendChild(carouselCaptionDiv);
  document.getElementById('carousel-home-page').appendChild(carouselDiv);
}

/**
 * function buildCarouselCaption() builds a paragraph element that correctly
 * attributes the images of the carousel to the name of the photographer passed
 * in, linking to their portfolio.
 * @param {string} photographer 
 * @param {string} photographerId 
 * @return {HTMLParagraphElement} the carousel caption
 */
function buildCarouselCaption(photographer, photographerId) {
  const /** HTMLParagrahElement */ carouselCaption =
      document.createElement('p');
  const /** HTMLAnchorElement */ photographerLink = document.createElement('a');
  photographerLink.href =
      `https://pixabay.com/users/${photographer}-${photographerId}/`;
  photographerLink.appendChild(document.createTextNode(photographer));
  const /** HTMLAnchorElement */ pixabayLink = document.createElement('a');
  pixabayLink.href = 'https://pixabay.com';
  pixabayLink.appendChild(document.createTextNode('pixabay.com'));
  carouselCaption.appendChild(document.createTextNode('Photograph created by '));
  carouselCaption.appendChild(photographerLink);
  carouselCaption.appendChild(document.createTextNode(' from '));
  carouselCaption.appendChild(pixabayLink);
  carouselCaption.appendChild(document.createTextNode('.'));
  return carouselCaption;
}

export { addToLandingCarousel, buildCarouselDiv, buildCarouselCaption }