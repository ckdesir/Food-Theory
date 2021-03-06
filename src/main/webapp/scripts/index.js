import * as firebaseConstants from './firebase-constants.js';

/**
 * This waits until the webpage loads and then it calls the
 * anonymous function, which calls main.
 */
window.onload = function () {
  main();
};

/**
 * function main() adds pictures to the carousel, initializes an AutoComplete
 * object, adds onClickListeners to some elements on the main page,
 * and detects whether a user is signed in;
 */
function main() {
  firebase.initializeApp(firebaseConstants.FIREBASE_CONFIG);
  detectSignedInUser();
  addToLandingCarousel();
  addOnClickListenerToElements();
}

/**
 * function detectSignedInUser() adds an observer for changes to the
 * user's sign-in state. Updates interface in the case where a user
 * is signed into the website.
 */
function detectSignedInUser() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#sign-out').show();
      $('#sign-in').hide();
      const profilePicture = document.createElement('img');
      profilePicture.alt = 'Profile picture of signed in user.';
      profilePicture.src = user.photoURL;
      profilePicture.className = 'rounded-circle mr-3';
      profilePicture.id = 'profile-picture';
      const profileLink = document.createElement('span');
      profileLink.textContent = user.displayName;
      $('#profile-display').append(profilePicture);
      $('#profile-display').append(profileLink);
      $('#profile-display').show();
    }
  });
}

/**
 * function addToLandingCarousel() adds fresh pictures to the carousel featured
 * on the landing page of the website.
 */
function addToLandingCarousel() {
  fetch('/retrieve-photos')
    .then((response) => response.json())
    .then((pictures) => {
      JSON.parse(pictures.toString()).forEach((picture) => {
        buildCarouselDiv(
          picture.urls.regular,
          picture.user.name,
          picture.user.links.html,
          picture.alt_description
        );
      });
    });
}

/**
 * function buildCarouselDiv() builds a carousel image div
 * given a url pointing to an image.
 * @param {string} urlOfImage the url of the image
 * @param {string} photographer the name of the photographer
 * @param {string} photographerPage the webpage of the photographer
 * @param {string} imageAlt text alternative to the image
 */
function buildCarouselDiv(
  urlOfImage,
  photographer,
  photographerPage,
  imageAlt
) {
  const /** HTMLDivElement */ carouselDiv = document.createElement('div');
  carouselDiv.className = 'container carousel-item';
  const /** HTMLImageElement */ carouselImage = document.createElement(
      'img'
    );
  carouselImage.src = urlOfImage;
  carouselImage.alt = imageAlt;
  carouselImage.className = 'w-100 h-auto';
  const /** HTMLDivElement */ carouselCaptionDiv = document.createElement(
      'div'
    );
  carouselCaptionDiv.className = 'picture-caption';
  carouselCaptionDiv.appendChild(
    buildCarouselCaption(photographer, photographerPage)
  );
  carouselDiv.appendChild(carouselImage);
  carouselDiv.appendChild(carouselCaptionDiv);
  document.getElementById('carousel-home-page').appendChild(carouselDiv);
}

/**
 * function buildCarouselCaption() builds a paragraph element that correctly
 * attributes the images of the carousel to the name of the photographer passed
 * in, linking to their portfolio.
 * @param {string} photographer the name of the photographer
 * @param {string} photographerPage the webpage of the photographer
 * @return {HTMLParagraphElement} the carousel caption
 */
function buildCarouselCaption(photographer, photographerPage) {
  const /** HTMLParagrahElement */ carouselCaption = document.createElement(
      'p'
    );
  const /** HTMLAnchorElement */ photographerLink = document.createElement(
      'a'
    );
  photographerLink.href =
    photographerPage + '?utm_source=food-theory&utm_medium=referral';
  photographerLink.appendChild(document.createTextNode(photographer));
  const /** HTMLAnchorElement */ unsplashLink = document.createElement(
      'a'
    );
  unsplashLink.href =
    'https://unsplash.com/?utm_source=food-theory&utm_medium=referral';
  unsplashLink.appendChild(document.createTextNode('Unsplash'));
  carouselCaption.appendChild(document.createTextNode('Photo by '));
  carouselCaption.appendChild(photographerLink);
  carouselCaption.appendChild(document.createTextNode(' on '));
  carouselCaption.appendChild(unsplashLink);
  carouselCaption.appendChild(document.createTextNode('.'));
  return carouselCaption;
}

/**
 * function addOnClickListenerToElements() adds an onclick event listener
 * to some of the elements on the main webpage.
 */
function addOnClickListenerToElements() {
  $('#greeting-message-button').click(() => {
    $('#greeting-message').hide();
    $('#selections').show();
  });
  $('#selections-close').click(() => {
    $('#selections').hide();
    $('#greeting-message').show();
  });
  $('#sign-in').click(() => {
    window.location.href = 'signin.html?redirect=index.html';
  });
  $('#sign-out').click(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.location.reload();
      });
  });
}

export { addToLandingCarousel, buildCarouselDiv, buildCarouselCaption, detectSignedInUser };
